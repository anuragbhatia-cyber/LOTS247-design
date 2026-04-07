import { useState } from 'react'
import data from '@/../product/sections/proposals/data.json'
import { ProposalList } from './components/ProposalList'
import { ProposalDetail } from './components/ProposalDetail'

export default function ProposalManagementPreview() {
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null)

  if (selectedProposalId) {
    const proposal = data.proposals.find((p) => p.id === selectedProposalId) || data.proposals[0]
    const activities = data.proposalActivities.filter((a) => a.proposalId === proposal.id)

    return (
      <ProposalDetail
        proposal={proposal}
        activities={activities}
        onCancel={() => console.log('Cancel proposal:', proposal.id)}
        onBack={() => setSelectedProposalId(null)}
      />
    )
  }

  return (
    <ProposalList
      proposals={data.proposals}
      onView={(id) => setSelectedProposalId(id)}
      onFollowUp={(id) => setSelectedProposalId(id)}
      onCancel={(id) => console.log('Cancel proposal:', id)}
    />
  )
}
