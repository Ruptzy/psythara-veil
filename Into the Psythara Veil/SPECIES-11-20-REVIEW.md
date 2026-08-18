# Species 11–20 — balance review

Measured against the ten already in the game, not against instinct.

**The existing power budget**, read off the live data: three stat points
(+2 / +1), two uses per cryo cycle, and *one* of the following —

- a 4d6–5d8 damage effect (Auralis 4d6 AoE, Greys 5d8 single)
- a heal in the 4d6–4d8 range (Virellian, Myrrid)
- a 3-round buff worth roughly +20% accuracy **or** +2d6 **or** +3 AC — not all three

Human is the outlier at the top (+3 to all six *and* an extra action). Symbiote
is the only one that pays a cost. That is the band. Below, each new species is
placed against it.

---

## Verdict at a glance

| # | Species | Power level | Action |
|---|---|---|---|
| 11 | Veyari | **On budget** | Ship as designed |
| 12 | Raxen | **Slightly hot** | Make it an Action, or drop the +2d6 |
| 13 | Kaelith | **Slightly light** | Fine — mobility is worth more than it reads |
| 14 | Brakkar | **On budget** | Ship as designed |
| 15 | Nymari | **Over** | Needs a save; no-save 3-round lockout is the strongest control in the game |
| 16 | Vorr | **Over** | Best action economy in the set. 3 rounds, or make it an Action |
| 17 | Zethari | **Well over** | Beats a class ability. Cut one of its three riders |
| 18 | Krell | **Slightly light** | Ship it — the reaction slot is worth the shortfall |
| 19 | Eidolon | **Over without your restriction** | Your instinct is right. Formalise it |
| 20 | Orrakai | **On budget** | Ship as designed |

Seven of ten land in or near the band on the first pass, which is a good hit rate.

---

## The three that need real changes

### 17 · Zethari — cut one rider

Predator Scan currently gives, against one target for 3 rounds: **+20% accuracy,
crit range widened by 2, +2d6 on the first hit each round**, plus full
information.

Compare to **Focus Fire**, the Soldier's *class* ability: +3d6 and crit 19–20 for
3 rounds, twice per cycle. Zethari is roughly that, as a **species**, stacked on
top of whatever class you pick — and it adds crit 18–20 and a free scan.

Pick one to keep:

- keep the accuracy and the scan, drop the crit change; **or**
- keep the crit change, drop to **+1d6** first hit each round

Either lands it beside Lombax, which is where an INT precision species belongs.

### 15 · Nymari — give it a save

−20% accuracy, −20% damage **and no reactions for 3 rounds, with no save**, is
the hardest control in the game. Veyari — your own other CHA species — correctly
allows a WIS save. Nymari should too.

Suggested: **WIS save. Failure — the full 3-round effect. Success — accuracy and
damage penalties for 1 round, reactions unaffected.** That mirrors Veyari's
fail/succeed structure and keeps bosses from being switched off.

### 16 · Vorr — 3 rounds, or make it an Action

A 20 HP, AC 13 body attacking every round for **4 rounds, off a bonus action**,
is more total action economy than Human's *one* extra action — and Human is the
strongest thing in the existing roster.

Either drop to **3 rounds**, or keep 4 and charge an **Action**. The spore burst
on death is good and should stay; it makes the husk worth killing.

---

## Two smaller trims

**12 · Raxen.** Cloak that can't be targeted beyond 10 ft, +15 ft, *and* an
opening attack at advantage for +2d6 — from a bonus action. Thrynn pays an action
for a comparable package. Either charge an Action, or drop the +2d6 and let the
advantage be the reward.

**19 · Eidolon.** You flagged this yourself and you're right. Formalise it as:
*only abilities with 2 or more uses per cycle can be refunded.* I'd also drop the
+10% output — the refund and the extra round are already the whole point, and
three riders on one effect is what pushed Zethari over.

---

## Two that are slightly light — leave them

**13 · Kaelith** and **18 · Krell** both read under budget on paper. Leave both.

Kaelith's 40 ft teleport is worth far more in play than its numbers suggest —
repositioning past cover and out of melee doesn't fit in a stat line.

Krell is conditional (it needs an enemy to attack you in melee) and it is the
**only reaction in the entire roster**. Being structurally different is worth
more than being numerically equal. If it ever feels weak, raise it to +3d8
rather than adding a second rider.

---

## What the console can actually run today

This matters more than the balance, because most of these describe **effects on
enemies — and the engine has no model of an enemy at all.** It tracks your
character and your familiars. Nothing else exists.

### Works right now, no engine changes

| Species | What runs automatically |
|---|---|
| Kaelith | `acFlat:3`, `speedAdd:20`, `atkAdv:true` — all supported |
| Raxen | `speedAdd:15`, `dmgDice:'2d6'`, `atkAdv:true` |
| Zethari | `accPct:20`, `dmgDice:'2d6'`, `critMin` |
| Brakkar | `dmg:'4d8'` rolls; the damage buff works as `dmgAll` |
| Orrakai | `dmg:'5d6'` rolls; `tempHP:10` works via the `on.tempHP` path |
| Nymari | the `+3 CHA` to yourself works |

### Resolves at the table — finished, not pending

- **Veyari, Nymari, Brakkar, Orrakai** — the enemy-facing parts (frightened,
  −AC, −accuracy, no reactions, knockback, shield-lock). The console is the
  player's sheet; the DM runs the enemy. So the right implementation is the one
  that is now in place: the console computes the save DC from the player's live
  stats, prints it with the failure text, and carries the rest as tags. The
  player reads a finished line to the DM. **Nothing here is waiting on the
  engine.**

### Needs new engine work

- **Raxen** — no concealment system exists.
- **Vorr** — no summoning. *However:* the familiar system already gives a
  creature its own HP, AC, attacks and turn. A husk could be spawned as a
  temporary familiar. That is the cheapest route to a real summon.
- **Krell** — `cost:'Reaction'` displays fine, but nothing distinguishes a
  reaction from an action; it won't stop you using it on your own turn.
- **Eidolon** — no refund mechanism exists. This is the biggest build of the ten.

### Four outright bugs in the snippets

```js
// Brakkar — pct is an object keyed by stat, not a number.
pct:25                    // wrong: silently does nothing
dmgAll:0.25               // right: +25% damage

// Zethari — critMin is the absolute floor, not a delta.
critMin:-2                // wrong: would make every roll a crit
critMin:18                // right: crits on 18–20

// Vorr / Veyari / Nymari — a buff with only tags applies nothing.
act:{buff:{rounds:2,tags:['fear','enemy-ac-2']}}
// The tags show on the sheet as text, which is fine and useful —
// just be aware nothing mechanical happens.

// Orrakai — tempHP belongs in the instant block, not the buff.
act:{dmg:'5d6',dmgType:'sonic',tempHP:10,...}   // correct as written
```

---

## Where this leaves the roster

Adding all ten fills every gap the earlier review identified:

- **CHA primary** — Veyari, Nymari, Orrakai. Was zero, now three
- **Enemy control** — Veyari, Nymari
- **Stealth** — Raxen
- **Teleport** — Kaelith
- **Summoning** — Vorr
- **Information** — Zethari
- **Reaction** — Krell
- **Resource economy** — Eidolon
- **Anti-shield** — Orrakai
- **Offensive STR** — Brakkar

Stat spread afterwards: STR 2, DEX 3, CON 2, INT 4, WIS 3, CHA 3 — even enough,
with INT slightly heavy. If you add an 11th later, make it STR or CON.

**One structural note.** Six of the ten are enemy-facing, where all ten existing
species are self- or ally-facing. That is the right gap to fill, and it changes
what a species *is* in this game — from "what I can do" to "what I can do to
you."

That split maps cleanly onto how the console is meant to work. The player-side
half is automated to the last decimal. The enemy-side half is computed and
*displayed* — the DC worked out from current stats, the dice rolled, the
duration counted down — and handed over as a line the player reads to the DM,
who resolves it. The promise that it calculates everything for you still holds:
everything on the player's side of the table is calculated, and the enemy's side
was never the sheet's job.
