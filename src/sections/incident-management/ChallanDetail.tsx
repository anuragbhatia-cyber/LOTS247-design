import { useState } from 'react'
import data from '@/../product/sections/incident-management/data.json'
import { ChallanDetail } from './components/ChallanDetail'

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

export default function ChallanDetailPreview() {
  const params = new URLSearchParams(window.location.search)
  const challanId = params.get('id') || 'chl-005'
  const challan = data.challans.find((c) => c.id === challanId) || data.challans[0]
  const vehicle = data.vehicles.find((v) => v.id === challan.vehicleId)!
  const driver = challan.driverId
    ? data.drivers.find((d) => d.id === challan.driverId) || null
    : null
  const initialComments = data.comments.filter(
    (c) => c.entityType === 'challan' && c.entityId === challan.id
  )
  const activities = data.challanActivities.filter(
    (a) => a.challanId === challan.id
  )

  const [comments, setComments] = useState(initialComments)

  const handleAddComment = (msg: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: `cmt-${Date.now()}`,
        entityType: 'challan' as const,
        entityId: challan.id,
        authorType: 'user' as const,
        authorName: 'Rajesh Kumar',
        message: msg,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
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
        onAddComment={handleAddComment}
        onBack={() => navigateToScreen('IncidentManagement', { tab: 'challans' })}
      />
    </div>
  )
}
