# Void Ascension — Skill Tree Rulebook

*The law every node is written under. Content multiplied by 33 classes and 20
species inherits its balance from this page, not from per-node judgment calls.*

Status: **draft for DM review** — nothing here is implemented yet.

---

## 1. The frame

- Level cap **20**, **3 points per level → 60 points** per character, ever.
- The whole party is always the same level, so everyone has the same points —
  builds differ, budgets never do.
- One obelisk per character. Your **combat style** (Melee / Ranged / Support)
  decides which trunk face is alive for you. Your **class** grows its own branch.
  Your **species** has three thin veins that wake on their own at levels 5/10/15
  (free, no points). **Disciplines** are shared clusters gated by affinity tags.
- Fork choices inside a trunk are **mutually exclusive** — picking Bulwark seals
  Onslaught until a respec.
- Tier gates by level: **T1 = 1, T2 = 5, T3 = 9, T4 = 13, T5 = 17.**
- A node is buyable when it's tier-legal and connected to a node you own.
- **System Damage:** a knocked-down player picks one owned node from their
  highest unlocked tier; it goes dark — all its ranks at once, passives vanish
  instantly. Cryo restores it; Field Repair (V₡) restores it early.
- **Respec:** full and free at DM story windows; partial for V₡ (price set in
  the currency phase).

---

## 2. Node taxonomy — the seven kinds

Every node is exactly one of these. The mix is law, not preference:

> **≤ 40% of any branch may be RANK nodes, and every tier of every branch must
> contain at least one decision-type node (stance, trigger, conversion, or
> active).**

| # | Type | What it is | Decision it creates |
|---|---|---|---|
| 1 | **RANK** | passive numbers, 1–3 points invested, scaling per rank; conditional versions strongly preferred | build-time only |
| 2 | **TRIGGER** | when X happens → Y fires (auto or one tap) | moment-to-moment |
| 3 | **STANCE** | a toggle; mutually exclusive modes | every fight, sometimes every round |
| 4 | **ACTIVE** | a new ability with charges per cryo cycle | when to spend it |
| 5 | **CONVERSION** | trade a real resource (shield, HP, stim charge, your action) for an effect, at will | cost vs. payoff, chosen in the moment |
| 6 | **PERMISSION** | a narrative license — something that is simply *true about you* now | invites creative play; the DM adjudicates outcomes |
| 7 | **CAPSTONE** | hand-crafted; transforms how an ability or build works | the build's identity |

## 3. Automation classes

Every node carries exactly one of these tags. This is the sheet-vs-table
boundary, decided at authoring time so implementation never has to guess:

- **[AUTO]** — the sheet runs it entirely (mods, charges, dice, conditions).
- **[TAP]** — fires on one player tap ("I was hit", "it died"); sheet does the rest.
- **[TABLE]** — displayed as a tag; the DM runs it. Permissions and enemy-facing
  effects live here, by design philosophy.

**Conditions the sheet knows and can gate [AUTO] mods on** (whitelist — nothing
outside it may appear in a condition):

> own HP % · shields up / down / full · temp HP present · poisoned · diseased ·
> knock count · armor worn / none / type · equipped weapon type · round number ·
> Overdrive active · channelling · per-encounter and per-cycle counters

Anything the sheet cannot know about itself (movement distance, enemy state,
ally state, position) is either a [TAP] or a [TABLE] — never a silent rule.

## 4. Pricing law

The unit: **1 point ≈ one "minor permanent edge."** Concretely, one point buys
one of (unconditional): **+1 AC · +5% accuracy · +5 ft speed · +3 max HP ·
+5% style damage · +1 dmgReduce**, or a minor trigger worth ~1d8 once per
encounter.

Multipliers on that unit:

| Rule | Effect |
|---|---|
| **Conditional (uptime under ~half the time)** | the effect may be ~1.5–2× bigger for the same point |
| **Tier scaling** | T3 ranks may be ~1.5× the T1 unit; T5 ~2× — later points feel bigger |
| **Stances** | trades, not additions — the two sides should roughly cancel; priced 1–2 pts for the *option* |
| **Actives** | ~half a class signature ability, 2–3 uses/cycle = **3 pts** |
| **Permissions** | 1–2 pts; the price is opportunity cost, not math |
| **Capstones** | **5 pts**, T5, and require ≥8 points already in that branch |

Standard costs: trunk rank = **1/rank** · class branch node = **2** (capstone 5)
· discipline entry = **2**, actives **3**, discipline capstone **5** · species
veins **free**.

**Budget reality check:** one trunk path fully ranked ≈ 30–34 · full class
branch + capstone ≈ 15–17 · one discipline fully bought ≈ 18–22. Total
want-space ≈ **85–100+ points vs 60 owned.** Scarcity is the design.

## 5. Affinity table (discipline gates)

Self-referential only — your own class and species tags, never the party's.

| Discipline | Class key | Species key |
|---|---|---|
| **Ghostwire** (hacking) | Technomancer, Gadgeteer, Scientist, Drone Marshal, Specter, Detective, Smuggler, Quartermaster | Synthborn, Eidolon |
| **Psywave** (mental) | Psion, Starseer, Oracle, Harmonist, Warp Mage, Plaguebinder | Greys, Nymari |
| **Fieldcraft** (utility) | *everyone* | — |

Either key opens the gate — a Synthborn Juggernaut hacks; a Greys Soldier reads
minds. That rule exists to create characters class logic alone would never make.

---

---

# THE THREE TRUNKS

Node format: `ID · NAME · type · cost · [automation] — effect (condition)`.
Ranks written as r1 / r2 / r3.

---

## MELEE TRUNK — "The Crucible"
*Spine, then the fork: BULWARK (outlast them) / ONSLAUGHT (end them first).*

### Spine (T1)
- **M1 · Iron Vitals** · RANK ×3 · 1/rank · [AUTO] — +3 / +6 / +9 max HP.
- **M2 · Closer** · RANK ×3 · 1/rank · [AUTO] — +5 ft speed per rank; at r3
  difficult terrain doesn't slow you [TABLE tag].
- **M3 · First Blood** · TRIGGER ×2 · 1/rank · [AUTO] — round 1 of every
  encounter, your first melee damage roll gains +2d6 / +4d6.

### BULWARK path
- **M4 · Desperation Plating** · RANK ×2 · 1/rank · [AUTO] — +2 / +4 AC **while
  below half HP**. (Conditional: bigger than the flat unit on purpose.)
- **M5 · Guard Stance** · STANCE · 2 · [AUTO] — toggle (bonus action): −25%
  damage dealt, +3 AC; adjacent allies may treat you as cover [TABLE tag].
- **M6 · Spite** · TRIGGER ×2 · 1/rank · [TAP] — tap when an enemy hits you:
  your next attack gains +1d8 / +2d8. Stacks up to twice.
- **M7 · Unbreakable** (T4) · TRIGGER · 2 · [AUTO] — once per encounter, damage
  that would knock you to 0 leaves you at 1 HP instead; your shield empties.
- **M8 · CAPSTONE — Living Fortress** (T5) · 5 · [AUTO+TABLE] — **while below
  25% HP:** damage reduction 5, immune to knockback and prone [TABLE], and
  attacks aimed at adjacent allies may be redirected to you [TABLE].

### ONSLAUGHT path
- **M9 · Momentum** · RANK ×2 · 1/rank · [AUTO] — +10% / +20% melee damage.
- **M10 · Berserker's Bargain** · CONVERSION · 2 · [AUTO] — at will: dump your
  remaining shield to 0; your next melee hit deals that much bonus damage.
- **M11 · Bloodrush** · TRIGGER ×2 · 1/rank · [TAP] — tap when you drop an
  enemy: heal 1d8 / 2d8 and your next attack has advantage.
- **M12 · Executioner** (T4) · RANK ×2 · 1/rank · [AUTO] — crit on 19–20; r2:
  crit on 18–20. (Uses the critMin lever.)
- **M13 · CAPSTONE — Avatar of Ruin** (T5) · 5 · [AUTO] — stance: +40% melee
  damage, 20% lifesteal, −3 AC. The trade is the identity.

*Mix check — Bulwark: 1 rank of 5 (20%). Onslaught: 2 of 5 (40%). Legal.*

---

## RANGED TRUNK — "The Lattice"
*Spine, then the fork: DEADEYE (one perfect shot) / SUPPRESSION (a wall of fire).*

### Spine (T1)
- **R1 · Steady Hands** · RANK ×3 · 1/rank · [AUTO] — +5% / +10% / +15% accuracy.
- **R2 · Skirmisher** · RANK ×3 · 1/rank · [AUTO] — +5 ft speed per rank; at r3
  your ranged attacks ignore movement penalties [TABLE tag].
- **R3 · Opening Shot** · TRIGGER · 1 · [AUTO] — round 1: your first ranged
  attack rolls with advantage.

### DEADEYE path
- **R4 · Cold Focus** · RANK ×2 · 1/rank · [AUTO] — +10% / +20% ranged damage
  **while your shields are full** (untouched = untouchable).
- **R5 · Called Shot** · ACTIVE 3/cycle · 3 · [AUTO+TABLE] — declare before an
  attack: on hit, +2d8 and the target's speed is 0 until its next turn [TABLE].
- **R6 · Deadeye Stance** · STANCE · 2 · [AUTO] — toggle: −10 ft speed, +15%
  accuracy, crit on 19–20 while braced.
- **R7 · Piercing Rounds** (T4) · RANK ×2 · 1/rank · [AUTO] — +1d6 / +2d6 armed
  on every ranged damage roll; your shots ignore 2 / 4 damage reduction [TABLE].
- **R8 · CAPSTONE — The Long Silence** (T5) · 5 · [TAP] — once per encounter,
  declare the shot: if it hits, it is automatically a critical (sheet doubles
  the dice on that roll).

### SUPPRESSION path
- **R9 · Warmed Barrels** · RANK ×2 · 1/rank · [AUTO] — from round 3 of an
  encounter onward: +15% / +25% ranged damage. (The gun earns its heat.)
- **R10 · Covering Fire** · ACTIVE 3/cycle · 3 · [TABLE] — one enemy you can
  see attacks at disadvantage until your next turn, and allies moving away from
  it provoke nothing. DC-free; it simply holds.
- **R11 · Ricochet Logic** · TRIGGER · 1 · [TAP] — tap when you miss: +15%
  accuracy on your next attack this encounter.
- **R12 · Entrench** (T4) · STANCE · 2 · [AUTO] — toggle: speed 0 while active;
  +20% ranged damage, +2 AC, immune to jam and recoil [TABLE where itemized].
- **R13 · CAPSTONE — No Man's Land** (T5) · 5 · [TAP+TABLE] — once per
  encounter, until your next turn: any enemy that moves in your sight eats 3d6
  (tap to roll each), and everything in your lane attacks at −15% accuracy.

*Mix check — Deadeye: 2 ranks of 5 (40%). Suppression: 1 of 5 (20%). Legal.*

---

## SUPPORT TRUNK — "The Chorus"
*Spine, then the fork: LIFELINE (nobody dies) / ARCHITECT (the fight goes as planned).*

### Spine (T1)
- **S1 · Field Conditioning** · RANK ×3 · 1/rank · [AUTO] — +3 / +6 / +9 max HP.
- **S2 · Efficient Kit** · RANK ×3 · 1/rank · [AUTO] — your consumables (stims,
  medkits, cells) restore +1 / +2 / +3 extra on use.
- **S3 · Triage Instinct** · TRIGGER · 1 · [AUTO] — the first support ability
  you use each encounter also gives *you* 5 temp HP.

### LIFELINE path
- **S4 · Deep Reserves** · RANK ×2 · 1/rank · [AUTO] — +1 / +2 uses per cycle of
  your class's healing/support signature ability.
- **S5 · Bond of Need** · CONVERSION · 2 · [AUTO+TABLE] — at will: give an ally
  your own HP at a 1 : 1.5 rate (you lose 10, they gain 15). Your side is
  automated; theirs is a tag they read.
- **S6 · Stabilizer Stance** · STANCE · 2 · [AUTO] — toggle: your heals +25%,
  your damage −25%.
- **S7 · Guardian Reflex** (T4) · TRIGGER · 2 · [TAP] — once per encounter, tap
  when an ally goes down: immediately spend one healing charge on them at range,
  out of turn.
- **S8 · CAPSTONE — Lazarus Protocol** (T5) · 5 · [TAP+TABLE] — once per cryo
  cycle: every downed ally revives at 25% HP [TABLE tags]; the surge costs you
  2d6 HP, unpreventable (automated).

### ARCHITECT path
- **S9 · Force Multiplier** · RANK ×2 · 1/rank · [AUTO] — buffs you grant last
  +1 round; r2: +1 use per cycle of your buffing signature.
- **S10 · Attrition Field** · ACTIVE 2/cycle · 3 · [AUTO+TABLE] — drop a 20 ft
  field for 3 rounds: enemies inside −10% accuracy [TABLE], you gain +5%
  accuracy while it stands (automated).
- **S11 · Tempo Theft** · CONVERSION · 2 · [AUTO+TABLE] — spend one of your stim
  charges *without drinking it*: an ally may immediately move their speed
  [TABLE], and you gain +10 ft this round.
- **S12 · Overseer Stance** (T4) · STANCE · 2 · [AUTO+TABLE] — toggle: you make
  no attacks while active (enforced — the noAttack lever); two allies you name
  gain +15% accuracy [TABLE] and you gain +2 AC.
- **S13 · CAPSTONE — Checkmate Protocol** (T5) · 5 · [TAP+TABLE] — once per
  encounter: every ally's next roll has advantage, every enemy's next roll has
  disadvantage. One sentence, read aloud, changes a round.

*Mix check — Lifeline: 1 rank of 5 (20%). Architect: 1 of 5 (20%). Legal.*

---

---

# THE THREE DISCIPLINES

Shared clusters on the monument. Entry costs 2 points at the gate node; you
must hold the class or species key (Fieldcraft has no gate).

---

## GHOSTWIRE — the hacking discipline
*The Veil-Net is Shoyunuki's nervous system, and you have teeth in it.*

- **G1 · Jack-In** · PERMISSION (entry) · 2 · [TABLE] — you can interface with
  any standard or Shoyunuki-manufactured device by touch. No roll to *connect*;
  what happens next is play.
- **G2 · Breach Protocol** · ACTIVE 3/cycle · 3 · [AUTO+TABLE] — shut down one
  device, drone, or turret within 30 ft for 2 rounds. The sheet prints your
  INT-based DC; the DM rolls the device. Against augmented enemies: 3d6
  lightning instead [TABLE].
- **G3 · Spoof** · ACTIVE 2/cycle · 3 · [TABLE] — forge credentials, loop a
  camera, ghost an ID for one scene. A skeleton key with a cooldown.
- **G4 · Black ICE** · TRIGGER · 2 · [TAP] — tap when your tech (or you, if
  augmented) is targeted by a hack or EMP: reflect 3d6 at the source [TABLE],
  and your gear shrugs the attempt [TABLE].
- **G5 · Overwatch Daemon** · STANCE · 2 · [AUTO+TABLE] — toggle: you ride every
  camera and drone feed you've breached this scene [TABLE]; your own accuracy
  −10% while your attention is split (automated).
- **G6 · Puppet String** (T4) · ACTIVE 1/cycle · 3 · [TABLE] — seize an enemy
  drone or turret for 2 rounds. DC printed; the DM drives the fallout.
- **G7 · CAPSTONE — System Lord** (T5) · 5 · [TABLE] — once per cycle: every
  hostile device within 60 ft shuts down for 2 rounds, and every friendly
  device overclocks (+2d6 to drone/turret damage rolls, tags for the table).

## PSYWAVE — the mental discipline
*The same architecture as Ghostwire, pointed at minds instead of machines.*

- **P1 · Third Eye** · PERMISSION (entry) · 2 · [TABLE] — you read surface
  emotional states on sight and may attempt to detect lies without tells.
- **P2 · Mind Lance** · ACTIVE 3/cycle · 3 · [AUTO+TABLE] — 4d6 psychic to one
  creature within 30 ft, no attack roll; WIS save (DC printed) for half.
- **P3 · Veil of Calm** · ACTIVE 2/cycle · 3 · [TABLE] — soothe a crowd, defuse
  a standoff, hold a room fascinated for one scene.
- **P4 · Precognitive Guard** · TRIGGER 2/cycle · 2 · [TAP] — tap when you are
  attacked: +4 AC against that attack only. You saw it a half-second early.
- **P5 · Open Channel** · STANCE · 2 · [AUTO] — toggle: your ability save DCs
  +1 (printed), your AC −2 while your mind is spread open.
- **P6 · Marionette** (T4) · ACTIVE 1/cycle · 3 · [TABLE] — one creature obeys
  one one-word command on its next turn (WIS save, DC printed).
- **P7 · CAPSTONE — Sovereign Mind** (T5) · 5 · [TABLE] — once per cycle, 30 ft:
  enemies save (WIS, printed) or lose their reactions and act after everyone
  else for 2 rounds; allies in range are immune to fear and charm for the same.

## FIELDCRAFT — the utility discipline (open to all)
*Not magic, not tech. Competence.*

- **F1 · Scrounger** (entry) · TRIGGER · 2 · [TAP] — after each encounter, tap:
  on a d6 roll of 5–6 (sheet rolls), recover one spent consumable charge.
- **F2 · Mule Rig** · RANK ×2 · 1/rank · [AUTO] — +1 / +2 utility slots.
- **F3 · Field Medic** · RANK ×2 · 1/rank · [AUTO] — medkits heal +1d4 / +2d4,
  and at r2 using one is a bonus action [TABLE tag].
- **F4 · Pathfinder** · PERMISSION · 2 · [TABLE] — there is always a way in, a
  way out, or a way up, and you know it. Climbing never slows you.
- **F5 · Jury-Rig** · ACTIVE 2/cycle · 3 · [AUTO] — restore 25% of your shield
  *or* clear one jam/malfunction/Cell Overload penalty, as an action.
- **F6 · Iron Constitution** (T4) · RANK ×2 · 1/rank · [AUTO] — poison applied
  to you lands 1 / 2 tiers weaker (interacts with the existing poison system).
- **F7 · CAPSTONE — Improviser's Law** (T5) · 5 · [TABLE] — once per session,
  declare you prepared for exactly this: produce any common item on the spot.
  The DM may veto once per campaign, and should feel bad doing it.

---

## Worked budget — where 60 points actually go

A level-20 Bulwark Sentinel who dipped Ghostwire (Synthborn):

| Spend | Points |
|---|---|
| Melee spine, mostly ranked | 7 |
| Bulwark path, all nodes, key ranks maxed | 13 |
| Living Fortress capstone | 5 |
| Class branch (Sentinel, all nodes + capstone) | 15 |
| Ghostwire: Jack-In, Breach, Black ICE | 7 |
| Fieldcraft: Scrounger, Mule Rig r1, Jury-Rig | 6 |
| **Total** | **53 / 60** |

Seven points spare — enough to feel rich, not enough to have everything. The
same character could instead max Onslaught and skip disciplines entirely, or
go discipline-heavy and stay shallow in the trunk. That's the intended agony.

## The Automation Contract

*"Every buff, every status, every button automated; new abilities appear in the
abilities section; nothing left behind." This section is that promise made
mechanical. A node that cannot satisfy its row in this table does not ship.*

### Node type → engine mechanism → where it lives on the sheet

| Node type | Engine mechanism | Where the player sees & uses it |
|---|---|---|
| RANK (flat) | permanent mods into `gatherMods`, same pipeline as species/armour/role passives | **Active Effects row** ("✦ Steady Hands — +15% ACC — skill"), already counted in the header numbers |
| RANK (conditional) | condition-gated mods — generalises the existing Unarmored `noArmorOnly` pattern | Active Effects row that **lights when its condition holds and dims when it doesn't**, live |
| TRIGGER | one button + per-encounter/per-cycle counter; sheet rolls dice, arms bonuses, applies results | a **Reactions strip**: one tap ("I was hit → Spite"), effect lands automatically |
| STANCE | toggled effect, `rounds: until switched`; mutually exclusive stances displace each other | **toggle button** + a glowing stance row in Active Effects while on |
| ACTIVE | compiles to the *identical* ability format classes use (`cost / n / rest / act`) and runs through `runInnate` | **appears in the Abilities section as a full card** — name, description, action cost, charges, USE button, glossary links — indistinguishable from a class signature |
| CONVERSION | button with resource check (shield, HP, stim charges are all sheet-known); refuses with a reason if you can't pay | button beside the resource it spends |
| PERMISSION | persistent tag + glossary entry | always-visible tag row in Active Effects; [TABLE] by design, but never invisible |
| CAPSTONE transform | **data patch on the class ability's payload** keyed by ability id (ERASURE edits Ghost Protocol's actual `act`), never prose | the transformed ability's own card updates — its printed promise changes because its payload changed |

The last row is the load-bearing one: capstones must be declared as payload
patches, so the card text, the engine behaviour, and the obelisk node can never
disagree — the same single-source rule the console already enforces everywhere.

### New engine work this honestly requires

Named now so nothing is discovered mid-build:

1. **Condition-gated mods** — a `when:{...}` clause on any mod, evaluated in
   `gatherMods` against the sheet-known whitelist. One mechanism serves every
   conditional node in the game.
2. **Indefinite effects** — stances and permissions need `rounds: ∞` (until
   toggled/permanent), alongside the existing counted rounds.
3. **An encounter boundary** — per-encounter triggers need one. Proposal: the
   existing "Reset to Rd 1" button *is* the encounter line; it already resets
   the round clock, so it also resets per-encounter counters. No new button.
4. **Ability payload patches** — the capstone mechanism above.
5. **Skill-tree state in the save** — owned nodes, ranks, dark-vs-lit (System
   Damage state), banked points — plus `migrate()` so old saves open clean.
6. **Node-granted actives injected into the Abilities render** — same list the
   class signatures come from, so charges, rest resets, glossary and sounds all
   apply for free.

### The zero-orphan audit

The standing text-vs-engine sweep (already running for all 33 classes and 20
species) extends to nodes. For every authored node it asserts:

- an automation tag exists ([AUTO]/[TAP]/[TABLE]) — no untagged nodes;
- [AUTO] ⇒ a compiled payload exists — no prose-only automation claims;
- [TAP] ⇒ a button surface exists — no phantom reactions;
- [TABLE] ⇒ a rendered tag exists — no invisible permissions;
- every printed number (dice, %, rounds, uses, DCs) matches the payload — the
  same check that caught five lying cards in the class roster;
- every ACTIVE runs through `runInnate` without error in the batch test.

**Zero mismatches is the ship gate.** Not a goal — a gate.

---

## What the DM reviews before anything multiplies

1. Do the trunk paths read as *identities* or as stat menus?
2. Is the [AUTO]/[TAP]/[TABLE] split where you want your workload to sit?
3. Are the discipline gates right — any class that should hack and can't?
4. Pricing feel: is a capstone worth 5 trunk ranks? Is an active worth 3?
5. Anything here you'd never allow at your table — kill it now, not at node 300.
