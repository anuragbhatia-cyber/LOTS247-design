import IncidentSummaryReport from './IncidentSummaryReport'
import type { IncidentSummaryReportProps } from './IncidentSummaryReport'

// Sample data sourced from cas-001 (Accidents, IRN-20001)
// and subscriber sub-001 (Rajesh Kumar)
const sampleReport: IncidentSummaryReportProps = {
  vehicleNumber: 'UP32MM1113',
  incidentId: 'IRN-20001',
  subscriberId: 'sub-001',
  subscriberName: 'Rajesh Kumar',
  dateGenerated: '01 May 2026',
  reporterName: 'Rajesh Kumar',
  reporterPhone: '9876543210',
  dateOfReporting: '18 Jan 2026',
  incidentType: 'Accidents',
  incidentSummary:
    'Rear-end collision on NH48 near Lonavala toll plaza. Front bumper and radiator damaged. Other vehicle involved — Maruti Ertiga (MH04DE5678). No injuries reported. FIR filed at Lonavala Police Station.',
  location: {
    roadName: 'NH48 near Lonavala Toll Plaza',
    area: 'Lonavala',
    city: 'Pune',
    state: 'Maharashtra',
    pin: '410401',
  },
  resolutionOpinion:
    'FIR copy obtained. Other party\'s insurance details collected. Contacted Lonavala Police Station.',
  stage: 'In Progress',
  expectedResolutionDate: '18 Apr 2026',
}

export default function IncidentSummaryReportPreview() {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 print:bg-white print:min-h-0">
      {/* Toolbar — hidden in print */}
      <div className="print:hidden sticky top-0 z-10 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Incident Summary Report Preview
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {sampleReport.incidentId} &middot; {sampleReport.vehicleNumber}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="py-8 print:py-0">
        <IncidentSummaryReport {...sampleReport} />
      </div>
    </div>
  )
}
