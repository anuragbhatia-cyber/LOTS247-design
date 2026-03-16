import data from '@/../product/sections/incident-management/data.json'
import { CaseDetail } from './components/CaseDetail'

const BASE = '/sections/incident-management/screen-designs'

function navigateToScreen(screenName: string) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? '?embed=true' : ''
  window.location.href = `${BASE}/${screenName}/fullscreen${embed}`
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
  const comments = data.comments.filter(
    (c) => c.entityType === 'case' && c.entityId === caseItem.id
  )

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
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
        onAddComment={(msg) => console.log('Add comment:', msg)}
        onBack={() => navigateToScreen('CaseList')}
      />
    </div>
  )
}
