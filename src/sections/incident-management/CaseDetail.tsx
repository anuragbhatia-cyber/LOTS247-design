import { useState } from 'react'
import data from '@/../product/sections/incident-management/data.json'
import { CaseDetail } from './components/CaseDetail'

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

export default function CaseDetailPreview() {
  const params = new URLSearchParams(window.location.search)
  const caseId = params.get('id') || 'cas-001'
  const caseItem = data.cases.find((c) => c.id === caseId) || data.cases[0]
  const vehicle = data.vehicles.find((v) => v.id === caseItem.vehicleId)!
  const driver = caseItem.driverId
    ? data.drivers.find((d) => d.id === caseItem.driverId) || null
    : null
  const lawyer = caseItem.assignedLawyerId
    ? data.lawyers.find((l) => l.id === caseItem.assignedLawyerId) || null
    : null
  const activities = data.caseActivities.filter(
    (a) => a.caseId === caseItem.id
  )
  const documents = data.caseDocuments.filter(
    (d) => d.caseId === caseItem.id
  )
  const reports = data.caseReports.filter(
    (r) => r.caseId === caseItem.id
  )
  const initialComments = data.comments.filter(
    (c) => c.entityType === 'case' && c.entityId === caseItem.id
  )

  const [comments, setComments] = useState(initialComments)

  const handleAddComment = (msg: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: `cmt-${Date.now()}`,
        entityType: 'case' as const,
        entityId: caseItem.id,
        authorType: 'user' as const,
        authorName: 'Rajesh Kumar',
        message: msg,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <CaseDetail
        caseData={caseItem}
        vehicle={vehicle}
        driver={driver}
        lawyer={lawyer}
        activities={activities}
        documents={documents}
        reports={reports}
        comments={comments}
        onUploadDocument={(file) => console.log('Upload document:', file.name)}
        onAddComment={handleAddComment}
        onBack={() => navigateToScreen('IncidentManagement', { tab: 'cases' })}
      />
    </div>
  )
}
