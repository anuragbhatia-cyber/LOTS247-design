# Vehicle & Driver Management Section

The Vehicle & Driver Management section provides a central repository for managing fleet vehicles and their assigned drivers. It includes list views with search/filter/sort, detail views with tabbed content, and modals for adding vehicles, drivers, and bulk uploading.

## Components

| Component | Description |
|---|---|
| `VehicleList` | Main list view with vehicle/driver tabs, summary stat cards, search, filters, sorting, pagination, and both desktop table and mobile card layouts. Includes ChangeVehicleModal for driver reassignment. |
| `VehicleDetail` | Vehicle detail view with 6 tabs: Details, Documents, Compliance, Challans, Incidents, Assigned Driver. Includes edit vehicle modal, assign driver modal, and upload document modal. |
| `AddVehicleModal` | Modal for adding a single vehicle by RC number or bulk uploading via spreadsheet |
| `AddDriverModal` | Modal for adding a new driver with name, phone, license details |
| `BulkUploadModal` | Standalone modal for bulk uploading vehicles from CSV/XLS/XLSX files |

## Data Requirements

- **Vehicle[]**: Vehicles with RC number, type, make, model, compliance score, document statuses
- **Driver[]**: Drivers with name, phone, license details, assigned vehicle IDs
- **VehicleDocument[]**: Per-vehicle documents (insurance, PUC, fitness, RC) with expiry status

## External Dependencies

- `lucide-react` - Icon library
- `LanguageContext` - Provides `{ language }` value (`"en"` | `"hi"`) for bilingual support
- `react-dom` (createPortal) - Used by ChangeVehicleModal for portal rendering
- Tailwind CSS v4 with `dark:` variant support

### Cross-Section Dependencies (VehicleDetail only)

VehicleDetail imports from the incident-management section:
- `ChallanList` component (for the Challans tab)
- `CaseList` component (for the Incidents tab)
- `incident-management/data.json` (sample challan/case data)

These cross-section imports are commented out in the export. You must wire up challan and incident data via props or your own data layer.

## Key Patterns

- Vehicle list supports 3 sort options: Compliance (High/Low), RC Number (A-Z/Z-A), Expiry (Soonest/Latest)
- Filters: Document Status (Valid/Expiring/Expired), Vehicle Status (Active/Inactive)
- Summary cards show: Total Vehicles, Avg Compliance, Expired Docs, Expiring Soon
- Compliance score badge color-coded: green >= 75, amber >= 50, red < 50
- "Fetch Details" button simulates government API fetch (1.5s delay)
- Vehicles with `detailsFetched: false` show a fetch button instead of full details
- ChangeVehicleModal has 3 steps: Search vehicle -> Confirm assignment -> Success
- VehicleDetail Challans tab has 3 states: idle (fetch prompt), fetching, results
- Document upload supports drag-and-drop with file type validation
- All text supports English/Hindi bilingual rendering
