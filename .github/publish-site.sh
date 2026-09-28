#!/usr/bin/env bash
# load-bearing: run by .github/workflows/pages.yml — do not move/rename
#
# Builds the folder GitHub Pages publishes, from the files tracked in git.
# Internal notes (CLAUDE.md, handovers, READMEs, build scripts) stay in the repo but are
# never published. The repo itself is public, so this keeps them off the website only.
#
# Every top-level entry in the repo must be on PUBLISH or SKIP. If a new one appears on
# neither, this script stops and the deploy fails, so the live site stays as it was.
# Add the new entry to one list and push again.
#
# Local check:  bash .github/publish-site.sh <out-dir>
set -euo pipefail
out="${1:?usage: publish-site.sh <out-dir>}"

# Published. Folders go whole, minus the STRIP file types below.
PUBLISH=(
  index.html accreditation-quality.html learning-design.html 404.html
  forge.css forge.js transition.js site.css app.js .nojekyll
  assets cv elearning_challenge patterns showcase statements
)
# Never published.
SKIP=(
  .github CLAUDE.md CLAUDE-CODE-DEPLOY-PROMPT.md DEPLOY-HANDOVER.md README.md
)
# Internal file types removed from every published folder.
STRIP=( '*.md' '*.txt' '*.py' '*.yml' '.gitattributes' )

unknown=$(git ls-files | cut -d/ -f1 | sort -u | while read -r entry; do
  case " ${PUBLISH[*]} ${SKIP[*]} " in *" $entry "*) ;; *) echo "$entry" ;; esac
done)
if [ -n "$unknown" ]; then
  echo "::error::Not on PUBLISH or SKIP in .github/publish-site.sh:" $unknown
  exit 1
fi

rm -rf "$out"
mkdir -p "$out"
git ls-files -z -- "${PUBLISH[@]}" | xargs -0 cp --parents -t "$out"

find_args=()
for pattern in "${STRIP[@]}"; do find_args+=( -o -name "$pattern" ); done
find "$out" -type f \( "${find_args[@]:1}" \) -print -delete | sed 's/^/stripped: /'

echo "published: $(find "$out" -type f | wc -l) files, $(du -sh "$out" | cut -f1)"
