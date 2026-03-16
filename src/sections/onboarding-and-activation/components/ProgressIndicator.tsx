interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center gap-1.5 flex-1">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`
              flex-1 h-1.5 rounded-full transition-colors duration-300
              ${i < currentStep ? 'bg-emerald-500' : 'bg-stone-200 dark:bg-stone-700'}
            `}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
        Step {currentStep}/{totalSteps}
      </span>
    </div>
  )
}
