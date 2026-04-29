# Knowledge Base — Test Specifications

## Overview

Tests for article browsing, 8 category tabs, search, tag filtering, article detail, download/copy, and feedback.

---

## 1. Article Browse & Category Tabs

### Success Path
- [ ] Navigate to Knowledge Base
- [ ] Verify 8 category tabs render: All, FAQs, Templates, Checklists, Guides, Judgements, Circulars, BOT247
- [ ] Verify "All" tab is active by default showing all articles
- [ ] Verify article cards show: title, excerpt, category badge, tag chips, read time
- [ ] Tap "FAQs" tab — verify only FAQ articles show
- [ ] Tap "Templates" tab — verify only template articles show
- [ ] Tap "Judgements" tab — verify only judgement articles show
- [ ] Tap "Circulars" tab — verify only circular articles show

### Failure Path
- [ ] API failure — verify "Unable to load articles" with retry
- [ ] Category with zero articles — verify "No articles in this category yet"

---

## 2. Search

### Success Path
- [ ] Tap search bar — verify it focuses with keyboard appearing
- [ ] Type "insurance" — verify real-time filtering shows matching articles
- [ ] Verify search matches title, excerpt, and tags
- [ ] Clear search — verify full list returns
- [ ] Search within a specific category tab — verify results scoped to that category

### Failure Path
- [ ] Search with no matches "xyz123" — verify "No articles found for your search"
- [ ] Search with single character — verify minimum 2 characters required message

---

## 3. Tag Filtering

### Success Path
- [ ] Verify tag chips render below the tab bar
- [ ] Tap tag "Motor Vehicle Act" — verify articles filtered to those with that tag
- [ ] Tap a second tag "Insurance" — verify intersection filter (articles with both tags)
- [ ] Tap an active tag again — verify it deselects and filter updates
- [ ] Verify active tags have visual indicator (filled background)

### Failure Path
- [ ] Tag filter returns zero results — verify "No articles match selected tags"
- [ ] Verify clear all tags option resets filter

---

## 4. Article Detail

### Success Path
- [ ] Tap article "How to Dispute a Challan"
- [ ] Verify full article content renders with rich text formatting
- [ ] Verify article header: title, author, date, read time, category badge
- [ ] Verify embedded images/videos render correctly
- [ ] Verify related articles section at bottom
- [ ] Verify back button returns to list with scroll position preserved

### Failure Path
- [ ] Article content fails to load — verify "Unable to load article" error
- [ ] Article with broken image — verify placeholder image appears

---

## 5. Download, Copy & Feedback

### Success Path — Download
- [ ] Open a template article
- [ ] Tap "Download" button — verify download initiates
- [ ] Verify file format matches (PDF for articles, DOCX for templates)

### Success Path — Copy
- [ ] Open an article
- [ ] Tap "Copy" button — verify "Content copied to clipboard" toast
- [ ] Verify clipboard contains the article text

### Success Path — Feedback
- [ ] Scroll to bottom of article
- [ ] Tap thumbs up — verify "Thanks for your feedback!" message
- [ ] Verify feedback icon changes to filled state
- [ ] Verify onFeedback fires with (articleId, true)

### Failure Path
- [ ] Download fails — verify "Download failed. Tap to retry."
- [ ] Feedback already submitted — verify buttons disabled with "Feedback submitted"
- [ ] Copy fails (clipboard API unavailable) — verify fallback text selection prompt

---

## Empty State Tests

- [ ] No articles at all — "Knowledge base is being populated. Check back soon."
- [ ] No tags available — tag filter section hidden
- [ ] Article with no related articles — related section hidden
- [ ] BOT247 tab empty — "BOT247 content coming soon"

## Component Interaction Tests

- [ ] Search + tag filter combine: search "challan" + tag "Legal" shows intersection
- [ ] Category tab change clears search but preserves tag selection
- [ ] Back from article detail preserves category tab and scroll position
- [ ] Feedback persists across page reload (stored in local state or API)

## Edge Cases

- [ ] Article title with 150+ characters — truncated on card, full title in detail
- [ ] Article content with 5000+ words — renders without performance issues
- [ ] 8 category tabs overflow horizontally — scroll arrows or swipe on mobile
- [ ] Tag with very long name (50+ chars) — truncated with ellipsis
- [ ] Search query with special characters (e.g., "Section 177 & 184") — handled correctly
- [ ] Rapid tab switching does not cause stale data display

## Accessibility Checks

- [ ] Category tabs have role="tablist" with aria-selected
- [ ] Search input has aria-label "Search knowledge base"
- [ ] Tag chips have role="checkbox" with aria-checked
- [ ] Article cards have aria-label with title
- [ ] Rich text content has proper heading hierarchy (h1, h2, h3)
- [ ] Feedback buttons have aria-label "Mark as helpful" / "Mark as not helpful"
- [ ] Download and copy buttons have descriptive labels

## Sample Test Data

```json
{
  "articles": [
    {
      "id": "kb-001",
      "title": "How to Dispute a Challan",
      "excerpt": "Step-by-step guide to filing a representation against a traffic challan",
      "category": "Guides",
      "tags": ["Challan", "Legal", "Motor Vehicle Act"],
      "readTime": "5 min",
      "author": "LOTS247 Legal Team",
      "date": "2026-04-15",
      "content": "Full article content with rich text..."
    },
    {
      "id": "kb-002",
      "title": "Insurance Claim Checklist",
      "excerpt": "Essential documents and steps for filing an insurance claim",
      "category": "Checklists",
      "tags": ["Insurance", "Claims"],
      "readTime": "3 min",
      "downloadable": true,
      "fileFormat": "PDF"
    },
    {
      "id": "kb-003",
      "title": "Supreme Court Judgement on Overloading Fines",
      "excerpt": "Analysis of the 2025 SC ruling on commercial vehicle overloading penalties",
      "category": "Judgements",
      "tags": ["Legal", "Overloading", "Supreme Court"],
      "readTime": "8 min"
    },
    {
      "id": "kb-004",
      "title": "RTO Circular: Updated PUCC Norms 2026",
      "excerpt": "Latest circular from MoRTH on revised pollution check standards",
      "category": "Circulars",
      "tags": ["PUCC", "RTO", "Compliance"],
      "readTime": "4 min"
    }
  ],
  "tags": ["Challan", "Legal", "Insurance", "Motor Vehicle Act", "PUCC", "RTO", "Compliance", "Claims", "Supreme Court", "Overloading"]
}
```
