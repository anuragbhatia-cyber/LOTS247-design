import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  CreditCard,
  Scale,
  ArrowUpRight,
  Download,
  RotateCcw,
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Pause,
  FileText,
  MoreVertical,
} from 'lucide-react'
import type {
  ChallanListProps,
  Challan,
  ChallanStatus,
  Vehicle,
  Driver,
} from '@/../product/sections/incident-management/types'

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  ChallanStatus,
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
  onHold: {
    label: 'On Hold',
    bg: 'bg-stone-100 dark:bg-stone-800/60',
    text: 'text-stone-600 dark:text-stone-300',
    icon: Pause,
  },
  notSettled: {
    label: 'Not Settled',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    icon: XCircle,
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getSlaInfo(slaDeadline: string, status: ChallanStatus) {
  if (status === 'resolved') return { label: 'Completed', color: 'text-emerald-600 dark:text-emerald-400', breached: false }

  const now = new Date()
  const deadline = new Date(slaDeadline)
  const diffMs = deadline.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: `SLA breached (${Math.abs(diffDays)}d overdue)`, color: 'text-red-600 dark:text-red-400', breached: true }
  }
  if (diffDays <= 7) {
    return { label: `${diffDays}d remaining`, color: 'text-amber-600 dark:text-amber-400', breached: false }
  }
  return { label: `${diffDays}d remaining`, color: 'text-stone-500 dark:text-stone-400', breached: false }
}

function resolveVehicle(vehicleId: string, vehicles: Vehicle[]): Vehicle | undefined {
  return vehicles.find((v) => v.id === vehicleId)
}

function resolveDriver(driverId: string | null, drivers: Driver[]): Driver | undefined {
  if (!driverId) return undefined
  return drivers.find((d) => d.id === driverId)
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: ChallanStatus }) {
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

export function ChallanList({
  challans,
  vehicles,
  drivers,
  onView,
  onPay,
  onDispute,
  onEscalateToCase,
  onDownloadReceipt,
  onRequestRefund,
}: ChallanListProps) {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ChallanStatus | 'all'>('all')
  const [vehicleFilter, setVehicleFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null)
      }
    }
    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdownId])

  // Compute summary stats
  const stats = useMemo(() => {
    const pending = challans.filter(
      (c) => c.status === 'submitted' || c.status === 'inProgress'
    )
    const totalExposure = pending.reduce((sum, c) => sum + c.amount, 0)
    const breachedCount = challans.filter((c) => {
      const sla = getSlaInfo(c.slaDeadline, c.status)
      return sla.breached
    }).length

    return {
      total: challans.length,
      pending: pending.length,
      resolved: challans.filter((c) => c.status === 'resolved').length,
      totalExposure,
      breachedCount,
    }
  }, [challans])

  // Filter & sort
  const filtered = useMemo(() => {
    let result = [...challans]

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((c) => {
        const vehicle = resolveVehicle(c.vehicleId, vehicles)
        return (
          c.id.toLowerCase().includes(q) ||
          c.violationType.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          vehicle?.registrationNumber.toLowerCase().includes(q)
        )
      })
    }

    // Status
    if (statusFilter !== 'all') {
      result = result.filter((c) => c.status === statusFilter)
    }

    // Vehicle
    if (vehicleFilter !== 'all') {
      result = result.filter((c) => c.vehicleId === vehicleFilter)
    }

    // Sort
    result.sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1
      if (sortBy === 'date') {
        return mul * (new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime())
      }
      return mul * (a.amount - b.amount)
    })

    return result
  }, [challans, searchQuery, statusFilter, vehicleFilter, sortBy, sortDir, vehicles])

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) + (vehicleFilter !== 'all' ? 1 : 0)

  function getRowActions(challan: Challan) {
    const sla = getSlaInfo(challan.slaDeadline, challan.status)
    const actions: {
      label: string
      icon: typeof CreditCard
      onClick: () => void
      variant?: 'primary' | 'danger' | 'default'
    }[] = []

    if (challan.status === 'submitted' || challan.status === 'inProgress') {
      actions.push({
        label: 'Pay Now',
        icon: CreditCard,
        onClick: () => onPay?.(challan.id),
        variant: 'primary',
      })
      actions.push({
        label: 'Dispute',
        icon: Scale,
        onClick: () => onDispute?.(challan.id),
      })
      actions.push({
        label: 'Escalate',
        icon: ArrowUpRight,
        onClick: () => onEscalateToCase?.(challan.id),
      })
    }

    if (challan.status === 'resolved' && challan.paymentReference) {
      actions.push({
        label: 'Receipt',
        icon: Download,
        onClick: () => onDownloadReceipt?.(challan.id),
      })
    }

    if (sla.breached && challan.status !== 'resolved') {
      actions.push({
        label: 'Refund',
        icon: RotateCcw,
        onClick: () => onRequestRefund?.(challan.id),
        variant: 'danger',
      })
    }

    return actions
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Challans
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Track and manage traffic violation challans across your fleet
          </p>
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
              Pending
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.pending}
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
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Exposure
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {formatCurrency(stats.totalExposure)}
            </p>
            {stats.breachedCount > 0 && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {stats.breachedCount} SLA breached
              </p>
            )}
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search by ID, vehicle, violation, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
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

            {/* Sort */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm relative">
              <select
                value={`${sortBy}-${sortDir}`}
                onChange={(e) => {
                  const [field, dir] = e.target.value.split('-') as ['date' | 'amount', 'asc' | 'desc']
                  setSortBy(field)
                  setSortDir(dir)
                }}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="amount-desc">Amount (High)</option>
                <option value="amount-asc">Amount (Low)</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
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
                      setStatusFilter(e.target.value as ChallanStatus | 'all')
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All statuses</option>
                    <option value="submitted">Submitted</option>
                    <option value="inProgress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="onHold">On Hold</option>
                    <option value="notSettled">Not Settled</option>
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

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setStatusFilter('all')
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
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 dark:text-stone-500">
                Filtered by:
              </span>
              {statusFilter !== 'all' && (
                <FilterPill
                  label={STATUS_CONFIG[statusFilter].label}
                  onClear={() => setStatusFilter('all')}
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
          {filtered.length} of {challans.length} challans
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Desktop Table */}
        {/* ----------------------------------------------------------------- */}
        <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800">
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Incident ID
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Vehicle
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Violation
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  SLA
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {filtered.map((challan) => {
                const vehicle = resolveVehicle(challan.vehicleId, vehicles)
                const driver = resolveDriver(challan.driverId, drivers)
                const sla = getSlaInfo(challan.slaDeadline, challan.status)
                const actions = getRowActions(challan)

                return (
                  <tr
                    key={challan.id}
                    onClick={() => onView?.(challan.id)}
                    className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    {/* Incident ID + Date */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {challan.displayId}
                      </p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                        {formatDate(challan.issueDate)}
                      </p>
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

                    {/* Violation + Location */}
                    <td className="px-5 py-4 max-w-[200px]">
                      <p className="text-sm text-stone-800 dark:text-stone-200 truncate">
                        {challan.violationType}
                      </p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 truncate">
                        {challan.location}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 text-right">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 tabular-nums">
                        {formatCurrency(challan.amount)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={challan.status} />
                    </td>

                    {/* SLA */}
                    <td className="px-5 py-4">
                      <p className={`text-xs font-medium ${sla.color}`}>
                        {sla.label}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      {actions.length > 0 && (
                      <div
                        className="relative inline-flex"
                        onClick={(e) => e.stopPropagation()}
                        ref={openDropdownId === challan.id ? dropdownRef : undefined}
                      >
                        <button
                          onClick={() =>
                            setOpenDropdownId(openDropdownId === challan.id ? null : challan.id)
                          }
                          className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openDropdownId === challan.id && (
                          <div className="absolute right-0 top-full mt-1 z-50 w-44 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden py-1">
                            {actions.map((action) => {
                              const Icon = action.icon
                              return (
                                <button
                                  key={action.label}
                                  onClick={() => {
                                    action.onClick()
                                    setOpenDropdownId(null)
                                  }}
                                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors ${
                                    action.variant === 'primary'
                                      ? 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                                      : action.variant === 'danger'
                                      ? 'text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50'
                                  }`}
                                >
                                  <Icon className="w-4 h-4 flex-shrink-0" />
                                  {action.label}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                      )}
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
                <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                No challans found
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Mobile Card View */}
        {/* ----------------------------------------------------------------- */}
        <div className="md:hidden space-y-3">
          {filtered.map((challan) => {
            const vehicle = resolveVehicle(challan.vehicleId, vehicles)
            const driver = resolveDriver(challan.driverId, drivers)
            const sla = getSlaInfo(challan.slaDeadline, challan.status)
            const actions = getRowActions(challan)

            return (
              <div
                key={challan.id}
                onClick={() => onView?.(challan.id)}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 active:bg-stone-50 dark:active:bg-stone-800/40 transition-colors cursor-pointer"
              >
                {/* Top: ID + Status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                      {challan.displayId}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {formatDate(challan.issueDate)}
                    </p>
                  </div>
                  <StatusBadge status={challan.status} />
                </div>

                {/* Middle: Details */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 dark:text-stone-500">
                      Violation
                    </span>
                    <span className="text-sm text-stone-800 dark:text-stone-200 text-right">
                      {challan.violationType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 dark:text-stone-500">
                      Vehicle
                    </span>
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {vehicle?.registrationNumber || '—'}
                      {driver && (
                        <span className="font-normal text-stone-400 dark:text-stone-500">
                          {' '}
                          · {driver.name}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 dark:text-stone-500">
                      Location
                    </span>
                    <span className="text-sm text-stone-600 dark:text-stone-300 text-right">
                      {challan.location}
                    </span>
                  </div>
                </div>

                {/* Bottom: Amount + SLA + Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="text-lg font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                      {formatCurrency(challan.amount)}
                    </p>
                    <p className={`text-xs font-medium mt-0.5 ${sla.color}`}>
                      {sla.label}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {actions.slice(0, 2).map((action) => {
                      const Icon = action.icon
                      return (
                        <button
                          key={action.label}
                          onClick={action.onClick}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            action.variant === 'primary'
                              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                              : action.variant === 'danger'
                              ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {action.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Mobile Empty State */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                No challans found
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
