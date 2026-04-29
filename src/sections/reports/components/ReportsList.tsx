import { useState, useMemo } from 'react'
import {
  Search,
  Download,
  Share2,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  AlertTriangle,
  Car,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react'
import type { ReportsProps, Report, ReportTab, ReportType } from '@/../product/sections/reports/types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABS: { id: ReportTab; label: string; description: string }[] = [
  { id: 'All', label: 'All', description: 'All reports' },
  { id: 'MIS', label: 'MIS', description: 'Monthly Challan Summary' },
  { id: 'ICR', label: 'ICR', description: 'Incident Closure Summary' },
  { id: 'ISR', label: 'ISR', description: 'Incident Summary Report' },
  { id: 'MIS-CHALLAN', label: 'MIS-Challan', description: 'MIS Challan' },
]

const TYPE_CONFIG: Record<ReportType, { bg: string; text: string; icon: typeof BarChart3; label: string }> = {
  MIS: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: BarChart3,
    label: 'MIS',
  },
  ICR: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    icon: FileText,
    label: 'ICR',
  },
  ISR: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    icon: AlertTriangle,
    label: 'ISR',
  },
  'MIS-CHALLAN': {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    icon: Car,
    label: 'MIS-Challan',
  },
}

const ITEMS_PER_PAGE = 8

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

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getReportName(report: Report): string {
  const d = new Date(report.generatedAt)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-IN', { month: 'short' })
  const year = d.getFullYear()

  if (report.vehicleRegistration) {
    return `${report.type}_${report.vehicleRegistration}_${day}_${month}_${year}`
  }
  // MIS / MIS-CHALLAN — monthly reports, use period month/year
  return `${report.type}_${month}_${year}`
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypeBadge({ type }: { type: ReportType }) {
  const config = TYPE_CONFIG[type]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ReportsList({
  reports,
  activeTab: controlledTab,
  onTabChange,
  onPreview,
  onDownload,
  onShareEmail,
  onShareWhatsApp,
  onSearch,
}: ReportsProps) {
  const [internalTab, setInternalTab] = useState<ReportTab>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [formatFilter, setFormatFilter] = useState<'all' | 'PDF' | 'Excel'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const activeTab = controlledTab ?? internalTab

  const handleTabChange = (tab: ReportTab) => {
    setInternalTab(tab)
    onTabChange?.(tab)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
    setCurrentPage(1)
  }

  // Filter & search
  const filtered = useMemo(() => {
    let result = [...reports]

    if (activeTab !== 'All') {
      result = result.filter((r) => r.type === activeTab)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.period.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.incidentId?.toLowerCase().includes(q) ||
          r.vehicleRegistration?.toLowerCase().includes(q) ||
          getReportName(r).toLowerCase().includes(q)
      )
    }

    if (formatFilter !== 'all') {
      result = result.filter((r) => r.format === formatFilter)
    }

    result.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())

    return result
  }, [reports, activeTab, searchQuery, formatFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const tabCounts = useMemo(() => {
    const counts: Record<ReportTab, number> = {
      All: reports.length,
      MIS: 0,
      ICR: 0,
      ISR: 0,
      'MIS-CHALLAN': 0,
    }
    reports.forEach((r) => {
      counts[r.type]++
    })
    return counts
  }, [reports])

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 lg:pt-8">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Reports
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            View, download, and share system-generated reports
          </p>
        </div>

        {/* Tabs — dropdown on mobile, pill bar on sm+ */}
        <div className="mb-5">
          {/* Mobile dropdown */}
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value as ReportTab)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
            >
              {TABS.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label} ({tabCounts[tab.id]})
                </option>
              ))}
            </select>
          </div>
          {/* Desktop pill bar */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                title={tab.description}
                className={`flex items-center gap-1.5 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {tabCounts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder="Search by period, vehicle, incident ID..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showFilters || formatFilter !== 'all'
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {formatFilter !== 'all' && (
                <span className="ml-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-end gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Format
                </label>
                <div className="relative">
                  <select
                    value={formatFilter}
                    onChange={(e) => { setFormatFilter(e.target.value as 'all' | 'PDF' | 'Excel'); setCurrentPage(1) }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">All Formats</option>
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {formatFilter !== 'all' && (
                <button
                  onClick={() => { setFormatFilter('all'); setCurrentPage(1) }}
                  className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors pb-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
              <col className="w-[20%]" />
              <col className="w-[26%]" />
            </colgroup>
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800">
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Report Name
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Format
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Generated
                </th>
                <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
              {paginatedItems.map((report) => (
                <tr
                  key={report.id}
                  className="group hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                      {getReportName(report)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <TypeBadge type={report.type} />
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                      <FileText className="w-3 h-3" />
                      {report.format}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-stone-700 dark:text-stone-300">
                      {formatDate(report.generatedAt)}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {formatTime(report.generatedAt)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onDownload?.(report.id)}
                        className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onShareWhatsApp?.(report.id)}
                        className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Share via WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">No reports found</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Try adjusting your search or switching tabs</p>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {paginatedItems.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                    {getReportName(report)}
                  </p>
                </div>
                <TypeBadge type={report.type} />
              </div>

              <div className="space-y-1.5 mb-3">
                {report.vehicleRegistration && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">Vehicle</span>
                    <span className="text-sm text-stone-800 dark:text-stone-200">{report.vehicleRegistration}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Generated</span>
                  <span className="text-sm text-stone-600 dark:text-stone-300">{formatDate(report.generatedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Format</span>
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{report.format}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => onDownload?.(report.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => onShareWhatsApp?.(report.id)}
                  className="p-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">No reports found</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Try adjusting your search or switching tabs</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pb-4">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{' '}
              {filtered.length} reports
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
