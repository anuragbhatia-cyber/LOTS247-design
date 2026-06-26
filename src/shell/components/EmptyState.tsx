import type { ElementType, ReactNode } from 'react'

export interface EmptyStateCta {
  label: string
  onClick?: () => void
  icon?: ElementType
}

export interface EmptyStateFeature {
  icon: ElementType
  title: string
  description: string
}

export interface EmptyStateProps {
  /** Lucide icon component to display in the hero tile */
  icon: ElementType
  /** Primary heading */
  title: string
  /** Supporting description */
  description: string
  /** Primary call-to-action button */
  primaryCta?: EmptyStateCta
  /** Secondary call-to-action button */
  secondaryCta?: EmptyStateCta
  /** Optional grid of feature tiles shown below the hero */
  features?: EmptyStateFeature[]
  /** Optional eyebrow label above the features grid */
  featuresHeading?: string
  /** Compact variant: smaller hero, no radial accent, slimmer padding */
  variant?: 'hero' | 'compact'
  /** Optional content rendered above the CTAs (e.g., a status pill) */
  topSlot?: ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryCta,
  secondaryCta,
  features,
  featuresHeading,
  variant = 'hero',
  topSlot,
}: EmptyStateProps) {
  const isCompact = variant === 'compact'

  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
      <div
        className={`relative text-center ${
          isCompact ? 'px-5 py-8' : 'px-6 sm:px-10 pt-10 pb-8'
        }`}
      >
        {!isCompact && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-30"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.10) 0%, transparent 60%)',
            }}
          />
        )}

        <div className="relative">
          <div
            className={`mx-auto mb-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center ${
              isCompact ? 'w-16 h-16' : 'w-24 h-24 sm:w-28 sm:h-28'
            }`}
          >
            <Icon
              className={`text-emerald-600 dark:text-emerald-400 ${
                isCompact ? 'w-8 h-8' : 'w-12 h-12 sm:w-14 sm:h-14'
              }`}
              strokeWidth={1.5}
            />
          </div>

          {topSlot}

          <h2
            className={`font-bold text-stone-900 dark:text-stone-50 tracking-tight ${
              isCompact ? 'text-lg' : 'text-xl sm:text-2xl'
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-2 text-stone-500 dark:text-stone-400 mx-auto leading-relaxed ${
              isCompact ? 'text-xs max-w-sm' : 'text-sm max-w-md'
            }`}
          >
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              {primaryCta && (
                <button
                  onClick={primaryCta.onClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-emerald-600/20"
                >
                  {primaryCta.icon && <primaryCta.icon className="w-4 h-4" />}
                  {primaryCta.label}
                </button>
              )}
              {secondaryCta && (
                <button
                  onClick={secondaryCta.onClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-sm font-semibold transition-colors"
                >
                  {secondaryCta.icon && <secondaryCta.icon className="w-4 h-4" />}
                  {secondaryCta.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {features && features.length > 0 && (
        <div className="border-t border-stone-200 dark:border-stone-800 px-6 sm:px-8 py-6 bg-stone-50 dark:bg-stone-950/40">
          {featuresHeading && (
            <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 text-center mb-5">
              {featuresHeading}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, i) => {
              const FIcon = feature.icon
              return (
                <div
                  key={i}
                  className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-3">
                    <FIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                    {feature.title}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
