# Milestone 11: Knowledge Base

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Knowledge Base — a centralized legal knowledge repository with browsing, searching, and bilingual support for vehicle owners and fleet managers.

## Overview

A centralized legal knowledge repository where vehicle owners and fleet managers can browse, search, and access legal templates, FAQs, step-by-step guides, compliance checklists, regulatory references, judgements, and circulars. Content is curated by the LOTS247 legal team with bilingual support (EN/HI).

**Key Functionality:**
- Browse articles by category tabs: All, Templates, FAQs, Guides, Checklists, Regulations, Judgements, Circulars
- Search across all articles (title, body, tags)
- Filter by tags (vehicle type, state, document type, topic)
- View article detail with formatted content
- Category-specific rendering: downloadable templates, accordion FAQs, interactive checklists
- Related articles and helpfulness feedback
- Bilingual support (English/Hindi)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/knowledge-base/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/knowledge-base/components/`:

- `KnowledgeBase.tsx` — Browse view with search, tabs, filters, and article grid
- `ArticleDetail.tsx` — Article detail view with formatted content

### Data Layer

**Content Categories:**
- Legal Templates — Ready-to-use legal documents (affidavits, forms, applications)
- FAQs — Questions organized by topic
- Legal Guides — Step-by-step procedural guides
- Compliance Checklists — Actionable checklists
- Regulatory Reference — Motor Vehicles Act sections, penalty structures
- Judgements — Landmark court rulings (Supreme Court, High Court, MACT)
- Circulars — Government notifications from MoRTH, IRDAI, state departments

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewArticle` | Opens article detail view |
| `onSearch` | Searches articles by free text |
| `onCategoryChange` | Filters by category tab |
| `onTagFilter` | Filters by tag chips |
| `onDownloadTemplate` | Downloads template as PDF |
| `onCopyText` | Copies template text to clipboard |
| `onFeedback` | Submits "Was this helpful?" response |
| `onBack` | Returns to browse view with preserved filters |

### Empty States

- **No articles:** Show "No articles available" (unlikely but handle)
- **Search returns nothing:** Show "No results found" with suggestion to adjust search/filters
- **No related articles:** Hide related section gracefully

## Expected User Flows

### Flow 1: Browse and Search
1. User navigates to Knowledge Base
2. User sees search bar, category tabs, tag filters, and article grid
3. User types a search term (e.g., "challan dispute")
4. Grid updates to show matching articles
5. **Outcome:** User finds relevant legal content

### Flow 2: Read an Article
1. User clicks an article card from the grid
2. Detail view opens with breadcrumb, header, formatted body content
3. User reads through the article
4. User clicks "Was this helpful?" (thumbs up/down)
5. **Outcome:** User gets legal guidance, feedback captured

### Flow 3: Download a Template
1. User browses Templates category
2. User clicks a template article
3. User clicks "Download Template" or "Copy Text"
4. **Outcome:** Template PDF downloaded or text copied to clipboard

### Flow 4: Use a Checklist
1. User opens a checklist article
2. User sees interactive checkbox items grouped by section
3. User checks items as completed
4. **Outcome:** User can track progress through the checklist (state not persisted)

## Files to Reference

- `product-plan/sections/knowledge-base/README.md` — Feature overview
- `product-plan/sections/knowledge-base/tests.md` — Test instructions
- `product-plan/sections/knowledge-base/components/` — React components
- `product-plan/sections/knowledge-base/types.ts` — TypeScript interfaces
- `product-plan/sections/knowledge-base/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Browse view with search, category tabs, tag filters
- [ ] Article cards in responsive grid (3/2/1 columns)
- [ ] Search works across title, body, tags
- [ ] Category tabs filter correctly (All, Templates, FAQs, etc.)
- [ ] Tag filter chips work
- [ ] Article detail renders formatted content
- [ ] Templates: Download and Copy actions work
- [ ] FAQs: Accordion Q&A pairs expand/collapse
- [ ] Checklists: Interactive checkboxes work
- [ ] Related articles section shows at bottom
- [ ] Feedback (thumbs up/down) captures response
- [ ] Breadcrumb navigation works
- [ ] Back preserves previous filters
- [ ] Empty/no-results states handled
- [ ] Responsive on mobile
