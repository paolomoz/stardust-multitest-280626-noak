# Stardust Plugin Findings — samsung run (2026-06-28)

Records ONLY generalizable plugin issues (bugs, friction, improvement ideas) in the
stardust skills/flow. Site-specific content notes are excluded.

Format: [PHASE/SKILL] — what happened — suggested fix.

## Findings

### F1 — [extract] Bundled crawler.mjs fails ESM `import 'playwright'` when run from skill install dir
extract/SKILL.md tells you to run `node skills/extract/scripts/crawl.mjs`. But Node ESM
resolves bare imports relative to the script file's own directory, not the cwd. The skill
lives outside the project, so `playwright` (installed in the project's node_modules) is
unresolvable → `ERR_MODULE_NOT_FOUND`, even though the project root resolves it fine.
Fix: either (a) the skill should copy crawl.mjs into the project (e.g. `stardust/_tools/`)
before running, or (b) document running it via `node --eval` import-map / `cd project &&
node <abs-path>` won't help (resolution is by script location). Cleanest: ship crawl.mjs to
be invoked with `NODE_PATH` honored, or have the skill stage the file into the project.
Workaround used: copied crawl.mjs to `stardust/_tools/crawl.mjs` and ran from project root.

### F2 — [extract] crawl.mjs is capture-only; does not emit Phases 3-6 artifacts
The bundled crawl.mjs writes per-page JSON + `_crawl-log.json` only. It does NOT produce
`_brand-extraction.json`, `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, `brand-review.html`, or
`state.json` — all of which extract/SKILL.md lists as required outputs (Phases 3-6). The
agent must hand-author all of them, which is the bulk of the work and error-prone. Worse,
crawl.mjs does NOT capture per-section computed style (palette/typography/radius/shadow),
which the recipe's "Capture list" mandates and which DESIGN.md is built from — so the agent
must run a *separate* style-probe pass to get grounded design tokens. Suggested fix: extend
crawl.mjs to (a) capture computed-style aggregates per page, and (b) emit a draft
`_brand-extraction.json` + skeleton DESIGN.json, or ship a second `brand-surface.mjs` the
skill invokes after the crawl. As shipped, "run crawl.mjs" covers maybe 40% of extract.

### F3 — [extract] body innerText capture includes full mega-menu / header nav text
Every page's `body[0]` begins with the global nav dump ("Shop Explore Shop Shop ... Galaxy
S26 Ultra ..."). The crawler captures `main`/full innerText without stripping the persistent
header/footer chrome, so the leading body block on every page is nav noise. Downstream
migrate must filter it, but it would be cheaper to exclude header/footer landmarks from the
body[] capture at source (the recipe already detects system components — reuse that to
subtract chrome from body). Otherwise every page's first "paragraph" is junk.

