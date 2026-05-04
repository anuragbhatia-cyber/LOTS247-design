import IncidentClosureReport from './IncidentClosureReport'
import type { IncidentClosureReportProps } from './IncidentClosureReport'

// Sample data sourced from cas-006 (E-Way Bill, IRN-20006, resolved)
// Subscriber: sub-001 (Rajesh Kumar), Lawyer: LAW-1001 (Adv. Priya Mehta)
const sampleReport: IncidentClosureReportProps = {
  // Cover / Meta
  vehicleNumber: 'UP32MM1113',
  incidentId: 'IRN-20006',
  subscriberId: 'sub-001',
  subscriberName: 'Rajesh Kumar',
  dateGenerated: '01 May 2026',
  reporterName: 'Rajesh Kumar',
  reporterPhone: '9876543210',

  // Incident Details
  dateOfReporting: '20 Nov 2025',
  incidentType: 'E-Way Bill',
  incidentSummary:
    'RTO refusing to process vehicle fitness renewal citing pending challans. All challans have been cleared — need legal notice to RTO Pune for unlawful withholding of fitness certificate.',
  location: {
    roadName: 'Pune-Nashik Highway',
    area: 'RTO Pune Office',
    city: 'Pune',
    state: 'Maharashtra',
    pin: '411001',
  },

  // Resolution Details
  resolutionOpinion:
    'Legal notice sent to RTO Pune. Fitness certificate issued within 5 working days.',
  closureDate: '15 Jan 2026',
  assignedLawyer: 'Adv. Priya Mehta',
  lawyerSpecialization: 'Traffic & Motor Vehicle',
  authorityInvolved: 'RTO',
  finalOutcome: 'Resolved',

  // Closure Summary
  moneySaved: '₹15,000',
  timeSaved: '14 days',
  closureOutcome: 'Resolved Successfully',
  durationDays: 56,
  slaStatus: 'Within SLA',
  documentsFiledCount: 2,
  closingNotes: 'Case resolved — fitness certificate obtained',
}

export default function IncidentClosureReportPreview() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 print:bg-white print:min-h-0">
      {/* Toolbar — hidden in print */}
      <div className="print:hidden sticky top-0 z-10 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Incident Closure Report Preview
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {sampleReport.incidentId} &middot; {sampleReport.vehicleNumber}
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="py-8 print:py-0">
        <IncidentClosureReport {...sampleReport} />
      </div>
    </div>
  )
}
