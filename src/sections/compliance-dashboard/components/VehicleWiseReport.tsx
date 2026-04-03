import { useState, useMemo } from 'react'
import { ArrowLeft, ChevronDown, Truck, Search } from 'lucide-react'

interface Vehicle {
  id: string
  vehicleNumber: string
  vehicleType: string
  make: string
  model: string
  year: number
  category: string
  status: string
}

interface HistoryEvent {
  date: string
  type: string
  title: string
  description: string
  amount: number | null
}

interface ComplianceDoc {
  id: string
  label: string
  status: 'valid' | 'expired' | 'expiring-soon'
  statusLabel: string
  details: { label: string; value: string }[]
}

// Generate a deterministic compliance score from vehicle number
function getScore(vehicleNumber: string) {
  let hash = 0
  for (let i = 0; i < vehicleNumber.length; i++) hash = ((hash << 5) - hash) + vehicleNumber.charCodeAt(i)
  return 60 + Math.abs(hash % 41) // 60-100
}

function getHealthStatus(score: number): { label: string; classes: string } {
  if (score >= 80) return { label: 'Healthy', classes: 'bg-emerald-50 text-emerald-700' }
  if (score >= 70) return { label: 'Need Attention', classes: 'bg-amber-50 text-amber-700' }
  return { label: 'Bad', classes: 'bg-red-50 text-red-700' }
}

function ScoreRing({ score }: { score: number }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'
  const textColor = score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="5" className="stroke-stone-100" />
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
    label: 'Challans',
    status: 'expiring-soon',
    statusLabel: 'Pending',
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

export interface VehicleWiseReportProps {
  vehicles: Vehicle[]
  vehicleHistory: Record<string, HistoryEvent[]>
}

export function VehicleWiseReport({ vehicles, vehicleHistory }: VehicleWiseReportProps) {
  const [search, setSearch] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!search) return vehicles
    const q = search.toLowerCase()
    return vehicles.filter(v =>
      v.vehicleNumber.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q)
    )
  }, [vehicles, search])

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const statusBadge = (status: ComplianceDoc['status']) => {
    if (status === 'valid') return 'bg-emerald-50 text-emerald-700'
    if (status === 'expiring-soon') return 'bg-amber-50 text-amber-700'
    return 'bg-red-50 text-red-700'
  }

  const history = selectedVehicle ? (vehicleHistory[selectedVehicle.vehicleNumber] || []) : []

  // Vehicle list view
  if (!selectedVehicle) {
    return (
      <div className="min-h-screen bg-stone-100">
        <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">Vehicle-wise Compliance Report</h1>
            <p className="text-sm text-stone-500 mt-1">Select a vehicle to view its detailed compliance status</p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by vehicle number, make, model..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          {/* Vehicle table */}
          <div className="bg-white rounded-2xl shadow-md shadow-stone-200/60 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-5 py-3">Vehicle</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-5 py-3">Make / Model</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-5 py-3">Year</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-5 py-3">Type</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-5 py-3">Health</th>
                  <th className="text-right text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-5 py-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => {
                  const score = getScore(v.vehicleNumber)
                  return (
                    <tr
                      key={v.id}
                      onClick={() => { setSelectedVehicle(v); setExpanded(new Set()) }}
                      className="border-b border-stone-50 last:border-0 hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-bold text-stone-900 font-mono tracking-wider">{v.vehicleNumber}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-stone-600">{v.make} {v.model}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-stone-600 tabular-nums">{v.year}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-stone-600">{v.vehicleType}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {(() => { const health = getHealthStatus(score); return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${health.classes}`}>{health.label}</span> })()}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={`text-lg font-bold tabular-nums ${score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{score}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-stone-500">No vehicles found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Vehicle detail/results view — same layout as VehicleComplianceResultsView
  const score = getScore(selectedVehicle.vehicleNumber)

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Vehicle Info Header */}
        <div className="bg-white rounded-2xl shadow-md shadow-stone-200/60 p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 font-mono tracking-wider">
                  {selectedVehicle.vehicleNumber}
                </h1>
                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  {selectedVehicle.status}
                </span>
              </div>
              <p className="text-sm text-stone-500 mt-0.5">
                {selectedVehicle.make} {selectedVehicle.model} · {selectedVehicle.year} · {selectedVehicle.vehicleType}
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center flex-shrink-0">
              <ScoreRing score={score} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mt-1">Score</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left column — Vehicle Summary + Compliance Status */}
          <div className="lg:col-span-3 space-y-4">
            {/* Vehicle Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Incidents', count: '5', amount: '₹48,500' },
                { label: 'Total Cases', count: '3', amount: '₹32,000' },
                { label: 'Total Renewals', count: '7', amount: '₹18,200' },
              ].map(card => (
                <div key={card.label} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-6">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums mb-1">
                    {card.count}
                  </p>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">{card.label}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">{card.amount}</p>
                </div>
              ))}
            </div>

            {/* Compliance Status */}
            <div className="rounded-2xl bg-white shadow-md shadow-stone-200/60 p-5 sm:p-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
              Compliance Status
            </h3>
            <div className="space-y-1">
              {SAMPLE_COMPLIANCE.map((doc) => {
                const isExpanded = expanded.has(doc.id)
                return (
                  <div
                    key={doc.id}
                    className={`rounded-xl transition-colors ${isExpanded ? 'bg-stone-100' : 'bg-stone-50 hover:bg-stone-100/80'}`}
                  >
                    <button
                      onClick={() => toggleExpand(doc.id)}
                      className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                        <p className="text-sm font-medium text-stone-800">{doc.label}</p>
                      </div>
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(doc.status)}`}>{doc.statusLabel}</span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0.5 ml-7">
                        <div className="border-l-2 border-stone-200 pl-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                          {doc.details.map(d => (
                            <div key={d.label}>
                              <p className="text-[11px] uppercase tracking-wider text-stone-400 mb-0.5">{d.label}</p>
                              <p className="text-sm font-medium text-stone-700">{d.value}</p>
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
          </div>

          {/* Vehicle History — right */}
          <div className="lg:col-span-2 rounded-2xl bg-white shadow-md shadow-stone-200/60 overflow-hidden">
            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Vehicle History
              </h3>
            </div>
            <div className="px-5 pb-5">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-200" />

                <div className="space-y-4">
                  {history.length > 0 ? history.map((item, i) => (
                    <div key={i} className="relative flex gap-3 pl-0">
                      <div className="w-[10px] h-[10px] rounded-full flex-shrink-0 z-10 mt-1.5 bg-emerald-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-800 truncate">{item.title}</p>
                        <p className="text-[11px] text-stone-400 mt-0.5">{item.description}</p>
                        <p className="text-[11px] text-stone-400 mt-0.5">{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                  )) : (
                    [
                      { event: 'Incident Solved', date: '10 Mar 2026', desc: 'Insurance claim settled' },
                      { event: 'New Incident Created', date: '22 Feb 2026', desc: 'Challan dispute filed' },
                      { event: 'Incident Solved', date: '15 Feb 2026', desc: 'PUC renewal completed' },
                      { event: 'New Incident Created', date: '20 Jan 2026', desc: 'Overloading challan reported' },
                      { event: 'New Incident Created', date: '5 Dec 2025', desc: 'RC mismatch flagged' },
                      { event: 'Added to LOTS247', date: '2 Oct 2025', desc: 'Vehicle registered on platform' },
                    ].map((item, i) => (
                      <div key={i} className="relative flex gap-3 pl-0">
                        <div className="w-[10px] h-[10px] rounded-full flex-shrink-0 z-10 mt-1.5 bg-emerald-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 truncate">{item.event}</p>
                          <p className="text-[11px] text-stone-400 mt-0.5">{item.desc}</p>
                          <p className="text-[11px] text-stone-400 mt-0.5">{item.date}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
