import { FileWarning, Clock, Shield, ArrowRight } from 'lucide-react'
import type { AlertItem, AlertCategory, AlertUrgency } from '@/../product/sections/home/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

interface AlertsFeedProps {
  items: AlertItem[]
  onViewAll?: () => void
  onAlertClick?: (alert: AlertItem) => void
}

const categoryLabels: Record<Language, Record<AlertCategory, string>> = {
  en: { puc: 'PUC', insurance: 'Insurance', challan: 'Challan' },
  hi: { puc: 'पीयूसी', insurance: 'बीमा', challan: 'चालान' },
}

const categoryIcons: Record<AlertCategory, typeof FileWarning> = {
  puc: Clock,
  insurance: Shield,
  challan: FileWarning,
}

const urgencyBadgeLabels: Record<Language, Record<AlertUrgency, string>> = {
  en: { critical: 'Urgent', warning: 'Expiring soon', notice: 'Upcoming' },
  hi: { critical: 'तत्काल', warning: 'जल्द समाप्त', notice: 'आगामी' },
}

const urgencyStyles: Record<AlertUrgency, {
  iconBg: string
  iconColor: string
  badge: string
}> = {
  critical: {
    iconBg: 'bg-red-50 dark:bg-red-950/40',
    iconColor: 'text-red-500',
    badge: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400',
  },
  warning: {
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-500',
    badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400',
  },
  notice: {
    iconBg: 'bg-yellow-50 dark:bg-yellow-950/40',
    iconColor: 'text-yellow-600 dark:text-yellow-500',
    badge: 'bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400',
  },
}

const feedTranslations: Record<Language, Record<string, string>> = {
  en: {
    alerts: 'Alerts',
    alert: 'alert',
    alertsPlural: 'alerts',
    vehicle: 'Vehicle',
    payNow: 'Pay Now',
    seeAllAlerts: 'See all alerts',
  },
  hi: {
    alerts: 'अलर्ट',
    alert: 'अलर्ट',
    alertsPlural: 'अलर्ट',
    vehicle: 'वाहन',
    payNow: 'भुगतान करें',
    seeAllAlerts: 'सभी अलर्ट देखें',
  },
}

export function AlertsFeed({ items, onViewAll, onAlertClick }: AlertsFeedProps) {
  const { language } = useLanguage()
  const t = feedTranslations[language]
  return (
    <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          {t.alerts}
        </h2>
        {items.length > 0 && (
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {items.length} {items.length === 1 ? t.alert : t.alertsPlural}
          </span>
        )}
      </div>

      {/* Alerts — first 4 */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800">
        {items.slice(0, 3).map((item) => {
          const Icon = categoryIcons[item.category]
          const style = urgencyStyles[item.urgency]
          return (
            <div
              key={item.id}
              onClick={() => onAlertClick?.(item)}
              className="flex items-center gap-3.5 px-5 sm:px-6 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer"
            >
              <div className={`flex-shrink-0 p-2 rounded-lg ${style.iconBg}`}>
                <Icon className={`w-4 h-4 ${style.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-snug truncate">
                  <span className="font-semibold text-stone-900 dark:text-stone-50">{item.vehicleNumber}</span>
                  <span className="text-stone-400 dark:text-stone-500 mx-1.5">·</span>
                  {item.title}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAlertClick?.(item)
                }}
                className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap"
              >
                {t.payNow}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )
        })}
      </div>

      {/* See all */}
      {items.length > 3 && (
        <button
          onClick={onViewAll}
          className="w-full px-5 sm:px-6 py-2.5 border-t border-stone-100 dark:border-stone-800 text-left text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
        >
          {t.seeAllAlerts} &rarr;
        </button>
      )}
    </div>
  )
}
