# Compliance Dashboard Specification

## Overview
A fleet-level compliance monitoring dashboard that provides real-time visibility into document validity, government flags, and compliance health across all vehicles and drivers. Designed for fleet managers overseeing 50-500+ vehicles who need aggregate insights with drill-down capability. This is a view-only analytics dashboard — all actions (document uploads, renewals, etc.) happen in their respective sections.

## User Flows
- User lands on Compliance Dashboard and sees the Fleet Overview with overall compliance score, category cards, insights, trends, and expiry urgency table
- User adjusts the date range filter (This Month / Last 3 Months / Last 6 Months / Last Year / Custom) to change the data window
- User switches scope between Fleet (default), Vehicle-wise, or Driver-wise using the scope toggle
- In Vehicle-wise scope, user selects a specific vehicle to see that vehicle's compliance across all 8 categories
- In Driver-wise scope, user selects a specific driver to see compliance for all vehicles assigned to that driver
- User views the 8 category cards (RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT) showing compliant/total count, percentage, and status color
- User clicks any category card to drill down into a detailed breakdown view for that category
- In Permits drill-down, user sees sub-breakdown by permit type: All India, Nationwide, and State with counts per type
- In Blacklisted drill-down, user sees vehicles flagged by RTO/police with flag details
- In NTBT drill-down, user sees vehicles with government holds preventing transfer/sale
- User views the insights panel showing 3-4 auto-generated insights (e.g., "12 PUC certificates expiring in next 15 days", "Fleet compliance improved 8% from last month")
- User views the monthly compliance trend chart showing score changes over the selected date range
- User views the expiry urgency table showing vehicles/documents sorted by soonest expiry with urgency badges
- User clicks back button in category drill-down to return to Fleet Overview

## UI Requirements

### Top Bar
- Date range filter with presets: This Month, Last 3 Months, Last 6 Months, Last Year, Custom (date picker)
- Scope toggle: Fleet (default) / Vehicle / Driver
- When Vehicle or Driver scope is selected, a search/select dropdown appears to pick the specific vehicle or driver

### Hero Section — Overall Compliance Score
- Large ring visualization showing overall fleet compliance score (0-100)
- Month-over-month change indicator (e.g., "+3% from last month" or "-2% from last month")
- Color-coded status: Emerald (healthy, 75+), Amber (warning, 50-74), Red (critical, below 50)

### Category Cards Grid
- 8 category cards in a responsive grid (4 columns on desktop, 2 on mobile):
  - **RC** — Registration Certificate validity
  - **Insurance** — Insurance policy status
  - **PUCC** — Pollution Under Control Certificate status
  - **Permits** — Permit validity (with sub-breakdown: All India / Nationwide / State)
  - **DL** — Driving License validity
  - **Challans** — Pending challan count and amount
  - **Blacklisted** — Vehicles flagged by RTO/police (government database)
  - **NTBT** — Not to Be Transferred vehicles with government holds
- Each card shows: compliant count / total count, compliance percentage, status color indicator
- Cards are clickable — opens category drill-down view

### Insights Panel
- 3-4 auto-generated, data-driven insights
- Examples: "12 PUC certificates expiring in next 15 days", "Fleet compliance improved 8% from last month", "3 vehicles have been blacklisted since last check"
- Insights update based on selected date range and scope

### Monthly Trend Chart
- Line chart showing compliance score over time (monthly data points)
- Adapts to the selected date range filter
- Shows overall score trend; in drill-down view, shows category-specific trend

### Expiry Urgency Table
- Table listing vehicles/documents sorted by soonest expiry date
- Columns: Vehicle (RC number), Document Type, Expiry Date, Days Remaining, Urgency
- Urgency badges: Expired (red), Expiring in 7 days (red), Expiring in 15 days (amber), Expiring in 30 days (yellow)
- Sortable and filterable

### Category Drill-down View
- Shown when user clicks a category card
- Back button to return to Fleet Overview
- Category-specific compliance score with trend
- Vehicle-level breakdown table showing each vehicle's status for that category
- For **Permits**: Additional sub-breakdown by type (All India / Nationwide / State) showing counts per type
- For **Blacklisted**: Shows flag reason, flagging authority, and date
- For **NTBT**: Shows hold reason, issuing authority, and date
- Filterable and sortable table

## Configuration
- shell: true
