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
