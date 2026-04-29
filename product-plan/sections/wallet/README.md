# Wallet — Balance & Transactions

## Overview

The Wallet section manages the user's financial account within LOTS247. It displays the current balance with a prominent card, provides an "Add Money" flow integrated with Razorpay, and maintains a filterable transaction ledger. Users can view transaction details, filter by type and date, and track all credits and debits.

## User Flows

1. **Balance View** — User sees a balance card with current amount, last recharge date, and "Add Money" CTA.
2. **Add Money** — Tapping "Add Money" opens a Razorpay payment flow. On success, balance updates immediately.
3. **Transaction Ledger** — Below the balance card, a chronological list of all transactions (credits, debits, refunds).
4. **Filter Transactions** — User can filter by type (Credit, Debit, Refund), date range, or amount range.
5. **Transaction Detail** — Tapping a transaction row opens a detail panel showing full description, reference ID, timestamp, and linked entity.

## Design Decisions

- Balance card uses a gradient background with the product accent color.
- "Add Money" button is prominent with the Razorpay logo indicator.
- Transaction rows use green for credits, red for debits, and amber for refunds.
- Filters collapse into a single row of chips on mobile.
- Transaction detail opens as a bottom sheet on mobile, side panel on desktop.
- Amounts are formatted in INR with the rupee symbol.

## Data Used

- `product/sections/wallet/data.json` — Sample balance, transactions, payment data.
- `product/sections/wallet/types.ts` — WalletBalance, Transaction, PaymentRequest.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| WalletView | WalletView.tsx | Full wallet interface |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onAddMoney | WalletView | `(amount: number) => void` | Initiates Razorpay payment |
| onTransactionSelect | WalletView | `(txnId: string) => void` | Opens transaction detail |
| onFilterChange | WalletView | `(filters: TransactionFilter) => void` | Applies filters |
| onLoadMore | WalletView | `() => void` | Loads next page of transactions |
