# Dynamic blocks map — Sycamore Partners

## Blocks that LIST other pages (read a query-index, not static cards)
| Block | Page(s) | Index | Source pages |
|---|---|---|---|
| `cards news` | /sycamorepartners/news (full), /sycamorepartners/ home (limit 2) | /sycamorepartners/news-index.json | /sycamorepartners/news-article/** |
| `logo-grid` | /sycamorepartners/investments | /sycamorepartners/investments-index.json | /sycamorepartners/investment-info/** |

Home keeps STATIC authored news + portfolio (always populated, real content);
the /news and /investments LISTING pages are dynamic (fetch index).

## Metadata contract (emitted inline in each page's metadata block at author time)
- **news-article**: `Title` (og:title), `PublishDate` (ISO, meta name=publishdate),
  `Category` (meta name=category), `Image` (og:image).
- **investment-info**: `Title`/Company (og:title), `Logo` (meta name=logo, absolute img URL),
  `Sector` (meta name=sector).

## Index build
`helix-query.yaml` defines two scoped indexes (include globs under /sycamorepartners/,
explicit `target`). Index builds against the LIVE tree → pages must be PUBLISHED
(`POST /live/`) for the index to populate. Preview-only leaves indexes empty.

## NOT modeled as relationships
Portfolio↔news links are page-intrinsic only; no many-to-many join field (Tier-3
kept static).
