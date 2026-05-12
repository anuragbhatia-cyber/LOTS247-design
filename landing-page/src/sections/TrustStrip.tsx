import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'

/* ---------- Number parsing for counter-up ---------- */

/** Animate only clean numeric stats like "75,000+" or "98%". Labels with
 *  non-numeric tails like "24×7" or "2 hr" look broken mid-count, so skip them. */
function parseStatNumber(label: string): { prefix: string; value: number; suffix: string } | null {
  const match = label.match(/^([\d.,]+)([+%]?)$/)
  if (!match) return null
  const raw = match[1].replace(/,/g, '')
  const value = parseFloat(raw)
  if (!Number.isFinite(value)) return null
  return { prefix: '', value, suffix: match[2] }
}

function formatCount(value: number, original: number): string {
  // Preserve integer formatting and thousands separators when the source had them.
  if (Number.isInteger(original)) {
    const rounded = Math.round(value)
    return original >= 1000 ? rounded.toLocaleString('en-IN') : String(rounded)
  }
  return value.toFixed(1)
}

/* ---------- Animated stat value ---------- */

function AnimatedStat({ label, start }: { label: string; start: boolean }) {
  const parsed = useMemo(() => parseStatNumber(label), [label])
  const [display, setDisplay] = useState<string>(parsed ? `${parsed.prefix}0${parsed.suffix}` : label)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!parsed || !start) return
    const duration = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = parsed.value * eased
      setDisplay(`${parsed.prefix}${formatCount(current, parsed.value)}${parsed.suffix}`)
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

export function TrustStrip() {
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
      { threshold: 0.25 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [inView])

  // Duplicate partner list so the marquee loop is seamless.
  const partners = t.trustPartners
  const marqueeRow = [...partners, ...partners]

  return (
    <section
      ref={sectionRef}
      className="relative bg-white border-y border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-emerald-700">
            {t.trustEyebrow}
          </p>
          <h2 className="mt-3 text-xl sm:text-2xl lg:text-[1.7rem] font-bold tracking-tight text-stone-900 leading-snug">
            {t.trustHeadline}
          </h2>
        </div>

        {/* Stats row */}
        <div className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-stone-200">
          {t.trustItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-2 lg:px-6"
            >
              <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-emerald-600 tracking-tight tabular-nums leading-none">
                <AnimatedStat label={item.label} start={inView} />
              </div>
              <div className="mt-2 text-sm text-stone-500 max-w-[14ch]">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner marquee */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <p className="text-center text-[10px] uppercase tracking-[0.24em] font-semibold text-stone-500">
            {t.trustPartnersLabel}
          </p>
        </div>
        <div
          className="relative overflow-hidden pb-8 lg:pb-10"
          aria-hidden="true"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-stone-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-stone-50 to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {marqueeRow.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center shrink-0 px-6 sm:px-8 lg:px-10"
              >
                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-stone-400 whitespace-nowrap">
                  {name}
                </span>
                <span
                  className="ml-6 sm:ml-8 lg:ml-10 h-1 w-1 rounded-full bg-stone-300"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
