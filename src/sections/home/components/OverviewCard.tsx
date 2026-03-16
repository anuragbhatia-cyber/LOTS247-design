import { Truck, Users, FileWarning, ShieldAlert, CreditCard, ChevronRight } from 'lucide-react'

const iconMap = {
  truck: Truck,
  users: Users,
  'file-warning': FileWarning,
  'shield-alert': ShieldAlert,
  'credit-card': CreditCard,
}

export type OverviewCardVariant = 'default' | 'warning' | 'danger'

interface OverviewCardProps {
  icon: keyof typeof iconMap
  label: string
  metric: string
  subtext: string
  onClick?: () => void
  variant?: OverviewCardVariant
  badge?: string
}

const variantConfig: Record<OverviewCardVariant, {
  border: string
  accent: string
  iconBg: string
  iconColor: string
  badgeBg: string
  badgeText: string
}> = {
  default: {
    border: 'border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700',
    accent: 'bg-emerald-500',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    badgeText: 'text-emerald-700 dark:text-emerald-400',
  },
  warning: {
    border: 'border-amber-200 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-700',
    accent: 'bg-amber-500',
    iconBg: 'bg-amber-50 dark:bg-amber-950/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/40',
    badgeText: 'text-amber-700 dark:text-amber-400',
  },
  danger: {
    border: 'border-red-200 dark:border-red-900/50 hover:border-red-400 dark:hover:border-red-700',
    accent: 'bg-red-500',
    iconBg: 'bg-red-50 dark:bg-red-950/50',
    iconColor: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-100 dark:bg-red-900/40',
    badgeText: 'text-red-700 dark:text-red-400',
  },
}

export function OverviewCard({
  icon,
  label,
  metric,
  subtext,
  onClick,
  variant = 'default',
  badge,
}: OverviewCardProps) {
  const Icon = iconMap[icon]
  const styles = variantConfig[variant]
  const isClickable = !!onClick

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`
        group relative w-full text-left rounded-xl border bg-white dark:bg-stone-900
        transition-all duration-200 overflow-hidden
        ${styles.border}
        ${isClickable
          ? 'cursor-pointer hover:shadow-md dark:hover:shadow-stone-900'
          : 'cursor-default'
        }
      `}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.accent} opacity-60`} />

      <div className="p-4 sm:p-5 lg:p-6">
        {/* Badge */}
        {badge && (
          <div className="flex justify-end mb-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
              {badge}
            </span>
          </div>
        )}

        {/* Metric + Icon */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
            {metric}
          </p>
          <div className={`p-2 sm:p-2.5 rounded-lg ${styles.iconBg}`}>
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${styles.iconColor}`} />
          </div>
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2 sm:mb-3">
          {label}
        </p>

        {/* View details link */}
        {isClickable && (
          <div className="flex items-center gap-0.5 text-xs font-medium text-stone-400 dark:text-stone-500 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-150">
            <span>View details</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
          </div>
        )}
      </div>
    </button>
  )
}
