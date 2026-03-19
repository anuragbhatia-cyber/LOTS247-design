# API Catalogue Specification

## Overview
A browsable catalogue of available APIs presented as cards in a grid layout. Users can browse APIs, click into a two-column detail page to explore features and endpoints, and submit pricing enquiries through a contact modal.

## User Flows
- **Browse APIs** — User sees three API cards (Challan API, Driving Licence API, RC API) in a 3-column responsive grid
- **View API Detail** — Clicking a card opens a detail page with a left sidebar (API info + contact CTA) and right content area with tabbed views (Description and Endpoints)
- **Contact for Pricing** — Clicking the "Contact for Pricing" button opens a modal with a single message textarea and submit button

## UI Requirements
- **Catalogue page**: 3-column card grid (responsive — stacks on mobile). Each card shows icon, API name, provider subtitle (e.g. "Built by LOTS247"), short description, and a category tag/badge at the bottom
- **Detail page — Left sidebar**: Back button, API icon + name, full description, "View documentation" link, category label, "Interested in using [API]?" text with "Contact for Pricing" button
- **Detail page — Right content (tabbed)**:
  - "Description" tab: Feature highlight sections (heading + paragraph pairs) showcasing key benefits of the API
  - "Endpoints" tab: List of available endpoints with method badge (GET/POST), path, and short description
- **Contact modal**: Single message textarea and submit button
- Cards are clickable — entire card navigates to the detail page

## Configuration
- shell: true
