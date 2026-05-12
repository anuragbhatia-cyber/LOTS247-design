import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  accent?: 'emerald' | 'amber' | 'stone'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  accent = 'emerald',
  className,
}: SectionHeadingProps) {
  const accentColor = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    stone: 'text-stone-500',
  }[accent]

  return (
    <div
      className={cn(
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        className,
      )}
    >
      <div
        className={cn(
          'inline-flex items-center text-[11px] uppercase tracking-[0.2em] font-bold',
          accentColor,
        )}
      >
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-stone-900 leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
