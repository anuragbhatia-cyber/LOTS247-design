# Reports — Report Browsing & Download

## Overview

The Reports section provides a browsable catalog of fleet management reports. Reports are categorized into tabs (All, MIS, ICR, ISR, MIS-CHALLAN) and can be previewed as PDFs, downloaded, or shared. Each report card displays the report title, date, category, and file size.

## User Flows

1. **Browse Reports** — User sees a list of report cards organized under category tabs (All, MIS, ICR, ISR, MIS-CHALLAN).
2. **Filter by Tab** — Tapping a tab filters the list to show only reports of that category.
3. **PDF Preview** — Tapping a report card opens an in-app PDF preview.
4. **Download** — User taps the download icon to save the PDF locally.
5. **Share** — User taps the share icon to share the report via native share sheet or copy link.

## Design Decisions

- Tab bar at the top with horizontal scroll for 5 category tabs.
- Report cards show: title, date generated, category badge, file size, download and share icons.
- PDF preview uses an embedded viewer on desktop, native PDF viewer on mobile.
- Reports are generated server-side and listed in reverse chronological order.
- MIS = Management Information System, ICR = Insurance Claim Report, ISR = Incident Summary Report.

## Data Used

- `product/sections/reports/data.json` — Sample report entries with metadata.
- `product/sections/reports/types.ts` — Report, ReportCategory.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| ReportsList | ReportsList.tsx | Tabbed report catalog with cards |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onReportSelect | ReportsList | `(reportId: string) => void` | Opens PDF preview |
| onDownload | ReportsList | `(reportId: string) => void` | Downloads report PDF |
| onShare | ReportsList | `(reportId: string) => void` | Shares report link |
| onTabChange | ReportsList | `(tab: string) => void` | Switches category tab |
