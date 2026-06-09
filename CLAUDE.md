# Forged Frameworks Portfolio — Claude Code Working Instructions

This file is read automatically by Claude Code every session.
Follow every step below on **every push**, no exceptions.

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
diff -rq --exclude=".git" "<source>/github-deploy" "<repo-root>"
```

Files present in the repo but **absent from the incoming bundle** are stale and must be
removed with `git rm` before the copy step. Common culprits across versions:

- `Accreditation-Quality v2.html`
- `Forged Frameworks Portfolio.html` / `Forged Frameworks Portfolio v2.html`
- `gateway.html`
- `tweaks-app.jsx` / `tweaks-panel.jsx`
- Any `*.html` at root not in the v-manifest

**Never delete or modify the `.git` directory.**

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

#### 4b — Gateway fires correct page targets
```bash
grep "learning-design\.html\|accreditation-quality\.html" index.html
```
Both filenames must appear in `index.html`.

#### 4c — All three core pages exist at root
```bash
ls index.html learning-design.html accreditation-quality.html 404.html
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
2. Remind the user to verify these three URLs **in an incognito tab**:
   - `https://danforgedframeworks.github.io/Portfolio/`
   - `https://danforgedframeworks.github.io/Portfolio/learning-design.html`
   - `https://danforgedframeworks.github.io/Portfolio/accreditation-quality.html`
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
