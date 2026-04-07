import { useState, useRef, useEffect } from 'react'
import { FileWarning, Briefcase, Building2, MoreHorizontal, CheckCircle2, Clock, Plus, Calendar, ChevronDown, Send, FileText, XCircle, Download } from 'lucide-react'
import data from '@/../product/sections/incident-management/data.json'
import { ChallanList } from './components/ChallanList'
import { CaseList } from './components/CaseList'

const BASE = '/sections/incident-management/screen-designs'

function navigateToScreen(screenName: string, extraParams?: Record<string, string>) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? 'embed=true' : ''
  const extra = extraParams
    ? Object.entries(extraParams).map(([k, v]) => `${k}=${v}`).join('&')
    : ''
  const qs = [embed, extra].filter(Boolean).join('&')
  window.location.href = `${BASE}/${screenName}/fullscreen${qs ? `?${qs}` : ''}`
}

const DATE_PRESETS = [
  { id: 'today', label: 'Today' },
  { id: 'last7Days', label: 'Last 7 days' },
  { id: 'last30Days', label: 'Last 30 days' },
  { id: 'thisMonth', label: 'This month' },
]

type Tab = 'challans' | 'cases' | 'rto' | 'other'

export default function IncidentManagementPreview() {
  const params = new URLSearchParams(window.location.search)
  const initialTab = (params.get('tab') as Tab) || 'challans'
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('last7Days')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const dateRangeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dateRangeRef.current && !dateRangeRef.current.contains(e.target as Node)) {
        setDateRangeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const totalChallans = data.challans.length
  const settledChallans = data.challans.filter((c: { status: string }) => c.status === 'resolved').length
  const inProgressChallans = data.challans.filter((c: { status: string }) => c.status !== 'resolved').length

  const submittedCases = data.cases.filter((c: { status: string }) => c.status === 'submitted' || c.status === 'new').length
  const docRequestedCases = data.cases.filter((c: { status: string }) => c.status === 'document_requested' || c.status === 'awaiting_documents').length
  const inProgressCases = data.cases.filter((c: { status: string }) => c.status === 'in_progress' || c.status === 'ongoing').length
  const closedCases = data.cases.filter((c: { status: string }) => c.status === 'resolved' || c.status === 'closed').length

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 lg:pt-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Incidents
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Manage challans and legal cases across your fleet
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Date Range Filter */}
            <div ref={dateRangeRef} className="relative">
              <button
                onClick={() => setDateRangeOpen(!dateRangeOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">
                  {selectedRange === 'custom' && customFrom && customTo
                    ? `${new Date(customFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${new Date(customTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                    : DATE_PRESETS.find(p => p.id === selectedRange)?.label ?? 'Custom'
                  }
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-150 ${dateRangeOpen ? 'rotate-180' : ''}`} />
              </button>

              {dateRangeOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden z-30">
                  <div className="p-1.5">
                    {DATE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setSelectedRange(preset.id)
                          setDateRangeOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                          selectedRange === preset.id
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}

                    <div className="mx-2 my-1 border-t border-stone-200 dark:border-stone-800" />

                    <button
                      onClick={() => setSelectedRange('custom')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                        selectedRange === 'custom'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      Custom
                    </button>

                    {selectedRange === 'custom' && (
                      <div className="px-3 pb-2 pt-1 flex flex-col gap-2">
                        <input
                          type="date"
                          value={customFrom}
                          onChange={(e) => setCustomFrom(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                        />
                        <input
                          type="date"
                          value={customTo}
                          onChange={(e) => setCustomTo(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                        />
                        <button
                          onClick={() => {
                            if (customFrom && customTo) setDateRangeOpen(false)
                          }}
                          disabled={!customFrom || !customTo}
                          className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Download PDF Button */}
            <button
              className="flex items-center gap-2 px-3.5 py-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Add Incident Button */}
            <button
              onClick={() => window.parent.postMessage({ type: 'openAddIncident' }, '*')}
              className="flex items-center gap-2 px-4 py-2 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Incident</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-4">
          <button
            onClick={() => setActiveTab('challans')}
            className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'challans'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <FileWarning className="w-4 h-4" />
            Challans
            <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
              activeTab === 'challans'
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
            }`}>
              {data.challans.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cases'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Cases
            <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
              activeTab === 'cases'
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
            }`}>
              {data.cases.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rto')}
            className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'rto'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            RTO
            <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
              activeTab === 'rto'
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
            }`}>
              0
            </span>
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'other'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <MoreHorizontal className="w-4 h-4" />
            Other
            <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
              activeTab === 'other'
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
            }`}>
              0
            </span>
          </button>
        </div>

        {/* Overview Cards — Challans */}
        {activeTab === 'challans' && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">{totalChallans}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 dark:text-stone-400">Online: <span className="font-semibold text-stone-700 dark:text-stone-300">5</span></span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">Court: <span className="font-semibold text-stone-700 dark:text-stone-300">3</span></span>
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Total Submitted Challans</p>
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">{settledChallans}</p>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Settled</p>
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">{inProgressChallans}</p>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">In Progress</p>
              </div>
            </div>
          </div>
        )}

        {/* Overview Cards — Cases */}
        {activeTab === 'cases' && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">{submittedCases}</p>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Submitted</p>
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">{inProgressCases}</p>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">In Progress</p>
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">{closedCases}</p>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-stone-500 dark:text-stone-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Closed</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'challans' && (
        <div className="px-4 sm:px-6 lg:px-8">
        <ChallanList
          challans={data.challans}
          vehicles={data.vehicles}
          drivers={data.drivers}
          onView={(id) => navigateToScreen('ChallanDetail', { id })}
          onAddFollowUp={(id) => navigateToScreen('ChallanDetail', { id, tab: 'comments' })}
          onDownloadReceipt={(id) => console.log('Download receipt:', id)}
        />
        </div>
      )}
      {activeTab === 'cases' && (
        <div className="px-4 sm:px-6 lg:px-8">
        <CaseList
          cases={data.cases}
          vehicles={data.vehicles}
          drivers={data.drivers}
          lawyers={data.lawyers}
          onView={(id) => navigateToScreen('CaseDetail', { id })}
          onCreate={() => console.log('Create new case')}
        />
        </div>
      )}
      {(activeTab === 'rto' || activeTab === 'other') && (
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
            {activeTab === 'rto' ? <Building2 className="w-5 h-5 text-stone-400 dark:text-stone-500" /> : <MoreHorizontal className="w-5 h-5 text-stone-400 dark:text-stone-500" />}
          </div>
          <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            No {activeTab === 'rto' ? 'RTO' : 'other'} incidents yet
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Incidents will appear here once added
          </p>
        </div>
      )}

    </div>
  )
}
