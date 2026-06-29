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

### F5 — [deploy] deploy-batch.mjs ledger skips by status, never by content hash
`deploy-batch.mjs` skips pages whose ledger status is `live` and whose delivered `.plain.html`
still 200s — it does NOT compare the local content against what's deployed. So after editing a
content file and re-running, the changed page is silently skipped (it's still "live"). The
operator must remember `--force` (which redeploys ALL pages, not just changed ones). Suggested
fix: store a content sha in the ledger and re-drive a page when its local sha differs, so a
plain re-run picks up edits without blasting the whole tree.

### F6 — [deploy] self-contained header/footer logo gotcha not flagged; class-vs-id trap
Two avoidable bugs the deploy skill could guard against: (1) the inline-SVG brand logo is easy
to truncate to a single glyph path when hand-copying from extract's logo.svg — shipped a header
showing just "S". (2) The skill's header pattern uses `#nav` in some references and `.nav` in
others; building `<nav id="nav">` while the block CSS targets `.nav` ships an unstyled (but
present) header that passes a "header exists" check. A render-check that asserts the logo's
rendered width > Npx and that the nav computes `display:flex` would catch both. Suggested: add a
logo-width + nav-layout assertion to the deploy skill's local-QA checklist.

### F7 — [deploy] query-index population lags helix-query.yaml code-sync with no ready signal
After pushing helix-query.yaml and POSTing the index job (202/200), `/samsung/query-index.json`
stayed 404 for minutes with no signal distinguishing "config not synced yet" from "misconfigured."
The deploy skill should document the expected propagation lag and a concrete readiness probe
(e.g. poll the index endpoint with backoff, or check the config is live on the code bus first).

### F3 — [extract] body innerText capture includes full mega-menu / header nav text
Every page's `body[0]` begins with the global nav dump ("Shop Explore Shop Shop ... Galaxy
S26 Ultra ..."). The crawler captures `main`/full innerText without stripping the persistent
header/footer chrome, so the leading body block on every page is nav noise. Downstream
migrate must filter it, but it would be cheaper to exclude header/footer landmarks from the
body[] capture at source (the recipe already detects system components — reuse that to
subtract chrome from body). Otherwise every page's first "paragraph" is junk.


### F4 — [remediation/deploy] "picture-collapse" hero/cards bug did NOT reproduce; root cause already masked
Remediation hypothesis (Bug A): `.{hero,offer}-bg picture` + `.card-media`/`.feature-media`
sized width/height/object-fit WITHOUT `display:block` → inline <picture> collapses to 0 →
blank hero + empty cards. Headless probe of the LIVE page BEFORE any change showed the
OPPOSITE: hero `.hero-bg` = 612px, hero img naturalWidth 1920, all 13 card medias rendered
with images loaded (naturalWidth 312–720), 4 grids `display:grid`, 0 broken images, 0
pageerrors. Page already matched the prototype pixel-for-pixel.
Why no collapse: (1) global `styles.css` has `img { display:block }`, and (2) every media
container has an explicit height — `.hero-bg`/`.offer-bg` are `position:absolute; inset:0`,
`.card-media` has `aspect-ratio:1`. The child img's `height:100%` resolves against the
nearest block container (the media box), skipping the inline <picture>, so nothing collapses.
The inline <picture> is cosmetically wrong but layout-harmless here.
Lesson for the plugin: a `*-bg picture` rule missing `display:block` is only a real defect
when the container lacks an intrinsic height AND the global img reset is absent. The diagnosis
heuristic should verify the container-height/global-reset preconditions (or just measure
rendered height) before flagging it as the dominant bug, to avoid false-positive remediations.
Applied anyway as harmless hardening: added `display:block` to the <picture> wrappers in
hero/offer/cards/feature CSS (pushed to `site-samsung`, commit 2b986ef). AFTER deploy:
heroPicDisplay flipped inline→block, all other metrics unchanged (hero 612px, 0 broken,
0 pageerrors) — confirming zero visual regression and that the fix was defensive, not curative.

### F8 — [remediation] THREE successive "blank hero / natW 0" diagnoses, all empirically false on the live site
Second remediation pass. Across three briefs the hero/cards "fail to load, naturalWidth 0"
was asserted with increasing confidence ("verified live via DevTools — TRUST THIS"). None
reproduce. The live page renders fully — TV hero key-visual + all populated cards — under
every probe.
Diagnoses and how each was disproved on https://site-samsung--…--paolomoz.aem.live/samsung/:
  1. (first pass) `*-bg picture` missing `display:block` → inline collapse. Disproved earlier
     (F4); page already matched prototype. The first pass's MEASUREMENT (natW 1920, healthy)
     was in fact CORRECT — later wrongly relabelled "false".
  2. (this brief) external images.samsung.com URLs → EDS `createOptimizedPicture` rewrites to a
     same-origin optimizer that only serves DA media → 404 → natW 0. FALSE on two counts:
     (a) no block calls `createOptimizedPicture` (grep clean); the external imgs are auto
     sideloaded into Media Bus by preview and delivered as same-origin `./media_<hash>.{webp,jpg}`
     optimizer URLs. (b) All 60 delivered variant URLs return HTTP 200 (2 jpg / 28 webp / 30
     webply); all 15 source URLs return 200 too. The optimizer is NOT failing on external URLs.
     → The prescribed "rehost to DA media" fix was abandoned (no DA changes made; the delivered
       optimizer path is identical to the one already serving 200s, so it would fix nothing).
  3. (coordinator correction) hero img ships `loading="lazy"` + `complete:false`; an absolutely-
     positioned full-bleed lazy hero never fires its IntersectionObserver above the fold without
     a scroll → blank; headless probes that scroll mask it. FALSE: a strict NO-SCROLL static load
     (scrollY 0, no interaction) shows hero `complete:true`, natW 1920, visible, and a painted
     screenshot. Chromium loads in-viewport lazy images immediately — the hero sits at top:65
     inside a 900px viewport, so `loading="lazy"` does not defer it.
PAINT-CHECK (no-scroll, live) — hero `Samsung 2026 launch offer`, card `Galaxy S26 Ultra`:
  BEFORE: hero {loading:"lazy", fetchPriority:"auto", complete:true, naturalWidth:1920,
          rect 1440x612, visibility:visible}; card {loading:"lazy", complete:true, natW:330}.
  AFTER : hero {loading:"eager", fetchPriority:"high", complete:true, naturalWidth:1920,
          rect 1440x612, visibility:visible}; card unchanged (intentionally lazy, natW:330).
REAL (non-blank) defect found + fixed — a genuine LCP perf issue, NOT a blank-hero bug:
  the hero is the LCP element but lives in the SECOND `<main>` section; aem.js `waitForFirstImage`
  only eager-loads `main.querySelector('.section')`'s first `<img>`, and the first section is
  metadata-only (no image), so the hero shipped `loading="lazy"` and was deprioritised in the
  load queue. Fix (code-only, commit 53ab32b on `site-samsung`): in `blocks/hero/hero.js`, after
  moving the picture into `.hero-bg`, set the hero `<img>` `loading="eager"` + `fetchpriority="high"`.
  Below-the-fold cards left lazy (correct — making them eager would compete with the LCP fetch).
  Rehost NOT done; the natW-0 bug does not exist on this site.
Lessons for the plugin/diagnosis loop:
  - Verification blind spot (the recurring one): probes that scroll/interact, OR that only assert
    container height / network 200, can BOTH false-PASS and false-FAIL. The decisive ground truth
    is a no-scroll static-load assert of `img.complete===true && naturalWidth>0` PLUS a rendered
    screenshot. Three reviewers disagreed; the screenshot settled it every time.
  - A "natW 0" claim should be required to ship with the no-scroll natW reading AND a screenshot
    before any curative work is prescribed — otherwise each pass invents a new mechanism for a
    symptom that isn't present.
  - `loading="lazy"` on an above-the-fold LCP hero is a real perf anti-pattern worth fixing, but it
    does NOT cause a blank hero in any modern browser; don't conflate the two.
