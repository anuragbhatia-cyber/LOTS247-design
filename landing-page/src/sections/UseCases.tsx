import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'

/* Inline scene icons — one per case (police siren / receipt / accident car / RTO doc) */
function SceneIcon({ idx, className = '' }: { idx: number; className?: string }) {
  // 0 = police siren, 1 = receipt/challan, 2 = accident car, 3 = RTO document
  if (idx === 0) {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 38h32v6H16z" />
        <path d="M20 38v-6a12 12 0 0 1 24 0v6" />
        <circle cx="32" cy="20" r="3" />
        <path d="M32 12V8" />
        <path d="M12 44h40" />
        <path d="M20 44v6M44 44v6" />
      </svg>
    )
  }
  if (idx === 1) {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h28v44l-5-4-5 4-5-4-5 4-5-4-3 4z" />
        <path d="M24 22h16M24 30h16M24 38h10" />
      </svg>
    )
  }
  if (idx === 2) {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 42h44" />
        <path d="M14 42v-8l6-10h24l6 10v8" />
        <circle cx="20" cy="46" r="4" />
        <circle cx="44" cy="46" r="4" />
        <path d="M28 18l-3-6M36 18l3-6" />
        <path d="M30 28l4 4M34 28l-4 4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8h24l8 8v40H16z" />
      <path d="M40 8v8h8" />
      <path d="M22 26h20M22 34h20M22 42h14" />
    </svg>
  )
}

/* Accent palette per scenario (emerald/amber only, per design rules) */
const accents = [
  { ring: 'ring-emerald-200', text: 'text-emerald-700', bg: 'bg-emerald-50',  border: 'border-emerald-200', dot: 'bg-emerald-500', soft: 'bg-emerald-100' },
  { ring: 'ring-amber-200',   text: 'text-amber-700',   bg: 'bg-amber-50',    border: 'border-amber-200',   dot: 'bg-amber-500',   soft: 'bg-amber-100'   },
  { ring: 'ring-emerald-200', text: 'text-emerald-700', bg: 'bg-emerald-50',  border: 'border-emerald-200', dot: 'bg-emerald-500', soft: 'bg-emerald-100' },
  { ring: 'ring-amber-200',   text: 'text-amber-700',   bg: 'bg-amber-50',    border: 'border-amber-200',   dot: 'bg-amber-500',   soft: 'bg-amber-100'   },
]

export function UseCases() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const userTouched = useRef(false)

  // Auto-cycle every 5s until the user interacts.
  useEffect(() => {
    if (paused || userTouched.current) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % t.cases.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [paused, t.cases.length])

  const current = t.cases[active]
  const accent = accents[active % accents.length]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.casesEyebrow}
          title={t.casesHeadline}
        />

        {/* Scenario tab chips */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {t.cases.map((c, i) => {
            const isActive = i === active
            const a = accents[i % accents.length]
            return (
              <button
                key={i}
                type="button"
                onClick={() => { userTouched.current = true; setActive(i) }}
                className={[
                  'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300',
                  isActive
                    ? `bg-stone-900 text-white border-stone-900 shadow-md`
                    : `bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:text-stone-900`,
                ].join(' ')}
                aria-pressed={isActive}
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest opacity-70">
                  0{i + 1}
                </span>
                <span className="truncate max-w-[180px] sm:max-w-none">{c.title}</span>
              </button>
            )
          })}
        </div>

        {/* Detail panel: 2 columns on lg, 1 on mobile */}
        <div
          key={active}
          className="mt-10 animate-fade-up rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-5">
            {/* Left: scenario text — SCENARIO → ACTION → OUTCOME */}
            <div className="lg:col-span-3 p-7 sm:p-10 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {current.title}
              </h3>

              <p className="mt-3 text-base text-stone-600 leading-relaxed max-w-xl">
                {current.body}
              </p>

              {/* Scenario → Action → Outcome rail */}
              <div className="mt-8 space-y-4">
                {/* Action */}
                {current.action && (
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 h-8 w-8 rounded-full ${accent.soft} ${accent.text} flex items-center justify-center`}>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-stone-400">
                        What UDrive does
                      </div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-stone-900">
                        {current.action}
                      </div>
                    </div>
                  </div>
                )}

                {/* Outcome chip */}
                {current.outcome && (
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 h-8 w-8 rounded-full ${accent.soft} ${accent.text} flex items-center justify-center`}>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-stone-400">
                        Outcome
                      </div>
                      <div className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold ${accent.bg} ${accent.text} border ${accent.border}`}>
                        {current.outcome}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: scene visual — phone-style card with the scenario context */}
            <div className="lg:col-span-2 relative bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200 p-7 sm:p-10 flex items-center justify-center overflow-hidden min-h-[260px]">
              {/* soft accent halo */}
              <div className={`pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full ${accent.soft} blur-2xl opacity-60`} />
              <div className={`pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full ${accent.soft} blur-2xl opacity-50`} />

              {/* Phone-shaped scene card */}
              <div className="relative w-full max-w-[240px] animate-phone-float">
                <div className="rounded-[28px] border border-stone-200 bg-white shadow-xl shadow-stone-900/5 p-4">
                  {/* status row */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-stone-400">
                      UDRIVE · 24×7
                    </span>
                    <span className={`h-2 w-2 rounded-full ${accent.dot} animate-soft-pulse`} />
                  </div>

                  {/* scene icon */}
                  <div className={`mt-4 rounded-2xl ${accent.bg} ${accent.text} border ${accent.border} p-5 flex items-center justify-center`}>
                    <SceneIcon idx={active} className="h-14 w-14" />
                  </div>

                  {/* tiny scenario read-out */}
                  <div className="mt-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-stone-400">
                      {current.time || '—'}
                    </div>
                    <div className="mt-1 text-[13px] font-semibold text-stone-900 leading-snug">
                      {current.title}
                    </div>
                  </div>

                  {/* action pill */}
                  {current.action && (
                    <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full ${accent.soft} ${accent.text} px-2.5 py-1 text-[11px] font-semibold`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                      {current.action}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA — re-anchored to the scenario above */}
        <div className="mt-12 text-center">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg shadow-emerald-500/30"
          >
            {t.casesCTA}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
