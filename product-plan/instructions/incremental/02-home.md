# Milestone 2: Home

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Home section — the daily landing page and operational control center for fleet operators.

## Overview

The Home screen is the primary entry point after login, providing a real-time operational snapshot with five summary cards, quick action shortcuts, compliance health scoring, and proactive alerts. It answers: "What is the current health of my fleet and what needs attention right now?"

**Key Functionality:**
- View five overview cards: Active Vehicles, Active Drivers, Pending Challans (count + amount), Active Tickets, Subscription Status
- Execute quick actions: Add Incident, Add Vehicle, Call a Lawyer, Add Driver
- View overall Compliance Health Score with category breakdown
- See proactive alerts for expiring documents and pending challans
- Deep-link from any card or alert to the relevant module

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/home/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/home/components/`:

- `Home.tsx` — Main home layout with overview cards, quick actions, compliance score, and alerts

### Data Layer

The components expect these data shapes (from `types.ts`):
- `HomeData` — Combined home state with vehicle/driver counts, challans, incidents, subscription
- `ComplianceScore` — Overall score and category breakdowns
- `Alert` — Proactive alert items with urgency levels

You'll need to:
- Create API endpoints aggregating data from vehicles, drivers, challans, incidents, and subscriptions
- Calculate compliance health score from document validity across fleet
- Generate alerts based on expiry thresholds (7, 15, 30 days)

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onAddIncident` | Opens incident creation workflow |
| `onAddVehicle` | Opens add vehicle modal (plan limit check) |
| `onCallLawyer` | Triggers legal support (call modal on web) |
| `onAddDriver` | Opens add driver form |
| `onCardClick` | Deep-links to respective module |
| `onAlertClick` | Navigates to specific vehicle detail |

### Empty States

- **No vehicles yet:** Show zero-state on Active Vehicles card with prompt to add
- **No challans:** Show "No Pending Challans" message
- **No alerts:** Show "All clear" state in alerts section
- **Subscription expired:** Show urgency state with renewal CTA

## Expected User Flows

### Flow 1: View Fleet Status
1. User logs in and lands on Home
2. User sees all five overview cards populated with live data
3. User clicks "Pending Challans" card
4. **Outcome:** Navigates to Challan Management with pending filter applied

### Flow 2: Quick Action — Add Incident
1. User clicks "Add Incident" quick action button
2. Incident creation workflow opens
3. **Outcome:** User can create a new incident from Home

### Flow 3: View Compliance Alert
1. User sees an alert: "MH12AB1234 — PUC expires in 5 days"
2. User clicks the alert
3. **Outcome:** Navigates to that vehicle's detail page in Fleet Management

### Flow 4: Plan Limit Reached
1. User clicks "Add Vehicle" but has reached plan limit
2. **Outcome:** Upgrade prompt is shown instead of add vehicle form

## Files to Reference

- `product-plan/sections/home/README.md` — Feature overview and design intent
- `product-plan/sections/home/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/home/components/` — React components
- `product-plan/sections/home/types.ts` — TypeScript interfaces
- `product-plan/sections/home/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Five overview cards render with real data
- [ ] Quick action buttons trigger correct workflows
- [ ] Compliance health score calculates from fleet data
- [ ] Alerts generated from expiry thresholds
- [ ] Deep-links navigate to correct modules
- [ ] Plan limits enforced with upgrade prompts
- [ ] Empty states display properly when no records exist
- [ ] Responsive on mobile
