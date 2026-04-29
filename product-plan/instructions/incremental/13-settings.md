# Milestone 13: Settings

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Settings section — notification preferences, app behavior configuration, subscription management, and billing history.

## Overview

Settings gives subscribers control over notification preferences, app behavior, and subscription management. It consolidates alert channel configuration, default app preferences, plan management, and billing history into a clean tabbed interface, separate from My Profile which handles identity and KYC.

**Key Functionality:**
- Configure notification channels per category (In-App, WhatsApp, Email, SMS)
- Set Quiet Hours with critical alert exemptions
- Choose default landing page after login
- View current subscription plan with usage meters
- Change plans via comparison modal
- View billing history with PDF download

## Recommended Approach: Test-Driven Development

See `product-plan/sections/settings/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/settings/components/`:

- `Settings.tsx` — Settings page with tabbed interface

### Data Layer

**Notification Categories:**
- Compliance: document expiry, score changes
- Incidents: case updates, lawyer assignment
- Challans: new challans, payment reminders
- Billing: renewal, payment receipts, low wallet balance

**Channels:** In-App, WhatsApp, Email, SMS (toggle per category)

**Subscription Data:**
- Current plan: name, status, renewal date, price
- Usage: vehicles used/limit, users used/limit
- Available plans for comparison
- Billing history: date, description, amount, status, PDF download

### Callbacks

| Callback | Description |
|----------|-------------|
| `onToggleChannel` | Toggles notification channel for a category |
| `onSetQuietHours` | Enables/configures quiet hours |
| `onSetLandingPage` | Sets default landing page preference |
| `onChangePlan` | Opens plan comparison modal |
| `onSelectPlan` | Selects new plan from comparison |
| `onDownloadInvoice` | Downloads billing PDF |

### Empty States

- **No billing history:** Show "No billing history yet" (new accounts)
- **Free plan:** Show limited features with upgrade prompts

## Expected User Flows

### Flow 1: Configure Notifications
1. User navigates to Settings → Notifications tab
2. User sees category cards with channel toggles
3. User toggles off "SMS" for Compliance notifications
4. Change auto-saves with confirmation toast
5. **Outcome:** Notification preference updated

### Flow 2: Set Quiet Hours
1. User enables Quiet Hours toggle
2. Time pickers appear for start (10 PM) and end (7 AM)
3. User sets times
4. **Outcome:** Non-critical notifications suppressed during quiet hours

### Flow 3: Change Subscription Plan
1. User navigates to Subscription & Billing tab
2. User sees current plan card with usage meters
3. User clicks "Change Plan"
4. Plan comparison modal opens with all available plans
5. User selects a new plan
6. **Outcome:** Plan change initiated (payment if upgrading)

### Flow 4: Download Billing Invoice
1. User scrolls to billing history table
2. User clicks "Download" on a billing entry
3. **Outcome:** PDF invoice downloads

## Files to Reference

- `product-plan/sections/settings/README.md` — Feature overview
- `product-plan/sections/settings/tests.md` — Test instructions
- `product-plan/sections/settings/components/` — React components
- `product-plan/sections/settings/types.ts` — TypeScript interfaces
- `product-plan/sections/settings/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Tabs work: Notifications, Preferences, Subscription & Billing
- [ ] Notification category cards with channel toggles
- [ ] Toggle changes auto-save with confirmation toast
- [ ] Quiet Hours toggle with time pickers
- [ ] Critical alerts exempt from quiet hours (info text shown)
- [ ] Fleet/Business: Daily Digest toggle visible
- [ ] Default landing page radio selection
- [ ] Fleet/Business: sidebar badge toggle visible
- [ ] Current plan card with status color
- [ ] Usage meters (vehicles, users) with progress bars
- [ ] Change Plan modal with comparison cards
- [ ] Billing history table with PDF download
- [ ] Empty states handled
- [ ] Responsive on mobile (table → cards)
