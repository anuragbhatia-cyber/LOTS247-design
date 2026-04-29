# Home — Quick Actions Hub

## Overview

The Home section serves as the primary dashboard and entry point for LOTS247 users. It provides a bird's-eye view of fleet health through 5 overview cards, a compliance score gauge, recent alerts, and quick-action shortcuts that reduce navigation depth for the most common tasks.

## User Flows

1. **Dashboard Load** — On login or navigation to home, the user sees 5 overview cards (Vehicles, Drivers, Active Challans, Pending Cases, Wallet Balance), a compliance score ring, and an activity feed.
2. **Quick Actions** — Tapping Add Incident, Add Vehicle, Call Lawyer, or Add Driver opens the respective modal or initiates a phone call.
3. **Check Challan** — User enters a vehicle number in the CheckChallanModal, results are displayed in ChallanResultsView with actionable receipt-style cards.
4. **Vehicle Compliance Check** — User enters a vehicle number, sees compliance status across RC, Insurance, PUCC, Permit, and DL in VehicleComplianceResultsView.
5. **Notifications** — Bell icon opens NotificationsView with grouped alerts (Renewals, Challans, Cases).
6. **Activity Feed** — Scrollable timeline of recent events across the fleet (new challans, renewals due, case updates).

## Design Decisions

- Overview cards use the product accent color with dark-mode variants.
- Compliance score is a radial gauge with color bands (red below 50, amber 50-79, green 80+).
- Quick actions are displayed as a horizontal row of icon buttons with labels beneath.
- Activity feed uses infinite scroll with date separators.
- Modals (AddIncidentModal, CheckChallanModal) are bottom-sheet style on mobile, centered on desktop.

## Data Used

- `product/sections/home/data.json` — Sample overview stats, activity items, compliance scores, challan results.
- `product/sections/home/types.ts` — OverviewStats, ActivityItem, ComplianceScore, ChallanResult, Notification.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| HomeView | HomeView.tsx | Top-level orchestrator |
| TopHeader | TopHeader.tsx | Greeting, date, notification bell |
| OverviewCard | OverviewCard.tsx | Stat card with icon, value, label |
| QuickActions | QuickActions.tsx | Row of shortcut buttons |
| ComplianceScore | ComplianceScore.tsx | Radial gauge with score |
| NotificationsView | NotificationsView.tsx | Grouped notification list |
| VehicleComplianceCheck | VehicleComplianceCheck.tsx | Input and results for vehicle compliance |
| CheckChallanModal | CheckChallanModal.tsx | Modal to search challans by vehicle number |
| ChallanResultsView | ChallanResultsView.tsx | List of challan cards from search |
| VehicleComplianceResultsView | VehicleComplianceResultsView.tsx | Compliance status grid |
| AddIncidentModal | AddIncidentModal.tsx | Form to report a new incident |
| ActivityView | ActivityView.tsx | Container for activity feed |
| ActivityFeed | ActivityFeed.tsx | Timeline of recent events |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onAddVehicle | QuickActions | `() => void` | Opens AddVehicleModal |
| onAddIncident | QuickActions | `() => void` | Opens AddIncidentModal |
| onCallLawyer | QuickActions | `() => void` | Initiates lawyer call |
| onAddDriver | QuickActions | `() => void` | Opens AddDriverModal |
| onCheckChallan | CheckChallanModal | `(vehicleNumber: string) => void` | Triggers challan search |
| onNotificationTap | NotificationsView | `(id: string) => void` | Navigates to related entity |
| onCardTap | OverviewCard | `(type: string) => void` | Navigates to respective section |
| onViewAllActivity | ActivityView | `() => void` | Expands activity feed |
