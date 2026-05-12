import { useEffect, useState } from 'react'
import data from '@/../product/sections/api-catalogue/data.json'
import { ApiCatalogue } from './components/ApiCatalogue'
import { ApiCatalogueSkeleton } from './components/ApiCatalogueSkeleton'

export default function ApiCatalogueView() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (isLoading) return <ApiCatalogueSkeleton />
  return (
    <ApiCatalogue
      apis={data.apis}
    />
  )
}
