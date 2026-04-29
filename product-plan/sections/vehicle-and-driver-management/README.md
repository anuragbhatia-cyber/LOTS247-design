# Vehicle & Driver Management

## Overview

Vehicle & Driver Management is the core fleet registry. It enables fleet managers to add vehicles (individually via RC auto-fetch or in bulk via CSV), view vehicle details with compliance scores, manage drivers with DL verification, and maintain associations between vehicles and drivers.

## User Flows

1. **Vehicle List** — Scrollable list of all fleet vehicles with search, sort (by name, compliance score, date added), and filter (by status, group).
2. **Add Vehicle** — AddVehicleModal opens with RC number input. On entry, vehicle details are auto-fetched from the Vahan database. User confirms or edits details.
3. **Bulk Upload** — BulkUploadModal accepts a CSV file with RC numbers. System processes each and shows success/failure summary.
4. **Vehicle Detail** — VehicleDetail shows full vehicle profile: RC details, compliance score breakdown, linked driver, document statuses, and associated challans.
5. **Driver Listing** — Driver tab within the section shows all drivers with DL status and linked vehicles.
6. **Add Driver** — AddDriverModal collects driver name, phone, DL number (with auto-fetch), and links to a vehicle.

## Design Decisions

- Vehicle list uses card layout on mobile, table layout on desktop.
- Compliance score per vehicle is a small colored badge (green/amber/red) on each card.
- AddVehicleModal and AddDriverModal are shared components (also used from AppShell quick actions).
- Bulk upload shows a real-time progress bar with per-row status.
- Vehicle detail tabs: Overview, Documents, Challans, Driver.

## Data Used

- `product/sections/vehicle-and-driver-management/data.json` — Sample vehicles, drivers, compliance data.
- `product/sections/vehicle-and-driver-management/types.ts` — Vehicle, Driver, BulkUploadResult.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| VehicleList | VehicleList.tsx | Searchable, filterable vehicle list |
| VehicleDetail | VehicleDetail.tsx | Full vehicle profile with tabs |
| AddVehicleModal | AddVehicleModal.tsx | RC entry + auto-fetch modal |
| AddDriverModal | AddDriverModal.tsx | Driver details + DL fetch modal |
| BulkUploadModal | BulkUploadModal.tsx | CSV upload with progress |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onVehicleSelect | VehicleList | `(vehicleId: string) => void` | Opens vehicle detail |
| onAddVehicle | AddVehicleModal | `(data: Vehicle) => void` | Confirms new vehicle |
| onAddDriver | AddDriverModal | `(data: Driver) => void` | Confirms new driver |
| onBulkUpload | BulkUploadModal | `(file: File) => void` | Processes CSV upload |
| onSearch | VehicleList | `(query: string) => void` | Filters by search term |
| onBack | VehicleDetail | `() => void` | Returns to vehicle list |
| onLinkDriver | VehicleDetail | `(vehicleId: string, driverId: string) => void` | Associates driver |
