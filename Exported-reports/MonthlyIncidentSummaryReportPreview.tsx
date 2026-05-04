import MonthlyIncidentSummaryReport from './MonthlyIncidentSummaryReport'
import type { MonthlyIncidentSummaryReportProps } from './MonthlyIncidentSummaryReport'

// Sample data for MIS report
const sampleReport: MonthlyIncidentSummaryReportProps = {
  subscriberId: 'sub-001',
  subscriberName: 'Rajesh Kumar',
  dateGenerated: '01 May 2026',
  reportMonth: 'April',
  reportYear: '2026',

  // Page 2: Incident Summary
  totalIncidents: 142,
  totalChallans: 87,
  totalCases: 38,
  totalRenewals: 17,
  incidentTypeBreakdown: [
    { type: 'Traffic Challan', count: 87 },
    { type: 'Court Case', count: 22 },
    { type: 'FIR / Police Complaint', count: 16 },
    { type: 'Insurance Renewal', count: 12 },
    { type: 'Fitness / PUC Expiry', count: 5 },
  ],

  // Page 3: Analytics & Aging
  topStates: [
    { state: 'Uttar Pradesh', count: 34 },
    { state: 'Maharashtra', count: 28 },
    { state: 'Rajasthan', count: 22 },
    { state: 'Haryana', count: 18 },
    { state: 'Delhi', count: 14 },
  ],
  topReporters: [
    { name: 'Amit Sharma', count: 18 },
    { name: 'Priya Verma', count: 15 },
    { name: 'Suresh Patel', count: 12 },
    { name: 'Neha Gupta', count: 9 },
    { name: 'Vikram Singh', count: 7 },
  ],
  agingBuckets: {
    within15Days: 64,
    within15To30Days: 42,
    within30To60Days: 24,
    above60Days: 12,
  },

  // Page 4: Conclusion
  conclusionText:
    'During the month of April 2026, a total of 142 incidents were recorded across the fleet. Traffic challans accounted for the majority (61%) of all incidents, followed by court cases (27%) and renewals (12%). Uttar Pradesh and Maharashtra remained the top contributing states. 75% of incidents were resolved within 30 days, reflecting an improvement over the previous month. 12 incidents remain unresolved beyond 60 days and require immediate attention. We recommend increased compliance monitoring in high-incident states and timely follow-up on aging cases to reduce the backlog.',
}

export default function MonthlyIncidentSummaryReportPreview() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 print:bg-white print:min-h-0">
      {/* Toolbar — hidden in print */}
      <div className="print:hidden sticky top-0 z-10 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Monthly Incident Summary Preview
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {sampleReport.reportMonth} {sampleReport.reportYear}
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

      {/* Report — centered on screen, full page in print */}
      <div className="py-8 print:py-0">
        <MonthlyIncidentSummaryReport {...sampleReport} />
      </div>
    </div>
  )
}
