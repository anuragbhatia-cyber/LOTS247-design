# Milestone 9: Wallet

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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

Implement the Wallet — the central financial hub functioning as a prepaid wallet with Razorpay integration, providing a unified credit/debit ledger for all system transactions.

## Overview

The Wallet is LOTS247's financial backbone. Every system transaction — subscription payments, challan settlements, legal service fees, and manual top-ups — flows through the wallet as a unified credit/debit ledger. Users add money via Razorpay, and the system automatically debits for services. The wallet gives fleet operators a single place to track all financial activity.

**Key Functionality:**
- Balance card with current balance, last recharge info, and "Add Money" CTA
- Low balance visual treatment when below threshold
- Add Money modal with preset quick-select amounts (500, 1000, 2000, 5000) and custom amount entry
- Razorpay payment gateway integration
- Transaction ledger in reverse chronological order with running balance
- Filters: date range (Today, This Week, This Month, Custom), type (Credit/Debit), category (Recharge, Subscription, Challan, Legal Fee, Refund)
- Search by description or reference ID
- Active filters shown as dismissible chips
- Transaction detail panel with full metadata (amount, date/time, category, reference ID, status, description)
- Related entity links in transaction detail (e.g., link to challan ID, subscription plan)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/wallet/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/wallet/components/`:
- `WalletView.tsx` — Full wallet interface including balance card, Add Money modal, transaction ledger, filters, search, and transaction detail panel

Additional top-level view:
- `WalletView.tsx` (top-level) — Preview wrapper for the wallet

### Data Layer

Key types from `types.ts`: WalletSummary, LastRecharge, Transaction, TransactionType, TransactionCategory, TransactionStatus, RelatedEntityType, TransactionFilters

You'll need to:
- Create a wallet record per user with current balance and low balance threshold
- Implement credit operations (recharge via Razorpay, refunds)
- Implement debit operations (subscription payments, challan settlements, legal fees)
- Maintain a transaction ledger with running balance calculation
- Integrate Razorpay payment gateway for the Add Money flow
- Handle payment success/failure callbacks from Razorpay
- Implement transaction filtering (date range, type, category)
- Implement transaction search (by description, reference ID)
- Link transactions to related entities (challans, subscriptions, incidents, disputes)
- Set and enforce minimum/maximum recharge limits
- Implement low balance detection and visual threshold

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddMoney` | Open Add Money modal and initiate Razorpay payment with chosen amount |
| `onViewTransaction` | Expand transaction detail panel for a specific transaction |
| `onNavigateToEntity` | Navigate to related entity (challan, subscription, incident) from transaction detail |
| `onFilterChange` | Apply filters to the transaction ledger |
| `onSearch` | Search transactions by description or reference ID |

### Empty States

- No transactions (new wallet): Show "Your wallet is empty. Add money to get started." with prominent "Add Money" CTA and a friendly icon/illustration
- No transactions matching filters: Show "No transactions match your filters" with option to clear filters
- No transactions matching search: Show "No transactions found for your search"

## Expected User Flows

### Flow 1: Add Money via Razorpay
1. User navigates to Wallet and sees current balance (e.g., "Rs. 2,500")
2. User clicks "Add Money" button
3. Add Money modal opens with preset amounts (500, 1000, 2000, 5000) and a custom amount field
4. User selects Rs. 2,000 (or enters a custom amount)
5. User clicks "Proceed to Pay"
6. Razorpay payment gateway opens
7. User completes payment
8. **Outcome:** Balance updates to Rs. 4,500; a credit entry appears at the top of the transaction ledger

### Flow 2: Browse and Filter Transaction History
1. User scrolls through the transaction ledger
2. User sees credits (green) and debits (red) with descriptions and running balance
3. User clicks "This Month" date filter and "Debit" type filter
4. Active filters appear as dismissible chips
5. Ledger updates to show only debits from this month
6. **Outcome:** User sees a filtered view of their spending

### Flow 3: View Transaction Detail
1. User taps a transaction row (e.g., "Challan Settlement - MH04AB1234")
2. Transaction detail panel expands showing: amount, date/time, category (Challan), reference ID, status (Success), description
3. User sees a link to the related challan entity
4. User taps the challan link
5. **Outcome:** User navigates to the challan detail page

### Flow 4: Empty Wallet — First-Time User
1. New user navigates to Wallet for the first time
2. Balance shows Rs. 0
3. Empty state illustration with message: "Your wallet is empty. Add money to get started."
4. Prominent "Add Money" CTA button
5. **Outcome:** User is guided to add their first recharge

## Files to Reference

- `product-plan/sections/wallet/README.md`
- `product-plan/sections/wallet/tests.md`
- `product-plan/sections/wallet/components/`
- `product-plan/sections/wallet/types.ts`
- `product-plan/sections/wallet/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Balance card displays current balance prominently
- [ ] Last recharge date and amount shown as secondary info
- [ ] Low balance visual treatment triggers below threshold
- [ ] "Add Money" button opens the Add Money modal
- [ ] Preset quick-select amounts work (500, 1000, 2000, 5000)
- [ ] Custom amount entry works with min/max validation
- [ ] Razorpay payment gateway integration works end-to-end
- [ ] Balance updates immediately after successful payment
- [ ] Credit entry appears in ledger after recharge
- [ ] Transaction ledger renders in reverse chronological order
- [ ] Each transaction row shows date, description, category badge, amount (colored), and running balance
- [ ] Date range filter works (Today, This Week, This Month, Custom)
- [ ] Type filter works (All, Credit, Debit)
- [ ] Category filter works (Recharge, Subscription, Challan, Legal Fee, Refund)
- [ ] Active filters display as dismissible chips
- [ ] Search works for description and reference ID
- [ ] Transaction detail panel expands with full metadata
- [ ] Related entity links navigate to correct entities
- [ ] Empty state displays for new wallets with "Add Money" CTA
- [ ] Responsive on mobile
