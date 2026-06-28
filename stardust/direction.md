# Direction — Bank of America (active)

_Resolved 2026-06-28. Fully hands-off run; no approval gate._

## Phrase
"Faithful redesign, modernized" (default for this migration; no rebrand requested).

## Restatement (dimensional)
Migration-shaped refresh of an existing, signal-strong commercial brand. Move the *expressive* and *distinctiveness* axes modestly (calmer, more confident execution) while pinning palette and type to the captured surface. IA preserved verbatim (this is a migration).

## Mode detection
- Brand signal: **signal-strong** (palette has navy/blue/red + neutrals after clustering; named families Connections + Roboto).
- No rebrand trigger; `--rebrand` not passed.
- **Mode A (brand-faithful) active.** Palette + type pinned. Single variant (no N>1 fork).

## Movements
- expressive: restrained → committed (one confident hero, not a carousel)
- distinctiveness: familiar → familiar (institutional bank; stays recognizable)
- tone: serious (unchanged)
- density: **balanced** (default; multi-audience hard floor → sectionPadding ≤64px)
- ia-fidelity: **verbatim** (migration — same IA, same content beats)

## Divergence (brand-faithful mode)
- decade        rolled    → 2025-now
- register      rolled    → civic-institutional
- ground-family inherited → stark-white (brand-native #FFFFFF)
- font deck     inherited → Connections→Inter substitute + Roboto body
- palette       inherited → navy/actionBlue/red + neutrals

## Brand-faithful inversions
- Flagscape navy #012169 and red #E31837 retained exactly (pure brand hexes).
- Connections is proprietary/unavailable → substituted by Inter (humanist match); Roboto body retained verbatim (it is the real BoA body face and free).

## IA-priority audit (locked under verbatim)
1. commercial-conversion → first-viewport (hero offer + Open an account / Apply now)
2. trust-affordance → persistent (FDIC-Insured + Equal Housing)
3. audience-routing → header (Personal / Small Business / Wealth pillars)

## Improvements list
`stardust/prototypes/index-improvements.md` (5 items: kill carousel, one ask per section, contrast/density, unify card system, calm header + deliberate trust band).

## Command sequence
extract ✓ → direct ✓ → prototype (home + per-template) → migrate → deploy/rollout under /bankofamerica/.

## Assumptions defaulted
- Single variant (hands-off).
- Density balanced, IA verbatim (no user to ask).
- Inter chosen as the Connections substitute (closest free humanist sans; bank-appropriate).
