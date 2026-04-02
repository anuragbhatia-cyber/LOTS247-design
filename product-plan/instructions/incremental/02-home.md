# Milestone 2: Home

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

Implement the Home screen — the daily entry point for fleet operators providing a real-time operational snapshot.

## Overview

The Home screen is the primary control center of LOTS247, serving as the default landing view after login. It provides a real-time operational snapshot across five summary cards and four quick action shortcuts, answering: "What is the current health of my fleet and what needs attention right now?"

**Key Functionality:**
- View five overview cards: Active Vehicles, Active Drivers, Pending Challans, Active Incidents, Subscription Status
- Quick action buttons: Add Incident, Add Vehicle, Call a Lawyer, Add Driver
- Fleet-wide compliance health score with category breakdown
- Proactive alerts for expiring documents and pending challans
- Activity feed showing recent system events
- Deep-linking from cards to respective modules

## Recommended Approach: Test-Driven Development

See `product-plan/sections/home/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/home/components/`:
- `HomeView.tsx` — Main home layout
- `TopHeader.tsx` — Page header
- `OverviewCard.tsx` — Stat card component
- `QuickActions.tsx` — Quick action buttons
- `ComplianceScore.tsx` — Compliance health score display
- `VehicleComplianceCheck.tsx` — Vehicle compliance checker
- `VehicleComplianceResultsView.tsx` — Compliance check results
- `ActivityView.tsx` — Activity section
- `ActivityFeed.tsx` — Activity feed list
- `AddIncidentModal.tsx` — Modal for creating incidents
- `CheckChallanModal.tsx` — Modal for checking challans
- `ChallanResultsView.tsx` — Challan check results

### Data Layer

Key types from `types.ts`: HomeStats, ComplianceScore, AlertItem, Subscriber, Subscription, ActiveVehiclesStat, ActiveDriversStat, PendingChallansStat, ActiveIncidentsStat

You'll need to:
- Create API endpoints to aggregate fleet stats
- Fetch compliance scores from the compliance engine
- Aggregate alerts from document expiry tracking
- Stream activity feed events

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewVehicles` | Navigate to Vehicle & Driver Management |
| `onViewDrivers` | Navigate to Driver list |
| `onViewChallans` | Navigate to Challan Management with filters |
| `onViewIncidents` | Navigate to Incident Management |
| `onViewSubscription` | Navigate to Subscription settings |
| `onAddIncident` | Open Add Incident modal |
| `onAddVehicle` | Open Add Vehicle modal |
| `onCallLawyer` | Trigger legal support call |
| `onAddDriver` | Open Add Driver form |
| `onViewProfile` | Navigate to user profile |
| `onLogout` | Trigger logout flow |

### Empty States

- No vehicles yet: Show "Add your first vehicle" CTA
- No challans: Show "No pending challans" message
- No incidents: Show "No active incidents" message
- No alerts: Show "All clear — your fleet is compliant"

## Expected User Flows

### Flow 1: View Fleet Overview
1. User lands on Home after login
2. User sees all five overview cards with live data
3. User clicks "Pending Challans" card
4. **Outcome:** Navigates to Challan Management with pending filter

### Flow 2: Quick Action — Add Incident
1. User clicks "Add Incident" button
2. Modal opens with incident creation form
3. User fills in incident details and submits
4. **Outcome:** Incident created, card updates

### Flow 3: Check Compliance Alerts
1. User views compliance health score
2. User sees alerts for expiring PUC/insurance
3. User clicks an alert
4. **Outcome:** Deep-links to the vehicle's detail page

## Files to Reference

- `product-plan/sections/home/README.md`
- `product-plan/sections/home/tests.md`
- `product-plan/sections/home/components/`
- `product-plan/sections/home/types.ts`
- `product-plan/sections/home/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Five overview cards render with real data
- [ ] Quick actions trigger correct modals/actions
- [ ] Compliance score displays with category breakdown
- [ ] Alerts show for expiring documents
- [ ] Activity feed shows recent events
- [ ] Empty states display when no data exists
- [ ] Deep-links work to respective modules
- [ ] Responsive on mobile
