import { useState } from 'react'
import { ArrowLeft, ChevronDown, Truck } from 'lucide-react'

interface ComplianceDoc {
  id: string
  label: string
  status: 'valid' | 'expired' | 'expiring-soon'
  statusLabel: string
  details: { label: string; value: string }[]
}

interface HistoryItem {
  event: string
  date: string
  desc: string
}

const SAMPLE_COMPLIANCE: ComplianceDoc[] = [
  {
    id: 'insurance',
    label: 'Motor Insurance',
    status: 'valid',
    statusLabel: 'Valid',
    details: [
      { label: 'Document', value: 'Motor Insurance' },
      { label: 'Expiry Date', value: '15 Dec 2026' },
      { label: 'Status', value: 'Valid' },
    ],
  },
  {
    id: 'puc',
    label: 'PUC Certificate',
    status: 'valid',
    statusLabel: 'Valid',
    details: [
      { label: 'Document', value: 'PUC Certificate' },
      { label: 'Expiry Date', value: '20 Aug 2026' },
      { label: 'Status', value: 'Valid' },
    ],
  },
  {
    id: 'fitness',
    label: 'Fitness Certificate',
    status: 'valid',
    statusLabel: 'Valid',
    details: [
      { label: 'Document', value: 'Fitness Certificate' },
      { label: 'Expiry Date', value: '10 Jan 2027' },
      { label: 'Status', value: 'Valid' },
    ],
  },
  {
    id: 'rc',
    label: 'Registration Certificate',
    status: 'valid',
    statusLabel: 'Valid',
    details: [
      { label: 'Document', value: 'Registration Certificate' },
      { label: 'Expiry Date', value: '02 Mar 2031' },
      { label: 'Status', value: 'Valid' },
    ],
  },
  {
    id: 'challans',
    label: 'Pending Challans',
    status: 'expired',
    statusLabel: 'Expired',
    details: [
      { label: 'Pending', value: '3 Challans' },
      { label: 'Total Amount', value: '₹15,500' },
    ],
  },
  {
    id: 'permits',
    label: 'Permits',
    status: 'valid',
    statusLabel: 'Valid',
    details: [
      { label: 'Permit Type', value: 'All India' },
      { label: 'Expiry Date', value: '15 Mar 2027' },
    ],
  },
]

const SAMPLE_HISTORY: HistoryItem[] = [
  { event: 'Incident Solved', date: '10 Mar 2026', desc: 'Insurance claim settled' },
  { event: 'New Incident Created', date: '22 Feb 2026', desc: 'Challan dispute filed' },
  { event: 'Incident Solved', date: '15 Feb 2026', desc: 'PUC renewal completed' },
  { event: 'New Incident Created', date: '20 Jan 2026', desc: 'Overloading challan reported' },
  { event: 'New Incident Created', date: '5 Dec 2025', desc: 'RC mismatch flagged' },
  { event: 'Added to LOTS247', date: '2 Oct 2025', desc: 'Vehicle registered on platform' },
]

// Sample vehicle info keyed by vehicle number
const VEHICLE_INFO: Record<string, { model: string; year: string; type: string; status: string; score: number }> = {
  UP32MM1113: { model: 'Tata Prima 4928.S', year: '2022', type: 'Truck', status: 'Active', score: 78 },
  UP32NN2224: { model: 'Ashok Leyland 4220', year: '2021', type: 'Truck', status: 'Active', score: 65 },
  UP32PP3335: { model: 'BharatBenz 3523R', year: '2023', type: 'Trailer', status: 'Active', score: 100 },
  UP32QQ4446: { model: 'Mahindra Blazo X 46', year: '2022', type: 'Truck', status: 'Active', score: 82 },
  UP32RR5557: { model: 'Eicher Pro 6049', year: '2023', type: 'Truck', status: 'Active', score: 91 },
}

const DEFAULT_VEHICLE = { model: 'Unknown Model', year: '2024', type: 'Vehicle', status: 'Active', score: 85 }

function ScoreRing({ score }: { score: number }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'
  const textColor = score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="5" className="stroke-stone-100 dark:stroke-stone-800" />
        <circle
          cx="32" cy="32" r={radius} fill="none" strokeWidth="5" strokeLinecap="round"
          className={`transition-all duration-700 ${color}`}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-lg font-bold tabular-nums leading-none ${textColor}`}>{score}</span>
      </div>
    </div>
  )
}

export interface VehicleComplianceResultsViewProps {
  vehicleNumber: string
  onBack: () => void
}

export function VehicleComplianceResultsView({ vehicleNumber, onBack }: VehicleComplianceResultsViewProps) {
  const vehicle = VEHICLE_INFO[vehicleNumber] || DEFAULT_VEHICLE
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const statusBadge = (status: ComplianceDoc['status']) => {
    if (status === 'valid') return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
    if (status === 'expiring-soon') return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
    return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
  }

  const historyDotColor = () => 'bg-emerald-500 dark:bg-emerald-400'

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Vehicle Info Header */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-4 sm:p-5 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-wider">
                  {vehicleNumber}
                </h1>
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                  {vehicle.status}
                </span>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                {vehicle.model} · {vehicle.year} · {vehicle.type}
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center flex-shrink-0">
              <ScoreRing score={vehicle.score} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mt-1">Score</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Compliance Status — left */}
          <div className="lg:col-span-3 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-4">
              Compliance Status
            </h3>
            <div className="space-y-1">
              {SAMPLE_COMPLIANCE.map((doc) => {
                const isExpanded = expanded.has(doc.id)
                return (
                  <div
                    key={doc.id}
                    className={`rounded-xl transition-colors ${isExpanded ? 'bg-stone-100 dark:bg-stone-800/60' : 'bg-stone-50 dark:bg-stone-800/30 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'}`}
                  >
                    <button
                      onClick={() => toggleExpand(doc.id)}
                      className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronDown className={`w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                        <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{doc.label}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(doc.status)}`}>{doc.statusLabel}</span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0.5 ml-7">
                        <div className="border-l-2 border-stone-200 dark:border-stone-700 pl-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                          {doc.details.map(d => (
                            <div key={d.label}>
                              <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">{d.label}</p>
                              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{d.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Vehicle History — right */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 overflow-hidden">
            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider">
                Vehicle History
              </h3>
            </div>
            <div className="px-5 pb-5">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-700" />

                <div className="space-y-4">
                  {SAMPLE_HISTORY.map((item, i) => (
                    <div key={i} className="relative flex gap-3 pl-0">
                      {/* Dot */}
                      <div className={`w-[10px] h-[10px] rounded-full flex-shrink-0 z-10 mt-1.5 ${historyDotColor(item.event)}`} />
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate">{item.event}</p>
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{item.desc}</p>
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
