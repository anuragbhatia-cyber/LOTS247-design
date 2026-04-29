// LOTS247 — Consolidated Type Definitions
// Auto-generated from section type files


// ============================================
// Section: home
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export interface Subscriber {
  id: string
  name: string
  email: string
  phone: string
  avatarInitials: string
  accountType: 'individual' | 'fleet' | 'business'
}

export interface Subscription {
  id: string
  planName: 'Basic' | 'Fleet' | 'Enterprise'
  status: 'active' | 'expiring_soon' | 'expired'
  expiryDate: string
  vehicleLimit: number
  driverLimit: number
  includedLegalSupport: boolean
  incidentLimit: number
}

export interface IncidentBreakdown {
  new: number
  assigned: number
  inProgress: number
  awaitingAction: number
}

export interface ActiveVehiclesStat {
  count: number
  limit: number
  label: string
}

export interface ActiveDriversStat {
  count: number
  label: string
}

export interface PendingChallansStat {
  count: number
  totalAmount: number
  currency: string
  label: string
}

export interface ActiveIncidentsStat {
  count: number
  label: string
  breakdown: IncidentBreakdown
}

export interface HomeStats {
  activeVehicles: ActiveVehiclesStat
  activeDrivers: ActiveDriversStat
  pendingChallans: PendingChallansStat
  activeIncidents: ActiveIncidentsStat
}

export type ComplianceStatus = 'healthy' | 'warning' | 'critical'

export interface ComplianceCategory {
  id: string
  label: string
  status: ComplianceStatus
  score: number
}

export interface ComplianceScore {
  overall: number
  status: ComplianceStatus
  changeFromLastMonth?: number
  categories: ComplianceCategory[]
}

export type AlertCategory = 'puc' | 'insurance' | 'challan' | 'renewal'
export type AlertUrgency = 'critical' | 'warning' | 'notice'

export interface AlertItem {
  id: string
  category: AlertCategory
  urgency: AlertUrgency
  vehicleNumber: string
  title: string
  daysRemaining: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface HomeProps {
  /** The currently logged-in subscriber */
  subscriber: Subscriber
  /** The subscriber's active subscription plan */
  subscription: Subscription
  /** Aggregated stats for the overview cards */
  stats: HomeStats
  /** Fleet-wide compliance health score and category breakdown */
  complianceScore: ComplianceScore
  /** Alerts for expiring vehicle documents and pending challans */
  alerts: AlertItem[]
  /** Called when user clicks the Active Vehicles card */
  onViewVehicles?: () => void
  /** Called when user clicks the Active Drivers card */
  onViewDrivers?: () => void
  /** Called when user clicks the Pending Challans card */
  onViewChallans?: () => void
  /** Called when user clicks the Active Incidents card */
  onViewIncidents?: () => void
  /** Called when user clicks the Subscription card */
  onViewSubscription?: () => void
  /** Called when user clicks the Add Incident quick action */
  onAddIncident?: () => void
  /** Called when user clicks the Add Vehicle quick action */
  onAddVehicle?: () => void
  /** Called when user clicks the Call a Lawyer quick action */
  onCallLawyer?: () => void
  /** Called when user clicks the Add Driver quick action */
  onAddDriver?: () => void
  /** Called when user clicks "My Profile" in the profile dropdown */
  onViewProfile?: () => void
  /** Called when user clicks "Logout" in the profile dropdown */
  onLogout?: () => void
}


// ============================================
// Section: onboarding-and-activation
// ============================================

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


// ============================================
// Section: compliance-dashboard
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type ComplianceStatus = 'healthy' | 'warning' | 'critical'

export type DocumentStatus = 'valid' | 'expiring' | 'expired'

export type UrgencyLevel = 'expired' | 'critical' | 'warning' | 'notice'

export type InsightType = 'positive' | 'warning' | 'critical'

export type CategoryId = 'rc' | 'insurance' | 'pucc' | 'permits' | 'dl' | 'challans' | 'blacklisted' | 'ntbt'

export type PermitType = 'allIndia' | 'nationwide' | 'state'

export type ScopeFilter = 'fleet' | 'vehicle' | 'driver'

export type DateRangePreset = 'thisMonth' | 'last3Months' | 'last6Months' | 'lastYear' | 'custom'

export interface ComplianceScore {
  overall: number
  previousMonth: number
  change: number
  status: ComplianceStatus
}

export interface PermitSubBreakdown {
  allIndia: { compliant: number; total: number }
  nationwide: { compliant: number; total: number }
  state: { compliant: number; total: number }
}

export interface ComplianceCategory {
  id: CategoryId
  label: string
  fullLabel: string
  compliant: number
  expiring?: number
  total: number
  percentage: number
  status: ComplianceStatus
  subBreakdown?: PermitSubBreakdown
  outstandingCount?: number
  outstandingAmount?: number
}

export interface Insight {
  id: string
  type: InsightType
  message: string
}

export interface MonthlyTrendPoint {
  month: string
  score: number
}

export interface MonthlyChallanTrendPoint {
  month: string
  count: number
  online: number
  court: number
  amount: number
}

export interface ExpiryUrgencyItem {
  id: string
  vehicleNumber: string
  documentType: string
  expiryDate: string
  daysRemaining: number
  urgency: UrgencyLevel
}

// Category Drill-down Types

export interface RcDrilldownRow {
  vehicleNumber: string
  status: DocumentStatus
  issueDate: string
  expiryDate: string
  rtoOffice: string
}

export interface InsuranceDrilldownRow {
  vehicleNumber: string
  status: DocumentStatus
  provider: string
  policyNumber: string
  expiryDate: string
}

export interface PuccDrilldownRow {
  vehicleNumber: string
  status: DocumentStatus
  testCenter: string
  expiryDate: string
}

export interface PermitDrilldownRow {
  vehicleNumber: string
  status: DocumentStatus
  permitType: PermitType
  permitNumber: string
  expiryDate: string
}

export interface DlDrilldownRow {
  driverName: string
  licenseNumber: string
  status: DocumentStatus
  expiryDate: string
  vehiclesAssigned: string[]
}

export interface ChallanDrilldownRow {
  vehicleNumber: string
  outstandingCount: number
  courtCount: number
  onlineCount: number
  totalAmount: number
  latestDate: string | null
  submittedCount: number
  notSubmittedCount: number
  paidCount: number
  paidAmount: number
}

export interface BlacklistedDrilldownRow {
  vehicleNumber: string
  flagReason: string
  flaggingAuthority: string
  flagDate: string
  status: 'active' | 'resolved'
}

export interface NtbtDrilldownRow {
  vehicleNumber: string
  holdReason: string
  issuingAuthority: string
  holdDate: string
  caseReference: string
  status: 'active' | 'resolved'
}

export interface CategoryDrilldowns {
  rc: RcDrilldownRow[]
  insurance: InsuranceDrilldownRow[]
  pucc: PuccDrilldownRow[]
  permits: PermitDrilldownRow[]
  dl: DlDrilldownRow[]
  challans: ChallanDrilldownRow[]
  blacklisted: BlacklistedDrilldownRow[]
  ntbt: NtbtDrilldownRow[]
}

export type VehicleHistoryEventType = 'challan' | 'insurance' | 'pucc' | 'permit' | 'rc' | 'service'

export interface VehicleHistoryEvent {
  date: string
  type: VehicleHistoryEventType
  title: string
  description: string
  amount: number | null
}

export type VehicleCategory = 'Owned' | 'Leased' | 'Rented'
export type VehicleStatus = 'Active' | 'Inactive' | 'Maintenance'

export interface Vehicle {
  id: string
  vehicleNumber: string
  vehicleType: string
  make: string
  model: string
  year: number
  category: VehicleCategory
  status: VehicleStatus
}

export interface Driver {
  id: string
  name: string
  licenseNumber: string
  phone: string
}

export interface HistoricalStats {
  totalVehiclesTracked: number
  totalDriversTracked: number
  documentsRenewed: number
  challansPaid: number
  totalChallanAmount: number
  blacklistRemovals: number
  avgComplianceScore: number
  bestMonth: string
  worstMonth: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ComplianceDashboardProps {
  /** The 8 compliance category cards */
  categories: ComplianceCategory[]
  /** Auto-generated compliance insights */
  insights: Insight[]
  /** Monthly trend data points for the line chart */
  monthlyTrend: MonthlyTrendPoint[]
  /** Monthly challan trend data */
  monthlyChallanTrend: MonthlyChallanTrendPoint[]
  /** Historical summary stats */
  historicalStats: HistoricalStats
  /** Vehicles/documents sorted by soonest expiry */
  expiryUrgencyItems: ExpiryUrgencyItem[]
  /** Per-category vehicle-level drill-down data */
  categoryDrilldowns: CategoryDrilldowns
  /** Fleet vehicles for scope selector */
  vehicles: Vehicle[]
  /** Fleet drivers for scope selector */
  drivers: Driver[]
  /** Per-vehicle timeline of events */
  vehicleHistory: Record<string, VehicleHistoryEvent[]>
  /** Called when user clicks a category card to drill down */
  onCategorySelect?: (categoryId: CategoryId) => void
  /** Called when user clicks back from drill-down to fleet overview */
  onBackToOverview?: () => void
  /** Called when user changes the date range filter */
  onDateRangeChange?: (preset: DateRangePreset, customRange?: { from: string; to: string }) => void
  /** Called when user changes the scope filter */
  onScopeChange?: (scope: ScopeFilter, selectedId?: string) => void
  /** Initial drilldown view to open (dl, rc, challan, vehicle) */
  initialView?: 'dl' | 'rc' | 'challan' | 'vehicle' | null
}


// ============================================
// Section: incident-management
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export interface Vehicle {
  id: string
  registrationNumber: string
  type: string
  model: string
}

export interface Driver {
  id: string
  name: string
  licenseNumber: string
  phone: string
}

export interface Lawyer {
  id: string
  name: string
  specialization: string
  location: string
  phone: string
}

export type ChallanStatus =
  | 'submitted'
  | 'inProgress'
  | 'resolved'
  | 'onHold'
  | 'notSettled'

export type ChallanType = 'court' | 'online'

export interface Challan {
  id: string
  displayId: string
  vehicleId: string
  driverId: string | null
  challanType: ChallanType
  violationType: string
  amount: number
  issueDate: string
  location: string
  status: ChallanStatus
  slaDeadline: string
  paymentReference: string | null
  createdAt: string
  updatedAt: string
}

export type ChallanActivityType =
  | 'statusChange'
  | 'paymentAttempt'
  | 'lawyerAssigned'
  | 'note'

export interface ChallanActivity {
  id: string
  challanId: string
  actionType: ChallanActivityType
  performedBy: string
  notes: string
  timestamp: string
}

export type CaseStatus =
  | 'submitted'
  | 'inProgress'
  | 'resolved'
  | 'documentRequested'
  | 'extended'

export type CaseType =
  | 'Theft'
  | 'Detention'
  | 'Bail'
  | 'Accidents'
  | 'FIRs'
  | 'Superdari'
  | 'Vehicle Impounding'
  | 'E-Way Bill'
  | 'Others'

export type CaseOrigin = 'manual' | 'lawyerCall' | 'escalation'

export interface Case {
  id: string
  displayId: string
  vehicleId: string
  driverId: string | null
  caseType: CaseType
  description: string
  assignedLawyerId: string | null
  status: CaseStatus
  origin: CaseOrigin
  escalatedFromChallanId: string | null
  slaDeadline: string
  createdAt: string
  updatedAt: string
  incidentState?: string
  incidentCity?: string
  authorityInvolved?: string
  roadName?: string
  pin?: string
  incidentArea?: string
  incidentReporterName?: string
  incidentReporterPhone?: string
}

export type CaseActivityType =
  | 'statusChange'
  | 'lawyerAssigned'
  | 'note'

export interface CaseActivity {
  id: string
  caseId: string
  actionType: CaseActivityType
  performedBy: string
  notes: string
  timestamp: string
}

export interface CaseDocument {
  id: string
  caseId: string
  fileName: string
  fileUrl: string
  uploadedBy: 'user' | 'lawyer'
  uploadedAt: string
}

export interface CaseReport {
  id: string
  caseId: string
  title: string
  fileName: string
  fileUrl: string
  generatedAt: string
}

export interface Comment {
  id: string
  entityType: 'challan' | 'case'
  entityId: string
  authorType: 'user' | 'team'
  authorName: string
  message: string
  createdAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ChallanListProps {
  /** The list of challans to display */
  challans: Challan[]
  /** Vehicles for resolving vehicleId references */
  vehicles: Vehicle[]
  /** Drivers for resolving driverId references */
  drivers: Driver[]
  /** Called when user wants to view a challan's details */
  onView?: (id: string) => void
  /** Called when user wants to add a follow-up on a challan */
  onAddFollowUp?: (id: string) => void
  /** Called when user wants to pay a challan */
  onPay?: (id: string) => void
  /** Called when user wants to dispute a challan */
  onDispute?: (id: string) => void
  /** Called when user wants to escalate a challan to a case */
  onEscalateToCase?: (id: string) => void
  /** Called when user wants to download a payment receipt */
  onDownloadReceipt?: (id: string) => void
  /** Called when user wants to request a refund (SLA breached) */
  onRequestRefund?: (id: string) => void
}

export interface ChallanDetailProps {
  /** The challan to display */
  challan: Challan
  /** The vehicle associated with this challan */
  vehicle: Vehicle
  /** The driver associated with this challan (if any) */
  driver: Driver | null
  /** Comments on this challan */
  comments: Comment[]
  /** Timeline of activities for this challan */
  activities: ChallanActivity[]
  /** Called when user wants to pay the challan */
  onPay?: () => void
  /** Called when user wants to dispute the challan */
  onDispute?: () => void
  /** Called when user wants to escalate to a case */
  onEscalateToCase?: () => void
  /** Called when user wants to download the receipt */
  onDownloadReceipt?: () => void
  /** Called when user wants to request a refund */
  onRequestRefund?: () => void
  /** Called when user posts a comment */
  onAddComment?: (message: string) => void
  /** Called when user navigates back to the list */
  onBack?: () => void
}

export interface CaseListProps {
  /** The list of cases to display */
  cases: Case[]
  /** Vehicles for resolving vehicleId references */
  vehicles: Vehicle[]
  /** Drivers for resolving driverId references */
  drivers: Driver[]
  /** Lawyers for resolving assignedLawyerId references */
  lawyers: Lawyer[]
  /** Called when user wants to view a case's details */
  onView?: (id: string) => void
  /** Called when user wants to create a new case */
  onCreate?: () => void
}

export interface CaseDetailProps {
  /** The case to display */
  caseData: Case
  /** The vehicle associated with this case */
  vehicle: Vehicle
  /** The driver associated with this case (if any) */
  driver: Driver | null
  /** The lawyer assigned to this case (if any) */
  lawyer: Lawyer | null
  /** Timeline of activities for this case */
  activities: CaseActivity[]
  /** Documents attached to this case */
  documents: CaseDocument[]
  /** Comments on this case */
  comments: Comment[]
  /** Incident reports (PDFs) for this case */
  reports: CaseReport[]
  /** Called when user uploads a document */
  onUploadDocument?: (file: File) => void
  /** Called when user posts a comment */
  onAddComment?: (message: string) => void
  /** Called when user navigates back to the list */
  onBack?: () => void
}

export interface CaseCreateProps {
  /** Available vehicles to select from */
  vehicles: Vehicle[]
  /** Available drivers to select from */
  drivers: Driver[]
  /** Pre-filled data when escalating from a challan */
  prefill?: {
    caseType: CaseType
    vehicleId: string
    driverId?: string
    description: string
    escalatedFromChallanId: string
  }
  /** Called when the case is submitted */
  onSubmit?: (data: {
    caseType: CaseType
    vehicleId: string
    driverId?: string
    description: string
    documents?: File[]
    escalatedFromChallanId?: string
  }) => void
  /** Called when user cancels case creation */
  onCancel?: () => void
}


// ============================================
// Section: vehicle-and-driver-management
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type VehicleCategory = 'owned' | 'leased' | 'rented'

export type VehicleStatus = 'active' | 'inactive'

export type SubscriptionStatus = 'active' | 'inactive'

export type DocumentType = 'insurance' | 'puc' | 'fitness' | 'rc'

export type DocumentStatus = 'valid' | 'expiring-soon' | 'expired'

export type LicenseStatus = 'valid' | 'expiring-soon' | 'expired'

export interface VehicleDocument {
  id: string
  type: DocumentType
  name: string
  expiry: string
  status: DocumentStatus
}

export interface Vehicle {
  id: string
  rcNumber: string
  vehicleType: string
  make: string
  model: string
  year: number
  category: VehicleCategory
  complianceScore: number
  insuranceExpiry: string
  pucExpiry: string
  fitnessExpiry: string
  status: VehicleStatus
  subscriptionStatus: SubscriptionStatus
  detailsFetched?: boolean
  assignedDriverId: string | null
  documents: VehicleDocument[]
}

export interface Driver {
  id: string
  name: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
  licenseStatus: LicenseStatus
  assignedVehicleIds: string[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface VehicleAndDriverManagementProps {
  /** The list of vehicles to display */
  vehicles: Vehicle[]
  /** The list of drivers to display */
  drivers: Driver[]
  /** Called when user wants to view a vehicle's details */
  onViewVehicle?: (id: string) => void
  /** Called when user wants to add a new vehicle via RC number */
  onAddVehicle?: () => void
  /** Called when user wants to bulk upload vehicles via CSV */
  onBulkUpload?: () => void
  /** Called when user wants to edit a vehicle's details */
  onEditVehicle?: (id: string) => void
  /** Called when user wants to delete a vehicle */
  onDeleteVehicle?: (id: string) => void
  /** Called when user wants to change a vehicle's category */
  onChangeCategory?: (id: string, category: VehicleCategory) => void
  /** Called when user wants to assign a driver to a vehicle */
  onAssignDriver?: (vehicleId: string, driverId: string) => void
  /** Called when user searches the vehicle list */
  onSearch?: (query: string) => void
  /** Called when user applies filters */
  onFilter?: (filters: VehicleFilters) => void
}

export interface VehicleFilters {
  category?: VehicleCategory
  expiryStatus?: DocumentStatus
  complianceScoreMin?: number
  complianceScoreMax?: number
}

export interface VehicleDetailProps {
  /** The vehicle to display */
  vehicle: Vehicle
  /** The driver assigned to this vehicle, if any */
  driver: Driver | null
  /** All available drivers for assignment */
  drivers: Driver[]
  /** Called when user wants to go back to the vehicle list */
  onBack?: () => void
  /** Called when user wants to edit the vehicle */
  onEdit?: () => void
  /** Called when user wants to delete the vehicle */
  onDelete?: () => void
  /** Called when user wants to change the vehicle's category */
  onChangeCategory?: (category: VehicleCategory) => void
  /** Called when user wants to assign or change the driver */
  onAssignDriver?: (driverId: string) => void
}


// ============================================
// Section: reports
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type ReportType = 'MIS' | 'ICR' | 'ISR' | 'MIS-CHALLAN'

export type ReportTab = 'All' | ReportType

export interface Report {
  id: string
  type: ReportType
  title: string
  period: string
  format: 'PDF'
  generatedAt: string
  fileUrl: string
  /** Incident reference for ICR and ISR reports */
  incidentId: string | null
  /** Vehicle registration for incident-linked reports */
  vehicleRegistration: string | null
  /** MIS fields */
  totalIncidents?: number
  resolvedIncidents?: number
  pendingIncidents?: number
  /** MIS-CHALLAN fields */
  totalChallans?: number
  resolvedChallans?: number
  pendingChallans?: number
  totalFines?: number
  /** ICR fields */
  incidentType?: string
  resolution?: string
  /** ISR fields */
  status?: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ReportsProps {
  /** The list of reports to display */
  reports: Report[]
  /** The currently active tab filter */
  activeTab?: ReportTab
  /** Called when user switches tabs */
  onTabChange?: (tab: ReportTab) => void
  /** Called when user clicks a report to preview the PDF */
  onPreview?: (id: string) => void
  /** Called when user wants to download a report as PDF */
  onDownload?: (id: string) => void
  /** Called when user wants to share a report via email */
  onShareEmail?: (id: string) => void
  /** Called when user wants to share a report via WhatsApp */
  onShareWhatsApp?: (id: string) => void
  /** Called when user searches/filters reports */
  onSearch?: (query: string) => void
}


// ============================================
// Section: api-catalogue
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
}

export interface ApiFeature {
  title: string
  description: string
}

export interface Api {
  id: string
  name: string
  provider: string
  shortDescription: string
  fullDescription: string
  documentationUrl: string
  category: string
  icon: string
  features: ApiFeature[]
  endpoints: ApiEndpoint[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface ApiCatalogueProps {
  /** The list of APIs to display in the catalogue */
  apis: Api[]
  /** Called when user clicks on an API card to view details */
  onViewDetail?: (id: string) => void
}

export interface ApiDetailProps {
  /** The API to display on the detail page */
  api: Api
  /** Called when user clicks the back button */
  onBack?: () => void
  /** Called when user submits a contact/pricing enquiry */
  onContactSubmit?: (apiId: string, message: string) => void
}


// ============================================
// Section: wallet
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export interface LastRecharge {
  amount: number
  date: string
  referenceId: string
}

export interface WalletSummary {
  currentBalance: number
  currency: string
  lowBalanceThreshold: number
  lastRecharge: LastRecharge
}

export type TransactionType = 'credit' | 'debit'

export type TransactionCategory =
  | 'recharge'
  | 'subscription'
  | 'challan'
  | 'legalFee'
  | 'refund'

export type TransactionStatus = 'success' | 'pending' | 'failed'

export type RelatedEntityType =
  | 'challan'
  | 'subscription'
  | 'incident'
  | 'dispute'

export interface Transaction {
  id: string
  type: TransactionType
  category: TransactionCategory
  amount: number
  currency: string
  description: string
  referenceId: string
  status: TransactionStatus
  date: string
  runningBalance: number
  relatedEntityId: string | null
  relatedEntityType: RelatedEntityType | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface WalletProps {
  /** Current wallet state — balance, last recharge, threshold */
  walletSummary: WalletSummary
  /** All wallet transactions in reverse chronological order */
  transactions: Transaction[]
  /** Preset amounts for the Add Money modal quick-select buttons */
  quickAmounts: number[]
  /** Called when user initiates a recharge with the chosen amount */
  onAddMoney?: (amount: number) => void
  /** Called when user taps a transaction row to view details */
  onViewTransaction?: (id: string) => void
  /** Called when user taps a related entity link inside transaction detail */
  onNavigateToEntity?: (entityType: RelatedEntityType, entityId: string) => void
  /** Called when user applies filters to the transaction list */
  onFilterChange?: (filters: TransactionFilters) => void
  /** Called when user types in the search bar */
  onSearch?: (query: string) => void
}

export interface TransactionFilters {
  dateRange?: 'today' | 'thisWeek' | 'thisMonth' | 'custom'
  customDateStart?: string
  customDateEnd?: string
  type?: TransactionType | 'all'
  category?: TransactionCategory | 'all'
}


// ============================================
// Section: proposals
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type ProposalType = 'Challan' | 'DL' | 'RC'

export type ProposalStatus = 'sent' | 'under_review' | 'received' | 'converted' | 'rejected'

export type ServiceStatus = 'pending' | 'in_progress' | 'completed' | 'not_applicable'

export interface Proposal {
  id: string
  displayId: string
  type: ProposalType
  description: string
  quantity: number
  amount: number
  status: ProposalStatus
  serviceStatus?: ServiceStatus
  linkedIncidentId: string | null
  createdAt: string
  updatedAt: string
}

export type ProposalActivityType = 'statusChange' | 'note'

export interface ProposalActivity {
  id: string
  proposalId: string
  actionType: ProposalActivityType
  performedBy: string
  notes: string
  timestamp: string
}

export interface Comment {
  id: string
  entityType: 'proposal'
  entityId: string
  authorType: 'user' | 'team'
  authorName: string
  message: string
  createdAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ProposalListProps {
  /** The list of proposals to display */
  proposals: Proposal[]
  /** Called when user wants to view a proposal's details */
  onView?: (id: string) => void
  /** Called when user wants to follow up on a proposal */
  onFollowUp?: (id: string) => void
  /** Called when user wants to cancel an active proposal */
  onCancel?: (id: string) => void
  /** Called when user selects a request type from the Create Request modal */
  onCreateRequest?: (type: 'challan' | 'rc' | 'dl') => void
}

export interface ProposalDetailProps {
  /** The proposal to display */
  proposal: Proposal
  /** Timeline of activities for this proposal */
  activities: ProposalActivity[]
  /** Comments / follow-up thread for this proposal */
  comments: Comment[]
  /** Called when user posts a follow-up message */
  onAddComment?: (message: string) => void
  /** Called when user wants to cancel the proposal */
  onCancel?: () => void
  /** Called when user navigates back to the list */
  onBack?: () => void
}


// ============================================
// Section: knowledge-base
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type ArticleCategory = 'template' | 'faq' | 'guide' | 'checklist' | 'regulation' | 'judgement' | 'circular'

export interface Article {
  id: string
  title: string
  category: ArticleCategory
  excerpt: string
  tags: string[]
  readTime: string
  lastUpdated: string
  author: string
  helpfulCount: number
  notHelpfulCount: number
  content: string
  relatedArticleIds: string[]
}

export interface FaqItem {
  id: string
  articleId: string
  topic: string
  question: string
  answer: string
}

export interface ChecklistItem {
  id: string
  articleId: string
  section: string
  label: string
  description: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface KnowledgeBaseBrowseProps {
  /** All articles available in the knowledge base */
  articles: Article[]
  /** Called when user clicks an article card to view details */
  onViewArticle?: (id: string) => void
}

export interface KnowledgeBaseDetailProps {
  /** The article being viewed */
  article: Article
  /** FAQ items belonging to this article (for FAQ-type articles) */
  faqItems?: FaqItem[]
  /** Checklist items belonging to this article (for checklist-type articles) */
  checklistItems?: ChecklistItem[]
  /** Related articles to show at the bottom */
  relatedArticles?: Article[]
  /** Called when user clicks "Download Template" on a template article */
  onDownloadTemplate?: (id: string) => void
  /** Called when user clicks "Copy Text" on a template article */
  onCopyTemplate?: (id: string) => void
  /** Called when user taps thumbs up */
  onHelpful?: (id: string) => void
  /** Called when user taps thumbs down */
  onNotHelpful?: (id: string) => void
  /** Called when user clicks a related article */
  onViewRelated?: (id: string) => void
  /** Called when user navigates back to browse view */
  onBack?: () => void
}


// ============================================
// Section: my-profile
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type AccountType = 'individual' | 'fleet' | 'business'

export type BusinessType = 'individual' | 'proprietorship' | 'llp' | 'private-limited'

export type KycStatus = 'unverified' | 'partial' | 'verified'

export type KycDocumentType = 'aadhaar' | 'pan' | 'gst_certificate' | 'company_registration'

export type KycDocumentStatus = 'not_submitted' | 'pending_review' | 'verified' | 'rejected'

export type SubscriptionStatus = 'active' | 'expiring_soon' | 'expired'

export type BillingStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface SubscriberProfile {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string | null
  avatarInitials: string
  avatarUrl: string | null
  accountType: AccountType
  kycStatus: KycStatus
  memberSince: string
}

export interface OrganizationDetails {
  businessName: string
  businessType: BusinessType
  gstNumber: string | null
  cinNumber: string | null
  registeredAddress: string | null
  city: string
  state: string
  pincode: string
}

export interface KycDocument {
  id: string
  type: KycDocumentType
  label: string
  maskedNumber: string | null
  status: KycDocumentStatus
  uploadedAt: string | null
  verifiedAt: string | null
  rejectionReason: string | null
  fileName: string | null
  fileSize: string | null
}

export interface SubscriptionFeatures {
  onCallResolution: boolean
  onSiteResolution: boolean | 'payPerUse'
  challanResolutionOnline: number
  dashboardAccess: boolean
  automatedReports: boolean
  personalizedReports: boolean
  whatsappUpdates: boolean
  accountManager: boolean
  bulkChallanResolution: boolean
  apiIntegration: boolean
}

export interface Subscription {
  id: string
  planId: string
  planName: string
  status: SubscriptionStatus
  price: number
  billingPeriod: 'month' | 'year'
  startDate: string
  nextRenewalDate: string
  vehiclesUsed: number
  vehicleLimit: number | null
  usersUsed: number
  userLimit: number
  features: SubscriptionFeatures
}

export interface BillingRecord {
  id: string
  date: string
  description: string
  amount: string
  status: BillingStatus
  invoiceId: string
}

export interface AvailablePlan {
  id: string
  name: string
  price: number
  billingPeriod: 'month' | 'year'
  vehicleLimit: number | null
  userLimit: number
  isCurrentPlan: boolean
  isRecommended: boolean
  badge?: string
  highlights: string[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface MyProfileProps {
  /** The subscriber's full profile with personal details and KYC status */
  subscriberProfile: SubscriberProfile
  /** The subscriber's organization or business details */
  organizationDetails: OrganizationDetails
  /** Array of KYC verification documents with their statuses */
  kycDocuments: KycDocument[]
  /** The subscriber's active subscription plan with usage metrics */
  subscription: Subscription
  /** Reverse-chronological billing history records */
  billingHistory: BillingRecord[]
  /** Available subscription plans for the upgrade comparison modal */
  availablePlans: AvailablePlan[]
  /** Called when user saves changes to personal information */
  onUpdatePersonalInfo?: (data: Partial<SubscriberProfile>) => void
  /** Called when user saves changes to organization details */
  onUpdateOrganization?: (data: Partial<OrganizationDetails>) => void
  /** Called when user uploads a KYC document */
  onUploadKycDocument?: (documentType: KycDocumentType, file: File) => void
  /** Called when user re-uploads a rejected KYC document */
  onReuploadKycDocument?: (documentId: string, file: File) => void
  /** Called when user uploads or changes their profile photo */
  onUploadProfilePhoto?: (file: File) => void
  /** Called when user removes their profile photo */
  onRemoveProfilePhoto?: () => void
  /** Called when user requests to change their phone number (triggers OTP flow) */
  onChangePhone?: (newPhone: string) => void
  /** Called when user selects a new subscription plan to upgrade/change */
  onChangePlan?: (planId: string) => void
  /** Called when user downloads a billing invoice PDF */
  onDownloadInvoice?: (invoiceId: string) => void
}


// ============================================
// Section: settings
// ============================================

// =============================================================================
// Data Types
// =============================================================================

export type NotificationCategory = 'compliance' | 'incidents' | 'challans' | 'billing'

export interface NotificationChannels {
  inApp: boolean
  whatsapp: boolean
  email: boolean
  sms: boolean
}

export interface NotificationPreference {
  id: string
  category: NotificationCategory
  label: string
  description: string
  channels: NotificationChannels
}

export interface QuietHours {
  enabled: boolean
  startTime: string
  endTime: string
}

export interface DailyDigest {
  enabled: boolean
  channel: 'whatsapp'
  time: string
}

export type LandingPage = 'home' | 'compliance' | 'incidents'

export interface AppPreferences {
  defaultLandingPage: LandingPage
  showSidebarBadges: boolean
}

export type SubscriptionStatus = 'active' | 'expiring_soon' | 'expired'

export type BillingStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface SubscriptionFeatures {
  onCallResolution: boolean
  onSiteResolution: boolean | 'payPerUse'
  challanResolutionOnline: number
  dashboardAccess: boolean
  automatedReports: boolean
  personalizedReports: boolean
  whatsappUpdates: boolean
  accountManager: boolean
  bulkChallanResolution: boolean
  apiIntegration: boolean
}

export interface Subscription {
  id: string
  planId: string
  planName: string
  status: SubscriptionStatus
  price: number
  billingPeriod: 'month' | 'year'
  startDate: string
  nextRenewalDate: string
  vehiclesUsed: number
  vehicleLimit: number | null
  usersUsed: number
  userLimit: number
  features: SubscriptionFeatures
}

export interface BillingRecord {
  id: string
  date: string
  description: string
  amount: string
  status: BillingStatus
  invoiceId: string
}

export interface AvailablePlan {
  id: string
  name: string
  price: number
  billingPeriod: 'month' | 'year'
  vehicleLimit: number | null
  userLimit: number
  isCurrentPlan: boolean
  isRecommended: boolean
  badge?: string
  highlights: string[]
}

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet'

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  label: string
  detail: string
  isDefault: boolean
}

export type TeamMemberRole = 'owner' | 'admin' | 'manager' | 'viewer'
export type TeamMemberStatus = 'active' | 'invited' | 'deactivated'

export interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: TeamMemberRole
  status: TeamMemberStatus
  joinedDate: string
  initials: string
}

export type ReportFrequency = 'daily' | 'weekly' | 'monthly'
export type ReportFormat = 'pdf' | 'csv' | 'excel'

export interface ScheduledReport {
  id: string
  name: string
  description: string
  frequency: ReportFrequency
  format: ReportFormat
  enabled: boolean
  lastGenerated: string
  recipientCount: number
}

export interface GeneralSettings {
  language: 'en' | 'hi'
  timezone: string
  dateFormat: string
  currency: string
  dataRetentionMonths: number
  autoLogoutMinutes: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface SettingsProps {
  /** Per-category notification channel preferences */
  notificationPreferences: NotificationPreference[]
  /** Quiet hours configuration for suppressing non-critical alerts */
  quietHours: QuietHours
  /** Daily compliance digest toggle (fleet/business accounts) */
  dailyDigest: DailyDigest
  /** App behavior preferences */
  appPreferences: AppPreferences
  /** The subscriber's active subscription plan with usage metrics */
  subscription: Subscription
  /** Reverse-chronological billing history records */
  billingHistory: BillingRecord[]
  /** Available subscription plans for the upgrade comparison modal */
  availablePlans: AvailablePlan[]
  /** Saved payment methods for the Accounts & Billing tab */
  paymentMethods: PaymentMethod[]
  /** Team members with roles and status */
  teamMembers: TeamMember[]
  /** Scheduled automated reports */
  scheduledReports: ScheduledReport[]
  /** General app settings */
  generalSettings: GeneralSettings
  /** Whether the account is fleet or business type (shows extra options) */
  isFleetOrBusiness?: boolean
  /** Called when user toggles a notification channel for a category */
  onToggleChannel?: (categoryId: string, channel: keyof NotificationChannels, enabled: boolean) => void
  /** Called when user updates quiet hours settings */
  onUpdateQuietHours?: (quietHours: QuietHours) => void
  /** Called when user toggles daily digest */
  onToggleDailyDigest?: (enabled: boolean) => void
  /** Called when user changes the default landing page */
  onChangeLandingPage?: (page: LandingPage) => void
  /** Called when user toggles sidebar badges */
  onToggleSidebarBadges?: (enabled: boolean) => void
  /** Called when user selects a new subscription plan */
  onChangePlan?: (planId: string) => void
  /** Called when user downloads a billing invoice PDF */
  onDownloadInvoice?: (invoiceId: string) => void
  /** Called when user invites a new team member */
  onInviteMember?: () => void
  /** Called when user changes a team member's role */
  onChangeRole?: (memberId: string, role: TeamMemberRole) => void
  /** Called when user removes a team member */
  onRemoveMember?: (memberId: string) => void
  /** Called when user toggles a scheduled report */
  onToggleReport?: (reportId: string, enabled: boolean) => void
  /** Called when user updates general settings */
  onUpdateGeneralSettings?: (settings: Partial<GeneralSettings>) => void
}

