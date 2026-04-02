# API Catalogue Section

## Overview

The API Catalogue section provides a browsable marketplace of APIs available on the LOTS247 platform. Users can discover APIs for vehicle compliance, challan data, driving licence verification, and RC lookup. The section supports two views:

- **All APIs** -- Browse the full catalogue, split into "Available APIs" and "My APIs" sections
- **My APIs** -- View only subscribed APIs with usage stats, credits, and logs

## Features

- **Sidebar navigation** (desktop) with "All APIs" and "My APIs" tabs, plus count badges
- **Mobile tab switcher** for responsive navigation
- **API card grid** showing name, short description, and action buttons
- **API detail view** with:
  - "How it Works" step-by-step flow visualization
  - Credits per Hit table showing endpoint credit costs
  - Usage stats with progress bar and daily bar chart (My APIs only)
  - Recent API call logs table (My APIs only)
  - Balance display and Top-up button (My APIs only)
- **Contact for Pricing modal** with textarea for enquiry message and success confirmation
- **Top-up Balance modal** with preset amounts and custom input
- **Empty state** when no APIs are subscribed
- **Back navigation** from detail view to catalogue

## Components

| Component | File | Description |
|-----------|------|-------------|
| `ApiCatalogue` | `components/ApiCatalogue.tsx` | Main component -- sidebar + card grid + detail view with tabs |
| `ApiDetail` | `components/ApiDetail.tsx` | Alternative detail page with left sidebar + tabbed content (Description, Endpoints) |
| `ContactModal` | `components/ContactModal.tsx` | Modal for submitting pricing enquiry with success state |
| `TopUpModal` | `components/TopUpModal.tsx` | Modal for adding credits with preset amounts |

## Data

- **Types**: `types.ts` -- `Api`, `ApiEndpoint`, `ApiFeature`, `ApiCatalogueProps`, `ApiDetailProps`
- **Sample data**: `sample-data.json` -- 3 sample APIs (Challan API, Driving Licence API, RC API)

## Props

### ApiCatalogue
- `apis` -- Array of `Api` objects
- `onContactPricing` -- Optional callback when user submits a pricing enquiry

### ApiDetail
- `api` -- Single `Api` object to display
- `onBack` -- Callback for back navigation
- `onContactSubmit` -- Callback when enquiry is submitted

## Usage

```tsx
import { ApiCatalogue } from './components'
import sampleData from './sample-data.json'

<ApiCatalogue
  apis={sampleData.apis}
  onContactPricing={(id) => console.log('Contact for', id)}
/>
```
