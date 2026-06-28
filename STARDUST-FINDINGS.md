# STARDUST Plugin Findings — bankofamerica run

Generalizable findings about the stardust PLUGIN (bugs, friction, improvement ideas).
Site-specific content notes are intentionally excluded.

Run: source https://www.bankofamerica.com/ → EDS paolomoz/stardust-multitest-280626-noak, branch site-bankofamerica, DA subpath /bankofamerica/.
Started: 2026-06-28.

## Findings

### F1 — Phase 0 / environment — cwd vs assignment mismatch (harness, not skill)
The shell env cwd pointed at a sibling run (xfinity) while the assignment targeted bankofamerica. Not a stardust skill bug, but worth noting: skills should always resolve paths from an explicit project root arg, never assume `process.cwd()`.

### F2 — extract / crawl.mjs — ESM resolves `playwright` from the script's own dir, not the project
`extract/scripts/crawl.mjs` does `import { chromium } from 'playwright'`. When run in place from the skills install dir (`node /path/to/skills/.../crawl.mjs`), Node resolves `playwright` upward from the *script's* directory, not the project's `node_modules`, so it throws `ERR_MODULE_NOT_FOUND` even after `npm i -D playwright` in the project. Workaround: copy crawl.mjs into the project root and run it there. Suggested fix: the SKILL should instruct copying the script into the project (or use a `--require`/NODE_PATH-independent resolver), and say so explicitly in Setup.

### F3 — extract / Setup — `npm i -D playwright` fails ERESOLVE on aem-boilerplate
On a vanilla aem-boilerplate target the plain `npm i -D playwright` aborts with an ERESOLVE peer-dependency conflict (boilerplate's dev deps). Had to use `npm i -D playwright --legacy-peer-deps`. Suggested fix: extract Setup should recommend `--legacy-peer-deps` (or `--force`) for boilerplate targets.

### F4 — extract / crawl.mjs vs brand-surface gap — no computed-style capture
The bundled crawl.mjs capture() emits headings/body/ctas/links/media but NOT the per-section computed-style summary, palette, font families, radii, or shadows that Phase 3 (brand-surface.md) and DESIGN.json require. So the "runnable crawler" does not actually produce the inputs the next phase consumes — I had to hand-write a separate brand-probe.mjs to aggregate computed colors/fonts/radii/shadows/logo. Suggested fix: extend crawl.mjs capture() to emit the computed-style aggregation (palette, type, motifs) the recipe specs, or ship a companion `brand-probe.mjs` in extract/scripts and reference it from the SKILL.

### F5 — extract / capture-hardening — geo/state-selection gates not detected
BoA product pages (auto-loans, deposits/bank-accounts) are SPAs that show a "Select Your State" overlay before content. The consent-dismissal handles cookie banners but not state/region/country gates, so these captured as a single-heading shell ("Select Your State") with 1 body line — yet `_signals.spaShellSuspect` was `false` (mainTextLen and image count were high from the gate UI). Suggested fix: add a state/region/country-gate pattern to the INTERSTITIAL/substance heuristics, and flag a page whose only/first h1 matches `/select your (state|region|country|location)/i` as `gatedSuspect` so it gets re-crawled (or the gate auto-dismissed by selecting a default state).

### F6 — extract / logo locator — picks promo SVG over real brand logo
The logo locator chain (`[class*="logo" i] svg`, header img) matched a promotional offer SVG (alt "$100 cash offer…") instead of the brand logo, because BoA renders the real flagscape logo inside a web-component nav widget not matched by the chain. The real wordmark logo was only findable via the OneTrust consent-banner asset (`cdn.cookielaw.org/.../BOA.PNG`). Suggested fix: when the matched "logo" element's alt/text contains price/offer/promo tokens, reject it and fall back further down the chain (apple-touch / a constructed mark), and consider scanning consent-banner logos as a known real-logo source.
