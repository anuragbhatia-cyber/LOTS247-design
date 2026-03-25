import data from '@/../product/sections/proposals/data.json'
import { ProposalList } from './components/ProposalList'

const BASE = '/sections/proposals/screen-designs'

function navigateToScreen(screenName: string, extraParams?: Record<string, string>) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? 'embed=true' : ''
  const extra = extraParams
    ? Object.entries(extraParams).map(([k, v]) => `${k}=${v}`).join('&')
    : ''
  const qs = [embed, extra].filter(Boolean).join('&')
  window.location.href = `${BASE}/${screenName}/fullscreen${qs ? `?${qs}` : ''}`
}

export default function ProposalManagementPreview() {
  return (
    <ProposalList
      proposals={data.proposals}
      onView={(id) => navigateToScreen('ProposalDetail', { id })}
      onFollowUp={(id) => navigateToScreen('ProposalDetail', { id, tab: 'followup' })}
      onCancel={(id) => console.log('Cancel proposal:', id)}
    />
  )
}
