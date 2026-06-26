import { useEffect, useState } from 'react'
import data from '@/../product/sections/reports/data.json'
import { ReportsList } from './components/ReportsList'
import { ReportsListSkeleton } from './components/ReportsListSkeleton'

export default function ReportsListPreview() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])
  const isEmpty = new URLSearchParams(window.location.search).get('empty') === '1'
  if (isLoading) return <ReportsListSkeleton />
  return (
    <ReportsList
      reports={isEmpty ? [] : data.reports}
      onPreview={(id) => console.log('Preview report:', id)}
      onDownload={(id) => console.log('Download report:', id)}
      onShareEmail={(id) => console.log('Share via email:', id)}
      onShareWhatsApp={(id) => console.log('Share via WhatsApp:', id)}
      onSearch={(query) => console.log('Search:', query)}
      onTabChange={(tab) => console.log('Tab changed:', tab)}
    />
  )
}
