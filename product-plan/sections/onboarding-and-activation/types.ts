// =============================================================================
// Data Types
// =============================================================================

export interface SubscriptionPlanFeatures {
  /** Maximum number of vehicles allowed (null means unlimited) */
  vehicleLimit: number | null
  /** 24/7 on-call legal resolution support */
  onCallResolution: boolean
  /** On-site legal resolution (true, false, or 'payPerUse') */
  onSiteResolution: boolean | 'payPerUse'
  /** Challan resolution pricing for different methods */
  challanResolution: {
    /** Online challan payment fee (false if not available, number for price, or true if included) */
    online: boolean | number
    /** Lok Adalat challan resolution fee */
    lokAdalat: boolean | number | 'asPerAddOn'
    /** Court challan resolution fee */
    court: boolean | number | 'asPerAddOn'
  }
  /** RTO-as-a-Service availability */
  rtoService: boolean | 'payPerUse'
  /** Dashboard access enabled */
  dashboardAccess: boolean
  /** Number of users allowed */
  numberOfUsers: number
  /** Automated compliance reports */
  automatedReports: boolean
  /** Personalized compliance reports */
  personalizedReports: boolean
  /** Incident updates via WhatsApp */
  whatsappUpdates: boolean
  /** Add-on services availability */
  addOns: boolean | 'payPerUse' | 'included'
  /** Value-added services */
  valueAddedServices: boolean | 'payPerUse' | 'worth20k'
  /** Dedicated account manager */
  accountManager: boolean
  /** Bulk challan resolution support */
  bulkChallanResolution: boolean
  /** API integration support */
  apiIntegration: boolean
}

export interface SubscriptionPlan {
  /** Unique plan identifier */
  id: string
  /** Internal plan name */
  name: string
  /** Display name shown to users */
  displayName: string
  /** Plan description */
  description: string
  /** Monthly price (0 for free plans) */
  price: number
  /** Billing period */
  billingPeriod: 'month' | 'year'
  /** Whether this plan should be highlighted as recommended */
  isRecommended: boolean
  /** Feature set included in this plan */
  features: SubscriptionPlanFeatures
  /** Optional feature highlights for display */
  highlights?: string[]
  /** Optional limitations to display */
  limitations?: string[]
  /** Optional badge text (e.g., "Top Seller") */
  badge?: string
}

export interface OnboardingStep {
  /** Unique step identifier */
  id: string
  /** Step number in sequence (1-4) */
  stepNumber: number
  /** Short step name for progress indicator */
  name: string
  /** Full step title */
  title: string
  /** Step description/instructions */
  description: string
  /** Whether this step must be completed */
  isRequired: boolean
  /** Whether user can skip this step */
  canSkip: boolean
}

export interface PhoneVerificationForm {
  /** User's phone number with country code */
  phoneNumber: string
  /** Country code (e.g., +91) */
  countryCode: string
  /** One-time password entered by user */
  otp: string
  /** Timestamp when OTP was sent */
  otpSentAt: string
  /** Timestamp when OTP expires */
  otpExpiresAt: string
  /** Timestamp when resend becomes available */
  resendAvailableAt: string
}

export interface VehicleDetailsForm {
  /** RC (Registration Certificate) number */
  rcNumber: string
  /** Vehicle name/model */
  vehicleName: string
  /** Vehicle type (Car, Bike, Truck, etc.) */
  vehicleType: string
  /** Vehicle registration date */
  registrationDate: string
  /** Owner name from RC */
  ownerName: string
  /** Fuel type (Petrol, Diesel, CNG, Electric) */
  fuelType: string
  /** Whether data is currently being fetched from API */
  isFetching: boolean
  /** Whether data was successfully fetched from government API */
  fetchedFromApi: boolean
  /** Whether user is entering data manually */
  manualEntry: boolean
}

export interface DriverDetailsForm {
  /** Driver's full name */
  driverName: string
  /** Internal driver ID */
  driverId: string
  /** Driving license number */
  licenseNumber: string
  /** RC number of assigned vehicle */
  assignedVehicleId: string
  /** License expiry date */
  licenseExpiryDate: string
}

export interface ValidationErrors {
  /** Phone number validation errors */
  phoneNumber: {
    invalid: string
    rateLimited: string
    alreadyExists: string
  }
  /** OTP validation errors */
  otp: {
    invalid: string
    expired: string
    tooManyAttempts: string
  }
  /** Vehicle validation errors */
  vehicle: {
    duplicateRC: string
    invalidRC: string
    apiFailed: string
    requiredFields: string
  }
  /** Driver validation errors */
  driver: {
    invalidLicense: string
    requiredFields: string
  }
  /** Payment errors */
  payment: {
    failed: string
    timeout: string
    declined: string
  }
}

export interface UIState {
  /** Whether loading/processing is in progress */
  isLoading: boolean
  /** Primary message to display */
  message: string
  /** Optional secondary message */
  subMessage?: string
  /** Optional delay before redirect (milliseconds) */
  redirectDelay?: number
  /** Whether form should be auto-populated */
  autoPopulated?: boolean
  /** Optional fallback message */
  fallbackMessage?: string
  /** Initial countdown seconds */
  initialSeconds?: number
  /** Whether resend is enabled */
  resendEnabled?: boolean
}

export interface OnboardingProgress {
  /** User ID (null if not yet created) */
  userId: string | null
  /** Current step ID */
  currentStep: string
  /** Array of completed step IDs */
  completedSteps: string[]
  /** Whether phone verification is complete */
  phoneVerified: boolean
  /** Whether at least one vehicle has been added */
  vehicleAdded: boolean
  /** Whether a driver has been added */
  driverAdded: boolean
  /** Whether a subscription plan has been selected */
  planSelected: boolean
  /** Whether payment has been completed (for paid plans) */
  paymentCompleted: boolean
  /** Whether user is fully activated */
  isActivated: boolean
}

// =============================================================================
// Component Props
// =============================================================================

export interface OnboardingFlowProps {
  /** Current onboarding progress state */
  progress: OnboardingProgress
  /** Called when user completes phone verification */
  onPhoneVerified?: (phoneNumber: string, userId: string) => void
  /** Called when user requests OTP */
  onRequestOTP?: (phoneNumber: string) => void
  /** Called when user submits OTP */
  onVerifyOTP?: (otp: string) => void
  /** Called when user requests OTP resend */
  onResendOTP?: () => void
  /** Called when user submits vehicle details */
  onAddVehicle?: (vehicle: VehicleDetailsForm) => void
  /** Called when user clicks Fetch Details for RC number */
  onFetchVehicleDetails?: (rcNumber: string) => void
  /** Called when user adds driver */
  onAddDriver?: (driver: DriverDetailsForm) => void
  /** Called when user skips driver step */
  onSkipDriver?: () => void
  /** Called when user selects a subscription plan */
  onSelectPlan?: (planId: string) => void
  /** Called when payment is completed successfully */
  onPaymentComplete?: (planId: string, paymentId: string) => void
  /** Called when payment fails */
  onPaymentFailed?: (planId: string, error: string) => void
}

export interface PhoneVerificationProps {
  /** Current phone verification form state */
  formData: Partial<PhoneVerificationForm>
  /** Validation errors for this step */
  errors?: Partial<ValidationErrors['phoneNumber'] & ValidationErrors['otp']>
  /** UI state (loading, countdown, etc.) */
  uiState?: Partial<UIState>
  /** Called when user requests OTP */
  onRequestOTP?: (phoneNumber: string) => void
  /** Called when user submits OTP */
  onVerifyOTP?: (otp: string) => void
  /** Called when user requests OTP resend */
  onResendOTP?: () => void
}

export interface VehicleAdditionProps {
  /** Current vehicle form state */
  formData: Partial<VehicleDetailsForm>
  /** Validation errors for this step */
  errors?: Partial<ValidationErrors['vehicle']>
  /** UI state (fetching, success, failed) */
  uiState?: Partial<UIState>
  /** Called when user clicks Fetch Details */
  onFetchDetails?: (rcNumber: string) => void
  /** Called when user submits vehicle */
  onAddVehicle?: (vehicle: VehicleDetailsForm) => void
  /** Called when user chooses manual entry */
  onManualEntry?: () => void
}

export interface DriverAdditionProps {
  /** Current driver form state */
  formData: Partial<DriverDetailsForm>
  /** List of vehicles to assign driver to */
  availableVehicles: Array<{ id: string; name: string }>
  /** Validation errors for this step */
  errors?: Partial<ValidationErrors['driver']>
  /** Called when user adds driver */
  onAddDriver?: (driver: DriverDetailsForm) => void
  /** Called when user skips this step */
  onSkip?: () => void
}

export interface PlanSelectionProps {
  /** Available subscription plans */
  plans: SubscriptionPlan[]
  /** Number of vehicles user has added */
  vehicleCount: number
  /** Validation errors for this step */
  errors?: Partial<ValidationErrors['payment']>
  /** UI state (payment processing, etc.) */
  uiState?: Partial<UIState>
  /** Called when user selects a plan */
  onSelectPlan?: (planId: string) => void
  /** Called when free plan is activated */
  onFreePlanActivated?: () => void
  /** Called when payment is initiated */
  onInitiatePayment?: (planId: string) => void
}

export interface ProgressIndicatorProps {
  /** All onboarding steps */
  steps: OnboardingStep[]
  /** Current step ID */
  currentStepId: string
  /** Array of completed step IDs */
  completedStepIds: string[]
}
