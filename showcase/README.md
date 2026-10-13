# showcase/ — teaser and demo assets, staged for the portfolio

One home for the pieces a later portfolio session picks up: the teasers, and the demo builds they
point at. Only `morphology-monthly/` is linked from `index.html` (since 28 Sept 2026); nothing
else here is linked.

**Protect this folder from the STEP 2 stale-file sweep** — see the carve-out in `../.claude/skill-config/push-build.md`,
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
(outside this repo, because the repo is public on GitHub).

Masters, generator and the other cuts: `OnlyCells\interactive-case\case-202610\working\outputs\
teaser-2026-09-20\`.

### Archived 2026-10-13: `ffw-activity-demo/` and `../portfolio-cut/`
Both were untracked and are no longer in this repo (owner ruling, 2026-10-13). They now sit outside
it, intact, in `FFW Portfolio\_archive\ffw-activity-demo-2026-10-13\` and
`FFW Portfolio\_archive\portfolio-cut-2026-10-13\`: the latinised activity cut, its build tools,
review pack and teaser cuts 6 and 7. The approved teaser is unaffected: it is published from
`ffw-teaser/`, which is tracked. To rebuild the cut, move `portfolio-cut-2026-10-13` back to the
repo root as `portfolio-cut/` and read its `STATUS.md`.
