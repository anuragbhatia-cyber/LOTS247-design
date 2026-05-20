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
      id="trust"
      ref={sectionRef}
      className="relative bg-[var(--color-cream)] border-b border-stone-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-16 lg:pb-20">
        {/* Headline — kicker + serif */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono-label text-[11px] text-emerald-700">
              {t.trustEyebrow}
            </span>
            <span aria-hidden="true" className="rule-em w-12 opacity-80 text-stone-300" />
          </div>
          <h2 className="font-serif-display mt-5 font-semibold tracking-tight text-stone-900 text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.05]">
            {t.trustHeadline}
          </h2>
        </div>

        {/* Stats row — editorial scale, tabular numerals, hairline dividers */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4">
          {t.trustItems.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-3 lg:px-8 py-6 lg:py-4 ${
                i > 0 ? 'lg:border-l border-stone-300/60' : ''
              } ${i === 1 ? 'border-l border-stone-300/60 lg:border-l' : ''}`}
            >
              <div
                className="font-serif-display font-medium text-stone-900 num-tabular
                           text-[3.25rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.5rem]
                           leading-[0.92] tracking-[-0.02em]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
              >
                <AnimatedStat label={item.label} start={inView} />
              </div>
              <div className="mt-4 font-mono-label text-[10px] text-stone-500 max-w-[18ch]">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner marquee — quieter, on ink soft band for contrast */}
      <div className="border-t border-stone-200/70 bg-[var(--color-cream-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10">
          <p className="text-center font-mono-label text-[10px] text-stone-500">
            {t.trustPartnersLabel}
          </p>
        </div>
        <div
          className="relative overflow-hidden pb-8 lg:pb-10 mt-5"
          aria-hidden="true"
        >
          {/* Edge fades — match the cream-deep bg */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[var(--color-cream-deep)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[var(--color-cream-deep)] to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {marqueeRow.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center shrink-0 px-6 sm:px-8 lg:px-10"
              >
                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-stone-500 whitespace-nowrap">
                  {name}
                </span>
                <span
                  className="ml-6 sm:ml-8 lg:ml-10 h-1 w-1 rounded-full bg-stone-400"
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
