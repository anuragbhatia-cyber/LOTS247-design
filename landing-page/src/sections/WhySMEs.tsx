import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'

/* ---------- Number parsing for counter-up (mirrors TrustStrip) ---------- */

/** Animate only clean numeric stats like "85%" or "1,200+". Mixed-content
 *  labels like "1 stopped trip" or "1 dashboard" look broken mid-count. */
function parseStatNumber(
  label: string,
): { prefix: string; value: number; suffix: string } | null {
  const match = label.match(/^([\d.,]+)([+%]?)$/)
  if (!match) return null
  const raw = match[1].replace(/,/g, '')
  const value = parseFloat(raw)
  if (!Number.isFinite(value)) return null
  return { prefix: '', value, suffix: match[2] }
}

function formatCount(value: number, original: number): string {
  if (Number.isInteger(original)) {
    const rounded = Math.round(value)
    return original >= 1000 ? rounded.toLocaleString('en-IN') : String(rounded)
  }
  return value.toFixed(1)
}

function AnimatedStat({ label, start }: { label: string; start: boolean }) {
  const parsed = useMemo(() => parseStatNumber(label), [label])
  const [display, setDisplay] = useState<string>(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : label,
  )
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!parsed || !start) return
    const duration = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = parsed.value * eased
      setDisplay(
        `${parsed.prefix}${formatCount(current, parsed.value)}${parsed.suffix}`,
      )
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(label)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [parsed, start, label])

  if (!parsed) return <>{label}</>
  return <>{display}</>
}

/* ---------- Main section ---------- */

export function WhySMEs() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || inView) return
    const node = sectionRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [inView])

  // Reuse an existing SME-voiced testimonial — the cab operator quote fits perfectly.
  const sme = t.testimonials[2]

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-50 py-20 lg:py-28 overflow-hidden"
    >
      {/* Concrete-texture wash: warm noise + faint emerald glow, kept subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hazard-dots opacity-[0.35]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-5">
          <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-emerald-700">
            {t.smeEyebrow}
          </span>
        </div>

        {/* Editorial headline block — pull-quote treatment */}
        <div className="relative max-w-4xl">
          {/* Oversized opening quote glyph */}
          <span
            aria-hidden="true"
            className="absolute -top-10 -left-2 sm:-top-14 sm:-left-6 select-none font-serif text-[10rem] sm:text-[14rem] leading-none text-emerald-200/70"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            &ldquo;
          </span>
          <h2 className="relative text-3xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-stone-900 leading-[1.05]">
            {t.smeHeadline}
          </h2>
          <p className="relative mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed">
            {t.smeSub}
          </p>
        </div>

        {/* Editorial divider */}
        <div className="mt-14 lg:mt-16 flex items-center gap-4">
          <span className="block h-px flex-1 bg-stone-300" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">
            By the numbers
          </span>
          <span className="block h-px flex-1 bg-stone-300" />
        </div>

        {/* Stats strip — giant IBM Plex Mono numbers, counter-up */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-stone-300/70">
          {t.smeStats.map((stat, i) => {
            const parsed = parseStatNumber(stat.value)
            return (
              <div
                key={i}
                className="px-0 sm:px-8 first:sm:pl-0 last:sm:pr-0 py-6 sm:py-2"
              >
                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight tabular-nums leading-none whitespace-nowrap">
                  {parsed ? (
                    <AnimatedStat label={stat.value} start={inView} />
                  ) : (
                    <span>{stat.value}</span>
                  )}
                </div>
                <div className="mt-3 text-sm sm:text-[15px] text-stone-600 leading-relaxed max-w-[28ch]">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Closing block: pull-quote chip + CTA as culmination */}
        <div className="mt-14 lg:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <figure className="lg:col-span-7 border-l-2 border-emerald-500 pl-5 sm:pl-6">
            <blockquote className="italic text-lg sm:text-xl lg:text-2xl text-stone-800 leading-snug">
              &ldquo;{sme.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] font-semibold text-stone-500">
              <span className="text-stone-700">{sme.name}</span>
              <span className="mx-2 text-stone-400">/</span>
              <span className="normal-case tracking-normal font-normal text-stone-500">
                {sme.role}
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-5 lg:text-right">
            <a
              href="#hero"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm sm:text-base font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-xl shadow-emerald-500/30"
            >
              {t.smeCTA}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
