# Compliance Dashboard — Test Specifications

## Overview

Tests for the fleet compliance dashboard covering 8 compliance categories, drill-downs, vehicle-wise reports, filters, trend charts, and export functionality.

---

## 1. Dashboard Overview Load

### Success Path
- [ ] Navigate to compliance dashboard
- [ ] Verify 8 category cards render: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT
- [ ] Verify each card shows a count badge with number of non-compliant vehicles
- [ ] Verify color coding: green for compliant, amber for expiring soon, red for expired
- [ ] Verify overall fleet compliance percentage displays at top
- [ ] Verify insights panel is visible with trend summary

### Failure Path
- [ ] Simulate API failure — verify error state with retry button
- [ ] Simulate partial data (3 of 8 categories load) — verify available cards render, failed ones show "Unable to load"
- [ ] Simulate timeout — verify loading skeletons appear for all 8 cards

---

## 2. Category Drill-Down

### Success Path
- [ ] Tap "Insurance" category card
- [ ] Verify drill-down panel opens with filtered vehicle list
- [ ] Verify list shows only vehicles with insurance issues
- [ ] Verify each row displays: vehicle number, policy number, expiry date, status badge
- [ ] Verify sort by expiry date (nearest first) is default
- [ ] Tap a vehicle row — verify navigation to VehicleWiseReport

### Failure Path
- [ ] Drill into category with zero items — verify "All vehicles compliant for Insurance" message
- [ ] Drill-down API error — verify "Failed to load details" with retry option

---

## 3. Vehicle-Wise Report

### Success Path
- [ ] Open VehicleWiseReport for vehicle "MH01AB1234"
- [ ] Verify vehicle header shows: number, make, model, owner
- [ ] Verify 8 compliance rows render with status for each category
- [ ] Verify each row shows: category name, document number, expiry date, days remaining, status icon
- [ ] Verify expired items show a red "Renew Now" CTA
- [ ] Tap back — verify return to dashboard with scroll position preserved

### Failure Path
- [ ] Vehicle with no compliance data — verify "No compliance records found" message
- [ ] Vehicle with partial data (only RC and Insurance) — verify available items render, others show "Not Available"

---

## 4. Filters

### Success Path
- [ ] Open filter panel
- [ ] Select status "Expired" — verify only expired items show
- [ ] Select date range "Next 30 days" — verify only items expiring within 30 days show
- [ ] Combine filters: status "Expiring Soon" + category "PUCC" — verify intersection
- [ ] Tap "Clear Filters" — verify all items return
- [ ] Verify filter count badge shows number of active filters

### Failure Path
- [ ] Apply filters that return zero results — verify "No matching records" empty state
- [ ] Verify clear filters button resets to default view

---

## Empty State Tests

- [ ] New fleet with zero vehicles — dashboard shows "Add your first vehicle to see compliance status" prompt
- [ ] Fleet with all vehicles compliant — all cards show green with "All Clear" badges
- [ ] Individual category with no data — card shows gray with "--" count

## Component Interaction Tests

- [ ] Drill-down panel closes on outside click (desktop) or back swipe (mobile)
- [ ] Filter changes trigger real-time count updates on category cards
- [ ] Export button is disabled while data is loading
- [ ] Trend chart updates when date range filter changes

## Edge Cases

- [ ] Fleet with 500+ vehicles — verify pagination or virtual scroll in drill-down
- [ ] Vehicle with document expiring today — shows "Expires Today" in red
- [ ] Vehicle with document expired 1 day ago — shows "Expired 1 day ago"
- [ ] Multiple documents expiring on same date — grouped correctly
- [ ] Category card count updates in real-time when a renewal is processed elsewhere

## Accessibility Checks

- [ ] Category cards have aria-label with category name and count (e.g., "Insurance: 5 non-compliant")
- [ ] Status colors accompanied by text labels (not color-only)
- [ ] Drill-down panel announced to screen readers on open
- [ ] Filter controls are keyboard accessible
- [ ] Trend charts have aria-label with data summary
- [ ] VehicleWiseReport table rows are navigable via arrow keys

## Sample Test Data

```json
{
  "categories": [
    { "id": "rc", "label": "RC", "total": 24, "compliant": 22, "expiringSoon": 1, "expired": 1 },
    { "id": "insurance", "label": "Insurance", "total": 24, "compliant": 18, "expiringSoon": 4, "expired": 2 },
    { "id": "pucc", "label": "PUCC", "total": 24, "compliant": 15, "expiringSoon": 5, "expired": 4 },
    { "id": "permits", "label": "Permits", "total": 24, "compliant": 20, "expiringSoon": 3, "expired": 1 },
    { "id": "dl", "label": "DL", "total": 18, "compliant": 16, "expiringSoon": 1, "expired": 1 },
    { "id": "challans", "label": "Challans", "total": 24, "compliant": 17, "expiringSoon": 0, "expired": 7 },
    { "id": "blacklisted", "label": "Blacklisted", "total": 24, "compliant": 23, "expiringSoon": 0, "expired": 1 },
    { "id": "ntbt", "label": "NTBT", "total": 24, "compliant": 21, "expiringSoon": 0, "expired": 3 }
  ],
  "vehicleCompliance": {
    "vehicleNumber": "MH01AB1234",
    "make": "Tata",
    "model": "Ace",
    "items": [
      { "category": "RC", "documentNumber": "MH01-2022-0012345", "expiry": "2037-03-14", "status": "compliant" },
      { "category": "Insurance", "documentNumber": "POL-2026-789456", "expiry": "2026-05-15", "status": "expiringSoon" },
      { "category": "PUCC", "documentNumber": "PUCC-2026-001", "expiry": "2026-04-10", "status": "expired" }
    ]
  },
  "trends": [
    { "month": "2026-01", "score": 68 },
    { "month": "2026-02", "score": 71 },
    { "month": "2026-03", "score": 73 },
    { "month": "2026-04", "score": 76 }
  ]
}
```
