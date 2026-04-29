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
