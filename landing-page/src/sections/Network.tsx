import { useLang } from '@/lib/i18n'

/*
 * India coverage map — hand-placed dots for major cities.
 * Coordinates are in a 0–100 viewBox space, roughly geographic.
 * `active: true` cities pulse to suggest a "lawyer dispatched right now".
 */
type City = { name: string; x: number; y: number; active?: boolean; pulse?: boolean }

const CITIES: City[] = [
  { name: 'Chandigarh', x: 41, y: 18 },
  { name: 'Delhi',      x: 43, y: 24, active: true, pulse: true },
  { name: 'Jaipur',     x: 36, y: 30 },
  { name: 'Lucknow',    x: 53, y: 28 },
  { name: 'Patna',      x: 64, y: 32 },
  { name: 'Guwahati',   x: 80, y: 32 },
  { name: 'Ranchi',     x: 65, y: 40 },
  { name: 'Bhopal',     x: 44, y: 41 },
  { name: 'Indore',     x: 39, y: 43 },
  { name: 'Ahmedabad',  x: 28, y: 43 },
  { name: 'Surat',      x: 28, y: 49 },
  { name: 'Kolkata',    x: 70, y: 44 },
  { name: 'Bhubaneswar',x: 65, y: 50 },
  { name: 'Mumbai',     x: 28, y: 56, active: true, pulse: true },
  { name: 'Pune',       x: 32, y: 59 },
  { name: 'Hyderabad',  x: 44, y: 62, active: true },
  { name: 'Bengaluru',  x: 41, y: 73, active: true },
  { name: 'Chennai',    x: 50, y: 76 },
  { name: 'Coimbatore', x: 42, y: 81 },
  { name: 'Kochi',      x: 38, y: 84 },
]

/* Background texture dots that loosely fill the subcontinent silhouette.
 * Hand-placed so the cluster reads as India rather than a generic grid. */
const TEXTURE_DOTS: Array<[number, number]> = [
  // North band
  [36, 14], [40, 14], [44, 14], [48, 14], [38, 17], [42, 17], [46, 17], [50, 17],
  [36, 20], [40, 20], [44, 20], [48, 20], [52, 20], [56, 20],
  [34, 23], [38, 23], [42, 23], [46, 23], [50, 23], [54, 23], [58, 23],
  // East / Northeast
  [62, 21], [66, 21], [70, 24], [74, 27], [78, 28], [82, 30], [76, 33], [80, 35],
  // Upper mid
  [32, 26], [36, 26], [40, 26], [44, 26], [48, 26], [52, 26], [56, 26], [60, 26], [64, 26],
  [30, 29], [34, 29], [38, 29], [42, 29], [46, 29], [50, 29], [54, 29], [58, 29], [62, 29], [66, 29],
  [28, 32], [32, 32], [36, 32], [40, 32], [44, 32], [48, 32], [52, 32], [56, 32], [60, 32], [64, 32], [68, 32],
  // Mid
  [26, 35], [30, 35], [34, 35], [38, 35], [42, 35], [46, 35], [50, 35], [54, 35], [58, 35], [62, 35], [66, 35], [70, 35],
  [26, 38], [30, 38], [34, 38], [38, 38], [42, 38], [46, 38], [50, 38], [54, 38], [58, 38], [62, 38], [66, 38], [70, 38],
  [26, 41], [30, 41], [34, 41], [38, 41], [42, 41], [46, 41], [50, 41], [54, 41], [58, 41], [62, 41], [66, 41], [70, 41],
  [26, 44], [30, 44], [34, 44], [38, 44], [42, 44], [46, 44], [50, 44], [54, 44], [58, 44], [62, 44], [66, 44], [70, 44],
  // West bulge / Gujarat
  [22, 41], [24, 44], [22, 47], [26, 47], [24, 50],
  // Central/south
  [30, 47], [34, 47], [38, 47], [42, 47], [46, 47], [50, 47], [54, 47], [58, 47], [62, 47], [66, 47],
  [28, 50], [32, 50], [36, 50], [40, 50], [44, 50], [48, 50], [52, 50], [56, 50], [60, 50], [64, 50],
  [28, 53], [32, 53], [36, 53], [40, 53], [44, 53], [48, 53], [52, 53], [56, 53],
  [30, 56], [34, 56], [38, 56], [42, 56], [46, 56], [50, 56], [54, 56],
  // Deccan
  [32, 59], [36, 59], [40, 59], [44, 59], [48, 59], [52, 59],
  [34, 62], [38, 62], [42, 62], [46, 62], [50, 62],
  [36, 65], [40, 65], [44, 65], [48, 65],
  [38, 68], [42, 68], [46, 68], [50, 68],
  // Tail toward Kanyakumari
  [40, 71], [44, 71], [48, 71],
  [40, 74], [44, 74], [48, 74],
  [40, 77], [44, 77],
  [42, 80], [46, 80],
  [42, 83],
  [42, 86],
]

const STATS = [
  { v: '75K+', l: 'lawyers',         tone: 'amber' as const },
  { v: '98%',  l: 'pin codes',       tone: 'emerald' as const },
  { v: '2 hr', l: 'on-ground avg.',  tone: 'amber' as const },
  { v: '24×7', l: 'on-call',         tone: 'emerald' as const },
]

function IndiaMap({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      {/* Texture dots — subcontinent silhouette */}
      {TEXTURE_DOTS.map(([x, y], i) => (
        <circle key={`t-${i}`} cx={x} cy={y} r={0.55} fill="rgb(120 113 108)" opacity={0.55} />
      ))}

      {/* City dots */}
      {CITIES.map((c) => {
        const fill = c.active ? 'rgb(16 185 129)' : 'rgb(245 245 244)'
        return (
          <g key={c.name}>
            {c.pulse && (
              <circle cx={c.x} cy={c.y} r={1.4} fill="rgb(16 185 129)" className="animate-soft-pulse" style={{ transformOrigin: `${c.x}px ${c.y}px` }} />
            )}
            <circle cx={c.x} cy={c.y} r={c.active ? 1.1 : 0.9} fill={fill} />
            {c.active && (
              <circle cx={c.x} cy={c.y} r={2.4} fill="none" stroke="rgb(16 185 129)" strokeWidth={0.25} opacity={0.5} />
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function Network() {
  const { t } = useLang()
  // Duplicate cities list once so the marquee can scroll seamlessly.
  const marqueeCities = [...t.networkCities, ...t.networkCities]

  return (
    <section className="relative bg-stone-950 text-white py-20 lg:py-28 overflow-hidden">
      {/* Soft amber glow behind the map */}
      <div
        className="pointer-events-none absolute top-1/2 right-[-10%] -translate-y-1/2 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.30), transparent 65%)' }}
        aria-hidden="true"
      />
      {/* Faint India map textural layer behind everything (mobile + lg) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-[0.08] lg:opacity-0" aria-hidden="true">
        <IndiaMap className="h-[110%] w-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Live ticker pill — top right corner */}
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-mono text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-blink" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold tracking-wide">{t.networkLiveStat}</span>
            <span className="text-emerald-400/60 uppercase tracking-[0.18em] text-[9px] border-l border-emerald-500/30 pl-2">
              {t.networkLiveLabel}
            </span>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — editorial column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-amber-400">
              <span className="block h-px w-6 bg-amber-500" />
              {t.networkEyebrow}
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]">
              {t.networkHeadline}
            </h2>

            {/* City marquee */}
            <div className="relative mt-6 overflow-hidden border-y border-white/10 py-2.5">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
                style={{ background: 'linear-gradient(to right, rgb(12 10 9), transparent)' }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
                style={{ background: 'linear-gradient(to left, rgb(12 10 9), transparent)' }}
              />
              <div className="flex whitespace-nowrap animate-marquee">
                {marqueeCities.map((city, i) => (
                  <span
                    key={`${city}-${i}`}
                    className="font-mono text-[11px] tracking-[0.2em] text-stone-500 px-4"
                  >
                    {city}
                    <span className="ml-8 text-stone-700">·</span>
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl">
              {t.networkSub}
            </p>

            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {t.networkPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-stone-200">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="#hero"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-xl shadow-emerald-500/30"
            >
              {t.networkCTA}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* RIGHT — India coverage map */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
              {/* Corner labels */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] font-mono text-stone-500">
                <span>Coverage map</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>

              <div className="relative mt-3 aspect-square max-h-[460px] mx-auto">
                <IndiaMap className="absolute inset-0 h-full w-full" />

                {/* Floating city labels for the active dots — desktop only */}
                <div className="hidden md:block absolute inset-0 pointer-events-none">
                  {CITIES.filter((c) => c.active).map((c) => (
                    <span
                      key={`label-${c.name}`}
                      className="absolute -translate-y-1/2 font-mono text-[9px] tracking-[0.18em] uppercase text-emerald-300/90 whitespace-nowrap"
                      style={{ left: `${c.x + 3}%`, top: `${c.y}%` }}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>28 states · 8 UTs</span>
                <span>98% PIN coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row — slim footer */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-stone-950 px-5 py-5 sm:py-6 flex flex-col gap-1.5"
            >
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">{s.v}</div>
              <div
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${
                  s.tone === 'amber' ? 'text-amber-300' : 'text-emerald-300'
                }`}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
