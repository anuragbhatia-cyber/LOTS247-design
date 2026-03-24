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
