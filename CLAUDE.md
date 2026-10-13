# Forged Frameworks Portfolio — Claude Code Working Instructions

This file is read automatically by Claude Code every session.
Deploys go through **/push-build**. Its config is in `.claude/skill-config/push-build.md`; the manual push
workflow (STEP 1–7) and the gotchas table are in `.claude/notes/push-workflow.md`.
Follow every step of that workflow on **every push**, no exceptions.

---

## Wiring  <!-- read before moving or renaming anything -->
- **Repo / branch:** github.com/DanForgedFrameworks/Portfolio · main  (full facts in *Repo facts* below)
- **Role:** The Forged Frameworks portfolio site — a two-page site (`index.html` main site + `accreditation-quality.html`) plus the standalone `cv/`, on GitHub Pages. The "Choose your path" gateway was retired in Sept 2026.
- **Skills here:** /push-build — deploys a versioned `github-deploy` bundle (reads `.claude/skill-config/push-build.md`).  ·  /adaptable-cv — regenerates the standalone `cv/` launcher (reads its deploy facts from the same file).  ·  /portfolio-showcase — places exhibits under `showcase/`.
- **Load-bearing** (never move/rename without updating the skill via /skill-evolve):
  - `.claude/skill-config/push-build.md` — the *Deploy config*, moved out of this file on 2026-10-13: parsed by /push-build, read by /adaptable-cv and /portfolio-showcase (keep filenames lowercase)
  - `.claude/notes/push-workflow.md` — the manual STEP 1–7; /portfolio-showcase runs its STEP 4 checks
  - `cv/` — owned by /adaptable-cv; **never** `git rm` it (push-build excludes it from stale-file cleanup)
  - `.github/workflows/pages.yml` + `.github/publish-site.sh` — the Pages deploy (since 28 Sept 2026).
    The script decides what is published: every top-level file or folder must be on its PUBLISH or
    SKIP list, or the deploy **fails on purpose** and the live site stays as it was. A new top-level
    page or folder needs adding to PUBLISH in the same commit. `.md`, `.txt`, `.py` and `.yml` files
    are never published, anywhere in the tree.
  - `.claude/` is on the deploy script's SKIP list, so the config and notes above are never
    published (the repo is public, so they are still readable on github.com).
- **Free** (safe to split / move / tidy): this file's prose workflow notes.
- **Publishes to:** GitHub Pages — https://danforgedframeworks.github.io/Portfolio/

---

## Repo facts

| Item | Value |
|---|---|
| Repo | `DanForgedFrameworks/Portfolio` |
| Branch | `main` |
| Repo root | This folder (the `.git` directory lives here) |
| Live URL | `https://danforgedframeworks.github.io/Portfolio/` |
| Pages config | Source: **GitHub Actions** (`.github/workflows/pages.yml`, on every push to `main`) since 28 Sept 2026; was deploy-from-branch. The repo stays **public**, so internal files are off the website but still readable on github.com |

---

## Skill config files  <!-- load-bearing: skill -> config file map -->

Each skill keeps its config in its own file under `.claude/skill-config/`, not in this file.
Moved here on 2026-10-13 (owner ruling, 2026-10-11), the same method as Codex.

- The file holds the old block **verbatim**, heading included, under a load-bearing marker.
- **Edit the file. Never add a `## Deploy config` block back here.**
- A newly linked page or exhibit gets its Extra QA grep **in that file**, in the same commit.

| skill | config file |
|---|---|
| /push-build | `.claude/skill-config/push-build.md` |
| /adaptable-cv | reads the deploy facts and the `cv/` rules from `.claude/skill-config/push-build.md` |
| /portfolio-showcase | adds its Extra QA greps to `.claude/skill-config/push-build.md` |

---

## File case rule

GitHub Pages on Linux is **case-sensitive**. Always use lowercase filenames:
- ✅ `accreditation-quality.html`
- ✅ `learning-design.html`
- ❌ `Accreditation-Quality.html` (will 404 on live site)

---

## What NOT to do

- Never commit a `github-deploy/` subfolder — files go at the repo root
- Never delete or modify `.git/`
- Never `git push --force` to `main` unless explicitly asked
- Never skip the QA checks (Step 4) even if "nothing seems to have changed"
- Never assume the v2.x folder and the deployed repo are in sync — always diff
- Never `git rm` or overwrite the `cv/` standalone page during a main-site deploy — it lives independently (see *Standalone pages* in `.claude/skill-config/push-build.md`)


---

## Layout rules added by the 16 Sept 2026 review (keep these if the pages are rebuilt)

- **Card groups use `.cards--3` (three per row) or `.cards--quotes` (three per row, then two).**
  Both are six-track grids so a short last row stretches to fill: never `.cards--240/260/280/300`
  for a group that would otherwise end on an empty slot. Used by the work cards, habits, asides,
  Credentials and Standards cards, and the accreditation recommendations (10 cards = 3+3+2+2).
- **The two-row header runs up to 1100px**, not 760px — below that the one-line header does not fit
  and the buttons hang off the right. `section[id]` scroll-margin follows the same breakpoint.
- **The lead case's stat tiles sit in `.lead-case__statwrap`** (a container-query wrapper): under
  480px of column width they stack, because "Pre/post" at 30px is wider than a third of the row.
- **The forge line's `::before` stops at node 07** via `--fl-gap`; change the gap in both places.
- **Photos ship at twice their CSS box, as WebP plus a JPEG fallback** (added 16 Sept 2026 after a
  reader reported slow loading: the portrait was 3.7 MB and the UKAS photo 9.9 MB at camera size).
  Portrait box is 440x550 so the file is 825x1100; UKAS box is 360x450 so 1350x900; the video
  poster tile is 320x200 so 711x400. Save JPEG quality 82 progressive and WebP quality 80, wrap in
  `<picture><source type="image/webp" srcset="…webp"><img src="…jpg"></picture>`. `forge.css` sets
  `picture { display: contents }` and hides its `source`, so the img stays the grid item and the
  About and role grids do not gain a column. Do not add `width`/`height` to these imgs: the CSS
  `aspect-ratio` already reserves the space, and the attributes override the crop.

## Design-first order (16 Sept 2026, owner decision; keep if the page is rebuilt)

The main page leads with the craft and follows with the tool. Section order: Hero > Problem > About >
Asides > Range > Numbers > Case studies > Catalyst stages > Artefacts > Sectors > Ethos > Testimonials
> Working together > Contact. The hero lead opens in the first person and names the owner: Forged
Frameworks is one person and the tools he built, said in the first screen rather than 64% down. Nav order matches: Work first, Catalyst second.

- **The hero's right column is the `.design-panel`** (five method lines drawn from the learning-aide
  engine: feedback that teaches, formats chosen by the content, nothing hidden behind a click, chunked
  and signposted, consistent across a module). It is not the terminal any more.
- **The terminal (`.forge`: tracker, `#termLog`, caption, `#forgeScript`) lives in the Catalyst
  section's `.sticky-col`**, beside the five stage cards. `forge.js` adds `.is-forging` to the stage
  card matching the replay's current stage (`CARD_FOR_STAGE`), so the replay demonstrates the stages.
- **The Problem band states the learning-design problem** (dated content, feedback that marks without
  teaching, one format throughout) and closes on both answers, the method and Catalyst. It is not a
  Catalyst pitch on its own.
- **The Numbers strip carries four learning-design figures** (15+ kinds of block, 50+ live interactive
  pieces, 12 hours to produce 3 hours of content where it used to take 24, ~40% SME time saved). The
  laboratory figures live on the accreditation hero only. **~40% is the reconciled SME-time figure**
  (owner, 16 Sept 2026): the site said ~30% and the CV said ~60%; both now read ~40%, and the
  adaptable-cv skill's a11y_pass keeps the CV at ~40% through a rebuild.
- **Count-ups and sticky tiles:** `forge.js` counts every plain-number stat (`.num__n`,
  `.lead-case__stat b`, `.mini-stats b`) from 0 on first view, motion permitting; the lead cases'
  stat tiles are `position: sticky` above 760px. Both are motion, so both obey the Motion switch.
- **Three lead cases in Work** (since 28 Sept 2026; Only Cells Morphology Monthly comes first, with its
  teaser video in place of stat tiles), then the Asbestos ITM (a build from new) and the anonymised review-and-uplift
  case (audit and rebuild, L3 NVQ to L6 HE, with the anonymised medical-education static-to-interactive
  sub-case). Its tiles carry 100%, 40+ modules and 1,500+ hours; the Numbers strip carries none of them.
  **Hours come from the owner's capacity tracker** (column *Hours Logged*; its location and the
  per-client breakdown are in the private register, `FFW Portfolio\showcase-register.md`).
  Re-read the sheet before changing a figure; do not estimate.
  **Client names, drug names and live embed links for the medical-education work stay out** until
  Touch Medical gives written permission; the sub-case is deliberately generic.
  **Correction 28 Sept 2026 (owner):** permission to name touchMEDICAL has been **requested, not given**;
  the reply is still awaited (record in the private register, `FFW Portfolio\showcase-register.md`).
  Do not name touchMEDICAL anywhere until it arrives. The testimonial caption was changed the same day
  (owner) to "Head of Project Management, medical communications agency"; put the name back only
  once the written reply is in the register. Any new
  showcase asset goes to Touch for review before it is published here. Drug names, sponsor branding, client copy and live embed
  links still stay out: exhibits are latinised (client copy swapped for placeholder Latin, logos removed,
  portfolio palette) and ship as stills and clips, never as the client's source files.

## Motion maintenance (rewritten for the Sept 2026 two-page site)

`forge.js` owns all motion on both pages: the `#matrix` rain, the Catalyst terminal replay (index only, in the Catalyst section),
scroll reveals, stage/role highlighting and the silver-rain page transitions. It runs only while
motion is allowed — `prefers-reduced-motion` is not set **and** the Motion switch is on.

Rules that are easy to break:

1. **The page must be complete without `forge.js`.** Every section is visible in the markup and the
   terminal ships as a finished run. The script hides below-the-fold content only at start-up, and
   restores it the moment motion is switched off. Never hide content in CSS.
2. **Heading words are `<span class="w" aria-hidden="true">` with the full sentence in the heading's
   `aria-label`.** No whitespace between the spans; the gap comes from `margin-right`.
3. **Terminal copy lives in the `#forgeScript` JSON block** in `index.html`, and the static finished
   run above it must match its last 14 lines.

Each page has **two** Motion buttons, one in the header nav and one in the footer, and both must carry
`data-bg-toggle` (a visible pause control near the moving content, not only at the foot of a long page):

```bash
grep -c "data-bg-toggle" index.html accreditation-quality.html   # 2 2
```

The label is set by `FFBackground.paint()` in `transition.js`, **not** by the page. It reads
"◍ Motion: on/off". The `localStorage` key is still `ff-bg-off` and the root class still
`.ff-bg-off` — do not rename either, it would reset every visitor's saved preference.

The WebM/MP4 animations, walkthrough videos and Codex previews from the old `learning-design.html`
are still in `assets/` and `patterns/`; the new pages do not embed them.
