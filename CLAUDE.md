# Into the Psythara Veil

Sci-fi tabletop RPG campaign. Harold runs it as DM for a table of nine players.
This repo holds the **rules design** and the **Psythara Operative Console** — a
single-file HTML character sheet the players run locally.

This file exists so a fresh Claude session on *any* machine starts caught up.
Read it before touching anything.

## Layout

| Path | What it is |
|---|---|
| `Control console/psythara-operative-console.html` | The live character sheet. Single file, ~14 MB, no build step — open it in a browser. |
| `Control console/portfolio/` | Trimmed public-facing copy + writeup. Not the working version. |
| `Into the Psythara Veil/*.md` | Rules design docs — see below. |
| `Into the Psythara Veil/Game Guides/` | Player-facing `.docx` guides (Player Guide, Classes, Species List, Armor). |
| `Into the Psythara Veil/Sargasso Station/` | Adventure lore documents. |

Design docs worth reading before a change: `SKILL-TREE-RULEBOOK.md`,
`CLASS-DESIGN.md`, `CLASS-BRANCHES.md`, `SPECIES-DESIGN.md`, `SPECIES-VEINS.md`,
`VERTICAL-SLICE.md`, `PLAYER-BACKSTORIES.md`.

**Not in git** (too large; they live on the desktop and on `D:\`): Dungeon Draft
asset packs, `Pictures/`, `Videos/`, `Sound effects for DnD/`, the two
image-heavy weapon/quest catalogs, and `Control console/backups/` — 91 manual
timestamped backups archived to `D:\Archive\psythara-console-backups` on
2026-08-18. **Git history is the backup now. Don't recreate that folder.**

## The console is a player's character sheet, not a combat simulator

The DM runs everything on the enemy side — enemy HP, saves, conditions,
positioning. "The engine has no model of an enemy" is the **intended boundary,
not a gap**; do not raise it as a shortfall in design reviews.

When an ability affects an enemy, the correct implementation is to compute and
*display* what the player tells the DM — save DC, damage rolled, duration — and
carry the rest as tags on the sheet. Automate the player's own side
aggressively: buffs, roles, ability charges, conditions on them, gear passives,
the maths behind AC and shields. That is where "it calculates everything for
you" applies. Don't build enemy tracking unless asked.

## Progression update — design locked, no code written yet

Harold asked for plan-first. Ship in three phases: (1) XP bar + levels,
(2) Vox Credit currency + shop over the existing catalog/consumables,
(3) skill trees.

- **Level cap 20.** XP curve: level N costs N×100; sessions pay ~100–150 XP.
- **Everyone is always the same level.** The DM announces one XP number aloud,
  every player types the same number, all sheets read identically forever
  (milestone leveling with a visible bar). Cheat/typo detection = any sheet
  differing from the table's number.
  **No individual XP channels of any kind.** Sacrifice economies, buying XP with
  V₡, contribution tallies and last-hit bonuses were all designed and then
  deliberately cut for simplicity. **Do not resurrect them.** Roleplay is
  rewarded in V₡, not XP. Individuality lives in builds, wealth and gear —
  never in level.
- **Catch-up = Back-Pay.** An absent player receives last session's base award
  as one flat make-up entry next session. No benchmark number, no
  sheet-to-sheet state — an earlier "campaign benchmark ×1.5" design was
  rejected because it made players enter campaign state, and this must be
  fool-proof. Absence costs the bonus share (~30%) but never compounds.
- **Death penalty = System Damage**, not XP loss. Each knock takes one skill
  node offline; the player picks, but it must come from their highest unlocked
  tier. Passives vanish instantly (mods drop from `gatherMods`; the status bar
  visibly dims). Restored by cryo cycle, or early via paid Field Repair. Stacks
  with the existing −2-stats knock penalty.
- **Currency: Vox Credit** (plural Vox Credits, slang "Vox", abbrev VX, symbol
  V₡). Sinks: shop, Field Repair, partial respec, cures. Money never buys XP;
  XP never buys gear.
- **Points: 3 per level, 60 at cap.** Nodes are ranked (1–3 points,
  Cyberpunk-style) or unlocks. Want-space ~100+ points against 60 owned.
- **Skill tree layers:** 3 shared style trunks (Melee/Ranged/Support, forking at
  tiers 2 and 4 — Bulwark/Onslaught, Deadeye/Suppression, Lifeline/Architect);
  class branches (~5–7 nodes × 33 classes, 2 pts each, capstone transforms a
  signature ability); species veins (3 nodes, free, auto-unlock at 5/10/15);
  and shared discipline clusters gated by affinity tags — **Ghostwire**
  (hacking) and **Psywave** (mental).
- **Respec:** DM-granted free windows at story moments, plus paid partial
  respec in V₡.
- **Anti-cheat:** local files can't be tamper-proof, only tamper-evident. Every
  XP gain goes through a visible award log the DM can glance at.
- A **DM module** comes later. The award menu / make-up flow being manual-first
  is intentional — nothing gets thrown away.

### The anti-stat-buff law

Seven node kinds: **rank** (prefer condition-gated — "+AC while shields down"),
**trigger** (when X then Y), **stance** (toggles), **active unlock** (new
abilities with charges; where hacking lives), **conversion** (trade
shield/stims/HP for effect), **permission** (narrative licenses, DM-adjudicated
tags), **capstone**.

Max ~40% rank nodes per branch; every tier needs at least one decision-type
node. Conditions the sheet already knows — HP%, shields, temp HP,
poison/disease, knocks, armor, weapon, round, Overdrive — can gate mods fully
automatically, generalizing the existing Unarmored `noArmorOnly` pattern.

### Automation Contract — a hard requirement

**Nothing is prose-only.** Every node compiles to a real engine payload *and* a
real UI surface:

- RANK to `gatherMods` rows in Active Effects; conditional ranks to `when:{...}`
  gated mods (new engine work)
- TRIGGER to tap buttons in a Reactions strip with per-encounter counters
  ("Reset to Rd 1" is the encounter boundary)
- STANCE to indefinite toggled effects
- ACTIVE to the identical format used by class abilities, rendered as full cards
  in the Abilities section via `runInnate`
- CONVERSION to resource-checked buttons
- PERMISSION to visible tags plus glossary
- CAPSTONE to data patches on the class ability's payload, never prose

**Ship gate — zero-orphan audit:** every printed number matches its payload,
every `[AUTO]` has a payload, every `[TAP]` a button, every `[TABLE]` a rendered
tag, all actives pass the `runInnate` batch test. Skill state must also land in
saves and in `migrate()`.

### Skill-tree UI

**The obelisk *is* the interface** ("Obelisk of Ashur", from Harold's concept
art). Nodes are sockets on a procedurally drawn monument; Void energy flows
Core to branches on unlock; System Damage shows as a node's light dying.

Build order: pricing rulebook + taxonomy, then trunks + disciplines, then one
vertical slice for sign-off, then 33 class branches batched by role, then
species veins, then SVG glyph icons (swappable by name, glow states a shared
overlay), and the obelisk layout and shell last.

## The table

Nine PCs: Caolan Shal (Starseer, Rugi order), Echo (combat engineer), Vorvane
(bounty hunter), Quill (Starseer renegade), Nyra Veylin (detective), Delairah
(Aurelis), Zuk the Truck (Drakari), Jed Rourke (Cyborgian Engineer, age 92),
Sokka of the Veyr (Virellian Harmonist). Full backstories in
`Into the Psythara Veil/PLAYER-BACKSTORIES.md`; portraits in `Pictures/Players/`
(not in git).

**Unresolved lore collision — do not paper over it.** Vorvane's backstory
introduces **Othuun**, a proto-cosmic void intelligence that fragmented into
1,000 shards, ~295 of which a mega-corp turned into symbiotes. This overlaps
heavily with the obelisk-entity lore already written into the console's
transmissions (shards as "mouths kept shut", Forerunner containment). As of
2026-08-11 Harold has **not ruled** whether the obelisk entity is Othuun, a
sibling, or its killer. Do not treat them as unified when writing new
transmissions until he says so. Vorvane's backstory also leaves the mega-corp
name blank; Shoyunuki fits.

## Known design hole

No species has a Charisma primary, and CHA appears exactly once anywhere (as
Auralis's +1). Politician and Harmonist are both built on CHA and have no
species that supports them. See `SPECIES-DESIGN.md`.
