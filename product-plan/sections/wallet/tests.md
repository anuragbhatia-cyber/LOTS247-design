# Wallet — Test Specifications

## Overview

Tests for wallet balance display, add money flow with Razorpay, transaction ledger, filters, and transaction detail panel.

---

## 1. Balance Card

### Success Path
- [ ] Navigate to Wallet section
- [ ] Verify balance card renders with current amount in INR format (e.g., "Rs 12,500")
- [ ] Verify last recharge date is displayed
- [ ] Verify "Add Money" button is prominent and clickable
- [ ] Verify balance card has gradient background

### Failure Path
- [ ] Balance API fails — verify "Unable to load balance" with retry
- [ ] Balance is zero — verify "Rs 0" displayed with "Add Money" CTA highlighted

---

## 2. Add Money Flow

### Success Path
- [ ] Tap "Add Money" button
- [ ] Verify amount input or preset amount options appear (Rs 500, Rs 1000, Rs 5000, custom)
- [ ] Select Rs 1000 — verify Razorpay checkout opens
- [ ] Complete payment successfully
- [ ] Verify balance updates to previous + Rs 1000
- [ ] Verify success toast "Rs 1,000 added to wallet"
- [ ] Verify new credit transaction appears at top of ledger

### Failure Path
- [ ] Razorpay payment cancelled — verify "Payment cancelled" message, balance unchanged
- [ ] Razorpay payment failed — verify "Payment failed. Amount not deducted." error
- [ ] Enter custom amount Rs 0 — verify "Enter an amount greater than 0" error
- [ ] Enter amount exceeding Rs 100,000 — verify "Maximum single transaction is Rs 1,00,000" error
- [ ] Network error during payment verification — verify "Verifying payment..." with auto-retry

---

## 3. Transaction Ledger

### Success Path
- [ ] Verify transaction list renders below balance card
- [ ] Verify each row shows: date, description, amount (with +/- prefix), type badge
- [ ] Verify credits shown in green, debits in red, refunds in amber
- [ ] Verify transactions sorted by date (newest first)
- [ ] Scroll to bottom — verify "Load More" button or infinite scroll loads next page
- [ ] Verify date separators group transactions by date

### Failure Path
- [ ] Transaction list API error — verify "Unable to load transactions" with retry
- [ ] Empty transaction list — verify "No transactions yet. Add money to get started."

---

## 4. Transaction Filters

### Success Path
- [ ] Open filter controls
- [ ] Filter by type "Credit" — verify only credit transactions show
- [ ] Filter by date range "Last 7 days" — verify filtered results
- [ ] Combine type "Debit" + date "This month" — verify intersection
- [ ] Verify active filter count badge
- [ ] Tap "Clear All" — verify full list returns

### Failure Path
- [ ] Filters return zero results — verify "No transactions match your filters"
- [ ] Verify clear button resets all filters

---

## Empty State Tests

- [ ] New wallet with zero balance and no transactions — balance shows "Rs 0", ledger shows onboarding message
- [ ] Wallet with balance but no transactions in selected filter — shows filter-specific empty state

## Component Interaction Tests

- [ ] Successful add money immediately updates both balance card and transaction ledger
- [ ] Transaction detail panel shows linked entity (e.g., "API credit purchase" links to API catalogue)
- [ ] Filter chips scroll horizontally on mobile if they overflow
- [ ] Pull-to-refresh on mobile reloads balance and latest transactions

## Edge Cases

- [ ] Balance with large amount (Rs 99,99,999) formats correctly with Indian number system
- [ ] Transaction amount with decimals (Rs 499.50) displays correctly
- [ ] 500+ transactions — verify pagination does not degrade performance
- [ ] Two add-money transactions in quick succession — both reflect correctly
- [ ] Refund transaction shows linked original debit transaction ID
- [ ] Transaction timestamp shows "Just now" for transactions within 1 minute

## Accessibility Checks

- [ ] Balance card has aria-label "Wallet balance: Rs X"
- [ ] Transaction rows have aria-label with description and amount
- [ ] Credit/debit color coding accompanied by +/- prefix and type label
- [ ] "Add Money" button has descriptive aria-label
- [ ] Filter controls are keyboard accessible
- [ ] Transaction detail panel traps focus and has close button

## Sample Test Data

```json
{
  "balance": {
    "amount": 12500,
    "lastRecharge": "2026-04-25T14:30:00Z",
    "currency": "INR"
  },
  "transactions": [
    {
      "id": "txn-001",
      "type": "credit",
      "amount": 5000,
      "description": "Wallet recharge via Razorpay",
      "date": "2026-04-25T14:30:00Z",
      "referenceId": "pay_ABC123",
      "status": "success"
    },
    {
      "id": "txn-002",
      "type": "debit",
      "amount": 250,
      "description": "API credits - Vahan Lookup x50",
      "date": "2026-04-26T09:15:00Z",
      "referenceId": "api_credit_456",
      "status": "success"
    },
    {
      "id": "txn-003",
      "type": "refund",
      "amount": 1000,
      "description": "Challan SLA refund - CH-2026-00389",
      "date": "2026-04-27T11:00:00Z",
      "referenceId": "ref_789",
      "linkedEntity": "ch-002",
      "status": "success"
    }
  ]
}
```
