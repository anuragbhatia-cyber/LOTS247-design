// =============================================================================
// Data Types
// =============================================================================

export type VehicleCategory = 'owned' | 'leased' | 'rented'

export type VehicleStatus = 'active' | 'inactive'

export type DocumentType = 'insurance' | 'puc' | 'fitness' | 'rc'

export type DocumentStatus = 'valid' | 'expiring-soon' | 'expired'

export type LicenseStatus = 'valid' | 'expiring-soon' | 'expired'

export interface VehicleDocument {
  id: string
  type: DocumentType
  name: string
  expiry: string
  status: DocumentStatus
}

export interface Vehicle {
  id: string
  rcNumber: string
  vehicleType: string
  make: string
  model: string
  year: number
  category: VehicleCategory
  complianceScore: number
  insuranceExpiry: string
  pucExpiry: string
  fitnessExpiry: string
  status: VehicleStatus
  assignedDriverId: string | null
  documents: VehicleDocument[]
}

export interface Driver {
  id: string
  name: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
  licenseStatus: LicenseStatus
  assignedVehicleIds: string[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface VehicleAndDriverManagementProps {
  /** The list of vehicles to display */
  vehicles: Vehicle[]
  /** The list of drivers to display */
  drivers: Driver[]
  /** Called when user wants to view a vehicle's details */
  onViewVehicle?: (id: string) => void
  /** Called when user wants to add a new vehicle via RC number */
  onAddVehicle?: () => void
  /** Called when user wants to bulk upload vehicles via CSV */
  onBulkUpload?: () => void
  /** Called when user wants to edit a vehicle's details */
  onEditVehicle?: (id: string) => void
  /** Called when user wants to delete a vehicle */
  onDeleteVehicle?: (id: string) => void
  /** Called when user wants to change a vehicle's category */
  onChangeCategory?: (id: string, category: VehicleCategory) => void
  /** Called when user wants to assign a driver to a vehicle */
  onAssignDriver?: (vehicleId: string, driverId: string) => void
  /** Called when user searches the vehicle list */
  onSearch?: (query: string) => void
  /** Called when user applies filters */
  onFilter?: (filters: VehicleFilters) => void
}

export interface VehicleFilters {
  category?: VehicleCategory
  expiryStatus?: DocumentStatus
  complianceScoreMin?: number
  complianceScoreMax?: number
}

export interface VehicleDetailProps {
  /** The vehicle to display */
  vehicle: Vehicle
  /** The driver assigned to this vehicle, if any */
  driver: Driver | null
  /** All available drivers for assignment */
  drivers: Driver[]
  /** Called when user wants to go back to the vehicle list */
  onBack?: () => void
  /** Called when user wants to edit the vehicle */
  onEdit?: () => void
  /** Called when user wants to delete the vehicle */
  onDelete?: () => void
  /** Called when user wants to change the vehicle's category */
  onChangeCategory?: (category: VehicleCategory) => void
  /** Called when user wants to assign or change the driver */
  onAssignDriver?: (driverId: string) => void
}
