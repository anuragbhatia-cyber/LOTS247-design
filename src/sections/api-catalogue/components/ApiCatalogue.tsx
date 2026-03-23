import { useState } from 'react'
import { ShieldCheck, IdCard, Truck, ArrowRight, ArrowLeft, Mail, BookOpen, Key, IndianRupee, Zap, BarChart3, ScrollText, type LucideIcon } from 'lucide-react'
import type { ApiCatalogueProps, Api } from '@/../product/sections/api-catalogue/types'
import { ContactModal } from './ContactModal'

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

type DetailTab = 'pricing' | 'credits' | 'usage' | 'logs'

const DETAIL_TABS: { id: DetailTab; label: string; icon: LucideIcon }[] = [
  { id: 'pricing', label: 'Pricing', icon: IndianRupee },
  { id: 'credits', label: 'Credits per Hit', icon: Zap },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'logs', label: 'Logs', icon: ScrollText },
]

// Sample pricing data
const PRICING_PLANS = [
  { name: 'Starter', price: '₹2,499', hits: '5,000 hits', features: ['Basic endpoints', 'Email support', '99.5% uptime SLA'] },
  { name: 'Growth', price: '₹9,999', hits: '50,000 hits', features: ['All endpoints', 'Priority support', '99.9% uptime SLA', 'Webhooks'], popular: true },
  { name: 'Enterprise', price: 'Custom', hits: 'Unlimited', features: ['All endpoints', 'Dedicated support', '99.99% uptime SLA', 'Webhooks', 'Custom integrations'] },
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

  const selectedApi = apis.find((a) => a.id === selectedApiId) || null
  const contactApi = apis.find((a) => a.id === contactApiId)

  const displayedApis = activeTab === 'my'
    ? apis.filter((a) => MY_API_IDS.includes(a.id))
    : apis

  function handleViewDetail(id: string) {
    setSelectedApiId(id)
    setDetailTab('pricing')
  }

  function handleBack() {
    setSelectedApiId(null)
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="p-5 sm:p-6 lg:p-8">
        {/* Header — full width */}
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

        {/* Sidebar + Content */}
        <div className="flex gap-5 sm:gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
            <nav className="sticky top-6 space-y-1 bg-white dark:bg-stone-900 rounded-xl p-2.5 shadow-sm dark:shadow-stone-950/20">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id && !selectedApi
                const count = item.id === 'all' ? apis.length : apis.filter((a) => MY_API_IDS.includes(a.id)).length
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSelectedApiId(null) }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className={`text-xs tabular-nums min-w-[22px] h-[22px] flex items-center justify-center rounded-full font-semibold ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {selectedApi ? (
              <ApiDetailContent
                api={selectedApi}
                detailTab={detailTab}
                onDetailTabChange={setDetailTab}
                onBack={handleBack}
                onContactPricing={() => setContactApiId(selectedApi.id)}
              />
            ) : (
              <>
                {/* API Cards */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {displayedApis.map((api) => {
                    const Icon = ICON_MAP[api.icon] || ShieldCheck
                    const isMyApi = MY_API_IDS.includes(api.id)

                    return (
                      <div
                        key={api.id}
                        className="group bg-white dark:bg-stone-900 rounded-xl shadow-sm dark:shadow-stone-950/20 p-5 transition-all duration-200 hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40 flex flex-col"
                      >
                        {/* Icon + Name */}
                        <div className="flex items-start gap-3.5 mb-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center transition-colors group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60">
                            <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">
                                {api.name}
                              </h3>
                              {isMyApi && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                                  Active
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                          {api.shortDescription}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                          <button
                            onClick={() => handleViewDetail(api.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                          >
                            Check Details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setContactApiId(api.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Contact for Pricing
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Empty State for My APIs */}
                {displayedApis.length === 0 && activeTab === 'my' && (
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
          </div>
        </div>
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
}: {
  api: Api
  detailTab: DetailTab
  onDetailTabChange: (tab: DetailTab) => void
  onBack: () => void
  onContactPricing: () => void
}) {
  const Icon = ICON_MAP[api.icon] || ShieldCheck
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
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
          <Icon className="w-5.5 h-5.5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="min-w-0">
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
      </div>

      {/* White card with tabs + content */}
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
          {detailTab === 'pricing' && <PricingTab onContactPricing={onContactPricing} />}
          {detailTab === 'credits' && <CreditsTab />}
          {detailTab === 'usage' && <UsageTab />}
          {detailTab === 'logs' && <LogsTab />}
        </div>
      </div>
    </>
  )
}

/* ── Pricing Tab ─────────────────────────────────────────────────────────── */

function PricingTab({ onContactPricing }: { onContactPricing: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {PRICING_PLANS.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-xl p-6 flex flex-col ${
            plan.popular
              ? 'bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 dark:border-emerald-600'
              : 'bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800'
          }`}
        >
          {plan.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600 text-white">
              Popular
            </span>
          )}
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 mb-1">{plan.name}</h3>
          <div className="mb-1">
            <span className="text-2xl font-bold text-stone-900 dark:text-stone-50">{plan.price}</span>
          </div>
          <p className="text-sm text-stone-700 dark:text-stone-300 mb-5">{plan.hits}</p>
          <ul className="space-y-2.5 mb-6 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={onContactPricing}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
              plan.popular
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
            }`}
          >
            {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
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
