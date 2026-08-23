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

## Rules that keep it honest

- **The payload is the truth; prose follows.** After any balance pass run
  Settings → Run Consistency Audit. It also runs itself once per boot and
  toasts if a card and the engine disagree.
- **Exception:** when the damage ladder says the payload is the outlier, the
  payload is the bug. Dual Vipers shipped `dmg:'4d8'` per shot against a card
  saying "2d8 each" — 36/turn at ★3 against a ★3 band of 18–22. Check the
  ladder before "correcting" text to match an engine value.
- Panel art scales with `background-size: cover`, never `100% 100%`.
- `MECH` entries contain `sp:[...]` — any parser must count brackets AND braces.
- One physical item grants its passive once (`oncePer` dedupe) and wears once
  per cycle (`myEquipped` dedupe), however many slots reference it.
- Every message goes through `toast()` (session log taps it); every damage
  through `takeDamage()`; every knock through `syncKnocked()`.

## Verification

Headless Chrome probes: scratchpad `runprobe.py <probe.js>` injects a script
that reports via `document.title`. Nine suites, 156 checks, including sabotage
tests that inject drift and assert the audit catches it. Screenshots need
`--screenshot=<absolute path>` and `transition:none` injected first.
