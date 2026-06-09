# Forged Frameworks — Portfolio · DEPLOY HANDOVER (v2.5)

**Read this first.** This folder is the **complete, deployable site**. Everything in
it must land at the **root of the GitHub Pages repo** (`DanForgedFrameworks/Portfolio`).
The single most common failure is a *partial* upload — `index.html` makes it but its
sibling pages don't — which produces the branded **"404 · forge link broke"** page on
`accreditation-quality.html` or `learning-design.html`. This doc exists to stop that.

---

## 1. What must be at the repo ROOT (the full manifest)

```
index.html                  ← Portfolio Gateway (front door — GitHub Pages serves this by default)
learning-design.html        ← Learning Design portfolio
accreditation-quality.html  ← Accreditation & Quality (technical CV) page
404.html                    ← branded not-found page (you saw this when a file was missing)
transition.js               ← shared cross-page word-rain / choice transition
site.css                    ← styling for the two portfolio pages
app.js                      ← scroll reveals, matrix-rain, count-ups, nav
README.md                   ← build notes (safe to keep in the repo)
.nojekyll                   ← HIDDEN dotfile — MUST be committed (see §4)
assets/                     ← images, GIFs, MP4s, favicon, type tokens, card thumbnails
patterns/                   ← live interactive demos (iframes / full-screen links)
```

Folders `assets/` and `patterns/` must keep their internal structure intact — every
link in the site is **relative**, so the folder works as a unit.

> ⚠️ Do **not** commit a wrapping `github-deploy/` folder. The files above must be at
> the repo root, e.g. `…/Portfolio/index.html`, NOT `…/Portfolio/github-deploy/index.html`.

---

## 2. Page-name mapping (why a stale deploy 404s)

This build renames the working files. If an **older** deploy is live, it may use
different names and its links won't match these. Replace everything — don't merge.

| Working/source file (NOT shipped) | Deployed filename (shipped) |
|-----------------------------------|------------------------------|
| `gateway.html`                    | `index.html`                 |
| `index.html` (Learning Design)    | `learning-design.html`       |
| `Accreditation-Quality v2.html`   | `accreditation-quality.html` |

All cross-page links and `FFTransition.fire(...)` targets are already rewritten to the
deployed names. The gateway's two portals point to `learning-design.html` and
`accreditation-quality.html`; both pages link back to `index.html` (the gateway) and
across to each other.

**Delete any stale page files** left from older deploys so dead links don't linger,
e.g. `Accreditation-Quality.html`, `Accreditation-Quality v2.html`,
`gateway.html`, `Forged Frameworks Portfolio*.html`.

---

## 3. Deploy steps (GitHub web UI)

1. Go to `github.com/DanForgedFrameworks/Portfolio`.
2. Remove the old site files at the root (or overwrite them) — see §2 for stale names.
3. Upload **the contents of this folder** to the repo root (drag the *files*, not the
   folder). Confirm `accreditation-quality.html` and `learning-design.html` are in the
   list before committing.
4. Commit to `main`.
5. **Settings → Pages → Source:** Deploy from a branch → **Branch:** `main` →
   **Folder:** `/ (root)` → Save.
6. Wait ~1 minute, then hard-refresh (`Cmd/Ctrl + Shift + R`).

> Prefer Claude Code / git instead of the web UI? Use the prompt in
> `CLAUDE-CODE-DEPLOY-PROMPT.md` (same folder). It handles the wholesale replace,
> the `.nojekyll`, stale-file cleanup, and the push.

---

## 4. The `.nojekyll` gotcha (important)

`.nojekyll` is a **hidden dotfile**. GitHub's drag-and-drop web uploader frequently
**skips dotfiles silently**. Without it, GitHub runs Jekyll, which can ignore or drop
files and folders and cause 404s on pages that are actually present. If you deploy via
the web UI, verify `.nojekyll` shows in the repo root afterwards. (Git / Claude Code
commits it normally — no issue there.)

---

## 5. Post-deploy verification checklist

Open each URL in a **private/incognito window** (avoids browser cache):

- [ ] `…/Portfolio/` → the "Choose your path" **gateway**
- [ ] `…/Portfolio/learning-design.html` → Learning Design portfolio (loads, no 404)
- [ ] `…/Portfolio/accreditation-quality.html` → Accreditation & Quality page (loads, no 404)
- [ ] From the gateway, **Enter the studio →** lands on Learning Design
- [ ] From the gateway, **Enter the laboratory →** lands on Accreditation & Quality
- [ ] Each page's nav links back to the gateway and across to the other page
- [ ] A made-up URL (e.g. `…/Portfolio/nope.html`) shows the branded 404 (expected)

If every box ticks, the site is live and fully wired.

---

## 6. Notes

- **Fonts** (Atkinson Hyperlegible, Lexend, JetBrains Mono) and **Lucide** icons load
  from public CDNs at runtime — needs internet on first paint.
- **External embeds** (Articulate Review 360 iframes, LinkedIn links) work on the live
  domain; they're only blocked inside design-tool preview sandboxes.
- The in-app **Tweaks** authoring panel (React/Babel) is intentionally **not shipped** —
  it's an editing tool, not a public feature.
