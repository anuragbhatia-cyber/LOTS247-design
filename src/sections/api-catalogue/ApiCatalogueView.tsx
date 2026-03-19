import { useState } from 'react'
import data from '@/../product/sections/api-catalogue/data.json'
import { ApiCatalogue } from './components/ApiCatalogue'
import { ApiDetail } from './components/ApiDetail'

export default function ApiCatalogueView() {
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null)

  const selectedApi = data.apis.find((api) => api.id === selectedApiId)

  if (selectedApi) {
    return (
      <ApiDetail
        api={selectedApi}
        onBack={() => setSelectedApiId(null)}
        onContactSubmit={(apiId, message) => console.log('Contact enquiry for:', apiId, message)}
      />
    )
  }

  return (
    <ApiCatalogue
      apis={data.apis}
      onViewDetail={(id) => setSelectedApiId(id)}
    />
  )
}
