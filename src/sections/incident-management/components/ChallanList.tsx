import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  CreditCard,
  Download,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Pause,
  FileText,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react'
import type {
  ChallanListProps,
  Challan,
  ChallanStatus,
  Vehicle,
  Driver,
} from '@/../product/sections/incident-management/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Page header
    pageTitle: 'Challans',
    pageSubtitle: 'Track and manage traffic violation challans across your fleet',

    // Summary cards
    total: 'Total',
    pending: 'Pending',
    resolved: 'Resolved',
    exposure: 'Exposure',
    slaBreached: 'SLA breached',

    // Search & filters
    searchPlaceholder: 'Search by ID, vehicle, violation, location...',
    filters: 'Filters',
    status: 'Status',
    vehicle: 'Vehicle',
    allStatuses: 'All statuses',
    allVehicles: 'All vehicles',
    clearAll: 'Clear all',
    filteredBy: 'Filtered by:',

    // Sort options
    dateNewest: 'Date (Newest)',
    dateOldest: 'Date (Oldest)',
    amountHigh: 'Amount (High)',
    amountLow: 'Amount (Low)',

    // Status labels
    statusSubmitted: 'Submitted',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusOnHold: 'On Hold',
    statusNotSettled: 'Not Settled',

    // SLA labels
    slaCompleted: 'Completed',
    slaBreachedOverdue: 'SLA breached',
    slaDaysOverdue: ' days',
    slaDaysRemaining: ' days',

    // Table headers
    headerIncidentId: 'Incident ID',
    headerVehicle: 'Vehicle',
    headerType: 'Type',
    headerViolation: 'Offence',
    headerAmount: 'Amount',
    headerStatus: 'Status',
    headerSla: 'SLA',
    headerExpectedClosure: 'Expected Closure',
    headerActions: 'Actions',

    // Challan type labels
    challanTypeCourt: 'Court Challan',
    challanTypeOnline: 'Online Challan',

    // Actions
    actionViewIncident: 'View Incident',
    actionAddFollowUp: 'Add Follow-up',
    actionReceipt: 'Receipt',
    actionRefund: 'Refund',

    // Mobile card labels
    labelViolation: 'Offence',
    labelVehicle: 'Vehicle',
    labelLocation: 'Location',

    // Results count
    resultsOf: 'of',
    resultsChallans: 'challans',

    // Empty state
    noChallansFound: 'No challans found',
    tryAdjusting: 'Try adjusting your search or filters',
  },
  hi: {
    // Page header
    pageTitle: 'चालान',
    pageSubtitle: 'अपने बेड़े में यातायात उल्लंघन चालान ट्रैक और प्रबंधित करें',

    // Summary cards
    total: 'कुल',
    pending: 'लंबित',
    resolved: 'निपटारा',
    exposure: 'बकाया',
    slaBreached: 'SLA उल्लंघन',

    // Search & filters
    searchPlaceholder: 'ID, वाहन, उल्लंघन, स्थान से खोजें...',
    filters: 'फ़िल्टर',
    status: 'स्थिति',
    vehicle: 'वाहन',
    allStatuses: 'सभी स्थितियां',
    allVehicles: 'सभी वाहन',
    clearAll: 'सभी साफ़ करें',
    filteredBy: 'फ़िल्टर:',

    // Sort options
    dateNewest: 'तारीख (नवीनतम)',
    dateOldest: 'तारीख (पुरानी)',
    amountHigh: 'राशि (उच्च)',
    amountLow: 'राशि (निम्न)',

    // Status labels
    statusSubmitted: 'प्रस्तुत',
    statusInProgress: 'प्रगति में',
    statusResolved: 'निपटारा',
    statusOnHold: 'रोक पर',
    statusNotSettled: 'अनसुलझा',

    // SLA labels
    slaCompleted: 'पूर्ण',
    slaBreachedOverdue: 'SLA उल्लंघन',
    slaDaysOverdue: ' दिन',
    slaDaysRemaining: ' दिन',

    // Table headers
    headerIncidentId: 'घटना ID',
    headerVehicle: 'वाहन',
    headerType: 'प्रकार',
    headerViolation: 'उल्लंघन',
    headerAmount: 'राशि',
    headerStatus: 'स्थिति',
    headerSla: 'SLA',
    headerExpectedClosure: 'अपेक्षित समापन',
    headerActions: 'कार्रवाई',

    // Challan type labels
    challanTypeCourt: 'कोर्ट चालान',
    challanTypeOnline: 'ऑनलाइन चालान',

    // Actions
    actionViewIncident: 'घटना देखें',
    actionAddFollowUp: 'फॉलो-अप जोड़ें',
    actionReceipt: 'रसीद',
    actionRefund: 'वापसी',

    // Mobile card labels
    labelViolation: 'उल्लंघन',
    labelVehicle: 'वाहन',
    labelLocation: 'स्थान',

    // Results count
    resultsOf: 'में से',
    resultsChallans: 'चालान',

    // Empty state
    noChallansFound: 'कोई चालान नहीं मिला',
    tryAdjusting: 'अपनी खोज या फ़िल्टर बदलकर देखें',
  },
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_STYLE: Record<
  ChallanStatus,
  { bg: string; text: string; icon: typeof Clock }
> = {
  submitted: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    icon: FileText,
  },
  inProgress: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    icon: Clock,
  },
  resolved: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: CheckCircle2,
  },
  onHold: {
    bg: 'bg-stone-100 dark:bg-stone-800/60',
    text: 'text-stone-600 dark:text-stone-300',
    icon: Pause,
  },
  notSettled: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    icon: XCircle,
  },
}

const STATUS_LABEL_KEY: Record<ChallanStatus, string> = {
  submitted: 'statusSubmitted',
  inProgress: 'statusInProgress',
  resolved: 'statusResolved',
  onHold: 'statusOnHold',
  notSettled: 'statusNotSettled',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatDate(dateStr: string, language: Language): string {
  const locale = language === 'hi' ? 'hi-IN' : 'en-IN'
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getSlaInfo(slaDeadline: string, status: ChallanStatus, t: Record<string, string>) {
  if (status === 'resolved') return { label: t.slaCompleted, color: 'text-emerald-600 dark:text-emerald-400', breached: false }

  const now = new Date()
  const deadline = new Date(slaDeadline)
  const diffMs = deadline.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: `${Math.abs(diffDays)}${t.slaDaysOverdue}`, color: 'text-red-600 dark:text-red-400', breached: true }
  }
  if (diffDays <= 7) {
    return { label: `${diffDays}${t.slaDaysRemaining}`, color: 'text-amber-600 dark:text-amber-400', breached: false }
  }
  return { label: `${diffDays}${t.slaDaysRemaining}`, color: 'text-stone-500 dark:text-stone-400', breached: false }
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

function StatusBadge({ status, t }: { status: ChallanStatus; t: Record<string, string> }) {
  const style = STATUS_STYLE[status]
  const Icon = style.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <Icon className="w-3 h-3" />
      {t[STATUS_LABEL_KEY[status]]}
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
  onAddFollowUp,
  onDownloadReceipt,
}: ChallanListProps) {
  const { language } = useLanguage()
  const t = translations[language]

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ChallanStatus | 'all'>('all')
  const [vehicleFilter, setVehicleFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5
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
      const sla = getSlaInfo(c.slaDeadline, c.status, t)
      return sla.breached
    }).length

    return {
      total: challans.length,
      pending: pending.length,
      resolved: challans.filter((c) => c.status === 'resolved').length,
      totalExposure,
      breachedCount,
    }
  }, [challans, t])

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, vehicleFilter, sortBy, sortDir])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) + (vehicleFilter !== 'all' ? 1 : 0)

  function getRowActions(challan: Challan) {
    const actions: {
      label: string
      icon: typeof CreditCard
      onClick: () => void
      variant?: 'primary' | 'danger' | 'default'
    }[] = []

    // Always show View Incident
    actions.push({
      label: t.actionViewIncident,
      icon: FileText,
      onClick: () => onView?.(challan.id),
      variant: 'primary',
    })

    // Always show Add Follow-up
    actions.push({
      label: t.actionAddFollowUp,
      icon: Send,
      onClick: () => onAddFollowUp?.(challan.id),
    })

    if (challan.status === 'resolved' && challan.paymentReference) {
      actions.push({
        label: t.actionReceipt,
        icon: Download,
        onClick: () => onDownloadReceipt?.(challan.id),
      })
    }

    return actions
  }

  return (
    <div>
      <div>
        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
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
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t.filters}
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
                <option value="date-desc">{t.dateNewest}</option>
                <option value="date-asc">{t.dateOldest}</option>
                <option value="amount-desc">{t.amountHigh}</option>
                <option value="amount-asc">{t.amountLow}</option>
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
                  {t.status}
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as ChallanStatus | 'all')
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">{t.allStatuses}</option>
                    <option value="submitted">{t.statusSubmitted}</option>
                    <option value="inProgress">{t.statusInProgress}</option>
                    <option value="resolved">{t.statusResolved}</option>
                    <option value="onHold">{t.statusOnHold}</option>
                    <option value="notSettled">{t.statusNotSettled}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Vehicle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.vehicle}
                </label>
                <div className="relative">
                  <select
                    value={vehicleFilter}
                    onChange={(e) => setVehicleFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">{t.allVehicles}</option>
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
                  className="self-end px-3 py-2 min-h-11 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  {t.clearAll}
                </button>
              )}
            </div>
          )}

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && !showFilters && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {t.filteredBy}
              </span>
              {statusFilter !== 'all' && (
                <FilterPill
                  label={t[STATUS_LABEL_KEY[statusFilter]]}
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

        {/* ----------------------------------------------------------------- */}
        {/* Desktop Table */}
        {/* ----------------------------------------------------------------- */}
        <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[13%]" />
              <col className="w-[13%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
              <col className="w-[14%]" />
              <col className="w-[16%]" />
              <col className="w-[10%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800">
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerIncidentId}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerVehicle}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerType}
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerAmount}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerStatus}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerExpectedClosure}
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.headerActions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {paginatedItems.map((challan) => {
                const vehicle = resolveVehicle(challan.vehicleId, vehicles)
                const driver = resolveDriver(challan.driverId, drivers)
                const sla = getSlaInfo(challan.slaDeadline, challan.status, t)
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
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {formatDate(challan.issueDate, language)}
                      </p>
                    </td>

                    {/* Vehicle */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                        {vehicle?.registrationNumber || '—'}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-stone-700 dark:text-stone-300">
                        {challan.challanType === 'court' ? t.challanTypeCourt : t.challanTypeOnline}
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
                      <StatusBadge status={challan.status} t={t} />
                    </td>

                    {/* Expected Closure */}
                    <td className="px-5 py-4">
                      <p className={`text-sm font-medium ${sla.color}`}>
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
                          className="p-3.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openDropdownId === challan.id && (
                          <div className="absolute right-0 top-full mt-1 z-50 w-44 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden py-1">
                            {actions.map((action) => (
                                <button
                                  key={action.label}
                                  onClick={() => {
                                    action.onClick()
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full text-left px-3.5 py-2 min-h-11 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                                >
                                  {action.label}
                                </button>
                            ))}
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
                {t.noChallansFound}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {t.tryAdjusting}
              </p>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Mobile Card View */}
        {/* ----------------------------------------------------------------- */}
        <div className="md:hidden space-y-3">
          {paginatedItems.map((challan) => {
            const vehicle = resolveVehicle(challan.vehicleId, vehicles)
            const driver = resolveDriver(challan.driverId, drivers)
            const sla = getSlaInfo(challan.slaDeadline, challan.status, t)
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
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {formatDate(challan.issueDate, language)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {challan.challanType === 'court' ? t.challanTypeCourt : t.challanTypeOnline}
                    </span>
                    <StatusBadge status={challan.status} t={t} />
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {t.labelVehicle}
                    </span>
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {vehicle?.registrationNumber || '—'}
                      {driver && (
                        <span className="font-normal text-stone-500 dark:text-stone-400">
                          {' '}
                          · {driver.name}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {t.labelLocation}
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
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 min-h-11 rounded-lg text-xs font-medium transition-colors ${
                            action.variant === 'primary'
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
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
                {t.noChallansFound}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {t.tryAdjusting}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pb-4">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} {t.resultsOf} {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[32px] h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
