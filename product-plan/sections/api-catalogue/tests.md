# API Catalogue Section -- Test Instructions

## Setup

Render the `ApiCatalogue` component with the sample data from `sample-data.json`. Provide mock callbacks for `onContactPricing`.

---

## Test Cases

### 1. Viewing API Cards

- [ ] Component renders without errors
- [ ] "API Catalogue" title and subtitle are visible
- [ ] All 3 sample APIs are displayed as cards
- [ ] Each card shows: API name, short description, and action buttons
- [ ] "All APIs" view splits cards into "Available APIs" and "My APIs" sections
- [ ] "My APIs" cards show an "Active" badge
- [ ] Available API cards show "Check Details" and "Contact for Pricing" buttons
- [ ] My API cards show "Top-up Balance" and "Check Details" buttons

### 2. Sidebar and Tab Navigation

- [ ] Desktop sidebar shows "All APIs" and "My APIs" items with counts
- [ ] "All APIs" sidebar item is active by default
- [ ] Clicking "My APIs" sidebar item filters to show only subscribed APIs (1 API)
- [ ] Mobile tab switcher is visible on small screens, hidden on desktop
- [ ] Mobile tabs show count badges matching the sidebar counts
- [ ] Active sidebar/tab item is highlighted with emerald styling

### 3. Clicking to View API Detail

- [ ] Clicking an API card navigates to the detail view
- [ ] Clicking "Check Details" button on a card navigates to detail view
- [ ] Detail view shows: API name, full description, "How it Works" flow
- [ ] "How it Works" shows 4 numbered steps with descriptions
- [ ] "Back to catalogue" button is visible and returns to the card grid
- [ ] For available (non-subscribed) APIs: credits table and "Contact for Pricing" button are shown
- [ ] For subscribed APIs: tabs for Credits per Hit, Usage, and Logs are shown

### 4. Detail Tabs (My APIs)

- [ ] "Credits per Hit" tab is selected by default
- [ ] Credits table shows endpoint names, methods (with colored badges), and credit costs
- [ ] Free endpoints show "Free" text instead of a number
- [ ] Switching to "Usage" tab shows a progress bar and daily bar chart
- [ ] Usage progress bar shows percentage of credits used
- [ ] Daily bar chart shows 7 days of usage data
- [ ] Switching to "Logs" tab shows a table of recent API calls
- [ ] Logs table shows timestamp, method badge, endpoint path, and latency
- [ ] Active tab has an emerald underline indicator

### 5. Contact for Pricing Modal

- [ ] Clicking "Contact for Pricing" button opens the modal
- [ ] Modal shows the API name in the description
- [ ] Textarea is present and auto-focused
- [ ] "Send Enquiry" button is disabled when textarea is empty
- [ ] Typing a message enables the "Send Enquiry" button
- [ ] Submitting shows a success confirmation with "Enquiry sent!" message
- [ ] Success state auto-closes after ~1.8 seconds
- [ ] "Cancel" button closes the modal without submitting
- [ ] Clicking the backdrop closes the modal
- [ ] Close (X) button closes the modal

### 6. Top-up Balance Modal

- [ ] Clicking "Top-up Balance" on a My API card opens the top-up modal
- [ ] Modal shows current balance (1,753 credits)
- [ ] Preset amount buttons are displayed (500, 1000, 2000, 5000)
- [ ] Clicking a preset fills the amount input
- [ ] Selected preset button is highlighted with emerald styling
- [ ] Custom amount can be typed in the input field
- [ ] "Add Money" button is disabled when amount is empty or zero
- [ ] Submitting shows a success confirmation
- [ ] "Cancel" button and backdrop close the modal

### 7. Navigating Back to Catalogue

- [ ] "Back to catalogue" link in detail view returns to the card grid
- [ ] Clicking a sidebar item while in detail view returns to the grid and switches tabs
- [ ] State resets properly when navigating back (selected API is cleared)

### 8. Empty State

- [ ] "My APIs" tab with no subscribed APIs shows empty state
- [ ] Empty state shows "No APIs subscribed yet" message
- [ ] "Browse All APIs" button switches to the "All APIs" tab

### 9. Responsive Design

- [ ] Desktop: Sidebar is visible, cards in 2-column grid
- [ ] Mobile: Sidebar is hidden, mobile tab switcher appears
- [ ] Cards stack to single column on mobile
- [ ] Detail view is usable on mobile with scrollable content
- [ ] All interactive elements have appropriate touch targets

### 10. Accessibility

- [ ] All buttons have visible focus indicators
- [ ] Modal can be dismissed with backdrop click
- [ ] Method badges use color + text for HTTP methods (not color alone)
- [ ] Card click areas are clearly interactive (cursor-pointer)
