import data from '@/../product/sections/incident-management/data.json'
import { ChallanDetail } from './components/ChallanDetail'

const BASE = '/sections/incident-management/screen-designs'

function navigateToScreen(screenName: string) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? '?embed=true' : ''
  window.location.href = `${BASE}/${screenName}/fullscreen${embed}`
}

export default function ChallanDetailPreview() {
  const params = new URLSearchParams(window.location.search)
  const challanId = params.get('id') || 'chl-005'
  const challan = data.challans.find((c) => c.id === challanId) || data.challans[0]
  const vehicle = data.vehicles.find((v) => v.id === challan.vehicleId)!
  const driver = challan.driverId
    ? data.drivers.find((d) => d.id === challan.driverId) || null
    : null
  const comments = data.comments.filter(
    (c) => c.entityType === 'challan' && c.entityId === challan.id
  )
  const activities = data.challanActivities.filter(
    (a) => a.challanId === challan.id
  )

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <ChallanDetail
        challan={challan}
        vehicle={vehicle}
        driver={driver}
        comments={comments}
        activities={activities}
        onPay={() => console.log('Pay challan:', challan.id)}
        onDispute={() => console.log('Dispute challan:', challan.id)}
        onEscalateToCase={() => console.log('Escalate to case:', challan.id)}
        onDownloadReceipt={() => console.log('Download receipt:', challan.id)}
        onRequestRefund={() => console.log('Request refund:', challan.id)}
        onAddComment={(msg) => console.log('Add comment:', msg)}
        onBack={() => navigateToScreen('ChallanList')}
      />
    </div>
  )
}
