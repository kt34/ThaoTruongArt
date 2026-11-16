import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, PointerEvent as ReactPointerEvent } from 'react';
import { Box } from '@mui/material';

// /stats: this site's Vercel Web Analytics, styled after Vercel's own Analytics page.
// Data comes from /api/analytics (frontend/api/analytics.ts), which holds the Vercel token.

interface Item {
  name: string;
  visitors: number;
  pageviews: number;
}

interface StatsData {
  range: number;
  since: string;
  until: string;
  totals: { visitors: number; pageviews: number };
  // null when the previous period is outside Vercel's reporting window.
  previousTotals: { visitors: number; pageviews: number } | null;
  daily: { date: string; visitors: number; pageviews: number }[];
  countries: Item[];
  pages: Item[];
  referrers: Item[];
  devices: Item[];
}

type Metric = 'visitors' | 'pageviews';
type Status = 'loading' | 'ready' | 'password' | 'not-configured' | 'error';

// Vercel dashboard look: Geist, near-black text, light gray borders, blue chart.
const ui = {
  font: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  text: '#171717',
  muted: '#666666',
  faint: '#8f8f8f',
  border: '#ebebeb',
  bg: '#fafafa',
  card: '#ffffff',
  blue: '#0070f3',
  barFill: '#f2f2f2',
  green: '#0a7f3f',
  red: '#d93036',
};

const RANGES = [
  { value: 7, label: 'Last 7 days' },
  { value: 14, label: 'Last 14 days' },
  { value: 30, label: 'Last 30 days' },
];

const PASSWORD_KEY = 'stats-password';
const readStored = () => {
  try {
    return localStorage.getItem(PASSWORD_KEY) ?? '';
  } catch {
    return '';
  }
};
const storePassword = (value: string) => {
  try {
    if (value) localStorage.setItem(PASSWORD_KEY, value);
    else localStorage.removeItem(PASSWORD_KEY);
  } catch {
    // Storage can be unavailable (private mode); the password is just asked for again.
  }
};

const fmt = (n: number) => n.toLocaleString('en-AU');
const shortDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' });
  } catch {
    return null;
  }
})();
const countryLabel = (code: string) => {
  if (!/^[A-Z]{2}$/.test(code)) return { flag: '🌐', name: code };
  const flag = String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
  return { flag, name: regionNames?.of(code) ?? code };
};

// Round the chart's top up to a tidy number so the gridlines read cleanly.
const niceMax = (value: number) => {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude * 4 >= value) ?? 10;
  return step * magnitude * 4;
};

const Change = ({ current, previous }: { current: number; previous: number }) => {
  if (!previous) return null;
  const pct = Math.round(((current - previous) / previous) * 100);
  const up = pct >= 0;
  return (
    <Box
      component="span"
      sx={{
        ml: 1,
        px: 0.75,
        py: 0.1,
        borderRadius: '999px',
        fontSize: 12,
        fontWeight: 500,
        color: up ? ui.green : ui.red,
        bgcolor: up ? 'rgba(10,127,63,0.08)' : 'rgba(217,48,54,0.08)',
        verticalAlign: 'middle',
      }}
    >
      {up ? '+' : ''}
      {pct}%
    </Box>
  );
};

// Area chart with a crosshair tooltip that snaps to the nearest day.
const Chart = ({ daily, metric }: { daily: StatsData['daily']; metric: Metric }) => {
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const values = daily.map((d) => d[metric]);
  const max = niceMax(Math.max(0, ...values));
  const n = daily.length;
  const x = (i: number) => (n === 1 ? 50 : (i / (n - 1)) * 100);
  const y = (v: number) => 100 - (v / max) * 100;

  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const area = `${line} L${x(n - 1)},100 L${x(0)},100 Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));
  const labelEvery = Math.max(1, Math.ceil(n / 7));

  const onMove = (e: ReactPointerEvent) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const ratio = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
    setHover(Math.round(ratio * (n - 1)));
  };

  const label = metric === 'visitors' ? 'Visitors' : 'Page Views';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '40px 1fr', columnGap: 1.5, px: { xs: 2, sm: 3 }, pt: 3, pb: 2 }}>
      {/* Y axis labels */}
      <Box sx={{ position: 'relative', height: 260 }}>
        {ticks.map((t) => (
          <Box key={t} sx={{ position: 'absolute', right: 0, top: `${y(t)}%`, transform: 'translateY(-50%)', fontSize: 12, color: ui.faint, fontFamily: ui.mono }}>
            {fmt(t)}
          </Box>
        ))}
      </Box>

      <Box
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        tabIndex={0}
        aria-label={`${label} per day chart. Use the left and right arrow keys to read each day.`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') setHover((h) => Math.min(n - 1, (h ?? -1) + 1));
          if (e.key === 'ArrowLeft') setHover((h) => Math.max(0, (h ?? n) - 1));
        }}
        onBlur={() => setHover(null)}
        sx={{ position: 'relative', height: 260, outline: 'none', '&:focus-visible': { boxShadow: `0 0 0 2px ${ui.blue}`, borderRadius: '4px' } }}
      >
        {/* Gridlines */}
        {ticks.map((t) => (
          <Box key={t} sx={{ position: 'absolute', left: 0, right: 0, top: `${y(t)}%`, borderTop: `1px ${t === 0 ? 'solid' : 'dashed'} ${ui.border}` }} />
        ))}

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden>
          <defs>
            <linearGradient id="stats-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ui.blue} stopOpacity="0.18" />
              <stop offset="100%" stopColor={ui.blue} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#stats-area)" />
          <path d={line} fill="none" stroke={ui.blue} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        </svg>

        {hover !== null && daily[hover] && (
          <>
            <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: `${x(hover)}%`, borderLeft: `1px solid ${ui.faint}`, pointerEvents: 'none' }} />
            <Box
              sx={{
                position: 'absolute',
                left: `${x(hover)}%`,
                top: `${y(values[hover])}%`,
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: ui.blue,
                border: '2px solid #fff',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
            <Box
              role="status"
              sx={{
                position: 'absolute',
                top: 8,
                left: `${x(hover)}%`,
                transform: x(hover) > 70 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
                bgcolor: ui.card,
                border: `1px solid ${ui.border}`,
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                px: 1.5,
                py: 1,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 1,
              }}
            >
              <Box sx={{ fontSize: 12, color: ui.muted, mb: 0.5 }}>{longDate(daily[hover].date)}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 13 }}>
                <Box sx={{ width: 10, height: 2, bgcolor: ui.blue, borderRadius: 1 }} />
                <Box component="span" sx={{ fontWeight: 600, color: ui.text }}>
                  {fmt(values[hover])}
                </Box>
                <Box component="span" sx={{ color: ui.muted }}>
                  {label}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* X axis labels */}
      <Box />
      <Box sx={{ position: 'relative', height: 24, mt: 1 }}>
        {daily.map((d, i) =>
          i % labelEvery === 0 || i === n - 1 ? (
            <Box
              key={d.date}
              sx={{
                position: 'absolute',
                left: `${x(i)}%`,
                transform: i === 0 ? 'none' : i === n - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                fontSize: 12,
                color: ui.faint,
                whiteSpace: 'nowrap',
                display: i !== 0 && i !== n - 1 && i % (labelEvery * 2) !== 0 ? { xs: 'none', sm: 'block' } : 'block',
              }}
            >
              {shortDate(d.date)}
            </Box>
          ) : null,
        )}
      </Box>
    </Box>
  );
};

// A card listing names with faint proportional bars behind them, like Vercel's Pages / Referrers / Countries panels.
const Panel = ({ title, items, metric, render }: { title: string; items: Item[]; metric: Metric; render?: (name: string) => React.ReactNode }) => {
  const max = Math.max(1, ...items.map((i) => i[metric]));
  return (
    <Box sx={{ bgcolor: ui.card, border: `1px solid ${ui.border}`, borderRadius: '12px', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2.5, py: 1.75, borderBottom: `1px solid ${ui.border}` }}>
        <Box sx={{ fontSize: 14, fontWeight: 600, color: ui.text }}>{title}</Box>
        <Box sx={{ fontSize: 12, fontWeight: 500, color: ui.faint, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {metric === 'visitors' ? 'Visitors' : 'Page Views'}
        </Box>
      </Box>
      <Box sx={{ p: 1.25, minHeight: 120 }}>
        {items.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center', fontSize: 14, color: ui.faint }}>No data yet</Box>
        ) : (
          items.map((item) => (
            <Box
              key={item.name}
              title={`${item.name}: ${fmt(item[metric])}`}
              sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, height: 36, px: 1.25, mb: 0.25 }}
            >
              <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(item[metric] / max) * 100}%`, bgcolor: ui.barFill, borderRadius: '6px' }} />
              <Box sx={{ position: 'relative', fontSize: 14, color: ui.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {render ? render(item.name) : item.name}
              </Box>
              <Box sx={{ position: 'relative', fontSize: 14, color: ui.text, fontVariantNumeric: 'tabular-nums' }}>{fmt(item[metric])}</Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

const Message = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ bgcolor: ui.card, border: `1px solid ${ui.border}`, borderRadius: '12px', p: { xs: 3, sm: 5 }, textAlign: 'center', maxWidth: 520, mx: 'auto', mt: 6 }}>
    <Box sx={{ fontSize: 18, fontWeight: 600, color: ui.text, mb: 1 }}>{title}</Box>
    <Box sx={{ fontSize: 14, color: ui.muted, lineHeight: 1.6 }}>{children}</Box>
  </Box>
);

const Stats = () => {
  const [range, setRange] = useState(30);
  const [metric, setMetric] = useState<Metric>('visitors');
  const [data, setData] = useState<StatsData | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [password, setPassword] = useState(readStored);
  const [draft, setDraft] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);

  // Vercel's font, a tab title, and keep this page out of search results.
  useEffect(() => {
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono&display=swap';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.append(font, robots);
    const previousTitle = document.title;
    document.title = 'Analytics · ThaoTruong Art';
    return () => {
      font.remove();
      robots.remove();
      document.title = previousTitle;
    };
  }, []);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch(`/api/analytics?range=${range}`, { headers: password ? { 'x-analytics-password': password } : {} });
      if (res.status === 401) {
        setWrongPassword(Boolean(password));
        storePassword('');
        setStatus('password');
        return;
      }
      if (res.status === 503) return setStatus('not-configured');
      if (!res.ok) return setStatus('error');
      setData(await res.json());
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [range, password]);

  useEffect(() => {
    load();
  }, [load]);

  const submitPassword = (e: FormEvent) => {
    e.preventDefault();
    storePassword(draft);
    setWrongPassword(false);
    setPassword(draft);
  };

  const host = typeof window !== 'undefined' ? window.location.host : '';
  const tabs = useMemo(
    () =>
      data
        ? ([
            { key: 'visitors', label: 'Visitors', value: data.totals.visitors, previous: data.previousTotals?.visitors ?? 0 },
            { key: 'pageviews', label: 'Page Views', value: data.totals.pageviews, previous: data.previousTotals?.pageviews ?? 0 },
          ] as const)
        : [],
    [data],
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: ui.bg, color: ui.text, fontFamily: ui.font, WebkitFontSmoothing: 'antialiased' }}>
      {/* Top bar */}
      <Box sx={{ bgcolor: ui.card, borderBottom: `1px solid ${ui.border}` }}>
        <Box sx={{ maxWidth: 1080, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 2.5, sm: 3.5 }, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Box component="h1" sx={{ m: 0, fontSize: { xs: 24, sm: 32 }, fontWeight: 600, letterSpacing: '-0.02em' }}>
              Analytics
            </Box>
            <Box sx={{ fontSize: 14, color: ui.muted, mt: 0.5 }}>{host} · Production</Box>
          </Box>
          <Box
            component="select"
            value={range}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRange(Number(e.target.value))}
            aria-label="Date range"
            sx={{
              font: 'inherit',
              fontSize: 14,
              color: ui.text,
              bgcolor: ui.card,
              border: `1px solid ${ui.border}`,
              borderRadius: '6px',
              height: 36,
              pl: 1.5,
              pr: 4,
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              '&:hover': { borderColor: '#d4d4d4' },
              '&:focus-visible': { outline: `2px solid ${ui.blue}`, outlineOffset: 1 },
            }}
          >
            {RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1080, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
        {status === 'password' && (
          <Box component="form" onSubmit={submitPassword} sx={{ bgcolor: ui.card, border: `1px solid ${ui.border}`, borderRadius: '12px', p: { xs: 3, sm: 4 }, maxWidth: 380, mx: 'auto', mt: 6 }}>
            <Box sx={{ fontSize: 18, fontWeight: 600, mb: 0.5 }}>Enter password</Box>
            <Box sx={{ fontSize: 14, color: ui.muted, mb: 2.5 }}>This page is private.</Box>
            <Box
              component="input"
              type="password"
              value={draft}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
              autoFocus
              aria-label="Password"
              sx={{ width: '100%', boxSizing: 'border-box', font: 'inherit', fontSize: 14, height: 40, px: 1.5, border: `1px solid ${wrongPassword ? ui.red : ui.border}`, borderRadius: '6px', outline: 'none', '&:focus': { borderColor: ui.text } }}
            />
            {wrongPassword && <Box sx={{ fontSize: 13, color: ui.red, mt: 1 }}>That password didn’t work.</Box>}
            <Box
              component="button"
              type="submit"
              sx={{ mt: 2, width: '100%', height: 40, border: 'none', borderRadius: '6px', bgcolor: ui.text, color: '#fff', font: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', '&:hover': { bgcolor: '#383838' } }}
            >
              Continue
            </Box>
          </Box>
        )}

        {status === 'not-configured' && (
          <Message title="Analytics isn’t connected yet">
            Add <code>ANALYTICS_TOKEN</code> and <code>ANALYTICS_PROJECT_ID</code> in Vercel → Project → Settings → Environment Variables, then redeploy.
          </Message>
        )}

        {status === 'error' && !data && (
          <Message title="Couldn’t load analytics">
            Vercel didn’t respond. Try again in a minute.{' '}
            <Box component="button" type="button" onClick={load} sx={{ border: 'none', background: 'none', p: 0, font: 'inherit', color: ui.blue, cursor: 'pointer', textDecoration: 'underline' }}>
              Retry
            </Box>
          </Message>
        )}

        {status === 'loading' && !data && <Box sx={{ textAlign: 'center', color: ui.faint, fontSize: 14, mt: 8 }}>Loading…</Box>}

        {data && status !== 'password' && (
          // Keep the previous numbers on screen (dimmed) while a new range loads.
          <Box sx={{ opacity: status === 'loading' ? 0.55 : 1, transition: 'opacity 0.2s ease' }}>
            <Box sx={{ bgcolor: ui.card, border: `1px solid ${ui.border}`, borderRadius: '12px', overflow: 'hidden', mb: 3 }}>
              <Box role="tablist" sx={{ display: 'flex', borderBottom: `1px solid ${ui.border}` }}>
                {tabs.map((tab) => {
                  const active = metric === tab.key;
                  return (
                    <Box
                      key={tab.key}
                      component="button"
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMetric(tab.key)}
                      sx={{
                        flex: { xs: 1, sm: '0 0 auto' },
                        minWidth: { sm: 200 },
                        textAlign: 'left',
                        border: 'none',
                        borderRight: `1px solid ${ui.border}`,
                        bgcolor: active ? ui.card : ui.bg,
                        boxShadow: active ? `inset 0 -2px 0 ${ui.text}` : 'none',
                        px: { xs: 2, sm: 3 },
                        py: 2,
                        cursor: 'pointer',
                        font: 'inherit',
                        color: ui.text,
                        '&:hover': { bgcolor: ui.card },
                        '&:focus-visible': { outline: `2px solid ${ui.blue}`, outlineOffset: -2 },
                      }}
                    >
                      <Box sx={{ fontSize: 13, fontWeight: 500, color: active ? ui.text : ui.muted, mb: 0.75 }}>{tab.label}</Box>
                      <Box sx={{ fontSize: { xs: 24, sm: 30 }, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        {fmt(tab.value)}
                        <Change current={tab.value} previous={tab.previous} />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Chart daily={data.daily} metric={metric} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Panel title="Pages" items={data.pages} metric={metric} />
              <Panel title="Referrers" items={data.referrers} metric={metric} />
              <Panel
                title="Countries"
                items={data.countries}
                metric={metric}
                render={(code) => {
                  const c = countryLabel(code);
                  return (
                    <>
                      <Box component="span" sx={{ mr: 1 }} aria-hidden>
                        {c.flag}
                      </Box>
                      {c.name}
                    </>
                  );
                }}
              />
              <Panel title="Devices" items={data.devices} metric={metric} render={(name) => name.charAt(0).toUpperCase() + name.slice(1)} />
            </Box>

            <Box sx={{ fontSize: 12, color: ui.faint, mt: 3, textAlign: 'center' }}>
              {longDate(data.since)} – {longDate(data.until)} (UTC) · From Vercel Web Analytics
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Stats;
