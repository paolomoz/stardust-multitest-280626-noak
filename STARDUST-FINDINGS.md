# STARDUST plugin findings — sony run (2026-06-28)

Log of things that generalize to the stardust PLUGIN itself (bugs, friction, improvement ideas).
Site-specific content notes are intentionally excluded.

Format: [phase/skill] observation → suggested fix.

## Phase 1 — Extract
- [extract/crawl.mjs] BUG (high impact): bot-management fallback only triggers when `probe.goto` THROWS (H2/QUIC/connection-reset). Akamai (and similar enterprise WAFs) return a clean **HTTP 403** to headless chromium — Playwright's `goto` does NOT throw on 4xx — so the headed-Chrome fallback never fires and the entire crawl fails with `HTTPError: HTTP 403` on every page. sony.com reproduces this 100%. → After the probe `goto`, also check `response.status()` for 403/429/503 and trigger the headed `channel:'chrome'` fallback. (Patched locally in my copy; one-line fix in crawl.mjs main().)
- [extract/crawl.mjs] The bundled crawler `import { chromium } from 'playwright'` resolves node_modules relative to the SCRIPT's directory (skill source tree), which has no node_modules, so running it in place fails ERR_MODULE_NOT_FOUND even after `npm i -D playwright` in the project. Had to copy crawl.mjs into the project tree to run it. → Either resolve playwright via the project root explicitly, or document copying it into the target.

## Phase 0 — Setup
- [extract/setup] Master SKILL.md (stardust setup step 2) references the impeccable context loader as `scripts/load-context.mjs`, but the actual file is `scripts/context.mjs`. Running the documented path fails with MODULE_NOT_FOUND. → Fix the path in stardust/SKILL.md to `context.mjs` (or rename the script).
- [extract/setup] On a vanilla aem-boilerplate target, `npm i -D playwright` fails with ERESOLVE (boilerplate pins eslint@8 while @babel/eslint-parser@8 peer-wants eslint@^9). Skill says "run npm i -D playwright" but doesn't mention the boilerplate peer-dep conflict; needs `--legacy-peer-deps`. → extract setup should note the boilerplate eslint peer conflict and recommend `--legacy-peer-deps` (or use the global/MCP Playwright).
- [extract/setup] Impeccable is installed under a versioned path `cache/impeccable/impeccable/<version>/skills/impeccable/`. Stardust setup says look in standard harness dirs (`.claude/skills/` etc.) but the plugin-cache layout has an extra `<version>` segment and a doubled `impeccable/impeccable`. Loader discovery had to be done by `find`. → document the plugin-cache path shape or have a resolver helper.

