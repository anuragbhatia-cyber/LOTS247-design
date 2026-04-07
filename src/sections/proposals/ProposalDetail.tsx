import { useState } from 'react'
import data from '@/../product/sections/proposals/data.json'
import { ProposalDetail } from './components/ProposalDetail'

export default function ProposalDetailPreview() {
  const params = new URLSearchParams(window.location.search)
  const proposalId = params.get('id') || 'prp-001'

  const proposal = data.proposals.find((p) => p.id === proposalId) || data.proposals[0]
  const activities = data.proposalActivities.filter((a) => a.proposalId === proposal.id)

  const BASE = '/sections/proposals/screen-designs'

  function navigateToScreen(screenName: string, extraParams?: Record<string, string>) {
    const embed = params.get('embed') === 'true' ? 'embed=true' : ''
    const extra = extraParams
      ? Object.entries(extraParams).map(([k, v]) => `${k}=${v}`).join('&')
      : ''
    const qs = [embed, extra].filter(Boolean).join('&')
    window.location.href = `${BASE}/${screenName}/fullscreen${qs ? `?${qs}` : ''}`
  }

  return (
    <ProposalDetail
      proposal={proposal}
      activities={activities}
      onCancel={() => console.log('Cancel proposal:', proposal.id)}
      onBack={() => navigateToScreen('ProposalManagement')}
    />
  )
}
