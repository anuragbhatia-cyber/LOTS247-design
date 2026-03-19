// =============================================================================
// Data Types
// =============================================================================

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
}

export interface ApiFeature {
  title: string
  description: string
}

export interface Api {
  id: string
  name: string
  provider: string
  shortDescription: string
  fullDescription: string
  documentationUrl: string
  category: string
  icon: string
  features: ApiFeature[]
  endpoints: ApiEndpoint[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface ApiCatalogueProps {
  /** The list of APIs to display in the catalogue */
  apis: Api[]
  /** Called when user clicks on an API card to view details */
  onViewDetail?: (id: string) => void
}

export interface ApiDetailProps {
  /** The API to display on the detail page */
  api: Api
  /** Called when user clicks the back button */
  onBack?: () => void
  /** Called when user submits a contact/pricing enquiry */
  onContactSubmit?: (apiId: string, message: string) => void
}
