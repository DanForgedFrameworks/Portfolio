# Forged Frameworks — Portfolio (GitHub Pages build · v2.5)

Static site for **Daniel 'Wig' Boyland — Forged Frameworks**. No build step, no
dependencies: plain HTML/CSS/JS plus media assets and the live interactive demos
in `patterns/`.

This `github-deploy/` folder is **generated** from the project root files. It is the
deployable unit — the working/source files (`gateway.html`, the v2 page names, the
Tweaks authoring panel, etc.) stay in the project root and are not shipped here.

## What's in here

```
index.html                  ← the Portfolio Gateway (front door; built from gateway.html — GitHub Pages serves this by default)
learning-design.html        ← the Learning Design portfolio (built from the root index.html)
accreditation-quality.html  ← the "secret" technical-CV / accreditation & quality page (built from Accreditation-Quality v2.html)
transition.js               ← shared cross-page word-rain / choice transition
site.css                    ← all styling for the two portfolio pages
app.js                      ← scroll reveals, matrix-rain, count-ups, nav, quote river
404.html                    ← branded not-found page with a quick contact form
assets/                     ← logo/portrait images, GIFs, MP4s, favicon, type tokens, card thumbnails
patterns/                   ← the live interactive blocks embedded as iframes / opened full-screen
.nojekyll                   ← tells GitHub Pages to serve folders as-is (don't run Jekyll)
```

The gateway is the front door: visitors pick **Learning design** or
**Accreditation & quality**, and every page cross-links back to the gateway (now
`index.html`) and to the other world. Everything uses **relative paths**, so the
whole folder works as a unit — keep the structure intact.

### How the root files map into this build

| Project root (source)            | Deployed as                  |
|----------------------------------|------------------------------|
| `gateway.html`                   | `index.html`                 |
| `index.html`                     | `learning-design.html`       |
| `Accreditation-Quality v2.html`  | `accreditation-quality.html` |

All cross-page links and the `FFTransition.fire(...)` targets are rewritten to the
deployed filenames during the build. Editing-only files (the React/Babel **Tweaks**
panel, QA harnesses, archives, handover notes) are intentionally excluded.

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
- The in-app **Tweaks** authoring panel (React/Babel) is not shipped in this build —
  it is an editing tool, not a public feature.
