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

### F6 — [deploy vs migration-prompt] runtime guidance directly contradicts the prompt
The migration prompt's Phase 0 + guardrails 15/15b/16 instruct an **AuthorKit** runtime
bootstrap (port `ak.js`/`postlcp.js`, `.btn`/`.btn-group` buttons, NO `.block` class,
fragment `innerHTML` inert-script caveat, `main .section:empty` for the metadata band).
The CURRENT `stardust:deploy` skill (this version) targets **vanilla aem-boilerplate**
and explicitly says: "do NOT port [AuthorKit] onto a fresh boilerplate ... New conversions
use the vanilla path" — real `header`/`footer` blocks with running JS, `.button`/`.primary`/
`.secondary` decorator, `.block` class present, `body.appear` paint gate kept. The repo here
is vanilla boilerplate, so I followed the SKILL. NET: the prompt and the skill are out of
sync; a reader following the prompt's AuthorKit guardrails on a vanilla repo would build the
wrong button classes and the wrong CSS selectors. SUGGESTED FIX: update the migration prompt
to detect runtime and defer to the deploy skill's runtime gate rather than hard-coding
AuthorKit gotchas, OR have the deploy skill emit the runtime decision the prompt can read.

### F7 — [deploy] fragment chrome content is section-wrapped; `:scope` selectors miss it
The deploy skill's self-contained-vs-fragment guidance shows reading default content
via `:scope > .default-content-wrapper`, but a loaded *fragment* (`loadFragment`) is a
`<main>` whose content sits under `main > div.section > div.default-content-wrapper >
(h4, ul, ...)`. My footer block's `:scope > div > *` selector therefore matched the
section wrapper, not the headings/lists, and silently rendered an empty footer (the
headless check passed because it only asserted the container existed). SUGGESTED FIX:
the skill's header/footer fragment examples should show querying content elements
**deeply** (`fragment.querySelectorAll('h4, ul')`) rather than `:scope`-relative, and
the QA checklist should assert chrome content COUNT (cols/links > 0), not mere presence.

### F8 — [deploy] deploy-batch.mjs is excellent; one friction: no built-in sanitise step
`deploy-batch.mjs` (resumable ledger, PUT→preview→live, delivered `.plain.html` verify)
worked flawlessly — 25 pages live first try, idempotent re-deploy of one page via
`--paths`. Friction: it does NOT run `sanitise.js` itself, so a forgotten manual
sanitise pass would corrupt non-ASCII (® · é Açaí). SUGGESTED FIX: fold sanitise into
deploy-batch (sanitise-on-read, or a `--sanitise` flag) so the two-step contract can't
be half-done.

### F9 — [verify] no bundled verify.mjs; hand-rolled path→.plain.html mapping is error-prone
Phase 9 references `verify.mjs` but none is bundled with deploy. I hand-rolled the
verify loop twice and both times tripped on the home index → delivered-path mapping
(`/starbucks/index` delivers at `/starbucks/`, plain at `/starbucks/index.plain.html`),
producing false `h1=0`/`000` failures on the home alone. SUGGESTED FIX: ship a
`verify.mjs` that owns the index/trailing-slash path normalization and the headless
render assertions, so every run verifies identically instead of re-deriving it.

### F3 — [extract] networkidle wait never settles on analytics-heavy sites
A `waitUntil:'networkidle'` goto on starbucks.com times out at 60s (continuous
beacon/telemetry traffic). crawl.mjs correctly uses `domcontentloaded`; any
companion script must too. Worth documenting in the playwright-recipe as a default.

---

## REMEDIATION pass — 2026-06-29

[deploy / EDS section model] The home hero rendered the blue-coconut photo
correctly (image GET 200, naturalWidth 1440, `.hero-bg` height 558px) but was
NOT full-bleed: it sat inside the default 1280px section content column
(`main .section > div`) with ~104px gutters each side and a 64px gap below the
header. The prototype renders the hero as a full-width `<section>` with only the
inner `.wrap` constrained. → When a converted block is meant to be full-bleed,
the generator must either author Section Metadata `full` (the EDS CSS already
ships a `.section.full` helper that zeroes padding/max-width) OR emit a
self-contained breakout in the block CSS. We chose the latter.

[diagnosis accuracy] The pre-supplied "Bug A" (hero `<picture>` collapsing to
0 height because `.hero-bg picture` lacked `display:block`) did NOT reproduce on
the live site: `styles/styles.css` ships a global `img { display:block }` that
already gives the hero `<img>` block layout, so the hero never collapsed. The
real prototype mismatch was the missing full-bleed. Lesson: verify the predicted
symptom headlessly before assuming the cause — a global `img{display:block}` can
mask a block-level missing `display:block`.

### Changes (code only, pushed to site-starbucks — no DA re-author)
- blocks/hero/hero.css:
  - Added `main .section.hero-container { padding: 0; }`
  - Added `main .section.hero-container > .hero-wrapper { max-width: none; padding: 0; }`
    (breaks hero out of the 1280px column → full-bleed, flush under header)
  - Added `display:block` to `.hero .hero-bg picture, .hero .hero-bg img`
    (defensive: block no longer relies on the global img rule)
- blocks/columns/columns.css:
  - Added `display:block` to `.columns .fr-media img, .columns .fr-media picture`
    (same defensive hardening; cards.css already had it)

### Headless verdict (live, 1440px viewport)
BEFORE: `.hero` x=104 width=1232 (boxed), top gap from section padding;
        hero-bg height 558, image loaded, `<picture>` display:inline.
AFTER:  `.hero` x=0 width=1440 (full-bleed), top=73 flush under 72px header;
        hero-bg height 558, image loaded (naturalWidth 1440),
        `<picture>` display:block; cards-grid display:grid;
        0 broken images; 0 pageerrors.
Matches prototype: YES (full-bleed hero edge-to-edge with blue-coconut photo).
