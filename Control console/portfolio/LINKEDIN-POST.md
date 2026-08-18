# LinkedIn post — ready to paste

*Attach 3–4 screenshots (see SCREENSHOTS.md for which ones and why).*

---

I spent the last while building a character sheet for the tabletop campaign I run,
and it turned into the most interesting UX problem I've had in a while.

The constraint that shaped everything: **the person using this is not paying
attention to it.** They're mid-conversation, it's their turn, four people are
waiting. Every design decision came back to that.

A few things I ended up doing:

**Nothing gets calculated by hand.** Equipping a weapon, injecting a stim,
catching a poison — all of it flows through one modifier pipeline and lands on
the numbers at the top of the sheet. A twin-pistol weapon rolls both attacks and
both damage rolls on one press and reports a single total, because "roll again
for each shot" is exactly the kind of instruction someone misreads at speed.

**Progressive disclosure over completeness.** The maths that produces your
maximum shields is real and worth showing — but only if you ask. It sits behind
a "how is this worked out?" toggle. Choices you make once at character creation
collapse to just the option you took, with a lock you have to deliberately open.

**Teaching without a manual.** 66 rules terms are highlighted inline and
colour-coded by category — ability scores green, damage types orange, defensive
terms blue. Hover for a one-line answer, click for the full explanation. A new
player learns the vocabulary by playing rather than by reading a rulebook first.

**Interruption, used sparingly.** Two things genuinely can't be missed: taking
more than half your health in one hit, and unspent resources going stale. Those
take the screen and require an acknowledgement. Everything else is a toast you
can ignore. Getting that ratio right mattered more than any individual feature.

**The unglamorous half.** Audio from a dozen sources spanned a 24 dB range, so I
measured each clip's loudest 300 ms and solved for per-clip gain through the
actual playback chain — everything now lands within 0.01 dB. Touch targets scale
up on touch devices only. Animation respects prefers-reduced-motion. Typing in a
field no longer throws you to the top of the page, which took working out that
replacing the DOM collapses the document and the browser clamps your scroll.

It's one HTML file. No build step, no dependencies, no network. You double-click
it and it works, on a laptop at a kitchen table with bad wifi — which was the
whole point.

#UX #UIDesign #FrontEnd #DesignSystems #Accessibility #TabletopRPG
