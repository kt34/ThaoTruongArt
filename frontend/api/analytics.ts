// Vercel serverless function: GET /api/analytics?since=YYYY-MM-DD&until=YYYY-MM-DD&tz=<minutes>
//
// Reads this site's Vercel Web Analytics through Vercel's API, so the /stats page can show
// visitors without anyone logging in to Vercel. The access token stays on the server.
//
// - Days are the viewer's local days (`tz` = the browser's getTimezoneOffset(), e.g. -660 for AEDT).
// - A range of several days is broken down per day; a single day per hour.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   ANALYTICS_TOKEN       Vercel access token (Account Settings → Tokens). Required.
//   ANALYTICS_PROJECT_ID  The Vercel project's ID or name. Required.
//   ANALYTICS_TEAM_ID     Only if the project belongs to a Vercel team.
//   ANALYTICS_PASSWORD    Optional. If set, /stats asks for this password first.
//
// API reference: https://vercel.com/docs/analytics/web-analytics-api

declare const process: { env: Record<string, string | undefined> };

const API = 'https://api.vercel.com/v1/query/web-analytics/visits';
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
// Vercel's Hobby plan keeps one month of Web Analytics; allow a day of slack for time zones.
const MAX_DAYS_BACK = 31;

interface Totals {
  visitors: number;
  pageviews: number;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=60' },
  });

const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const isDate = (s: string | null): s is string => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const dayMs = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export async function GET(request: Request): Promise<Response> {
  const env = process.env;
  const token = env.ANALYTICS_TOKEN;
  const projectId = env.ANALYTICS_PROJECT_ID;
  if (!token || !projectId) {
    return json({ error: 'not-configured', message: 'Analytics is not set up yet: ANALYTICS_TOKEN and ANALYTICS_PROJECT_ID are missing.' }, 503);
  }

  const password = env.ANALYTICS_PASSWORD;
  if (password && request.headers.get('x-analytics-password') !== password) {
    return json({ error: 'password', message: 'Password required.' }, 401);
  }

  // Which days to show. Defaults to the last 30 days.
  const url = new URL(request.url);
  const today = isoDay(new Date());
  // "Today" in Australia can already be tomorrow in UTC, so allow one day ahead.
  const latest = isoDay(new Date(Date.now() + DAY_MS));
  let until = url.searchParams.get('until');
  let since = url.searchParams.get('since');
  if (!isDate(until) || until > latest) until = today;
  if (!isDate(since)) since = isoDay(new Date(dayMs(until) - 29 * DAY_MS));
  if (since > until) [since, until] = [until, since];
  const earliest = isoDay(new Date(dayMs(today) - MAX_DAYS_BACK * DAY_MS));
  if (since < earliest) {
    return json({ error: 'too-old', message: 'Vercel only keeps about the last 30 days of analytics.' }, 400);
  }

  const days = Math.round((dayMs(until) - dayMs(since)) / DAY_MS) + 1;
  const hourly = days === 1;
  const tz = Math.max(-840, Math.min(840, Number(url.searchParams.get('tz')) || 0));

  // Every view uses the viewer's local days (midnight to midnight), sent to Vercel as exact
  // timestamps. Vercel can only group by UTC day, so days are fetched one at a time below.
  // (Uses today's UTC offset for the whole range, so a daylight-saving change can shift one hour.)
  const start = dayMs(since) + tz * 60 * 1000;
  const window = { since: String(start), until: String(start + days * DAY_MS - 1) };
  // The same-length period just before, for the "+12%" comparison.
  const previous = { since: String(start - days * DAY_MS), until: String(start - 1) };

  const query = async (path: string, params: Record<string, string>) => {
    const qs = new URLSearchParams({ projectId, ...window, ...params });
    if (env.ANALYTICS_TEAM_ID) qs.set('teamId', env.ANALYTICS_TEAM_ID);
    const res = await fetch(`${API}/${path}?${qs}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Vercel API ${path} responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res.json();
  };

  // Total visitors and page views for a time window. Vercel's count endpoint misreads exact
  // timestamps, so add up a per-country breakdown instead: each visitor has one country, so the
  // rows sum to the true number of unique visitors.
  const totalsFor = async (params: Record<string, string>): Promise<Totals> => {
    const result = await query('aggregate', { ...params, by: 'country', limit: '100' });
    return ((result.data ?? []) as { visitors?: number; pageviews?: number }[]).reduce<Totals>(
      (sum, row) => ({ visitors: sum.visitors + (row.visitors ?? 0), pageviews: sum.pageviews + (row.pageviews ?? 0) }),
      { visitors: 0, pageviews: 0 },
    );
  };

  // One local day at a time, a few in parallel so Vercel isn't hit with 30 requests at once.
  const dailyPoints = async () => {
    const dayStarts = Array.from({ length: days }, (_, i) => start + i * DAY_MS);
    const results: Totals[] = new Array(days);
    let next = 0;
    const worker = async () => {
      while (next < days) {
        const i = next++;
        results[i] = await totalsFor({ since: String(dayStarts[i]), until: String(dayStarts[i] + DAY_MS - 1) });
      }
    };
    await Promise.all(Array.from({ length: Math.min(6, days) }, worker));
    return dayStarts.map((_, i) => ({ time: isoDay(new Date(dayMs(since) + i * DAY_MS)), ...results[i] }));
  };

  const hourlyPoints = async () => {
    const result = await query('aggregate', { by: 'hour', limit: '100' });
    const found = new Map<number, Totals>();
    for (const row of (result.data ?? []) as Record<string, string | number | undefined>[]) {
      found.set(Date.parse(String(row.timestamp)), { visitors: Number(row.visitors ?? 0), pageviews: Number(row.pageviews ?? 0) });
    }
    return Array.from({ length: 24 }, (_, i) => {
      const t = start + i * HOUR_MS;
      return { time: new Date(t).toISOString(), ...(found.get(t) ?? { visitors: 0, pageviews: 0 }) };
    });
  };

  try {
    const [totals, prev, points, byCountry, byPage, byReferrer, byDevice] = await Promise.all([
      totalsFor({}),
      // The previous period can fall outside the plan's reporting window; then there's just no comparison.
      totalsFor(previous).catch(() => null),
      hourly ? hourlyPoints() : dailyPoints(),
      query('aggregate', { by: 'country', limit: '10' }),
      query('aggregate', { by: 'requestPath', limit: '10' }),
      query('aggregate', { by: 'referrerHostname', limit: '10' }),
      query('aggregate', { by: 'deviceType', limit: '5' }),
    ]);

    // Turn grouped rows into { name, visitors, pageviews } for the dashboard's lists.
    type Row = Record<string, string | number | undefined>;
    const breakdown = (result: { data?: Row[] }, key: string, fallback: string) =>
      (result.data ?? []).map((row) => ({
        name: String(row[key] || fallback),
        visitors: Number(row.visitors ?? 0),
        pageviews: Number(row.pageviews ?? 0),
      }));

    return json({
      since,
      until,
      granularity: hourly ? 'hour' : 'day',
      totals,
      previousTotals: prev,
      points,
      countries: breakdown(byCountry, 'country', 'Unknown'),
      pages: breakdown(byPage, 'requestPath', '/'),
      referrers: breakdown(byReferrer, 'referrerHostname', 'Direct'),
      devices: breakdown(byDevice, 'deviceType', 'Unknown'),
    });
  } catch (err) {
    console.error(err);
    return json({ error: 'upstream', message: 'Could not load analytics from Vercel right now.' }, 502);
  }
}
