import type { ComplianceScore as ComplianceScoreType, ComplianceStatus } from '@/../product/sections/home/types'

interface ComplianceScoreProps {
  data: ComplianceScoreType
}

const statusConfig: Record<ComplianceStatus, {
  label: string
  color: string
  bg: string
  bar: string
  dot: string
  ring: string
}> = {
  healthy: {
    label: 'Healthy',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    bar: 'bg-emerald-500',
    dot: 'bg-emerald-500',
    ring: 'text-emerald-500',
  },
  warning: {
    label: 'Needs Attention',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    bar: 'bg-amber-500',
    dot: 'bg-amber-500',
    ring: 'text-amber-500',
  },
  critical: {
    label: 'Critical',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    bar: 'bg-red-500',
    dot: 'bg-red-500',
    ring: 'text-red-500',
  },
}

export function ComplianceScore({ data }: ComplianceScoreProps) {
  const overall = statusConfig[data.status]

  // SVG ring params
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (data.overall / 100) * circumference

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
          Compliance Health
        </h2>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${overall.bg} ${overall.color}`}>
          {overall.label}
        </span>
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
              <span className="text-xs text-stone-400 dark:text-stone-500 leading-none mt-1">/ 100</span>
            </div>
          </div>
          <p className={`text-xs font-semibold sm:text-center ${overall.color}`}>
            {overall.label}
          </p>
        </div>

        {/* Category breakdown */}
        <div className="flex-1 flex flex-col gap-3.5">
          {data.categories.map((cat) => {
            const cfg = statusConfig[cat.status]
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
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
    </div>
  )
}
