import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  accent?: 'emerald' | 'amber' | 'stone'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  accent = 'emerald',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const eyebrowColor = {
    emerald: tone === 'dark' ? 'text-emerald-300' : 'text-emerald-700',
    amber: tone === 'dark' ? 'text-amber-300' : 'text-amber-700',
    stone: tone === 'dark' ? 'text-stone-400' : 'text-stone-500',
  }[accent]

  const titleColor = tone === 'dark' ? 'text-white' : 'text-stone-900'
  const descColor = tone === 'dark' ? 'text-stone-300' : 'text-stone-600'
  const ruleColor = tone === 'dark' ? 'text-stone-700' : 'text-stone-300'

  return (
    <div
      className={cn(
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl',
        className,
      )}
    >
      {/* Kicker row: mono label + decorative rule (no copy added — rule is purely decorative) */}
      <div
        className={cn(
          'flex items-center gap-3',
          align === 'center' ? 'justify-center' : 'justify-start',
        )}
      >
        <span className={cn('font-mono-label text-[11px]', eyebrowColor)}>
          {eyebrow}
        </span>
        <span
          aria-hidden="true"
          className={cn('rule-em w-12 opacity-80', ruleColor)}
        />
      </div>

      <h2
        className={cn(
          'font-serif-display mt-5 font-semibold text-balance',
          'text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.6rem]',
          'leading-[1.02]',
          titleColor,
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-5 text-base sm:text-lg leading-relaxed',
            align === 'center' && 'mx-auto max-w-2xl',
            descColor,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
