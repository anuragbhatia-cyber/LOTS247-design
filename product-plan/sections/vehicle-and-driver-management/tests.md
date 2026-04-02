# Vehicle & Driver Management Section - Test Instructions

## VehicleList

### Rendering
- [ ] Shows page header "Vehicles & Drivers" with subtitle
- [ ] Shows "Add Driver" and "Add Vehicle" buttons
- [ ] Shows 4 summary stat cards: Total Vehicles, Avg Compliance, Expired Docs, Expiring Soon
- [ ] Shows tab switcher: Vehicles / Drivers with count badges
- [ ] Shows search input with context-appropriate placeholder

### Vehicles Tab
- [ ] Desktop: shows table with columns: Vehicle, Category, Compliance, Subscription, Insurance Upto, PUC Upto, Actions
- [ ] Mobile: shows card layout with key vehicle info
- [ ] Each row shows compliance score badge (color-coded)
- [ ] Subscription status badge (Active/Inactive)
- [ ] Insurance/PUC expiry dates with status indicators
- [ ] Vehicles with `detailsFetched: false` show "Fetch Details" button
- [ ] Clicking "Fetch Details" shows loading spinner, then reveals details after 1.5s
- [ ] Action menu (3-dot) shows: View Details, Edit, Deactivate

### Drivers Tab
- [ ] Desktop: shows table with columns: Driver, License Number, License Expiry, Assigned Vehicles, Actions
- [ ] Mobile: shows card layout
- [ ] License expiry status badge (Valid/Expiring/Expired)
- [ ] Assigned vehicles shown as monospace chips
- [ ] "No vehicles assigned" shown when driver has no vehicles
- [ ] Action menu shows: View Details, Change Vehicle, Remove Driver

### Search
- [ ] Vehicles tab: search by RC number, make, model, driver name
- [ ] Drivers tab: search by name, license number, phone
- [ ] Case-insensitive search
- [ ] Results update as user types

### Filters (Vehicles Tab)
- [ ] Document Status: All, Valid, Expiring Soon, Expired
- [ ] Vehicle Status: All, Active, Inactive
- [ ] Active filter count shown on filter button
- [ ] Filter pills shown below search with clear buttons

### Sorting
- [ ] Compliance (High to Low / Low to High)
- [ ] RC Number (A-Z / Z-A)
- [ ] Expiry (Soonest / Latest)

### Pagination
- [ ] 5 items per page
- [ ] Shows "X of Y vehicles/drivers"
- [ ] Page numbers with prev/next buttons
- [ ] Resets to page 1 on search/filter change

### Change Vehicle Modal (from Drivers tab)
- [ ] Step 1: Shows vehicle list with search
- [ ] Currently assigned vehicles marked with badge
- [ ] Cannot select currently assigned vehicle
- [ ] Step 2: Shows confirmation with driver name and selected vehicle
- [ ] Step 3: Shows success message
- [ ] Close resets modal state

## VehicleDetail

### Rendering
- [ ] Shows back button "Back to Vehicles"
- [ ] Shows vehicle header: RC number, make/model, compliance ring, status badge
- [ ] Shows alert banners for expired/expiring documents
- [ ] Shows 6 tabs: Details, Documents, Compliance, Challans, Incidents, Assigned Driver

### Details Tab
- [ ] Shows vehicle info: RC Number (read-only), Vehicle Type, Make, Model, Year, Category, Status
- [ ] "Fetch Details" button for vehicles with detailsFetched: false

### Documents Tab
- [ ] Shows document cards for each vehicle document
- [ ] Each card shows: document type, status badge, expiry date, days remaining
- [ ] Valid documents show action menu (View, Download)
- [ ] "Upload Document" button opens upload modal
- [ ] Upload modal: document type dropdown, drag-and-drop file zone
- [ ] Supported files: PDF, JPG, PNG, WebP up to 10MB

### Compliance Tab
- [ ] Shows large compliance ring with score and label
- [ ] Lists expired/expiring documents with counts
- [ ] If all valid, shows "All documents are valid" message

### Challans Tab
- [ ] Initial state: shows "Fetch Challans" prompt with vehicle number
- [ ] Fetching state: shows loading animation
- [ ] Results state: shows pending challans grouped by type (Court/Online)
- [ ] Each challan shows: number, violation, amount, location, date
- [ ] Status badges: Pending (amber), Submitted (blue), Resolved (green)
- [ ] Summary shows total pending amount
- [ ] "Submit for Resolution" / "Pay Now" actions
- [ ] "Re-fetch" button to refresh challan data

### Incidents Tab
- [ ] Shows list of cases/incidents related to this vehicle
- [ ] Desktop: table layout; Mobile: card layout
- [ ] Empty state: "No incidents reported" message

### Assigned Driver Tab
- [ ] Shows driver info: name, license number, expiry, status, assigned vehicles
- [ ] Empty state: "No driver assigned" with prompt to assign
- [ ] "Assign Driver" / "Change Driver" button opens AssignDriverModal

### Edit Vehicle Modal
- [ ] Shows RC Number (read-only), Make, Model, Vehicle Type dropdown, Status toggle
- [ ] Cancel resets form to original values
- [ ] Save calls onSave callback

### Assign Driver Modal
- [ ] Shows searchable driver list
- [ ] Current driver marked with badge
- [ ] License status shown for each driver
- [ ] Cannot re-select current driver
- [ ] Confirm calls onAssign with driver ID

## AddVehicleModal

### Single Vehicle Tab
- [ ] Shows vehicle number input field
- [ ] Auto-formats to uppercase, strips non-alphanumeric, max 10 chars
- [ ] Submit button disabled until length >= 6
- [ ] Success state shows vehicle number and confirmation message
- [ ] "Done" button closes modal

### Bulk Upload Tab
- [ ] Shows drag-and-drop zone for file upload
- [ ] Shows "Download Sample" button
- [ ] Accepts CSV, XLS, XLSX files only
- [ ] Selected file shows name, size, and remove button
- [ ] "Upload & Import" button disabled until file selected
- [ ] Shows required columns info box

## AddDriverModal

### Rendering
- [ ] Shows form: Full Name, Phone Number, License Number, License Expiry
- [ ] Submit button disabled until: name >= 2 chars, phone >= 10 digits, license >= 6 chars
- [ ] Phone input accepts digits only
- [ ] License input auto-formats to uppercase

### Interactions
- [ ] Cancel clears form and closes modal
- [ ] Submit calls onAdd and closes modal

## BulkUploadModal

### Rendering
- [ ] Shows "Download Sample" button in header
- [ ] Shows drag-and-drop file zone
- [ ] Shows required columns info

### File Handling
- [ ] Drag-over highlights the drop zone
- [ ] Valid files: CSV, XLS, XLSX
- [ ] Selected file shows name, size, checkmark, and remove option
- [ ] "Upload & Import" disabled until file selected
- [ ] Cancel clears file and closes modal

## Bilingual Support
- [ ] All visible text translates between "en" and "hi"
- [ ] Tab labels, headers, filter options, button labels, empty states all translate

## Responsive Design
- [ ] VehicleList: table on desktop (lg+), cards on mobile
- [ ] Summary cards: 2 columns on mobile, 4 on desktop
- [ ] VehicleDetail: responsive tabs
- [ ] Modals: centered with padding, max-width constrained
