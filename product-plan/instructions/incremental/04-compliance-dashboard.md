# Milestone 4: Compliance Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 6 (Vehicle & Driver Management) recommended

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Compliance Dashboard — a fleet-level, view-only analytics dashboard that gives fleet managers real-time visibility into document validity, government flags, and compliance health across all vehicles and drivers.

## Overview

The Compliance Dashboard is designed for fleet managers overseeing 50-500+ vehicles who need aggregate insights with drill-down capability. It is strictly a view-only analytics surface — all actions (document uploads, renewals, etc.) happen in their respective sections. The dashboard answers: "What is the compliance health of my fleet, what needs attention, and what are the trends?"

**Key Functionality:**
- Overall fleet compliance ring score (0-100) with month-over-month change
- 8 clickable category cards: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT
- Auto-generated insights panel (3-4 data-driven insights)
- Monthly compliance trend line chart
- Expiry urgency table sorted by soonest expiry
- Category drill-down views with vehicle-level breakdown tables
- Filters: date range presets and scope toggle (Fleet / Vehicle / Driver)
- Permits drill-down with sub-breakdown by type (All India / Nationwide / State)
- Blacklisted drill-down with flag details (reason, authority, date)
- NTBT drill-down with hold details (reason, authority, case reference)
- Historical stats summary

## Recommended Approach: Test-Driven Development

See `product-plan/sections/compliance-dashboard/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/compliance-dashboard/components/`:
- `ComplianceDashboard.tsx` — Full dashboard component handling fleet overview, category cards, insights, trends, expiry table, drill-down views, and all filtering

### Data Layer

Key types from `types.ts`: ComplianceScore, ComplianceCategory, CategoryId, Insight, MonthlyTrendPoint, MonthlyChallanTrendPoint, ExpiryUrgencyItem, CategoryDrilldowns (with per-category row types: RcDrilldownRow, InsuranceDrilldownRow, PuccDrilldownRow, PermitDrilldownRow, DlDrilldownRow, ChallanDrilldownRow, BlacklistedDrilldownRow, NtbtDrilldownRow), HistoricalStats, Vehicle, Driver

You'll need to:
- Build a compliance scoring engine that calculates overall and per-category scores
- Create API endpoints to aggregate compliance data across the fleet
- Implement date range filtering (This Month, Last 3 Months, Last 6 Months, Last Year, Custom)
- Implement scope filtering (Fleet, Vehicle-specific, Driver-specific)
- Generate auto-insights from compliance data (e.g., "12 PUC certificates expiring in next 15 days")
- Compute monthly trend data points for the line chart
- Compute challan trend data (count, online vs court, amounts)
- Query expiry dates across all documents and sort by urgency
- Build drill-down queries for each of the 8 categories
- Integrate with government databases for Blacklisted and NTBT flags
- Track vehicle history events for per-vehicle timelines

### Callbacks

| Callback | Description |
|----------|-------------|
| `onCategorySelect` | Open drill-down view for a specific compliance category |
| `onBackToOverview` | Return from drill-down to the Fleet Overview |
| `onDateRangeChange` | Apply a date range filter (preset or custom range) |
| `onScopeChange` | Switch scope between Fleet, Vehicle, or Driver (with optional selected ID) |

### Empty States

- No vehicles in fleet: Show "Add your first vehicle to see compliance data" with CTA to Fleet section
- No data for selected date range: Show "No compliance data available for this period"
- No expiring documents: Show "All documents are up to date" in the expiry urgency table
- No insights available: Show "Not enough data to generate insights yet"
- Empty drill-down: Show "No vehicles found for this category"

## Expected User Flows

### Flow 1: View Fleet Compliance Overview
1. User navigates to Compliance Dashboard
2. User sees the overall compliance ring score (e.g., 87/100, "Healthy")
3. User views 8 category cards with compliant/total counts and status colors
4. User scrolls to see insights, monthly trend chart, and expiry urgency table
5. **Outcome:** User has a full picture of fleet compliance health

### Flow 2: Drill Down into a Category
1. User clicks the "Insurance" category card
2. Dashboard transitions to the Insurance drill-down view
3. User sees insurance-specific compliance score with trend
4. User sees a table of all vehicles with insurance status, provider, policy number, and expiry date
5. User clicks "Back" to return to Fleet Overview
6. **Outcome:** User has identified which vehicles need insurance renewal

### Flow 3: Filter by Scope — Specific Vehicle
1. User changes scope toggle from "Fleet" to "Vehicle"
2. A search/select dropdown appears
3. User selects a specific vehicle (e.g., "MH04AB1234")
4. Dashboard updates to show compliance data for that vehicle only
5. **Outcome:** User sees single-vehicle compliance across all 8 categories

### Flow 4: Review Expiry Urgency
1. User scrolls to the Expiry Urgency table
2. User sees documents sorted by soonest expiry with urgency badges (Expired, 7 days, 15 days, 30 days)
3. User identifies 3 vehicles with expired PUC certificates
4. **Outcome:** User knows exactly which documents need immediate attention

## Files to Reference

- `product-plan/sections/compliance-dashboard/README.md`
- `product-plan/sections/compliance-dashboard/tests.md`
- `product-plan/sections/compliance-dashboard/components/`
- `product-plan/sections/compliance-dashboard/types.ts`
- `product-plan/sections/compliance-dashboard/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Overall compliance ring score displays with month-over-month change
- [ ] Score color-codes correctly: emerald (75+), amber (50-74), red (below 50)
- [ ] All 8 category cards render with compliant/total counts and percentage
- [ ] Category cards are clickable and open drill-down views
- [ ] Drill-down views show category-specific score, trend, and vehicle-level table
- [ ] Permits drill-down shows sub-breakdown by type (All India / Nationwide / State)
- [ ] Blacklisted drill-down shows flag reason, authority, and date
- [ ] NTBT drill-down shows hold reason, authority, and case reference
- [ ] Insights panel shows 3-4 auto-generated insights
- [ ] Monthly trend chart renders with data points adapting to date range
- [ ] Expiry urgency table shows documents sorted by soonest expiry
- [ ] Urgency badges display correctly (Expired, 7 days, 15 days, 30 days)
- [ ] Date range filter works with all presets and custom range
- [ ] Scope toggle works for Fleet, Vehicle, and Driver
- [ ] Vehicle/Driver selector appears when scope is changed
- [ ] Back button in drill-down returns to Fleet Overview
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile (cards stack to 2 columns)
