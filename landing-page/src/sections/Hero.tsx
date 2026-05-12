import { useLang } from '@/lib/i18n'
import { VehicleEntry } from '@/components/VehicleEntry'

export function Hero() {
  const { t } = useLang()
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-stone-950 text-white -mt-16 lg:-mt-[72px] pt-40 lg:pt-48 pb-20 lg:pb-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — Copy */}
          <div className="lg:col-span-7 animate-fade-up">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.05] tracking-tight text-balance max-w-2xl">
              {t.heroHeadline}
            </h1>

            {/* Core promise */}
            <div className="mt-6">
              <p className="text-sm sm:text-base font-semibold text-emerald-300 uppercase tracking-wider">
                {t.corePromise}
              </p>
            </div>

            {/* Subhead */}
            <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed">
              {t.heroSub}
            </p>
          </div>

          {/* RIGHT — Vehicle Entry Form */}
          <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <VehicleEntry variant="on-dark" />
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#trust"
          className="mt-16 lg:mt-20 flex flex-col items-center gap-2 text-stone-500 hover:text-stone-300 transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
            {t.heroScrollCue}
          </span>
          <ChevronDownIcon className="w-4 h-4 animate-blink group-hover:text-emerald-400" />
        </a>
      </div>
    </section>
  )
}

function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
