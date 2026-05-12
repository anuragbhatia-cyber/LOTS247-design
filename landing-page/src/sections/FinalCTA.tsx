import { useLang } from '@/lib/i18n'
import { VehicleEntry } from '@/components/VehicleEntry'

export function FinalCTA() {
  const { t } = useLang()

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden py-20 lg:py-28">
      {/* Background scaffolding */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      {/* Soft right-side emerald glow that anchors the form */}
      <div
        className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 h-[720px] w-[720px] rounded-full opacity-25 blur-3xl animate-cta-glow"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.55), transparent 60%)' }}
        aria-hidden="true"
      />
      {/* Subtle left-side warm glow */}
      <div
        className="absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.18), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Split grid: left = argument, right = action */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT — closing argument */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] text-white">
              {t.finalHeadline}
            </h2>

            <p className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl">
              {t.finalClosingArg}
            </p>

            {/* Urgency micro-stats — desktop only here (mobile renders below form) */}
            <div className="hidden lg:grid grid-cols-2 gap-px mt-10 rounded-2xl overflow-hidden bg-white/10 border border-white/10">
              {t.finalUrgencyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-stone-950 p-5"
                >
                  <div className="text-2xl xl:text-3xl font-bold text-white tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-stone-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — action panel */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            {/* Action panel frame */}
            <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-5 sm:p-6 lg:p-7 shadow-2xl shadow-emerald-500/5">
              {/* Form heading */}
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {t.finalFormLabel}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-400">
                {t.finalFormCaption}
              </p>

              {/* The form itself */}
              <div className="mt-5">
                <VehicleEntry variant="on-dark" />
              </div>

              {/* Decorative orbit — soft, behind glass */}
              <div
                className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Outer ambient glow for the action card */}
            <div
              className="absolute -inset-px rounded-3xl -z-10 opacity-50 blur-2xl"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.35), transparent 70%)' }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Urgency micro-stats — mobile only (below form) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-10 lg:hidden rounded-2xl overflow-hidden bg-white/10 border border-white/10">
          {t.finalUrgencyStats.map((stat) => (
            <div key={stat.label} className="bg-stone-950 p-4">
              <div className="text-xl font-bold text-white tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-stone-400 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Closing punctuation — the core promise as page-wide caption */}
        <div className="mt-20 lg:mt-28 pt-10 lg:pt-12 border-t border-white/10">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] text-emerald-400/90">
              {t.corePromise}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

