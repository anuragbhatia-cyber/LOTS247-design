import data from '@/../product/sections/api-catalogue/data.json'
import { ApiCatalogue } from './components/ApiCatalogue'

export default function ApiCatalogueView() {
  return (
    <ApiCatalogue
      apis={data.apis}
    />
  )
}
