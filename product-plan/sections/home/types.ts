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
