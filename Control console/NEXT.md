# Next steps — Psythara Operative Console

State as of 2026-08-23: 192 probes across twelve suites green, consistency
audit clean at 359 claims, stress fuzzer clean, all pushed to `main`.
Everything below builds on guardrails that now exist: the audit, the ladder
check, the save round-trip, and the routing map in CLAUDE.md.

## 1. More weapons  (your first ask)

The 20 proposed weapons from the damage analysis were scoped but never built.
The guardrails make this safe now — a new `MECH` entry is audited the moment
it exists, and a mythic needs a `MY_FAULTS` entry or the audit flags it.

Per-turn damage bands the ladder settled on (average, all shots):

| rarity | band | anchors |
|---|---|---|
| ★2 | 7–11 | GLOO Cannon 7, Pulse Rifle 11 |
| ★3 | 18–22 | Dual Vipers 18, Boom Shield 18, Plasma Gauntlets 22 |
| ★4 | 27–28 | Superdragon 27, Farsight 28 |
| ★5 | 33–85 | Scythe 33 … Railgun 85 (mythics pay in wear) |

Steps, per weapon:
1. `MECH` entry — `dmg` is **per shot**; `shots` multiplies it (the Dual Vipers lesson).
2. `BOOK` page with a plate (or none — it typesets like the reference pages).
3. Add to `WEAPON_IDS`; mythics also get `MY_FAULTS` (4 faults) and `rar:5`.
4. Settings → Run Consistency Audit. The card text must match the payload.

Worth deciding first: do any of the 20 want a **non-linear rank ladder**
(e.g. +15% / +25%)? `per` is linear only. That is an engine feature, not a
prose fix — say so and I will build it before the weapons that need it.

## 2. Finish the rule book  (your second ask)

Text is in better shape than art. 28 sections exist in `MN_SECS`; the
catalog's reference spread (pages 5–6) is typeset with PLATE TO FOLLOW.

Art that is stale or missing, for the ChatGPT side:
- **Page 04** plate still reads "Unsanctioned +0" — the role is Unarmored.
- **Page 05** plate bakes the old armour ladder and predates AC scaling and
  the cover rework (half +1, three-quarters +3, DM adjudicates).
- **Pages 7–22** have no plates.
- **Catalog pages 5–6** (How To Read An Entry; Condition & Degradation).

I can export the current rules text for any page on request so the art is
drawn against the live numbers, not remembered ones. Text-side work left:
a read-through of the 28 sections against the engine — the audit covers
cards, not manual prose, so this one is by eye.

## 3. Familiars  (your third ask)

What exists: a familiar has its own sheet — HP, scores, conditions,
abilities — runs on the same engine, and can be handed your stims.

What "add familiars" could mean; pick the ones you want:
- **More familiar types** — a roster of templates (drone, beast, construct,
  bound spirit) with their own ability sets and growth.
- **Familiar progression** — levels or a small tree, tied to yours.
- **Familiar temp HP** — `grantTemp()` is wired for characters only;
  familiars still add temp HP untimed. Small, worth doing first.
- **Familiar equipment** — slots, or a single mod socket.
- **Audit coverage** — familiar abilities are not an `AUDIT_SPECS` entry
  yet. One line once their shape settles.

## 4. Small things already known

- **Atlas stim** description was reported "incomplete" — needs the player
  to point at where it cut off.
- **61 unmatched audit descriptions** — prose-only mechanics ("ignores all
  resistances", "redirect attacks to you"). Each closes with one
  `AUDIT_UNITS` line when it starts to matter; they are listed on the report.
- **Dual Vipers** now pays 2d8 × 2 = 18/turn (was 36). If the pistols feel
  flat in play, that is the place to look — but the ladder says 18 is right.

## 5. Yours

- The **DM party board** — you said you would build it.

## Habits that keep it clean

- After any balance pass: Settings → Run Consistency Audit (it also runs at
  boot and toasts if a card and the engine disagree).
- One fact, one place: CLAUDE.md has the routing table.
- When a card and the engine disagree, the payload is the truth — **unless
  the ladder says the payload is the outlier.** Check the ladder first.
