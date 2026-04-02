# Compliance Dashboard Section

The Compliance Dashboard provides a comprehensive view of fleet-wide compliance health across 8 document categories. It includes drill-down views, trend charts, vehicle-level compliance status, and expiry urgency tracking.

## Components

| Component | Description |
|---|---|
| `ComplianceDashboard` | Main dashboard with fleet compliance score, category cards, trend charts, drill-down views, and expiry urgency table. This is a large, feature-rich component (~2400 lines) containing multiple sub-components. |

### Sub-components (internal to ComplianceDashboard)

| Sub-component | Description |
|---|---|
| `ScoreRing` | SVG ring chart for overall compliance score |
| `CategoryCard` | Individual category compliance card with progress bar |
| `TrendChart` | SVG line/bar chart for monthly trend data |
| `ChallanTrendChart` | Challan-specific trend visualization |
| `DrilldownTable` | Reusable table wrapper for category drill-downs |
| `StatusBadge` | Status indicator badge |
| `CategoryDrilldownView` | Full drill-down with filter tabs for each of the 8 categories |
| `FleetChallanView` | Fleet-wide challan view with vehicle grouping and select/proposal actions |
| `FleetRcView` | RC validity view with valid/expiring/invalid tabs |
| `FleetDlView` | Driving license view with validity filtering |
| `ProposalToast` | Toast notification for proposal submission |

## Categories

The dashboard tracks 8 compliance categories:
1. **RC** - Registration Certificate
2. **Insurance** - Motor Insurance
3. **PUCC** - Pollution Under Control Certificate
4. **Permits** - Vehicle Permits (All India, Nationwide, State)
5. **DL** - Driving License
6. **Challans** - Pending Traffic Challans
7. **Blacklisted** - Blacklisted vehicles
8. **NTBT** - Not Be Transferred (vehicle holds)

## Data Requirements

- **ComplianceCategory[]**: 8 categories with compliance percentages and status
- **Insight[]**: Auto-generated compliance insights (positive/warning/critical)
- **MonthlyTrendPoint[]**: Monthly compliance score data for line chart
- **MonthlyChallanTrendPoint[]**: Monthly challan count/amount data for bar chart
- **HistoricalStats**: Fleet snapshot (vehicles, drivers, renewals, challans paid)
- **ExpiryUrgencyItem[]**: Documents sorted by soonest expiry
- **CategoryDrilldowns**: Per-category vehicle-level drill-down data (8 arrays)
- **Vehicle[]**: Fleet vehicles for scope selector
- **Driver[]**: Fleet drivers for scope selector
- **VehicleHistory**: Per-vehicle timeline events

## External Dependencies

- `lucide-react` - Icon library
- Tailwind CSS v4 with `dark:` variant support

## Key Patterns

- Supports 3 scope modes: Fleet (overview), Vehicle (single vehicle), Driver (single driver)
- Category drill-downs show vehicle-level data with expandable details
- Fleet Challan/RC/DL views support multi-select and bulk proposal actions
- Date range filter with presets (This Month, Last 3 Months, Last 6 Months, Last Year)
- Trend chart renders using pure SVG (no chart library dependency)
- Vehicle scope shows compliance status expandable accordion + vehicle history timeline
- Check Vehicle modal allows quick lookup by vehicle number
