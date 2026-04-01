# Settings Specification

## Overview
The Settings section gives subscribers control over notification preferences, app behavior, and subscription management. It consolidates alert channel configuration, default app preferences, plan management, and billing history into a clean tabbed interface, separate from My Profile which handles identity, organization, and KYC details.

## User Flows

### Notification Preferences
- User navigates to Settings and lands on the Notifications tab by default
- User sees notification categories: Compliance (document expiry, score changes), Incidents (case updates, lawyer assignment), Challans (new challans, payment reminders), and Billing (renewal, payment receipts, low wallet balance)
- Each category shows channel toggles: In-App, WhatsApp, Email, SMS
- User toggles channels on/off per category; changes auto-save with a confirmation toast
- User enables Quiet Hours with start and end time (e.g., 10 PM to 7 AM); critical alerts (active incident escalations) are exempt
- Fleet/Business accounts see a "Daily Compliance Digest via WhatsApp" toggle

### Preferences
- User selects a default landing page after login: Home (default), Compliance Dashboard, or Incidents
- Fleet/Business accounts see a "Show vehicle count on sidebar badges" toggle

### Subscription & Billing
- User views current plan card: plan name, status (Active/Expiring/Expired), next renewal date, price
- User sees usage against limits: vehicles used/limit, users used/limit with progress bars
- User clicks "Change Plan" to view a plan comparison modal with all available plans
- User views billing history table: Date, Description, Amount, Status, Download PDF

## UI Requirements

### Tab Navigation
- Horizontal tabs: Notifications, Preferences, Subscription & Billing
- Tabs scroll horizontally on mobile with active indicator
- Settings icon and page title "Settings" at the top

### Notifications Tab
- Vertical stack of category cards, each with:
  - Category header with icon (ShieldCheck for Compliance, AlertTriangle for Incidents, FileWarning for Challans, CreditCard for Billing)
  - Row of channel toggles: In-App, WhatsApp, Email, SMS as labeled toggle switches
  - Dividers between categories
- Quiet Hours section at bottom: toggle + time pickers (visible when enabled) + info text about critical alerts
- Fleet/Business: additional "Daily Digest" toggle card with WhatsApp icon

### Preferences Tab
- Default landing page: radio group with three options (Home, Compliance Dashboard, Incidents)
- Fleet/Business only: sidebar badge toggle with description

### Subscription & Billing Tab
- Current plan card with status color (emerald active, amber expiring, red expired)
- Usage meters: horizontal progress bars for vehicles/limit and users/limit
- Feature checklist with checkmarks (included) and lock icons (locked)
- "Change Plan" button opens modal with plan comparison cards
- Billing history table below: Date, Description, Amount, Status, Download (responsive desktop table + mobile cards)

## Configuration
- shell: true
