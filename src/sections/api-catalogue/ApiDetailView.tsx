import data from '@/../product/sections/api-catalogue/data.json'
import { ApiDetail } from './components/ApiDetail'

export default function ApiDetailView() {
  // Show the first API as default preview
  const api = data.apis[0]

  return (
    <ApiDetail
      api={api}
      onBack={() => console.log('Back to catalogue')}
      onContactSubmit={(apiId, message) => console.log('Contact enquiry for:', apiId, message)}
    />
  )
}
