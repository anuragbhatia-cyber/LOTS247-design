# Wallet Section -- Test Instructions

## Setup

Render the `WalletView` component with the sample data from `sample-data.json`. Provide mock callbacks for `onAddMoney`, `onViewTransaction`, `onNavigateToEntity`, `onFilterChange`, and `onSearch`.

---

## Test Cases

### 1. Viewing Current Balance

- [ ] Component renders without errors
- [ ] Page title "Wallet" and subtitle are visible
- [ ] Current Balance card shows the correct amount (12,750 in sample data)
- [ ] Balance is formatted in Indian currency format with rupee symbol
- [ ] Last recharge info is shown (amount and date)
- [ ] Wallet icon is displayed in the balance card
- [ ] "Total In" card shows the sum of all successful credit transactions
- [ ] "Total Out" card shows the sum of all successful debit transactions
- [ ] Credit and debit transaction counts are displayed

### 2. Adding Money (Success Flow)

- [ ] "Add Money" button is visible in the header
- [ ] Clicking "Add Money" opens the Add Money modal
- [ ] Modal shows "Add Money" title and "Top up your LOTS247 wallet" subtitle
- [ ] Custom amount input accepts numeric values
- [ ] Rupee symbol is displayed before the input
- [ ] Quick-select buttons show the 4 preset amounts (500, 1000, 2000, 5000)
- [ ] Clicking a quick-select button fills the input with that amount
- [ ] Selected quick-select button is highlighted in emerald
- [ ] Typing a custom amount deselects any quick-select button
- [ ] "Pay via Razorpay" button shows the selected amount
- [ ] Button is disabled when no amount is entered
- [ ] Clicking proceed calls `onAddMoney` with the amount and closes the modal
- [ ] Payment info text shows "Secured by Razorpay" with accepted methods

### 3. Adding Money (Failure/Validation)

- [ ] Amount below 100 shows "Minimum amount is 100" error
- [ ] Amount above 1,00,000 shows "Maximum amount is 1,00,000" error
- [ ] Error message includes an AlertTriangle icon
- [ ] Error clears when user modifies the amount

### 4. Viewing Transaction List

- [ ] Transaction History card is visible with transaction count
- [ ] All 12 sample transactions are available (across pages)
- [ ] Desktop table shows: Reference ID, Date, Category badge, Amount, Balance
- [ ] Credit amounts are shown in green with "+" prefix
- [ ] Debit amounts are shown in default color with minus prefix
- [ ] Failed transactions show strikethrough amount and "Failed" label with red icon
- [ ] Running balance is displayed for each transaction
- [ ] Transactions are displayed in reverse chronological order

### 5. Mobile Transaction View

- [ ] Mobile view groups transactions by date
- [ ] Date group headers show relative labels ("Today", "Yesterday", "X days ago")
- [ ] Each transaction row shows description, time, and amount
- [ ] Balance is shown as "Bal" with amount on mobile
- [ ] Tapping a transaction opens the detail modal

### 6. Filtering and Searching Transactions

- [ ] Search input is visible with placeholder text
- [ ] Typing a description keyword filters transactions
- [ ] Typing a reference ID filters transactions
- [ ] Clear button (X) appears when search has text; clicking clears it
- [ ] `onSearch` callback is called with the query
- [ ] Filters button toggles the filter panel
- [ ] Date Range dropdown filters by Today / This Week / This Month
- [ ] Type dropdown filters by Credit / Debit / All
- [ ] Category dropdown filters by Recharge / Subscription / Challan / Legal Fee / Refund / All
- [ ] Active filter count badge appears on the Filters button
- [ ] "Clear all" link resets all filters
- [ ] `onFilterChange` callback is called when filters change
- [ ] Header date range selector also works for filtering
- [ ] Search and filters work together
- [ ] Filters reset pagination to page 1

### 7. Viewing Transaction Detail

- [ ] Clicking a transaction row opens the detail modal
- [ ] `onViewTransaction` callback is called with the transaction ID
- [ ] Modal shows large amount display with sign (+ for credit, minus for debit)
- [ ] Category icon is displayed in the amount hero area
- [ ] Credit amounts are green; debit amounts are default
- [ ] Detail rows show: Date & Time, Category badge, Type, Reference ID, Status badge, Balance After
- [ ] Reference ID is displayed in monospace font with code-style background
- [ ] Status badge shows Success (green), Pending (amber), or Failed (red) with icon
- [ ] For transactions with a related entity, a link button is displayed
- [ ] Clicking the related entity link calls `onNavigateToEntity` with type and ID
- [ ] Close button (X) dismisses the modal
- [ ] Clicking the backdrop dismisses the modal

### 8. Empty State -- No Transactions

- [ ] When `transactions` array is empty, empty state is shown
- [ ] Empty state shows wallet icon, "Your wallet is empty" message
- [ ] "Add Money" button in empty state opens the Add Money modal

### 9. Empty State -- No Matching Results

- [ ] When search/filters produce no results, a different empty state is shown
- [ ] Shows "No matching transactions" message
- [ ] "Clear all filters" link resets search and filters

### 10. Low Balance Warning

- [ ] When balance is at or below the threshold (2,000), balance text turns amber
- [ ] Low balance warning icon and "Low balance" text appear below the balance
- [ ] Warning is not shown when balance is above the threshold

### 11. Pagination

- [ ] When more than 8 transactions exist, pagination controls appear
- [ ] Shows "X-Y of Z" text
- [ ] Page number buttons with active state (emerald background)
- [ ] Previous/Next buttons with disabled states at boundaries
- [ ] Clicking a page number shows the correct slice of transactions
- [ ] Search/filter changes reset to page 1

### 12. Responsive Design

- [ ] Desktop (md+): Table layout with 5 columns
- [ ] Mobile (below md): Grouped card layout with date headers
- [ ] Stats cards: 2-column on mobile, 4-column on large screens
- [ ] Balance card spans 2 columns
- [ ] All interactive elements have min-h-11 for touch targets
- [ ] Add Money modal is centered and responsive

### 13. Accessibility

- [ ] All interactive elements have visible focus indicators
- [ ] Modals can be dismissed via backdrop click
- [ ] Amount input supports keyboard entry
- [ ] Category and status information uses text labels (not color alone)
