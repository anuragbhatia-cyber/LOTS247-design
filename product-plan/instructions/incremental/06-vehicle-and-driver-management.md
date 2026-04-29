# Milestone 6: Vehicle & Driver Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement Vehicle & Driver Management — the central repository for all vehicles and drivers with compliance tracking, RC auto-fetch, and bulk upload capabilities.

## Overview

The Vehicle & Driver Management section serves as the central repository for all vehicles in the user's account. Users can add vehicles individually via RC number (with auto-fetch from API), bulk upload via CSV, and categorize vehicles by ownership type. Each vehicle tracks insurance and PUC expiry with an individual compliance score. A basic driver listing is linked to vehicles.

**Key Functionality:**
- Searchable, filterable vehicle list with compliance indicators
- Add single vehicle by RC number with API auto-fetch
- Bulk upload vehicles via CSV file
- Vehicle detail page with documents, insurance/PUC status, compliance score
- Basic driver listing linked to vehicles
- Proactive expiry alerts for insurance and PUC

## Recommended Approach: Test-Driven Development

See `product-plan/sections/vehicle-and-driver-management/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/vehicle-and-driver-management/components/`:

- `VehicleManagement.tsx` — Main vehicle list and management interface
- `AddVehicleModal.tsx` — Modal for adding vehicles (shared with AppShell)

### Data Layer

- Vehicle list with search and filters (category, compliance score, expiry status)
- RC number auto-fetch from government API
- CSV bulk upload with validation and preview
- Per-vehicle compliance score calculation
- Insurance and PUC expiry tracking with thresholds
- Driver list linked to vehicles

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddVehicle` | Opens add vehicle modal |
| `onBulkUpload` | Opens CSV upload flow |
| `onViewVehicle` | Opens vehicle detail page |
| `onFetchRC` | Fetches vehicle details by RC number from API |
| `onEditVehicle` | Edits vehicle details |
| `onViewDriver` | Opens driver detail |
| `onAssignDriver` | Assigns driver to vehicle |
| `onFilter` | Applies filters to vehicle list |

### Empty States

- **No vehicles:** Show "No vehicles yet" with prominent Add Vehicle CTA
- **No drivers:** Show "No drivers yet" with prompt to add
- **Filter returns nothing:** Show "No vehicles match your filters" with clear filters option
- **API fetch failure:** Show manual entry fallback

## Expected User Flows

### Flow 1: Add Vehicle via RC Number
1. User clicks "Add Vehicle" button
2. Modal opens with RC number input
3. User enters RC number and clicks "Fetch Details"
4. Loading spinner shown while API fetches
5. Vehicle details auto-populate for confirmation
6. **Outcome:** Vehicle added to list with compliance score calculated

### Flow 2: Bulk Upload Vehicles
1. User clicks "Bulk Upload" option
2. CSV upload interface appears
3. User uploads a CSV file
4. Preview shows validated data with any errors highlighted
5. User confirms upload
6. **Outcome:** Multiple vehicles added to the account

### Flow 3: View Vehicle Detail
1. User clicks a vehicle row in the list
2. Detail page opens showing RC details, compliance score, documents, insurance/PUC status
3. User sees assigned driver and expiry alerts
4. **Outcome:** Complete vehicle information visible

### Flow 4: Filter by Expiry Status
1. User selects "Expiring Soon" in the expiry status filter
2. Vehicle list updates to show only vehicles with upcoming expirations
3. **Outcome:** User can quickly identify vehicles needing attention

## Files to Reference

- `product-plan/sections/vehicle-and-driver-management/README.md` — Feature overview
- `product-plan/sections/vehicle-and-driver-management/tests.md` — Test instructions
- `product-plan/sections/vehicle-and-driver-management/components/` — React components
- `product-plan/sections/vehicle-and-driver-management/types.ts` — TypeScript interfaces
- `product-plan/sections/vehicle-and-driver-management/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Vehicle list renders with search and filter controls
- [ ] Add Vehicle modal with RC auto-fetch works
- [ ] CSV bulk upload with validation and preview
- [ ] Vehicle detail page shows all data sections
- [ ] Per-vehicle compliance score calculates correctly
- [ ] Insurance/PUC expiry tracking with color-coded badges
- [ ] Driver list displays with vehicle assignments
- [ ] Category filters (owned/leased/rented) work
- [ ] Empty states for all views
- [ ] Responsive on mobile
