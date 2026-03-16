import type { ElementType } from 'react'
import { AlertTriangle, PlusCircle, Phone, UserPlus, LockKeyhole, ArrowRight } from 'lucide-react'
import type { Subscription } from '@/../product/sections/home/types'

interface QuickActionsProps {
  subscription: Subscription
  vehicleLimitReached?: boolean
  onAddIncident?: () => void
  onAddVehicle?: () => void
  onCallLawyer?: () => void
  onAddDriver?: () => void
}

interface ActionConfig {
  id: string
  label: string
  description: string
  icon: ElementType
  onClick?: () => void
  priority: 'high' | 'normal'
  restricted: boolean
  restrictedMessage: string
}

export function QuickActions({
  subscription,
  vehicleLimitReached = false,
  onAddIncident,
  onAddVehicle,
  onCallLawyer,
  onAddDriver,
}: QuickActionsProps) {
  const legalRestricted = !subscription.includedLegalSupport

  const actions: ActionConfig[] = [
    {
      id: 'incident',
      label: 'Add Incident',
      description: 'Report an accident, seizure, or legal issue',
      icon: AlertTriangle,
      onClick: onAddIncident,
      priority: 'high',
      restricted: false,
      restrictedMessage: '',
    },
    {
      id: 'vehicle',
      label: 'Add Vehicle',
      description: 'Register a new vehicle to your fleet',
      icon: PlusCircle,
      onClick: onAddVehicle,
      priority: 'normal',
      restricted: vehicleLimitReached,
      restrictedMessage: 'Vehicle limit reached — upgrade your plan',
    },
    {
      id: 'lawyer',
      label: 'Call a Lawyer',
      description: '24/7 on-call legal support nationwide',
      icon: Phone,
      onClick: onCallLawyer,
      priority: 'normal',
      restricted: legalRestricted,
      restrictedMessage: 'Legal support not included — upgrade plan',
    },
    {
      id: 'driver',
      label: 'Add Driver',
      description: 'Add a driver and assign to a vehicle',
      icon: UserPlus,
      onClick: onAddDriver,
      priority: 'normal',
      restricted: false,
      restrictedMessage: '',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {actions.map((action) => {
        const Icon = action.icon
        const isHigh = action.priority === 'high'
        const isRestricted = action.restricted

        if (isHigh) {
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="
                group relative flex flex-col items-start p-3 sm:p-4 lg:p-5 rounded-xl
                bg-red-600 dark:bg-red-700 border border-red-600 dark:border-red-700
                hover:bg-red-700 dark:hover:bg-red-600
                hover:shadow-lg hover:shadow-red-200 dark:hover:shadow-red-950/50
                transition-all duration-200 text-left
              "
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-red-500 dark:bg-red-600 mb-2 sm:mb-3">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white mb-1">{action.label}</p>
              <p className="text-xs text-red-200 leading-relaxed flex-1">{action.description}</p>
              <div className="mt-2 sm:mt-4 flex items-center gap-1 text-xs font-semibold text-red-200 group-hover:text-white transition-colors duration-150">
                <span>Get help now</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150" />
              </div>
            </button>
          )
        }

        if (isRestricted) {
          return (
            <div
              key={action.id}
              className="
                flex flex-col items-start p-3 sm:p-4 lg:p-5 rounded-xl
                bg-stone-50 dark:bg-stone-800/40
                border border-stone-200 dark:border-stone-700
                opacity-70
              "
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-stone-200 dark:bg-stone-700 mb-2 sm:mb-3">
                <LockKeyhole className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400 mb-1">{action.label}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {action.restrictedMessage}
              </p>
              <div className="mt-2 sm:mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-2 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                Upgrade plan
              </div>
            </div>
          )
        }

        return (
          <button
            key={action.id}
            onClick={action.onClick}
            className="
              group flex flex-col items-start p-3 sm:p-4 lg:p-5 rounded-xl
              bg-white dark:bg-stone-900
              border border-stone-200 dark:border-stone-800
              hover:border-emerald-300 dark:hover:border-emerald-700
              hover:shadow-md dark:hover:shadow-stone-900
              transition-all duration-200 text-left
            "
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 mb-2 sm:mb-3">
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1">{action.label}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed flex-1">{action.description}</p>
            <div className="mt-2 sm:mt-4 flex items-center gap-0.5 text-xs font-medium text-stone-400 dark:text-stone-500 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-150">
              <span>Open</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150" />
            </div>
          </button>
        )
      })}
    </div>
  )
}
