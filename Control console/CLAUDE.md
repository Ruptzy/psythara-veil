# Psythara Operative Console — working notes

One self-contained HTML file: `psythara-operative-console.html` (~26 MB, all
assets inline, runs offline by double-click). Player-side sheet only — the DM
adjudicates enemies, positioning and cover.

## Where a change goes (mirror of the map inside the file, above MY_GRADES)

| change | destination |
|---|---|
| rebalance degradation | `MY_GRADES` — one row per grade; the `MY_*` arrays and the glossary table derive from it |
| new passive field on an item | `gearPassive` (applies it) + `myDescribePassive` (says it) |
| new kind of number in prose | `AUDIT_UNITS` — one line covers every table at once |
| new data table with prose | `AUDIT_SPECS` |
| new structural invariant | `AUDIT_RULES` |
| new glossary term | `GLOSSARY` — the audit guards duplicate keys and aliases |
| new familiar | `FAMILIAR_TEMPLATES` — one row; the picker, card, attacks, specials, recharge and resistances all derive from it |
| familiar levels / a new unlock | the template's `lvl` and `unlocks[]`; `famView()` derives every number from the level — never type a bonus or DC |
| familiar level-up art | `FAM_LEVELUP_ART` (a data URL) |

## Rules that keep it honest

- **The payload is the truth; prose follows.** After any balance pass run
  Settings → Run Consistency Audit. It also runs itself once per boot and
  toasts if a card and the engine disagree.
- **Exception:** when the damage ladder says the payload is the outlier, the
  payload is the bug. Dual Vipers shipped `dmg:'4d8'` per shot against a card
  saying "2d8 each" — 36/turn at ★3 against a ★3 band of 18–22. Check the
  ladder before "correcting" text to match an engine value.

## The rarity ladder

The scale now lives IN the file: `BK_LADDER` (sustained effective damage a
turn, step 1.6x: *2 8.4 · *3 13.5 · *4 21.6 · *5 34.5), `BK_SP_CEIL` (burst
raw-dice ceilings: *2 24 · *3 34 · *4 56 · *5 open) and `weaponEff()` (raw ×
hit-rate ÷ turn cost; auto-hit 1.0, pierce 0.85, save-half 0.75, hit 0.65,
disadvantage ×0.66, jam ×0.95; `BK_TURNCOST` for the Railgun and Gunsol).
The audit rule "the rarity ladder holds" enforces both, and `bkPowerSort()`
reorders the catalog weakest→strongest at load — the book reprints itself
after any rebalance.

A weapon whose value is not damage carries `offScale:'control'` (etc.) naming
why — the GLOO Cannon is the standing example. Burst weapons (≤4 uses a
mission) sit above band on purpose. Familiars: an attack turn is worth ~60%
of the band of its tier (fam levels 1–3 ≈ *2, 4–7 ≈ *3, 8–10 ≈ *4); specials
and support close the rest.

- Panel art scales with `background-size: cover`, never `100% 100%`.
- `MECH` entries contain `sp:[...]` — any parser must count brackets AND braces.
- One physical item grants its passive once (`oncePer` dedupe) and wears once
  per cycle (`myEquipped` dedupe), however many slots reference it.
- Every message goes through `toast()` (session log taps it); every damage
  through `takeDamage()`; every knock through `syncKnocked()`; every temp HP
  grant through `grantTemp()` — which asks for a duration if none is given.
  Temp HP is one pool with one timer (`hp.tempRounds`); it fades at End Round.
- A bound familiar keeps `tpl`; its attacks, specials and traits are read live
  from `FAMILIAR_TEMPLATES`, and its card is generated from that payload.
- Every activatable is on the **cooldown** system: `cdImpact()` computes the
  lockout from the payload (base 2; a buff locks for its own duration;
  control text locks 3; cap 4) — never type a cooldown by hand. Three gates
  cover the game: `wSp`, `useInnate`, `famSpecial`; recharge specials are
  exempt (already dice-gated). State is `c.cds` / `f.cds` (`{r,label}`),
  ticked in `endRound`, cleared by Reset to Rd 1 and cryo.
- Timed things announce their own death: `FX_EXIT` (named lines) /
  `FX_EXIT_KIND` (pools) / generic templates, drained through `expQueue()`
  into the `ALERTS.fxGone` card. A new timed buff with personality gets a
  line in `FX_EXIT`; everything else falls through to the generics.

## Patch-script discipline

Scripts that rewrite the console (or these notes) must **encode before
opening**: `data = s.encode('utf-8'); open(P, 'wb').write(data)`. A failed
encode after `open(P, 'w')` truncates the target to zero bytes — it happened to
the 26 MB console once and to this file once, the same day; git restored both.
Emoji inside a non-raw Python string: use the literal character, never a
`🐾`-style pair — Python turns that into lone surrogates that cannot
be encoded. Bash heredocs also mangle backslashes; write patch scripts with the
Write tool.

## Verification

Headless Chrome probes: scratchpad `runprobe.py <probe.js>` injects a script
that reports via `document.title`. Nineteen suites (probe179–197), ~320
checks, including
sabotage tests that inject drift and assert the audit catches it; a stress
fuzzer (probe189) that hammers every funnel with garbage, fires every special,
buys every node, tries every species x class, and round-trips a save —
checking invariants after every operation (~1,500 checks); and a familiar suite
(probe191) that binds Psyloris and drives every button. The round-trip is the
one that caught `migrateChar` dropping `wear` and `choice` on load. Screenshots
need `--screenshot=<absolute path>` and `transition:none` injected first.
