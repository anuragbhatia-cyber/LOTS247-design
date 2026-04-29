import { useEffect, useState } from 'react'
import type { SubscriptionPlan } from '@/../product/sections/onboarding-and-activation/types'

interface PaymentSuccessStepProps {
  /** Selected plan */
  plan: SubscriptionPlan
  /** Payment transaction ID */
  paymentId: string
  /** Amount paid */
  amount: number
  /** Called when user clicks Continue to Dashboard */
  onContinue?: () => void
}

const PLAN_PRICES: Record<string, { monthly: number; yearly: number }> = {
  'plan-udrive': { monthly: 0, yearly: 1000 },
  'plan-udrive-plus': { monthly: 0, yearly: 999 },
  'plan-bsafe': { monthly: 0, yearly: 40000 },
  'plan-vcare': { monthly: 0, yearly: 100000 },
}

export function PaymentSuccessStep({
  plan,
  paymentId,
  onContinue,
}: PaymentSuccessStepProps) {
  const [showContent, setShowContent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const planPrice = PLAN_PRICES[plan.id] || { monthly: 999, yearly: 9999 }
  const baseAmount = plan.billingPeriod === 'year' ? planPrice.yearly : planPrice.monthly
  const gst = Math.round(baseAmount * 0.18)
  const total = baseAmount + gst

  useEffect(() => {
    // Stagger animations
    const t1 = setTimeout(() => setShowContent(true), 300)
    const t2 = setTimeout(() => setShowDetails(true), 800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const formattedTime = today.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col">

      {/* Top Navigation Header */}
      <header className="w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-10 py-3">
        <img
          src="/lots247-logo.png"
          alt="LOTS247"
          className="h-10 w-auto"
        />
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">

          {/* Success Checkmark Animation */}
          <div
            className={[
              'mx-auto mb-8 transition-all duration-700 ease-out',
              showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
            ].join(' ')}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div
            className={[
              'transition-all duration-500 ease-out delay-100',
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
              Payment Successful
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              Your {plan.displayName} plan is now active
            </p>
          </div>

          {/* Transaction Details Card */}
          <div
            className={[
              'mt-8 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 text-left transition-all duration-500 ease-out',
              showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Plan</span>
                <span className="text-sm font-medium text-stone-900 dark:text-white">{plan.displayName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Amount Paid</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Transaction ID</span>
                <span className="text-xs font-mono text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">
                  {paymentId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Date</span>
                <span className="text-sm text-stone-700 dark:text-stone-300">{formattedDate}, {formattedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Billing Cycle</span>
                <span className="text-sm text-stone-700 dark:text-stone-300 capitalize">{plan.billingPeriod}ly</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-dashed border-stone-200 dark:border-stone-700" />

            {/* Receipt note */}
            <p className="text-xs text-stone-400 dark:text-stone-500 text-center">
              A receipt has been sent to your registered email address
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={[
              'mt-8 transition-all duration-500 ease-out delay-300',
              showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
          >
            <button
              onClick={onContinue}
              className="w-full py-3.5 rounded-xl font-semibold text-sm bg-stone-900 dark:bg-white hover:bg-stone-700 dark:hover:bg-stone-100 text-white dark:text-stone-900 transition-all duration-200 cursor-pointer"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
