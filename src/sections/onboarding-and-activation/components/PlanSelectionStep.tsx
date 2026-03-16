import type { SubscriptionPlan } from '@/../product/sections/onboarding-and-activation/types'


interface PlanSelectionStepProps {
  /** Available subscription plans */
  plans: SubscriptionPlan[]
  /** Number of vehicles user has added */
  vehicleCount?: number
  /** Called when user goes back */
  onBack?: () => void
  /** Called when user selects a plan */
  onSelectPlan?: (planId: string) => void
  /** Payment error message */
  error?: string
  /** Currently processing plan ID */
  processingPlanId?: string | null
}

const PLAN_STYLES: Record<string, { bg: string; image: string }> = {
  'plan-udrive': { bg: 'bg-sky-400', image: '/Udrive.webp' },
  'plan-bsafe':  { bg: 'bg-emerald-500', image: '/Bsafe.webp' },
  'plan-vcare':  { bg: 'bg-orange-400', image: '/Vcare.webp' },
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-3 h-3 flex-shrink-0 ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function PlanSelectionStep({
  plans,
  vehicleCount = 1,
  onBack,
  onSelectPlan,
  error,
  processingPlanId = null,
}: PlanSelectionStepProps) {
  const isPlanDisabled = (plan: SubscriptionPlan) => {
    if (plan.features.vehicleLimit === null) return false
    return vehicleCount > plan.features.vehicleLimit
  }

  const challanDisplay = (val: boolean | string | number | null) => {
    if (val === false) return { kind: 'cross' as const }
    if (val === true) return { kind: 'check' as const }
    if (typeof val === 'number') return { kind: 'text' as const, text: `₹${val}` }
    return { kind: 'text' as const, text: '—' }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col">

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-10 py-3">
        <img
          src="/lots247-logo.png"
          alt="LOTS247"
          className="h-10 w-auto"
        />
      </header>

      {/* Page content */}
      <div className="w-full max-w-6xl mx-auto px-4 py-10 flex-1">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
            Choose your plan
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Select the plan that best fits your needs
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {plans.map((plan) => {
            const disabled = isPlanDisabled(plan)
            const isProcessing = processingPlanId === plan.id
            const style = PLAN_STYLES[plan.id]
            const challanVal = challanDisplay(plan.features.challanResolution.online)

            return (
              <div
                key={plan.id}
                className={[
                  'relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200',
                  'bg-white dark:bg-stone-900',
                  plan.isRecommended
                    ? 'border-2 border-stone-900 dark:border-white shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60'
                    : disabled
                      ? 'border border-stone-200 dark:border-stone-700 opacity-60'
                      : 'border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:shadow-md hover:shadow-stone-100 dark:hover:shadow-stone-950/50',
                ].join(' ')}
              >
                {/* Plan Header */}
                {style ? (
                  <div className={`relative ${style.bg} flex items-center justify-center py-6 px-4 min-h-[88px]`}>
                    {plan.badge && (
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-white tracking-wide"
                          style={{
                            background: 'linear-gradient(160deg, #505050 0%, #111 45%, #2a2a2a 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 6px rgba(0,0,0,0.4)',
                          }}
                        >
                          <StarIcon className="text-yellow-400" />
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <img
                      src={style.image}
                      alt={plan.displayName}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center py-6 px-4 min-h-[88px]">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-tight">
                      {plan.displayName}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 text-center">
                      {plan.description}
                    </p>
                  </div>
                )}

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5">

                  {/* Key Feature / Vehicle Count */}
                  <div className="text-center pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
                    {plan.features.vehicleLimit === null ? (
                      <>
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          Unlimited
                        </div>
                        <div className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 uppercase tracking-wide">
                          Vehicles
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-stone-900 dark:text-white">
                          {plan.features.vehicleLimit}
                        </div>
                        <div className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 uppercase tracking-wide">
                          {plan.features.vehicleLimit === 1 ? 'Vehicle' : 'Vehicles'}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Highlights */}
                  {plan.highlights && plan.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {plan.highlights.slice(0, 5).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
                          <CheckIcon className="text-emerald-500 mt-0.5" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Limitations */}
                  {plan.limitations && plan.limitations.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-stone-400 dark:text-stone-500">
                          <CrossIcon className="text-stone-300 dark:text-stone-600 mt-0.5" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Feature Summary Rows */}
                  <div className="mt-auto pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2.5 text-sm mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400">24/7 On-Call</span>
                      {plan.features.onCallResolution
                        ? <CheckIcon className="text-emerald-500" />
                        : <CrossIcon className="text-stone-300 dark:text-stone-600" />
                      }
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400">Online Challan</span>
                      {challanVal.kind === 'check' ? (
                        <CheckIcon className="text-emerald-500" />
                      ) : challanVal.kind === 'cross' ? (
                        <CrossIcon className="text-stone-300 dark:text-stone-600" />
                      ) : (
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{challanVal.text}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400">Users</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{plan.features.numberOfUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400">Dashboard</span>
                      {plan.features.dashboardAccess
                        ? <CheckIcon className="text-emerald-500" />
                        : <CrossIcon className="text-stone-300 dark:text-stone-600" />
                      }
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => !disabled && !isProcessing && onSelectPlan?.(plan.id)}
                    disabled={disabled || isProcessing}
                    className={[
                      'w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200',
                      disabled
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                        : plan.id === 'plan-free'
                          ? 'border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer'
                          : 'bg-stone-900 dark:bg-white hover:bg-stone-700 dark:hover:bg-stone-100 text-white dark:text-stone-900 cursor-pointer',
                    ].join(' ')}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : disabled ? (
                      'Exceeds vehicle limit'
                    ) : plan.id === 'plan-free' ? (
                      'Start Free'
                    ) : (
                      'Select Plan'
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-center text-stone-400 dark:text-stone-500">
          All plans include basic compliance tracking. You can upgrade or change your plan anytime from settings.
        </p>
      </div>
    </div>
  )
}
