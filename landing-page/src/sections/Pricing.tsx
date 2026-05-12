import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'

export function Pricing() {
  const { t } = useLang()

  return (
    <section id="pricing" className="bg-stone-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.pricingEyebrow}
          title={t.pricingHeadline}
          description={t.pricingSub}
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {/* LEFT — Main pricing card */}
          <div className="lg:col-span-3">
            <div className="relative h-full rounded-3xl overflow-hidden bg-white shadow-2xl shadow-stone-300/40 border-2 border-stone-900">
              {/* Top ribbon */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400" />

              <div className="p-8 lg:p-10">
                {/* Plan header */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-900 text-white">
                      <img src="/Udrive.webp" alt="" className="h-4 w-auto" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">UDrive Plan</span>
                    </div>
                    <div className="mt-4 text-lg font-bold text-stone-900">{t.pricingPlanName}</div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <StarIcon className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Best for SMEs</span>
                  </div>
                </div>

                {/* Big mono price */}
                <div className="mt-8">
                  <div className="font-mono text-7xl lg:text-8xl font-bold tracking-tight text-stone-900 leading-none">
                    {t.pricingPrice}
                  </div>
                  <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                    <div className="text-sm font-semibold text-stone-700">{t.pricingPriceUnit}</div>
                    <div className="text-xs text-stone-500">·</div>
                    <div className="text-xs text-stone-500">{t.pricingMonthlyEquivalent}</div>
                  </div>
                </div>

                {/* Dominant wallet bonus block */}
                <div className="mt-7 relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                  <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-emerald-400/30 blur-2xl pointer-events-none" />
                  <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />
                  <div className="relative p-5 flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <WalletIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                        Included in your plan
                      </div>
                      <div className="mt-1 text-lg font-bold leading-tight">
                        {t.pricingWalletHeadline}
                      </div>
                      <div className="mt-1 text-sm text-emerald-50/90 leading-snug">
                        {t.pricingWalletSubtext}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Includes — mobile accordion, desktop grid */}
                <div className="mt-7 pt-7 border-t border-stone-200">
                  <details className="group lg:hidden">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                        {t.pricingIncludesLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700">
                        <span className="group-open:hidden">Show all</span>
                        <span className="hidden group-open:inline">Hide</span>
                        <ChevronIcon className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                      </span>
                    </summary>
                    <ul className="mt-4 space-y-2.5">
                      {t.pricingIncludes.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                          <CheckIcon className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="hidden lg:block">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-4">
                      {t.pricingIncludesLabel}
                    </div>
                    <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                      {t.pricingIncludes.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                          <CheckIcon className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-7">
                  <a
                    href="#hero"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-xl shadow-emerald-500/30"
                  >
                    {t.pricingCTA}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </a>

                  <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {t.pricingCTAMicro}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-wider">
                      <ShieldIcon className="w-3 h-3" />
                      {t.pricingNoSetupBadge}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                  {t.pricingFinePrint}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Value reinforcement panel */}
          <aside className="lg:col-span-2 flex flex-col gap-5">
            {/* Net value reframe */}
            <div className="relative rounded-2xl bg-white border border-stone-200 p-6 shadow-sm">
              <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                {t.pricingNetValueLabel}
              </div>
              <h3 className="mt-3 text-xl lg:text-2xl font-bold text-stone-900 leading-tight">
                {t.pricingNetValueHeadline}
              </h3>

              {/* Math row */}
              <div className="mt-4 flex items-center gap-2 flex-wrap font-mono text-sm">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-bold">₹999</span>
                <span className="text-stone-400">+</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">₹1,499</span>
                <ArrowIcon className="w-4 h-4 text-stone-400" />
                <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-emerald-300 font-bold">+₹500</span>
              </div>

              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {t.pricingNetValueSub}
              </p>
            </div>

            {/* Comparison anchor */}
            <div className="rounded-2xl bg-stone-900 text-stone-100 p-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <span className="block h-px w-5 bg-amber-400" />
                {t.pricingCompareLabel}
              </div>

              <ul className="mt-4 divide-y divide-stone-800">
                {t.pricingCompareRows.map((row, i) => (
                  <li
                    key={i}
                    className={`flex items-baseline justify-between gap-3 py-2.5 ${row.highlight ? 'pt-3' : ''}`}
                  >
                    <span className={`text-sm ${row.highlight ? 'font-semibold text-white' : 'text-stone-400'}`}>
                      {row.label}
                    </span>
                    <span
                      className={`font-mono font-bold shrink-0 ${row.highlight ? 'text-emerald-400 text-lg' : 'text-stone-300 text-sm line-through decoration-stone-600'}`}
                    >
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial chip */}
            <div className="rounded-2xl bg-white border border-stone-200 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                  {initials(t.pricingTestimonialName)}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {t.pricingTestimonialLabel}
                  </div>
                  <p className="mt-1.5 text-sm text-stone-800 leading-snug">
                    <span className="text-emerald-500 font-mono">“</span>
                    {t.pricingTestimonialQuote}
                    <span className="text-emerald-500 font-mono">”</span>
                  </p>
                  <div className="mt-2 text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">{t.pricingTestimonialName}</span>
                    <span className="mx-1.5">·</span>
                    {t.pricingTestimonialRole}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>)
}
function StarIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)
}
function WalletIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>)
}
function ClockIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>)
}
function ShieldIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>)
}
function ChevronIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>)
}
function ArrowIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>)
}
