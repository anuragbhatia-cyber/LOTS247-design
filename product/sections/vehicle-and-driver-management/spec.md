# Vehicle & Driver Management Specification

## Overview
The Vehicle & Driver Management section serves as the central repository for all vehicles in the user's account. Users can add vehicles individually via RC number (with auto-fetch from API), bulk upload via CSV for fleet owners, and categorize vehicles by ownership type. Each vehicle tracks its insurance and PUC expiry status along with an individual compliance score. A basic driver listing is linked to vehicles.

## User Flows
- View the full vehicle list with search and filters (by category, compliance score, expiry status)
- Add a single vehicle by entering RC number — details auto-fetched via API
- Bulk upload vehicles via CSV file (for fleet owners)
- Categorize vehicles as owned, leased, or rented
- View a vehicle detail page with RC details, documents, insurance/PUC expiry status, compliance score, and assigned driver
- Track insurance and PUC expiry dates with proactive alerts
- View a basic list of drivers linked to vehicles

## UI Requirements
- Vehicle list: searchable, filterable table with columns for RC Number, Vehicle Type, Category (owned/leased/rented), Compliance Score, Insurance Expiry, PUC Expiry, and Status
- Filters: by category, compliance score range, expiry status (valid/expiring soon/expired)
- Add Vehicle: modal or form with RC number input and auto-fetch from API
- Bulk Upload: CSV upload flow with preview and validation
- Vehicle detail page: header with vehicle summary and compliance score, sections for documents, insurance/PUC status, and assigned driver
- Compliance score indicator per vehicle with color coding (green/amber/red)
- Expiry alerts: visual badges for upcoming and expired insurance/PUC
- Basic driver listing: table of drivers with name, license number, and assigned vehicle

## Configuration
- shell: true
