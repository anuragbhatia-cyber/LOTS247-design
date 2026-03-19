import { ArrowLeft, AlertTriangle, FileWarning, ShieldCheck, CreditCard } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    notifications: 'Notifications',
    unread: 'unread',
  },
  hi: {
    notifications: 'सूचनाएँ',
    unread: 'अपठित',
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

const NOTIF_CONFIG: Record<string, { icon: typeof AlertTriangle; style: string }> = {
  incident: { icon: AlertTriangle, style: 'text-red-500 bg-red-50 dark:bg-red-950/50' },
  challan: { icon: FileWarning, style: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' },
  compliance: { icon: ShieldCheck, style: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' },
  subscription: { icon: CreditCard, style: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' },
}

const ALL_NOTIFICATIONS: Notification[] = [
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

interface NotificationsViewProps {
  onBack: () => void
}

export function NotificationsView({ onBack }: NotificationsViewProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const unreadCount = ALL_NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-3 -ml-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-50">{t.notifications}</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-stone-500 dark:text-stone-400">{unreadCount} {t.unread}</p>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
        {ALL_NOTIFICATIONS.map((notif) => {
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
    </div>
  )
}
