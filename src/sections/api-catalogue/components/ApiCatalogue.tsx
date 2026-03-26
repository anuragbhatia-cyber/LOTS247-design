import { useState } from 'react'
import { ShieldCheck, IdCard, Truck, ArrowRight, ArrowLeft, Mail, BookOpen, Key, Zap, BarChart3, ScrollText, ChevronRight, Wallet, type LucideIcon } from 'lucide-react'
import type { ApiCatalogueProps, Api } from '@/../product/sections/api-catalogue/types'
import { ContactModal } from './ContactModal'
import { TopUpModal } from './TopUpModal'

const ICON_MAP: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  'id-card': IdCard,
  'truck': Truck,
}

type SidebarTab = 'all' | 'my'

const SIDEBAR_ITEMS: { id: SidebarTab; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'All APIs', icon: BookOpen },
  { id: 'my', label: 'My APIs', icon: Key },
]

// Simulated "my APIs" — subset the user has subscribed to
const MY_API_IDS = ['api-001']

type DetailTab = 'credits' | 'usage' | 'logs'

const DETAIL_TABS: { id: DetailTab; label: string; icon: LucideIcon }[] = [
  { id: 'credits', label: 'Credits per Hit', icon: Zap },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'logs', label: 'Logs', icon: ScrollText },
]

// How it works flow steps per API
const HOW_IT_WORKS: Record<string, { step: string; desc: string }[]> = {
  'api-001': [
    { step: 'Send Request', desc: 'Pass vehicle number via API call' },
    { step: 'Data Fetch', desc: 'We query state transport databases' },
    { step: 'Processing', desc: 'Challans matched & validated' },
    { step: 'Response', desc: 'Get challan records in JSON' },
  ],
  'api-002': [
    { step: 'Send Request', desc: 'Pass DL number via API call' },
    { step: 'Verification', desc: 'We query the Sarathi database' },
    { step: 'Validation', desc: 'Licence details cross-checked' },
    { step: 'Response', desc: 'Get DL details in JSON' },
  ],
  'api-003': [
    { step: 'Send Request', desc: 'Pass vehicle number via API call' },
    { step: 'Data Fetch', desc: 'We query the Vahan database' },
    { step: 'Processing', desc: 'RC data extracted & validated' },
    { step: 'Response', desc: 'Get RC details in JSON' },
  ],
}

const DEFAULT_FLOW = [
  { step: 'Send Request', desc: 'Make an API call with required params' },
  { step: 'Data Fetch', desc: 'We query official databases' },
  { step: 'Processing', desc: 'Data validated & formatted' },
  { step: 'Response', desc: 'Receive structured JSON response' },
]

// Sample credits data
const CREDITS_DATA = [
  { endpoint: 'Single Lookup', method: 'GET', credits: 1 },
  { endpoint: 'Detailed Info', method: 'GET', credits: 2 },
  { endpoint: 'Bulk Lookup (per item)', method: 'POST', credits: 0.5 },
  { endpoint: 'Webhook Registration', method: 'POST', credits: 0 },
  { endpoint: 'Webhook Removal', method: 'DELETE', credits: 0 },
]

// Sample usage data
const USAGE_DATA = {
  currentMonth: { used: 3_247, limit: 5_000, percentage: 65 },
  daily: [
    { day: 'Mon', hits: 520 },
    { day: 'Tue', hits: 480 },
    { day: 'Wed', hits: 610 },
    { day: 'Thu', hits: 445 },
    { day: 'Fri', hits: 390 },
    { day: 'Sat', hits: 180 },
    { day: 'Sun', hits: 122 },
  ],
}

// Sample logs data
const LOGS_DATA = [
  { id: 1, timestamp: '2026-03-19 12:34:02', endpoint: '/v1/challans/DL01AB1234', method: 'GET', status: 200, latency: '142ms' },
  { id: 2, timestamp: '2026-03-19 12:33:58', endpoint: '/v1/challans/bulk-lookup', method: 'POST', status: 200, latency: '890ms' },
  { id: 3, timestamp: '2026-03-19 12:30:11', endpoint: '/v1/challans/MH02CD5678/pending', method: 'GET', status: 200, latency: '98ms' },
  { id: 4, timestamp: '2026-03-19 12:28:44', endpoint: '/v1/challans/KA03EF9012', method: 'GET', status: 404, latency: '67ms' },
  { id: 5, timestamp: '2026-03-19 12:25:30', endpoint: '/v1/challans/webhooks', method: 'POST', status: 201, latency: '215ms' },
  { id: 6, timestamp: '2026-03-19 12:20:15', endpoint: '/v1/challans/TN04GH3456', method: 'GET', status: 200, latency: '156ms' },
  { id: 7, timestamp: '2026-03-19 12:18:02', endpoint: '/v1/challans/RJ05IJ7890', method: 'GET', status: 500, latency: '3200ms' },
  { id: 8, timestamp: '2026-03-19 12:15:48', endpoint: '/v1/challans/UP06KL1234/details', method: 'GET', status: 200, latency: '178ms' },
]

export function ApiCatalogue({ apis, onContactPricing }: ApiCatalogueProps & { onContactPricing?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('all')
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null)
  const [detailTab, setDetailTab] = useState<DetailTab>('pricing')
  const [contactApiId, setContactApiId] = useState<string | null>(null)
  const [showTopUp, setShowTopUp] = useState(false)

  const selectedApi = apis.find((a) => a.id === selectedApiId) || null
  const contactApi = apis.find((a) => a.id === contactApiId)

  const displayedApis = activeTab === 'my'
    ? apis.filter((a) => MY_API_IDS.includes(a.id))
    : apis

  function handleViewDetail(id: string) {
    setSelectedApiId(id)
    setDetailTab('credits')
  }

  function handleBack() {
    setSelectedApiId(null)
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex">
      {/* Sidebar */}
      <div className="w-64 lg:w-72 shrink-0 hidden md:block p-5 sm:p-6 lg:p-8">
        <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 p-2 space-y-1 sticky top-6">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id && !selectedApi
            const count = item.id === 'all' ? apis.length : apis.filter((a) => MY_API_IDS.includes(a.id)).length
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedApiId(null) }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold ${
                  isActive ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8">
        {/* Header — above cards */}
        {!selectedApi && (
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {activeTab === 'all' ? 'API Catalogue' : 'My APIs'}
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {activeTab === 'all'
                ? 'Browse available APIs to integrate vehicle compliance, challan, and licence data into your systems.'
                : 'APIs you have subscribed to and are currently using.'}
            </p>
          </div>
        )}

        {/* Mobile Tab Switcher */}
        {!selectedApi && (
          <div className="flex md:hidden items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-5">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon
              const isMobileActive = activeTab === item.id
              const count = item.id === 'all' ? apis.length : apis.filter((a) => MY_API_IDS.includes(a.id)).length
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
                    isMobileActive
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                    isMobileActive
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        )}

            {selectedApi ? (
              <ApiDetailContent
                api={selectedApi}
                detailTab={detailTab}
                onDetailTabChange={setDetailTab}
                onBack={handleBack}
                onContactPricing={() => setContactApiId(selectedApi.id)}
                onTopUp={() => setShowTopUp(true)}
                showTabs={activeTab === 'my'}
              />
            ) : (
              <>
                {/* All APIs tab — split into Available APIs + My APIs sections */}
                {activeTab === 'all' ? (
                  <>
                    {/* Available APIs section */}
                    {apis.filter((a) => !MY_API_IDS.includes(a.id)).length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-4">Available APIs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {apis.filter((a) => !MY_API_IDS.includes(a.id)).map((api) => (
                            <div
                              key={api.id}
                              onClick={() => handleViewDetail(api.id)}
                              className="group bg-white dark:bg-stone-900 rounded-xl border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 p-5 transition-all duration-200 hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40 flex flex-col cursor-pointer"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">{api.name}</h3>
                              </div>
                              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-4 flex-1">{api.shortDescription}</p>
                              <div className="flex items-center gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleViewDetail(api.id) }}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                                >
                                  Check Details
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setContactApiId(api.id) }}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  Contact for Pricing
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* My APIs section */}
                    {apis.filter((a) => MY_API_IDS.includes(a.id)).length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-4">My APIs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {apis.filter((a) => MY_API_IDS.includes(a.id)).map((api) => (
                            <div
                              key={api.id}
                              onClick={() => handleViewDetail(api.id)}
                              className="group bg-white dark:bg-stone-900 rounded-xl border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 p-5 transition-all duration-200 hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40 flex flex-col cursor-pointer"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">{api.name}</h3>
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Active</span>
                              </div>
                              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-4 flex-1">{api.shortDescription}</p>
                              <div className="flex items-center gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setShowTopUp(true) }}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                                >
                                  <Wallet className="w-3.5 h-3.5" />
                                  Top-up Balance
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleViewDetail(api.id) }}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                                >
                                  Check Details
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* My APIs tab */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayedApis.map((api) => (
                        <div
                          key={api.id}
                          onClick={() => handleViewDetail(api.id)}
                          className="group bg-white dark:bg-stone-900 rounded-xl border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 p-5 transition-all duration-200 hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40 flex flex-col cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">{api.name}</h3>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Active</span>
                          </div>
                          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-4 flex-1">{api.shortDescription}</p>
                          <div className="flex items-center gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                            <button
                              onClick={(e) => { e.stopPropagation(); setShowTopUp(true) }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                            >
                              <Wallet className="w-3.5 h-3.5" />
                              Top-up Balance
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleViewDetail(api.id) }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                            >
                              Check Details
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Empty State for My APIs */}
                    {displayedApis.length === 0 && (
                      <div className="text-center py-16">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                          <Key className="w-6 h-6 text-stone-400 dark:text-stone-500" />
                        </div>
                        <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-1">
                          No APIs subscribed yet
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                          Browse the catalogue and contact us for pricing to get started.
                        </p>
                        <button
                          onClick={() => setActiveTab('all')}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                          Browse All APIs
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        apiName={contactApi?.name || ''}
        isOpen={contactApiId !== null}
        onClose={() => setContactApiId(null)}
        onSubmit={(message) => {
          console.log('Contact enquiry for:', contactApiId, message)
        }}
      />

      {/* Top-up Modal */}
      <TopUpModal
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        onSubmit={(amount) => {
          console.log('Top-up amount:', amount)
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Detail Content — renders inside the main content area (sidebar stays)
   ───────────────────────────────────────────────────────────────────────────── */

function ApiDetailContent({
  api,
  detailTab,
  onDetailTabChange,
  onBack,
  onContactPricing,
  onTopUp,
  showTabs = true,
}: {
  api: Api
  detailTab: DetailTab
  onDetailTabChange: (tab: DetailTab) => void
  onBack: () => void
  onContactPricing: () => void
  onTopUp: () => void
  showTabs?: boolean
}) {
  const isMyApi = MY_API_IDS.includes(api.id)

  return (
    <>
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to catalogue
      </button>

      {/* Header — full width, outside the card */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                {api.name}
              </h1>
              {isMyApi && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  Active
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-2xl">
              {api.fullDescription}
            </p>
          </div>
          {isMyApi && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <Wallet className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                <span className="text-xs text-stone-500 dark:text-stone-400">Balance:</span>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-50 tabular-nums">1,753</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">credits</span>
              </div>
              <button
                onClick={onTopUp}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5" />
                Top-up Balance
              </button>
            </div>
          )}
        </div>
      </div>

      {/* How it Works Flow */}
      <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm dark:shadow-stone-950/20 p-5 sm:p-6 mb-5">
        <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-5">How it Works</h3>
        <div className="flex items-start">
          {(HOW_IT_WORKS[api.id] || DEFAULT_FLOW).map((item, i, arr) => (
            <div key={i} className="flex items-start flex-1 min-w-0">
              <div className="flex flex-col items-center text-center flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-2.5 flex-shrink-0">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{i + 1}</span>
                </div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-0.5">{item.step}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug px-1">{item.desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="flex-shrink-0 mt-3 px-1">
                  <ChevronRight className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Credits table + Contact button — only for All APIs (no tabs) */}
      {!showTabs && (
        <>
          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm dark:shadow-stone-950/20 overflow-hidden mb-5">
            <CreditsTab />
          </div>
          <button
            onClick={onContactPricing}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <Mail className="w-4 h-4" />
            Contact for Pricing
          </button>
        </>
      )}

      {/* White card with tabs + content — only for My APIs */}
      {showTabs && (
        <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm dark:shadow-stone-950/20 overflow-hidden">
          {/* Detail Tabs */}
          <div className="flex items-center gap-1 px-6 border-b border-stone-100 dark:border-stone-800">
            {DETAIL_TABS.map((tab) => {
              const TabIcon = tab.icon
              const isActive = detailTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onDetailTabChange(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {detailTab === 'credits' && <CreditsTab />}
            {detailTab === 'usage' && <UsageTab />}
            {detailTab === 'logs' && <LogsTab />}
          </div>
        </div>
      )}
    </>
  )
}

/* ── Credits per Hit Tab ─────────────────────────────────────────────────── */

function CreditsTab() {
  return (
    <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Credit Consumption per Endpoint
        </p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-stone-100 dark:border-stone-800">
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Endpoint</th>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Method</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Credits</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
          {CREDITS_DATA.map((row, idx) => (
            <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
              <td className="px-5 py-3.5 text-sm text-stone-700 dark:text-stone-300">{row.endpoint}</td>
              <td className="px-5 py-3.5">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  row.method === 'GET' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : row.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                }`}>
                  {row.method}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-50 tabular-nums">
                  {row.credits === 0 ? 'Free' : row.credits}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Usage Tab ───────────────────────────────────────────────────────────── */

function UsageTab() {
  const { currentMonth, daily } = USAGE_DATA
  const maxHits = Math.max(...daily.map((d) => d.hits))

  return (
    <div className="space-y-5">
      {/* Current Month Summary */}
      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">Usage</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 tabular-nums">
            <span className="font-semibold text-stone-900 dark:text-stone-50">{currentMonth.used.toLocaleString()}</span>
            {' / '}
            {currentMonth.limit.toLocaleString()} hits
          </p>
        </div>
        <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${currentMonth.percentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-stone-400 dark:text-stone-500">{currentMonth.percentage}% of credits used</p>
      </div>

      {/* Daily Bar Chart */}
      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 p-5">
        <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-5">Last 7 Days</p>
        <div className="flex items-end gap-3 h-40">
          {daily.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 tabular-nums">
                {d.hits}
              </span>
              <div
                className="w-full rounded-t-md bg-emerald-500 dark:bg-emerald-600 transition-all duration-300"
                style={{ height: `${(d.hits / maxHits) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Logs Tab ────────────────────────────────────────────────────────────── */

function LogsTab() {
  return (
    <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Recent API Calls
        </p>
        <span className="text-xs text-stone-400 dark:text-stone-500">{LOGS_DATA.length} entries</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-stone-100 dark:border-stone-800">
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Timestamp</th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Method</th>
              <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Endpoint</th>
              <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {LOGS_DATA.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-5 py-3 text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      log.method === 'GET' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                        : log.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-stone-700 dark:text-stone-300 font-mono truncate max-w-[280px]">
                    {log.endpoint}
                  </td>
                  <td className="px-5 py-3 text-right text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono">
                    {log.latency}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
