import { useState, useEffect } from 'react'
import data from '@/../product/sections/proposals/data.json'
import complianceData from '@/../product/sections/compliance-dashboard/data.json'
import { ProposalList } from './components/ProposalList'
import { ProposalDetail } from './components/ProposalDetail'
import { ProposalManagementSkeleton } from './components/ProposalManagementSkeleton'
import { ComplianceDashboard } from '@/sections/compliance-dashboard/components/ComplianceDashboard'
import type { CategoryId, DateRangePreset, ScopeFilter } from '@/../product/sections/compliance-dashboard/types'

type Screen =
  | { type: 'list' }
  | { type: 'detail'; proposalId: string }
  | { type: 'compliance-drilldown'; drilldownType: 'challan' | 'rc' | 'dl' }

export default function ProposalManagementPreview() {
  const [screen, setScreen] = useState<Screen>({ type: 'list' })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (isLoading && screen.type === 'list') return <ProposalManagementSkeleton />

  if (screen.type === 'detail') {
    const proposal = data.proposals.find((p) => p.id === screen.proposalId) || data.proposals[0]
    const activities = data.proposalActivities.filter((a) => a.proposalId === proposal.id)
    const comments = (data.comments ?? []).filter((c) => c.entityId === proposal.id)

    return (
      <ProposalDetail
        proposal={proposal}
        activities={activities}
        comments={comments}
        onAddComment={(message) => console.log('Add comment to', proposal.id, ':', message)}
        onCancel={() => console.log('Cancel proposal:', proposal.id)}
        onBack={() => setScreen({ type: 'list' })}
      />
    )
  }

  if (screen.type === 'compliance-drilldown') {
    return (
      <ComplianceDashboard
        key={screen.drilldownType}
        categories={complianceData.categories as any}
        insights={complianceData.insights as any}
        monthlyTrend={complianceData.monthlyTrend}
        monthlyChallanTrend={complianceData.monthlyChallanTrend as any}
        historicalStats={complianceData.historicalStats}
        expiryUrgencyItems={complianceData.expiryUrgencyItems as any}
        categoryDrilldowns={complianceData.categoryDrilldowns as any}
        vehicles={complianceData.vehicles as any}
        drivers={complianceData.drivers}
        vehicleHistory={complianceData.vehicleHistory as any}
        onCategorySelect={(id: CategoryId) => console.log('Category selected:', id)}
        onBackToOverview={() => setScreen({ type: 'list' })}
        onDateRangeChange={(preset: DateRangePreset) => console.log('Date range:', preset)}
        onScopeChange={(scope: ScopeFilter, id?: string) => console.log('Scope:', scope, id)}
        initialView={screen.drilldownType}
      />
    )
  }

  return (
    <ProposalList
      proposals={data.proposals}
      onView={(id) => setScreen({ type: 'detail', proposalId: id })}
      onFollowUp={(id) => setScreen({ type: 'detail', proposalId: id })}
      onCancel={(id) => console.log('Cancel proposal:', id)}
      onCreateRequest={(type) => setScreen({ type: 'compliance-drilldown', drilldownType: type })}
    />
  )
}
