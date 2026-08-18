# FIELDLINK Combat Terminal

A character sheet and combat tracker for a tabletop RPG, built as a single HTML
file. No build step, no dependencies, no network — you double-click it and it
runs.

This repository holds a **demo build**. The interface, design system and rules
engine are complete; the campaign's own item names and artwork have been replaced
with neutral placeholders.

---

## The problem

The person using this is not paying attention to it.

They are mid-conversation, it is their turn, and four people are waiting. That
single constraint drove every decision below.

## What that led to

### Nothing is calculated by hand

Species bonuses, equipped gear, injected stims, slotted implants, conditions,
poison and injury all feed one modifier pipeline:

```
effective = floor((base + Σflat) × (1 + Σpercent)) − disease − injury
```

The numbers at the top of the sheet are always the ones you actually use. A
two-shot weapon rolls both attack rolls and both damage rolls on a single press
and reports one total — "roll again for each shot" is exactly the kind of
instruction someone misreads at speed.

### Progressive disclosure over completeness

The arithmetic behind your maximum shields is real and worth showing, but only on
request — it sits behind a *"how is this worked out?"* toggle. Choices made once
at character creation collapse to the option you took, behind a lock you have to
deliberately open.

### Teaching without a manual

66 rules terms are highlighted inline and colour-coded by category — ability
scores green, damage types orange, defensive terms blue. Hovering gives a
one-line answer; clicking opens the full entry. New players learn the vocabulary
by playing rather than by reading first.

### Interruption, rationed

Two events genuinely cannot be missed: taking more than half your combined
shields and health in one hit, and unspent resources going stale. Those take the
screen and require an acknowledgement. Everything else is a dismissible toast.
Getting that ratio right mattered more than any individual feature.

### The unglamorous half

- **Audio levelling.** Clips from a dozen sources spanned 24 dB. Each one's
  loudest 300 ms window was measured and a per-clip gain solved *through the real
  playback chain* (gain → limiter). Everything now lands within 0.01 dB of −14.
- **Touch targets** scale to 38–40 px on `pointer: coarse` only, so a mouse keeps
  the compact layout.
- **`prefers-reduced-motion`** stops the animated vitals trace.
- **Scroll preservation.** Replacing the sheet's DOM collapses the document, and
  the browser clamps scroll to zero — so typing threw you to the top of the page
  mid-word. Position is captured before the swap and restored after, with focus
  restored using `preventScroll`.
- **Storage** is IndexedDB with a localStorage fallback, and asks the browser to
  mark it persistent so a phone under pressure doesn't evict a character.

## Stack

Plain HTML, CSS and JavaScript. No framework. ~6,400 lines of JS and 81 KB of CSS,
with assets inlined as data URIs so the file stays self-contained.

| | |
|---|---|
| Rules terms in the glossary | 66 |
| Catalog items | 68 |
| Distinct sound events | 32 |
| Dependencies | 0 |

## Running it

Download `psythara-console.html` and open it in any modern browser. Everything is
stored locally on your machine.
