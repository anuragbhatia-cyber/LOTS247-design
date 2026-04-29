# Settings — Preferences & Plan Management

## Overview

The Settings section allows users to configure notification preferences, set quiet hours, choose a default landing page, manage their subscription plan, and view billing history. It is accessible from the sidebar navigation and provides a straightforward toggle-and-select interface.

## User Flows

1. **Notification Toggles** — User enables/disables notification channels: Push, Email, SMS for each event type (Challans, Renewals, Cases, Wallet).
2. **Quiet Hours** — User sets a time range during which notifications are silenced (e.g., 10:00 PM to 7:00 AM).
3. **Default Landing Page** — User selects which section loads on login (Home, Compliance Dashboard, Vehicle Management).
4. **Plan Management** — User views current plan details, compares plans, and can upgrade or downgrade.
5. **Billing History** — User browses past invoices with download option.

## Design Decisions

- Settings organized in collapsible sections with clear headers.
- Notification preferences use a matrix of toggles (rows = event types, columns = channels).
- Quiet hours use time picker inputs for start and end.
- Default landing page is a radio button group.
- Plan management shows current plan highlighted with "Change Plan" CTA.
- Billing history is a simple table with date, amount, status, and download link.

## Data Used

- `product/sections/settings/data.json` — Sample notification settings, plans, billing records.
- `product/sections/settings/types.ts` — NotificationSettings, QuietHours, Plan, BillingRecord.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| Settings | Settings.tsx | Full settings interface |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onToggleNotification | Settings | `(event: string, channel: string, enabled: boolean) => void` | Toggles a notification |
| onSetQuietHours | Settings | `(start: string, end: string) => void` | Sets quiet hours |
| onSetDefaultLanding | Settings | `(sectionId: string) => void` | Sets default landing page |
| onChangePlan | Settings | `(planId: string) => void` | Initiates plan change |
| onDownloadInvoice | Settings | `(invoiceId: string) => void` | Downloads billing invoice |
