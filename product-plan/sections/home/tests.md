# Home — Test Specifications

## Overview

Tests for the Home dashboard covering overview cards, compliance score, quick actions, challan search, vehicle compliance check, notifications, and activity feed.

---

## 1. Dashboard Load

### Success Path
- [ ] Navigate to home screen
- [ ] Verify 5 overview cards render with correct labels: Vehicles, Drivers, Active Challans, Pending Cases, Wallet Balance
- [ ] Verify each card displays a numeric value and an icon
- [ ] Verify compliance score gauge renders with a value between 0 and 100
- [ ] Verify gauge color is red for score below 50, amber for 50-79, green for 80+
- [ ] Verify activity feed loads with at least one item
- [ ] Verify TopHeader shows user greeting with current date

### Failure Path
- [ ] Simulate API timeout for overview stats
- [ ] Verify skeleton loaders appear for each overview card
- [ ] Verify error toast appears if stats fail to load after retry
- [ ] Verify activity feed shows "No recent activity" placeholder on empty response

---

## 2. Quick Actions

### Success Path
- [ ] Verify 4 quick action buttons render: Add Incident, Add Vehicle, Call Lawyer, Add Driver
- [ ] Tap "Add Incident" — verify AddIncidentModal opens
- [ ] Fill incident form with vehicle "MH01AB1234", type "Challan", description "Signal violation"
- [ ] Submit — verify onAddIncident callback fires and modal closes
- [ ] Tap "Add Vehicle" — verify onAddVehicle callback fires
- [ ] Tap "Add Driver" — verify onAddDriver callback fires
- [ ] Tap "Call Lawyer" — verify onCallLawyer callback fires

### Failure Path
- [ ] Submit AddIncidentModal with empty vehicle number — verify validation error "Vehicle number is required"
- [ ] Submit with invalid vehicle format "123" — verify validation error "Enter a valid vehicle number"

---

## 3. Check Challan Flow

### Success Path
- [ ] Tap "Check Challan" button on home
- [ ] Verify CheckChallanModal opens with vehicle number input
- [ ] Enter "MH01AB1234" and tap Search
- [ ] Verify loading spinner appears
- [ ] Verify ChallanResultsView renders with receipt-style challan cards
- [ ] Verify each card shows: challan number, date, violation, amount, status badge
- [ ] Tap a challan card — verify navigation to challan detail

### Failure Path
- [ ] Search with vehicle number that has no challans
- [ ] Verify "No challans found for this vehicle" empty state
- [ ] Search with network error — verify retry button appears

---

## 4. Vehicle Compliance Check

### Success Path
- [ ] Open VehicleComplianceCheck from home
- [ ] Enter vehicle number "MH01AB1234"
- [ ] Verify VehicleComplianceResultsView renders with status for RC, Insurance, PUCC, Permit, DL
- [ ] Verify each category shows Valid (green), Expiring Soon (amber), or Expired (red)
- [ ] Verify expiry dates are displayed for each document

### Failure Path
- [ ] Enter unregistered vehicle number "XX00ZZ9999"
- [ ] Verify "Vehicle not found" message
- [ ] Verify user can re-enter a different number without closing the modal

---

## 5. Notifications

### Success Path
- [ ] Tap bell icon in TopHeader
- [ ] Verify NotificationsView opens with grouped sections: Renewals, Challans, Cases
- [ ] Verify unread count badge matches actual unread notifications
- [ ] Tap a notification — verify onNotificationTap fires with correct id
- [ ] Verify notification is marked as read after tap

### Failure Path
- [ ] Simulate empty notifications response
- [ ] Verify "You're all caught up" empty state with illustration

---

## Empty State Tests

- [ ] New user with zero vehicles — overview cards show "0" values, compliance score shows "--"
- [ ] Activity feed with no items — shows onboarding prompt "Add your first vehicle to get started"
- [ ] Notifications empty — bell icon has no badge, view shows empty state

## Component Interaction Tests

- [ ] Tapping an OverviewCard navigates to the respective section (e.g., "Vehicles" card goes to vehicle list)
- [ ] Activity feed items with type "challan" navigate to incident management on tap
- [ ] Activity feed items with type "renewal" navigate to compliance dashboard on tap
- [ ] ComplianceScore gauge tooltip shows breakdown on hover/long-press

## Edge Cases

- [ ] Overview card with value exceeding 9999 shows "9,999+" or abbreviates
- [ ] Activity feed with 100+ items loads only first 20, then paginates on scroll
- [ ] Rapid-tapping quick action buttons does not open multiple modals
- [ ] CheckChallanModal debounces search input by 300ms

## Accessibility Checks

- [ ] All overview cards have aria-label with stat name and value
- [ ] Compliance score gauge has role="meter" with aria-valuenow, aria-valuemin, aria-valuemax
- [ ] Quick action buttons have descriptive aria-labels
- [ ] Modals trap focus and return focus to trigger on close
- [ ] Activity feed items are keyboard navigable with Enter to activate
- [ ] Color is not the sole indicator — icons/text accompany red/amber/green states

## Sample Test Data

```json
{
  "overviewStats": {
    "vehicles": 24,
    "drivers": 18,
    "activeChallans": 7,
    "pendingCases": 3,
    "walletBalance": 12500
  },
  "complianceScore": 73,
  "activityItems": [
    { "id": "a1", "type": "challan", "message": "New challan for MH01AB1234", "timestamp": "2026-04-28T09:30:00Z" },
    { "id": "a2", "type": "renewal", "message": "Insurance expiring for MH04CD5678 in 7 days", "timestamp": "2026-04-27T14:00:00Z" },
    { "id": "a3", "type": "case", "message": "Case #C-102 updated to In Progress", "timestamp": "2026-04-27T11:15:00Z" }
  ],
  "challanResults": [
    { "challanNumber": "CH-2026-00451", "vehicle": "MH01AB1234", "date": "2026-04-15", "violation": "Signal Jump", "amount": 1000, "status": "Pending" }
  ],
  "notifications": [
    { "id": "n1", "group": "Renewals", "title": "PUCC expiring in 3 days", "read": false },
    { "id": "n2", "group": "Challans", "title": "New challan detected", "read": false }
  ]
}
```
