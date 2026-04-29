# Milestone 9: Wallet

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Wallet — a prepaid wallet with Razorpay integration, unified credit/debit ledger, and transaction history.

## Overview

The Wallet is the central financial hub of LOTS247, functioning as a prepaid wallet with Razorpay integration. Every system transaction — subscription payments, challan settlements, legal service fees, and manual top-ups — flows through the wallet as a unified credit/debit ledger. Users add money via Razorpay, and the system automatically debits for services.

**Key Functionality:**
- View current balance with prominent display and last recharged date
- Add money via Razorpay payment gateway
- Browse full transaction history (credits and debits)
- Filter transactions by date range, type (credit/debit), and category
- View expanded transaction detail with full metadata
- Low balance visual warning

## Recommended Approach: Test-Driven Development

See `product-plan/sections/wallet/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/wallet/components/`:

- `Wallet.tsx` — Main wallet view with balance card, add money, and transaction ledger

### Data Layer

- Current balance tracking
- Transaction ledger: reverse chronological, with credits (green) and debits (red)
- Transaction categories: Recharge, Subscription, Challan, Legal Fee, Refund
- Transaction detail: amount, date/time, category, reference ID, status, description
- Razorpay payment gateway integration

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddMoney` | Opens add money modal |
| `onSubmitPayment` | Initiates Razorpay payment with amount |
| `onViewTransaction` | Expands transaction detail panel |
| `onFilterChange` | Applies date/type/category filters |
| `onSearch` | Searches transactions by description or reference ID |

### Empty States

- **No transactions:** Show "Your wallet is empty. Add money to get started." with Add Money CTA
- **Filter returns nothing:** Show "No transactions match your filters"
- **Low balance:** Visual treatment changes when balance below threshold

## Expected User Flows

### Flow 1: Add Money to Wallet
1. User clicks "Add Money" button on balance card
2. Recharge modal opens with preset amounts (500, 1000, 2000, 5000) and custom entry
3. User selects or enters amount
4. Razorpay payment gateway opens
5. On success: balance updates immediately, credit entry appears in ledger
6. **Outcome:** Wallet balance increased, transaction recorded

### Flow 2: Browse Transaction History
1. User scrolls through transaction ledger
2. Each row shows date, description, category badge, amount (green/red), running balance
3. **Outcome:** Complete financial history visible

### Flow 3: Filter Transactions
1. User applies filters: date range (This Month), type (Debit), category (Challan)
2. Transaction list updates to show only matching entries
3. **Outcome:** User can quickly find specific transactions

### Flow 4: View Transaction Detail
1. User taps a transaction row
2. Detail panel expands/slides showing full metadata
3. For debits, links to related entity (challan ID, subscription plan)
4. **Outcome:** Complete transaction information visible

## Files to Reference

- `product-plan/sections/wallet/README.md` — Feature overview
- `product-plan/sections/wallet/tests.md` — Test instructions
- `product-plan/sections/wallet/components/` — React components
- `product-plan/sections/wallet/types.ts` — TypeScript interfaces
- `product-plan/sections/wallet/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Balance card shows current balance prominently
- [ ] Add Money modal with preset and custom amounts
- [ ] Razorpay integration triggers payment
- [ ] Balance updates on successful payment
- [ ] Transaction ledger shows all credits/debits chronologically
- [ ] Filters work (date range, type, category)
- [ ] Search by description or reference ID works
- [ ] Transaction detail panel shows full metadata
- [ ] Low balance visual warning
- [ ] Empty state when no transactions
- [ ] Responsive on mobile
