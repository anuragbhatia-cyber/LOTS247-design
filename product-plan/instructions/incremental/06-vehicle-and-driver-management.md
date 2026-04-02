# Milestone 6: Vehicle & Driver Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Vehicle & Driver Management section — the central repository for all vehicles and drivers in the user's account, with individual vehicle addition via RC auto-fetch, bulk CSV upload, vehicle detail with compliance tracking, and a basic driver listing.

## Overview

Vehicle & Driver Management is the foundational fleet data section that many other sections depend on (Compliance Dashboard, Incidents, Home stats). Users can add vehicles individually via RC number (with auto-fetch from government API), bulk upload via CSV for fleet owners, and categorize vehicles by ownership type. Each vehicle tracks its insurance, PUC, and fitness expiry status along with an individual compliance score. A basic driver listing is linked to vehicles.

**Key Functionality:**
- Vehicle list with search and filters (by category, compliance score, expiry status)
- Add single vehicle by RC number with auto-fetch from government API
- Bulk upload vehicles via CSV file with preview and validation
- Categorize vehicles as owned, leased, or rented
- Vehicle detail page with RC details, documents, compliance score, expiry dates, and assigned driver
- Track insurance, PUC, and fitness expiry dates with proactive alerts
- Basic driver listing with name, license number, license status, and assigned vehicles
- Add driver modal and assign driver to vehicle

## Recommended Approach: Test-Driven Development

See `product-plan/sections/vehicle-and-driver-management/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/vehicle-and-driver-management/components/`:
- `VehicleList.tsx` — Searchable, filterable vehicle table with columns for RC number, vehicle type, category, compliance score, insurance expiry, PUC expiry, and status
- `VehicleDetail.tsx` — Vehicle detail page with header summary, compliance score, document sections, expiry status, and assigned driver
- `AddVehicleModal.tsx` — Modal with RC number input, fetch details button, auto-populated confirmation, manual fallback (shared component also used in AppShell)
- `AddDriverModal.tsx` — Modal for adding a new driver
- `BulkUploadModal.tsx` — CSV upload flow with file selection, preview, validation, and confirmation

Additional top-level views:
- `VehicleList.tsx` (top-level) — Preview wrapper for vehicle list
- `VehicleDetail.tsx` (top-level) — Preview wrapper for vehicle detail

### Data Layer

Key types from `types.ts`: Vehicle, VehicleCategory, VehicleStatus, SubscriptionStatus, DocumentType, DocumentStatus, VehicleDocument, Driver, LicenseStatus, VehicleFilters

You'll need to:
- Create CRUD API endpoints for vehicles and drivers
- Integrate with government RC vehicle details API for auto-fetch on add
- Implement CSV parsing, validation, and bulk vehicle creation
- Calculate per-vehicle compliance scores based on document validity
- Track document expiry dates (insurance, PUC, fitness, RC)
- Implement driver-vehicle assignment (one driver can be assigned to multiple vehicles)
- Implement search across vehicle fields (RC number, make, model)
- Implement filtering by category, compliance score range, and expiry status

### Callbacks — Vehicle List

| Callback | Description |
|----------|-------------|
| `onViewVehicle` | Navigate to vehicle detail page |
| `onAddVehicle` | Open Add Vehicle modal |
| `onBulkUpload` | Open Bulk Upload modal |
| `onEditVehicle` | Open edit form for a vehicle |
| `onDeleteVehicle` | Delete a vehicle (with confirmation) |
| `onChangeCategory` | Change a vehicle's category (owned/leased/rented) |
| `onAssignDriver` | Assign a driver to a vehicle |
| `onSearch` | Search the vehicle list |
| `onFilter` | Apply filters to the vehicle list |

### Callbacks — Vehicle Detail

| Callback | Description |
|----------|-------------|
| `onBack` | Navigate back to vehicle list |
| `onEdit` | Open edit form for the vehicle |
| `onDelete` | Delete the vehicle (with confirmation) |
| `onChangeCategory` | Change the vehicle's category |
| `onAssignDriver` | Assign or change the driver |

### Empty States

- No vehicles: Show "No vehicles in your fleet yet" with prominent "Add Vehicle" and "Bulk Upload" CTAs
- No drivers: Show "No drivers added yet" with "Add Driver" CTA
- No documents on a vehicle: Show "No documents tracked for this vehicle"
- Search/filter with no results: Show "No vehicles match your search" with option to clear filters
- Vehicle with no assigned driver: Show "No driver assigned" with "Assign Driver" button

## Expected User Flows

### Flow 1: Add a Single Vehicle via RC Number
1. User clicks "Add Vehicle" button on the vehicle list
2. Add Vehicle modal opens with RC number input field
3. User enters RC number (e.g., "MH04AB1234") and clicks "Fetch Details"
4. Loading spinner shows while API fetches vehicle data
5. Vehicle details auto-populate (name, type, registration date, owner, fuel type)
6. User confirms details
7. **Outcome:** Vehicle is added to the list with auto-fetched data

### Flow 2: Bulk Upload Vehicles via CSV
1. User clicks "Bulk Upload" button on the vehicle list
2. Bulk Upload modal opens with file input
3. User selects a CSV file
4. System parses CSV and shows a preview table with validation results
5. User reviews the preview (valid rows, invalid rows with error messages)
6. User clicks "Import" to confirm
7. **Outcome:** Valid vehicles are added to the fleet; invalid rows are reported

### Flow 3: View Vehicle Detail and Compliance
1. User clicks a vehicle row in the list
2. Vehicle detail page opens with header (RC number, make, model, year)
3. User sees compliance score (color-coded), document sections with expiry dates
4. User sees insurance, PUC, and fitness status with urgency badges
5. User sees the assigned driver (or "No driver assigned" with assign button)
6. **Outcome:** User has full visibility into the vehicle's compliance state

### Flow 4: Assign Driver to Vehicle
1. User is on a vehicle's detail page
2. User clicks "Assign Driver" button
3. A dropdown or modal shows available drivers
4. User selects a driver
5. **Outcome:** Driver is assigned to the vehicle; both vehicle detail and driver listing reflect the assignment

## Files to Reference

- `product-plan/sections/vehicle-and-driver-management/README.md`
- `product-plan/sections/vehicle-and-driver-management/tests.md`
- `product-plan/sections/vehicle-and-driver-management/components/`
- `product-plan/sections/vehicle-and-driver-management/types.ts`
- `product-plan/sections/vehicle-and-driver-management/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Vehicle list renders with searchable, filterable table
- [ ] Filters work for category, compliance score range, and expiry status
- [ ] Search works across RC number, make, model
- [ ] Add Vehicle modal works with RC auto-fetch from API
- [ ] Manual entry fallback works when API fails
- [ ] Duplicate RC number shows inline error
- [ ] Bulk Upload modal parses CSV, shows preview, validates, and imports
- [ ] Vehicle detail page shows all fields, compliance score, and documents
- [ ] Document expiry badges display correctly (valid, expiring soon, expired)
- [ ] Driver listing shows all drivers with license status and assigned vehicles
- [ ] Add Driver modal works
- [ ] Driver-vehicle assignment works from both list and detail views
- [ ] Delete vehicle works with confirmation dialog
- [ ] Change vehicle category works (owned/leased/rented)
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile
