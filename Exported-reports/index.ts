// Report components moved to src/sections/reports/ so they auto-register as
// screen designs. Re-exported here for any external consumers of this folder.
export { default as IncidentSummaryReport } from '../src/sections/reports/IncidentSummaryReport'
export type { IncidentSummaryReportProps } from '../src/sections/reports/IncidentSummaryReport'
export { default as IncidentSummaryReportPreview } from '../src/sections/reports/IncidentSummaryReportPreview'

export { default as IncidentClosureReport } from '../src/sections/reports/IncidentClosureReport'
export type { IncidentClosureReportProps } from '../src/sections/reports/IncidentClosureReport'
export { default as IncidentClosureReportPreview } from '../src/sections/reports/IncidentClosureReportPreview'

export { default as MonthlyIncidentSummaryReport } from '../src/sections/reports/MonthlyIncidentSummaryReport'
export type { MonthlyIncidentSummaryReportProps } from '../src/sections/reports/MonthlyIncidentSummaryReport'
export { default as MonthlyIncidentSummaryReportPreview } from '../src/sections/reports/MonthlyIncidentSummaryReportPreview'
