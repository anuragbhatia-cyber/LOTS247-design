# Vehicle & Driver Management — Test Specifications

## Overview

Tests for vehicle listing, vehicle addition (single and bulk), vehicle detail view, driver management, and the shared modal components.

---

## 1. Vehicle List

### Success Path
- [ ] Navigate to Vehicle & Driver Management
- [ ] Verify vehicle list renders with cards showing: vehicle number, make/model, compliance badge, driver name
- [ ] Search for "MH01" — verify list filters to matching vehicles
- [ ] Sort by compliance score (lowest first) — verify order updates
- [ ] Filter by status "Non-Compliant" — verify only non-compliant vehicles show
- [ ] Verify total vehicle count label is accurate

### Failure Path
- [ ] API failure — verify error state with retry
- [ ] Search with no matches "ZZ99XX0000" — verify "No vehicles found" message
- [ ] Network offline — verify cached vehicle list displays with "Offline" badge

---

## 2. Add Vehicle (Single)

### Success Path
- [ ] Tap "Add Vehicle" button — verify AddVehicleModal opens
- [ ] Enter RC number "MH01AB1234"
- [ ] Verify loading shimmer while fetching from Vahan database
- [ ] Verify auto-populated fields: Make "Tata", Model "Ace", Fuel "Diesel", Registration Date, Expiry Date
- [ ] Edit model to "Ace Gold" — verify field is editable
- [ ] Tap Confirm — verify onAddVehicle fires with complete data
- [ ] Verify modal closes and new vehicle appears in list

### Failure Path
- [ ] Enter empty RC — verify "RC number is required" error
- [ ] Enter invalid format "123ABC" — verify "Enter a valid RC number (e.g., MH01AB1234)"
- [ ] RC fetch returns 404 — verify "Vehicle not found in Vahan. Enter details manually." with manual form
- [ ] Duplicate RC (already in fleet) — verify "This vehicle is already in your fleet" warning
- [ ] Server error on submit — verify "Failed to add vehicle" toast with retry

---

## 3. Bulk Upload

### Success Path
- [ ] Tap "Bulk Upload" — verify BulkUploadModal opens
- [ ] Upload CSV file with 5 RC numbers
- [ ] Verify progress bar advances (1/5, 2/5, ... 5/5)
- [ ] Verify summary: "4 added successfully, 1 failed"
- [ ] Verify failed row shows reason (e.g., "Invalid RC format")
- [ ] Tap "Done" — verify modal closes and list refreshes

### Failure Path
- [ ] Upload non-CSV file (.xlsx) — verify "Please upload a CSV file" error
- [ ] Upload empty CSV — verify "File contains no data" error
- [ ] Upload CSV with 1000+ rows — verify warning "Maximum 100 vehicles per upload"
- [ ] Network drops mid-upload — verify "Upload interrupted. X of Y processed." with resume option

---

## 4. Vehicle Detail

### Success Path
- [ ] Tap vehicle "MH01AB1234" — verify VehicleDetail opens
- [ ] Verify header: vehicle number, make/model, compliance score gauge
- [ ] Verify tabs: Overview, Documents, Challans, Driver
- [ ] Overview tab shows: registration details, fuel type, chassis number, engine number
- [ ] Documents tab shows: RC, Insurance, PUCC, Permit with status and expiry
- [ ] Challans tab shows linked challans in receipt-style cards
- [ ] Driver tab shows linked driver with DL details
- [ ] Tap back — verify return to list

### Failure Path
- [ ] Vehicle with no linked driver — Driver tab shows "No driver linked" with "Link Driver" CTA
- [ ] Vehicle with no challans — Challans tab shows "No challans found"

---

## Empty State Tests

- [ ] Empty fleet — "No vehicles yet. Add your first vehicle." with Add Vehicle CTA
- [ ] No drivers — driver section shows "No drivers added" with Add Driver CTA
- [ ] Vehicle detail with no documents — Documents tab shows placeholder for each document type

## Component Interaction Tests

- [ ] AddVehicleModal opened from QuickActions (home) works identically to opening from VehicleList
- [ ] Adding a vehicle from modal immediately reflects in VehicleList without page refresh
- [ ] Linking a driver from VehicleDetail updates both vehicle and driver records
- [ ] Bulk upload results can be dismissed and re-viewed from a notification

## Edge Cases

- [ ] Vehicle number with spaces "MH 01 AB 1234" auto-normalizes to "MH01AB1234"
- [ ] RC with special state codes (e.g., "DL" for Delhi, "TS" for Telangana)
- [ ] CSV with mixed valid/invalid rows processes all valid rows
- [ ] Very long owner name truncates with ellipsis in list, full name in detail
- [ ] Simultaneous AddVehicle from two devices — deduplication by RC number

## Accessibility Checks

- [ ] Vehicle cards have aria-label with vehicle number and compliance status
- [ ] AddVehicleModal has aria-labelledby for title
- [ ] Bulk upload progress bar has role="progressbar" with aria-valuenow
- [ ] Search input has aria-label "Search vehicles"
- [ ] Tab navigation in VehicleDetail works with keyboard
- [ ] Modal traps focus and returns focus on close

## Sample Test Data

```json
{
  "vehicles": [
    {
      "id": "v-001",
      "vehicleNumber": "MH01AB1234",
      "make": "Tata",
      "model": "Ace",
      "fuelType": "Diesel",
      "registrationDate": "2022-03-15",
      "expiryDate": "2037-03-14",
      "complianceScore": 85,
      "driverId": "d-001",
      "status": "active"
    },
    {
      "id": "v-002",
      "vehicleNumber": "MH04CD5678",
      "make": "Mahindra",
      "model": "Bolero Pickup",
      "fuelType": "Diesel",
      "registrationDate": "2021-08-20",
      "expiryDate": "2036-08-19",
      "complianceScore": 62,
      "driverId": null,
      "status": "active"
    }
  ],
  "drivers": [
    {
      "id": "d-001",
      "name": "Suresh Patil",
      "phone": "9876543210",
      "dlNumber": "MH0120220001234",
      "dlExpiry": "2028-06-30",
      "linkedVehicle": "v-001"
    }
  ],
  "bulkUploadCSV": "RC Number\nMH01AB1234\nMH04CD5678\nINVALID123\nMH12EF9012\nMH20GH3456"
}
```
