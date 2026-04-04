---
description: Deploy one project entry and publish live
agent: build
---
Deploy project content for slug `$ARGUMENTS`.

Execution rules:
1. Use markdown content provided in this chat.
2. Target file: `src/content/projects/$ARGUMENTS.md` (create if missing).
3. Ensure frontmatter includes:
   - `title`
   - `description`
   - `slug`
   - `stack`
   - `category` (`Geo Data Science` or `AI/Automation`)
   - `github`
   - `cover`
4. Optional frontmatter supported: `tagline`, `pypi`, `downloads`, `screenshots`, `featuredOrder`.
5. Ensure `slug` matches `$ARGUMENTS`.
6. Validate that referenced cover/screenshots exist.
7. Verify project is reachable from `/projects` (content collection listing).
8. Load and run the `technical-seo` skill for:
   - `/projects/$ARGUMENTS`
   - `/projects`
9. Run `npm run build` as deployment gate.
10. If the gate passes, create a conventional commit and push to `main`.

Commit message format:
- `content(project): upsert $ARGUMENTS`

Output format:
- Created/updated file path
- Reachability check result
- Technical SEO report
- Build result
- Commit hash and pushed branch
- Reminder that GitHub Pages deploy is triggered by push to `main`
