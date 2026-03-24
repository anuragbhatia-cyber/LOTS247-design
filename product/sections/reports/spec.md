# Reports Specification

## Overview
A report browsing section where fleet owners/admins can view, download, and share system-generated reports. Reports are organized by type via tabs (MIS, ICR, ISR, MIS-CHALLAN) with a combined "All" view as the default landing.

## Report Types
- **MIS** — Monthly Incident Summary, auto-generated each month
- **ICR** — Incident Closure Report, generated when an incident is closed
- **ISR** — Incident Summary Report, generated 24 hours after an incident
- **MIS-CHALLAN** — Monthly Challan Summary, auto-generated each month

## User Flows
- User lands on the Reports section and sees all reports in a table with tabs to filter by type
- User can search/filter reports by date, vehicle, or incident reference
- User clicks a report row to open a PDF preview
- User can download the report as PDF
- User can share the report via email or WhatsApp

## UI Requirements
- Tabbed navigation: All | MIS | ICR | ISR | MIS-CHALLAN
- Table columns: Period, Report Type, Format, Generated Date, Action
- PDF preview on report click (modal or detail view)
- Download as PDF action
- Share via email/WhatsApp action
- Search and filter controls above the table
- Reports are read-only and system-generated (no manual creation)
- Recipients: fleet owner/admin only

## Configuration
- shell: true
