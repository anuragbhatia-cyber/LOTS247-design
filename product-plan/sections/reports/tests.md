# Reports Section -- Test Instructions

## Setup

Render the `ReportsList` component with the sample data from `sample-data.json`. Provide mock callbacks for `onDownload`, `onShareEmail`, `onShareWhatsApp`, `onPreview`, `onTabChange`, and `onSearch`.

---

## Test Cases

### 1. Viewing the Report List

- [ ] Component renders without errors
- [ ] Page title "Reports" and subtitle are visible
- [ ] All 11 sample reports are displayed (across pages if paginated)
- [ ] Each report row shows: period, report type badge, format, generated date/time
- [ ] Reports are sorted by generated date in descending order (most recent first)
- [ ] Desktop view shows a table layout; mobile view shows card layout

### 2. Tab Navigation

- [ ] All 5 tabs are visible: All, MIS, ICR, ISR, MIS-Challan
- [ ] Each tab shows a count badge with the correct number of reports
- [ ] "All" tab is selected by default and shows all 11 reports
- [ ] Clicking "MIS" tab filters to show only MIS reports (3 reports)
- [ ] Clicking "ICR" tab filters to show only ICR reports (3 reports)
- [ ] Clicking "ISR" tab filters to show only ISR reports (3 reports)
- [ ] Clicking "MIS-Challan" tab filters to show only MIS-CHALLAN reports (2 reports)
- [ ] `onTabChange` callback is called with the selected tab value
- [ ] Switching tabs resets pagination to page 1

### 3. Search and Filtering

- [ ] Search input is visible with placeholder text
- [ ] Typing a period name (e.g., "Feb 2026") filters reports to matching results
- [ ] Typing a vehicle registration (e.g., "UP32MM1113") filters to matching reports
- [ ] Typing an incident ID (e.g., "INC-2026-0042") filters to matching reports
- [ ] Clear button (X) appears when search has text; clicking it clears the search
- [ ] `onSearch` callback is called with the current search query
- [ ] Filters button toggles the filter panel
- [ ] Format filter dropdown allows selecting "PDF" or "Excel"
- [ ] When a format filter is active, the Filters button shows a count badge
- [ ] "Clear filters" link resets the format filter
- [ ] Search and tab filters work together (e.g., search within a specific tab)

### 4. Report Preview Modal

- [ ] Clicking a report row opens the preview modal
- [ ] Preview modal shows: report type badge, format, title, generated date/time
- [ ] Preview modal shows a PDF placeholder with the report icon and metadata
- [ ] MIS reports show incident summary stats (total, resolved, pending)
- [ ] MIS-CHALLAN reports show challan summary stats (total challans, resolved, fines)
- [ ] ICR/ISR reports show incident ID, vehicle registration, and incident type
- [ ] "Download PDF" button is visible and calls `onDownload` with the report ID
- [ ] "WhatsApp" share button is visible and calls `onShareWhatsApp` with the report ID
- [ ] Close button (X) dismisses the modal
- [ ] Clicking the backdrop dismisses the modal
- [ ] `onPreview` callback is called with the report ID when modal opens

### 5. Download Action

- [ ] Download button on desktop table row calls `onDownload` with the report ID
- [ ] Download button on mobile card calls `onDownload` with the report ID
- [ ] Download button in preview modal calls `onDownload` with the report ID
- [ ] Click on the download action button does not trigger the row click (preview)

### 6. Share Actions

- [ ] WhatsApp button on desktop table row calls `onShareWhatsApp` with the report ID
- [ ] WhatsApp button on mobile card calls `onShareWhatsApp` with the report ID
- [ ] WhatsApp button in preview modal calls `onShareWhatsApp` with the report ID
- [ ] Action buttons do not propagate click to the row (event stopPropagation)

### 7. Pagination

- [ ] When more than 8 reports exist, pagination controls appear
- [ ] Pagination shows "X-Y of Z reports" text
- [ ] Page number buttons are displayed
- [ ] Active page button is highlighted with emerald background
- [ ] Previous button is disabled on the first page
- [ ] Next button is disabled on the last page
- [ ] Clicking a page number navigates to that page
- [ ] Search/filter changes reset pagination to page 1

### 8. Empty State

- [ ] When no reports match the current search/tab/filter, an empty state is shown
- [ ] Empty state shows a search icon, "No reports found" message, and helper text
- [ ] Empty state appears in both desktop (inside table) and mobile (card area) views

### 9. Responsive Design

- [ ] Desktop (md+): Table layout with columns for Period, Report Type, Format, Generated, Actions
- [ ] Mobile (below md): Card layout with stacked report information
- [ ] Mobile cards show Download and WhatsApp action buttons
- [ ] Tab bar scrolls horizontally on small screens
- [ ] All interactive elements have min-h-11 for touch targets

### 10. Accessibility

- [ ] Tab buttons have descriptive `title` attributes
- [ ] Action buttons have `title` attributes for screen readers
- [ ] Focus states are visible on all interactive elements
- [ ] Modal traps focus and can be dismissed with keyboard
