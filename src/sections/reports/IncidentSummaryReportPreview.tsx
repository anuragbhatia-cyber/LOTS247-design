import IncidentSummaryReport from './IncidentSummaryReport'
import type { IncidentSummaryReportProps } from './IncidentSummaryReport'

const sampleReport: IncidentSummaryReportProps = {
  incidentNumber: 'IRN-20001',
  dateGenerated: '01 May 2026',

  vehicleNumber: 'UP32MM1113',
  customerName: 'Rajesh Kumar Transport Co.',
  accountId: 'LWD-20001',
  customerPOC: {
    name: 'Rajesh Kumar',
    designation: 'Fleet Manager',
  },

  dateTimeOfIncident: '18 Jan 2026, 14:32',
  caseCategory: 'Accident',
  priority: 'High',
  reportedBy: 'Driver — Suresh Yadav (9876543210)',
  location: {
    roadName: 'NH48 near Lonavala Toll Plaza',
    area: 'Lonavala',
    city: 'Pune',
    state: 'Maharashtra',
    pin: '410401',
  },

  incidentDetails:
    'Rear-end collision on NH48 near Lonavala toll plaza. Front bumper and radiator damaged. Other vehicle involved — Maruti Ertiga (MH04DE5678). No injuries reported. Driver called the helpline within 5 minutes of the incident requesting on-ground coordination and FIR support.',
  postCoordinationInfo:
    'On-ground partner reached the spot within 32 minutes. Both vehicles photographed; insurance details of the other party recorded. Spot inspection report and witness statements collected. Vehicle towed to the nearest authorised service centre in Pune.',
  remedialSteps:
    'FIR filed at Lonavala Police Station with the help of Lawyered legal team. Insurance claim initiated with subscriber\'s motor insurer; claim number CL-MH-2026-04812. Service centre estimate received and shared with the customer for approval.',
  challenges:
    'Toll authority initially restricted the towing operation due to road blockage. Lawyered escalated to the NHAI control room and got clearance within 18 minutes. Other party\'s insurance company delayed first response — followed up twice through formal letters.',

  finalStatus: 'In Progress',
  cost: {
    estimated: '₹65,000',
    actual: '₹58,400',
  },
  time: {
    estimated: '12 days',
    actual: '9 days',
  },
}

export default function IncidentSummaryReportPreview() {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 print:bg-white print:min-h-0">
      <div className="print:hidden sticky top-0 z-10 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Incident Summary Report Preview
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {sampleReport.incidentNumber} &middot; {sampleReport.vehicleNumber}
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
