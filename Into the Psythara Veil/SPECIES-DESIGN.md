# Species design — what exists, and what's missing

*Pulled from the live console. Ten species, all with a 2-per-cryo-cycle power
except Thrynn (3).*

---

## The ten we have

| Species | Stats | Power | Space it fills |
|---|---|---|---|
| **Human** | pick any 2 × +1 | **Adaptive Surge** — +3 to all six for 3 rds, plus an extra action now | Tempo. The extra action is the strongest single line in the set |
| **Lombax** | DEX +2, INT +1 | **Field Rig** — +3 AC, +20% acc for 3 rds, next attack +2d6 | Precision. Fixes a bad hit chance |
| **Virellian** | CON +2, WIS +1 | **Bioluminescent Flood** — heal 4d6 to self and all allies in 15 ft, +10 ft speed | Party healing without a healer slot |
| **Drakari** | STR +2, CON +1 | **Scale Lock** — shove 15 ft, then −6 damage taken and +3 AC for 3 rds | Holding ground |
| **Auralis** | INT +2, CHA +1 | **Overcharge Core** — 4d6 in 15 ft, then +2d6 energy for 3 rds | Area damage floor |
| **Thrynn** | DEX +2 | **Skybound** — fly 60 ft, then +25 ft, +3 DEX, advantage from above | Vertical mobility |
| **Synthborn** | CON +2, INT +1 | **Systems Override** — purge all conditions and poison, 20 temp HP, immunity 2 rds | The answer to a controller |
| **Myrrid** | WIS +2, CON +1 | **Regrowth** — heal 4d8 + WIS, then 6 HP/rd for 4 rds | Sustain that costs a bonus action |
| **Greys** | INT +2, WIS +1 | **Psychic Lash** — 5d8 that cannot miss, +4 AC vs that target | Guaranteed damage |
| **Symbiote** | CON +1, +2 to STR **or** DEX | **Symbiotic Surge** — costs 2d6 HP; 3 rds advantage, +30% damage, 40% lifesteal | Aggressive melee with a real cost |

---

## Where the coverage actually sits

### Primary stat (+2)

| | Species with it |
|---|---|
| STR | Drakari — and Symbiote if you choose it |
| DEX | Lombax, Thrynn — and Symbiote if you choose it |
| CON | Virellian, Synthborn |
| INT | Auralis, Greys |
| WIS | Myrrid |
| **CHA** | **nobody** |

**This is the biggest hole.** Nothing in the game gives a Charisma primary, and
CHA only appears once anywhere, as Auralis's +1. Politician and Harmonist are
both built on it and have no species that supports them.

WIS is nearly as thin — Myrrid alone.

### Power type

Covered: self-buff, party heal, area damage, single-target damage, mobility,
damage reduction, cleanse, sustain, lifesteal.

Not covered by anything:

- **Enemy control.** Nothing frightens, stuns, slows, blinds or disarms. Drakari
  shoves 15 ft and that is the entire debuff budget across ten species.
- **Stealth and concealment.** No species grants invisibility, cover, or a way to
  break line of sight. The Specter class has no species partner.
- **Teleport / blink.** Warp Mage exists as a class with nothing to pair with.
- **Summoning.** Beast Tamer exists; no species brings a companion.
- **Information.** Nothing reveals a map, detects hidden things, or reads
  resistances. Greys "reads" a target but only for AC.
- **Resource economy.** Nothing refunds a charge, extends a buff, or shortens a
  cooldown — a whole design axis untouched.
- **Reactions.** Every one of the ten is an action or bonus action. Nothing
  triggers on someone else's turn.
- **Anti-shield.** No species counters shields or barriers, despite shields being
  the core defensive currency of the system.
- **Terrain.** Nothing creates cover, hazards, or difficult ground.

---

## Two balance notes worth deciding on

**Thrynn gets 2 stat points; everyone else gets 3.** It has three uses per cycle
instead of two, which may be the intended trade — but it is the only species
paying for its power in stat points, and that is invisible to a player choosing
at the table.

**Only Symbiote has a downside.** It pays 2d6 HP. Every other power is pure
upside. If tradeoffs are meant to be a lever, nine species aren't using it; if
they aren't, Symbiote is the odd one out.

---

> **Status — superseded.** This section describes the original ten species.
> Species 11–20 fill every gap below; **Veyari** is the control species asked for
> in item 2. See `SPECIES-11-20-REVIEW.md`. Kept as the record of why the
> expansion was shaped the way it was.
>
> One framing correction: enemy-facing species powers are **not** blocked on the
> engine. The console is the player's sheet and the DM runs the enemy, so the
> finished implementation is to compute the save DC from the player's live stats,
> print it with the failure text, and carry the rest as tags. That is what
> Veyari and Nymari now do.

## Gaps ranked by how much they'd add

1. **A CHA primary.** Fills the only empty stat and rescues two classes.
   Something built on presence — a power that turns a fight without damage.
2. **A control species.** Frighten, root, blind or disarm. The set has no way to
   stop an enemy doing what it wants, which is a whole role missing.
3. **A stealth species.** Concealment, repositioning unseen, breaking line of
   sight. Pairs with Specter and Smuggler.
4. **A second WIS primary.** Currently one species deep for a stat that drives
   saves, perception and three caster classes.
5. **A reaction species.** Something that happens on someone else's turn would
   feel structurally different from all ten existing powers.
6. **An economy species.** Refund a charge, extend a buff, or let an ally reuse
   something. Rewards a very different kind of play.
7. **A second STR primary.** Drakari is defensive; there is no offensive STR
   species.

---

## Template for anything new

```
Name:{flat:{STAT:2, STAT:1},
  d:'One line of who they are.',
  sp:'Power Name — 2/cryo cycle. What it does, in numbers.',
  ability:{name:'Power Name', cost:'Action'|'Bonus action'|'Reaction',
           n:2, rest:'short',
           desc:'Plain words: what happens when you press USE.',
           act:{ ... }},
  syn:'Which classes want this and why.'}
```

`act` supports: `heal`, `healAdd`, `dmg`, `dmgType`, `autoHit`, `tempHP`,
`clearConditions`, `clearPoison`, and a `buff:{rounds, flat, pct, acFlat,
accPct, dmgAll, dmgDice, critMin, speedAdd, lifesteal, atkAdv, hpPerRound,
tags:[]}` — so most of the gaps above are already expressible without new
engine work. Control effects and stealth would need new modifier keys.
