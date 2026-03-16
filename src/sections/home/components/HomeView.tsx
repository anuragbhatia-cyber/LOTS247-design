import { useState, useRef, useEffect } from 'react'
import { Plus, AlertTriangle, PlusCircle, Phone, UserPlus } from 'lucide-react'
import type { HomeProps } from '@/../product/sections/home/types'
import { OverviewCard, type OverviewCardVariant } from './OverviewCard'
import { ComplianceScore } from './ComplianceScore'
import { AlertsFeed } from './ActivityFeed'
import { NotificationsView } from './NotificationsView'
import { AlertsView } from './ActivityView'

const QUICK_ACTIONS = [
  {
    id: 'incident',
    label: 'Add Incident',
    description: 'Report an accident or legal issue',
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/50',
  },
  {
    id: 'vehicle',
    label: 'Add Vehicle',
    description: 'Register a new vehicle to your fleet',
    icon: PlusCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
  },
  {
    id: 'driver',
    label: 'Add Driver',
    description: 'Add a driver and assign to a vehicle',
    icon: UserPlus,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
  },
  {
    id: 'lawyer',
    label: 'Call a Lawyer',
    description: '24/7 on-call legal support',
    icon: Phone,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
  },
]

function getSubscriptionVariant(expiryDate: string, status: string): OverviewCardVariant {
  if (status === 'expired') return 'danger'
  if (status === 'expiring_soon') return 'warning'
  const daysRemaining = Math.ceil(
    (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  if (daysRemaining <= 7) return 'warning'
  return 'default'
}

function getSubscriptionBadge(status: string): string {
  if (status === 'expired') return 'Expired'
  if (status === 'expiring_soon') return 'Expiring Soon'
  return 'Active'
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatCurrency(amount: number, currency: string): string {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`
  }
  return `${currency} ${amount.toLocaleString()}`
}

function formatExpiryDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function HomeView({
  subscriber,
  subscription,
  stats,
  complianceScore,
  alerts,
  onViewVehicles,
  onViewDrivers,
  onViewChallans,
  onViewIncidents,
  onViewSubscription,
  onAddIncident,
  onAddVehicle,
  onCallLawyer,
  onAddDriver,
  onViewProfile,
  onLogout,
}: HomeProps) {
  const [view, setView] = useState<'home' | 'notifications' | 'alerts'>('home')
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const quickActionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(e.target as Node)) {
        setQuickActionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const quickActionCallbacks: Record<string, (() => void) | undefined> = {
    incident: onAddIncident,
    vehicle: onAddVehicle,
    driver: onAddDriver,
    lawyer: onCallLawyer,
  }

  const subscriptionVariant = getSubscriptionVariant(subscription.expiryDate, subscription.status)
  const subscriptionBadge = getSubscriptionBadge(subscription.status)

  const incidentSubtext =
    stats.activeIncidents.count === 0
      ? 'No active incidents'
      : [
          stats.activeIncidents.breakdown.new > 0
            ? `${stats.activeIncidents.breakdown.new} new`
            : null,
          stats.activeIncidents.breakdown.inProgress > 0
            ? `${stats.activeIncidents.breakdown.inProgress} in progress`
            : null,
          stats.activeIncidents.breakdown.awaitingAction > 0
            ? `${stats.activeIncidents.breakdown.awaitingAction} awaiting action`
            : null,
        ]
          .filter(Boolean)
          .join(' · ')

  if (view === 'alerts') {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <AlertsView items={alerts} onBack={() => setView('home')} />
      </div>
    )
  }

  if (view === 'notifications') {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <NotificationsView onBack={() => setView('home')} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">

      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Page header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            <span className="text-stone-400 dark:text-stone-500 font-normal">{getGreeting()}, </span>
            {subscriber.name}
          </h1>

          {/* Quick Actions */}
          <div ref={quickActionsRef} className="relative flex-shrink-0">
            <button
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-150"
            >
              <Plus className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${quickActionsOpen ? 'rotate-45' : ''}`} />
              <span>Quick Actions</span>
            </button>

            {quickActionsOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden z-30">
                <div className="px-4 py-2.5 border-b border-stone-100 dark:border-stone-800">
                  <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">Quick Actions</p>
                </div>
                <div className="p-1.5">
                  {QUICK_ACTIONS.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.id}
                        onClick={() => {
                          setQuickActionsOpen(false)
                          quickActionCallbacks[action.id]?.()
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors duration-150"
                      >
                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${action.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${action.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-50 leading-snug">{action.label}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug mt-0.5">{action.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fleet Overview */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <OverviewCard
              icon="truck"
              label="Total Vehicles"
              metric={stats.activeVehicles.count === 0 ? '—' : String(stats.activeVehicles.count)}
              subtext={
                stats.activeVehicles.count === 0
                  ? 'No vehicles registered'
                  : `${stats.activeVehicles.count} of ${stats.activeVehicles.limit} plan slots used`
              }
              onClick={onViewVehicles}
              variant="default"
            />

            <OverviewCard
              icon="users"
              label="Total Drivers"
              metric={stats.activeDrivers.count === 0 ? '—' : String(stats.activeDrivers.count)}
              subtext={
                stats.activeDrivers.count === 0
                  ? 'No drivers assigned'
                  : 'Currently assigned'
              }
              onClick={onViewDrivers}
              variant="default"
            />

            <OverviewCard
              icon="file-warning"
              label="Pending Challans"
              metric={stats.pendingChallans.count === 0 ? '—' : String(stats.pendingChallans.count)}
              subtext={
                stats.pendingChallans.count === 0
                  ? 'No pending challans'
                  : `${formatCurrency(stats.pendingChallans.totalAmount, stats.pendingChallans.currency)} outstanding`
              }
              onClick={onViewChallans}
              variant={stats.pendingChallans.count > 0 ? 'warning' : 'default'}
            />

            <OverviewCard
              icon="shield-alert"
              label="Pending Cases"
              metric={stats.activeIncidents.count === 0 ? '—' : String(stats.activeIncidents.count)}
              subtext={incidentSubtext || 'No active incidents'}
              onClick={onViewIncidents}
              variant={stats.activeIncidents.count > 0 ? 'warning' : 'default'}
            />

          </div>
        </section>

        {/* Compliance Health + Recent Activity */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <ComplianceScore data={complianceScore} />
            <AlertsFeed items={alerts} onViewAll={() => setView('alerts')} />
          </div>
        </section>

      </div>
    </div>
  )
}
