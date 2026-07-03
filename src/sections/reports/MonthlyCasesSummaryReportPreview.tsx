import MonthlyCasesSummaryReport from './MonthlyCasesSummaryReport'
import type { MonthlyCasesSummaryReportProps } from './MonthlyCasesSummaryReport'

const sampleReport: MonthlyCasesSummaryReportProps = {
  subscriberId: 'LWD-20001',
  subscriberName: 'Rajesh Kumar',
  dateGenerated: '01 Mar 2026',
  reportMonth: 'February',
  reportYear: '2026',

  overallStatus: [
    { status: 'Open', cases: 21, vehicles: 15 },
    { status: 'Resolved', cases: 8, vehicles: 7 },
  ],
  overallTotal: { status: 'Grand Total', cases: 29, vehicles: 18 },

  caseTypeBreakdown: [
    { type: 'Accidents', cases: 8, vehicles: 7, open: 5, resolved: 3 },
    { type: 'Detention', cases: 6, vehicles: 5, open: 5, resolved: 1 },
    { type: 'FIRs', cases: 5, vehicles: 4, open: 4, resolved: 1 },
    { type: 'Theft', cases: 3, vehicles: 3, open: 2, resolved: 1 },
    { type: 'Vehicle Impounding', cases: 3, vehicles: 3, open: 2, resolved: 1 },
    { type: 'Superdari', cases: 2, vehicles: 2, open: 1, resolved: 1 },
    { type: 'E-Way Bill', cases: 1, vehicles: 1, open: 1, resolved: 0 },
    { type: 'Bail', cases: 1, vehicles: 1, open: 1, resolved: 0 },
  ],
  caseTypeTotal: { type: 'Grand Total', cases: 29, vehicles: 18, open: 21, resolved: 8 },

  stateWise: [
    { state: 'Maharashtra', cases: 8, vehicles: 6, open: 6 },
    { state: 'Delhi', cases: 6, vehicles: 5, open: 4 },
    { state: 'Uttar Pradesh', cases: 5, vehicles: 4, open: 4 },
    { state: 'Rajasthan', cases: 4, vehicles: 3, open: 3 },
    { state: 'Karnataka', cases: 3, vehicles: 2, open: 2 },
    { state: 'Haryana', cases: 2, vehicles: 2, open: 1 },
    { state: 'Gujarat', cases: 1, vehicles: 1, open: 1 },
  ],
  stateWiseTotal: { state: 'Grand Total', cases: 29, vehicles: 18, open: 21 },

  authorityWise: [
    { authority: 'RTO', cases: 9, vehicles: 8, open: 7 },
    { authority: 'Traffic Police', cases: 8, vehicles: 7, open: 5 },
    { authority: 'Police', cases: 7, vehicles: 6, open: 5 },
    { authority: 'Court', cases: 4, vehicles: 4, open: 3 },
    { authority: 'Other', cases: 1, vehicles: 1, open: 1 },
  ],
  authorityWiseTotal: { authority: 'Grand Total', cases: 29, vehicles: 18, open: 21 },

  rawDataLinks: [
    {
      label: 'All Cases',
      href: '/reports/raw/feb-2026-all-cases.xlsx',
      cases: 29,
      vehicles: 18,
      tone: 'blue',
    },
    {
      label: 'Open Cases',
      href: '/reports/raw/feb-2026-open-cases.xlsx',
      cases: 21,
      vehicles: 15,
      tone: 'red',
    },
    {
      label: 'Resolved Cases',
      href: '/reports/raw/feb-2026-resolved-cases.xlsx',
      cases: 8,
      vehicles: 7,
      tone: 'emerald',
    },
    {
      label: 'RTO Related Cases',
      href: '/reports/raw/feb-2026-rto-cases.xlsx',
      cases: 9,
      vehicles: 8,
      tone: 'amber',
    },
  ],
}

export default function MonthlyCasesSummaryReportPreview() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 print:bg-white print:min-h-0">
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="py-8 print:py-0">
        <MonthlyCasesSummaryReport {...sampleReport} />
      </div>
    </div>
  )
}
