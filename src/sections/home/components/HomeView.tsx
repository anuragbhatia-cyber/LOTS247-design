import { useState, useRef, useEffect, useMemo } from 'react'
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
    checkChallan: 'Check Vehicle Challans',
    checkChallanDesc: 'Look up pending traffic challans',
    checkRto: 'Check Vehicle-wise Compliance',
    checkRtoDesc: 'View compliance status by vehicle',
    totalVehicles: 'Total Vehicles',
    totalDrivers: 'Total Drivers',
    pendingChallans: 'Pending Challans',
    pendingCases: 'Pending Cases',
    noVehicles: 'No vehicles registered',
    planSlotsUsed: 'plan slots used',
    noDrivers: 'No drivers assigned',
    currentlyAssigned: 'Currently assigned',
    noChallans: 'No pending challans',
    outstanding: 'pending',
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
    checkChallan: 'वाहन चालान जाँचें',
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
    id: 'vehicle',
    label: 'Add Vehicle',
    description: 'Register a new vehicle to your fleet',
    image: '/icon-add-vehicle.png',
  },
  {
    id: 'incident',
    label: 'Add Incident',
    description: 'Report an accident or legal issue',
    image: '/icon-add-incident.png',
  },
  {
    id: 'challan',
    label: 'Check Vehicle Challans',
    description: 'Look up pending traffic challans',
    image: '/icon-check-challan.png',
  },
  {
    id: 'rto',
    label: 'Check Vehicle-wise Compliance',
    description: 'View compliance status by vehicle',
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

  // Inject shimmer keyframe into the document
  useEffect(() => {
    const id = 'badge-shimmer-style'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = '@keyframes badge-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}'
      document.head.appendChild(style)
    }
  }, [])

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
    rto: () => window.parent.postMessage({ type: 'openComplianceCheck' }, '*'),
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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            <span className="text-stone-500 dark:text-stone-400 font-normal">{getGreeting(t)}, </span>
            {subscriber.name}
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto sm:flex-shrink-0">
            {alerts.length > 0 && (
              <button
                onClick={() => setView('alerts')}
                className="flex sm:inline-flex w-full sm:w-auto items-center gap-0 rounded-full text-xs font-semibold overflow-hidden border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-colors"
              >
                <span className="relative flex-1 sm:flex-initial px-2.5 py-1.5 sm:py-1 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 overflow-hidden">
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'badge-shimmer 2.5s ease-in-out infinite',
                    }}
                  />
                  {alerts.length} Pending Alerts
                </span>
                <span className="px-2.5 py-1.5 sm:py-1 bg-white dark:bg-stone-900 text-red-600 dark:text-red-400 border-l border-red-200 dark:border-red-800 flex-shrink-0">
                  View &rarr;
                </span>
              </button>
            )}
          </div>{/* end right side actions */}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={() => quickActionCallbacks[action.id]?.()}
                className="group flex flex-row items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-6 rounded-2xl bg-white dark:bg-stone-900 border border-transparent hover:border-emerald-500 shadow-sm dark:shadow-stone-950/20 hover:shadow-md transition-all duration-200 text-left"
              >
                <img src={action.image} alt="" className="w-11 h-11 sm:w-20 sm:h-20 flex-shrink-0 object-contain" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-50 leading-snug">{qaTranslations[action.id]?.label ?? action.label}</p>
                  <p className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 leading-snug mt-0.5">{qaTranslations[action.id]?.description ?? action.description}</p>
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
