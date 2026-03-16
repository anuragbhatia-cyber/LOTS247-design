import data from '@/../product/sections/vehicle-and-driver-management/data.json'
import { VehicleDetail } from './components/VehicleDetail'

const BASE = '/sections/vehicle-and-driver-management/screen-designs'

function navigateToScreen(screenName: string) {
  const params = new URLSearchParams(window.location.search)
  const embed = params.get('embed') === 'true' ? '?embed=true' : ''
  window.location.href = `${BASE}/${screenName}/fullscreen${embed}`
}

export default function VehicleDetailPreview() {
  const params = new URLSearchParams(window.location.search)
  const vehicleId = params.get('id') || 'veh-002'
  const vehicle = data.vehicles.find((v) => v.id === vehicleId) || data.vehicles[0]
  const driver = vehicle.assignedDriverId
    ? data.drivers.find((d) => d.id === vehicle.assignedDriverId) || null
    : null

  return (
    <VehicleDetail
      vehicle={vehicle}
      driver={driver}
      drivers={data.drivers as any}
      onBack={() => navigateToScreen('VehicleList')}
      onEdit={() => console.log('Edit vehicle:', vehicle.id)}
      onDelete={() => console.log('Delete vehicle:', vehicle.id)}
      onChangeCategory={(cat) => console.log('Change category:', cat)}
      onAssignDriver={(driverId) => console.log('Assign driver:', driverId, 'to vehicle:', vehicle.id)}
    />
  )
}
