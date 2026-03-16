import { useState, useMemo } from 'react'
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  X,
  Clock,
  CheckCircle2,
  FileText,
  FileQuestion,
  Timer,
  AlertCircle,
  Briefcase,
  Scale,
  Car,
  Shield,
  Lock,
  FileWarning,
  Gavel,
  ArrowUpRight,
} from 'lucide-react'
import type {
  CaseListProps,
  Case,
  CaseStatus,
  CaseType,
  Vehicle,
  Driver,
  Lawyer,
} from '@/../product/sections/incident-management/types'

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; bg: string; text: string; icon: typeof Clock }
> = {
  submitted: {
    label: 'Submitted',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    icon: FileText,
  },
  inProgress: {
    label: 'In Progress',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    icon: Clock,
  },
  resolved: {
    label: 'Resolved',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: CheckCircle2,
  },
  documentRequested: {
    label: 'Document Requested',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    icon: FileQuestion,
  },
  extended: {
    label: 'Extended',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    text: 'text-orange-700 dark:text-orange-300',
    icon: Timer,
  },
}

// ---------------------------------------------------------------------------
// Case type config
// ---------------------------------------------------------------------------

const CASE_TYPE_CONFIG: Record<
  CaseType,
  { icon: typeof AlertCircle; color: string; bg: string }
> = {
  Accident: {
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
  },
  'Vehicle Detention': {
    icon: Lock,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  Theft: {
    icon: Shield,
    color: 'text-stone-600 dark:text-stone-400',
    bg: 'bg-stone-100 dark:bg-stone-800/60',
  },
  'Vehicle Impounding': {
    icon: Car,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
  },
  'Insurance Dispute': {
    icon: Scale,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  'Legal Complaint': {
    icon: Gavel,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
  },
  'RTO Escalation': {
    icon: FileWarning,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  'Escalated Challan': {
    icon: ArrowUpRight,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

function resolveVehicle(vehicleId: string, vehicles: Vehicle[]): Vehicle | undefined {
  return vehicles.find((v) => v.id === vehicleId)
}

function resolveDriver(driverId: string | null, drivers: Driver[]): Driver | undefined {
  if (!driverId) return undefined
  return drivers.find((d) => d.id === driverId)
}

function resolveLawyer(lawyerId: string | null, lawyers: Lawyer[]): Lawyer | undefined {
  if (!lawyerId) return undefined
  return lawyers.find((l) => l.id === lawyerId)
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: CaseStatus }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

function CaseTypeBadge({ caseType }: { caseType: CaseType }) {
  const config = CASE_TYPE_CONFIG[caseType]
  const Icon = config.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {caseType}
    </span>
  )
}

function OriginBadge({ origin }: { origin: string }) {
  if (origin === 'manual') return null
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
      {origin === 'lawyerCall' ? 'Lawyer Call' : 'Escalated'}
    </span>
  )
}

function FilterPill({
  label,
  onClear,
}: {
  label: string
  onClear: () => void
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
      {label}
      <button
        onClick={onClear}
        className="ml-0.5 p-0.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CaseList({
  cases,
  vehicles,
  drivers,
  lawyers,
  onView,
  onCreate,
}: CaseListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<CaseType | 'all'>('all')
  const [vehicleFilter, setVehicleFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Summary stats
  const stats = useMemo(() => {
    const active = cases.filter(
      (c) => c.status !== 'resolved'
    ).length
    const awaitingDocs = cases.filter(
      (c) => c.status === 'documentRequested'
    ).length
    const resolved = cases.filter((c) => c.status === 'resolved').length

    return { total: cases.length, active, awaitingDocs, resolved }
  }, [cases])

  // Filter & sort
  const filtered = useMemo(() => {
    let result = [...cases]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((c) => {
        const vehicle = resolveVehicle(c.vehicleId, vehicles)
        const lawyer = resolveLawyer(c.assignedLawyerId, lawyers)
        return (
          c.id.toLowerCase().includes(q) ||
          c.caseType.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          vehicle?.registrationNumber.toLowerCase().includes(q) ||
          lawyer?.name.toLowerCase().includes(q)
        )
      })
    }

    if (statusFilter !== 'all') {
      result = result.filter((c) => c.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      result = result.filter((c) => c.caseType === typeFilter)
    }

    if (vehicleFilter !== 'all') {
      result = result.filter((c) => c.vehicleId === vehicleFilter)
    }

    // Sort: newest first
    result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return result
  }, [cases, searchQuery, statusFilter, typeFilter, vehicleFilter, vehicles, lawyers])

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (typeFilter !== 'all' ? 1 : 0) +
    (vehicleFilter !== 'all' ? 1 : 0)

  // Unique case types from data
  const caseTypes = useMemo(
    () => Array.from(new Set(cases.map((c) => c.caseType))).sort(),
    [cases]
  )

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Cases
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Legal matters, disputes, and incident resolutions
            </p>
          </div>
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            Create Case
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Total
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.total}
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Active
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.active}
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-purple-200 dark:border-purple-900/40 rounded-xl p-4">
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Docs Pending
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.awaitingDocs}
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Resolved
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.resolved}
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search by ID, type, vehicle, lawyer, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
              {/* Status */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as CaseStatus | 'all')
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All statuses</option>
                    <option value="submitted">Submitted</option>
                    <option value="inProgress">In Progress</option>
                    <option value="documentRequested">Document Requested</option>
                    <option value="extended">Extended</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Case Type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) =>
                      setTypeFilter(e.target.value as CaseType | 'all')
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All types</option>
                    {caseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Vehicle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Vehicle
                </label>
                <div className="relative">
                  <select
                    value={vehicleFilter}
                    onChange={(e) => setVehicleFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All vehicles</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.registrationNumber}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
                    setVehicleFilter('all')
                  }}
                  className="self-end px-3 py-2 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && !showFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-400 dark:text-stone-500">
                Filtered by:
              </span>
              {statusFilter !== 'all' && (
                <FilterPill
                  label={STATUS_CONFIG[statusFilter].label}
                  onClear={() => setStatusFilter('all')}
                />
              )}
              {typeFilter !== 'all' && (
                <FilterPill
                  label={typeFilter}
                  onClear={() => setTypeFilter('all')}
                />
              )}
              {vehicleFilter !== 'all' && (
                <FilterPill
                  label={
                    resolveVehicle(vehicleFilter, vehicles)?.registrationNumber ||
                    vehicleFilter
                  }
                  onClear={() => setVehicleFilter('all')}
                />
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-3 text-xs text-stone-400 dark:text-stone-500">
          {filtered.length} of {cases.length} cases
        </div>

        {/* ================================================================= */}
        {/* Desktop Table */}
        {/* ================================================================= */}
        <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800">
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Incident ID
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Vehicle
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Lawyer
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {filtered.map((caseItem) => {
                const vehicle = resolveVehicle(caseItem.vehicleId, vehicles)
                const driver = resolveDriver(caseItem.driverId, drivers)
                const lawyer = resolveLawyer(caseItem.assignedLawyerId, lawyers)

                return (
                  <tr
                    key={caseItem.id}
                    onClick={() => onView?.(caseItem.id)}
                    className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    {/* Incident ID + Description */}
                    <td className="px-5 py-4 max-w-[240px]">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                          {caseItem.displayId}
                        </p>
                        <OriginBadge origin={caseItem.origin} />
                      </div>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 line-clamp-1">
                        {caseItem.description}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <CaseTypeBadge caseType={caseItem.caseType} />
                    </td>

                    {/* Vehicle + Driver */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                        {vehicle?.registrationNumber || '—'}
                      </p>
                      {driver && (
                        <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                          {driver.name}
                        </p>
                      )}
                    </td>

                    {/* Lawyer */}
                    <td className="px-5 py-4">
                      {lawyer ? (
                        <div>
                          <p className="text-sm text-stone-800 dark:text-stone-200">
                            {lawyer.name}
                          </p>
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                            {lawyer.specialization}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400 dark:text-stone-500 italic">
                          Not assigned
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={caseItem.status} />
                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4 text-right">
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {timeAgo(caseItem.updatedAt)}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                No cases found
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                Try adjusting your search or filters
              </p>
              <button
                onClick={onCreate}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create your first case
              </button>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* Mobile Card View */}
        {/* ================================================================= */}
        <div className="md:hidden space-y-3">
          {filtered.map((caseItem) => {
            const vehicle = resolveVehicle(caseItem.vehicleId, vehicles)
            const driver = resolveDriver(caseItem.driverId, drivers)
            const lawyer = resolveLawyer(caseItem.assignedLawyerId, lawyers)

            return (
              <div
                key={caseItem.id}
                onClick={() => onView?.(caseItem.id)}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 active:bg-stone-50 dark:active:bg-stone-800/40 transition-colors cursor-pointer"
              >
                {/* Top: ID + Status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {caseItem.displayId}
                      </p>
                      <OriginBadge origin={caseItem.origin} />
                    </div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {formatDate(caseItem.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={caseItem.status} />
                </div>

                {/* Type badge */}
                <div className="mb-3">
                  <CaseTypeBadge caseType={caseItem.caseType} />
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2 mb-3">
                  {caseItem.description}
                </p>

                {/* Footer: Vehicle + Lawyer */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500">Vehicle</p>
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {vehicle?.registrationNumber || '—'}
                      {driver && (
                        <span className="font-normal text-stone-400 dark:text-stone-500">
                          {' '}
                          · {driver.name}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-400 dark:text-stone-500">Lawyer</p>
                    {lawyer ? (
                      <p className="text-sm text-stone-800 dark:text-stone-200">
                        {lawyer.name}
                      </p>
                    ) : (
                      <p className="text-sm text-stone-400 dark:text-stone-500 italic">
                        Not assigned
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Mobile Empty State */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                No cases found
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                Try adjusting your search or filters
              </p>
              <button
                onClick={onCreate}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create your first case
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
