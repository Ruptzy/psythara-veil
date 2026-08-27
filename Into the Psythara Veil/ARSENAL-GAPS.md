# Arsenal gaps — what the catalog is missing

Companion to `CLASS-DESIGN.md`, which audits the class layer. This one audits
the **weapon layer**, using the same frame: not "what would be cool", but what
the engine already names, or the class sheets already promise, and no item
delivers.

**Provenance, stated once.** `Control console/NEXT.md` §1 refers to "the 20
proposed weapons from the damage analysis". That list is **not on disk** — it
exists only on the desktop machine. Everything below was re-derived from the
console itself on 2026-08-27 and is a **reconstruction, not that list**. When
the desktop is reachable, diff the two: anything on the original that is not
here is design intent the code does not express, and worth recording.

**Method.** Parsed `MECH`, `BOOK`, `CW`, `CLASSES[].w` and the `GRIP_TWO` /
`GRIP_ONE` grip regexes out of `psythara-operative-console.html`, then diffed
the weapon families the engine names against the families that actually exist.

---

## STATUS — 24 weapons landed 2026-08-27

**Sections A–G below describe the catalog BEFORE that batch (37 arsenal
entries). The arsenal is now 61.** The batch is defined in
`Control console/weapons-src.js` and injected by `inject-weapons.py`.

**Closed:**

| Gap | Filled by |
|---|---|
| Shotgun — absent everywhere | Aa-12 ★3, PK ★3, Mastiff ★4 |
| LMG — absent everywhere | LMG ★4, Sax 42 ★4, Arc 07 ★4, Iron Clad ★5 |
| ★ Common — **zero weapons** | G18, Mauler, Aureole |
| ★★★★ melee — empty rung | Gravity Hammer |
| Marksman band, 80/240 → 400/1200 | DMR at 200/600 |
| Single sidearm | seven pistols |

**Still open, worst first:**

1. **Caster arms** — `staff · rod · orb · spike · censer · lens` still have no
   catalog entry. The load-bearing gap.
2. **The stat spread got worse.** The batch was 24 guns, and guns are DEX:
   DEX 13 → **34**, STR 6 → 13, INT 5, WIS **1**, CHA **0**, CON **0**. DEX is
   now ~64% of every attack-stat reference. Nothing a WIS, CHA or CON build can
   pick up has moved, and nothing will until the caster arms exist — that is
   where those stats live in `CW`.
3. **No new damage types.** All 24 reused existing ones. Still absent: **cold,
   psychic, sonic, thunder, acid**. Poison is still one item deep.
4. **Blades** — `sword · sabre · dagger · knife` still absent everywhere. The
   only blade in the game is Korasi Voidblade at ★★★★★.
5. **All 13 orphaned starters are still orphaned** (§G). None of the 24 matched
   an orphaned name. Kestrel was built as a grenade launcher per its filename,
   so `carbine` stayed empty and Quartermaster still cannot roll its weapon.
6. **Melee is still bottom-heavy** — ★ melee: none; ★★ melee: still only the
   Omni-Wrench, which is tagged a progression *tool*.

*Caveat on the tooling: `maul` now reads as covered, but only because "Mauler"
contains the substring. Anchor Maul and Titan Maul are genuinely still
uncovered — Gravity Hammer is a hammer, not a maul.*

**Highest-value next art batch:** a staff, a rod or orb, a sword, a dagger, and
something cold or psychic. That one group closes the caster hole, both blade
families, the WIS/CHA axis and two damage types at once.

---

## The arsenal exists at three tiers, not one

| Tier | Count | Carries |
|---|---|---|
| Catalog — `MECH` + `BOOK` | 37 | rarity, art, role, range, specials, book page |
| Starters — `CW` | 21 | attack stat + damage die, nothing else |
| Named only — `CLASSES[].w` | 13 | a name on the class sheet, no mechanics anywhere |

The third row is the one the source already knows about: *"thirteen classes have
starter weapons with no mechanics table yet."* Counted independently here, it is
still exactly thirteen.

---

## A. Families named in the engine that no item delivers

`GRIP_TWO` and `GRIP_ONE` are the console's own vocabulary of weapon families.
These appear there and in no table at all:

- **Shotgun** — the only mainstream firearm archetype absent everywhere. The
  Phantom Dash SMG currently covers the niche; its role line reads
  "Close-quarters burst — devastating inside 30 ft".
- **LMG / rotary** — no sustained-suppression platform. Siegebreaker is
  "Artillery Doctrine" and its issued Rotary Cannon has no mechanics, so the
  class cannot roll its own gun.
- **Sword / sabre** — no sword anywhere. The only blade is Korasi Voidblade
  at ★★★★★.
- **Slugger**, **lens** — named, never built.

## B. Families that exist only as thin `CW` starters

No catalog version, so no rarity, range, specials, art or book page:

`maul · hammer · bow · staff · harpoon · cleaver · spear · blaster · knife ·
saber · whip · claw · baton · orb · emitter · dispenser · turret · spike · cutter`

The caster cluster — **staff, rod, orb, spike, censer** — is the structural one.
The catalog has zero caster weapons; Crystal Focus Relic is a relic, not an arm.

## C. One entry deep in the catalog

- **Pistols** — Dual Vipers ★★★ only, and it is twin-wield. No single sidearm.
- **Blunt melee** — Omni-Wrench ★★ only, and it is tagged a progression *tool*.
- **Reach** — Starforged Scythe ★★★★★ only.
- **Marksman band** — nothing between the ARs at 80/240 ft and Farsight at
  300/1200 ft.

## D. Damage types absent from every `dtype` field

| Type | Against |
|---|---|
| **cold / cryo** | the *cryo cycle* is the core recharge unit |
| **sonic / thunder** | Harmonist, a Support branch literally called "Resonance" |
| **psychic** | Psion — and the game's own name |
| **acid** | — |

**poison** is not absent but is one item deep (Ink Grenade), against a whole
Plaguebinder class added specifically so a player could reach the poison system.

## E. Stat scaling

Across the 37 catalog entries: **DEX 13 · STR 6 · INT 3 · WIS 1 · CHA 0 · CON 0.**

The single WIS weapon is Korasi Voidblade, a ★★★★★ quest item — so no baseline
WIS weapon exists, and CHA scales nothing at catalog tier at all. `CW` is where
CHA lives (Ceremonial Blade, Diplomat's Pistol) and it never reaches the book.

This compounds the CHA hole `CLAUDE.md` already records at the species layer.
The gap runs species → weapons → classes, and closing it needs all three.

## F. Rarity ladder coverage

| ★ | Arsenal items |
|---|---|
| ★ Common | **0** |
| ★★ Standard | 11 |
| ★★★ Rare | 11 |
| ★★★★ High-Power | 7 |
| ★★★★★ Mythic | 8 |

Two holes:

- **★ Common is empty for weapons.** The only two Common items in the whole
  catalog are the Minor Med Kit and Minor Shield Cell.
- **No ★★★★ melee weapon.** Melee runs ★★ Omni-Wrench → ★★★ (Plasma
  Gauntlets, Boom Shield, Stasis Gloves) → *nothing* → ★★★★★. Every ★★★★
  item with a range is ranged. A melee build jumps ★★★ straight to Mythic,
  against 12 melee branches.

The existing "the rarity ladder holds" audit checks that items stay *inside*
their band. It does not check the ladder for *coverage*, which is what both of
these are.

## G. The thirteen with no mechanics

These classes name a weapon their own sheet issues, and the engine cannot roll it:

| Weapon | Class | Weapon | Class |
|---|---|---|---|
| Anchor Maul | Warden | Kinetic Blaster | Engineer |
| Augury Staff | Oracle | Phase Dagger | Voidstalker |
| Command Sidearm | Drone Marshal | Ritual Blade | Bloodwarden |
| Fracture Rod | Riftwalker | Rotary Cannon | Siegebreaker |
| Gorehook | Reaver | Service Carbine | Quartermaster |
| Gravity Hook | Chainbreaker | Spore Censer | Plaguebinder |
| Hex Repeater | Hexshot | | |

Almost all of these are the **newest** classes — the ones added to fill the
class-side gaps in `CLASS-DESIGN.md`. The roles landed; their weapons never
followed. Plaguebinder is the sharpest case: added so someone could reach the
poison system, and the Spore Censer that applies the poison has no mechanics.

---

## Proposed slate — 20 slots

> **The names below are placeholders.** Harold is renaming all of these. They
> are slot descriptions, not decisions — read the *Closes* column, not the name.

Bands from `NEXT.md`: ★★ 7–11 · ★★★ 18–22 · ★★★★ 27–28 · ★★★★★ 33–85
average damage per turn, all shots.

| ★ | Placeholder | Family | Closes |
|---|---|---|---|
| 1 | Service Pistol | sidearm | ★ tier empty · no single sidearm |
| 1 | Combat Knife | knife | knife family |
| 1 | Service Carbine | carbine | carbine family · **orphan** (Quartermaster) |
| 2 | Breacher Shotgun | shotgun | **the shotgun hole** |
| 2 | Null Blade | sword | **no sword anywhere** |
| 2 | Ward Staff | staff | first WIS caster arm |
| 2 | Spore Censer | censer | 2nd poison item · **orphan** (Plaguebinder) |
| 2 | Shock Baton | baton | baton family |
| 3 | Scout Rifle | marksman | the 80→300 ft band gap |
| 3 | Cryo Lance | lance | **first cold weapon** |
| 3 | Mind Spike | spike | **first psychic weapon** (Psion) |
| 3 | Resonance Bow | bow | **first sonic weapon** (Harmonist) |
| 3 | Diplomat's Pistol | pistol | **first CHA scaling in the catalog** |
| 4 | Rotary Cannon | LMG | **the LMG hole** · **orphan** (Siegebreaker) |
| 4 | Anchor Maul | maul | **first ★★★★ melee** · **orphan** (Warden) |
| 4 | Gorehook | hook | ★★★★ melee · **orphan** (Reaver) |
| 4 | Corrosive Repeater | repeater | **first acid weapon** · **orphan** (Hexshot) |
| 4 | Augury Staff | staff | ★★★★ caster arm · **orphan** (Oracle) |
| 5 | Phase Dagger | dagger | dagger family · stealth finisher · **orphan** (Voidstalker) |
| 5 | Fracture Rod | rod | rod family · **orphan** (Riftwalker) |

Covers every family gap in §A–C, all four missing damage types in §D, both
missing stat axes in §E, both rarity holes in §F, and **9 of the 13** orphans
in §G.

**Left over:** Command Sidearm, Gravity Hook, Kinetic Blaster, Ritual Blade.
Better as `CW` fixes than catalog entries — their classes are newer and the
weapons read as flavour rather than platform.

## Build order per weapon

From `NEXT.md` §1, unchanged:

1. `MECH` entry — `dmg` is **per shot**; `shots` multiplies it (the Dual Vipers lesson).
2. `BOOK` page with a plate, or none — it typesets like the reference pages.
3. Add to `WEAPON_IDS`; mythics also need `MY_FAULTS` (4 faults) and `rar:5`.
4. Settings → Run Consistency Audit. The card text must match the payload.

## Open question carried from §A

The `BOOK` prose and the live `MECH` numbers disagree on **12 of the 13** arsenal
entries whose write-up states a `Damage:` die — Magma Cannon prints 6d6 live over
prose reading 8d6, Obliterator 6d10 over 3d10, and so on. `mechBlock` renders the
live value and the archived write-up sits underneath it on the same page. The
engine is right; the prose is pre-rebalance. Worth a decision: regenerate the
prose lines from `MECH`, or drop the damage line from the archived write-up.
