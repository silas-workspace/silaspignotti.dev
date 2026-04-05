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
   - `tags`
   - `category` (`Geospatial` or `AI/Automation`)
   - `github`
   - `cover`
   - `coverIcon`
4. Optional frontmatter supported: `tagline`, `demo`, `paper`, `downloads`, `screenshots`, `featuredOrder`.
5. Ensure `slug` matches `$ARGUMENTS`.
6. Normalize cover path to `/covers/$ARGUMENTS.png` unless explicitly overridden.
7. If the user provides a `Files:` block, load and run `project-media`.
   - Process only explicitly declared mappings.
   - Mapping format: `tmp/source.ext -> final-name.ext`
   - No global `tmp/` scanning.
8. Validate that referenced screenshots/downloads resolve to published paths under `/projects/$ARGUMENTS/`.
9. Load and run the `technical-seo` skill for:
   - `/projects/$ARGUMENTS`
   - `/projects`
10. Load and run the `project-cover` skill for `$ARGUMENTS`.
   - Skip regeneration by default when existing cover is still valid.
   - Regenerate only when missing, icon changed, or forced.
11. Verify project is reachable from `/projects` (content collection listing).
12. Run `npm run build` as deployment gate.
13. If the gate passes, create a conventional commit and push to `main`.

Commit message format:
- `content(project): upsert $ARGUMENTS`

Output format:
- Created/updated file path
- Reachability check result
- Technical SEO report
- Build result
- Commit hash and pushed branch
- Reminder that GitHub Pages deploy is triggered by push to `main`
