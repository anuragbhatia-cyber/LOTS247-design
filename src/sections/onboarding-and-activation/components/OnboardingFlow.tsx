import { useState } from 'react'
import Lottie from 'lottie-react'
import truckAnimation from '../truck.json'
import type {
  OnboardingStep,
  OnboardingProgress,
  SubscriptionPlan,
} from '@/../product/sections/onboarding-and-activation/types'
import { RegistrationStep } from './RegistrationStep'
import { PlanSelectionStep } from './PlanSelectionStep'

interface OnboardingFlowProps {
  /** All onboarding steps */
  steps: OnboardingStep[]
  /** Available subscription plans */
  plans: SubscriptionPlan[]
  /** Initial progress state */
  initialProgress?: Partial<OnboardingProgress>
  /** Called when user requests OTP */
  onRequestOTP?: (phoneNumber: string) => void
  /** Called when user verifies OTP */
  onVerifyOTP?: (otp: string) => void
  /** Called when user resends OTP */
  onResendOTP?: () => void
  /** Called when user selects a plan */
  onSelectPlan?: (planId: string) => void
  /** Called when onboarding is complete */
  onComplete?: () => void
}

export function OnboardingFlow({
  plans,
  initialProgress,
  onRequestOTP,
  onVerifyOTP,
  onResendOTP,
  onSelectPlan,
  onComplete,
}: OnboardingFlowProps) {
  const [currentStepId, setCurrentStepId] = useState(
    initialProgress?.currentStep || 'step-signup'
  )
  const [completedSteps, setCompletedSteps] = useState<string[]>(
    initialProgress?.completedSteps || []
  )
  const [otpSent, setOtpSent] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const startCountdown = () => {
    setResendCountdown(60)
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Registration + OTP handlers
  const handleRequestOTP = (phone: string) => {
    onRequestOTP?.(phone)
    setOtpSent(true)
    startCountdown()
  }

  const handleVerifyOTP = (otp: string) => {
    onVerifyOTP?.(otp)
    setCompletedSteps((prev) => [...prev, 'step-signup'])
    setCurrentStepId('step-plan')
  }

  const handleResendOTP = () => {
    onResendOTP?.()
    startCountdown()
  }

  // Plan handler
  const handleSelectPlan = (planId: string) => {
    onSelectPlan?.(planId)
    setCompletedSteps((prev) => [...prev, 'step-plan'])
    setShowSuccess(true)
    setTimeout(() => {
      onComplete?.()
    }, 2000)
  }

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col">
        <header className="w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-10 py-3">
          <img src="/lots247-logo.png" alt="LOTS247" className="h-10 w-auto" />
        </header>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-72 mx-auto mb-2">
              <Lottie animationData={truckAnimation} loop={true} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mb-8">
              Your dashboard is getting ready
            </h1>
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm font-medium">Please wait</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {currentStepId === 'step-signup' && (
        <RegistrationStep
          onRequestOTP={handleRequestOTP}
          onVerifyOTP={handleVerifyOTP}
          onResendOTP={handleResendOTP}
          otpSent={otpSent}
          resendCountdown={resendCountdown}
        />
      )}

      {currentStepId === 'step-plan' && (
        <PlanSelectionStep
          plans={plans}
          onSelectPlan={handleSelectPlan}
        />
      )}
    </>
  )
}
