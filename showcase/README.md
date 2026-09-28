# showcase/ — teaser and demo assets, staged for the portfolio

One home for the pieces a later portfolio session picks up: the teasers, and the demo builds they
point at. Only `morphology-monthly/` is linked from `index.html` (since 28 Sept 2026); nothing
else here is linked.

**Protect this folder from the STEP 2 stale-file sweep** — see the carve-out in `../CLAUDE.md`,
the same treatment `cv/`, `statements/` and `portfolio-cut/` get. A bare `.html` at the repo root
would be swept; a carved-out folder is not.

## What is here

### `morphology-monthly/` — Only Cells, Morphology Monthly
The interactive blood-film CPD case. **Hand-authored, tracked in git, moved here from
`patterns/morphology-monthly/` on 2026-09-22.**

| file | what |
|---|---|
| `morphology-monthly.html` | the showcase page — teaser, what it is, what was built, a link to `onlycells.co.uk/cases`. Linked from the Only Cells Work card ("Watch the teaser") since 28 Sept 2026 |
| `morphology-monthly-teaser.webm` | 720 square web cut, VP9 + Opus, 2.9 MB — listed first, so browsers that play WebM take it |
| `morphology-monthly-teaser.mp4` | the same cut, H.264 + AAC, 2.9 MB, faststart — the fallback |
| `morphology-monthly-teaser-poster.webp` | the collab card (frame at 2.8 s, once it has settled), 1080 square, q80 — the video's `poster` |
| `morphology-monthly-teaser-poster.jpg` | the same frame, q82 progressive — kept for anywhere that needs a JPEG |

Source for both cuts: the **square Audio C** master (music plus sound effects), 28 Sept 2026,
`…\audio-options-2026-09-20\morphology-monthly-teaser-square-1080-Audio-C.mp4`. The 960 cut it
replaced carried the sound effects only. The poster is 1080 rather than twice the 620 px box
because the master is 1080.

The grid thumbnail stays at `../assets/thumbs/morphology-monthly.jpg`, where every other work-grid
thumbnail lives — it is a grid asset, not a teaser asset, and the entry that will use it has not
been added yet.

**No playable demo, on purpose.** The cases, their clinical content and the films belong to
Only Cells and are published on *their* site; this page shows the work, it does not host it.
Snippets come from **published cases only** — never an unpublished case or the prototype. The
permission record is in the owner's private register, `FFW Portfolio\showcase-register.md`
(outside this repo, because this file is public on Pages).

Masters, generator and the other cuts: `OnlyCells\interactive-case\case-202610\working\outputs\
teaser-2026-09-20\`.

### `ffw-activity-demo/` — the de-branded activity cut
From `../portfolio-cut/`, a latinised client activity cut. **COPIES, and untracked.**

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
