import { useLang } from '@/lib/i18n'

export function DashboardPreview() {
  const { t } = useLang()
  return (
    <section className="bg-gradient-to-b from-stone-950 to-stone-900 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[1100px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-400">
            {t.dashEyebrow}
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]">
            {t.dashHeadline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed">
            {t.dashSub}
          </p>
        </div>

        {/* Dashboard preview image with locked overlay */}
        <div className="mt-14 relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-stone-900/80 shadow-2xl shadow-emerald-500/10">
            <img
              src="/dashboard-preview.png"
              alt="UDrive dashboard preview"
              className="block w-full h-auto"
            />

            {/* Lock overlay — covers right ~60% on desktop, full on mobile */}
            <div
              className="absolute inset-y-0 right-0 left-0 lg:left-[42%] backdrop-blur-md bg-white/55 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              {/* gradient fade so it doesn't cut harshly */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 8%, rgba(255,255,255,0.7) 100%)',
                }}
              />

              <div className="relative text-center px-5 w-full max-w-md pointer-events-auto">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-900 text-white shadow-2xl">
                  <LockIcon className="w-6 h-6" />
                </div>

                {/* Locked feature pills */}
                <div className="mt-5 space-y-1.5">
                  {LOCKED_FEATURES.map((f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between gap-2 rounded-lg bg-white/70 border border-stone-200 px-3 py-1.5 text-[11px] text-stone-800"
                    >
                      <span className="truncate">{f}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-amber-600 uppercase tracking-wider flex-shrink-0">
                        <LockIcon className="w-2.5 h-2.5" />
                        Locked
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm font-semibold text-stone-900 leading-snug">
                  {t.dashLocked}
                </p>
                <a
                  href="#hero"
                  className="mt-4 flex w-full items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/30"
                >
                  {t.dashCTA}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const LOCKED_FEATURES = [
  'Call legal support',
  'Resolve open challan',
  'Activate wallet credits',
]

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
