import { useState } from 'react'
import { ArrowRight, ArrowLeft, Mail, BookOpen, Key, Wallet, type LucideIcon } from 'lucide-react'
import type { ApiCatalogueProps } from '../types'
import { ContactModal } from './ContactModal'
import { TopUpModal } from './TopUpModal'
import { WalletTab, BulkRequestTab, ApiTokenTab, LogTab, DocumentationTab, TABS, type TabId } from './ApiDetail'

type SidebarTab = 'all' | 'my'

const SIDEBAR_ITEMS: { id: SidebarTab; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'All APIs', icon: BookOpen },
  { id: 'my', label: 'My APIs', icon: Key },
]

// Simulated "my APIs" — subset the user has subscribed to
const MY_API_IDS = ['api-001']

// Simulated credit balance for the subscribed API
const CREDIT_BALANCE = 1753

function CreditBalancePill() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
      <Wallet className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
      <span className="text-xs font-bold text-stone-900 dark:text-stone-50 tabular-nums">{CREDIT_BALANCE.toLocaleString()}</span>
      <span className="text-[11px] text-stone-500 dark:text-stone-400">credits</span>
    </div>
  )
}

export function ApiCatalogue({ apis, onContactPricing }: ApiCatalogueProps & { onContactPricing?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('all')
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null)
  const [detailTab, setDetailTab] = useState<TabId>('wallet')
  const [contactApiId, setContactApiId] = useState<string | null>(null)
  const [showTopUp, setShowTopUp] = useState(false)

  const selectedApi = apis.find((a) => a.id === selectedApiId) || null
  const contactApi = apis.find((a) => a.id === contactApiId)

  const displayedApis = activeTab === 'my'
    ? apis.filter((a) => MY_API_IDS.includes(a.id))
    : apis

  function handleViewDetail(id: string) {
    setSelectedApiId(id)
    setDetailTab('wallet')
  }

  function handleBack() {
    setSelectedApiId(null)
  }

  function handleSidebarTab(id: SidebarTab) {
    setActiveTab(id)
    setSelectedApiId(null)
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      {/* Header — full width above sidebar */}
      <div className="px-5 sm:px-6 lg:px-8 pt-5 sm:pt-7 lg:pt-8 pb-4 sm:pb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
          {activeTab === 'all' ? 'API Catalogue' : 'My APIs'}
        </h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {activeTab === 'all'
            ? 'Browse available APIs to integrate vehicle compliance, challan, and licence data into your systems.'
            : 'APIs you have subscribed to and are currently using.'}
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 lg:w-72 shrink-0 hidden md:block px-5 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-8 pt-0">
          <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 space-y-1 sticky top-6">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              const count = item.id === 'all' ? apis.length : apis.filter((a) => MY_API_IDS.includes(a.id)).length
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarTab(item.id)}
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
        <div className="flex-1 min-w-0 pr-5 sm:pr-6 lg:pr-8 pb-5 sm:pb-6 lg:pb-8 pt-0">
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
                    onClick={() => handleSidebarTab(item.id)}
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

          {/* ─── Detail View ─────────────────────────────────────────────── */}
          {selectedApi ? (
            <div>
              {/* API Header Card */}
              <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm dark:shadow-stone-950/20 p-5 mb-5">
                {/* Back */}
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to catalogue
                </button>

                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                    {selectedApi.name}
                  </h2>
                  {MY_API_IDS.includes(selectedApi.id) && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                  {selectedApi.shortDescription}
                </p>
              </div>

              {/* Tabs + Content */}
              <div className="bg-white dark:bg-stone-900 rounded-xl shadow-sm dark:shadow-stone-950/20 overflow-hidden">
                {/* Horizontal Tabs */}
                <div className="flex items-center gap-1 px-5 border-b border-stone-200 dark:border-stone-800 overflow-x-auto">
                  {TABS.map((tab) => {
                    const TabIcon = tab.icon
                    const isActive = detailTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDetailTab(tab.id)}
                        className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
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
                <div className="p-5">
                  {detailTab === 'wallet' && <WalletTab />}
                  {detailTab === 'bulk' && <BulkRequestTab />}
                  {detailTab === 'token' && <ApiTokenTab />}
                  {detailTab === 'log' && <LogTab />}
                  {detailTab === 'docs' && <DocumentationTab api={selectedApi} />}
                </div>
              </div>
            </div>

          ) : (
            <>
              {/* ─── All APIs tab ──────────────────────────────────────────── */}
              {activeTab === 'all' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apis.map((api) => {
                    const isMyApi = MY_API_IDS.includes(api.id)
                    return (
                      <div
                        key={api.id}
                        onClick={() => handleViewDetail(api.id)}
                        className="group bg-white dark:bg-stone-900 rounded-xl border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 p-5 transition-all duration-200 hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40 flex flex-col cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">{api.name}</h3>
                            {isMyApi && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Active</span>
                            )}
                          </div>
                          {isMyApi && <CreditBalancePill />}
                        </div>
                        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-4 flex-1">{api.shortDescription}</p>
                        <div className="flex items-center gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
                          {isMyApi ? (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); setShowTopUp(true) }}
                                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                              >
                                <Wallet className="w-3.5 h-3.5" />
                                Top-up Balance
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleViewDetail(api.id) }}
                                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                              >
                                Check Details
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleViewDetail(api.id) }}
                                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                              >
                                Check Details
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setContactApiId(api.id) }}
                                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                Contact for Pricing
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <>
                  {/* ─── My APIs tab ─────────────────────────────────────────── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedApis.map((api) => (
                      <div
                        key={api.id}
                        onClick={() => handleViewDetail(api.id)}
                        className="group bg-white dark:bg-stone-900 rounded-xl border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 p-5 transition-all duration-200 hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-950/40 flex flex-col cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-tight">{api.name}</h3>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Active</span>
                          </div>
                          <CreditBalancePill />
                        </div>
                        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-4 flex-1">{api.shortDescription}</p>
                        <div className="flex items-center gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowTopUp(true) }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                          >
                            <Wallet className="w-3.5 h-3.5" />
                            Top-up Balance
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleViewDetail(api.id) }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
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
                        onClick={() => handleSidebarTab('all')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
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
