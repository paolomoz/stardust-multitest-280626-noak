# STARDUST PLUGIN FINDINGS — paypal run (2026-06-28)

Findings that generalize to the stardust PLUGIN (skills/flow), not site-specific content.
Format: [phase/skill] what happened — suggested fix.

## Phase 1 — Extract (crawl.mjs)
- [extract/crawl.mjs] BUG: `crawl.mjs` lives in the skill source dir, so `import { chromium } from 'playwright'` fails with ERR_MODULE_NOT_FOUND when run in-place (ESM ignores NODE_PATH/global installs). Had to copy it into the project root to resolve the project's node_modules. Fix: skill should instruct copying it into the project (or run `node <project>/node_modules/.bin/...`), and document the copy step.
- [extract/crawl.mjs] BUG (significant): `launchWithFallback()` always returns headless despite the comment "headless first, headed real Chrome on H2 reject". The headed fallback only triggers when `goto` THROWS (H2/QUIC). Akamai (PayPal) returns HTTP 200 with a JS-challenge shell — no throw — so headless silently captured EMPTY pages (0 headings/0 links) and logged them as `OK`. Fix: treat an empty real-content capture (anchors<=5 AND headings==0) as a fingerprint block and retry headed, not only on navigation throw. I patched this locally (start headed chrome; wait for real content; retry-on-empty reload).
- [extract/crawl.mjs] BUG: the readiness gate `document.body.children.length > 1` is satisfied by an Akamai challenge shell, so capture ran against an empty doc and threw "Cannot read properties of null". Fix: wait for real-content signals (`a[href] > N` AND `h1,h2,h3 > 0`) before capture; guard `document.body` with `|| document.documentElement` in the scroll/capture code.
- [extract/crawl.mjs] GAP: the bundled crawler implements only Phase 1-2 (discovery + per-page capture). The recipe calls it "a runnable reference of this whole sub-command", but it does NOT emit per-section computed style (palette/fonts), `_brand-extraction.json`, current PRODUCT/DESIGN, `brand-review.html`, or `state.json` (Phases 3-6). Had to write a separate brand-surface script and hand-author the rest. Fix: either extend crawl.mjs to cover Phases 3-6 or stop describing it as the whole sub-command.
- [extract/crawl.mjs] MINOR: per-page record lacked `httpStatus` until I added `rec.httpStatus = status`. The skill's own provenance contract requires `httpStatus`; the reference crawler omits it.

## Phase 0 — Setup
- [setup] Fresh aem-boilerplate clone has NO `fstab.yaml` and is vanilla (scripts/aem.js + scripts.js, no ak.js/postlcp.js/lazy.js). The prompt's Phase 0 says to run the Runtime bootstrap in stardust:deploy, but neither extract nor direct documents that fstab must exist before any preview/publish works. Suggested fix: have stardust:deploy's Runtime bootstrap explicitly create fstab.yaml mapping `/` to the DA repo root as step 1, and assert its presence.

