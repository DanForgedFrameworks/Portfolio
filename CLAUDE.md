# Forged Frameworks Portfolio — Claude Code Working Instructions

This file is read automatically by Claude Code every session.
Follow every step below on **every push**, no exceptions.

---

## Wiring  <!-- read before moving or renaming anything -->
- **Repo / branch:** github.com/DanForgedFrameworks/Portfolio · main  (full facts in *Repo facts* below)
- **Role:** The Forged Frameworks portfolio site — a two-page site (`index.html` main site + `accreditation-quality.html`) plus the standalone `cv/`, on GitHub Pages. The "Choose your path" gateway was retired in Sept 2026.
- **Skills here:** /push-build — deploys a versioned `github-deploy` bundle (parses *Deploy config* below).  ·  /adaptable-cv — regenerates the standalone `cv/` launcher.
- **Load-bearing** (never move/rename without updating the skill via /skill-evolve):
  - the `## Deploy config` block below — parsed by /push-build (keep filenames lowercase)
  - `cv/` — owned by /adaptable-cv; **never** `git rm` it (push-build excludes it from stale-file cleanup)
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
| Pages config | Deploy from branch · `main` · `/ (root)` |

---

## Deploy config
<!-- Read by the /push-build skill. Keep filenames lowercase. -->

- **Repo:** `DanForgedFrameworks/Portfolio`
- **Branch:** `main`
- **Repo root:** `C:\Users\celt_\OneDrive\VLE e-Learning Documents\FFW Portfolio\Forged Frameworks Portfolio\github-deploy`
- **Bundle source pattern:** a sibling `Forged Frameworks Portfolio <version>\github-deploy` folder
- **Live URL base:** `https://danforgedframeworks.github.io/Portfolio/`
- **Entry page:** `index.html` (the main site: hero with the design panel, the learning-design problem, range, work, Catalyst with the terminal, about, engagement, contact)

- **Core pages** (must exist at root after deploy):
  - `index.html`
  - `accreditation-quality.html`
  - `learning-design.html` (redirect stub to `index.html#work`, kept so old links survive)
  - `404.html`

- **Entry-page navigation targets** (linked from `index.html` with the silver-rain transition in `forge.js`; each must exist):
  - `accreditation-quality.html`
  - `cv/index.html`

- **Known retired / stale filenames** (must NOT appear in deployed *.html / *.js, and must be `git rm`'d if present in the repo):
  - `gateway.html`
  - `Accreditation-Quality.html` (retired in favour of lowercase `accreditation-quality.html`)
  - `Accreditation-Quality v2.html`
  - `Forged Frameworks Portfolio.html`, `Forged Frameworks Portfolio v2.html`
  - `tweaks-app.jsx`, `tweaks-panel.jsx`

- **Extra QA checks** (mirror anything the bundle's handover doc specifies):
  - Both pages stamp cache-busters: confirm `forge.css?v=NNN`, `forge.js?v=NNN`, `transition.js?v=NNN`
    and `assets/colors_and_type.css?v=NNN` were bumped together in `index.html` and `accreditation-quality.html`
  - `transition.js` present at root (its `FFBackground` owns the Motion switch; `FFTransition` is no longer used)
  - `forge.css` and `forge.js` present at root (shared by both pages). `site.css` and `app.js` are no longer
    loaded by either page; they are kept only until the old layout is confirmed unwanted.
  - **Support link survived the copy** — both pages must count `1`, and `forge.css` must still carry the rule:
    ```bash
    grep -c "buymeacoffee.com" index.html accreditation-quality.html
    grep -q "ff-support__link" forge.css && echo "forge.css OK" || echo "forge.css MISSING"
    ```
    The Buy Me a Coffee link sits in each page's footer `.footer__links`, before the Motion button.
    It is not in the Sept 2026 design handoff, so a rebuild from that handoff will silently drop it.
    If any count returns `0`, re-add it before pushing.

- **Standalone pages** (NOT part of the versioned bundle — preserve on every deploy, **never `git rm`**):
  - `cv/` — self-contained "Adaptable CV" launcher (a single, fully inlined `index.html`; no external assets). Served at `https://danforgedframeworks.github.io/Portfolio/cv/`. Linked from the gateway via the CV footnote nudge. **Exclude `cv/` from the STEP 2 stale-file diff and never remove it**, even though it will never appear in a versioned `github-deploy` bundle.
    > ⚠️ **Contrast maintenance (added 13 Sept 2026):** the CV inlines its own copy of the design
    > tokens plus ~7 inline `color:` declarations that used the old muted grey `#7f8c8d` (3.36:1 on
    > paper — fails WCAG AA for body text). All 10 occurrences are now `#5f6e6f` (5.15:1, same hue).
    > **A regenerate will bring `#7f8c8d` back**, so after every `/adaptable-cv` build run:
    > ```bash
    > grep -c "#7f8c8d" cv/index.html   # must return 0
    > ```
    > If it returns anything else, replace every `#7f8c8d` with `#5f6e6f` in `cv/index.html` and
    > fold the same change into the skill's source assets so the next build ships it.
    > **Accessibility pass (added 15 Sept 2026):** `/adaptable-cv` now runs `scripts/a11y_pass.py` on every build:
    > the CV's accent (small text, chips, active preset button) defaults to `#a05b32` (5.2:1) instead of `#bc6c3c`
    > (3.93:1), and the role hint uses `#5f6e6f`. After any CV build: `grep -c "P.accent || '#a05b32'" cv/index.html`
    > must return `1`. The back-link script also sets the page title, `lang="en-GB"` and a level-1 heading on the name,
    > and on screens 600px and narrower places the back button on its own line above the name.
    > The CV's small inline type (9.5px, 10.5px and 11px on stats, dates and education lines) was
    > reviewed and closed by the owner on 15 Sept 2026: left as designed, not an outstanding item.

    > ⚠️ **Back-link maintenance:** `cv/index.html` carries a `#ff-back-to-portal` button — the top-right **"← Want to see my full portfolio?"** link + fade-in, injected by a `<head>` window-timer `<script>` placed *before* `<noscript>` (window timers survive the bundle's `documentElement.replaceWith`, so the button lands in the new body after unpack). On click it sets `sessionStorage('ff-to-gateway','1')` and navigates to `../index.html`. Since the Sept 2026 rebuild nothing reads that flag (the gateway entry-rain is retired), so it is harmless; the link simply returns to the main site. **The `adaptable-cv` skill re-injects this automatically during every build (`assets/back-link.html` → before `<noscript>`) and strips it from the generated PDFs, so a normal skill deploy already includes it — no separate re-commit needed.** If `cv/index.html` is ever regenerated by some *other* process, the block must be re-added. Verify after every CV update: open `cv/index.html` and confirm the "← Want to see my full portfolio?" button appears top-right once the CV renders.

  - `statements/` — the public compliance statements. Self-contained single-file pages (all CSS inlined; the only externals are Google Fonts and `../assets/`). Served at:
    - `statements/accessibility-and-inclusion.html` — **FF-AC-01** Accessibility and Inclusion Statement
    - `statements/environmental-statement.html` — **FF-ES-01** Environmental Statement

    Authored outside the versioned bundle, so **exclude `statements/` from the STEP 2 stale-file diff and never `git rm` it** — the same treatment as `cv/`. Left unprotected at the repo root these would have matched STEP 2's "any `*.html` at root not in the v-manifest" rule and been swept on the next deploy; the folder is what keeps them out of that sweep.

    > ⚠️ **Controlled documents — version before you edit.** Each statement carries a reference, version, issue date and next-review date in its `.control` block, and repeats the reference and version in the footer `.sig`. Both say in their own *Review* section that superseded versions remain traceable in repository history. So **never quietly rewrite one in place** — bump the version and issue date in *both* the `.control` block and the footer `.sig` together, and let git history carry the previous wording. Editing the text while leaving the old version and date in place breaks a claim the document makes about itself. Current issue for both: **v1.1 · Issued 15 September 2026** (email corrected to `dan.boyland@`, sentence-case labels).
    > On 16 Sept 2026 both pages were restyled to match the site (Atkinson Hyperlegible + JetBrains Mono
    > instead of Inter + IBM Plex Mono, navy ink on site paper, copper links, a "← Back to the portfolio"
    > link in the brandline, "Check this by" answers in body type, 12px labels). **Styling only — not a
    > word of statement text changed, so the version and dates stayed at v1.1.** Restyling is not a
    > version event; rewording is. Next review for both: **Aug 2027**. The Word originals live in the owner's Google Drive business folder; a new version there is uploaded alongside the old one, not over it.

---

## Standard push workflow — follow every step in order

### STEP 1 — Locate the source bundle

- The user will provide a folder path, e.g. `Forged Frameworks Portfolio v2.5`.
- Look for a `github-deploy/` subfolder inside it — that is the deployable bundle.
- If there is a `HANDOVER-FOR-CLAUDE-CODE.md`, `DEPLOY-HANDOVER.md`, or similar file
  at the bundle root or project root, **read it in full before doing anything else**.
  It will list exactly what changed and what verification checks to run.

---

### STEP 2 — Identify stale files to remove

Before copying new files, diff the incoming bundle against the current repo root:

```bash
diff -rq --exclude=".git" --exclude="cv" "<source>/github-deploy" "<repo-root>"
```

Files present in the repo but **absent from the incoming bundle** are stale and must be
removed with `git rm` before the copy step. Common culprits across versions:

- `Accreditation-Quality v2.html`
- `Forged Frameworks Portfolio.html` / `Forged Frameworks Portfolio v2.html`
- `gateway.html`
- `tweaks-app.jsx` / `tweaks-panel.jsx`
- Any `*.html` at root not in the v-manifest

**Never delete or modify the `.git` directory.** Likewise, **never `git rm` the `cv/` folder** — it's a standalone page (see Deploy config → *Standalone pages*), not part of the versioned bundle, so it will always look "absent from the incoming bundle."

---

### STEP 3 — Copy the full bundle

Use robocopy to overwrite everything, excluding `.git`:

```powershell
robocopy "<source>\github-deploy" "<repo-root>" /E /XD ".git" /NFL /NDL
```

Then check `git diff --stat` to see what actually changed. If nothing changed, check
file sizes and content — do not assume it is already deployed without confirming.

---

### STEP 4 — QA verification checks (run every time)

Run all of the following. **Stop and report to the user if any check fails.**

#### 4a — No stale internal references
```bash
grep -rn "gateway\.html" *.html *.js 2>/dev/null | grep -v "README\|HANDOVER\|DEPLOY\|CLAUDE"
grep -rn "Accreditation-Quality v2" *.html *.js 2>/dev/null | grep -v "README\|HANDOVER\|DEPLOY\|CLAUDE"
```
Both must return **no matches** in deployed pages.

#### 4b — Main site links to its targets
```bash
grep -c "accreditation-quality\.html" index.html
grep -c "cv/index\.html" index.html
```
Both counts must be at least `1`.

#### 4c — Core pages exist at root
```bash
ls index.html accreditation-quality.html learning-design.html 404.html forge.css forge.js transition.js
```

#### 4d — `.nojekyll` is present (required for GitHub Pages)
```bash
ls -la .nojekyll
```
If missing, create it: `touch .nojekyll`

#### 4e — Run any additional checks from the handover doc
If a handover doc specifies grep strings, cache-buster versions, or file existence
checks, run those too and confirm each passes.

---

### STEP 5 — Stage and show status

```bash
git add -A
git add .nojekyll   # explicit — dotfiles can be missed
git status
```

Show the full `git status` output so the user can see exactly what will change
before committing.

---

### STEP 6 — Commit and push

```bash
git commit -m "Deploy vX.X — <one-line description of what changed>"
git push
```

Use the version number from the bundle folder or handover doc in the commit message.

---

### STEP 7 — Post-push confirmation

After a successful push, always report:

1. Exact files changed/added/deleted (from the commit output)
2. Remind the user to verify these URLs **in an incognito tab**:
   - `https://danforgedframeworks.github.io/Portfolio/`
   - `https://danforgedframeworks.github.io/Portfolio/accreditation-quality.html`
   - `https://danforgedframeworks.github.io/Portfolio/learning-design.html` (should land on the main site's work section)
3. Note: GitHub Pages takes ~1 minute to rebuild after a push.

---

## Known gotchas — check these if something looks wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| `git status` shows "nothing to commit" but user expects changes | Files are byte-for-byte identical to last deploy | Run robocopy anyway; if still nothing, the version was already deployed — confirm on the live URL in incognito |
| 404 on `learning-design.html` or `accreditation-quality.html` | Files not at repo root (stuck inside `github-deploy/` subfolder, or wrong case) | Confirm files exist at root with `ls *.html` |
| Old content showing after push | Browser cache | Open incognito / clear cache. Cache-buster `?v=XXX` stamps on CSS/JS force asset refresh |
| OneDrive file lock during commit | OneDrive syncing `.git` folder | Quit OneDrive sync temporarily, retry commit |
| `git push` rejected (non-fast-forward) | Remote has diverged | Use `git push --force` only after confirming the remote only has placeholder content |

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
- Never `git rm` or overwrite the `cv/` standalone page during a main-site deploy — it lives independently (see *Standalone pages* under Deploy config)


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
- **Two lead cases in Work:** the Asbestos ITM (a build from new) and the anonymised review-and-uplift
  case (audit and rebuild, L3 NVQ to L6 HE, with the anonymised medical-education static-to-interactive
  sub-case). The 100% and 240+ figures live in that case's stat tiles, not in the Numbers strip.
  **Client names, drug names and live embed links for the medical-education work stay out** until
  Touch Medical gives written permission; the sub-case is deliberately generic.

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
