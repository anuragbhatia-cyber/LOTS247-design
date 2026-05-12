import { useEffect, useState } from 'react'
import data from '@/../product/sections/vehicle-and-driver-management/data.json'
import { VehicleList } from './components/VehicleList'
import { VehicleListSkeleton } from './components/VehicleListSkeleton'

const BASE = '/sections/vehicle-and-driver-management/screen-designs'

function navigateToScreen(screenName: string, extraParams?: Record<string, string>) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? 'embed=true' : ''
  const extra = extraParams
    ? Object.entries(extraParams).map(([k, v]) => `${k}=${v}`).join('&')
    : ''
  const qs = [embed, extra].filter(Boolean).join('&')
  window.location.href = `${BASE}/${screenName}/fullscreen${qs ? `?${qs}` : ''}`
}

export default function VehicleListPreview() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (isLoading) return <VehicleListSkeleton />
  return (
    <VehicleList
      vehicles={data.vehicles as any}
      drivers={data.drivers as any}
      onViewVehicle={(id) => navigateToScreen('VehicleDetail', { id })}
      onAddVehicle={() => console.log('Add vehicle')}
      onBulkUpload={() => console.log('Bulk upload')}
      onEditVehicle={(id) => console.log('Edit vehicle:', id)}
      onDeleteVehicle={(id) => console.log('Delete vehicle:', id)}
      onChangeCategory={(id, cat) => console.log('Change category:', id, cat)}
      onAssignDriver={(vId, dId) => console.log('Assign driver:', vId, dId)}
      onSearch={(q) => console.log('Search:', q)}
      onFilter={(f) => console.log('Filter:', f)}
    />
  )
}
