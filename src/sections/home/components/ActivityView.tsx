import { ArrowLeft, FileWarning, Clock, Shield } from 'lucide-react'
import type { AlertItem, AlertCategory, AlertUrgency } from '@/../product/sections/home/types'

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

function formatDays(days: number): string {
  if (days <= 0) return 'Expired'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

interface AlertsViewProps {
  items: AlertItem[]
  onBack: () => void
  onAlertClick?: (alert: AlertItem) => void
}

export function AlertsView({ items, onBack, onAlertClick }: AlertsViewProps) {
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
              Alerts
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              {items.length} {items.length === 1 ? 'alert' : 'alerts'} requiring attention
            </p>
          </div>
        </div>

        {/* Alerts list */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((item) => {
            const { icon: Icon, label } = categoryConfig[item.category]
            const style = urgencyStyles[item.urgency]
            return (
              <div
                key={item.id}
                onClick={() => onAlertClick?.(item)}
                className="flex items-start gap-4 px-5 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${style.iconBg}`}>
                  <Icon className={`w-5 h-5 ${style.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 leading-snug">
                      {item.vehicleNumber}
                    </p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${style.badge}`}>
                      {label}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
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

      </div>
    </div>
  )
}
