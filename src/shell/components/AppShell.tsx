import { useState, useRef, useEffect } from 'react'
import { Menu, X, Plus, AlertTriangle, PlusCircle, Phone, UserPlus, Bell, ChevronDown, User, LogOut, FileWarning, ShieldCheck, CreditCard, Languages, Check, HelpCircle, Send, CheckCircle2, Settings } from 'lucide-react'
import { MainNav } from './MainNav'
import { useLanguage, type Language } from './LanguageContext'
import { NotificationsView } from '@/sections/home/components/NotificationsView'
import { AddVehicleModal } from '@/sections/vehicle-and-driver-management/components/AddVehicleModal'
import { AddDriverModal } from '@/sections/vehicle-and-driver-management/components/AddDriverModal'
import { CheckChallanModal } from '@/sections/home/components/CheckChallanModal'
import { AddIncidentModal } from '@/sections/home/components/AddIncidentModal'
import { BulkUploadModal } from '@/sections/vehicle-and-driver-management/components/BulkUploadModal'
import { ChallanResultsView } from '@/sections/home/components/ChallanResultsView'
import { VehicleComplianceResultsView } from '@/sections/home/components/VehicleComplianceResultsView'

interface Notification {
  id: string
  type: 'incident' | 'challan' | 'compliance' | 'subscription'
  title: string
  message: string
  time: string
  read: boolean
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'incident',
    title: 'New incident assigned',
    message: 'Incident #IRN-10089 has been assigned to Adv. Priya Sharma.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'challan',
    title: 'Challan payment due',
    message: 'Vehicle UP32MM1113 has a challan of ₹1,500 due in 3 days.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'compliance',
    title: 'Insurance expiring soon',
    message: 'Vehicle UP32NN2224 insurance expires in 14 days. Renew now.',
    time: '3 hrs ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'subscription',
    title: 'Subscription renewal reminder',
    message: 'Your Fleet plan renews on 1 Mar 2026. Ensure your payment is updated.',
    time: '1 day ago',
    read: true,
  },
]

const NOTIF_CONFIG: Record<string, { icon: typeof AlertTriangle; style: string }> = {
  incident: { icon: AlertTriangle, style: 'text-red-500 bg-red-50 dark:bg-red-950/50' },
  challan: { icon: FileWarning, style: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' },
  compliance: { icon: ShieldCheck, style: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' },
  subscription: { icon: CreditCard, style: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' },
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    quickActions: 'Quick Actions',
    addIncident: 'Add Incident',
    addIncidentDesc: 'Report an accident or legal issue',
    addVehicle: 'Add Vehicle',
    addVehicleDesc: 'Register a new vehicle to your fleet',
    callLawyer: 'Call a Lawyer',
    callLawyerDesc: '24/7 on-call legal support',
    addDriver: 'Add Driver',
    addDriverDesc: 'Add a driver and assign to a vehicle',
    notifications: 'Notifications',
    new: 'new',
    viewAll: 'View all notifications →',
    myProfile: 'My Profile',
    settings: 'Settings',
    plan: 'Plan',
    logout: 'Logout',
    collapse: 'Collapse',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    supportTitle: 'Raise a Support Ticket',
    supportTicketSubmitted: 'Ticket Submitted',
    supportTicketSuccess: 'Our team will reach out to you within a few hours. Thank you for your patience.',
    supportSubscriberId: 'Subscriber ID',
    supportSubscriberPlaceholder: 'e.g. SUB-10234',
    supportYourName: 'Your Name',
    supportNamePlaceholder: 'Enter your full name',
    supportMessage: 'Message',
    supportMessagePlaceholder: 'Describe your issue or question...',
    supportInfoMessage: 'Our team will reach out to you within a few hours after you submit this ticket.',
    supportCancel: 'Cancel',
    supportSubmit: 'Submit Ticket',
    supportDone: 'Done',
    help: 'Help',
  },
  hi: {
    quickActions: 'त्वरित कार्य',
    addIncident: 'घटना जोड़ें',
    addIncidentDesc: 'दुर्घटना या कानूनी मुद्दे की रिपोर्ट करें',
    addVehicle: 'वाहन जोड़ें',
    addVehicleDesc: 'अपने बेड़े में नया वाहन पंजीकृत करें',
    callLawyer: 'वकील से बात करें',
    callLawyerDesc: '24/7 कानूनी सहायता उपलब्ध',
    addDriver: 'ड्राइवर जोड़ें',
    addDriverDesc: 'ड्राइवर जोड़ें और वाहन सौंपें',
    notifications: 'सूचनाएँ',
    new: 'नई',
    viewAll: 'सभी सूचनाएँ देखें →',
    myProfile: 'मेरी प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    plan: 'प्लान',
    logout: 'लॉग आउट',
    collapse: 'संक्षिप्त करें',
    openMenu: 'मेनू खोलें',
    closeMenu: 'मेनू बंद करें',
    supportTitle: 'सहायता टिकट बनाएं',
    supportTicketSubmitted: 'टिकट जमा किया गया',
    supportTicketSuccess: 'हमारी टीम कुछ ही घंटों में आपसे संपर्क करेगी। आपके धैर्य के लिए धन्यवाद।',
    supportSubscriberId: 'सब्सक्राइबर ID',
    supportSubscriberPlaceholder: 'जैसे SUB-10234',
    supportYourName: 'आपका नाम',
    supportNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
    supportMessage: 'संदेश',
    supportMessagePlaceholder: 'अपनी समस्या या प्रश्न का वर्णन करें...',
    supportInfoMessage: 'टिकट जमा करने के बाद हमारी टीम कुछ ही घंटों में आपसे संपर्क करेगी।',
    supportCancel: 'रद्द करें',
    supportSubmit: 'टिकट जमा करें',
    supportDone: 'ठीक है',
    help: 'सहायता',
  },
}

const QUICK_ACTION_KEYS: Record<string, { label: string; description: string }> = {
  incident: { label: 'addIncident', description: 'addIncidentDesc' },
  vehicle: { label: 'addVehicle', description: 'addVehicleDesc' },
  lawyer: { label: 'callLawyer', description: 'callLawyerDesc' },
  driver: { label: 'addDriver', description: 'addDriverDesc' },
}

export interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
  badge?: string | number
  children?: NavigationItem[]
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  secondaryItems?: NavigationItem[]
  user?: {
    name: string
    avatarUrl?: string
    plan?: 'Basic' | 'Fleet' | 'Enterprise'
  }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

const QUICK_ACTIONS = [
  {
    id: 'incident',
    label: 'Add Incident',
    description: 'Report an accident or legal issue',
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-950/50',
    hoverBg: 'hover:bg-red-950/80',
  },
  {
    id: 'vehicle',
    label: 'Add Vehicle',
    description: 'Register a new vehicle to your fleet',
    icon: PlusCircle,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    hoverBg: 'hover:bg-emerald-950/70',
  },
  {
    id: 'lawyer',
    label: 'Call a Lawyer',
    description: '24/7 on-call legal support',
    icon: Phone,
    color: 'text-blue-400',
    bg: 'bg-blue-950/40',
    hoverBg: 'hover:bg-blue-950/70',
  },
  {
    id: 'driver',
    label: 'Add Driver',
    description: 'Add a driver and assign to a vehicle',
    icon: UserPlus,
    color: 'text-amber-400',
    bg: 'bg-amber-950/40',
    hoverBg: 'hover:bg-amber-950/70',
  },
]

// ---------------------------------------------------------------------------
// Support Ticket Modal
// ---------------------------------------------------------------------------

function SupportModal({
  isOpen,
  onClose,
  t,
}: {
  isOpen: boolean
  onClose: () => void
  t: Record<string, string>
}) {
  const [subscriberId, setSubscriberId] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (subscriberId.trim() && name.trim() && message.trim()) {
      setSubmitted(true)
    }
  }

  const handleClose = () => {
    setSubscriberId('')
    setName('')
    setMessage('')
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {t.supportTitle}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1.5">
              {t.supportTicketSubmitted}
            </h4>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {t.supportTicketSuccess}
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              {t.supportDone}
            </button>
          </div>
        ) : (
          /* Form */
          <>
            <div className="p-5 space-y-4">
              {/* Subscriber ID */}
              <div>
                <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                  {t.supportSubscriberId}
                </label>
                <input
                  type="text"
                  value={subscriberId}
                  onChange={(e) => setSubscriberId(e.target.value)}
                  placeholder={t.supportSubscriberPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                  {t.supportYourName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.supportNamePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                  {t.supportMessage}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.supportMessagePlaceholder}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 resize-none transition-colors"
                />
              </div>

              {/* Info message */}
              <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <HelpCircle className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {t.supportInfoMessage}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors"
              >
                {t.supportCancel}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!subscriberId.trim() || !name.trim() || !message.trim()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white disabled:text-stone-400 dark:disabled:text-stone-500 text-sm font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                {t.supportSubmit}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function AppShell({
  children,
  navigationItems,
  secondaryItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [showAddDriver, setShowAddDriver] = useState(false)
  const [showCheckChallan, setShowCheckChallan] = useState(false)
  const [showAddIncident, setShowAddIncident] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [challanResultsVehicle, setChallanResultsVehicle] = useState<string | null>(null)
  const [complianceResultsVehicle, setComplianceResultsVehicle] = useState<string | null>(null)
  const [iframeOverlay, setIframeOverlay] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const quickActionsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  const unreadCount = DUMMY_NOTIFICATIONS.filter((n) => !n.read).length

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (quickActionsRef.current && !quickActionsRef.current.contains(e.target as Node)) {
        setQuickActionsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Listen for messages from embedded iframes (e.g. Home "Add Vehicle")
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'openAddVehicle') {
        setShowAddVehicle(true)
      }
      if (event.data?.type === 'openAddDriver') {
        setShowAddDriver(true)
      }
      if (event.data?.type === 'openCheckChallan') {
        setShowCheckChallan(true)
      }
      if (event.data?.type === 'openAddIncident') {
        setShowAddIncident(true)
      }
      if (event.data?.type === 'openComplianceResults' && event.data?.vehicleNumber) {
        setComplianceResultsVehicle(event.data.vehicleNumber)
      }
      if (event.data?.type === 'openBulkUpload') {
        setShowBulkUpload(true)
      }
      if (event.data?.type === 'openChallanResults' && event.data?.vehicleNumber) {
        setChallanResultsVehicle(event.data.vehicleNumber)
      }
      if (event.data?.type === 'showOverlay') {
        setIframeOverlay(true)
      }
      if (event.data?.type === 'hideOverlay') {
        setIframeOverlay(false)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="h-screen overflow-hidden bg-stone-50 dark:bg-stone-950">
      {/* Mobile Header — hidden when sidebar is open to avoid double logo (#14) */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-stone-900 border-b border-stone-800 flex items-center justify-between px-4 transition-opacity duration-200 ${isMobileOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-3 -ml-3 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            aria-label={t.openMenu}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-3">
            <img src="/lots247-logo-white.png" alt="LOTS247" className="h-10 w-auto object-contain" />
          </div>
        </div>
        {/* Mobile Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-11 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <Languages className="w-4 h-4" />
          <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[45] bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar — z-50 on mobile to sit above overlay (#13) */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-stone-900
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0 z-50' : '-translate-x-full lg:translate-x-0 z-40'}
        `}
      >
        {/* Logo & Collapse Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-stone-800/50">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
            {isCollapsed ? (
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-black">L</span>
              </div>
            ) : (
              <img src="/lots247-logo-white.png" alt="LOTS247" className="h-10 w-auto object-contain" />
            )}
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-3.5 text-stone-500 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            aria-label={t.closeMenu}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1 overflow-y-auto py-5">

            <MainNav
              items={navigationItems}
              isCollapsed={isCollapsed}
              onNavigate={(href) => {
                onNavigate?.(href)
                setIsMobileOpen(false)
              }}
            />

            {secondaryItems && secondaryItems.length > 0 && (
              <>
                <div className={`my-4 border-t border-stone-800/50 ${isCollapsed ? 'mx-2' : 'mx-4'}`} />
                <MainNav
                  items={secondaryItems}
                  isCollapsed={isCollapsed}
                  onNavigate={(href) => {
                    onNavigate?.(href)
                    setIsMobileOpen(false)
                  }}
                />
              </>
            )}
          </div>

          {/* Collapse Toggle (Desktop) */}
          <div className="hidden lg:block px-3 py-3 border-t border-stone-800/50">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isCollapsed}
              className={`
                w-full flex items-center gap-2 px-2 py-2 text-sm text-stone-400
                hover:text-stone-200 hover:bg-stone-800
                rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!isCollapsed && <span>{t.collapse}</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
          transition-[padding] duration-300 ease-in-out
          pt-16 lg:pt-16 h-screen overflow-y-auto
          ${isCollapsed ? 'lg:pl-16' : 'lg:pl-60'}
        `}
      >
        {/* Top bar — matches sidebar logo header height */}
        <div
          className="hidden lg:flex fixed top-0 right-0 h-16 bg-white dark:bg-stone-950 z-40 items-center justify-end px-6 gap-4 border-b border-stone-200 dark:border-stone-800"
          style={{ left: isCollapsed ? '4rem' : '15rem' }}
        >
          {/* Help */}
          <button
            onClick={() => setShowSupport(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-11 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">{t.help}</span>
          </button>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen)
                setProfileOpen(false)
                setLangOpen(false)
              }}
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
              aria-expanded={notifOpen}
              className="relative p-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-stone-950" />
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">{t.notifications}</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                      {unreadCount} {t.new}
                    </span>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
                  {DUMMY_NOTIFICATIONS.map((notif) => {
                    const { icon: Icon, style } = NOTIF_CONFIG[notif.type]
                    return (
                      <div
                        key={notif.id}
                        className={`
                          px-5 py-4 flex gap-3.5 cursor-pointer
                          hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors
                          ${!notif.read ? 'bg-stone-50/80 dark:bg-stone-800/20' : ''}
                        `}
                      >
                        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${style}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-0.5">
                            <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 leading-snug">{notif.title}</p>
                            <span className="flex-shrink-0 text-xs text-stone-500 dark:text-stone-400 mt-0.5">{notif.time}</span>
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{notif.message}</p>
                        </div>
                        {!notif.read && (
                          <span className="flex-shrink-0 w-2 h-2 mt-1.5 bg-emerald-500 rounded-full" />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="px-5 py-3.5 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => {
                      setNotifOpen(false)
                      setShowNotifications(true)
                    }}
                    className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {t.viewAll}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => {
                setLangOpen(!langOpen)
                setNotifOpen(false)
                setProfileOpen(false)
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-11 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors text-sm font-medium"
            >
              <span className="text-xs font-medium">{language === 'en' ? 'English' : 'हिन्दी'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden">
                <div className="py-1">
                  {([['en', 'English'], ['hi', 'हिन्दी']] as const).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code)
                        setLangOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 min-h-11 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <span className={language === code ? 'font-semibold' : ''}>{label}</span>
                      {language === code && <Check className="w-4 h-4 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-8 bg-stone-200 dark:bg-stone-800" />

          {/* User Profile */}
          {user && (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen)
                  setNotifOpen(false)
                  setLangOpen(false)
                }}
                aria-label="User menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-3 pl-1 pr-2 py-1.5 min-h-11 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      {user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                )}
                <span className="text-sm font-bold text-stone-900 dark:text-stone-50">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden">
                  <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 truncate">{user.name}</p>
                    {user.plan && (
                      <span className="inline-flex items-center mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                        {user.plan} {t.plan}
                      </span>
                    )}
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        onNavigate?.('/profile')
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 min-h-11 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      {t.myProfile}
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        onNavigate?.('/settings')
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 min-h-11 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-stone-400" />
                      {t.settings}
                    </button>
                    <div className="my-1 mx-3 border-t border-stone-100 dark:border-stone-800" />
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        onLogout?.()
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 min-h-11 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {showNotifications ? (
            <NotificationsView onBack={() => setShowNotifications(false)} />
          ) : challanResultsVehicle ? (
            <ChallanResultsView
              vehicleNumber={challanResultsVehicle}
              onBack={() => setChallanResultsVehicle(null)}
            />
          ) : complianceResultsVehicle ? (
            <VehicleComplianceResultsView
              vehicleNumber={complianceResultsVehicle}
              onBack={() => setComplianceResultsVehicle(null)}
            />
          ) : (
            children
          )}
        </div>
      </main>

      {/* Iframe overlay — shown when an embedded section opens a modal */}
      {iframeOverlay && (
        <div className="fixed inset-0 z-[90] bg-black/50 dark:bg-black/70 pointer-events-none" />
      )}

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={showAddVehicle}
        onClose={() => setShowAddVehicle(false)}
      />

      {/* Add Driver Modal */}
      <AddDriverModal
        isOpen={showAddDriver}
        onClose={() => setShowAddDriver(false)}
      />

      {/* Check Challan Modal */}
      <CheckChallanModal
        isOpen={showCheckChallan}
        onClose={() => setShowCheckChallan(false)}
        onShowResults={(vn) => setChallanResultsVehicle(vn)}
      />

      {/* Add Incident Modal */}
      <AddIncidentModal
        isOpen={showAddIncident}
        onClose={() => setShowAddIncident(false)}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
      />

      {/* Support Ticket Modal */}
      <SupportModal
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
        t={t}
      />
    </div>
  )
}
