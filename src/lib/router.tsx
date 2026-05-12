import { createBrowserRouter } from 'react-router-dom'
import { ProductPage } from '@/components/ProductPage'
import { DataModelPage } from '@/components/DataModelPage'
import { DesignPage } from '@/components/DesignPage'
import { SectionsPage } from '@/components/SectionsPage'
import { SectionPage } from '@/components/SectionPage'
import { ScreenDesignPage, ScreenDesignFullscreen } from '@/components/ScreenDesignPage'
import { ShellDesignPage, ShellDesignFullscreen } from '@/components/ShellDesignPage'
import { ExportPage } from '@/components/ExportPage'
import { FullPreviewPage } from '@/pages/FullPreviewPage'
import IncidentSummaryReportPreview from '../../Exported-reports/IncidentSummaryReportPreview'
import IncidentClosureReportPreview from '../../Exported-reports/IncidentClosureReportPreview'
import MonthlyIncidentSummaryReportPreview from '../../Exported-reports/MonthlyIncidentSummaryReportPreview'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductPage />,
  },
  {
    path: '/data-model',
    element: <DataModelPage />,
  },
  {
    path: '/design',
    element: <DesignPage />,
  },
  {
    path: '/sections',
    element: <SectionsPage />,
  },
  {
    path: '/sections/:sectionId',
    element: <SectionPage />,
  },
  {
    path: '/sections/:sectionId/screen-designs/:screenDesignName',
    element: <ScreenDesignPage />,
  },
  {
    path: '/sections/:sectionId/screen-designs/:screenDesignName/fullscreen',
    element: <ScreenDesignFullscreen />,
  },
  {
    path: '/shell/design',
    element: <ShellDesignPage />,
  },
  {
    path: '/shell/design/fullscreen',
    element: <ShellDesignFullscreen />,
  },
  {
    path: '/preview',
    element: <FullPreviewPage />,
  },
  {
    path: '/export',
    element: <ExportPage />,
  },
  {
    path: '/report-preview/incident-summary',
    element: <IncidentSummaryReportPreview />,
  },
  {
    path: '/report-preview/incident-closure',
    element: <IncidentClosureReportPreview />,
  },
  {
    path: '/report-preview/monthly-incident-summary',
    element: <MonthlyIncidentSummaryReportPreview />,
  },
])
