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

### F4 — [prototype] impeccable design hook fires on legitimate scrim/shadow rgba alphas
Every Write/Edit of a prototype triggers `design-system-color` findings for
`rgba(0,0,0,.NN)` values used in hero legibility scrims and card box-shadows — even
though these are (a) standard overlay/shadow tokens and (b) literally present in the
captured brand surface (`_brand-extraction.json#motifs.shadows`). The prototype skill
documents a "brand-faithful inversion auto-dismiss" for exactly this, but the hook has
no awareness of it and re-prompts on every edit, creating noise. SUGGESTED FIX: the
design hook should treat near-black/white rgba with alpha < 1 used in `box-shadow`/
`linear-gradient(...scrim)` contexts as exempt, or read DESIGN.json shadow tokens.

### F5 — [prototype] no batch/sibling rendering; full craft loop per page does not scale
The skill renders one page per invocation through the full craft + 4 gate phases. For
a site with one template that has 15+ siblings (Starbucks menu categories), running
that loop per page is impractical. In practice the right model is: craft ONE archetype
to lock the design identity (home), then generate the remaining template archetypes by
reusing the home `:root`/chrome canon (which the skill itself says to do: "Reuse the
chosen design identity"). There's no helper for this canon-reuse generation — I wrote a
`build-prototypes.mjs` that shares the home chrome+CSS and composes captured content per
template. SUGGESTED FIX: ship a `prototype --from-canon <slug>` helper that emits sibling/
template archetypes from an approved canon page, so the craft loop runs once not N times.

### F3 — [extract] networkidle wait never settles on analytics-heavy sites
A `waitUntil:'networkidle'` goto on starbucks.com times out at 60s (continuous
beacon/telemetry traffic). crawl.mjs correctly uses `domcontentloaded`; any
companion script must too. Worth documenting in the playwright-recipe as a default.
