# Home Section - Test Instructions

## HomeView

### Rendering
- [ ] Displays time-appropriate greeting (Good morning/afternoon/evening) with subscriber name
- [ ] Renders 4 quick action cards: Add Vehicle, Add Incident, Check Vehicle Challans, Check Vehicle-wise Compliance
- [ ] Renders ComplianceScore card with overall score and category breakdown
- [ ] Renders AlertsFeed card with up to 3 alerts

### Quick Actions
- [ ] Clicking "Add Vehicle" triggers `onAddVehicle` callback
- [ ] Clicking "Add Incident" dispatches `postMessage` with type `openAddIncident`
- [ ] Clicking "Check Vehicle Challans" dispatches `postMessage` with type `openCheckChallan`
- [ ] Clicking "Check Vehicle-wise Compliance" opens the VehicleComplianceCheck modal

### Navigation
- [ ] "See all alerts" button switches view to full AlertsView
- [ ] ComplianceScore "View details" navigates to compliance dashboard via postMessage

## ComplianceScore

### Rendering
- [ ] Shows SVG ring chart with overall compliance percentage
- [ ] Displays up to 5 category breakdown bars with labels and percentages
- [ ] Colors reflect status: green for healthy, amber for warning, red for critical

### Interactions
- [ ] "View details" button calls the provided callback

## AlertsFeed

### Rendering
- [ ] Shows first 3 alerts from the items array
- [ ] Each alert shows vehicle number, title, and action button
- [ ] Urgency styling: critical = red icon bg, warning = amber, notice = yellow
- [ ] Challan alerts show "Pay Now" button, others show "Raise Proposal"

### Interactions
- [ ] Clicking an alert row calls `onAlertClick` with the alert item
- [ ] Action button click calls `onAlertClick` (stops event propagation)
- [ ] "See all alerts" footer only shows when items.length > 3
- [ ] "See all alerts" calls `onViewAll`

## AlertsView (ActivityView)

### Rendering
- [ ] Shows back button with title
- [ ] Lists all alert items with urgency-based styling
- [ ] Each alert shows vehicle number, title, urgency badge, and days remaining

### Interactions
- [ ] Back button calls `onBack`

## VehicleComplianceCheck

### Rendering
- [ ] Modal opens when `open` is true
- [ ] Shows vehicle number input field with 10-character max
- [ ] Input auto-formats to uppercase, strips non-alphanumeric characters

### Validation
- [ ] "Check" button is disabled when input length < 6
- [ ] Submitting calls `onShowResults` with the vehicle number

## CheckChallanModal

### Rendering
- [ ] Similar to VehicleComplianceCheck modal
- [ ] Vehicle number input with auto-formatting

### Validation
- [ ] Input restricted to alphanumeric, uppercase, max 10 chars
- [ ] Submit dispatches results view

## AddIncidentModal

### Multi-step Flow
- [ ] Step 1: Shows category selection (Challan, Case, RTO Issue, Other)
- [ ] Selecting a category advances to step 2
- [ ] Step 2: Shows appropriate form based on selected category
- [ ] Back button returns to category selection

### Form Fields
- [ ] Challan: Vehicle number, challan number, violation type, amount, date, location
- [ ] Case: Vehicle number, case type dropdown, description, severity, location fields
- [ ] RTO Issue: Vehicle number, issue type, description
- [ ] Other: Vehicle number, description

## NotificationsView

### Rendering
- [ ] Shows back button
- [ ] Lists sample notifications with icons, titles, descriptions, and timestamps
- [ ] Different notification types have different icon colors

## Empty States
- [ ] AlertsFeed shows no footer when alerts array is empty
- [ ] AlertsFeed shows "0 alerts" count when empty

## Bilingual Support
- [ ] All visible text changes when language switches between "en" and "hi"
- [ ] Quick action labels, greeting, stat labels all translate correctly

## Responsive Design
- [ ] Quick actions grid: 2 columns on mobile, 4 on desktop (lg:grid-cols-4)
- [ ] Compliance + Alerts: stacked on mobile, 2 columns on desktop
