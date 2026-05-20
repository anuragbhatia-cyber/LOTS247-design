import { Truck, Users, UserCircle, Check, ArrowRight } from 'lucide-react'
import type { ElementType } from 'react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, {
  heading: string
  subheading: string
  progress: string
  step1Label: string
  step1Title: string
  step1Desc: string
  step1Cta: string
  step2Title: string
  step2Desc: string
  step2Cta: string
  step3Title: string
  step3Desc: string
  step3Cta: string
  complete: string
  dismiss: string
}> = {
  en: {
    heading: 'Get your fleet ready',
    subheading: 'Three quick steps to start tracking compliance and incidents',
    progress: 'of 3 completed',
    step1Label: 'Step 1',
    step1Title: 'Add your first vehicle',
    step1Desc: 'Enter an RC number — we fetch the details and documents automatically',
    step1Cta: 'Add Vehicle',
    step2Title: 'Assign a driver',
    step2Desc: 'Link a driver to your vehicle to track license validity and assignments',
    step2Cta: 'Add Driver',
    step3Title: 'Complete your profile',
    step3Desc: 'Add your company details and GSTIN to enable invoicing',
    step3Cta: 'Open Profile',
    complete: 'Completed',
    dismiss: 'Dismiss',
  },
  hi: {
    heading: 'अपना बेड़ा तैयार करें',
    subheading: 'अनुपालन और घटनाएँ ट्रैक करने के लिए तीन त्वरित चरण',
    progress: 'में से 3 पूर्ण',
    step1Label: 'चरण 1',
    step1Title: 'अपना पहला वाहन जोड़ें',
    step1Desc: 'RC नंबर दर्ज करें — हम विवरण और दस्तावेज़ स्वचालित रूप से प्राप्त करते हैं',
    step1Cta: 'वाहन जोड़ें',
    step2Title: 'ड्राइवर असाइन करें',
    step2Desc: 'लाइसेंस वैधता और नियुक्तियों को ट्रैक करने के लिए वाहन से ड्राइवर लिंक करें',
    step2Cta: 'ड्राइवर जोड़ें',
    step3Title: 'अपना प्रोफ़ाइल पूरा करें',
    step3Desc: 'इनवॉइसिंग सक्षम करने के लिए कंपनी विवरण और GSTIN जोड़ें',
    step3Cta: 'प्रोफ़ाइल खोलें',
    complete: 'पूर्ण',
    dismiss: 'खारिज करें',
  },
}

interface ChecklistStep {
  icon: ElementType
  title: string
  description: string
  ctaLabel: string
  onClick?: () => void
  completed: boolean
}

interface OnboardingChecklistProps {
  vehicleAdded?: boolean
  driverAdded?: boolean
  profileCompleted?: boolean
  onAddVehicle?: () => void
  onAddDriver?: () => void
  onOpenProfile?: () => void
  onDismiss?: () => void
}

export function OnboardingChecklist({
  vehicleAdded = false,
  driverAdded = false,
  profileCompleted = false,
  onAddVehicle,
  onAddDriver,
  onOpenProfile,
  onDismiss,
}: OnboardingChecklistProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const steps: ChecklistStep[] = [
    {
      icon: Truck,
      title: t.step1Title,
      description: t.step1Desc,
      ctaLabel: t.step1Cta,
      onClick: onAddVehicle,
      completed: vehicleAdded,
    },
    {
      icon: Users,
      title: t.step2Title,
      description: t.step2Desc,
      ctaLabel: t.step2Cta,
      onClick: onAddDriver,
      completed: driverAdded,
    },
    {
      icon: UserCircle,
      title: t.step3Title,
      description: t.step3Desc,
      ctaLabel: t.step3Cta,
      onClick: onOpenProfile,
      completed: profileCompleted,
    },
  ]

  const completedCount = steps.filter((s) => s.completed).length
  const progressPct = (completedCount / steps.length) * 100

  const activeIndex = steps.findIndex((s) => !s.completed)

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-white dark:from-emerald-950/30 dark:via-stone-900 dark:to-stone-900 border border-emerald-200/60 dark:border-emerald-900/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-emerald-600 text-white">
              {completedCount}/{steps.length}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-medium text-emerald-700 dark:text-emerald-400">
              {t.progress}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            {t.heading}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {t.subheading}
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:underline underline-offset-2 transition-colors flex-shrink-0"
          >
            {t.dismiss}
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="px-5 sm:px-6">
        <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="px-3 sm:px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = idx === activeIndex
            const isCompleted = step.completed

            return (
              <div
                key={idx}
                className={`relative rounded-xl border p-4 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                    : isActive
                      ? 'bg-white dark:bg-stone-900 border-emerald-300 dark:border-emerald-800 shadow-sm shadow-emerald-100 dark:shadow-emerald-950/30'
                      : 'bg-white/60 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800'
                }`}
              >
                {/* Icon + step number */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isCompleted
                        ? 'bg-emerald-600'
                        : isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/40'
                          : 'bg-stone-100 dark:bg-stone-800'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-stone-500 dark:text-stone-400'
                        }`}
                      />
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <p
                  className={`text-sm font-semibold leading-snug ${
                    isCompleted
                      ? 'text-stone-500 dark:text-stone-400 line-through decoration-stone-300 dark:decoration-stone-600'
                      : 'text-stone-900 dark:text-stone-50'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  {step.description}
                </p>

                {/* CTA */}
                {isCompleted ? (
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    {t.complete}
                  </p>
                ) : (
                  <button
                    onClick={step.onClick}
                    className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    {step.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
