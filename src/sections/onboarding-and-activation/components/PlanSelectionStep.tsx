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
  /** Called when user clicks Contact Sales on enterprise plan */
  onContactSales?: () => void
  /** Called when user skips plan selection */
  onSkip?: () => void
  /** Payment error message */
  error?: string
  /** Currently processing plan ID */
  processingPlanId?: string | null
  /** Whether plans are still being fetched (renders skeleton cards) */
  isLoading?: boolean
}

/** Single skeleton plan card — mirrors the real card's layout so there's minimal pop-in */
function PlanCardSkeleton() {
  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 motion-safe:animate-pulse"
      aria-hidden="true"
    >
      {/* Header band */}
      <div className="bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center py-6 px-4 min-h-[88px] gap-2">
        <div className="h-5 w-32 rounded bg-stone-200 dark:bg-stone-700" />
        <div className="h-3 w-44 rounded bg-stone-200 dark:bg-stone-700" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Price */}
        <div className="text-center pb-4 mb-4 border-b border-stone-100 dark:border-stone-800 space-y-1.5">
          <div className="h-7 w-20 mx-auto rounded bg-stone-200 dark:bg-stone-700" />
          <div className="h-3 w-16 mx-auto rounded bg-stone-200 dark:bg-stone-700" />
        </div>

        {/* Feature rows */}
        <div className="mt-auto space-y-3.5 mb-5">
          {[36, 28, 32, 30, 26, 34, 28].map((labelW, i) => (
            <div key={i} className="flex items-center justify-between">
              <div
                className="h-3 rounded bg-stone-200 dark:bg-stone-700"
                style={{ width: `${labelW * 2}px` }}
              />
              <div className="h-3.5 w-4 rounded bg-stone-200 dark:bg-stone-700" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="h-10 w-full rounded-xl bg-stone-200 dark:bg-stone-700" />
      </div>
    </div>
  )
}

const PLAN_STYLES: Record<string, { bg: string; image?: string }> = {
  'plan-udrive-plus': { bg: 'bg-violet-500', image: '/Udrive.webp' },
  'plan-enterprise':  { bg: 'bg-stone-900 dark:bg-stone-800' },
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
  onContactSales,
  onSkip,
  error,
  processingPlanId = null,
  isLoading = false,
}: PlanSelectionStepProps) {
  const isPlanDisabled = (plan: SubscriptionPlan) => {
    if (plan.features.vehicleLimit === null) return false
    return vehicleCount > plan.features.vehicleLimit
  }

  const featureDisplay = (val: boolean | string | number | null | undefined) => {
    if (val === false) return { kind: 'cross' as const }
    if (val === true) return { kind: 'check' as const }
    if (val === 'payPerUse') return { kind: 'text' as const, text: 'Pay Per Use' }
    if (val === 'asPerAddOn') return { kind: 'text' as const, text: 'As per Add-on' }
    if (val === 'unlimited') return { kind: 'text' as const, text: 'Unlimited' }
    if (typeof val === 'number') return { kind: 'text' as const, text: `₹${val}` }
    return { kind: 'text' as const, text: '—' }
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col">

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-10 py-3 flex items-center justify-between gap-3">
        <img
          src="/lots247-logo.png"
          alt="LOTS247"
          className="h-10 w-auto"
        />
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Skip
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </header>

      {/* Page content */}
      <div className="w-full max-w-6xl mx-auto px-4 py-10 flex-1">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
            Choose your plan
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Select the plan that best fits your needs
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
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

        {/* Loading state — skeleton cards mirror the real layout */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
            aria-busy="true"
            role="status"
          >
            <span className="sr-only">Loading subscription plans</span>
            <PlanCardSkeleton />
            <PlanCardSkeleton />
          </div>
        )}

        {/* Empty state — no plans available */}
        {!isLoading && plans.length === 0 && !error && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-stone-600 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-white mb-1">No plans available right now</h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              We couldn't load subscription plans. Please refresh or contact support.
            </p>
          </div>
        )}

        {/* Plan Cards */}
        {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {plans.map((plan) => {
            const disabled = isPlanDisabled(plan)
            const isProcessing = processingPlanId === plan.id
            const style = PLAN_STYLES[plan.id]
            const isEnterprise = plan.contactSales === true

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
                  <div className={`relative ${style.bg} flex items-center justify-center py-1.5 px-4 min-h-[44px]`}>
                    {plan.badge && (
                      <div className="absolute -top-2 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-700 text-white shadow-md shadow-emerald-700/30 ring-2 ring-white dark:ring-stone-900">
                          <StarIcon className="text-white" />
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center">
                      {style.image ? (
                        <>
                          <img
                            src={style.image}
                            alt={plan.displayName}
                            className="h-11 w-auto object-contain"
                          />
                          {plan.id === 'plan-udrive-plus' && (
                            <span className="text-3xl font-bold text-white ml-0.5 -mt-0.5">+</span>
                          )}
                        </>
                      ) : (
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {plan.displayName}
                        </h3>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center py-6 px-4 min-h-[88px]">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-tight">
                      {plan.displayName}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 text-center">
                      {plan.description}
                    </p>
                  </div>
                )}

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5">

                  {/* Pricing */}
                  <div className="text-center pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
                    {isEnterprise ? (
                      <>
                        <div className="text-2xl font-bold text-stone-900 dark:text-white">Custom</div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                          Tailored to your fleet
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-stone-900 dark:text-white">
                          {plan.price >= 1000
                            ? `₹${Math.round(plan.price / 1000)}K`
                            : `₹${plan.price}`}
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 uppercase tracking-wide">
                          Per {plan.billingPeriod === 'year' ? 'Year' : 'Month'}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Feature Summary Rows */}
                  <div className="mt-auto space-y-3.5 text-xs mb-5">
                    {[
                      { label: 'No. of Vehicles', value: { kind: 'text' as const, text: plan.features.vehicleLimit === null ? 'Unlimited' : String(plan.features.vehicleLimit) } },
                      { label: '24/7 On-Call', value: featureDisplay(plan.features.onCallResolution) },
                      { label: 'On-Site Legal', value: featureDisplay(plan.features.onSiteResolution) },
                      { label: 'Challan Service', value: featureDisplay(plan.features.challanResolution.online !== false) },
                      { label: '  Online', value: featureDisplay(plan.features.challanResolution.online), indent: true },
                      { label: '  Lok Adalat', value: featureDisplay(plan.features.challanResolution.lokAdalat), indent: true },
                      { label: '  Court', value: featureDisplay(plan.features.challanResolution.court), indent: true },
                      { label: 'RTO-as-a-Service', value: featureDisplay(plan.features.rtoService) },
                      { label: 'Dashboard', value: featureDisplay(plan.features.dashboardAccess) },
                    ].map((row, idx) => (
                      <div key={idx} className={`flex items-center justify-between ${row.indent ? 'pl-3' : ''}`}>
                        <span className={`${row.indent ? 'text-xs text-stone-600 dark:text-stone-400' : 'text-stone-600 dark:text-stone-400'}`}>
                          {row.label.trim()}
                        </span>
                        {row.value.kind === 'check' ? (
                          <CheckIcon className="text-emerald-500" />
                        ) : row.value.kind === 'cross' ? (
                          <CrossIcon className="text-red-400 dark:text-red-500" />
                        ) : (
                          <span className={`font-semibold text-xs text-stone-800 dark:text-stone-200`}>
                            {row.value.text}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {isEnterprise ? (
                    <button
                      onClick={() => onContactSales?.()}
                      className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 cursor-pointer"
                    >
                      Contact Sales
                    </button>
                  ) : (
                    <button
                      onClick={() => !disabled && !isProcessing && onSelectPlan?.(plan.id)}
                      disabled={disabled || isProcessing}
                      className={[
                        'w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200',
                        disabled
                          ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
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
                      ) : (
                        'Select Plan'
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        )}
      </div>
    </div>
  )
}
