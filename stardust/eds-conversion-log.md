# EDS Conversion Log — Starbucks

- **runtime:** aem-boilerplate (vanilla). Real header/footer blocks, decorateButtons
  (.button/.secondary), decorateSections, body.appear paint gate. NOT AuthorKit.
- **DA isolation:** everything under `/starbucks/`. fstab maps `/` → DA repo root.
- **delivery host:** https://site-starbucks--stardust-multitest-280626-noak--paolomoz.aem.page/starbucks/

## Block inventory (7)
| block | role | variants | source section |
|---|---|---|---|
| hero | full-bleed photo hero (img + eyebrow + h1 + CTA) | full | home, rewards |
| cards | card grid | promo (2-up CTA), categories (clickable tiles), products (circular), gifts (catalog) | home promos, menu, product pages, gift |
| columns | alternating image+text feature rows | — | stores, about-us |
| steps | numbered how-it-works grid | — | rewards |
| header | Siren chrome: logo + nav + Sign in/Join now + JS burger | — | site-wide; loads /starbucks/nav |
| footer | 5-column directory + legal on espresso, Siren | — | site-wide; loads /starbucks/footer |

Title pages (menu, gift, about, stores, contact, snacks, featured + category pages)
use a default-content foam title band rather than a hero block (David's #1).

## Decisions locked
- One prototype section = one block; promo/category/product/gift collapsed into ONE
  `cards` block + variant classes.
- Chrome via fragment-content (authorable /starbucks/nav + /starbucks/footer) so the
  isolation requirement (chrome under /starbucks/) is satisfied and nav is editable.
- Images: real Starbucks CDN URLs authored directly (content-prod-live + cloudassets,
  both 200 to plain fetch → ingester pulls them). No rehost needed, no /img/ in content.
- SoDoSans self-hosted (woff2, converted from captured woff) in styles/fonts/.

## Gotchas hit
- Footer fragment delivers content nested under a section wrapper → `:scope`-relative
  selector missed h4/ul. Fixed: query `h4..h6, ul` in document order.
- Dead internal footer links to non-migrated pages (business/*, responsibility/*,
  stores-and-ordering/delivery) → repointed to absolute source URLs (bounce > 404).

## Content gaps (logged, not fabricated)
- /starbucks/menu/food/snacks: source captured 0 products (lazy-gated even on slow
  wait) → authored thin (title + "Back to menu"), no invented products.
