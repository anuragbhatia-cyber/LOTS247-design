import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import truckAnimation from '../truck.json'
import type {
  OnboardingStep,
  OnboardingProgress,
  SubscriptionPlan,
  VehicleDetailsForm,
  DriverDetailsForm,
} from '@/../product/sections/onboarding-and-activation/types'
import { RegistrationStep } from './RegistrationStep'
import { LoginStep } from './LoginStep'
import { VehicleAdditionStep, type VehicleErrorKind } from './VehicleAdditionStep'
import { DriverAdditionStep } from './DriverAdditionStep'
import { PlanSelectionStep } from './PlanSelectionStep'
import { PaymentSuccessStep } from './PaymentSuccessStep'
import { AuthShellSkeleton } from './AuthShellSkeleton'

// Mock RC lookup: deterministic sample so the design preview always returns something
const SAMPLE_FETCHED_VEHICLES: Record<string, Partial<VehicleDetailsForm>> = {
  DL03AF1234: {
    vehicleName: 'Maruti Suzuki Swift VXi',
    vehicleType: 'Car',
    registrationDate: '2020-03-15',
    ownerName: 'Rajesh Kumar',
    fuelType: 'Petrol',
  },
}

// Deterministic demo triggers — let designers see each error state without a real backend
const DEMO_RC_INVALID = 'INVALID000'
const DEMO_RC_APIFAIL = 'FAIL000000'
const DEMO_RC_TIMEOUT = 'TIMEOUT000'
const DEMO_VALID_OTP = '123456'
const DEMO_PHONE_EXISTS = '9000000000'
const DEMO_PHONE_UNREGISTERED = '9000000001'
const OTP_MAX_ATTEMPTS = 3
const VEHICLE_FETCH_TIMEOUT_MS = 15000
const OTP_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
const DEMO_OTP_FORCE_EXPIRE = '999999'

const OTP_ERROR_COPY = {
  invalid: 'The OTP you entered is incorrect. Please try again.',
  tooManyAttempts: 'Too many failed attempts. Please request a new OTP.',
  expired: 'This OTP has expired. Please request a new one.',
}

const PHONE_ERROR_COPY = {
  alreadyExists: 'This phone number is already registered. Please log in instead.',
  notRegistered: "We couldn't find an account for this number. Please sign up first.",
}

const VEHICLE_ERROR_COPY: Record<VehicleErrorKind, string> = {
  invalidRC: 'Please enter a valid RC number (e.g., DL03AF1234)',
  duplicateRC: 'This vehicle is already registered in your account.',
  apiFailed: 'Unable to fetch vehicle details. Please enter manually.',
  requiredFields: 'Please fill in all required vehicle details.',
}

const STORAGE_KEY = 'onboarding:flow-state:v1'

interface PersistedFlowState {
  currentStepId: string
  completedSteps: string[]
  sharedPhone: string
  vehicles: VehicleDetailsForm[]
}

function loadPersistedState(): Partial<PersistedFlowState> | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

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
  /** Called when user adds a vehicle */
  onAddVehicle?: (vehicle: VehicleDetailsForm) => void
  /** Called when user adds a driver */
  onAddDriver?: (driver: DriverDetailsForm) => void
  /** Called when user selects a plan */
  onSelectPlan?: (planId: string) => void
  /** Called when payment is completed */
  onPaymentComplete?: (planId: string, paymentId: string) => void
  /** Called when payment fails (or canceled). Surfaces error back to plan selection. */
  onPaymentFailed?: (planId: string, error: string) => void
  /** Called when onboarding is complete */
  onComplete?: () => void
  /** Show the auth-shell skeleton instead of the form (e.g. during session check) */
  isLoading?: boolean
  /** Show skeleton plan cards on the plan step (e.g. while fetching plans) */
  isLoadingPlans?: boolean
}

export function OnboardingFlow({
  plans,
  initialProgress,
  onRequestOTP,
  onVerifyOTP,
  onResendOTP,
  onAddVehicle,
  onAddDriver,
  onSelectPlan,
  onPaymentComplete,
  onPaymentFailed,
  onComplete,
  isLoading = false,
  isLoadingPlans = false,
}: OnboardingFlowProps) {
  const persisted = loadPersistedState()
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup')
  const [currentStepId, setCurrentStepId] = useState(
    persisted?.currentStepId || initialProgress?.currentStep || 'step-signup'
  )
  const [completedSteps, setCompletedSteps] = useState<string[]>(
    persisted?.completedSteps || initialProgress?.completedSteps || []
  )
  const [sharedPhone, setSharedPhone] = useState(persisted?.sharedPhone || '')
  const [otpSent, setOtpSent] = useState(false)
  const [loginOtpSent, setLoginOtpSent] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [loginResendCountdown, setLoginResendCountdown] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [isSendingOTP, setIsSendingOTP] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoginSendingOTP, setIsLoginSendingOTP] = useState(false)
  const [isLoginVerifying, setIsLoginVerifying] = useState(false)
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | undefined>()
  const [otpError, setOtpError] = useState<string | undefined>()
  const [loginOtpError, setLoginOtpError] = useState<string | undefined>()
  const [otpAttempts, setOtpAttempts] = useState(0)
  const [loginOtpAttempts, setLoginOtpAttempts] = useState(0)
  const [otpExpiresAt, setOtpExpiresAt] = useState<number | null>(null)
  const [loginOtpExpiresAt, setLoginOtpExpiresAt] = useState<number | null>(null)
  const [phoneError, setPhoneError] = useState<string | undefined>()
  const [loginPhoneError, setLoginPhoneError] = useState<string | undefined>()

  // Vehicle step state
  const [vehicles, setVehicles] = useState<VehicleDetailsForm[]>(persisted?.vehicles || [])
  const [vehicleData, setVehicleData] = useState<Partial<VehicleDetailsForm> | undefined>()
  const [isFetchingVehicle, setIsFetchingVehicle] = useState(false)
  const [vehicleFetchSuccess, setVehicleFetchSuccess] = useState(false)
  const [vehicleError, setVehicleError] = useState<string | undefined>()
  const [vehicleErrorKind, setVehicleErrorKind] = useState<VehicleErrorKind | undefined>()
  const [isManualVehicleMode, setIsManualVehicleMode] = useState(false)

  // Driver step state
  const [isSubmittingDriver, setIsSubmittingDriver] = useState(false)

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || null

  // Spec: "No back button — users cannot go backwards in the flow." Honor it for the
  // browser's back button too by silently re-pushing the history entry on popstate.
  // Disabled once the user reaches the final success screen so the dashboard redirect
  // (or normal back navigation away from /onboarding) can proceed.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (showSuccess) return
    const sentinel = { onboardingBlock: true }
    window.history.pushState(sentinel, '', window.location.href)
    const onPop = () => {
      window.history.pushState(sentinel, '', window.location.href)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [showSuccess])

  // Persist resumable state to sessionStorage on each change
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const state: PersistedFlowState = {
        currentStepId,
        completedSteps,
        sharedPhone,
        vehicles,
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Ignore quota or serialization errors — persistence is best-effort
    }
  }, [currentStepId, completedSteps, sharedPhone, vehicles])

  // Clear persisted state once the user reaches the final success screen
  useEffect(() => {
    if (showSuccess && typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    }
  }, [showSuccess])

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

  const startLoginCountdown = () => {
    setLoginResendCountdown(60)
    const timer = setInterval(() => {
      setLoginResendCountdown((prev) => {
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
    setPhoneError(undefined)
    setOtpError(undefined)
    setOtpAttempts(0)

    // Demo: simulate "phone already registered" → auto-switch to Login, phone preserved
    if (phone === DEMO_PHONE_EXISTS) {
      setLoginPhoneError(PHONE_ERROR_COPY.alreadyExists)
      setAuthMode('login')
      return
    }

    setIsSendingOTP(true)
    onRequestOTP?.(phone)
    // Simulate OTP send latency so spinner is visible
    setTimeout(() => {
      setIsSendingOTP(false)
      setOtpSent(true)
      setOtpExpiresAt(Date.now() + OTP_EXPIRY_MS)
      startCountdown()
    }, 900)
  }

  const handleVerifyOTP = (otp: string) => {
    setIsVerifying(true)
    setOtpError(undefined)
    onVerifyOTP?.(otp)
    setTimeout(() => {
      setIsVerifying(false)

      // Demo: force-expire when user enters 999999 — useful for previewing the locked state
      if (otp === DEMO_OTP_FORCE_EXPIRE) {
        setOtpExpiresAt(Date.now() - 1)
        setOtpError(OTP_ERROR_COPY.expired)
        return
      }

      // Expiry check — reject expired OTP even if otherwise valid
      if (otpExpiresAt !== null && Date.now() > otpExpiresAt) {
        setOtpError(OTP_ERROR_COPY.expired)
        return
      }

      // Demo verification rule — real backend will replace this
      if (otp !== DEMO_VALID_OTP) {
        const nextAttempts = otpAttempts + 1
        setOtpAttempts(nextAttempts)
        setOtpError(nextAttempts >= OTP_MAX_ATTEMPTS ? OTP_ERROR_COPY.tooManyAttempts : OTP_ERROR_COPY.invalid)
        return
      }
      setOtpAttempts(0)
      setOtpExpiresAt(null)
      setCompletedSteps((prev) => [...prev, 'step-signup'])
      setCurrentStepId('step-vehicle')
    }, 800)
  }

  const handleResendOTP = () => {
    setIsSendingOTP(true)
    setOtpError(undefined)
    setOtpAttempts(0)
    onResendOTP?.()
    setTimeout(() => {
      setIsSendingOTP(false)
      setOtpExpiresAt(Date.now() + OTP_EXPIRY_MS)
      startCountdown()
    }, 900)
  }

  // Login handlers
  const handleLoginRequestOTP = (phone: string) => {
    setLoginPhoneError(undefined)
    setLoginOtpError(undefined)
    setLoginOtpAttempts(0)

    // Demo: simulate "phone not registered" → inline error with CTA to switch to Sign Up
    if (phone === DEMO_PHONE_UNREGISTERED) {
      setLoginPhoneError(PHONE_ERROR_COPY.notRegistered)
      return
    }

    setIsLoginSendingOTP(true)
    onRequestOTP?.(phone)
    setTimeout(() => {
      setIsLoginSendingOTP(false)
      setLoginOtpSent(true)
      setLoginOtpExpiresAt(Date.now() + OTP_EXPIRY_MS)
      startLoginCountdown()
    }, 900)
  }

  const handleLoginVerifyOTP = (otp: string) => {
    setIsLoginVerifying(true)
    setLoginOtpError(undefined)
    onVerifyOTP?.(otp)
    setTimeout(() => {
      setIsLoginVerifying(false)

      if (otp === DEMO_OTP_FORCE_EXPIRE) {
        setLoginOtpExpiresAt(Date.now() - 1)
        setLoginOtpError(OTP_ERROR_COPY.expired)
        return
      }

      if (loginOtpExpiresAt !== null && Date.now() > loginOtpExpiresAt) {
        setLoginOtpError(OTP_ERROR_COPY.expired)
        return
      }

      if (otp !== DEMO_VALID_OTP) {
        const nextAttempts = loginOtpAttempts + 1
        setLoginOtpAttempts(nextAttempts)
        setLoginOtpError(nextAttempts >= OTP_MAX_ATTEMPTS ? OTP_ERROR_COPY.tooManyAttempts : OTP_ERROR_COPY.invalid)
        return
      }
      setLoginOtpAttempts(0)
      setLoginOtpExpiresAt(null)
      setShowSuccess(true)
      setTimeout(() => {
        onComplete?.()
      }, 2000)
    }, 800)
  }

  const handleLoginResendOTP = () => {
    setIsLoginSendingOTP(true)
    setLoginOtpError(undefined)
    setLoginOtpAttempts(0)
    onResendOTP?.()
    setTimeout(() => {
      setIsLoginSendingOTP(false)
      setLoginOtpExpiresAt(Date.now() + OTP_EXPIRY_MS)
      startLoginCountdown()
    }, 900)
  }

  // Vehicle handlers — track active timers so we can cancel on timeout / unmount
  const fetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fetchDeadlineRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearFetchTimers = () => {
    if (fetchTimerRef.current) {
      clearTimeout(fetchTimerRef.current)
      fetchTimerRef.current = null
    }
    if (fetchDeadlineRef.current) {
      clearTimeout(fetchDeadlineRef.current)
      fetchDeadlineRef.current = null
    }
  }

  useEffect(() => clearFetchTimers, [])

  const setVehicleErrorOfKind = (kind: VehicleErrorKind) => {
    setVehicleErrorKind(kind)
    setVehicleError(VEHICLE_ERROR_COPY[kind])
  }

  const handleFetchVehicleDetails = (rcNumber: string) => {
    const rc = rcNumber.toUpperCase()
    clearFetchTimers()
    setIsFetchingVehicle(true)
    setVehicleError(undefined)
    setVehicleErrorKind(undefined)

    // Pre-flight: catch duplicates before incurring the fetch latency
    if (vehicles.some((v) => v.rcNumber.toUpperCase() === rc)) {
      setIsFetchingVehicle(false)
      setVehicleErrorOfKind('duplicateRC')
      return
    }
    if (rc === DEMO_RC_INVALID) {
      setIsFetchingVehicle(false)
      setVehicleErrorOfKind('invalidRC')
      return
    }

    // Hard deadline — if the (real or simulated) fetch hasn't returned by here,
    // we surface apiFailed so the user can fall back to manual entry.
    fetchDeadlineRef.current = setTimeout(() => {
      clearFetchTimers()
      setIsFetchingVehicle(false)
      setVehicleErrorOfKind('apiFailed')
    }, VEHICLE_FETCH_TIMEOUT_MS)

    const completeAfter = rc === DEMO_RC_TIMEOUT ? VEHICLE_FETCH_TIMEOUT_MS + 1000 : 1400
    fetchTimerRef.current = setTimeout(() => {
      // If the deadline already fired, do nothing — error is already shown
      if (!fetchDeadlineRef.current) return
      clearFetchTimers()
      if (rc === DEMO_RC_APIFAIL) {
        setIsFetchingVehicle(false)
        setVehicleErrorOfKind('apiFailed')
        return
      }
      const fetched = SAMPLE_FETCHED_VEHICLES[rc] || {
        vehicleName: 'Tata Nexon XZ+',
        vehicleType: 'Car',
        registrationDate: '2021-08-10',
        ownerName: 'Demo User',
        fuelType: 'Petrol',
      }
      setVehicleData({ ...fetched, rcNumber })
      setVehicleFetchSuccess(true)
      setIsFetchingVehicle(false)
    }, completeAfter)
  }

  const handleManualVehicleEntry = () => {
    setIsManualVehicleMode(true)
    setVehicleFetchSuccess(false)
    setVehicleData(undefined)
    setVehicleError(undefined)
    setVehicleErrorKind(undefined)
  }

  // Reset just the fetch — keep manual-mode toggle as-is so user can re-edit RC
  const handleResetVehicleFetch = () => {
    setVehicleFetchSuccess(false)
    setVehicleData(undefined)
    setVehicleError(undefined)
    setVehicleErrorKind(undefined)
  }

  const handleAddVehicle = (vehicle: VehicleDetailsForm) => {
    setVehicles((prev) => [...prev, vehicle])
    onAddVehicle?.(vehicle)
    setCompletedSteps((prev) => [...prev, 'step-vehicle'])
    // Reset for next vehicle if user comes back; clear per-step UI state
    setVehicleData(undefined)
    setVehicleFetchSuccess(false)
    setIsManualVehicleMode(false)
    setCurrentStepId('step-driver')
  }

  // Driver handlers
  const handleAddDriver = (driver: DriverDetailsForm) => {
    setIsSubmittingDriver(true)
    onAddDriver?.(driver)
    setTimeout(() => {
      setIsSubmittingDriver(false)
      setCompletedSteps((prev) => [...prev, 'step-driver'])
      setCurrentStepId('step-plan')
    }, 800)
  }

  const handleSkipDriver = () => {
    setCompletedSteps((prev) => [...prev, 'step-driver'])
    setCurrentStepId('step-plan')
  }

  // Plan handler
  const handleSelectPlan = (planId: string) => {
    setProcessingPlanId(planId)
    setPaymentError(undefined)
    onSelectPlan?.(planId)
    setSelectedPlanId(planId)

    // Payment gateway will be opened externally.
    // Simulate a successful payment return and show the success screen.
    // Real integration should call handlePaymentFailed(planId, msg) on gateway failure
    // to re-enable the plan button with an inline error.
    setTimeout(() => {
      const pId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      setPaymentId(pId)
      setCompletedSteps((prev) => [...prev, 'step-plan', 'step-payment'])
      onPaymentComplete?.(planId, pId)
      setProcessingPlanId(null)
      setCurrentStepId('step-payment-success')
    }, 1200)
  }

  // Surface payment failure back into PlanSelectionStep with inline error + re-enabled button
  const handlePaymentFailed = (planId: string, error: string) => {
    setProcessingPlanId(null)
    setPaymentError(error)
    setSelectedPlanId(null)
    onPaymentFailed?.(planId, error)
  }

  // Payment success → dashboard
  const handleContinueToDashboard = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onComplete?.()
    }, 2000)
  }

  // Initial loading — caller is still verifying session / fetching prerequisites
  if (isLoading) {
    return <AuthShellSkeleton />
  }

  // Success Screen (dashboard loading)
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col">
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-10 py-3">
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
      {currentStepId === 'step-signup' && authMode === 'signup' && (
        <RegistrationStep
          key="signup"
          onRequestOTP={handleRequestOTP}
          onVerifyOTP={handleVerifyOTP}
          onResendOTP={handleResendOTP}
          onLoginClick={() => setAuthMode('login')}
          onPhoneNumberChange={(p) => {
            setSharedPhone(p)
            if (phoneError) setPhoneError(undefined)
          }}
          initialPhoneNumber={sharedPhone}
          phoneError={phoneError}
          otpSent={otpSent}
          otpError={otpError}
          otpExpiresAt={otpExpiresAt}
          isSendingOTP={isSendingOTP}
          isVerifying={isVerifying}
          resendCountdown={resendCountdown}
        />
      )}

      {currentStepId === 'step-signup' && authMode === 'login' && (
        <LoginStep
          key="login"
          onRequestOTP={handleLoginRequestOTP}
          onVerifyOTP={handleLoginVerifyOTP}
          onResendOTP={handleLoginResendOTP}
          onSignUpClick={() => {
            setLoginPhoneError(undefined)
            setAuthMode('signup')
          }}
          onPhoneNumberChange={(p) => {
            setSharedPhone(p)
            if (loginPhoneError) setLoginPhoneError(undefined)
          }}
          initialPhoneNumber={sharedPhone}
          phoneError={loginPhoneError}
          otpSent={loginOtpSent}
          otpError={loginOtpError}
          otpExpiresAt={loginOtpExpiresAt}
          isSendingOTP={isLoginSendingOTP}
          isVerifying={isLoginVerifying}
          resendCountdown={loginResendCountdown}
        />
      )}

      {currentStepId === 'step-vehicle' && (
        <VehicleAdditionStep
          onFetchDetails={handleFetchVehicleDetails}
          onAddVehicle={handleAddVehicle}
          onManualEntry={handleManualVehicleEntry}
          onResetFetch={handleResetVehicleFetch}
          error={vehicleError}
          errorKind={vehicleErrorKind}
          isFetching={isFetchingVehicle}
          vehicleData={vehicleData}
          fetchSuccess={vehicleFetchSuccess}
          isManualMode={isManualVehicleMode}
        />
      )}

      {currentStepId === 'step-driver' && (
        <DriverAdditionStep
          availableVehicles={vehicles.map((v) => ({
            id: v.rcNumber,
            name: v.vehicleName,
          }))}
          onAddDriver={handleAddDriver}
          onSkip={handleSkipDriver}
          isSubmitting={isSubmittingDriver}
        />
      )}

      {currentStepId === 'step-plan' && (
        <PlanSelectionStep
          plans={plans}
          vehicleCount={vehicles.length}
          onSelectPlan={handleSelectPlan}
          processingPlanId={processingPlanId}
          error={paymentError}
          isLoading={isLoadingPlans}
        />
      )}

      {currentStepId === 'step-payment-success' && selectedPlan && paymentId && (
        <PaymentSuccessStep
          plan={selectedPlan}
          paymentId={paymentId}
          amount={0}
          onContinue={handleContinueToDashboard}
        />
      )}
    </>
  )
}
