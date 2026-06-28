# EDS Conversion Log — Xfinity

**runtime: aem-boilerplate** (vanilla; NOT AuthorKit — current stardust:deploy v3.8 deprecated AuthorKit)

## Block inventory
| block | source prototype section | notes |
|---|---|---|
| header | system component (xc-header) | stock boilerplate header.js loading `/xfinity/nav`; injects real Xfinity wordmark SVG |
| footer | system component (xc-footer) | stock footer.js loading `/xfinity/footer`; dark 4-column grid |
| hero | hero | query-based decode (#42), eyebrow/h1/sub/lead/CTA + optional image, eager LCP |
| cards (variant `pillars`) | pillars / product-pillar row | whole-card link, purple icon-led, 5/2/1-up |
| cards (variant `deals`) | device-deals | badge + h3 + desc, 3/1-up |
| feature (variants `surface`, `reverse`) | moving / streaming / mobile / protection | media+text band; branded placeholder when no image |
| cta | purple cta-band | full-width gradient conversion band |
| directory | dynamic (site-map) | fetches `/xfinity/query-index.json`; live search `?q=` + category filter; graceful fallback |

## Decisions locked
- One prototype section = one block; same-pattern sections (pillars, deals) collapsed into `cards` + variants.
- Buttons use vanilla `decorateButtons` contract: `a.button` / `.primary` (`<strong>`) / `.secondary` (`<em>`). NOT `.btn`.
- Fonts: DM Sans self-hosted (woff2, variable) + metric-matched `Arial` fallback (zero-CLS). XSans (proprietary display) substituted by DM Sans 800.
- Palette pinned to captured brand surface; purple #5a23b9 promoted to signature accent.
- Isolation: all content under DA `/xfinity/`; nav `/xfinity/nav`, footer `/xfinity/footer`, home `/xfinity/index`; fstab maps `/` to DA repo root.

## Anti-patterns avoided
- No `.btn` (vanilla runtime), no `.<name>.block` selectors, no section-style classes, no shared utility modules.
- Editorial images authored as real `<img>` (verified resolvable on assets.xfinity.com); bodyless pages rendered thin (hero+cta), not padded.
- Internal links localized to `/xfinity/` where a local page exists; else absolute source bounce (e.g. stream, plan-builder deep links).

## Deploy
- Transport: bundled `deploy-batch.mjs` (PUT → preview → live, ledger, concurrency 4). 29 pages, 0 failed.
- A hand-rolled bash loop hit the documented zsh/PATH-in-loop gotcha — the node driver is the correct tool.

## Known gap
- `/xfinity/query-index.json` config (`helix-query.yaml`) shipped + index POSTs accepted (200), but the index file had not materialized at finalize (EDS indexer config-propagation lag on a fresh feature branch). The `directory` block falls back gracefully; index lights up automatically once EDS propagates.
