# Settings — Test Specifications

## Overview

Tests for notification preferences, quiet hours, default landing page, plan management, and billing history.

---

## 1. Notification Toggles

### Success Path
- [ ] Navigate to Settings
- [ ] Verify notification section renders with matrix: rows (Challans, Renewals, Cases, Wallet) x columns (Push, Email, SMS)
- [ ] Verify current toggle states match saved preferences
- [ ] Toggle "Challans > Push" from ON to OFF
- [ ] Verify onToggleNotification fires with ("challans", "push", false)
- [ ] Verify toggle visually updates to OFF state
- [ ] Toggle back to ON — verify it persists

### Failure Path
- [ ] Toggle fails to save (API error) — verify "Failed to update. Reverted." toast, toggle reverts
- [ ] Settings API fails to load — verify skeleton loaders for toggles
- [ ] All notifications disabled — verify warning "You won't receive any notifications"

---

## 2. Quiet Hours

### Success Path
- [ ] Verify quiet hours section with start and end time pickers
- [ ] Set start to "22:00" and end to "07:00"
- [ ] Tap Save — verify onSetQuietHours fires with ("22:00", "07:00")
- [ ] Verify success toast "Quiet hours updated"
- [ ] Verify display shows "10:00 PM - 7:00 AM"

### Failure Path
- [ ] Set start time after end time (e.g., 08:00 to 07:00 same day) — verify warning (overnight is valid, same-day inversion shows error)
- [ ] Set start equal to end — verify "Start and end time cannot be the same" error
- [ ] Save fails — verify "Failed to update quiet hours" toast

---

## 3. Default Landing Page

### Success Path
- [ ] Verify radio button group with options: Home, Compliance Dashboard, Vehicle Management
- [ ] Verify current selection matches saved preference
- [ ] Select "Compliance Dashboard"
- [ ] Verify onSetDefaultLanding fires with "compliance-dashboard"
- [ ] Verify selection indicator updates
- [ ] Log out and log back in — verify Compliance Dashboard loads first

### Failure Path
- [ ] Save fails — verify preference reverts to previous selection

---

## 4. Plan Management

### Success Path
- [ ] Verify current plan card shows: plan name, price, features, renewal date
- [ ] Verify "Current Plan" badge on active plan
- [ ] Tap "Change Plan" — verify plan comparison modal/view opens
- [ ] Verify all plans listed with feature comparison
- [ ] Select "Enterprise" plan — verify upgrade confirmation
- [ ] Confirm upgrade — verify onChangePlan fires with "enterprise"
- [ ] Verify success message with new plan details

### Failure Path
- [ ] Downgrade attempt — verify warning "Downgrading will reduce your vehicle limit from 50 to 10"
- [ ] Plan change payment fails — verify "Payment failed. Plan unchanged."
- [ ] Already on highest plan — "Change Plan" shows "You're on the best plan" message

---

## 5. Billing History

### Success Path
- [ ] Verify billing history table renders with columns: Date, Description, Amount, Status, Download
- [ ] Verify rows sorted by date (newest first)
- [ ] Verify status badges: Paid (green), Pending (amber), Failed (red)
- [ ] Tap download icon on a paid invoice — verify PDF download initiates
- [ ] Verify downloaded invoice file name includes date

### Failure Path
- [ ] No billing records — verify "No billing history yet"
- [ ] Invoice download fails — verify "Download failed. Tap to retry."
- [ ] Billing API error — verify "Unable to load billing history" with retry

---

## Empty State Tests

- [ ] New user — all notification toggles ON by default, quiet hours not set, landing page "Home"
- [ ] No billing history — "No invoices yet. Your billing records will appear here."
- [ ] Free plan — plan section shows "Free Plan" with "Upgrade" CTA

## Component Interaction Tests

- [ ] Toggling a notification saves immediately without a separate Save button
- [ ] Changing default landing page takes effect on next login
- [ ] Plan change triggers wallet deduction or payment flow depending on amount
- [ ] Billing history updates when a new payment is made

## Edge Cases

- [ ] All 12 notification toggles changed rapidly — each saves independently, no conflicts
- [ ] Quiet hours spanning midnight (22:00 to 07:00) — correctly interpreted as overnight
- [ ] Plan change mid-billing cycle — prorated amount calculated and displayed
- [ ] Billing history with 100+ records — paginated or virtual-scrolled
- [ ] Concurrent settings change from two devices — last write wins
- [ ] Time zone considerations for quiet hours — uses device local time

## Accessibility Checks

- [ ] Toggle switches have role="switch" with aria-checked
- [ ] Notification matrix has row and column headers for screen readers
- [ ] Time pickers have aria-label "Quiet hours start time" / "Quiet hours end time"
- [ ] Radio buttons for landing page have role="radiogroup" with aria-label
- [ ] Plan comparison table is navigable with screen readers
- [ ] Download buttons in billing history have aria-label "Download invoice for [date]"
- [ ] Section headers use appropriate heading levels (h2, h3)

## Sample Test Data

```json
{
  "notificationSettings": {
    "challans": { "push": true, "email": true, "sms": false },
    "renewals": { "push": true, "email": true, "sms": true },
    "cases": { "push": true, "email": false, "sms": false },
    "wallet": { "push": false, "email": true, "sms": false }
  },
  "quietHours": {
    "enabled": true,
    "start": "22:00",
    "end": "07:00"
  },
  "defaultLanding": "home",
  "currentPlan": {
    "id": "pro",
    "name": "Pro",
    "price": 2499,
    "billingCycle": "monthly",
    "renewalDate": "2026-05-20",
    "features": ["Up to 50 vehicles", "All alerts", "Full reports", "API access"]
  },
  "billingHistory": [
    { "id": "inv-001", "date": "2026-04-20", "description": "Pro Plan - Monthly", "amount": 2499, "status": "paid", "invoiceUrl": "/invoices/inv-001.pdf" },
    { "id": "inv-002", "date": "2026-03-20", "description": "Pro Plan - Monthly", "amount": 2499, "status": "paid", "invoiceUrl": "/invoices/inv-002.pdf" },
    { "id": "inv-003", "date": "2026-02-20", "description": "Basic to Pro Upgrade (Prorated)", "amount": 1875, "status": "paid", "invoiceUrl": "/invoices/inv-003.pdf" }
  ]
}
```
