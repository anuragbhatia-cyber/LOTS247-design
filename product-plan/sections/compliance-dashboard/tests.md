# Compliance Dashboard Section - Test Instructions

## ComplianceDashboard - Fleet Overview

### Rendering
- [ ] Shows "Fleet Compliance" heading with subtitle
- [ ] Displays Refresh and Download PDF buttons
- [ ] Shows date range filter dropdown (defaults to "Last 6 Months")
- [ ] Renders Compliance Health card with SVG ring score and category breakdown bars
- [ ] Renders Insights card with positive/warning/critical styled messages
- [ ] Renders Category Cards grid (8 categories: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT)
- [ ] Renders Monthly Challans Trend chart with dual legend
- [ ] Renders Fleet Snapshot card with 4 metric tiles (Vehicles, Drivers, Renewals, Challans)
- [ ] Renders Documents Expiry table with pagination

### Compliance Health Card
- [ ] SVG ring shows overall score percentage
- [ ] Ring color changes based on status (green >= 70, amber >= 50, red < 50)
- [ ] Shows month-over-month change (+/- percentage)
- [ ] Displays first 5 category breakdown bars with percentage labels
- [ ] Info tooltip explains calculation methodology

### Category Cards
- [ ] Each card shows category label, compliant/total count, percentage, and status badge
- [ ] Clicking a card opens CategoryDrilldownView
- [ ] Cards color-coded: green for healthy, amber for warning, red for critical

### Trend Chart
- [ ] Renders SVG line/bar chart from monthlyTrend data
- [ ] Shows month labels on x-axis
- [ ] Displays legend with Challan Count and Total Amount
- [ ] Tooltip shows data point details

### Fleet Snapshot
- [ ] Shows 4 metric tiles: Vehicles, Drivers, Renewals, Challans
- [ ] Challans tile shows total amount
- [ ] Footer shows Avg Score, Best Month, Worst Month

### Documents Expiry Table
- [ ] Shows columns: Vehicle, Document, Expiry Date, Days, Urgency, Action
- [ ] Days column color-coded by severity
- [ ] Urgency badges: Expired (red), Critical (red), Warning (amber), Upcoming (blue)
- [ ] "Raise Proposal" action button dispatches postMessage
- [ ] Pagination shows page numbers and prev/next buttons
- [ ] Page size is 5 items

## Date Range Filter
- [ ] Dropdown shows presets: This Month, Last 3 Months, Last 6 Months, Last Year
- [ ] Selecting a preset closes dropdown and calls onDateRangeChange
- [ ] Selected preset is highlighted in dropdown

## Category Drilldown View
- [ ] Shows back button to return to fleet overview
- [ ] Displays category title and summary stats
- [ ] Shows filter tabs (e.g., All, Valid, Expiring, Expired for RC)
- [ ] Filters update the displayed data
- [ ] Different layouts per category:
  - RC: vehicle cards with RTO office, dates
  - Insurance: vehicle cards with provider, policy number
  - PUCC: vehicle cards with test center
  - Permits: vehicle cards with permit type
  - DL: driver cards with assigned vehicles
  - Challans: vehicle cards with challan counts and amounts
  - Blacklisted: vehicle cards with flag reason
  - NTBT: vehicle cards with hold reason

## Fleet Challan View
- [ ] Shows challan data grouped by vehicle
- [ ] Each vehicle card shows outstanding count, court/online breakdown, total amount
- [ ] Checkbox selection for bulk actions
- [ ] Selected items show in bottom action bar with "Request Proposal" button
- [ ] Proposal toast appears after submission

## Fleet RC View
- [ ] Shows RC data with tabs: All, Valid, Expiring, Invalid
- [ ] Each card shows vehicle number, RTO office, issue/expiry dates
- [ ] Expiring/Invalid tabs show bottom action bar for bulk proposal

## Fleet DL View
- [ ] Shows driving license data with filter tabs
- [ ] Each card shows driver name, license number, expiry, assigned vehicles
- [ ] Vehicle assignments shown as monospace chips

## Vehicle Scope View
- [ ] Selecting a vehicle shows vehicle info header with truck icon
- [ ] Shows Compliance Status accordion with expandable category details
- [ ] Shows Vehicle History timeline with event types and amounts
- [ ] Shows Vehicle Details card with RC, type, make, model, year, status
- [ ] "Back to Fleet" button returns to fleet overview

## Check Vehicle Modal
- [ ] Opens when check vehicle action is triggered
- [ ] Vehicle number input with auto-formatting (uppercase, alphanumeric)
- [ ] Check button finds matching vehicle or falls back to first vehicle
- [ ] Switches to vehicle scope view after check

## Responsive Design
- [ ] Category cards: 2 columns on mobile, 4 on desktop
- [ ] Hero row: stacked on mobile, 2 columns on desktop
- [ ] Trend + Snapshot: stacked on mobile, 3 columns on desktop
- [ ] Compliance status + history: stacked on mobile, 3 columns on desktop
