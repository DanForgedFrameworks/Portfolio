<!-- load-bearing: STEP 4 is run by /portfolio-showcase - do not move/rename -->
# Manual push workflow and gotchas

Moved from `CLAUDE.md` on 2026-10-13. /push-build is the normal route; these are the same steps
by hand. The Deploy config they refer to is `.claude/skill-config/push-build.md`.

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
diff -rq --exclude=".git" --exclude=".github" --exclude=".claude" --exclude="cv" --exclude="statements" --exclude="portfolio-cut" --exclude="showcase" "<source>/github-deploy" "<repo-root>"
```

Files present in the repo but **absent from the incoming bundle** are stale and must be
removed with `git rm` before the copy step. Common culprits across versions:

- `Accreditation-Quality v2.html`
- `Forged Frameworks Portfolio.html` / `Forged Frameworks Portfolio v2.html`
- `gateway.html`
- `tweaks-app.jsx` / `tweaks-panel.jsx`
- Any `*.html` at root not in the v-manifest

**Never delete or modify the `.git` directory.** Likewise, **never `git rm` `cv/`, `statements/`, `portfolio-cut/`, `showcase/`, `.github/` or `.claude/`** — none of them is part of the versioned bundle (see Deploy config → *Standalone pages*, and *Wiring* in `CLAUDE.md` for `.github/` and `.claude/`), so each will always look "absent from the incoming bundle."

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
git add -- <each path the copy wrote, by name>   # never git add -A: other sessions write here too
git add .nojekyll   # explicit — dotfiles can be missed
git diff --cached --name-status   # must list only this deploy's paths; unstage anything else
git status
```

Show the full `git status` output so the user can see exactly what will change
before committing.

---

### STEP 6 — Commit and push

```bash
git commit -m "Deploy vX.X — <one-line description of what changed>" -- <the same paths, plus each path git rm removed in STEP 2>
git push
```

Use the version number from the bundle folder or handover doc in the commit message.

---

### STEP 7 — Post-push confirmation

After a successful push, check the deploy yourself, then report:

1. Exact files changed/added/deleted (from the commit output)
2. The Pages workflow run **for this commit** finished green — match its commit SHA to
   `git rev-parse HEAD`, because the latest run can still be the previous push:
   `gh run list --workflow=pages.yml --limit 1 --json status,conclusion,headSha`.
   A failed run means the live site did not change (see "Not on PUBLISH or SKIP" below).
3. These URLs, fetched with a cache-buster (`?cb=<random>`), return 200 with the new content:
   - `https://danforgedframeworks.github.io/Portfolio/`
   - `https://danforgedframeworks.github.io/Portfolio/accreditation-quality.html`
   - `https://danforgedframeworks.github.io/Portfolio/learning-design.html` (should land on the main site's work section)

---

## Known gotchas — check these if something looks wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| `git status` shows "nothing to commit" but user expects changes | Files are byte-for-byte identical to last deploy | Run robocopy anyway; if still nothing, the version was already deployed — confirm on the live URL in incognito |
| 404 on `learning-design.html` or `accreditation-quality.html` | Files not at repo root (stuck inside `github-deploy/` subfolder, or wrong case) | Confirm files exist at root with `ls *.html` |
| Old content showing after push | Browser cache | Open incognito / clear cache. Cache-buster `?v=XXX` stamps on CSS/JS force asset refresh |
| OneDrive file lock during commit | OneDrive syncing `.git` folder | Quit OneDrive sync temporarily, retry commit |
| Deploy failed: "Not on PUBLISH or SKIP" | A new top-level file or folder the deploy script does not know | Add it to PUBLISH (or SKIP) in `.github/publish-site.sh`, commit, push. The live site was not changed |
| New page 404s but is in the repo | It is a `.md`/`.txt`/`.py`/`.yml` file, which are never published | Those types are internal by design (STRIP in `.github/publish-site.sh`). Publish the content as `.html` |
| `git push` rejected (non-fast-forward) | Another session or machine pushed first | `git pull --rebase`, re-run the Step 4 QA checks, then push. Never force-push unless Daniel explicitly asks |
