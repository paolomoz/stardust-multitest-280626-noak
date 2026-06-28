# Dynamic blocks map — Paramount

Decided BEFORE bulk import (Phase 4.5). Blocks that LIST other pages read an EDS
query-index built against the LIVE tree, not static cards.

## Dynamic blocks

| Block | Listing page | Index target | Source glob |
|---|---|---|---|
| `feed` (variant `dynamic`) | `/paramount/news` | `/paramount/news.json` | `/paramount/news/**` |
| `feed` (variant `dynamic`) | `/paramount/press` | `/paramount/press.json` | `/paramount/press/**` |

## Metadata contract (emitted inline at author time, per content type)

- **news-article** pages: `Category: News` (→ `<meta name="category">`); `Title`,
  `Description` (intrinsic); `PublishDate` (ISO) when a reliable source date exists.
- **press-release** pages: `Category: Press`; `Title`, `Description`; `PublishDate`
  when available.

Query-index rows carry only page-intrinsic DOM (`main h1`, `og:image`) + page
metadata (`category`, `description`, `publishdate`). No relationships.

## Static (not dynamic) listings

Brand / business / leadership listings render as static `cards` grids — they are
small, enumerable, and not time-ordered, so a query-index adds no value (Tier-1
intrinsic only; no join fields needed). Promote to dynamic if the catalog grows.

## Content gap

`PublishDate` is NOT reliably present in the captured source (dates live in body
prose, not structured metadata). Indexes are authored without per-item dates; the
feed renders newest-first when dates exist and insertion order otherwise. Backfill
`PublishDate` metadata if exact chronological ordering is required.
