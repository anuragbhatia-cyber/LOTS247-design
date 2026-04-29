# Milestone 8: API Catalogue

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the API Catalogue — a browsable catalogue of available APIs with detail pages, endpoint documentation, and pricing inquiry capability.

## Overview

A browsable catalogue of available APIs presented as cards in a grid layout. Users can browse APIs, click into a two-column detail page to explore features and endpoints, and submit pricing enquiries through a contact modal.

**Key Functionality:**
- Browse API cards in a 3-column responsive grid
- View API detail page with two-column layout (sidebar + tabbed content)
- Explore API features via Description tab
- View available endpoints via Endpoints tab
- Submit pricing enquiries through contact modal

## Recommended Approach: Test-Driven Development

See `product-plan/sections/api-catalogue/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/api-catalogue/components/`:

- `ApiCatalogue.tsx` — Grid of API cards
- `ApiDetail.tsx` — Two-column detail page with sidebar and tabbed content

### Data Layer

**Available APIs:**
- Challan API — Traffic challan lookup and management
- Driving Licence API — DL verification and details
- RC API — Vehicle registration certificate lookup

Each API includes: name, provider, description, category tag, features list, and endpoint definitions.

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewApi` | Opens API detail page |
| `onBack` | Returns to catalogue grid from detail |
| `onContactPricing` | Opens contact/pricing inquiry modal |
| `onSubmitInquiry` | Submits pricing inquiry message |
| `onTabChange` | Switches between Description and Endpoints tabs |

### Empty States

- **No APIs available:** Show "No APIs in catalogue yet"
- **Contact form submitted:** Show success confirmation

## Expected User Flows

### Flow 1: Browse APIs
1. User navigates to API Catalogue
2. User sees three API cards in a grid
3. Each card shows icon, name, provider, description, category tag
4. **Outcome:** User can browse all available APIs at a glance

### Flow 2: View API Detail
1. User clicks an API card (e.g., "Challan API")
2. Detail page opens with left sidebar (API info + contact CTA) and right content area
3. User reads the Description tab with feature highlights
4. User switches to Endpoints tab to see available endpoints with method badges
5. **Outcome:** User understands the API capabilities

### Flow 3: Contact for Pricing
1. User clicks "Contact for Pricing" button on detail page
2. Modal opens with message textarea
3. User enters inquiry message and clicks submit
4. **Outcome:** Inquiry submitted, confirmation shown

## Files to Reference

- `product-plan/sections/api-catalogue/README.md` — Feature overview
- `product-plan/sections/api-catalogue/tests.md` — Test instructions
- `product-plan/sections/api-catalogue/components/` — React components
- `product-plan/sections/api-catalogue/types.ts` — TypeScript interfaces
- `product-plan/sections/api-catalogue/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] API cards render in 3-column grid (responsive)
- [ ] Clicking card navigates to detail page
- [ ] Detail page shows two-column layout
- [ ] Description tab shows feature highlights
- [ ] Endpoints tab shows method badges (GET/POST), paths, descriptions
- [ ] Contact for Pricing modal works
- [ ] Back navigation returns to grid
- [ ] Empty states handled
- [ ] Responsive on mobile (cards stack)
