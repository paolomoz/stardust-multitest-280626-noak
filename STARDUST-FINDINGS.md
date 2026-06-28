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

### F4 — [deploy vs migration-prompt] Runtime guidance contradicts: prompt says AuthorKit, skill says vanilla
The migration prompt's Phase 0 ("AuthorKit chrome gotchas") mandates porting the AuthorKit
runtime (ak.js/postlcp.js, `.btn`/`.btn-group` buttons, NO `.block` class, static
innerHTML-injected header/footer fragments, `body.session`). But the current stardust:deploy
SKILL.md (0.13.x) explicitly TARGETS vanilla aem-boilerplate and says: "That [AuthorKit]
runtime has drifted upstream ... is no longer the supported target; do NOT port it onto a
fresh boilerplate. New conversions use the vanilla path." Vanilla uses real header/footer
BLOCKS, `.button`/`.button.primary` (strong/em), and blocks DO carry `.block`. These are
direct contradictions. An operator following the prompt would build the wrong runtime contract
(scope CSS as `.<name>` expecting no `.block`, target `.btn` not `.button`) on a repo the skill
treats as vanilla. Fix: reconcile the multitest migration prompt with the shipped deploy skill —
the prompt's Phase 0 AuthorKit block should be replaced with the skill's vanilla guidance (or
gated on actually detecting ak.js). I followed the SKILL (matches the repo: scripts/aem.js +
blocks/header + blocks/footer present). Recorded `runtime: aem-boilerplate` in the conversion log.

### F3 — [extract] body innerText capture includes full mega-menu / header nav text
Every page's `body[0]` begins with the global nav dump ("Shop Explore Shop Shop ... Galaxy
S26 Ultra ..."). The crawler captures `main`/full innerText without stripping the persistent
header/footer chrome, so the leading body block on every page is nav noise. Downstream
migrate must filter it, but it would be cheaper to exclude header/footer landmarks from the
body[] capture at source (the recipe already detects system components — reuse that to
subtract chrome from body). Otherwise every page's first "paragraph" is junk.

