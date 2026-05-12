import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'

export function HowItWorks() {
  const { t } = useLang()
  const steps = t.howSteps
  const totalSteps = steps.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)

  // Auto-cycle through steps every ~3s; pause on hover
  useEffect(() => {
    if (paused) return
    intervalRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % totalSteps)
    }, 3000)
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [paused, totalSteps])

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.howEyebrow}
          title={t.howHeadline}
          description={t.howSub}
        />

        {/* Top progress dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5" aria-hidden="true">
          {steps.map((_, i) => {
            const isActive = i === active
            const isCore = i < 3
            return (
              <span
                key={i}
                className={[
                  'block h-1.5 rounded-full transition-all duration-500',
                  isActive
                    ? isCore
                      ? 'w-10 bg-stone-900'
                      : 'w-10 bg-emerald-500'
                    : 'w-1.5 bg-stone-300',
                ].join(' ')}
              />
            )
          })}
        </div>

        <div
          className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT: stepper */}
          <div>
            <div className="relative">
              {/* Vertical track (mobile + desktop) */}
              <div className="absolute left-[40px] sm:left-[44px] top-7 bottom-7 w-px bg-stone-200 z-0" aria-hidden="true" />
              {/* Animated emerald progress dot traveling along the track */}
              <div
                className="absolute left-[40px] sm:left-[44px] top-7 bottom-7 w-px overflow-hidden pointer-events-none z-0"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 -translate-x-1/2 -top-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_2px_rgba(16,185,129,0.45)] animate-step-travel" />
              </div>

              <ol className="space-y-3">
              {steps.map((step, i) => {
                const isActive = i === active
                const isFinal = i === totalSteps - 1
                const isCore = i < 3
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        'group relative z-10 w-full text-left flex items-start gap-5 rounded-2xl px-3 py-4 sm:px-4 sm:py-5 transition-all duration-300',
                        isActive
                          ? isFinal
                            ? 'bg-emerald-50 ring-1 ring-emerald-200'
                            : 'bg-stone-50 ring-1 ring-stone-200'
                          : 'hover:bg-stone-50/60',
                      ].join(' ')}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      {/* Number circle */}
                      <span
                        className={[
                          'relative shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full text-sm font-bold transition-all duration-300',
                          isFinal
                            ? isActive
                              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                              : 'bg-white text-emerald-700 ring-2 ring-emerald-300'
                            : isActive
                              ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/20'
                              : 'bg-white text-stone-500 ring-1 ring-stone-300',
                        ].join(' ')}
                      >
                        {isCore && i < active ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <span className="font-mono">0{i + 1}</span>
                        )}
                        {isActive && isFinal && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-emerald-400 ring-offset-2 ring-offset-white animate-blink" aria-hidden="true" />
                        )}
                      </span>

                      {/* Text block */}
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center flex-wrap gap-2">
                          <span className={[
                            'text-base sm:text-lg font-bold leading-tight',
                            isActive ? 'text-stone-900' : 'text-stone-700',
                          ].join(' ')}>
                            {step.title}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-sm text-stone-600 leading-relaxed">
                          {step.body}
                        </span>
                        {/* Inline phone preview for mobile (hidden on lg+) */}
                        <span className={[
                          'lg:hidden mt-4 block overflow-hidden transition-all duration-500',
                          isActive ? 'max-h-[360px] opacity-100' : 'max-h-0 opacity-0',
                        ].join(' ')}>
                          <PhoneState step={i} />
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
              </ol>
            </div>

            {/* CTA — sits directly below the "Activate support" step */}
            <div className="mt-8 pl-3 sm:pl-4">
              <a
                href="#hero"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg shadow-emerald-500/30"
              >
                {t.howCTA}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
          </div>

          {/* RIGHT: phone progression (lg+) */}
          <div className="hidden lg:block sticky top-24">
            <div className="relative mx-auto w-full max-w-[280px]">
              <PhoneFrame>
                <PhoneState step={active} />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Subcomponents ----------------------------- */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[40px] bg-stone-900 p-3 shadow-2xl shadow-stone-900/20 ring-1 ring-stone-800">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl bg-stone-900 z-10" aria-hidden="true" />
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[28px] bg-white">
        {children}
      </div>
    </div>
  )
}

function PhoneState({ step }: { step: number }) {
  return (
    <div className="absolute inset-0">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-mono text-stone-500">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="block w-1 h-1 rounded-full bg-stone-400" />
          <span className="block w-1 h-1 rounded-full bg-stone-400" />
          <span className="block w-1 h-1 rounded-full bg-stone-400" />
        </span>
      </div>

      {/* Brand bar */}
      <div className="px-5 mt-2 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-stone-900 text-white text-[10px] font-bold font-mono">U</span>
        <span className="text-[11px] font-bold tracking-tight text-stone-900">UDrive</span>
      </div>

      <div className="px-5 mt-4 transition-opacity duration-300">
        {step === 0 && <ScreenEnterDetails />}
        {step === 1 && <ScreenOTP />}
        {step === 2 && <ScreenDashboardReady />}
        {step === 3 && <ScreenActivate />}
      </div>
    </div>
  )
}

function ScreenEnterDetails() {
  return (
    <div className="animate-fade-in">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-stone-500">Step 01</p>
      <h4 className="mt-1 text-base font-bold text-stone-900 leading-tight">Enter vehicle details</h4>

      <label className="mt-4 block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Vehicle number</label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3 py-2.5">
        <TruckIcon className="w-4 h-4 text-stone-500" />
        <span className="text-sm font-mono font-semibold text-stone-900 tracking-wider">DL01AB1234</span>
        <span className="ml-auto block w-px h-4 bg-stone-900 animate-blink" />
      </div>

      <label className="mt-3 block text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Mobile</label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3 py-2.5">
        <PhoneIcon className="w-4 h-4 text-stone-500" />
        <span className="text-sm font-mono text-stone-900">+91 98xxx xxxxx</span>
      </div>

      <div className="mt-5 w-full rounded-full bg-stone-900 text-white text-xs font-semibold py-2.5 text-center">
        Create my dashboard
      </div>
      <p className="mt-2 text-[10px] text-stone-500 text-center">No documents upfront</p>
    </div>
  )
}

function ScreenOTP() {
  return (
    <div className="animate-fade-in">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-stone-500">Step 02</p>
      <h4 className="mt-1 text-base font-bold text-stone-900 leading-tight">Verify OTP</h4>
      <p className="mt-2 text-[11px] text-stone-600">Sent to +91 98xxx xxxxx</p>

      <div className="mt-5 flex items-center justify-between gap-2">
        {['4', '8', '2', '1', '7', '9'].map((d, i) => (
          <div
            key={i}
            className={[
              'flex-1 aspect-square rounded-xl border flex items-center justify-center text-lg font-bold font-mono',
              i < 5 ? 'border-stone-300 bg-white text-stone-900' : 'border-stone-900 bg-stone-50 text-stone-900',
            ].join(' ')}
          >
            {i < 5 ? d : <span className="w-px h-5 bg-stone-900 animate-blink" />}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 ring-1 ring-emerald-200 px-3 py-2">
        <CheckIcon className="w-4 h-4 text-emerald-600" />
        <span className="text-[11px] font-semibold text-emerald-700">Auto-detecting from SMS…</span>
      </div>

      <p className="mt-4 text-[10px] text-stone-500 text-center">Resend in 0:24</p>
    </div>
  )
}

function ScreenDashboardReady() {
  return (
    <div className="animate-fade-in">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-stone-500">Step 03</p>
      <h4 className="mt-1 text-base font-bold text-stone-900 leading-tight">Dashboard ready</h4>

      <div className="mt-4 rounded-xl bg-stone-50 ring-1 ring-stone-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TruckIcon className="w-4 h-4 text-stone-700" />
            <span className="text-xs font-mono font-semibold text-stone-900 tracking-wider">DL01AB1234</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-emerald-500" /> Live
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
          <div className="text-stone-500">RC verified</div>
          <div className="text-stone-900 font-semibold text-right">Yes</div>
          <div className="text-stone-500">Challan check</div>
          <div className="text-stone-900 font-semibold text-right">0 open</div>
          <div className="text-stone-500">Support</div>
          <div className="text-amber-600 font-semibold text-right">Locked</div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-dashed border-stone-300 p-3">
        <div className="flex items-center gap-2">
          <LockIcon className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-[11px] font-semibold text-stone-700">Activate to unlock support</span>
        </div>
        <p className="mt-1 text-[10px] text-stone-500 leading-relaxed">24×7 legal, challan & on-ground lawyer.</p>
      </div>

      <div className="mt-3 w-full rounded-full bg-stone-900 text-white text-xs font-semibold py-2.5 text-center">
        Continue
      </div>
    </div>
  )
}

function ScreenActivate() {
  return (
    <div className="animate-fade-in">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-600">Step 04 · Activation</p>
      <h4 className="mt-1 text-base font-bold text-stone-900 leading-tight">Unlock support</h4>

      <div className="mt-4 rounded-xl bg-stone-900 text-white p-3 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-500/15 blur-2xl" />
        <div className="relative">
          <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">UDrive Vehicle Plan</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold">₹999</span>
            <span className="text-[10px] text-stone-400">/ vehicle / yr</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-soft-pulse" />
            <span className="text-[10px] font-semibold text-emerald-300">Wallet ₹1,499 added</span>
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5">
        {['24×7 legal support', 'Challan assistance', 'On-ground lawyer*'].map((item) => (
          <li key={item} className="flex items-center gap-2 text-[11px] text-stone-700">
            <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-4 w-full rounded-full bg-emerald-500 text-white text-xs font-bold py-2.5 shadow-lg shadow-emerald-500/30 text-center">
        Activate ₹999
      </div>
    </div>
  )
}

/* ---------------------------------- Icons --------------------------------- */

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5 12 10 17 19 7" />
    </svg>
  )
}

function TruckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="13" height="10" rx="1" />
      <path d="M14 9h4l3 3v4h-7z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  )
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}
