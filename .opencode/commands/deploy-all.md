---
description: Deploy all provided page and project content and publish live
agent: build
---
Deploy all page/project content blocks provided in this chat.

Execution rules:
1. Expect structured input with clear blocks for pages and projects.
2. Apply updates to:
   - `src/content/pages/{landing,about,projects,contact}.md`
   - `src/content/projects/*.md`
3. For pages, enforce frontmatter: `title`, `description`, `slug` (plus optional `ogImage`).
4. For projects, enforce frontmatter: `title`, `description`, `slug`, `tags`, `category`, `github`, `cover`, `coverIcon`.
5. If the user provides file mappings per project, load and run `project-media` for each touched slug.
   - Process only explicitly declared mappings.
   - Mapping format: `tmp/source.ext -> final-name.ext`
   - No global `tmp/` scanning.
6. Validate image and internal links across all updated files.
7. Load and run the `technical-seo` skill once at the end for all touched routes.
8. Load and run the `project-cover` skill for touched/new project slugs only.
   - Skip regeneration by default when existing covers are still valid.
9. Run `npm run build` as deployment gate.
10. If the gate passes, create a conventional commit and push to `main`.

Commit message format:
- `content: deploy batch update`

Output format:
- List of updated files
- Consolidated technical SEO report by route
- Build result
- Commit hash and pushed branch
- Reminder that GitHub Pages deploy is triggered by push to `main`
