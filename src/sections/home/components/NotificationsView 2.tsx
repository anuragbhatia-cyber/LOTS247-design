import { ArrowLeft, AlertTriangle, FileWarning, ShieldCheck, CreditCard } from 'lucide-react'

export interface Notification {
  id: string
  type: 'incident' | 'challan' | 'compliance' | 'subscription'
  title: string
  message: string
  time: string
  read: boolean
}

export const ALL_NOTIFICATIONS: Notification[] = [
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
    message: 'Your Fleet plan renews on 1 Mar 2026. Ensure your payment details are up to date.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n5',
    type: 'challan',
    title: 'Challan resolved',
    message: 'Challan for vehicle UP32RR5557 was resolved by Adv. Rohan Mehta.',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'n6',
    type: 'compliance',
    title: 'PUC certificate expired',
    message: 'Vehicle UP32MM1113 PUC certificate expired on 14 Feb 2026. Renew immediately.',
    time: '4 days ago',
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

interface NotificationsViewProps {
  onBack: () => void
}

export function NotificationsView({ onBack }: NotificationsViewProps) {
  const unread = ALL_NOTIFICATIONS.filter((n) => !n.read)
  const earlier = ALL_NOTIFICATIONS.filter((n) => n.read)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Notifications
            </h1>
            {unread.length > 0 && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                {unread.length} unread
              </p>
            )}
          </div>
        </div>

        {/* Unread section */}
        {unread.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3 px-1">
              New
            </h2>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
              {unread.map((notif) => (
                <NotifRow key={notif.id} notif={notif} />
              ))}
            </div>
          </section>
        )}

        {/* Earlier section */}
        {earlier.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3 px-1">
              Earlier
            </h2>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
              {earlier.map((notif) => (
                <NotifRow key={notif.id} notif={notif} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

function NotifRow({ notif }: { notif: Notification }) {
  const { icon: Icon, style } = NOTIF_CONFIG[notif.type]
  return (
    <div className={`flex gap-4 px-5 py-4 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors ${!notif.read ? 'bg-stone-50/80 dark:bg-stone-800/20' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${style}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-0.5">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 leading-snug">
            {notif.title}
          </p>
          <span className="flex-shrink-0 text-xs text-stone-400 dark:text-stone-500 mt-0.5 whitespace-nowrap">
            {notif.time}
          </span>
        </div>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          {notif.message}
        </p>
      </div>
      {!notif.read && (
        <span className="flex-shrink-0 w-2 h-2 mt-2 bg-emerald-500 rounded-full" />
      )}
    </div>
  )
}
