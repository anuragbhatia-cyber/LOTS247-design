import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'

export function RoadReality() {
  const { t } = useLang()
  const cardIcons = [PoliceIcon, ChallanIcon, ClockIcon]

  return (
    <section
      id="road-reality"
      className="relative bg-stone-50 pt-20 lg:pt-28 pb-10 lg:pb-12 overflow-hidden"
    >
      {/* Warning-territory atmosphere: subtle hazard dots + soft amber wash */}
      <div className="absolute inset-0 bg-hazard-dots opacity-70 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.10), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.realityEyebrow}
          title={t.realityHeadline}
          accent="amber"
        />

        {/* 3-card row */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {t.realityCards.map((card, i) => {
            const Icon = cardIcons[i] ?? ChallanIcon
            return (
              <article
                key={i}
                className="group relative rounded-2xl bg-white p-6 border border-stone-200 hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/60 flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 group-hover:bg-amber-100 transition-colors">
                  <Icon className="w-[22px] h-[22px]" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-stone-900 leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{card.body}</p>

                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-[12px] font-semibold text-amber-800">
                    <DotIcon className="w-1.5 h-1.5" />
                    {card.impact}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg shadow-emerald-500/30"
          >
            {t.realityCTA}
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function PoliceIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" /><circle cx="12" cy="11" r="2.5" /><path d="M12 13.5V17" /></svg>)
}
function ChallanIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>)
}
function ClockIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>)
}
function DotIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 8 8" fill="currentColor" aria-hidden="true"><circle cx="4" cy="4" r="4" /></svg>)
}
function ArrowIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>)
}
