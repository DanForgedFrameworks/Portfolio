# showcase/ — teaser and demo assets, staged for the portfolio

One home for the pieces a later portfolio session picks up: the teasers, and the demo builds they
point at. Nothing here is linked from `index.html` yet, so none of it changes the live site.

**Protect this folder from the STEP 2 stale-file sweep** — see the carve-out in `../CLAUDE.md`,
the same treatment `cv/`, `statements/` and `portfolio-cut/` get. A bare `.html` at the repo root
would be swept; a carved-out folder is not.

## What is here

### `morphology-monthly/` — Only Cells, Morphology Monthly
The interactive blood-film CPD case. **Hand-authored, tracked in git, moved here from
`patterns/morphology-monthly/` on 2026-09-22.**

| file | what |
|---|---|
| `morphology-monthly.html` | the showcase page — teaser, what it is, what was built, a link to `onlycells.co.uk/cases` |
| `morphology-monthly-teaser.mp4` | 960 square web cut of the 20 Sept teaser, 2.8 MB |
| `morphology-monthly-teaser-poster.jpg` | the collab card, used as the video poster |

The grid thumbnail stays at `../assets/thumbs/morphology-monthly.jpg`, where every other work-grid
thumbnail lives — it is a grid asset, not a teaser asset, and the entry that will use it has not
been added yet.

**No playable demo, on purpose.** The cases and their clinical content belong to Only Cells
(collaboration agreement §3) and the films are patient material cleared for publication on *their*
site (§6). §5 already covers showing the work, which is what this page does. A playable copy was
asked for in the 20 Sept email to Anas and waits on his answer.

Masters, generator and the other cuts: `OnlyCells\interactive-case\case-202610\working\outputs\
teaser-2026-09-20\`.

### `ffw-activity-demo/` — the de-branded activity cut
From `../portfolio-cut/`, the TINT 8787-2 showcase cut. **COPIES, and untracked.**

| file | copied from |
|---|---|
| `ffw-showcase-teaser-square-1080.mp4` | `portfolio-cut/teaser/_make/` |
| `ffw-showcase-teaser-portrait-1080.mp4` | `portfolio-cut/teaser/_make/` |
| `demo/` | `portfolio-cut/build/master/` — 17 files |

**Copied rather than moved, deliberately.** `portfolio-cut/build/` is regenerated from scratch by
`tools/latinise.py`, so anything moved out of it would be recreated on the next run and anything
hand-edited inside it vanishes; the teasers sit beside their own generator in `teaser/_make/`.
Taking copies leaves that pipeline able to run again untouched. If the cut is rebuilt, refresh
these copies rather than editing them here.

**Left untracked**, matching how `portfolio-cut/` itself is kept — that work is not tracked in git
and whether a client-derived cut gets published is not this folder's call to make.
