// Vercel serverless function: GET /api/analytics?range=7|30|90
//
// Reads this site's Vercel Web Analytics through Vercel's API, so the /stats page can show
// visitors without anyone logging in to Vercel. The access token stays on the server.
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
const RANGES = [7, 30, 90];
const DAY_MS = 24 * 60 * 60 * 1000;

interface Totals {
  visitors: number;
  pageviews: number;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=300' },
  });

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

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

  const url = new URL(request.url);
  const requested = Number(url.searchParams.get('range'));
  const range = RANGES.includes(requested) ? requested : 30;

  // Whole days in UTC, ending today.
  const today = new Date();
  const since = isoDay(new Date(today.getTime() - (range - 1) * DAY_MS));
  const until = isoDay(today);

  // The same-length period just before, for the "+12%" comparison.
  const prevUntil = isoDay(new Date(new Date(since).getTime() - DAY_MS));
  const prevSince = isoDay(new Date(new Date(since).getTime() - range * DAY_MS));

  const query = async (path: string, params: Record<string, string>) => {
    const qs = new URLSearchParams({ projectId, since, until, ...params });
    if (env.ANALYTICS_TEAM_ID) qs.set('teamId', env.ANALYTICS_TEAM_ID);
    const res = await fetch(`${API}/${path}?${qs}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Vercel API ${path} responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res.json();
  };

  try {
    const [count, previous, byDay, byCountry, byPage, byReferrer, byDevice] = await Promise.all([
      query('count', {}),
      query('count', { since: prevSince, until: prevUntil }),
      query('aggregate', { by: 'day', limit: '100' }),
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

    // Fill in days with no visits so the chart has one bar per day.
    const perDay = new Map<string, Totals>();
    for (const row of byDay.data ?? []) {
      perDay.set(String(row.timestamp).slice(0, 10), { visitors: row.visitors ?? 0, pageviews: row.pageviews ?? 0 });
    }
    const daily = Array.from({ length: range }, (_, i) => {
      const date = isoDay(new Date(new Date(since).getTime() + i * DAY_MS));
      return { date, ...(perDay.get(date) ?? { visitors: 0, pageviews: 0 }) };
    });

    return json({
      range,
      since,
      until,
      totals: { visitors: count.data?.visitors ?? 0, pageviews: count.data?.pageviews ?? 0 },
      previousTotals: { visitors: previous.data?.visitors ?? 0, pageviews: previous.data?.pageviews ?? 0 },
      daily,
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
