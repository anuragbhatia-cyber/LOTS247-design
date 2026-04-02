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
