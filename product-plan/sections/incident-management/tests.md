# Incident Management Section - Test Instructions

## ChallanList

### Rendering
- [ ] Shows page header "Challans" with subtitle
- [ ] Shows summary stat cards: Total, Submitted, In Progress, Resolved, On Hold
- [ ] Shows search input with placeholder text
- [ ] Shows filter dropdowns: Status, Challan Type
- [ ] Shows sortable column headers
- [ ] Desktop: renders table layout
- [ ] Mobile: renders card layout

### Search
- [ ] Searching by challan ID filters results
- [ ] Searching by vehicle number filters results
- [ ] Searching by violation type filters results
- [ ] Empty search shows all results
- [ ] Search is case-insensitive

### Filters
- [ ] Status filter: All, Submitted, In Progress, Resolved, On Hold, Not Settled
- [ ] Type filter: All, Court, Online
- [ ] Active filters show as pills below search bar
- [ ] Clear button on each filter pill removes that filter
- [ ] "Clear all" removes all filters

### Pagination
- [ ] Shows page numbers with prev/next buttons
- [ ] Displays "Showing X-Y of Z" text
- [ ] Page resets to 1 when search/filter changes
- [ ] Disabled prev button on first page, disabled next on last page

### Row Actions
- [ ] Clicking a row calls `onView` with challan id
- [ ] Status badge colors: submitted (blue), inProgress (amber), resolved (green), onHold (orange), notSettled (red)

## ChallanDetail

### Rendering
- [ ] Shows back button
- [ ] Shows challan ID and status badge in header
- [ ] Shows 4 tabs: Overview, Follow-up, Reports, Documents

### Overview Tab
- [ ] Shows SLA progress bar with deadline date
- [ ] SLA bar color: green when > 50% time remaining, amber 25-50%, red < 25%
- [ ] Shows violation details: type, amount, location, date
- [ ] Shows vehicle and driver information
- [ ] Shows challan type badge (Court/Online)

### Follow-up Tab
- [ ] Shows timeline of activities in chronological order
- [ ] Each activity shows icon, description, performer, timestamp
- [ ] Shows comment input at bottom
- [ ] Posting a comment calls onAddComment
- [ ] Comments show author name, message, and timestamp

### Reports Tab
- [ ] Lists available reports/receipts
- [ ] Shows download button for each report

### Documents Tab
- [ ] Lists uploaded documents with file name and upload date
- [ ] Shows "Upload Document" button
- [ ] Upload modal with drag-and-drop zone
- [ ] Supports PDF, JPG, PNG file types

## CaseList

### Rendering
- [ ] Shows page header "Cases" with subtitle
- [ ] Shows summary stat cards: Total, Submitted, In Progress, Resolved, Doc Requested, Extended
- [ ] Shows search input
- [ ] Shows filter dropdowns: Status, Case Type, Vehicle

### Search
- [ ] Searching by case ID filters results
- [ ] Searching by vehicle number filters results
- [ ] Searching by case type filters results

### Filters
- [ ] Status filter: All, Submitted, In Progress, Resolved, Doc Requested, Extended
- [ ] Case Type filter: Theft, Detention, Bail, Accidents, FIRs, Superdari, Vehicle Impounding, E-Way Bill, Others
- [ ] Vehicle filter: All vehicles from the vehicles array

### Pagination
- [ ] Same pagination behavior as ChallanList

## CaseDetail

### Rendering
- [ ] Shows back button
- [ ] Shows case ID and status badge in header
- [ ] Shows 4 tabs: Overview, Follow-up, Reports, Documents

### Overview Tab
- [ ] Shows SLA progress bar with deadline
- [ ] Shows case type badge
- [ ] Shows description, vehicle info, driver info, lawyer info
- [ ] Shows incident location details (state, city, area)
- [ ] Shows reporter info if available
- [ ] Shows origin badge (Manual/Lawyer Call/Escalation)

### Follow-up Tab
- [ ] Timeline with status change activities
- [ ] Comment section with input and submit button
- [ ] Comments from user vs team styled differently

### Reports Tab
- [ ] Lists incident reports as downloadable PDFs
- [ ] Shows generated date for each report

### Documents Tab
- [ ] Lists attached documents
- [ ] Upload modal with file type validation
- [ ] Shows upload date and uploader type (user/lawyer)

## Bilingual Support
- [ ] All visible text changes when language switches between "en" and "hi"
- [ ] Status labels, filter options, headers all translate

## Responsive Design
- [ ] ChallanList: table on desktop (lg+), cards on mobile
- [ ] CaseList: table on desktop (lg+), cards on mobile
- [ ] Detail views: responsive tab layout
- [ ] Modals: centered with padding on all screen sizes
