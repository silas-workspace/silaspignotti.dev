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
2. Update the mapped file only. Replace the page content cleanly; do not merge old/new sections into duplicated blocks.
3. Do not edit layout/template code unless strictly required for schema compatibility.
4. Ensure frontmatter includes at minimum: `title`, `description`, `slug`.
5. Keep `ogImage` if present, otherwise set `/ogImage.png`.
6. Normalize imperfect export formatting before writing:
   - If input contains wrapper sections like `Landing Page Export`, `File target`, `Frontmatter / Page Meta`, `Body Content`, drop those wrappers.
   - If frontmatter appears in a fenced code block, extract it into real YAML frontmatter at the top of the target file.
   - If body appears in a fenced markdown block, extract only the body content.
   - Remove duplicated sections/paragraphs caused by copy-paste merges.
   - For route `landing`, remove any manual `## Featured Projects` section from the markdown body (featured cards are rendered dynamically from project data).
7. Validate image/link references in the page body.
8. Load and run the `technical-seo` skill for this route.
9. Validation/runtime safety rules:
   - Never run `npm install` in this flow.
   - Never run `brew install` in this flow.
   - Never modify system Node/npm/toolchain in this flow.
   - Run build gate with explicit runtime: `npx -y -p node@22 -p npm@11 npm run build`.
10. If the gate passes, create a conventional commit and push to `main`.

Commit message format:
- `content(page): update <route>`

Output format:
- Updated file path
- Technical SEO report for the route
- Build result
- Commit hash and pushed branch
- Reminder that GitHub Pages deploy is triggered by push to `main`

If route is invalid, stop and print allowed values.
