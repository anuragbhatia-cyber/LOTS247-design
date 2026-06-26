import MonthlyChallanSummaryReport from './MonthlyChallanSummaryReport'
import type { MonthlyChallanSummaryReportProps } from './MonthlyChallanSummaryReport'

const sampleReport: MonthlyChallanSummaryReportProps = {
  subscriberId: 'sub-001',
  subscriberName: 'Rajesh Kumar',
  dateGenerated: '01 Mar 2026',
  reportMonth: 'March',
  reportYear: '2026',

  overallStatus: [
    { status: 'Pending', vehicles: 6, count: 317, amount: 512_100 },
    { status: 'Disposed', vehicles: 5, count: 10, amount: 7_500 },
  ],
  overallTotal: { status: 'Grand Total', vehicles: 6, count: 327, amount: 519_600 },

  stateWisePendingOnline: [
    { state: 'Delhi', vehicles: 6, count: 55, amount: 105_000 },
    { state: 'Rajasthan', vehicles: 3, count: 12, amount: 20_200 },
    { state: 'Uttarakhand', vehicles: 2, count: 4, amount: 10_000 },
    { state: 'Uttar Pradesh', vehicles: 1, count: 1, amount: 2_000 },
  ],
  stateWisePendingOnlineTotal: { state: 'Grand Total', vehicles: 6, count: 72, amount: 137_200 },

  stateWisePendingInCourt: [
    { state: 'Delhi', vehicles: 5, count: 15, amount: 85_000 },
    { state: 'Haryana', vehicles: 4, count: 9, amount: 33_000 },
    { state: 'Uttar Pradesh', vehicles: 6, count: 10, amount: 26_500 },
    { state: 'Rajasthan', vehicles: 5, count: 5, amount: 3_600 },
    { state: 'Uttarakhand', vehicles: 3, count: 3, amount: 3_500 },
    { state: 'Himachal Pradesh', vehicles: 2, count: 2, amount: 3_000 },
    { state: 'Chandigarh', vehicles: 1, count: 1, amount: 1_000 },
  ],
  stateWisePendingInCourtTotal: { state: 'Grand Total', vehicles: 6, count: 45, amount: 155_600 },

  amountRangePendingOnline: [
    { range: '0 - 999', vehicles: 2, count: 6, amount: 1_700 },
    { range: '1000 - 1999', vehicles: 3, count: 7, amount: 7_500 },
    { range: '2000 - 2999', vehicles: 6, count: 53, amount: 106_000 },
    { range: '3000 - 3999', vehicles: 1, count: 5, amount: 15_000 },
    { range: '7000 - 7999', vehicles: 1, count: 1, amount: 7_000 },
  ],
  amountRangePendingOnlineTotal: { range: 'Grand Total', vehicles: 6, count: 72, amount: 137_200 },

  amountRangePendingInCourt: [
    { range: '0 - 999', vehicles: 4, count: 14, amount: 6_600 },
    { range: '1000 - 1999', vehicles: 5, count: 10, amount: 12_000 },
    { range: '2000 - 2999', vehicles: 5, count: 12, amount: 24_000 },
    { range: '5000 - 5999', vehicles: 3, count: 3, amount: 15_000 },
    { range: '6000 - 6999', vehicles: 1, count: 1, amount: 6_000 },
    { range: '10000 - 10999', vehicles: 1, count: 1, amount: 10_000 },
    { range: '20000 - 29999', vehicles: 3, count: 3, amount: 60_000 },
    { range: '30000 - 39999', vehicles: 1, count: 1, amount: 30_000 },
  ],
  amountRangePendingInCourtTotal: { range: 'Grand Total', vehicles: 6, count: 45, amount: 163_600 },

  rawDataLinks: [
    {
      label: 'Pending In Court',
      href: '/reports/raw/mar-2026-pending-in-court.csv',
      vehicles: 6,
      challans: 45,
      amount: 155_600,
      tone: 'red',
    },
    {
      label: 'Pending Online',
      href: '/reports/raw/mar-2026-pending-online.csv',
      vehicles: 6,
      challans: 72,
      amount: 137_200,
      tone: 'amber',
    },
    {
      label: 'Pending Virtual Court',
      href: '/reports/raw/mar-2026-pending-virtual-court.csv',
      vehicles: 4,
      challans: 18,
      amount: 92_400,
      tone: 'blue',
    },
    {
      label: 'Disposed',
      href: '/reports/raw/mar-2026-disposed.csv',
      vehicles: 5,
      challans: 10,
      amount: 7_500,
      tone: 'stone',
    },
  ],
}

export default function MonthlyChallanSummaryReportPreview() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 print:bg-white print:min-h-0">
      <div className="print:hidden sticky top-0 z-10 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Monthly Challan Summary Preview
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
        <MonthlyChallanSummaryReport {...sampleReport} />
      </div>
    </div>
  )
}
