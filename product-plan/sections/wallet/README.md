# Wallet Section

## Overview

The Wallet section provides a prepaid wallet experience for LOTS247 subscribers. Users can view their current balance, add money via Razorpay, browse their transaction history with filters and search, and view detailed information about individual transactions.

## Features

- **Balance card** showing current balance, last recharge info, and low balance warning
- **Summary stats** -- Total In (credits), Total Out (debits) with transaction counts
- **Add Money modal** with:
  - Custom amount input with rupee symbol
  - Quick-select preset amount buttons (configurable via props)
  - Minimum (100) and maximum (1,00,000) validation
  - "Pay via Razorpay" CTA
  - Payment method info (UPI, Cards, Net Banking)
- **Transaction ledger** with:
  - Desktop table view (Reference ID, Date, Category, Amount, Balance)
  - Mobile card view grouped by date with relative date labels
  - Color-coded amounts (green for credits, default for debits, strikethrough for failed)
  - Category badges (Recharge, Subscription, Challan, Legal Fee, Refund)
  - Failed transaction indicator
- **Search** by description or reference ID
- **Filters** panel with Date Range, Type (Credit/Debit), and Category dropdowns
- **Transaction detail modal** showing:
  - Large amount display with category icon
  - Date/time, category, type, reference ID, status, balance after
  - Link to related entity (challan, subscription, incident, dispute)
- **Pagination** with page numbers
- **Empty states** -- wallet empty (no transactions) and no matching results
- **Low balance warning** when balance is at or below threshold
- **Date range selector** in the page header

## Components

| Component | File | Description |
|-----------|------|-------------|
| `WalletView` | `components/WalletView.tsx` | Main component -- balance card, stats, transaction table, add money modal, detail modal |

## Data

- **Types**: `types.ts` -- `WalletSummary`, `Transaction`, `TransactionFilters`, `WalletProps`, etc.
- **Sample data**: `sample-data.json` -- wallet summary + 12 sample transactions across all categories

## Props

The `WalletView` component accepts:

- `walletSummary` -- `WalletSummary` object with balance, currency, threshold, last recharge
- `transactions` -- Array of `Transaction` objects in reverse chronological order
- `quickAmounts` -- Array of numbers for quick-select buttons (e.g., [500, 1000, 2000, 5000])
- `onAddMoney` -- Callback when user confirms a recharge amount
- `onViewTransaction` -- Callback when user clicks a transaction row
- `onNavigateToEntity` -- Callback when user clicks a related entity link in detail
- `onFilterChange` -- Callback when filters change
- `onSearch` -- Callback when search query changes

## Usage

```tsx
import { WalletView } from './components'
import sampleData from './sample-data.json'

<WalletView
  walletSummary={sampleData.walletSummary}
  transactions={sampleData.transactions}
  quickAmounts={sampleData.quickAmounts}
  onAddMoney={(amount) => console.log('Add', amount)}
  onViewTransaction={(id) => console.log('View', id)}
/>
```
