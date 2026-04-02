import { useState, useRef, useEffect } from 'react'
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  AlertTriangle,
  FileWarning,
  ShieldCheck,
  CreditCard,
} from 'lucide-react'
import type { Subscriber, Subscription } from '../types'
// TODO: Replace with your app's language/i18n context
// import { useLanguage, type Language } from '@/shell/components/LanguageContext'
type Language = 'en' | 'hi'
const useLanguage = () => ({ language: 'en' as Language })

const headerTranslations: Record<Language, Record<string, string>> = {
  en: {
    notifications: 'Notifications',
    new: 'new',
    viewAllNotifications: 'View all notifications',
    myProfile: 'My Profile',
    plan: 'Plan',
    logout: 'Logout',
  },
  hi: {
    notifications: 'सूचनाएँ',
    new: 'नई',
    viewAllNotifications: 'सभी सूचनाएँ देखें',
    myProfile: 'मेरी प्रोफ़ाइल',
    plan: 'प्लान',
    logout: 'लॉगआउट',
  },
}

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

const NOTIF_CONFIG = {
  incident: {
    icon: AlertTriangle,
    style: 'text-red-500 bg-red-50 dark:bg-red-950/50',
  },
  challan: {
    icon: FileWarning,
    style: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
  },
  compliance: {
    icon: ShieldCheck,
    style: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
  },
  subscription: {
    icon: CreditCard,
    style: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
  },
}

interface TopHeaderProps {
  subscriber: Subscriber
  subscription: Subscription
  onViewProfile?: () => void
  onLogout?: () => void
  onViewAllNotifications?: () => void
}

export function TopHeader({
  subscriber,
  subscription,
  onViewProfile,
  onLogout,
  onViewAllNotifications,
}: TopHeaderProps) {
  const { language } = useLanguage()
  const t = headerTranslations[language]
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = DUMMY_NOTIFICATIONS.filter((n) => !n.read).length

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
      <div className="px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-end gap-1">

        {/* Right side actions */}
        <div className="flex items-center gap-0.5 sm:gap-1">

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen)
              setProfileOpen(false)
            }}
            className="relative p-3.5 sm:p-3 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-stone-950" />
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                  {t.notifications}
                </h3>
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
                          <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 leading-snug">
                            {notif.title}
                          </p>
                          <span className="flex-shrink-0 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                          {notif.message}
                        </p>
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
                    onViewAllNotifications?.()
                  }}
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors min-h-11 inline-flex items-center"
                >
                  {t.viewAllNotifications} →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Button */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotifOpen(false)
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 min-h-11 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">{subscriber.avatarInitials}</span>
            </div>
            <span className="hidden sm:block text-xs lg:text-sm font-medium text-stone-700 dark:text-stone-300">
              {subscriber.name}
            </span>
            <ChevronDown
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400 transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden">
              {/* Subscriber info */}
              <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 truncate">
                  {subscriber.name}
                </p>
                <span className="inline-flex items-center mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                  {subscription.planName} {t.plan}
                </span>
              </div>

              {/* Actions */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileOpen(false)
                    onViewProfile?.()
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 min-h-11 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <User className="w-4 h-4 text-stone-400" />
                  {t.myProfile}
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

        </div>{/* end right side actions */}
      </div>
    </header>
  )
}
