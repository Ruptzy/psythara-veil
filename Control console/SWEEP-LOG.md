# Console hardening sweep — log
Method: dynamic census (execute every payload on a scratch character, diff
claims vs state), plus text lint, dead-code scan, and performance measurement.
Six iterations.

## Iteration 1 — abilities census (classes, species, armour)
Ran all ~90 ability payloads. 7 flags, 4 were census false-positives
("health" matching heal, End-Round-deferred regen).
FIXED:
- runInnate ordering: an ability's own buff now lands BEFORE its own strike,
  and the strike recomputes against live state. Cull the Wounded's 50%
  lifesteal now feeds its own 6d8 (verified: healed 12 off a 24 hit); any
  ability granting +% damage now boosts the hit it arrives with.
- Fracture Line: the 3-round fissure is a tracked, counting-down effect.

## Iteration 2 — skill-node census (182 actives executed)
16 flags; 6 were census artifacts (probe started with temp HP so take-the-
higher grants read as no-ops).
FIXED (engine, all reusable verbs):
- pay.temp NEVER DEDUCTED: "spend temp HP" abilities took payment nobody
  collected. Numeric costs now deduct exactly N; 999 = spend-all sentinel.
- act.spendAllTemp: drains the buffer and reports the number (Give the Chord
  verified 12 -> 0, target gains 12).
- act.selfHealFromDmg: "heal half of what it deals" as a verb (Blood Barrage
  verified 85 -> 95).
- Encounter-length effects: rounds:'enc' never ticks, chip shows ENC, cleared
  by Reset to Rd 1 and cryo (Adaptive Flesh verified surviving End Rounds and
  dying on reset).
FIXED (data): tracked countdowns for Creeping Goo (3r zone), Wild Call (3r
summon), System Lord (2r blackout); Fracture Line got its in iteration 1.

## Iteration 3 — vagueness / jargon lint
Whole corpus scanned for vague quantifiers and undefined jargon. Two hits:
- Controlled Demolition: "knocks the nearby prone" -> "everything within 10 ft"
- Living Glow: "dims nearby darkness" -> "shed light in a 15 ft radius"

## Iteration 4 — dead code and orphan prune
Removed: nodeOwned, treesFor (no callers); ICON_VITALS + its 102 KB
VITALS_ICON_ART heart emblem (unused since the painted Vitals plate);
SPECIES_SUB; 5 .embVit CSS rules; ekgBeat keyframes. Net -106 KB.
INCIDENT: assignGlyphs looked dead to the refcounter but was an
immediately-invoked named function populating GLYPH_OF - removing it broke
the page. Caught by the smoke test, restored from git HEAD, obelisk verified
rendering (395 glyphs, 43 nodes drawn). Lesson recorded: refcounts cannot
see positional invocation; every prune needs a boot test - which is exactly
what caught it.
Noted, not fixed: ~53 KB of duplicated small embedded assets (largest 26 KB
x2); dedupe is possible but touches CSS and JS reference plumbing.

## Iteration 5 — performance
Timers freeze under headless virtual time, so instrumented call counters
instead: one render() = computed x2, gatherMods x2; endRound = x4;
takeDamage = x2; DOM = 1,494 nodes. No quadratic paths, no bloat. Verdict:
nothing worth optimizing - further work here would be churn, not speed.

## Iteration 6 — final regression
Everything from all iterations re-verified in one pass on a clean boot:
zero JS errors; glossary, obelisk, equipment all render; Cull the Wounded
self-feeds; Give the Chord spends the buffer; encounter effects survive
End Round; the manual-HP base records. Committed and pushed.

## Engine contract for future building (non-spaghetti guarantees)
- New timed things: buff:{rounds:N,...} or rounds:'enc' — ticking, chips,
  crash-chaining, dedupe all come free.
- New costs: use.pay {temp|shield|shieldPct|charge} — all genuinely deduct.
- New verbs live in runInnate only: selfHealFromDmg, spendAllTemp, armTemp,
  armShield, extend, hold1... one place to add the next one.
- New passives: item passive:{} / ARMOR_MODS / node per:{} — all speak
  EFFECT_MOD_KEYS, the single list a new modifier must be added to.
- Every source of modifiers feeds gatherMods' one apply(); passives dedupe
  by item identity; effects/conditions dedupe by key on every render.
