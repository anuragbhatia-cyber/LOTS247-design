import { useState, useMemo, useEffect } from 'react'
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
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react'
import type {
  CaseListProps,
  Case,
  CaseStatus,
  CaseType,
  Vehicle,
  Driver,
  Lawyer,
} from '../types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Page header
    cases: 'Cases',
    casesSubtitle: 'Legal matters, disputes, and incident resolutions',
    createCase: 'Create Case',

    // Summary cards
    total: 'Total',
    active: 'Active',
    docsPending: 'Docs Pending',
    resolved: 'Resolved',

    // Search
    searchPlaceholder: 'Search by ID, type, vehicle, lawyer, description...',

    // Filters
    filters: 'Filters',
    status: 'Status',
    type: 'Type',
    vehicle: 'Vehicle',
    allStatuses: 'All statuses',
    allTypes: 'All types',
    allVehicles: 'All vehicles',
    clearAll: 'Clear all',
    filteredBy: 'Filtered by:',

    // Status labels
    statusSubmitted: 'Submitted',
    statusInProgress: 'In Progress',
    statusResolved: 'Closed',
    statusDocumentRequested: 'In Progress',
    statusExtended: 'In Progress',

    // Case type labels
    typeTheft: 'Theft',
    typeDetention: 'Detention',
    typeBail: 'Bail',
    typeAccidents: 'Accidents',
    typeFIRs: 'FIRs',
    typeSuperdari: 'Superdari',
    typeVehicleImpounding: 'Vehicle Impounding',
    typeEWayBillIssues: 'E-Way Bill',
    typeOthers: 'Others',

    // Origin badges
    originLawyerCall: 'Lawyer Call',
    originEscalated: 'Escalated',

    // Table headers
    incidentId: 'Incident ID',
    detail: 'Detail',
    expectedClosure: 'Expected Closure',
    actions: 'Actions',

    // SLA labels
    slaCompleted: 'Completed',
    slaDaysRemaining: ' days',
    slaDaysOverdue: ' days',
    slaBreachedOverdue: 'SLA breached',

    // Empty state
    noCasesFound: 'No cases found',
    tryAdjusting: 'Try adjusting your search or filters',
    createFirstCase: 'Create your first case',

    // Not assigned
    notAssigned: 'Not assigned',

    // Results count
    of: 'of',
    casesCount: 'cases',

    // Time ago
    today: 'Today',
    yesterday: 'Yesterday',
    dAgo: 'd ago',
    wAgo: 'w ago',
    moAgo: 'mo ago',
  },
  hi: {
    // Page header
    cases: 'मामले',
    casesSubtitle: 'कानूनी मामले, विवाद, और घटना समाधान',
    createCase: 'मामला बनाएं',

    // Summary cards
    total: 'कुल',
    active: 'सक्रिय',
    docsPending: 'दस्तावेज़ लंबित',
    resolved: 'हल किया',

    // Search
    searchPlaceholder: 'आईडी, प्रकार, वाहन, वकील, विवरण से खोजें...',

    // Filters
    filters: 'फ़िल्टर',
    status: 'स्थिति',
    type: 'प्रकार',
    vehicle: 'वाहन',
    allStatuses: 'सभी स्थितियाँ',
    allTypes: 'सभी प्रकार',
    allVehicles: 'सभी वाहन',
    clearAll: 'सभी साफ़ करें',
    filteredBy: 'फ़िल्टर:',

    // Status labels
    statusSubmitted: 'प्रस्तुत',
    statusInProgress: 'प्रगति में',
    statusResolved: 'बंद',
    statusDocumentRequested: 'प्रगति में',
    statusExtended: 'प्रगति में',

    // Case type labels
    typeTheft: 'चोरी',
    typeDetention: 'हिरासत',
    typeBail: 'ज़मानत',
    typeAccidents: 'दुर्घटनाएँ',
    typeFIRs: 'एफ़आईआर',
    typeSuperdari: 'सुपुर्दगी',
    typeVehicleImpounding: 'वाहन ज़ब्ती',
    typeEWayBillIssues: 'ई-वे बिल',
    typeOthers: 'अन्य',

    // Origin badges
    originLawyerCall: 'वकील कॉल',
    originEscalated: 'एस्केलेटेड',

    // Table headers
    incidentId: 'घटना आईडी',
    detail: 'विवरण',
    expectedClosure: 'अपेक्षित समापन',
    actions: 'कार्रवाई',

    // SLA labels
    slaCompleted: 'पूर्ण',
    slaDaysRemaining: ' दिन',
    slaDaysOverdue: ' दिन',
    slaBreachedOverdue: 'SLA उल्लंघन',

    // Empty state
    noCasesFound: 'कोई मामला नहीं मिला',
    tryAdjusting: 'अपनी खोज या फ़िल्टर समायोजित करें',
    createFirstCase: 'अपना पहला मामला बनाएं',

    // Not assigned
    notAssigned: 'नियुक्त नहीं',

    // Results count
    of: 'में से',
    casesCount: 'मामले',

    // Time ago
    today: 'आज',
    yesterday: 'कल',
    dAgo: 'दिन पहले',
    wAgo: 'सप्ताह पहले',
    moAgo: 'महीने पहले',
  },
}

// ---------------------------------------------------------------------------
// Status label lookup by translation key
// ---------------------------------------------------------------------------

const STATUS_TRANSLATION_KEY: Record<CaseStatus, string> = {
  submitted: 'statusSubmitted',
  inProgress: 'statusInProgress',
  resolved: 'statusResolved',
  documentRequested: 'statusDocumentRequested',
  extended: 'statusExtended',
}

// ---------------------------------------------------------------------------
// Case type translation key lookup
// ---------------------------------------------------------------------------

const CASE_TYPE_TRANSLATION_KEY: Record<CaseType, string> = {
  Theft: 'typeTheft',
  Detention: 'typeDetention',
  Bail: 'typeBail',
  Accidents: 'typeAccidents',
  FIRs: 'typeFIRs',
  Superdari: 'typeSuperdari',
  'Vehicle Impounding': 'typeVehicleImpounding',
  'E-Way Bill': 'typeEWayBillIssues',
  Others: 'typeOthers',
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  CaseStatus,
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
  documentRequested: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    icon: Clock,
  },
  extended: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    icon: Clock,
  },
}

// ---------------------------------------------------------------------------
// Case type config
// ---------------------------------------------------------------------------

const CASE_TYPE_CONFIG: Record<
  CaseType,
  { color: string; bg: string }
> = {
  Theft: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
  },
  Detention: {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  Bail: {
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
  },
  Accidents: {
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
  },
  FIRs: {
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  Superdari: {
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  'Vehicle Impounding': {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  'E-Way Bill': {
    color: 'text-stone-600 dark:text-stone-400',
    bg: 'bg-stone-100 dark:bg-stone-800/60',
  },
  Others: {
    color: 'text-stone-500 dark:text-stone-400',
    bg: 'bg-stone-100 dark:bg-stone-800/60',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string, language: Language): string {
  return new Date(dateStr).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function timeAgo(dateStr: string, t: Record<string, string>): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return t.today
  if (diffDays === 1) return t.yesterday
  if (diffDays < 7) return `${diffDays} ${t.dAgo}`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${t.wAgo}`
  return `${Math.floor(diffDays / 30)} ${t.moAgo}`
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

function getCaseSlaInfo(slaDeadline: string, status: CaseStatus, t: Record<string, string>) {
  if (status === 'resolved') return { label: t.slaCompleted, color: 'text-emerald-600 dark:text-emerald-400' }

  const now = new Date()
  const deadline = new Date(slaDeadline)
  const diffMs = deadline.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: `${Math.abs(diffDays)}${t.slaDaysOverdue}`, color: 'text-red-600 dark:text-red-400' }
  }
  if (diffDays <= 7) {
    return { label: `${diffDays}${t.slaDaysRemaining}`, color: 'text-amber-600 dark:text-amber-400' }
  }
  return { label: `${diffDays}${t.slaDaysRemaining}`, color: 'text-stone-500 dark:text-stone-400' }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status, t }: { status: CaseStatus; t: Record<string, string> }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  const label = t[STATUS_TRANSLATION_KEY[status]]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  )
}

function CaseTypeBadge({ caseType, t }: { caseType: CaseType; t: Record<string, string> }) {
  const config = CASE_TYPE_CONFIG[caseType]
  const Icon = config.icon
  const label = t[CASE_TYPE_TRANSLATION_KEY[caseType]]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.color}`}
    >
      {label}
    </span>
  )
}

function OriginBadge({ origin, t }: { origin: string; t: Record<string, string> }) {
  if (origin === 'manual') return null
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
      {origin === 'lawyerCall' ? t.originLawyerCall : t.originEscalated}
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
  const { language } = useLanguage()
  const t = translations[language]

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<CaseType | 'all'>('all')
  const [vehicleFilter, setVehicleFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

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
      if (statusFilter === 'inProgress') {
        result = result.filter((c) => c.status === 'inProgress' || c.status === 'documentRequested' || c.status === 'extended')
      } else {
        result = result.filter((c) => c.status === statusFilter)
      }
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, typeFilter, vehicleFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
    <div>
      <div>
        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
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

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
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
                      setStatusFilter(e.target.value as CaseStatus | 'all')
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.allStatuses}</option>
                    <option value="submitted">{t.statusSubmitted}</option>
                    <option value="inProgress">{t.statusInProgress}</option>
                    <option value="resolved">{t.statusResolved}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Case Type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.type}
                </label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) =>
                      setTypeFilter(e.target.value as CaseType | 'all')
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.allTypes}</option>
                    {caseTypes.map((type) => (
                      <option key={type} value={type}>
                        {t[CASE_TYPE_TRANSLATION_KEY[type]]}
                      </option>
                    ))}
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
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
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

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {t.filteredBy}
              </span>
              {statusFilter !== 'all' && (
                <FilterPill
                  label={t[STATUS_TRANSLATION_KEY[statusFilter]]}
                  onClear={() => setStatusFilter('all')}
                />
              )}
              {typeFilter !== 'all' && (
                <FilterPill
                  label={t[CASE_TYPE_TRANSLATION_KEY[typeFilter]]}
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

        {/* ================================================================= */}
        {/* Desktop Table */}
        {/* ================================================================= */}
        <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[11%]" />
              <col className="w-[13%]" />
              <col className="w-[11%]" />
              <col className="w-[27%]" />
              <col className="w-[13%]" />
              <col className="w-[16%]" />
              <col className="w-[9%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.incidentId}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.type}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.vehicle}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.detail}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.status}
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.expectedClosure}
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
              {paginatedItems.map((caseItem) => {
                const vehicle = resolveVehicle(caseItem.vehicleId, vehicles)
                const driver = resolveDriver(caseItem.driverId, drivers)
                const lawyer = resolveLawyer(caseItem.assignedLawyerId, lawyers)
                const sla = getCaseSlaInfo(caseItem.slaDeadline, caseItem.status, t)

                return (
                  <tr
                    key={caseItem.id}
                    onClick={() => onView?.(caseItem.id)}
                    className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    {/* Incident ID + Date */}
                    <td className="px-5 py-4 max-w-[240px]">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {caseItem.displayId}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {formatDate(caseItem.createdAt, language)}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <CaseTypeBadge caseType={caseItem.caseType} t={t} />
                    </td>

                    {/* Vehicle */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                        {vehicle?.registrationNumber || '\u2014'}
                      </p>
                    </td>

                    {/* Detail */}
                    <td className="px-5 py-4">
                      <div className="group/tip relative">
                        <p className="text-sm text-stone-800 dark:text-stone-200 truncate max-w-[220px]">
                          {caseItem.description}
                        </p>
                        <div className="pointer-events-none absolute left-0 bottom-full mb-1.5 z-50 max-w-xs px-2.5 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-xs text-white dark:text-stone-900 shadow-lg opacity-0 translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 transition-all duration-200 ease-out whitespace-normal">
                          {caseItem.description}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={caseItem.status} t={t} />
                    </td>

                    {/* Expected Closure */}
                    <td className="px-5 py-4">
                      <p className={`text-sm font-medium ${sla.color}`}>
                        {sla.label}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {t.noCasesFound}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {t.tryAdjusting}
              </p>
              <button
                onClick={onCreate}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t.createFirstCase}
              </button>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* Mobile Card View */}
        {/* ================================================================= */}
        <div className="md:hidden space-y-3">
          {paginatedItems.map((caseItem) => {
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
                      <OriginBadge origin={caseItem.origin} t={t} />
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {formatDate(caseItem.createdAt, language)}
                    </p>
                  </div>
                  <StatusBadge status={caseItem.status} t={t} />
                </div>

                {/* Type badge */}
                <div className="mb-3">
                  <CaseTypeBadge caseType={caseItem.caseType} t={t} />
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2 mb-3">
                  {caseItem.description}
                </p>

                {/* Footer: Vehicle + Lawyer */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{t.vehicle}</p>
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {vehicle?.registrationNumber || '\u2014'}
                      {driver && (
                        <span className="font-normal text-stone-500 dark:text-stone-400">
                          {' '}
                          · {driver.name}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-500 dark:text-stone-400">{t.lawyer}</p>
                    {lawyer ? (
                      <p className="text-sm text-stone-800 dark:text-stone-200">
                        {lawyer.name}
                      </p>
                    ) : (
                      <p className="text-sm text-stone-500 dark:text-stone-400 italic">
                        {t.notAssigned}
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
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {t.noCasesFound}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {t.tryAdjusting}
              </p>
              <button
                onClick={onCreate}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t.createFirstCase}
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pb-4">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} {t.of} {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[32px] h-8 rounded-xl text-xs font-medium transition-colors ${
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
                className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
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
