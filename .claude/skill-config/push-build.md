<!-- load-bearing: read by /push-build, /adaptable-cv and /portfolio-showcase - do not move/rename -->
<!-- Moved verbatim from CLAUDE.md on 2026-10-13. "STEP n" means the steps in .claude/notes/push-workflow.md. -->

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

- **Keep** (tracked but never in a bundle; excluded from the stale-file diff and never `git rm`'d — see *Standalone pages* below):
  - `cv/`
  - `statements/`
  - `portfolio-cut/`
  - `showcase/`

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
  - **TAB6102 Rise case and the six Rise test-course links survived the copy** (added 28 Oct 2026, not in any
    design handoff; Tiro named on that case only, see the repo `CLAUDE.md`):
    ```bash
    grep -o "360.articulate.com/review/content/" index.html | wc -l   # must return 7 (1 course + 6 test courses)
    ls assets/tab6102/*.webp | wc -l                          # must return 3
    ```
  - **Emma Lewis's testimonial survived the copy** (added 23 Sept 2026, not in any design handoff):
    ```bash
    grep -c "Emma Lewis" index.html   # must return 1
    ```
    Her LinkedIn recommendation of 18 Sept 2026 is quoted verbatim, slips included (owner decision). It is the
    seventh card, so the Testimonials grid is `.cards--3` and card seven spans the row.
  - **Only Cells card survived the copy** (added 23–28 Sept 2026, not in any design handoff):
    ```bash
    grep -c "onlycells.co.uk/cases/" index.html   # must return 1
    ```
    Since 28 Sept 2026 this is the **first lead case in Work** (owner: new and exciting, so higher up), not a
    grid card; the grid is five cards (3+2). Only Cells has given permission, on a condition: snippets
    and stills come from **published** cases only (202610 onward), never an unpublished case or a
    prototype. Link to the live case on onlycells.co.uk, never the `hosted_content/onlycells` review
    copies. The permission record is in the owner's **private** register,
    `FFW Portfolio\showcase-register.md` (outside this repo: the repo is public on GitHub).
    **The link goes stale monthly.** On 28 Sept 2026 `/cases/202609` was a 404 and the library at
    `/cases` listed only 202610 as active, so the card says "Try the October case" and points there.
    When Only Cells publishes the next case, open `https://onlycells.co.uk/cases` and move the card's
    link and month to whichever case it lists as active.
  - **Only Cells teaser link survived the copy** (added 28 Sept 2026, not in any design handoff):
    ```bash
    grep -c "showcase/morphology-monthly/morphology-monthly.html" index.html   # must return 1
    grep -c "morphology-monthly-teaser.webm" index.html                        # must return 1
    ls showcase/morphology-monthly/morphology-monthly-teaser.webm showcase/morphology-monthly/morphology-monthly-teaser.mp4
    ```
    The Only Cells lead case plays the 720 Audio C cut in its right column (`.lead-case__media`), with the
    play button showing: `preload="none"`, so only the 26 KB poster loads until someone presses play. It never
    autoplays. "More about the build" opens the showcase page, which plays the same cut.
  - **FFW showcase teaser survived the copy** (added 28 Sept 2026, not in any design handoff):
    ```bash
    grep -c "showcase/ffw-teaser/index.html" index.html               # must return 2 (thumbnail + footer link)
    grep -c "The video, example and review page are generalised" index.html   # must return 1
    grep -c "showcase/ffw-teaser/review-pack/index.html" index.html   # must return 1
    grep -c 'id="ffTeaserViewer"' index.html                          # must return 1 (the in-page viewer)
    grep -c "showcase/ffw-teaser/build/activity-decision-making.dc.html" index.html   # must return 1
    ls showcase/ffw-teaser/index.html showcase/ffw-teaser/ffw-showcase-teaser.mp4 showcase/ffw-teaser/ffw-showcase-teaser.webm showcase/ffw-teaser/ffw-showcase-teaser-thumb.webp
    ```
    The 79-second, square teaser with Daniel's music (cut 8, swapped in 21 Oct 2026) is linked from the **New-drug launch education** card
    (a 160x100 thumbnail, `.card__thumb`, and "Watch how it's built ▶" both open the in-page video viewer, a `<dialog id="ffTeaserViewer">` opened by the small script after `forge.js` (Esc, the close button or the backdrop closes it; without JS the links fall back to the player page `showcase/ffw-teaser/index.html`); "See how a client reviews it ↗" opens `showcase/ffw-teaser/review-pack/` in a new tab; "Try the example ↗" opens the generalised interactive example, `showcase/ffw-teaser/build/`. The player page also carries the phone clips, 16 screens and the client review page, `review-pack/`, all with neutral file names), with a line on the card saying the video and example are
    generalised, altered to protect the client's IP and copyright (owner, 28 Sept 2026; it first sat in the
    review-and-uplift lead case the same day). The card's own text is unchanged. 1000px, about 4.7 MB. The
    client approved THIS video for the portfolio (record in the private register). The player page
    plays the WebM (MP4 fallback) with the poster and repeats the note. When the music version is made, replace
    the MP4 and WebM under the same names.
  - **Proof links survived the copy** (restored 28 Sept 2026; the 16 Sept rebuild kept each piece of work's
    sentence and dropped the walkthrough or live tool that showed it):
    ```bash
    grep -o "patterns/fibre-id/index.html\|assets/fibre-id.mp4\|assets/prevent-duty.mp4\|patterns/digital-maturity/index.html\|11wAh8SvqFwidSCHySYg4kLKq22ytnrQs\|1xb6TjhTQBSo0jhOVsL2eAsnPwa8dEdfz\|patterns/swipe/swipe-quiz.html\|patterns/3d/molecule-viewer.html" index.html | sort | uniq -c
    ```
    All eight must be listed; the swipe quiz and molecule viewer count `2` (card + Codex rail), the rest `1`. Asbestos
    lead case: Identification Matrix + tool walkthrough (`.lead-case__links`). Prevent: walkthrough. Lab
    Management: Drive show and tell + Digital Maturity Diagnostic. Microbiology: Drive show and tell +
    swipe quiz + molecule viewer. The two Drive walkthroughs were public (played signed-out) on 28 Sept 2026.

- **Standalone pages** (NOT part of the versioned bundle — preserve on every deploy, **never `git rm`**):
  - `cv/` — self-contained "Adaptable CV" launcher (a single, fully inlined `index.html`; no external assets). Served at `https://danforgedframeworks.github.io/Portfolio/cv/`. Linked from `index.html` (checked in STEP 4b). **Exclude `cv/` from the STEP 2 stale-file diff and never remove it**, even though it will never appear in a versioned `github-deploy` bundle.
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
    > **The four PDFs are printed, not derived (added 16 Sept 2026).** `cv/cv-*.pdf` are headless-Chrome prints of
    > the page in each framing. Editing `cv/index.html` text does NOT change them: the July PDFs sat for two months
    > saying ~60% after the page said ~40%. Any CV text change re-prints all four in the same commit (skill Phase 3),
    > and a figure check reads the PDFs' text back, not the page. Current design export: **v5, 16 Sept 2026**
    > (`CV/CV consolidation and design v5/handoff/index.html`); every framing prints at two pages.

    > ⚠️ **Back-link maintenance:** `cv/index.html` carries a `#ff-back-to-portal` button — the top-right **"← Want to see my full portfolio?"** link + fade-in, injected by a `<head>` window-timer `<script>` placed *before* `<noscript>` (window timers survive the bundle's `documentElement.replaceWith`, so the button lands in the new body after unpack). On click it sets `sessionStorage('ff-to-gateway','1')` and navigates to `../index.html`. Since the Sept 2026 rebuild nothing reads that flag (the gateway entry-rain is retired), so it is harmless; the link simply returns to the main site. **The `adaptable-cv` skill re-injects this automatically during every build (`assets/back-link.html` → before `<noscript>`) and strips it from the generated PDFs, so a normal skill deploy already includes it — no separate re-commit needed.** If `cv/index.html` is ever regenerated by some *other* process, the block must be re-added. Verify after every CV update: open `cv/index.html` and confirm the "← Want to see my full portfolio?" button appears top-right once the CV renders.

  - `portfolio-cut/` — **working material, not a published page** (moved here 22 Sept 2026, owner ruling). The FFW pipeline showcase: two finished teaser MP4s, the review pack a stakeholder opens, and the scripted build that produced both from a real client asset with the copy replaced by Latin. **Nothing here is served or linked yet.** Integrating it — the page that carries the video, hosting the pack beneath it, and the `mailto:` in the pack index that needs ruling on before anything is public — is this project's decision; the touchMedical side is closed. Its own `STATUS.md` is the full record, handover section included. **Exclude `portfolio-cut/` from the STEP 2 stale-file diff and never `git rm` it** — same treatment as `cv/` and `statements/`, and for the same reason: it sits at the repo root, will never appear in a versioned bundle, and would otherwise be swept on the next deploy. Its `.gitignore` keeps ~358 MB of regenerable render frames out of git; the ~128 MB left is mostly the review pack (a 31 MB reviewer page, a 33 MB PDF), so **decide whether the pack belongs in git at all before committing it** — committing is what would eventually put client-derived material, however latinised, on a public URL.
  - `showcase/` — **teaser and demo assets; linked: `morphology-monthly/` (Only Cells lead case) and `ffw-teaser/` (New-drug launch education card), both since 28 Sept 2026; `ffw-teaser/` is placed by the portfolio-showcase skill** (22 Sept 2026, owner ruling: one home at the repo root rather than split between `patterns/` and `portfolio-cut/`). `showcase/morphology-monthly/` is the Only Cells case showcase page and its web teaser — hand-authored and **tracked**, moved out of `patterns/`. `showcase/ffw-activity-demo/` holds **copies** of `portfolio-cut/`'s two finished teaser MP4s and its `build/master` demo, left **untracked** for the reason in the line above — copies, because `portfolio-cut/build/` is regenerated from scratch by `tools/latinise.py` and anything moved out of it would come back on the next run. `showcase/README.md` is the full record. **Exclude `showcase/` from the STEP 2 stale-file diff and never `git rm` it** — same treatment as `cv/`, `statements/` and `portfolio-cut/`. Both linked pages have an Extra QA check above, because a rebuild from a design bundle replaces `index.html` and would drop the link silently. A page newly linked from `index.html` gets its check in the same commit.
  - `statements/` — the public compliance statements. Self-contained single-file pages (all CSS inlined; the only externals are Google Fonts and `../assets/`). Served at:
    - `statements/accessibility-and-inclusion.html` — **FF-AC-01** Accessibility and Inclusion Statement
    - `statements/environmental-statement.html` — **FF-ES-01** Environmental Statement

    Authored outside the versioned bundle, so **exclude `statements/` from the STEP 2 stale-file diff and never `git rm` it** — the same treatment as `cv/`. Left unprotected at the repo root these would have matched STEP 2's "any `*.html` at root not in the v-manifest" rule and been swept on the next deploy; the folder is what keeps them out of that sweep.

    > ⚠️ **Controlled documents — version before you edit.** Each statement carries a reference, version, issue date and next-review date in its `.control` block, and repeats the reference and version in the footer `.sig`. Both say in their own *Review* section that superseded versions remain traceable in repository history. So **never quietly rewrite one in place** — bump the version and issue date in *both* the `.control` block and the footer `.sig` together, and let git history carry the previous wording. Editing the text while leaving the old version and date in place breaks a claim the document makes about itself. Current issue: **FF-AC-01 v1.2 · Issued 29 October 2026** (owner-approved 29 Oct: new Clause 3, AI-assisted checks with human sign-off, old 3–5 renumbered 4–6; Clause 1 gains the fixed-player fit check; limitations unchanged). **FF-ES-01 v1.1 · Issued 15 September 2026** (email corrected to `dan.boyland@`, sentence-case labels).
    > On 16 Sept 2026 both pages were restyled to match the site (Atkinson Hyperlegible + JetBrains Mono
    > instead of Inter + IBM Plex Mono, navy ink on site paper, copper links, a "← Back to the portfolio"
    > link in the brandline, "Check this by" answers in body type, 12px labels). **Styling only — not a
    > word of statement text changed, so the version and dates stayed at v1.1.** Restyling is not a
    > version event; rewording is. Next review for both: **Aug 2027**. The Word originals live in the owner's Google Drive business folder; a new version there is uploaded alongside the old one, not over it.
