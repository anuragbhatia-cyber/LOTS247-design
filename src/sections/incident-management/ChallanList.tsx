import data from '@/../product/sections/incident-management/data.json'
import { ChallanList } from './components/ChallanList'

const BASE = '/sections/incident-management/screen-designs'

function navigateToScreen(screenName: string, extraParams?: Record<string, string>) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? 'embed=true' : ''
  const extra = extraParams
    ? Object.entries(extraParams).map(([k, v]) => `${k}=${v}`).join('&')
    : ''
  const qs = [embed, extra].filter(Boolean).join('&')
  window.location.href = `${BASE}/${screenName}/fullscreen${qs ? `?${qs}` : ''}`
}

export default function ChallanListPreview() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <ChallanList
        challans={data.challans}
        vehicles={data.vehicles}
        drivers={data.drivers}
        onView={(id) => navigateToScreen('ChallanDetail', { id })}
        onPay={(id) => console.log('Pay challan:', id)}
        onDispute={(id) => console.log('Dispute challan:', id)}
        onEscalateToCase={(id) => console.log('Escalate to case:', id)}
        onDownloadReceipt={(id) => console.log('Download receipt:', id)}
        onRequestRefund={(id) => console.log('Request refund:', id)}
      />
    </div>
  )
}
