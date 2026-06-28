# STARDUST Plugin Findings — Starbucks migration run

Run date: 2026-06-28
Source: https://www.starbucks.com/
EDS: paolomoz/stardust-multitest-280626-noak @ site-starbucks
DA: /starbucks/ subpath (shared repo, 8-site test)

This log records ONLY findings that generalize to the stardust PLUGIN (skills/flow),
not site-specific content. Format: [Phase/Skill] observation → suggested fix.

---

## Findings

### F1 — [extract / Setup] Bundled crawler not importable from skills dir
`extract/scripts/crawl.mjs` does `import { chromium } from 'playwright'`, but it
lives under the skills plugin dir which has no `node_modules`. Running it in place
throws `ERR_MODULE_NOT_FOUND` even after `npm i -D playwright` in the project. Had
to copy the script into the project (`scripts/stardust/crawl.mjs`) for ESM
resolution to find playwright. SUGGESTED FIX: the skill should instruct copying the
crawler into the target project (or running with `--prefix`/a resolver shim), and
the Setup section should call this out explicitly — the SKILL warns the CLI probe
is insufficient but doesn't note the script's own location has the same problem.

### F2 — [extract] crawl.mjs covers only Phases 1-2; Phases 3-6 are unspecified manual work
The bundled crawler emits `pages/<slug>.json` + `_crawl-log.json` only. Phases 3-6
(brand-surface aggregation → `_brand-extraction.json`, descriptive PRODUCT/DESIGN,
`brand-review.html`, `state.json`) have no runnable helper, so each run re-derives
palette/fonts/logo by hand (I wrote a one-off `brand-probe.mjs`). Also crawl.mjs's
`capture()` records `customProps` (`:root` CSS vars) but NOT the per-element computed
palette/font/radius/shadow aggregation that Phase 3 needs — on a site that sets no
`:root` vars (Starbucks) `customProps` is `{}` and the brand surface is empty.
SUGGESTED FIX: extend crawl.mjs capture() to emit the computed-style palette/type/
radius/shadow aggregation (as my brand-probe does), and ship a `brand-surface.mjs`
companion that writes `_brand-extraction.json` + seeds DESIGN/PRODUCT/state.

### F3 — [extract] networkidle wait never settles on analytics-heavy sites
A `waitUntil:'networkidle'` goto on starbucks.com times out at 60s (continuous
beacon/telemetry traffic). crawl.mjs correctly uses `domcontentloaded`; any
companion script must too. Worth documenting in the playwright-recipe as a default.
