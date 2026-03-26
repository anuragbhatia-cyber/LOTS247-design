import data from '@/../product/sections/compliance-dashboard/data.json'
import { ComplianceDashboard } from './components/ComplianceDashboard'
import type { CategoryId, DateRangePreset, ScopeFilter } from '@/../product/sections/compliance-dashboard/types'

export default function ComplianceDashboardPreview() {
  const params = new URLSearchParams(window.location.search)
  const view = params.get('view') as 'dl' | 'rc' | 'challan' | 'vehicle' | null

  return (
    <ComplianceDashboard
      key={view}
      categories={data.categories as any}
      insights={data.insights as any}
      monthlyTrend={data.monthlyTrend}
      monthlyChallanTrend={data.monthlyChallanTrend as any}
      historicalStats={data.historicalStats}
      expiryUrgencyItems={data.expiryUrgencyItems as any}
      categoryDrilldowns={data.categoryDrilldowns as any}
      vehicles={data.vehicles as any}
      drivers={data.drivers}
      vehicleHistory={data.vehicleHistory as any}
      onCategorySelect={(id: CategoryId) => console.log('Category selected:', id)}
      onBackToOverview={() => console.log('Back to overview')}
      onDateRangeChange={(preset: DateRangePreset) => console.log('Date range:', preset)}
      onScopeChange={(scope: ScopeFilter, id?: string) => console.log('Scope:', scope, id)}
      initialView={view}
    />
  )
}
