import { FileWarning, Clock, Shield } from 'lucide-react'
import type { AlertItem, AlertCategory, AlertUrgency } from '@/../product/sections/home/types'

interface AlertsFeedProps {
  items: AlertItem[]
  onViewAll?: () => void
  onAlertClick?: (alert: AlertItem) => void
}

const categoryConfig: Record<AlertCategory, {
  icon: typeof FileWarning
  label: string
}> = {
  puc: { icon: Clock, label: 'PUC' },
  insurance: { icon: Shield, label: 'Insurance' },
  challan: { icon: FileWarning, label: 'Challan' },
}

const urgencyStyles: Record<AlertUrgency, {
  iconBg: string
  iconColor: string
  badge: string
  badgeText: string
}> = {
  critical: {
    iconBg: 'bg-red-50 dark:bg-red-950/40',
    iconColor: 'text-red-500',
    badge: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400',
    badgeText: 'Urgent',
  },
  warning: {
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-500',
    badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400',
    badgeText: 'Expiring soon',
  },
  notice: {
    iconBg: 'bg-yellow-50 dark:bg-yellow-950/40',
    iconColor: 'text-yellow-600 dark:text-yellow-500',
    badge: 'bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400',
    badgeText: 'Upcoming',
  },
}

function formatDays(days: number): string {
  if (days <= 0) return 'Expired'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

export function AlertsFeed({ items, onViewAll, onAlertClick }: AlertsFeedProps) {
  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
          Alerts
        </h2>
        {items.length > 0 && (
          <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
            {items.length} {items.length === 1 ? 'alert' : 'alerts'}
          </span>
        )}
      </div>

      {/* Alerts — first 4 */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800">
        {items.slice(0, 4).map((item) => {
          const { icon: Icon, label } = categoryConfig[item.category]
          const style = urgencyStyles[item.urgency]
          return (
            <div
              key={item.id}
              onClick={() => onAlertClick?.(item)}
              className="flex items-start gap-3.5 px-5 sm:px-6 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer"
            >
              <div className={`flex-shrink-0 p-2 rounded-lg mt-0.5 ${style.iconBg}`}>
                <Icon className={`w-4 h-4 ${style.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 leading-snug truncate">
                    {item.vehicleNumber}
                  </p>
                  <span className={`flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${style.badge}`}>
                    {label}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  {item.title}
                </p>
              </div>
              <span className={`flex-shrink-0 text-xs font-medium mt-0.5 whitespace-nowrap ${
                item.urgency === 'critical' ? 'text-red-500' : item.urgency === 'warning' ? 'text-amber-500' : 'text-stone-400 dark:text-stone-500'
              }`}>
                {formatDays(item.daysRemaining)}
              </span>
            </div>
          )
        })}
      </div>

      {/* See all */}
      {items.length > 4 && (
        <div className="px-5 sm:px-6 py-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            See all alerts &rarr;
          </button>
        </div>
      )}
    </div>
  )
}
