import { useState, useRef, useEffect } from 'react'
import { Menu, X, Plus, AlertTriangle, PlusCircle, Phone, UserPlus, Bell, ChevronDown, User, LogOut, FileWarning, ShieldCheck, CreditCard } from 'lucide-react'
import { MainNav } from './MainNav'
import { NotificationsView } from '@/sections/home/components/NotificationsView'
import { AddVehicleModal } from '@/sections/vehicle-and-driver-management/components/AddVehicleModal'
import { AddDriverModal } from '@/sections/vehicle-and-driver-management/components/AddDriverModal'

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

export function AppShell({
  children,
  navigationItems,
  secondaryItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [showAddDriver, setShowAddDriver] = useState(false)
  const quickActionsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

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
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-stone-900 border-b border-stone-800 flex items-center px-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -ml-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="ml-3">
          <img src="/lots247-logo-white.png" alt="LOTS247" className="h-10 w-auto object-contain" />
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-stone-900 border-r border-stone-800
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo & Collapse Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-stone-800">
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
            className="lg:hidden p-1.5 text-stone-500 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1 overflow-y-auto py-5">

            {/* Quick Actions Button */}
            <div ref={quickActionsRef} className="relative px-3 mb-5">
              <button
                onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2 rounded-lg
                  bg-stone-800 hover:bg-stone-700/80 border border-stone-700/50
                  text-stone-300 font-medium text-sm
                  transition-all duration-150
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
                title={isCollapsed ? 'Quick Actions' : undefined}
              >
                <Plus className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${quickActionsOpen ? 'rotate-45' : ''}`} />
                {!isCollapsed && <span>Quick Actions</span>}
              </button>

              {/* Flyout Panel */}
              {quickActionsOpen && (
                <div
                  className={`
                    fixed top-14 z-[200] w-64
                    bg-stone-900 border border-stone-700 rounded-xl
                    shadow-2xl shadow-black/40 overflow-hidden
                    ${isCollapsed ? 'left-[4.5rem]' : 'left-[15.5rem]'}
                  `}
                >
                  <div className="px-4 py-3 border-b border-stone-700">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Quick Actions</p>
                  </div>
                  <div className="p-2">
                    {QUICK_ACTIONS.map((action) => {
                      const Icon = action.icon
                      return (
                        <button
                          key={action.id}
                          onClick={() => {
                            setQuickActionsOpen(false)
                            if (action.id === 'vehicle') setShowAddVehicle(true)
                            if (action.id === 'driver') setShowAddDriver(true)
                          }}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                            text-left transition-colors duration-150
                            ${action.hoverBg}
                          `}
                        >
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${action.bg}`}>
                            <Icon className={`w-3.5 h-3.5 ${action.color}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-stone-100 leading-snug">{action.label}</p>
                            <p className="text-xs text-stone-400 leading-snug mt-0.5">{action.description}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

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
                <div className={`my-4 border-t border-stone-800/60 ${isCollapsed ? 'mx-2' : 'mx-4'}`} />
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
          <div className="hidden lg:block px-3 py-3 border-t border-stone-800/60">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`
                w-full flex items-center gap-2 px-2 py-2 text-sm text-stone-400
                hover:text-stone-200 hover:bg-stone-800
                rounded-lg transition-colors
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <svg
                className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!isCollapsed && <span>Collapse</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          pt-16 lg:pt-16
          ${isCollapsed ? 'lg:pl-16' : 'lg:pl-60'}
        `}
      >
        {/* Top bar — matches sidebar logo header height */}
        <div
          className="hidden lg:flex fixed top-0 right-0 h-16 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 z-40 items-center justify-end px-6 gap-4"
          style={{ left: isCollapsed ? '4rem' : '15rem' }}
        >
          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen)
                setProfileOpen(false)
              }}
              className="relative p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
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
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                      {unreadCount} new
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
                            <span className="flex-shrink-0 text-xs text-stone-400 dark:text-stone-500 mt-0.5">{notif.time}</span>
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
                    View all notifications →
                  </button>
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
                }}
                className="flex items-center gap-3 pl-1 pr-2 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-white">
                      {user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden">
                  <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 truncate">{user.name}</p>
                    {user.plan && (
                      <span className="inline-flex items-center mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                        {user.plan} Plan
                      </span>
                    )}
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      My Profile
                    </button>
                    <div className="my-1 mx-3 border-t border-stone-100 dark:border-stone-800" />
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        onLogout?.()
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="min-h-screen">
          {showNotifications ? (
            <NotificationsView onBack={() => setShowNotifications(false)} />
          ) : (
            children
          )}
        </div>
      </main>

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
    </div>
  )
}
