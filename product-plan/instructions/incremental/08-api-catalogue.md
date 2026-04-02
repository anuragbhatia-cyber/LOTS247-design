# Milestone 8: API Catalogue

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

Implement the API Catalogue — a browsable catalogue of available APIs presented as cards in a grid layout, with a two-column detail page for each API and a contact modal for pricing enquiries.

## Overview

The API Catalogue is an informational section showcasing the APIs available through LOTS247. Users browse a card grid, click into detailed API pages, and submit pricing enquiries through a contact modal. The catalogue currently features three APIs (Challan API, Driving Licence API, RC API) but should be built to accommodate additional APIs in the future.

**Key Functionality:**
- Card grid browsing (3-column responsive grid, stacks on mobile)
- Each card shows icon, API name, provider subtitle, short description, and category tag
- Detail page with left sidebar (API info + contact CTA) and right content area with tabs
- "Description" tab with feature highlight sections (heading + paragraph pairs)
- "Endpoints" tab with method badges (GET/POST), paths, and descriptions
- "Contact for Pricing" modal with message textarea and submit button
- "View documentation" link on detail page sidebar

## Recommended Approach: Test-Driven Development

See `product-plan/sections/api-catalogue/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/api-catalogue/components/`:
- `ApiCatalogue.tsx` — Card grid view with all API cards
- `ApiDetail.tsx` — Two-column detail page with sidebar and tabbed content
- `ContactModal.tsx` — Contact/pricing enquiry modal with message textarea
- `TopUpModal.tsx` — API credit top-up modal

Additional top-level views:
- `ApiCatalogueView.tsx` — Preview wrapper for the catalogue grid
- `ApiDetailView.tsx` — Preview wrapper for the detail page

### Data Layer

Key types from `types.ts`: Api, ApiEndpoint, ApiFeature

You'll need to:
- Create a data store for API catalogue entries (can be static/seeded data initially)
- Store API definitions: name, provider, descriptions, documentation URL, category, icon, features, endpoints
- Create API endpoints to list all APIs and fetch a single API by ID
- Implement the contact/pricing enquiry submission (store message, notify internal team)
- Store and manage pricing enquiries

### Callbacks — Catalogue

| Callback | Description |
|----------|-------------|
| `onViewDetail` | Navigate to the API detail page (by API ID) |

### Callbacks — Detail

| Callback | Description |
|----------|-------------|
| `onBack` | Navigate back to the catalogue grid |
| `onContactSubmit` | Submit a pricing enquiry message for a specific API |

### Empty States

- No APIs in catalogue: Show "No APIs available yet. Check back soon."
- No endpoints listed for an API: Show "Endpoint documentation coming soon"
- No features listed for an API: Show "Feature details coming soon"

## Expected User Flows

### Flow 1: Browse API Catalogue
1. User navigates to API Catalogue
2. User sees three API cards in a grid layout: Challan API, Driving Licence API, RC API
3. Each card displays the API name, provider ("Built by LOTS247"), short description, and category badge
4. **Outcome:** User has a quick overview of all available APIs

### Flow 2: View API Detail
1. User clicks the "Challan API" card
2. Detail page opens with a two-column layout
3. Left sidebar shows: API icon, name, full description, "View documentation" link, category label, and "Contact for Pricing" button
4. Right content area shows "Description" tab active with feature highlights
5. User clicks "Endpoints" tab
6. Endpoints list shows method badges (GET/POST), paths, and descriptions
7. **Outcome:** User understands the API's capabilities and available endpoints

### Flow 3: Submit Pricing Enquiry
1. User is on an API detail page
2. User clicks "Contact for Pricing" button in the sidebar
3. Contact modal opens with a message textarea
4. User types their enquiry and clicks "Submit"
5. **Outcome:** Enquiry is submitted; user sees confirmation; internal team is notified

## Files to Reference

- `product-plan/sections/api-catalogue/README.md`
- `product-plan/sections/api-catalogue/tests.md`
- `product-plan/sections/api-catalogue/components/`
- `product-plan/sections/api-catalogue/types.ts`
- `product-plan/sections/api-catalogue/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Card grid renders with all APIs (3-column on desktop, stacked on mobile)
- [ ] Each card shows icon, name, provider, description, and category badge
- [ ] Clicking a card navigates to the detail page
- [ ] Detail page renders with two-column layout (sidebar + content)
- [ ] Sidebar shows API info, documentation link, and "Contact for Pricing" button
- [ ] "Description" tab shows feature highlights as heading + paragraph pairs
- [ ] "Endpoints" tab shows method badge (GET/POST), path, and description for each endpoint
- [ ] Tab switching works between Description and Endpoints
- [ ] "Contact for Pricing" modal opens with message textarea
- [ ] Enquiry submission works and provides confirmation
- [ ] Back button navigates from detail to catalogue grid
- [ ] "View documentation" link works
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile
