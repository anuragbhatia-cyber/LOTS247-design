# Milestone 4: Compliance Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Compliance Dashboard — a fleet-level compliance monitoring view with real-time scores, category breakdowns, and drill-down capability.

## Overview

A view-only analytics dashboard providing real-time visibility into document validity, government flags, and compliance health across all vehicles and drivers. Designed for fleet managers overseeing 50-500+ vehicles who need aggregate insights with drill-down capability. All actions (document uploads, renewals) happen in their respective sections.

**Key Functionality:**
- Overall fleet compliance score (0-100) with ring visualization
- 8 category cards: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT
- Date range filtering and scope toggle (Fleet/Vehicle/Driver)
- Category drill-down with vehicle-level breakdown
- Auto-generated insights panel and monthly trend chart
- Expiry urgency table sorted by soonest expiry

## Recommended Approach: Test-Driven Development

See `product-plan/sections/compliance-dashboard/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/compliance-dashboard/components/`:

- `ComplianceDashboard.tsx` — Main dashboard with score, categories, insights, trends, and urgency table

### Data Layer

- Overall compliance score calculation (weighted across categories)
- Per-category compliance counts (compliant/total)
- Monthly trend data points
- Expiry urgency data with days-remaining calculations
- Auto-generated insights from data analysis
- Scope filtering (fleet-wide, per-vehicle, per-driver)

### Callbacks

| Callback | Description |
|----------|-------------|
| `onCategoryClick` | Opens category drill-down view |
| `onDateRangeChange` | Updates date filter for all data |
| `onScopeChange` | Switches between Fleet/Vehicle/Driver scope |
| `onVehicleSelect` | Selects specific vehicle in Vehicle scope |
| `onDriverSelect` | Selects specific driver in Driver scope |
| `onBackFromDrilldown` | Returns to Fleet Overview |

### Empty States

- **New account with no vehicles:** Show zero compliance state with prompt to add vehicles
- **No expiring documents:** Show "All documents current" in urgency table
- **Category with zero vehicles:** Show 0/0 with appropriate messaging

## Expected User Flows

### Flow 1: View Fleet Compliance
1. User navigates to Compliance Dashboard
2. User sees overall score ring, 8 category cards, insights, trends, urgency table
3. **Outcome:** Complete fleet compliance picture at a glance

### Flow 2: Category Drill-Down
1. User clicks the "Insurance" category card
2. Category drill-down view opens with insurance-specific compliance score
3. User sees vehicle-level breakdown table
4. User clicks back button
5. **Outcome:** Returns to Fleet Overview

### Flow 3: Scope Filtering
1. User switches scope toggle to "Vehicle"
2. Vehicle search/select dropdown appears
3. User selects a specific vehicle
4. **Outcome:** All data updates to show that vehicle's compliance across all 8 categories

### Flow 4: Date Range Adjustment
1. User changes date range to "Last 6 Months"
2. **Outcome:** Trend chart and insights update to reflect the selected range

## Files to Reference

- `product-plan/sections/compliance-dashboard/README.md` — Feature overview
- `product-plan/sections/compliance-dashboard/tests.md` — Test instructions
- `product-plan/sections/compliance-dashboard/components/` — React components
- `product-plan/sections/compliance-dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/compliance-dashboard/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Overall compliance score ring renders with correct percentage
- [ ] 8 category cards show compliant/total with status colors
- [ ] Date range filter updates all dashboard data
- [ ] Scope toggle switches between Fleet/Vehicle/Driver views
- [ ] Category drill-down shows vehicle-level breakdown
- [ ] Permits drill-down shows sub-breakdown by permit type
- [ ] Blacklisted and NTBT drill-downs show flag/hold details
- [ ] Insights panel shows auto-generated data-driven insights
- [ ] Monthly trend chart adapts to selected date range
- [ ] Expiry urgency table sorted by soonest expiry with badges
- [ ] Empty states display properly
- [ ] Responsive on mobile
