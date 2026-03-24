import { useState, useMemo } from 'react'
import {
  Search,
  Download,
  Mail,
  MessageCircle,
  FileText,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  AlertTriangle,
  Car,
  Calendar,
  Filter,
} from 'lucide-react'
import type { ReportsProps, Report, ReportTab, ReportType } from '@/../product/sections/reports/types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABS: { id: ReportTab; label: string; description: string }[] = [
  { id: 'All', label: 'All', description: 'All reports' },
  { id: 'MIS', label: 'MIS', description: 'Monthly Incident Summary' },
  { id: 'ICR', label: 'ICR', description: 'Incident Closure Report' },
  { id: 'ISR', label: 'ISR', description: 'Incident Summary Report' },
  { id: 'MIS-CHALLAN', label: 'MIS-Challan', description: 'Monthly Challan Summary' },
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

function ReportPreviewModal({
  report,
  onClose,
  onDownload,
  onShareEmail,
  onShareWhatsApp,
}: {
  report: Report
  onClose: () => void
  onDownload?: (id: string) => void
  onShareEmail?: (id: string) => void
  onShareWhatsApp?: (id: string) => void
}) {
  const config = TYPE_CONFIG[report.type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl dark:shadow-stone-950/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-stone-100 dark:border-stone-800">
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-2.5 mb-2">
              <TypeBadge type={report.type} />
              <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">{report.format}</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {report.title}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Generated on {formatDate(report.generatedAt)} at {formatTime(report.generatedAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Preview Placeholder */}
        <div className="p-5 sm:p-6">
          <div className="aspect-[8.5/11] max-h-[400px] w-full rounded-xl border-2 border-dashed border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 flex flex-col items-center justify-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${config.bg} flex items-center justify-center`}>
              <FileText className={`w-8 h-8 ${config.text}`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">{report.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {report.period} &middot; {report.format}
              </p>
            </div>

            {/* Report-specific summary */}
            {report.type === 'MIS' && report.totalIncidents !== undefined && (
              <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
                <span>{report.totalIncidents} total</span>
                <span className="text-emerald-600 dark:text-emerald-400">{report.resolvedIncidents} resolved</span>
                <span className="text-amber-600 dark:text-amber-400">{report.pendingIncidents} pending</span>
              </div>
            )}
            {report.type === 'MIS-CHALLAN' && report.totalChallans !== undefined && (
              <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
                <span>{report.totalChallans} challans</span>
                <span className="text-emerald-600 dark:text-emerald-400">{report.resolvedChallans} resolved</span>
                <span className="text-amber-600 dark:text-amber-400">
                  {report.totalFines !== undefined && `₹${report.totalFines.toLocaleString('en-IN')} fines`}
                </span>
              </div>
            )}
            {(report.type === 'ICR' || report.type === 'ISR') && report.incidentId && (
              <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-mono">{report.incidentId}</span>
                <span>{report.vehicleRegistration}</span>
                {report.incidentType && <span>{report.incidentType}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-5 sm:px-6 pb-5 sm:pb-6">
          <button
            onClick={() => onDownload?.(report.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={() => onShareEmail?.(report.id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </button>
          <button
            onClick={() => onShareWhatsApp?.(report.id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
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
  const [previewReport, setPreviewReport] = useState<Report | null>(null)

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

  const handlePreview = (report: Report) => {
    setPreviewReport(report)
    onPreview?.(report.id)
  }

  // Filter & search
  const filtered = useMemo(() => {
    let result = [...reports]

    // Tab filter
    if (activeTab !== 'All') {
      result = result.filter((r) => r.type === activeTab)
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.period.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.incidentId?.toLowerCase().includes(q) ||
          r.vehicleRegistration?.toLowerCase().includes(q)
      )
    }

    // Sort by generated date descending
    result.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())

    return result
  }, [reports, activeTab, searchQuery])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Tab counts
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
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Reports
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            View, download, and share system-generated reports
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              title={tab.description}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
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

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-md">
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
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[20%]" />
              <col className="w-[10%]" />
              <col className="w-[20%]" />
              <col className="w-[28%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800">
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Period
                </th>
                <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                  Report Type
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
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {paginatedItems.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => handlePreview(report)}
                  className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                >
                  {/* Period */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                      {report.period}
                    </p>
                    {report.incidentId && (
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-mono">
                        {report.incidentId}
                      </p>
                    )}
                    {report.vehicleRegistration && (
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                        {report.vehicleRegistration}
                      </p>
                    )}
                  </td>

                  {/* Report Type */}
                  <td className="px-5 py-4">
                    <TypeBadge type={report.type} />
                  </td>

                  {/* Format */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                      <FileText className="w-3 h-3" />
                      {report.format}
                    </span>
                  </td>

                  {/* Generated */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-stone-700 dark:text-stone-300">
                      {formatDate(report.generatedAt)}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {formatTime(report.generatedAt)}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handlePreview(report)}
                        className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDownload?.(report.id)}
                        className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onShareEmail?.(report.id)}
                        className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Share via Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onShareWhatsApp?.(report.id)}
                        className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Share via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                No reports found
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Try adjusting your search or switching tabs
              </p>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {paginatedItems.map((report) => (
            <div
              key={report.id}
              onClick={() => handlePreview(report)}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 active:bg-stone-50 dark:active:bg-stone-800/40 transition-colors cursor-pointer"
            >
              {/* Top: Period + Type */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                    {report.period}
                  </p>
                  {report.incidentId && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-mono">
                      {report.incidentId}
                    </p>
                  )}
                </div>
                <TypeBadge type={report.type} />
              </div>

              {/* Details */}
              <div className="space-y-1.5 mb-3">
                {report.vehicleRegistration && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">Vehicle</span>
                    <span className="text-sm text-stone-800 dark:text-stone-200">
                      {report.vehicleRegistration}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Generated</span>
                  <span className="text-sm text-stone-600 dark:text-stone-300">
                    {formatDate(report.generatedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Format</span>
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                    {report.format}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div
                className="flex items-center gap-2 pt-3 border-t border-stone-100 dark:border-stone-800"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onDownload?.(report.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 min-h-11 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => onShareEmail?.(report.id)}
                  className="p-2.5 min-h-11 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onShareWhatsApp?.(report.id)}
                  className="p-2.5 min-h-11 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Mobile Empty State */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                No reports found
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Try adjusting your search or switching tabs
              </p>
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

      {/* Preview Modal */}
      {previewReport && (
        <ReportPreviewModal
          report={previewReport}
          onClose={() => setPreviewReport(null)}
          onDownload={onDownload}
          onShareEmail={onShareEmail}
          onShareWhatsApp={onShareWhatsApp}
        />
      )}
    </div>
  )
}
