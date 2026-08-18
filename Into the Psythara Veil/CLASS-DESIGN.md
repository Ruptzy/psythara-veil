# Class design — what exists, and what's missing

*Pulled from the live console. **33 classes** across three Combat Styles — the
original 21 plus a twelve-class expansion.*

**Style split is now 12 Melee / 11 Ranged / 10 Support** (was 8/8/5).

Combat Style is the bigger mechanical lever: **Melee** gets the best AC and
shield bonus and attacks on STR; **Ranged** trades shields for accuracy and
attacks on DEX; **Support** trades both for utility and also attacks on DEX.
Read every class below against its style, not just its name.

---

## Melee — 8 classes

| Class | HP | Fills |
|---|---|---|
| **Juggernaut** | 14 | The true tank. Intercept takes an ally's damage; immune to prone and forced movement |
| **Soldier** | 14 | Balanced frontline. Free reloads, +3d6 damage windows |
| **Sentinel** | 14 | Anti-supernatural. Ally AC bubble, strips magical effects |
| **Starseer** | 12 | Mystic warrior. Two reactions that negate incoming attacks outright |
| **Omniform** | 12 | Shapeshifter. Reach, and copies enemy resistances |
| **Monster Hunter** | 12 | Anti-creature. Always knows where the mark is, halves its speed |
| **Beast Tamer** | 12 | Companion striker. The only pet class |
| **Survivor Engineer** | 12 | Industrial. Repairs constructs, creates difficult terrain |

## Ranged — 8 classes

| Class | HP | Fills |
|---|---|---|
| **Detective** | 11 | Adaptive. Attacks that cannot miss, plus an evasion reaction |
| **Bounty Hunter** | 11 | Marksman with flight. Ignores cover and concealment |
| **Gadgeteer** | 11 | Tech striker. Grapple, turret, no-roll line damage |
| **Smuggler** | 11 | Charisma rogue. Escapes, imposes disadvantage |
| **Specter** | 11 | Recon. Reveals hidden enemies, goes invisible |
| **Psion** | 10 | Mental control. **Dominate is the strongest control in the game** |
| **Technomancer** | 10 | Tech-mage. Party shields, chain lightning |
| **Warp Mage** | 10 | Mobility caster. Phase out of an attack, one extra action per round |

## Support — 5 classes

| Class | HP | Fills |
|---|---|---|
| **Harmonist** | 10 | Buff/debuff. +5 AC and 15 temp HP to everyone in 20 ft |
| **Luminar** | 10 | Healer with a revive and an AoE that damages and heals at once |
| **Medic** | 10 | Pure healer. 10 HP per round regeneration |
| **Politician** | 10 | Social control. Command disarms and skips a turn |
| **Scientist** | 10 | Utility. Weakpoint scan the party shares, area AC shred |

---

## Balance pass — what was wrong, and what changed

*Four of the five below are now fixed in the console. The fifth is a content
gap rather than a number to correct.*

### 1. The Harmonist out-tanks the tank  — FIXED (now 10 HP)

Harmonist had **15 HP per level against the Juggernaut's 14** — a Support, on the
style with the worst AC and shield bonus, carrying the biggest health pool in the
game. Now **10**, matching the other four Supports. Its party buff (+5 AC and
15 temp HP in 20 ft) is strong, and that is fine on a genuinely fragile class.

### 2. Detective was the best-armed Ranged class  — FIXED

12 HP where every other Ranged sits at 11 or 10, plus the joint-highest AC
buff (+6) and accuracy buff (+30%), plus attacks that cannot miss. Now **11 HP**,
and its evasion reaction gives **+5 AC** instead of +6 AC *and* +3 DEX — that DEX
was a second AC bump and an attack bonus hidden inside a defensive reaction.

### 3. Two classes printed one number and applied another  — FIXED

**Monster Hunter's Hunter's Mark** and **Scientist's Weakpoint Scan** both told
the player **+3d6** and then applied **+40% damage**. On a 6d8 weapon those are
close by luck (+11 vs +10.5); on a 12d12 mythic the gap is +31 against a printed
+10.5. Both now apply `dmgDice:'3d6'`, exactly as printed. Hunter's Mark also
drops from 4 rounds to 3 — with advantage attached it was outrunning the
Soldier's Focus Fire on every axis.

### 4. ~~Two classes have no starter-weapon choice~~ — WRONG, retracted

I reported that Beast Tamer and Politician had one weapon each. **They don't.**
Beast Tamer has Tamer's Spear and Whip; Politician has Ceremonial Blade and
Diplomat's Pistol. My extraction only matched single-quoted names and missed
the two written with double quotes because their names contain apostrophes.

Re-checked properly: **all 21 classes have exactly two starter weapons.**
Nothing to fix here.

### 5. Support is the thin style, and it is nearly all healing  — still open

8 Melee / 8 Ranged / **5 Support**. Four of those five heal or buff; Politician
is the only Support that does neither. If a table runs two Supports they will
overlap heavily.

---

## Gaps — roles nothing currently fills

Two kinds of gap, and the second matters more.

### A. Roles with no class — all filled

Every gap identified in the 21-class audit now has an owner. The style split
went from 8 / 8 / 5 to **12 Melee / 11 Ranged / 10 Support**.

| Gap | Filled by | What it added |
|---|---|---|
| Ranged heavy | **Siegebreaker** | A ranged bruiser who can actually hold the launchers and siege weapons the catalog already carried |
| Melee infiltrator | **Voidstalker** | Get in close unseen and delete something. Pairs with Raxen |
| Drone / summon commander | **Drone Marshal** | An owner for the companion drone and Mini-Turret |
| Affliction specialist | **Plaguebinder** | Poison and disease were fully modelled — tiers, durations, ramp-to-cap, cures, the green screen, the acknowledge gate — and no player could reach any of it |
| Zone controller | **Riftwalker**, **Warden** | Terrain that reshapes a fight, where Hazard Field stood alone |
| Dedicated debuffer | **Hexshot** | Stacking and holding debuffs as an identity, not a side effect |
| Gear / economy | **Quartermaster** | Charges and equipment as a resource the party shares |
| Support that doesn't heal | **Quartermaster, Oracle, Drone Marshal, Warden** | Four Supports that never touch a heal, so two at one table no longer overlap |

**On Plaguebinder specifically:** it does not apply poison to an enemy, and that
is correct — the DM does that. What it does is compute the CON save DC off the
player's live INT and proficiency, print it with the tier that lands, and track
every charge and duration on the player's side. The player says one sentence;
the DM sets the condition. That is the intended shape, not a compromise.

---

### B. Mechanics the engine supports that almost nothing uses

*Counted across all 20 species, 21 classes, 20 stims, 6 chips and 68 items.
These are the gaps that make builds feel samey, and they are invisible from a
role list.*

**Saving throws: the structural gap, now closed.**

This was the finding that mattered most, and it needs restating in the right
frame. The problem was never "the console cannot model an enemy" — it is not
supposed to. **The sheet is the player's; the DM runs the enemy.** The problem
was that when a player's ability *did* reach an enemy, the console left them to
work the number out themselves, which is exactly the arithmetic it exists to
take off their hands.

| Source | Declares a save | Auto-hits |
|---|---|---|
| Items | 37 | — |
| Species | 1 → **2** | 2 |
| **Classes** | **0** → **8** | 17 |

`runInnate` had no `save` handling at all. It does now: an ability names the
stat, the console computes `8 + proficiency + best stat` from the player's live
sheet, and prints the DC with its failure text. The player reads one finished
line to the DM. Auto-hit abilities are still the majority, and that is fine —
they are the "press it, it works" baseline that saves now contrast against.

**The division of labour, stated once:** anything on the player's side is
automated to the decimal — charges, durations, stacked buffs, the maths behind
AC and shields. Anything on the enemy's side is *computed and displayed* — DC,
dice, duration — then handed to the DM. Tags are the finished form of the
second half, not a placeholder for it.

| Lever | What it enables | Uses then | Uses now |
|---|---|---|---|
| `save` | let the enemy roll | 0 classes | **8 classes** |
| `channel` | wind up a whole turn for something huge | 1 (an item) | **2** |
| `selfCost` | pay your own HP for power | 1 (Symbiote) | **3** |
| `critMin` | widened crit range — crit-fishing builds | 1 (Soldier) | **3** |
| `dmgDice` | flat bonus dice that scale honestly | 0 | **8** |
| `dmgRanged` | a ranged-only damage identity | 1 | **2** |
| `lifesteal` | heal off damage dealt | 4 | **7** |

Still stranded: `gamble` (2 stims), `knockdown` (2), `atkDis` (3 — all stim
*crashes*, never a tool), `acPct` (1), `noAttack` (1).

Against the comfort zone: `acFlat` **25**, `accPct` **14**, `speedAdd` **14**,
`dmgAll` **10** across species and classes. The spread is wider than it was, but
those four still lead — worth watching on the next expansion.

**Other built-and-unused systems:** familiars (one class), ammunition (8 items,
no class interacts with reloading or conserving), jam and recoil (two items
each, nobody builds around them).

---

## Balance pass — 2026-08-10

Every class and species was scored on one scale: the damage-equivalent value of
a full cryo cycle of its abilities, counting damage, healing, temp HP, buff
percentages over their real durations, AC, damage reduction and use counts.

**Result: the measurable spread went from 3.4x to 2.17x.**

| Role | Before | After |
|---|---|---|
| Ranged | 109–335 (3.1x) | 131–211 (**1.61x**) |
| Melee | 120–312 (2.6x) | 144–270 (**1.88x**) |
| Support | 0–330 | 99–284 (**2.87x**) |

### Trimmed

| Class | Was | Now |
|---|---|---|
| Bounty Hunter | Target Lock +30% acc / +35% dmg, 4 rd | +20% / +25%, 3 rd; Jetpack 3→2 uses |
| Beast Tamer | Bonded Fury +35% dmg, 4 rd; Rally +3 AC | +25%, 3 rd; +2 AC |
| Medic | Triage regen 10 HP/rd; Stim 25 temp | 6 HP/rd; 20 temp |
| Juggernaut | Intercept −10 damage taken | −7 |
| Monster Hunter | Takedown 8d8 | 7d8 |
| Thrynn | Skybound +25 ft, +3 DEX | +20 ft, +2 DEX |
| Lombax | Field Rig +3 AC, +20% acc, +25% dmg | +2 AC, +15% acc, +20% dmg |

### Raised

Sentinel, Psion, Technomancer and Gadgeteer were not weak per activation — they
simply had **two** uses where comparable classes had five or six. All four went
to 3 uses on the relevant abilities. Drone Marshal's Swarm went 5d8→6d8 and
Bulwark +2→+3 AC. Bloodwarden's Blood Price now runs 3 rounds instead of 2, and
Crimson Ward grants 30 temp instead of 25 — it pays real HP up front, so the
payoff has to outlast a single exchange.

### Deliberately left alone

**Medic still tops Support (284 vs 181 average), and that is correct** — it has
zero offence. Monster Hunter tops Melee with zero defence. Juggernaut is the
tank. Classes that lead their role all pay for it somewhere visible.

**Oracle, Plaguebinder and Drone Marshal score low and are not weak.** Their
value is rerolls, disease application and five drone modes — real at a table,
invisible to a numeric model. Scoring them by their buff payload would
underrate them, so they were not "corrected" upward to hit a number.

### Correctness bugs found by the sweep

1. **Orrakai's `tempHP: 10` did nothing.** The engine reads `temp`; `tempHP` is
   not a key it has ever known. Silent no-op since the species shipped.
2. **Bounty Hunter's card promised "+3d6 damage"** while the engine applied
   +35% — different numbers, and the text was never true.
3. **Lombax's summary promised "your next attack deals +2d6"** which the engine
   never granted at all.
4. **Monster Hunter's Mark said 4 rounds; the buff ran 3.**
5. **Detective's Calculated Evasion said +6 AC; the engine gave +5.**

A standing check now compares every card's printed numbers — uses, rounds, AC,
accuracy and quoted dice — against the payload that actually runs. It reports
zero mismatches across all 33 classes and 20 species.

---

## What is actually left

The role list is complete. What remains is narrower and worth naming honestly.

**Levers still stranded.** `gamble` lives in two stims and nothing else — as a
class identity it would still be the most distinct-feeling thing in the game.
`knockdown` (2 uses), `atkDis` (3, all stim *crashes* rather than tools), `acPct`
and `noAttack` (1 each) are all built and effectively unused.

**Systems with one customer.** Ammunition exists on 8 items and no class builds
around reloading or conserving it. Jam and recoil sit on two items each. Krell's
`cost:'Reaction'` displays correctly but nothing stops a player using it on their
own turn — the engine does not distinguish reactions from actions.

**Not a gap:** enemy tracking. The console is the player's sheet and the DM runs
the opposition, so abilities that land on an enemy are meant to compute their
numbers and hand over a line to read — not to simulate the target. Any future
review that lists "cannot model an enemy" as a shortcoming is misreading the
design.

---

## Template

```
Name:{role:'Melee'|'Ranged'|'Support', hp:10|11|12|14,
  r:'Short title — how it reads on the sheet',
  d:'One line of who they are.',
  w:[['Weapon A','Ranged/Melee, +3 to hit, 1d8+3','Special line'],
     ['Weapon B','...','...']],          // two, so the pick is a real choice
  u:[['Utility A','Action — what it does. 2/cryo cycle.',
      {cost:'Action', n:2, rest:'short',
       act:{ ...same shape as species abilities... }}],
     ['Utility B','...',{...}]]}
```

`act` supports `dmg`, `dmgType`, `autoHit`, `heal`, `healAdd`, `tempHP`,
`clearConditions`, `clearPoison`, `knockdown`, and `buff:{rounds, flat, pct,
acFlat, accPct, dmgAll, dmgDice, critMin, speedAdd, lifesteal, atkAdv,
hpPerRound, tags:[]}`. Applying poison or disease from a class ability would be
new engine work — small, and worth it if you build the affliction class.
