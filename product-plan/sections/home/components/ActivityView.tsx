import { ArrowLeft, ArrowRight, FileWarning, Clock, Shield } from 'lucide-react'
import type { AlertItem, AlertCategory, AlertUrgency } from '../types'
// TODO: Replace with your app's language/i18n context
// import { useLanguage, type Language } from '@/shell/components/LanguageContext'
type Language = 'en' | 'hi'
const useLanguage = () => ({ language: 'en' as Language })

const categoryLabels: Record<Language, Record<AlertCategory, string>> = {
  en: { puc: 'PUC', insurance: 'Insurance', challan: 'Challan' },
  hi: { puc: 'पीयूसी', insurance: 'बीमा', challan: 'चालान' },
}

const categoryIcons: Record<AlertCategory, typeof FileWarning> = {
  puc: Clock,
  insurance: Shield,
  challan: FileWarning,
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

const viewTranslations: Record<Language, Record<string, string>> = {
  en: {
    alerts: 'Alerts',
    alert: 'alert',
    alertsPlural: 'alerts',
    requiringAttention: 'requiring attention',
    vehicle: 'Vehicle',
    payNow: 'Pay Now',
  },
  hi: {
    alerts: 'अलर्ट',
    alert: 'अलर्ट',
    alertsPlural: 'अलर्ट',
    requiringAttention: 'ध्यान आवश्यक',
    vehicle: 'वाहन',
    payNow: 'भुगतान करें',
  },
}

interface AlertsViewProps {
  items: AlertItem[]
  onBack: () => void
  onAlertClick?: (alert: AlertItem) => void
}

export function AlertsView({ items, onBack, onAlertClick }: AlertsViewProps) {
  const { language } = useLanguage()
  const t = viewTranslations[language]
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-3 -ml-3 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {t.alerts}
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              {items.length} {items.length === 1 ? t.alert : t.alertsPlural} {t.requiringAttention}
            </p>
          </div>
        </div>

        {/* Alerts list */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((item) => {
            const Icon = categoryIcons[item.category]
            const style = urgencyStyles[item.urgency]
            return (
              <div
                key={item.id}
                onClick={() => onAlertClick?.(item)}
                className="flex items-center gap-4 px-5 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${style.iconBg}`}>
                  <Icon className={`w-5 h-5 ${style.iconColor}`} />
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

      </div>
    </div>
  )
}
