# Forged Frameworks — Portfolio (GitHub Pages build)

Static site for **Daniel 'Wig' Boyland — Forged Frameworks**. No build step, no
dependencies to install: it is plain HTML/CSS/JS plus media assets and the live
interactive demos in `patterns/`.

## What's in here

```
index.html                  ← the portfolio (home page; GitHub Pages serves this by default)
Accreditation-Quality.html  ← the "secret" technical-CV page, linked from #full-skills
site.css                    ← all styling
app.js                      ← scroll reveals, matrix-rain, count-ups, nav, quote river
assets/                     ← logo/portrait images, GIFs, MP4s, favicon, type tokens, card thumbnails
patterns/                   ← the live interactive blocks embedded as iframes / opened full-screen
.nojekyll                   ← tells GitHub Pages to serve folders as-is (don't run Jekyll)
```

Everything uses **relative paths**, so the whole folder works as a unit. Keep the
structure intact — the demos load via relative `src`/`href`.

## Deploy to GitHub Pages

1. Commit the **contents of this folder** to the root of
   `github.com/DanForgedFrameworks/Portfolio` (so `index.html` is at the repo root,
   not inside a `github-deploy/` subfolder).
2. Repo → **Settings → Pages**.
3. **Source:** Deploy from a branch → **Branch:** `main` → **Folder:** `/ (root)` → **Save**.
4. Wait ~1 minute; the site publishes at
   `https://danforgedframeworks.github.io/Portfolio/`.

> Prefer a `/docs` folder instead of root? Put everything in a `docs/` folder and
> pick **Folder: /docs** in step 3.

## Notes

- **External embeds & links** (Articulate Review 360 iframes, LinkedIn profile links)
  work on the live domain. They are only blocked inside the design-tool preview sandbox.
- **Fonts** (Atkinson Hyperlegible, Lexend, JetBrains Mono) and the **Lucide** icon
  library load from public CDNs at runtime — an internet connection is needed on first paint.
- The in-app **Tweaks** authoring panel (React/Babel) has been removed from this build —
  it is an editing tool, not a public feature.
