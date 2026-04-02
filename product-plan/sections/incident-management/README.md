# Incident Management Section

The Incident Management section handles challan tracking and legal case management for LOTS247 fleet operations. It provides list views with search/filter/pagination and detail views with tabs for overview, follow-up timeline, reports, and documents.

## Components

| Component | Description |
|---|---|
| `ChallanList` | Full challan list with search, status/type filters, pagination, and desktop table + mobile card layouts |
| `ChallanDetail` | Challan detail view with tabs: Overview (SLA progress, violation details), Follow-up (timeline + comments), Reports (documents), Documents (upload modal) |
| `CaseList` | Case list with search, status/type/vehicle filters, pagination, and desktop table + mobile card layouts |
| `CaseDetail` | Case detail view with tabs: Overview (case info, SLA), Follow-up (timeline + comments), Reports (PDF reports), Documents (upload modal) |

## Data Requirements

- **Challan[]**: Challan records with status, type, amount, SLA deadline
- **Case[]**: Legal case records with status, type, assigned lawyer, SLA deadline
- **Vehicle[]**: Vehicles for resolving vehicleId references
- **Driver[]**: Drivers for resolving driverId references
- **Lawyer[]**: Lawyers for resolving assignedLawyerId references
- **Comment[]**: Comments on challans and cases
- **ChallanActivity[]**: Timeline activities for challans
- **CaseActivity[]**: Timeline activities for cases
- **CaseDocument[]**: Documents attached to cases
- **CaseReport[]**: PDF reports for cases

## External Dependencies

- `lucide-react` - Icon library
- `LanguageContext` - Provides `{ language }` value (`"en"` | `"hi"`) for bilingual support
- Tailwind CSS v4 with `dark:` variant support

## Status Lifecycle

### Challans
`submitted` -> `inProgress` -> `resolved` | `onHold` | `notSettled`

### Cases
`submitted` -> `inProgress` -> `resolved` | `documentRequested` | `extended`

## Key Patterns

- SLA progress bar shows time remaining until deadline with color coding
- Timeline activities include status changes, payment attempts, lawyer assignments, notes
- Comment system supports user and team author types
- Document upload modal with drag-and-drop file selection
- Mobile-responsive: table on desktop, card layout on mobile
- All text supports English/Hindi bilingual rendering
- Pagination with configurable page size (10 items default)
- Filter pills show active filters with clear buttons
