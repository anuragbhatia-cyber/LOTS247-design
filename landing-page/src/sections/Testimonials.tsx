import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'

const avatarGradients = [
  'from-stone-700 to-stone-900',
  'from-stone-600 to-stone-900',
  'from-stone-800 to-stone-950',
]

export function Testimonials() {
  const { t } = useLang()

  return (
    <section className="bg-stone-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.testEyebrow}
          title={t.testHeadline}
        />

        {/* Asymmetric card row — middle card lifted on lg */}
        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6 md:items-stretch">
          {t.testimonials.map((tt, i) => {
            const isLifted = i === 1
            return (
              <figure
                key={i}
                className={[
                  'relative overflow-hidden rounded-2xl bg-white border border-stone-200 flex flex-col',
                  'hover:shadow-xl hover:shadow-stone-200/60 transition-shadow',
                  isLifted
                    ? 'p-7 lg:p-8 lg:-translate-y-2 lg:shadow-lg lg:shadow-stone-200/60 lg:border-stone-300'
                    : 'p-7',
                ].join(' ')}
              >
                {/* Faint background quote glyph */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -left-2 text-[180px] leading-none font-serif text-stone-200/80 select-none"
                >
                  &ldquo;
                </span>

                {/* Top row: verified badge + relationship */}
                <div className="relative flex items-center justify-between gap-2">
                  {tt.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      <CheckBadgeIcon className="h-3.5 w-3.5" />
                      {t.testVerifiedLabel}
                    </span>
                  )}
                  <StarRow count={5} />
                </div>

                {/* Quote */}
                <blockquote className="relative mt-5 text-[15px] lg:text-[15.5px] text-stone-800 leading-relaxed flex-1">
                  {tt.quote}
                </blockquote>

                {/* Meta chips */}
                <div className="relative mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2 py-1 text-[11px] text-stone-700 font-mono">
                    <PinIcon className="h-3 w-3 text-stone-500" />
                    {tt.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2 py-1 text-[11px] text-stone-700">
                    <VehicleIcon type={tt.vehicleType} className="h-3 w-3 text-stone-500" />
                    {tt.vehicles}
                  </span>
                </div>

                {/* Caption */}
                <figcaption className="relative mt-5 pt-5 border-t border-stone-200 flex items-center gap-3">
                  <div className="shrink-0">
                    {tt.image ? (
                      <img
                        src={tt.image}
                        alt={tt.name}
                        className="h-11 w-11 rounded-full object-cover ring-1 ring-stone-900/10"
                      />
                    ) : (
                      <div
                        className={`h-11 w-11 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} text-white flex items-center justify-center text-sm font-bold ring-1 ring-stone-900/10`}
                      >
                        {initials(tt.name)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-stone-900 truncate">{tt.name}</div>
                    <div className="text-xs text-stone-500 truncate">{tt.role}</div>
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>

        {/* Marquee strip — more voices */}
        <div className="mt-12 lg:mt-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-stone-500 font-mono">
              {t.testMoreVoicesLabel}
            </span>
            <div className="h-px bg-stone-200 flex-1" />
          </div>
          <div className="relative overflow-hidden">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-stone-50 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-stone-50 to-transparent z-10" />
            <div className="flex gap-3 animate-marquee w-max">
              {[...t.testMoreVoices, ...t.testMoreVoices].map((line, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 shrink-0 rounded-full bg-white border border-stone-200 px-4 py-2 text-[12.5px] text-stone-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function initials(name: string) {
  return name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/* ---------- inline SVG icons ---------- */

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3 w-3 text-yellow-400"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.84L10 14.9l-5.25 2.74 1-5.84L1.5 7.66l5.9-.86L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function CheckBadgeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 1.6l2.1 1.5 2.6-.2.4 2.6 2.1 1.6-1.1 2.4 1.1 2.4-2.1 1.6-.4 2.6-2.6-.2L10 17.4l-2.1-1.5-2.6.2-.4-2.6-2.1-1.6 1.1-2.4-1.1-2.4 2.1-1.6.4-2.6 2.6.2L10 1.6z"
        fill="currentColor"
      />
      <path
        d="M6.5 10l2.2 2.2 4.4-4.4"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 1.5c-2.6 0-4.7 2.1-4.7 4.7 0 3.4 4.7 8.3 4.7 8.3s4.7-4.9 4.7-8.3c0-2.6-2.1-4.7-4.7-4.7z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="6.2" r="1.6" fill="currentColor" />
    </svg>
  )
}

function VehicleIcon({
  type,
  className = '',
}: {
  type: 'truck' | 'tempo' | 'cab'
  className?: string
}) {
  if (type === 'truck') {
    return (
      <svg viewBox="0 0 24 16" fill="none" className={className} aria-hidden="true">
        <rect x="1" y="3" width="13" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M14 6h4.5l3 3v2H14V6z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="5.5" cy="13" r="1.6" fill="currentColor" />
        <circle cx="17.5" cy="13" r="1.6" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'tempo') {
    return (
      <svg viewBox="0 0 24 16" fill="none" className={className} aria-hidden="true">
        <path
          d="M2 11V5.5L6 3h10l4 4v4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <rect x="2" y="7" width="18" height="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="6.5" cy="13" r="1.6" fill="currentColor" />
        <circle cx="16.5" cy="13" r="1.6" fill="currentColor" />
      </svg>
    )
  }
  // cab
  return (
    <svg viewBox="0 0 24 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 11V8l2-4h14l2 4v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <rect x="3" y="8" width="18" height="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="13" r="1.6" fill="currentColor" />
      <circle cx="17" cy="13" r="1.6" fill="currentColor" />
    </svg>
  )
}
