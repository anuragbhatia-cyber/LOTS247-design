# Home Section

The Home section serves as the main dashboard for LOTS247 fleet owners and vehicle operators. It provides a comprehensive overview of fleet compliance health, pending alerts, and quick actions for common tasks.

## Components

| Component | Description |
|---|---|
| `HomeView` | Main dashboard view with greeting, quick actions grid, compliance score card, and alerts feed |
| `TopHeader` | Top navigation bar with notification bell dropdown and profile menu |
| `OverviewCard` | Reusable stat card with icon, metric value, subtext, and variant styles (default/warning/danger) |
| `QuickActions` | Action buttons grid for Add Incident, Add Vehicle, Check Challan, Check Compliance |
| `ComplianceScore` | SVG ring chart showing overall fleet compliance score with category breakdown bars |
| `AlertsFeed` | Compact alerts feed card showing recent vehicle compliance alerts |
| `ActivityView` | Full-page alerts list view with urgency-based styling |
| `NotificationsView` | Full notifications list page |
| `VehicleComplianceCheck` | Modal for checking vehicle compliance status by vehicle number |
| `CheckChallanModal` | Modal for checking pending challans by vehicle number |
| `ChallanResultsView` | Results page showing pending/paid challans with tabs |
| `VehicleComplianceResultsView` | Vehicle compliance status with expandable documents and history timeline |
| `AddIncidentModal` | Multi-step modal for reporting incidents (challan/case/RTO/other) |

## Data Requirements

- **Subscriber**: Logged-in user profile (name, email, phone, account type)
- **Subscription**: Active plan details (plan name, status, expiry date, vehicle/driver limits)
- **HomeStats**: Aggregated counts (active vehicles, drivers, pending challans, active incidents)
- **ComplianceScore**: Overall score with per-category breakdown (RC, Insurance, PUC, Permit, DL)
- **AlertItem[]**: Urgency-sorted alerts for expiring documents and pending challans

## External Dependencies

- `lucide-react` - Icon library
- `LanguageContext` - Provides `{ language }` value (`"en"` | `"hi"`) for bilingual support
- Tailwind CSS v4 with `dark:` variant support

## Props Interface

The main `HomeView` component accepts `HomeProps` (see `types.ts`), which includes all data and callback props for navigation actions.

## Key Patterns

- All text is translated using a `Record<Language, Record<string, string>>` pattern
- Quick actions dispatch `postMessage` to the parent window for cross-frame navigation
- Compliance score uses SVG circles for the ring chart
- Alert urgency drives styling: critical (red), warning (amber), notice (yellow)
