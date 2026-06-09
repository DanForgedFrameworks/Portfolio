# Claude Code — Deployment Prompt (Forged Frameworks Portfolio v2.5)

Copy everything in the fenced block below and paste it into **Claude Code**, opened in
a clone of `github.com/DanForgedFrameworks/Portfolio`. Before running, drop this v2.5
bundle's files somewhere Claude Code can reach (e.g. extract the zip to `~/ff-v2.5/`)
and tell it that path when it asks (or edit the path in the prompt).

---

```
You are deploying a static site to GitHub Pages for the repo DanForgedFrameworks/Portfolio.

CONTEXT
- The published site (https://danforgedframeworks.github.io/Portfolio/) is currently a
  partial/stale deploy: the gateway (index.html) loads, but accreditation-quality.html
  and learning-design.html return the branded 404 because those files are not at the
  repo root. I need a clean, COMPLETE replace.

SOURCE OF TRUTH
- The correct, complete site is the v2.5 bundle located at: <PASTE_PATH_TO_EXTRACTED_v2.5_BUNDLE>
  (it contains index.html, learning-design.html, accreditation-quality.html, 404.html,
  transition.js, site.css, app.js, README.md, DEPLOY-HANDOVER.md, .nojekyll, and the
  assets/ and patterns/ folders).

TASK
1. Confirm you are at the root of the Portfolio git repo (there is a .git folder). Do NOT
   touch the .git directory at any point.
2. Delete ALL tracked site files at the repo root EXCEPT the .git directory — including any
   stale page files from older deploys such as:
   Accreditation-Quality.html, "Accreditation-Quality v2.html", gateway.html,
   "Forged Frameworks Portfolio.html", "Forged Frameworks Portfolio v2.html",
   and any other *.html / leftover folders that are not part of the v2.5 manifest below.
3. Copy the ENTIRE CONTENTS of the v2.5 bundle into the repo root so the final root layout is
   exactly (files at root, not inside a github-deploy/ subfolder):
     index.html  learning-design.html  accreditation-quality.html  404.html
     transition.js  site.css  app.js  README.md  DEPLOY-HANDOVER.md  .nojekyll
     assets/ (folder)  patterns/ (folder)
   Make sure the HIDDEN .nojekyll file is copied and staged — it is required so GitHub
   Pages does not run Jekyll and drop files.
4. Verify internal consistency before committing:
   - grep the repo for the strings "gateway.html" and "Accreditation-Quality v2.html" in
     *.html and *.js. They must NOT appear in any deployed page (only README/handover docs
     may mention them as historical names). If any deployed page still references them, stop
     and report — do not commit.
   - confirm index.html's portal script fires 'learning-design.html' and
     'accreditation-quality.html', and that both of those files exist at the root.
   - confirm 404.html exists and that learning-design.html and accreditation-quality.html
     are present.
5. Stage everything including the dotfile: `git add -A` (and explicitly `git add .nojekyll`
   if needed). Show me `git status` so I can see exactly what will change.
6. Commit with message: "Deploy v2.5 — gateway as index, full page set, clean links" and push
   to the `main` branch.
7. Remind me to set GitHub Pages Source = Deploy from a branch, Branch = main, Folder = / (root)
   if it isn't already, and to verify the three live URLs in an incognito window:
     /Portfolio/  ·  /Portfolio/learning-design.html  ·  /Portfolio/accreditation-quality.html

CONSTRAINTS
- Never delete or modify the .git directory.
- Do not commit a wrapping github-deploy/ folder — files go at the repo root.
- If anything is ambiguous (e.g. you can't find the bundle path, or a verification check
  fails), stop and ask me rather than guessing.
```

---

## After Claude Code pushes

1. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`.
2. Wait ~1 minute for the build.
3. Verify in an **incognito** window:
   - `https://danforgedframeworks.github.io/Portfolio/` → gateway
   - `https://danforgedframeworks.github.io/Portfolio/learning-design.html` → loads
   - `https://danforgedframeworks.github.io/Portfolio/accreditation-quality.html` → loads
