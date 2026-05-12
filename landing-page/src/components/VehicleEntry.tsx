import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface VehicleEntryProps {
  variant?: 'on-dark' | 'on-light'
  className?: string
}

export function VehicleEntry({ variant = 'on-dark', className }: VehicleEntryProps) {
  const { t } = useLang()
  const [vehicle, setVehicle] = useState('')
  const [mobile, setMobile] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const formatVehicle = (val: string) =>
    val
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 10)

  const formatMobile = (val: string) => val.replace(/\D/g, '').slice(0, 10)

  const isValid = vehicle.length >= 8 && mobile.length === 10

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2400)
  }

  const onDark = variant === 'on-dark'

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative w-full rounded-2xl overflow-hidden shadow-2xl',
        onDark
          ? 'bg-gradient-to-b from-stone-800/90 to-stone-900 ring-1 ring-white/10 shadow-stone-950/60'
          : 'bg-white ring-1 ring-stone-200 shadow-stone-200/60',
        className,
      )}
    >
      {/* Top emerald accent bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
      />

      {/* Inputs */}
      <div className="px-5 py-5 flex flex-col gap-3.5">
        {/* Vehicle number */}
        <div>
          <label
            htmlFor="ve-vehicle"
            className={cn(
              'block text-[10px] font-bold uppercase tracking-wider mb-1.5',
              onDark ? 'text-stone-400' : 'text-stone-500',
            )}
          >
            Vehicle number
          </label>
          <div
            className={cn(
              'flex items-center gap-3 px-4 h-12 rounded-xl border transition-all',
              onDark
                ? 'bg-stone-950/60 border-white/10 focus-within:border-emerald-500/60 focus-within:bg-stone-950 focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
                : 'bg-stone-50 border-stone-200 focus-within:border-stone-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]',
            )}
          >
            <VehicleIcon
              className={cn('w-5 h-5 shrink-0', onDark ? 'text-stone-500' : 'text-stone-400')}
            />
            <input
              id="ve-vehicle"
              type="text"
              inputMode="text"
              autoComplete="off"
              value={vehicle}
              onChange={(e) => setVehicle(formatVehicle(e.target.value))}
              placeholder="DL01AB1234"
              className={cn(
                'w-full bg-transparent outline-none text-sm sm:text-base font-mono tracking-[0.12em] placeholder:font-sans placeholder:tracking-normal',
                onDark
                  ? 'text-white placeholder:text-stone-600'
                  : 'text-stone-900 placeholder:text-stone-400',
              )}
              aria-label="Vehicle number"
            />
            {vehicle.length >= 8 && (
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
          </div>
        </div>

        {/* Mobile number */}
        <div>
          <label
            htmlFor="ve-mobile"
            className={cn(
              'block text-[10px] font-bold uppercase tracking-wider mb-1.5',
              onDark ? 'text-stone-400' : 'text-stone-500',
            )}
          >
            Mobile number
          </label>
          <div
            className={cn(
              'flex items-center gap-3 px-4 h-12 rounded-xl border transition-all',
              onDark
                ? 'bg-stone-950/60 border-white/10 focus-within:border-emerald-500/60 focus-within:bg-stone-950 focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
                : 'bg-stone-50 border-stone-200 focus-within:border-stone-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]',
            )}
          >
            <span
              className={cn(
                'flex items-center gap-1.5 pr-3 mr-0 border-r text-sm font-semibold shrink-0',
                onDark ? 'text-stone-300 border-white/10' : 'text-stone-700 border-stone-300',
              )}
            >
              <FlagIcon />
              +91
            </span>
            <input
              id="ve-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={mobile}
              onChange={(e) => setMobile(formatMobile(e.target.value))}
              placeholder="98xxx xxxxx"
              className={cn(
                'w-full bg-transparent outline-none text-sm sm:text-base font-mono placeholder:font-sans',
                onDark
                  ? 'text-white placeholder:text-stone-600'
                  : 'text-stone-900 placeholder:text-stone-400',
              )}
              aria-label="Mobile number"
            />
            {mobile.length === 10 && (
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className={cn(
            'mt-1 w-full inline-flex items-center justify-center gap-2 px-5 h-12 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer group',
            isValid
              ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/50'
              : onDark
                ? 'bg-emerald-500/30 text-emerald-100/60 ring-1 ring-emerald-500/20 cursor-not-allowed'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed',
          )}
        >
          {submitted ? (
            <>
              <CheckIcon className="w-4 h-4" />
              OTP sent — check your phone
            </>
          ) : (
            <>
              {t.heroInputCTA}
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

      </div>
    </form>
  )
}

/* ---- icons ---- */
function VehicleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 16H9m10 0h1.5a1.5 1.5 0 0 0 1.5-1.5V11a3 3 0 0 0-3-3h-2.05a3 3 0 0 0-2.65-1.5h-6.6A3 3 0 0 0 4.05 8H3a1 1 0 0 0-1 1v5.5A1.5 1.5 0 0 0 3.5 16H5" />
      <circle cx="7" cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  )
}
function CheckIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>)
}
function ArrowIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>)
}
function FlagIcon() {
  return (
    <span className="inline-flex items-center gap-[1.5px] h-3 w-[18px] rounded-[2px] overflow-hidden ring-1 ring-stone-700">
      <span className="block h-full w-1/3 bg-orange-500" />
      <span className="block h-full w-1/3 bg-stone-100" />
      <span className="block h-full w-1/3 bg-emerald-600" />
    </span>
  )
}
