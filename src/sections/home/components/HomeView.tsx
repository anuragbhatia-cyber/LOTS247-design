import { useState, useRef, useEffect } from 'react'
import { Plus, AlertTriangle, PlusCircle, Calendar, ChevronDown, ChevronRight, AlertCircle, ShieldAlert, FileWarning, Search, Building2 } from 'lucide-react'
import type { HomeProps } from '@/../product/sections/home/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import { OverviewCard, type OverviewCardVariant } from './OverviewCard'
import { ComplianceScore } from './ComplianceScore'
import { AlertsFeed } from './ActivityFeed'
import { NotificationsView } from './NotificationsView'
import { AlertsView } from './ActivityView'

const homeTranslations: Record<Language, Record<string, string>> = {
  en: {
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    quickActions: 'Quick Actions',
    addIncident: 'Add Incident',
    addIncidentDesc: 'Report an accident or legal issue',
    addVehicle: 'Add Vehicle',
    addVehicleDesc: 'Register a new vehicle to your fleet',
    checkChallan: 'Check Challan',
    checkChallanDesc: 'Look up pending traffic challans',
    checkRto: 'Check RTO',
    checkRtoDesc: 'Verify vehicle registration status',
    totalVehicles: 'Total Vehicles',
    totalDrivers: 'Total Drivers',
    pendingChallans: 'Pending Challans',
    pendingCases: 'Pending Cases',
    noVehicles: 'No vehicles registered',
    planSlotsUsed: 'plan slots used',
    noDrivers: 'No drivers assigned',
    currentlyAssigned: 'Currently assigned',
    noChallans: 'No pending challans',
    outstanding: 'outstanding',
    noIncidents: 'No active incidents',
    new: 'new',
    inProgress: 'in progress',
    awaitingAction: 'awaiting action',
    expired: 'Expired',
    expiringSoon: 'Expiring Soon',
    active: 'Active',
    totalIncidents: 'Total Incidents',
    cases: 'Cases',
    challans: 'Challans',
    open: 'Open',
    closed: 'Closed',
    settled: 'Settled',
    ongoing: 'Ongoing',
    viewDetails: 'View details',
    today: 'Today',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    custom: 'Custom',
  },
  hi: {
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'नमस्कार',
    goodEvening: 'शुभ संध्या',
    quickActions: 'त्वरित कार्य',
    addIncident: 'घटना जोड़ें',
    addIncidentDesc: 'दुर्घटना या कानूनी मुद्दे की रिपोर्ट करें',
    addVehicle: 'वाहन जोड़ें',
    addVehicleDesc: 'अपने बेड़े में नया वाहन पंजीकृत करें',
    checkChallan: 'चालान जाँचें',
    checkChallanDesc: 'लंबित ट्रैफ़िक चालान खोजें',
    checkRto: 'RTO जाँचें',
    checkRtoDesc: 'वाहन पंजीकरण स्थिति सत्यापित करें',
    totalVehicles: 'कुल वाहन',
    totalDrivers: 'कुल ड्राइवर',
    pendingChallans: 'लंबित चालान',
    pendingCases: 'लंबित मामले',
    noVehicles: 'कोई वाहन पंजीकृत नहीं',
    planSlotsUsed: 'प्लान स्लॉट उपयोग में',
    noDrivers: 'कोई ड्राइवर नियुक्त नहीं',
    currentlyAssigned: 'वर्तमान में नियुक्त',
    noChallans: 'कोई लंबित चालान नहीं',
    outstanding: 'बकाया',
    noIncidents: 'कोई सक्रिय घटना नहीं',
    new: 'नई',
    inProgress: 'प्रगति में',
    awaitingAction: 'कार्रवाई हेतु',
    expired: 'समाप्त',
    expiringSoon: 'जल्द समाप्त',
    active: 'सक्रिय',
    totalIncidents: 'कुल घटनाएँ',
    cases: 'मामले',
    challans: 'चालान',
    open: 'खुले',
    closed: 'बंद',
    settled: 'निपटाए',
    ongoing: 'चालू',
    viewDetails: 'विवरण देखें',
    today: 'आज',
    last7Days: 'पिछले 7 दिन',
    last30Days: 'पिछले 30 दिन',
    thisMonth: 'इस महीने',
    custom: 'कस्टम',
  },
}

const QUICK_ACTIONS = [
  {
    id: 'incident',
    label: 'Add Incident',
    description: 'Report an accident or legal issue',
    image: '/icon-add-incident.png',
  },
  {
    id: 'vehicle',
    label: 'Add Vehicle',
    description: 'Register a new vehicle to your fleet',
    image: '/icon-add-vehicle.png',
  },
  {
    id: 'challan',
    label: 'Check Challan',
    description: 'Look up pending traffic challans',
    image: '/icon-check-challan.png',
  },
  {
    id: 'rto',
    label: 'Check RTO',
    description: 'Verify vehicle registration status',
    image: '/icon-check-rto.png',
  },
]

function getSubscriptionVariant(expiryDate: string, status: string): OverviewCardVariant {
  if (status === 'expired') return 'danger'
  if (status === 'expiring_soon') return 'warning'
  const daysRemaining = Math.ceil(
    (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  if (daysRemaining <= 7) return 'warning'
  return 'default'
}

function getSubscriptionBadge(status: string, t: Record<string, string>): string {
  if (status === 'expired') return t.expired
  if (status === 'expiring_soon') return t.expiringSoon
  return t.active
}

function getGreeting(t: Record<string, string>): string {
  const hour = new Date().getHours()
  if (hour < 12) return t.goodMorning
  if (hour < 17) return t.goodAfternoon
  return t.goodEvening
}

function formatCurrency(amount: number, currency: string): string {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`
  }
  return `${currency} ${amount.toLocaleString()}`
}

function formatExpiryDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function HomeView({
  subscriber,
  subscription,
  stats,
  complianceScore,
  alerts,
  onViewVehicles,
  onViewDrivers,
  onViewChallans,
  onViewIncidents,
  onViewSubscription,
  onAddIncident,
  onAddVehicle,
  onCallLawyer,
  onAddDriver,
  onViewProfile,
  onLogout,
}: HomeProps) {
  const { language } = useLanguage()
  const t = homeTranslations[language]
  const [view, setView] = useState<'home' | 'notifications' | 'alerts'>('home')
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('last7Days')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const quickActionsRef = useRef<HTMLDivElement>(null)
  const dateRangeRef = useRef<HTMLDivElement>(null)

  const dateRangePresets = [
    { id: 'today', label: t.today },
    { id: 'last7Days', label: t.last7Days },
    { id: 'last30Days', label: t.last30Days },
    { id: 'thisMonth', label: t.thisMonth },
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(e.target as Node)) {
        setQuickActionsOpen(false)
      }
      if (dateRangeRef.current && !dateRangeRef.current.contains(e.target as Node)) {
        setDateRangeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const quickActionCallbacks: Record<string, (() => void) | undefined> = {
    incident: () => window.parent.postMessage({ type: 'openAddIncident' }, '*'),
    vehicle: onAddVehicle,
    challan: () => window.parent.postMessage({ type: 'openCheckChallan' }, '*'),
    rto: () => console.log('Check RTO'),
  }

  const qaTranslations: Record<string, { label: string; description: string }> = {
    incident: { label: t.addIncident, description: t.addIncidentDesc },
    vehicle: { label: t.addVehicle, description: t.addVehicleDesc },
    challan: { label: t.checkChallan, description: t.checkChallanDesc },
    rto: { label: t.checkRto, description: t.checkRtoDesc },
  }

  const subscriptionVariant = getSubscriptionVariant(subscription.expiryDate, subscription.status)
  const subscriptionBadge = getSubscriptionBadge(subscription.status, t)

  const incidentSubtext =
    stats.activeIncidents.count === 0
      ? t.noIncidents
      : [
          stats.activeIncidents.breakdown.new > 0
            ? `${stats.activeIncidents.breakdown.new} ${t.new}`
            : null,
          stats.activeIncidents.breakdown.inProgress > 0
            ? `${stats.activeIncidents.breakdown.inProgress} ${t.inProgress}`
            : null,
          stats.activeIncidents.breakdown.awaitingAction > 0
            ? `${stats.activeIncidents.breakdown.awaitingAction} ${t.awaitingAction}`
            : null,
        ]
          .filter(Boolean)
          .join(' · ')

  if (view === 'alerts') {
    return (
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
        <AlertsView items={alerts} onBack={() => setView('home')} />
      </div>
    )
  }

  if (view === 'notifications') {
    return (
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
        <NotificationsView onBack={() => setView('home')} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">

      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Page header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            <span className="text-stone-500 dark:text-stone-400 font-normal">{getGreeting(t)}, </span>
            {subscriber.name}
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {/* Date Range Filter */}
          <div ref={dateRangeRef} className="relative">
            <button
              onClick={() => setDateRangeOpen(!dateRangeOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">
                {selectedRange === 'custom' && customFrom && customTo
                  ? `${new Date(customFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${new Date(customTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                  : dateRangePresets.find(p => p.id === selectedRange)?.label ?? t.custom
                }
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-150 ${dateRangeOpen ? 'rotate-180' : ''}`} />
            </button>

            {dateRangeOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden z-30">
                <div className="p-1.5">
                  {dateRangePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedRange(preset.id)
                        setDateRangeOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedRange === preset.id
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}

                  <div className="mx-2 my-1 border-t border-stone-100 dark:border-stone-800" />

                  <button
                    onClick={() => setSelectedRange('custom')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedRange === 'custom'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    {t.custom}
                  </button>

                  {selectedRange === 'custom' && (
                    <div className="px-3 pb-2 pt-1 flex flex-col gap-2">
                      <input
                        type="date"
                        value={customFrom}
                        onChange={(e) => setCustomFrom(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                      />
                      <input
                        type="date"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-300 outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                      />
                      <button
                        onClick={() => {
                          if (customFrom && customTo) setDateRangeOpen(false)
                        }}
                        disabled={!customFrom || !customTo}
                        className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
                      >
                        {t.custom === 'कस्टम' ? 'लागू करें' : 'Apply'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          </div>{/* end right side actions */}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={() => quickActionCallbacks[action.id]?.()}
                className="group flex items-start gap-3 px-4 py-5 sm:py-6 rounded-2xl bg-white dark:bg-stone-900 border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 hover:shadow-md transition-all duration-200 text-left"
              >
                <img src={action.image} alt="" className="w-20 h-20 flex-shrink-0 object-contain" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-50 leading-snug">{qaTranslations[action.id]?.label ?? action.label}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug mt-0.5">{qaTranslations[action.id]?.description ?? action.description}</p>
                </div>
              </button>
          ))}
        </div>

        {/* Compliance Health + Recent Activity */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <ComplianceScore data={complianceScore} onViewDetails={() => {
              window.parent.postMessage({ type: 'navigate', href: '/compliance' }, '*')
            }} />
            <AlertsFeed items={alerts} onViewAll={() => setView('alerts')} />
          </div>
        </section>

      </div>

    </div>
  )
}
