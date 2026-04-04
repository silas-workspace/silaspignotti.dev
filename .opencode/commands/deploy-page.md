---
description: Deploy one content page and publish live
agent: build
---
Deploy page content for route `$ARGUMENTS`.

Allowed routes: `landing`, `about`, `projects`, `contact`.

Use this mapping:
- `landing` -> `src/content/pages/landing.md`
- `about` -> `src/content/pages/about.md`
- `projects` -> `src/content/pages/projects.md`
- `contact` -> `src/content/pages/contact.md`

Execution rules:
1. Use the markdown content provided in this chat as the source of truth.
2. Update the mapped file only. Do not edit layout/template code unless strictly required for schema compatibility.
3. Ensure frontmatter includes at minimum: `title`, `description`, `slug`.
4. Keep `ogImage` if present, otherwise set `/ogImage.png`.
5. Validate image/link references in the page body.
6. Load and run the `technical-seo` skill for this route.
7. Run `npm run build` as deployment gate.
8. If the gate passes, create a conventional commit and push to `main`.

Commit message format:
- `content(page): update <route>`

Output format:
- Updated file path
- Technical SEO report for the route
- Build result
- Commit hash and pushed branch
- Reminder that GitHub Pages deploy is triggered by push to `main`

If route is invalid, stop and print allowed values.
