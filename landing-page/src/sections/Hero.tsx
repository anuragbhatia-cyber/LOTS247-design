import { useLang } from '@/lib/i18n'
import { VehicleEntry } from '@/components/VehicleEntry'

export function Hero() {
  const { t } = useLang()
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white -mt-16 lg:-mt-[72px] pt-36 lg:pt-44 pb-24 lg:pb-32"
    >
      {/* Atmospheric backdrop — concentric radials + grain. Adds depth instead of flat ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 520px at 22% 18%, rgba(0,184,118,0.10), transparent 60%), radial-gradient(700px 600px at 92% 70%, rgba(255,255,255,0.04), transparent 60%)',
        }}
      />
      {/* Hairline grid — operational feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Live status bar — operational signage */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 lg:mb-14 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono-label text-stone-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>{t.corePromise}</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Editorial display */}
          <div className="lg:col-span-7 animate-fade-up">
            <h1
              className="font-serif-display font-medium text-balance text-white
                         text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem]
                         leading-[0.98] tracking-[-0.025em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
            >
              {t.heroHeadline}
            </h1>

            {/* Subhead */}
            <p className="mt-8 text-base sm:text-lg lg:text-xl text-stone-300 max-w-xl leading-relaxed">
              {t.heroSub}
            </p>
          </div>

          {/* RIGHT — Vehicle entry on raised paper card */}
          <div className="lg:col-span-5 animate-fade-up lg:pt-2" style={{ animationDelay: '120ms' }}>
            <VehicleEntry variant="on-dark" />
          </div>
        </div>

        {/* Scroll cue — softer, integrated */}
        <a
          href="#trust"
          className="mt-20 lg:mt-28 inline-flex items-center gap-3 text-stone-400 hover:text-emerald-300 transition-colors group"
        >
          <span className="font-mono-label text-[10px]">
            {t.heroScrollCue}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-stone-700 group-hover:bg-emerald-400/60 transition-colors" />
          <ChevronDownIcon className="w-3.5 h-3.5 animate-blink" />
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
