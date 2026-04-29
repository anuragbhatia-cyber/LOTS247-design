# API Catalogue — API Discovery & Access

## Overview

The API Catalogue provides a browsable grid of available APIs that fleet operators can integrate with. Each API card displays the service name, description, credit cost, and availability status. The detail page shows full documentation with Description and Endpoints tabs. Users can request access via a contact modal or top up API credits.

## User Flows

1. **Browse APIs** — User sees a responsive grid of API cards, each showing: name, short description, credit cost chip, and status badge.
2. **Search & Filter** — User can search by API name or filter by category.
3. **API Detail** — Tapping a card opens ApiDetail with two tabs: Description (overview, use cases, pricing) and Endpoints (method, path, parameters, sample request/response).
4. **Contact Modal** — User taps "Request Access" to open ContactModal with a pre-filled inquiry form.
5. **Credit Top-Up** — User taps the credit balance indicator to open TopUpModal where they can purchase additional API credits.

## Design Decisions

- API cards in a responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop.
- Credit cost displayed as a colored chip on each card (green for low cost, amber for medium, red for high).
- Detail page uses a tabbed layout for Description and Endpoints.
- Endpoint documentation styled with code blocks and syntax highlighting.
- Contact modal includes fields: Name, Email, Message, and a dropdown for the specific API.

## Data Used

- `product/sections/api-catalogue/data.json` — Sample API entries with descriptions, endpoints, pricing.
- `product/sections/api-catalogue/types.ts` — ApiService, ApiEndpoint, CreditPackage.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| ApiCatalogue | ApiCatalogue.tsx | Grid of API cards with search |
| ApiDetail | ApiDetail.tsx | Tabbed detail with docs |
| ContactModal | ContactModal.tsx | Access request form |
| TopUpModal | TopUpModal.tsx | Credit purchase interface |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onApiSelect | ApiCatalogue | `(apiId: string) => void` | Opens API detail |
| onRequestAccess | ApiDetail | `(apiId: string) => void` | Opens contact modal |
| onSubmitContact | ContactModal | `(data: ContactForm) => void` | Sends access request |
| onTopUp | TopUpModal | `(packageId: string) => void` | Purchases credit package |
| onBack | ApiDetail | `() => void` | Returns to catalogue |
