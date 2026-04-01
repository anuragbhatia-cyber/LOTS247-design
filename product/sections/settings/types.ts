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
