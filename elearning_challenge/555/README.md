# The Confirmation Test — E-Learning Challenge #555

An interactive, darkly comic "toxic-org onboarding" piece. The learner is welcomed
by **HARMONY**, a cheerful AI onboarding assistant, and asked to confirm they'll
design learning "the way we like it designed." Across three scenarios the interaction
**inverts** normal e-learning feedback: agreeing with the organisation's myths is
rewarded (confetti, praise, applause); giving the evidence-based answer is met with a
passive-aggressive "Are you sure?" — and the more you resist, the more HARMONY's mask
slips. A silent jury "analyses" each response before the result lands, and the learner's
running tally routes them to one of three endings.

It is a critique of measurement theatre, learning-styles myths, and shiny-over-substance
content design — delivered as a playable experience rather than a slide deck.

---

## How to preview / run

**Just open `build/index.html` in any modern browser.** Double-click it, or host the
folder and visit it. No build step and no server required.

Three things must stay next to each other for it to run (they already are in this package):

- `build/index.html` — the interaction (entry point)
- `build/support.js` — the small runtime that renders it (loaded by `index.html`)
- `assets/` — the videos, voiceover and jury images, referenced via relative `../assets/` paths

So keep the `build/` and `assets/` folders together exactly as shipped. The only external
call at runtime is to Google Fonts (Montserrat + Lato); online that loads automatically,
offline it falls back to system fonts and everything else still works.

> Tip: because audio autoplays, most browsers require one click/keypress before HARMONY's
> voice starts — entering a name and pressing **Get started** satisfies this. A **Sound**
> toggle, **CC** captions and a **Transcript** are available in the top-left throughout.

### Editing the source
`build/index.html` and `build/The Confirmation Test.dc.html` are the **same source** (the
latter is the named working copy). Edit either and keep `support.js` beside it.

---

## The experience, briefly

- **Hero** — HARMONY greets the learner and captures their name (Enter or *Get started*).
- **3 scenarios** — learning styles, "nobody reads" (infographics/gamify), and measurement
  theatre (completion + leaderboards). Each offers a *conform* (org myth) and a *rebel*
  (evidence-based) answer.
- **"Are you sure?" physics** — confirming the myth is frictionless; choosing the evidence
  answer triggers escalating resistance (a magnetic button, a doubled prompt, and on the
  final scenario a whole panel that dodges your cursor). The exit is always reachable.
- **HARMONY's mood** — her face morphs on a live gradient as your cursor moves between the
  buttons: wide-eyed and wary toward the "wrong" answer, beaming toward the org-approved one.
- **Fake-analysis jury** — three silent judges "deliberate" (Processing… / Hmm. / Noted.)
  before each verdict.
- **Inverted feedback** — myth answers get celebration + applause; evidence answers get a
  cold, glitchy HARMONY and a note "for the team."
- **Three endings** by myth tally — full conform (access granted + an impossible first
  project), mixed (watchful), or full competence (reassignment/"readjustment").
- **Start over** is available at any point.

---

## File manifest

```
.
├── README.md                              ← this file
├── Confirmation_Test_Master_Design_Spec.md ← the design specification (source of truth)
├── HARMONY_voice_script_v2.md             ← HARMONY's full voiceover script
│
├── build/
│   ├── index.html                         ← ▶ RUN THIS — the interaction (entry point)
│   ├── support.js                         ← runtime that renders index.html (keep alongside)
│   └── The Confirmation Test.dc.html       ← same source, named working copy
│
└── assets/
    ├── video/
    │   ├── tim-robinson-you-sure.mp4       ← "Are you sure?" beat, scenario 1
    │   └── john-cena-are-you-sure.mp4      ← "Are you sure?" beat, scenario 2
    ├── audio/                              ← HARMONY voiceover (one MP3 per beat)
    │   ├── harmony-onboarding.mp3
    │   ├── harmony-s1.mp3 / -s1-conform.mp3 / -s1-rebel.mp3
    │   ├── harmony-s2.mp3 / -s2-conform.mp3 / -s2-rebel.mp3
    │   ├── harmony-s3.mp3 / -s3-conform.mp3 / -s3-rebel.mp3
    │   └── harmony-ending-conform.mp3 / -mixed.mp3 / -rebel.mp3
    └── jury/
        ├── jury-chan.jpg
        ├── jury-judy.jpeg
        └── jury-glasses.jpeg
```

---

## Tech notes for whoever pushes / hosts this

- **Static.** `build/index.html` is the entry point and needs `build/support.js` beside it.
  Any static host (GitHub Pages, Netlify, plain file open) works. Ship `build/` and
  `assets/` together; nothing is fetched from this authoring session at runtime.
- **Relative paths only** — no absolute URLs, no CDN dependencies at runtime.
- **Total media ≈ 8.5 MB** (the Tim Robinson clip is the bulk at ~4.5 MB).
- Built to the **Forged Frameworks** copper-on-cream palette; type is Montserrat + Lato.
- **Favicon + social preview.** `build/` ships `favicon.png` / `favicon-32.png` /
  `apple-touch-icon.png` and `og.png` (the 1200×630 link-unfurl card). The favicon links
  live in the `.dc.html` `<helmet>`, so they survive a recompile. **The Open Graph /
  Twitter tags, however, live in the *static* `<head>` of `index.html`** (between the
  viewport `<meta>` and the `support.js` `<script>`) — link-preview crawlers don't run JS,
  so they can't sit in the helmet. A recompile from the `.dc.html` regenerates that static
  head and **drops the OG block, so re-add it after every rebuild.** `og:image`/`og:url`
  are absolute Pages URLs — update them if the repo, path, or host ever changes. Regenerate
  the images with `make_assets.py` (kept with the build sources).
