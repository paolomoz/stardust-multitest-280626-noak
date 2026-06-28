# Dynamic blocks map — PayPal run

## Decision: NO dynamic (index-fed) blocks at this volume.
This migration delivers 11 curated, header-linked pages (the most important pages).
There is no large directory / feed / many-to-many relationship that warrants a
query-index-fed block. Per the prompt's Tier-3 guidance, relationship/listing rails
are kept STATIC with real authored content.

## Listing-shaped blocks present (kept static, with rationale)
- **money-hub** (`cards` block): a topic hub. At 3 curated topics it is static cards
  pointing to real pages. Would become index-fed only if the Money Hub article tree
  were migrated at scale (>20 pages).
- **related-content / recommended-articles rails** (`cards` block on brc + cshelp
  articles): Tier-3 relationships. Kept static — the related items are not all
  migrated as local pages, so an index-join would 404. Bounce links point to the
  live source for items without a local page.

## query-index
A `helix-query.yaml` indexes `/paypal/**` (title, description, image, lastModified)
→ `/paypal/query-index.json`. It builds against the LIVE tree (all pages published).
It is available for future dynamic blocks but no block consumes it yet.
