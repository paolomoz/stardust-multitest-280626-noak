# EDS conversion log — Sony Group Portal

runtime: aem-boilerplate (vanilla; no AuthorKit bootstrap)

## Blocks (5)
- header — fragment-driven (/sony/nav), sticky, JS mobile hamburger, Sony wordmark
- footer — fragment-driven (/sony/footer), ink columns + legal row
- hero — full-bleed auto-rotating carousel (signature motion), reduced-motion holds slide 1
- cards — image+label grid; variants: (default explore 3-up), `links` (text sub-nav), `story` (editorial)
- news — dynamic: fetches /sony/news-index.json, sorts by publishDate; authored fallback rows

## Foundation
- styles/styles.css: Sony near-monochrome tokens, Inter self-host + metric-matched Arial fallback (zero-CLS), global .button system, section scaffold, header height reserve
- head.html untouched

## Content (20 pages under /sony/ + 2 chrome fragments)
home, 7 section-landing, 2 listing, 4 article, 2 editorial, 2 legal; nav + footer fragments.
All images uploaded to DA /sony/media and authored as content.da.live URLs.

## Decisions
- Mode A brand-faithful single variant. SST→Inter (identity-preservation override of reflex-reject).
- Chrome authored in DA at /sony/nav + /sony/footer (assignment isolation requirement) via fragment-loading header/footer blocks.
- Path-safety: purpose_and_values → purpose-and-values (redirects.tsv).
- Home folder-index served at /sony/ (trailing) — logo links keep trailing slash.

## Known gaps
- query-index (/sony/news-index.json) not materialized on feature branch; news block uses authored fallback.
- Footer columns render slightly stacked (DA wrapper nesting) — cosmetic; all links resolve.
