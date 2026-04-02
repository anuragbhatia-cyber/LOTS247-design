import { Info } from 'lucide-react'
import type { ComplianceScore as ComplianceScoreType, ComplianceStatus } from '../types'
// TODO: Replace with your app's language/i18n context
// import { useLanguage, type Language } from '@/shell/components/LanguageContext'
type Language = 'en' | 'hi'
const useLanguage = () => ({ language: 'en' as Language })

interface ComplianceScoreProps {
  data: ComplianceScoreType
  onViewDetails?: () => void
}

const statusLabels: Record<Language, Record<ComplianceStatus, string>> = {
  en: { healthy: 'Healthy', warning: 'Needs Attention', critical: 'Critical' },
  hi: { healthy: 'स्वस्थ', warning: 'ध्यान आवश्यक', critical: 'गंभीर' },
}

const translations: Record<Language, Record<string, string>> = {
  en: { complianceHealth: 'Fleet Compliance Score', viewDetails: 'View Details', fromLastMonth: 'from last month', tooltipTitle: 'How is this calculated?', tooltipBody: 'Average of compliance % across all categories: RC, Insurance, PUC, Permits & DL.' },
  hi: { complianceHealth: 'फ्लीट अनुपालन स्कोर', viewDetails: 'विवरण देखें', fromLastMonth: 'पिछले महीने से', tooltipTitle: 'यह कैसे गणना किया जाता है?', tooltipBody: 'सभी श्रेणियों में अनुपालन % का औसत: RC, बीमा, PUC, परमिट और DL।' },
}

const statusStyles: Record<ComplianceStatus, {
  color: string
  bg: string
  bar: string
  dot: string
  ring: string
}> = {
  healthy: {
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    bar: 'bg-emerald-500',
    dot: 'bg-emerald-500',
    ring: 'text-emerald-500',
  },
  warning: {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    bar: 'bg-amber-500',
    dot: 'bg-amber-500',
    ring: 'text-amber-500',
  },
  critical: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    bar: 'bg-red-500',
    dot: 'bg-red-500',
    ring: 'text-red-500',
  },
}

export function ComplianceScore({ data, onViewDetails }: ComplianceScoreProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const overall = statusStyles[data.status]
  const overallLabel = statusLabels[language][data.status]

  // SVG ring params
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (data.overall / 100) * circumference

  return (
    <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            {t.complianceHealth}
          </h2>
          <div className="relative group">
            <Info className="w-3.5 h-3.5 text-stone-400 cursor-help" />
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 px-3 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-xs text-stone-200 dark:text-stone-700 leading-relaxed shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 pointer-events-none">
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-stone-900 dark:border-b-stone-100" />
              <p className="font-semibold text-white dark:text-stone-900 mb-1">{t.tooltipTitle}</p>
              <p>{t.tooltipBody}</p>
            </div>
          </div>
        </div>
        {data.changeFromLastMonth != null && data.changeFromLastMonth !== 0 ? (
          <span className={`text-xs font-semibold ${data.changeFromLastMonth > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {data.changeFromLastMonth > 0 ? '+' : ''}{data.changeFromLastMonth}% {t.fromLastMonth}
          </span>
        ) : (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${overall.bg} ${overall.color}`}>
            {overallLabel}
          </span>
        )}
      </div>

      {/* Score + Categories */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col sm:flex-row gap-5 sm:gap-8">

        {/* Circular score */}
        <div className="flex items-center gap-5 sm:flex-col sm:items-center sm:gap-3 flex-shrink-0">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
              {/* Track */}
              <circle
                cx="44" cy="44" r={radius}
                fill="none"
                strokeWidth="7"
                className="stroke-stone-100 dark:stroke-stone-800"
              />
              {/* Progress */}
              <circle
                cx="44" cy="44" r={radius}
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                className={`transition-all duration-700 ${overall.ring}`}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl sm:text-3xl font-bold tabular-nums leading-none ${overall.color}`}>
                {data.overall}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 leading-none mt-1">/ 100</span>
            </div>
          </div>
          <p className={`text-xs font-semibold sm:text-center ${overall.color}`}>
            {overallLabel}
          </p>
        </div>

        {/* Category breakdown */}
        <div className="flex-1 flex flex-col gap-3.5">
          {data.categories.map((cat) => {
            const cfg = statusStyles[cat.status]
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-500" />
                    <span className="text-sm text-stone-700 dark:text-stone-300">{cat.label}</span>
                  </div>
                  <span className={`text-sm font-semibold tabular-nums ${cfg.color}`}>
                    {cat.score}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full px-5 sm:px-6 py-2.5 border-t border-stone-100 dark:border-stone-800 text-left text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
      >
        {t.viewDetails} &rarr;
      </button>
    </div>
  )
}
