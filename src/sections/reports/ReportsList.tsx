import data from '@/../product/sections/reports/data.json'
import { ReportsList } from './components/ReportsList'

export default function ReportsListPreview() {
  return (
    <ReportsList
      reports={data.reports}
      onPreview={(id) => console.log('Preview report:', id)}
      onDownload={(id) => console.log('Download report:', id)}
      onShareEmail={(id) => console.log('Share via email:', id)}
      onShareWhatsApp={(id) => console.log('Share via WhatsApp:', id)}
      onSearch={(query) => console.log('Search:', query)}
      onTabChange={(tab) => console.log('Tab changed:', tab)}
    />
  )
}
