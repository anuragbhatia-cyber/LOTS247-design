// =============================================================================
// LOTS247 — Core Data Model Types
// =============================================================================

export type AccountType = 'individual' | 'fleet' | 'business'

export interface Subscriber {
  id: string
  name: string
  email: string
  phone: string
  avatarInitials: string
  accountType: AccountType
  complianceScore: number
}

export type SubscriptionPlan = 'Basic' | 'Fleet' | 'Enterprise'
export type SubscriptionStatus = 'active' | 'expiring_soon' | 'expired'

export interface Subscription {
  id: string
  subscriberId: string
  planName: SubscriptionPlan
  status: SubscriptionStatus
  expiryDate: string
  vehicleLimit: number
  driverLimit: number
  includedLegalSupport: boolean
  incidentLimit: number
}

export type VehicleCategory = 'owned' | 'leased' | 'rented'
export type VehicleStatus = 'active' | 'inactive'

export interface Vehicle {
  id: string
  subscriberId: string
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
  assignedDriverId: string | null
}

export type LicenseStatus = 'valid' | 'expiring-soon' | 'expired'

export interface Driver {
  id: string
  subscriberId: string
  name: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
  licenseStatus: LicenseStatus
  assignedVehicleIds: string[]
}

export type PaymentStatus = 'success' | 'pending' | 'failed'

export interface Payment {
  id: string
  subscriberId: string
  amount: number
  currency: string
  status: PaymentStatus
  gatewayReference: string | null
  description: string
  date: string
}

export type IncidentStatus = 'submitted' | 'inProgress' | 'resolved' | 'documentRequested' | 'extended'
export type IncidentType = 'Theft' | 'Detention' | 'Bail' | 'Accidents' | 'FIRs' | 'Superdari' | 'Vehicle Impounding' | 'E-Way Bill' | 'Others'

export interface Incident {
  id: string
  subscriberId: string
  vehicleId: string
  driverId: string | null
  incidentType: IncidentType
  description: string
  assignedLawyerId: string | null
  status: IncidentStatus
  createdAt: string
  updatedAt: string
}

export type ChallanStatus = 'submitted' | 'inProgress' | 'resolved' | 'onHold' | 'notSettled'
export type ChallanType = 'court' | 'online'

export interface Challan {
  id: string
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

export interface Lawyer {
  id: string
  name: string
  specialization: string
  location: string
  phone: string
  pinCodes: string[]
  isAvailable: boolean
}

export type DocumentType = 'insurance' | 'puc' | 'fitness' | 'rc' | 'drivingLicense'
export type DocumentStatus = 'valid' | 'expiring-soon' | 'expired'

export interface Document {
  id: string
  ownerId: string
  ownerType: 'vehicle' | 'driver'
  type: DocumentType
  name: string
  expiry: string
  status: DocumentStatus
  fileUrl: string | null
  verifiedAt: string | null
}

export type NotificationType = 'incident' | 'challan' | 'compliance' | 'subscription' | 'payment'

export interface Notification {
  id: string
  subscriberId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
  channel: 'app' | 'whatsapp' | 'both'
}
