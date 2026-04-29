# Compliance Dashboard — Fleet Compliance Monitoring

## Overview

The Compliance Dashboard provides a centralized view of fleet-wide compliance health across 8 categories. Fleet managers can monitor expiring documents, identify non-compliant vehicles, drill down into specific categories, and track compliance trends over time.

## User Flows

1. **Dashboard Overview** — User sees 8 compliance category cards (RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT) with count badges for non-compliant items.
2. **Category Drill-Down** — Tapping a category card opens a filtered vehicle list showing only vehicles with issues in that category.
3. **Vehicle-Wise Report** — User selects a specific vehicle to see its full compliance breakdown across all 8 categories in VehicleWiseReport.
4. **Filters** — User filters by status (Compliant, Expiring Soon, Expired, Not Available), date range, or vehicle group.
5. **Insights & Trends** — A collapsible insights panel shows month-over-month compliance trend charts and actionable recommendations.
6. **Export** — User exports compliance report as CSV or PDF.

## Design Decisions

- Category cards are arranged in a 2x4 grid on mobile, 4x2 on desktop.
- Color coding: green (compliant), amber (expiring within 30 days), red (expired), gray (not available).
- Drill-down uses a slide-in panel on desktop, full-screen on mobile.
- Trend charts use simple bar/line charts without heavy chart libraries.
- NTBT = "No Tax Been Paid" — a flag for vehicles behind on road tax.

## Data Used

- `product/sections/compliance-dashboard/data.json` — Sample compliance stats, vehicle compliance records, trend data.
- `product/sections/compliance-dashboard/types.ts` — ComplianceCategory, VehicleCompliance, ComplianceTrend, ComplianceFilter.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| ComplianceDashboard | ComplianceDashboard.tsx | Top-level dashboard with category grid |
| VehicleWiseReport | VehicleWiseReport.tsx | Per-vehicle compliance breakdown |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onCategorySelect | ComplianceDashboard | `(category: string) => void` | Opens category drill-down |
| onVehicleSelect | ComplianceDashboard | `(vehicleId: string) => void` | Opens vehicle-wise report |
| onFilterChange | ComplianceDashboard | `(filters: ComplianceFilter) => void` | Applies filters |
| onExport | ComplianceDashboard | `(format: "csv" \| "pdf") => void` | Triggers report export |
| onBack | VehicleWiseReport | `() => void` | Returns to dashboard |
