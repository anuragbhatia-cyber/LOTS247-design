import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import data from '@/../product/sections/proposals/data.json'
import complianceData from '@/../product/sections/compliance-dashboard/data.json'
import { ProposalList } from './components/ProposalList'
import { ProposalDetail } from './components/ProposalDetail'
import { ComplianceDashboard } from '@/sections/compliance-dashboard/components/ComplianceDashboard'
import type { CategoryId, DateRangePreset, ScopeFilter } from '@/../product/sections/compliance-dashboard/types'

type Screen =
  | { type: 'list' }
  | { type: 'detail'; proposalId: string }
  | { type: 'compliance-drilldown'; drilldownType: 'challan' | 'rc' | 'dl' }

export default function ProposalManagementPreview() {
  const [screen, setScreen] = useState<Screen>({ type: 'list' })

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
    const drilldownLabel = screen.drilldownType === 'challan' ? 'All Vehicle Challans' : screen.drilldownType === 'rc' ? 'Registration Certificates' : 'Driving Licenses'

    return (
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setScreen({ type: 'list' })}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            </button>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">{drilldownLabel}</h2>
          </div>
        </div>
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
      </div>
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
