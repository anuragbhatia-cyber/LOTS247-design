# Wallet Specification

## Overview
The Wallet is the central financial hub of LOTS247, functioning as a prepaid wallet with Razorpay integration. Every system transaction — subscription payments, challan settlements, legal service fees, and manual top-ups — flows through the wallet as a unified credit/debit ledger. Users add money via Razorpay, and the system automatically debits for services, giving fleet operators a single place to track all financial activity.

## User Flows
- User lands on Wallet and sees the current balance prominently displayed along with last recharged date
- User taps "Add Money" to open the recharge modal, enters an amount, and completes payment via Razorpay
- On successful payment, balance updates immediately and a credit entry appears in the transaction ledger
- User scrolls through the transaction history showing all credits and debits in reverse chronological order
- User filters transactions by date range (Today, This Week, This Month, Custom), type (Credit / Debit), or category (Recharge, Subscription, Challan, Legal Fee, Refund)
- User searches transactions by description or reference ID
- User taps a transaction row to expand the transaction detail panel showing full metadata (amount, date/time, category, reference ID, status, description)
- Empty state is shown when no transactions exist, prompting the user to add money

## UI Requirements

### Balance Card
- Current balance displayed prominently with large typography
- "Add Money" button as the primary CTA
- Last recharged date and amount shown as secondary info
- Visual treatment changes when balance is low (below a threshold)

### Add Money Modal
- Amount input field with preset quick-select amounts (e.g., 500, 1000, 2000, 5000)
- Custom amount entry with validation (minimum and maximum limits)
- Razorpay payment gateway integration trigger
- Success / failure state after payment completion

### Transaction Ledger
- Reverse chronological list of all transactions
- Each row shows: date, description, category icon/badge, amount (green for credit, red for debit), running balance
- Infinite scroll or pagination for long histories
- Pull-to-refresh on mobile

### Filters & Search
- Date range filter: Today, This Week, This Month, Custom date picker
- Type filter: All, Credit, Debit
- Category filter: Recharge, Subscription, Challan, Legal Fee, Refund
- Search bar for description or reference ID lookup
- Active filters shown as dismissible chips

### Transaction Detail Panel
- Expands inline or as a slide-over panel on tap
- Shows: amount, date/time, category, reference ID, status (Success, Pending, Failed), description
- For debits: links to the related entity (e.g., challan ID, subscription plan)

### Empty State
- Friendly illustration or icon when no transactions exist
- Message: "Your wallet is empty. Add money to get started."
- Prominent "Add Money" CTA

## Configuration
- shell: true
