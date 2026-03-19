import data from '@/../product/sections/incident-management/data.json'
import { CaseList } from './components/CaseList'

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

export default function CaseListPreview() {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <CaseList
        cases={data.cases}
        vehicles={data.vehicles}
        drivers={data.drivers}
        lawyers={data.lawyers}
        onView={(id) => navigateToScreen('CaseDetail', { id })}
        onCreate={() => console.log('Create new case')}
      />
    </div>
  )
}
