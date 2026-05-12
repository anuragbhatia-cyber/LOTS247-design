/**
 * Maps `${sectionId}/${screenDesignName}` → the appropriate skeleton component,
 * so the Suspense fallback during chunk-load looks like the real screen instead of
 * a generic "Loading..." text.
 *
 * Skeletons are imported eagerly — they're tiny (each ~50 lines of JSX with
 * animate-pulse) and we want them visible immediately on first paint.
 */
import type { ComponentType } from 'react'
import { HomeSkeleton } from '@/sections/home/components/HomeSkeleton'
import { ComplianceDashboardSkeleton } from '@/sections/compliance-dashboard/components/ComplianceDashboardSkeleton'
import { IncidentManagementSkeleton } from '@/sections/incident-management/components/IncidentManagementSkeleton'
import { CaseListSkeleton } from '@/sections/incident-management/components/CaseListSkeleton'
import { ChallanListSkeleton } from '@/sections/incident-management/components/ChallanListSkeleton'
import { VehicleListSkeleton } from '@/sections/vehicle-and-driver-management/components/VehicleListSkeleton'
import { ReportsListSkeleton } from '@/sections/reports/components/ReportsListSkeleton'
import { ProposalManagementSkeleton } from '@/sections/proposals/components/ProposalManagementSkeleton'
import { KnowledgeBaseSkeleton } from '@/sections/knowledge-base/components/KnowledgeBaseSkeleton'
import { ApiCatalogueSkeleton } from '@/sections/api-catalogue/components/ApiCatalogueSkeleton'
import { WalletSkeleton } from '@/sections/wallet/components/WalletSkeleton'
import { InvoiceListSkeleton } from '@/sections/invoices/components/InvoiceListSkeleton'
import { MyProfileSkeleton } from '@/sections/my-profile/components/MyProfileSkeleton'
import { SettingsSkeleton } from '@/sections/settings/components/SettingsSkeleton'
import { AuthShellSkeleton } from '@/sections/onboarding-and-activation/components/AuthShellSkeleton'

const skeletonMap: Record<string, ComponentType> = {
  // home
  'home/HomePreview': HomeSkeleton,
  // compliance dashboard
  'compliance-dashboard/ComplianceDashboard': ComplianceDashboardSkeleton,
  // incident management — main + sub-screens reuse the closest-matching skeleton
  'incident-management/IncidentManagement': IncidentManagementSkeleton,
  'incident-management/CaseList': CaseListSkeleton,
  'incident-management/CaseDetail': CaseListSkeleton,
  'incident-management/ChallanList': ChallanListSkeleton,
  'incident-management/ChallanDetail': ChallanListSkeleton,
  // fleet
  'vehicle-and-driver-management/VehicleList': VehicleListSkeleton,
  'vehicle-and-driver-management/VehicleDetail': VehicleListSkeleton,
  // reports
  'reports/ReportsList': ReportsListSkeleton,
  // proposals
  'proposals/ProposalManagement': ProposalManagementSkeleton,
  'proposals/ProposalDetail': ProposalManagementSkeleton,
  // knowledge base
  'knowledge-base/KnowledgeBaseView': KnowledgeBaseSkeleton,
  // api catalogue
  'api-catalogue/ApiCatalogueView': ApiCatalogueSkeleton,
  'api-catalogue/ApiDetailView': ApiCatalogueSkeleton,
  // wallet
  'wallet/WalletView': WalletSkeleton,
  // invoices
  'invoices/InvoiceList': InvoiceListSkeleton,
  'invoices/InvoiceDetail': InvoiceListSkeleton,
  // my profile
  'my-profile/MyProfileView': MyProfileSkeleton,
  // settings
  'settings/SettingsView': SettingsSkeleton,
  // onboarding
  'onboarding-and-activation/OnboardingFlow': AuthShellSkeleton,
}

/**
 * Generic page-shaped skeleton — used when a section doesn't have its own
 * dedicated skeleton mapped above. Simple header + content area so the user
 * sees something purposeful instead of a "Loading..." string.
 */
function GenericPageSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-72 rounded bg-stone-200 dark:bg-stone-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-3"
            >
              <div className="h-4 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Resolve the right skeleton for a given screen, falling back to a generic
 * page skeleton if no specific mapping exists.
 */
export function getSkeletonFor(sectionId: string | undefined, screenDesignName: string | undefined): ComponentType {
  if (!sectionId || !screenDesignName) return GenericPageSkeleton
  return skeletonMap[`${sectionId}/${screenDesignName}`] || GenericPageSkeleton
}
