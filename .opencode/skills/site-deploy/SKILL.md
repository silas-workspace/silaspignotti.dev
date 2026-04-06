---
name: site-deploy
description: Unified portfolio deployment workflow. Auto-detect page/project content, process media, run SEO checks, validate, then commit and push.
---

# Site Deploy Skill

Use this skill for **all content publishing** in this repository.

Single entrypoint: `/deploy`

## Goal

Given content in chat, handle the complete publish workflow end-to-end:

1. infer content type (page/project)
2. normalize and route to correct files
3. process media (screenshots, PDFs)
4. run SEO/integrity checks
5. validate
6. commit and push

## Inputs

- Primary input: content pasted in chat
- Optional command flags:
  - `--dry-run`
  - `--skip-media`
  - `--skip-check`
  - `--skip-push`
  - `--message "..."`

## Repository contracts

### Pages

- `src/content/pages/landing.md` (slug: `/`)
- `src/content/pages/about.md` (slug: `/about`)
- `src/content/pages/projects.md` (slug: `/projects`)
- `src/content/pages/contact.md` (slug: `/contact`)

### Projects

- `src/content/projects/<slug>.md`

### Project Schema (required)

```yaml
title: "Project Name"
slug: "project-slug"
description: "Brief description for SEO and cards"
category: "Geospatial" | "AI/Automation"
tags: ["Tag1", "Tag2", ...]
github: "https://github.com/..."
```

### Project Schema (optional)

```yaml
tagline: "Short tagline for project cards"
demo: "https://demo-url.com"
paper: "https://paper-url.com"
pypi: "https://pypi.org/project/..."
downloads:
  - label: "Download Label"
    href: "/path/to/file.pdf"
screenshots:
  - src: "/projects/slug/screenshot.png"
    alt: "Description of screenshot"
```

### Project Schema (auto-assigned)

```yaml
coverIcon: "auto-selected-from-category"  # Default: code-2
year: 2025  # Auto-detected or provided
completed: true  # Default: true
featured: false  # Default: false
```

### Published Media

- Project screenshots: `public/projects/<slug>/<files>`
- All media referenced in frontmatter must exist at the specified path

## Icon Selection (auto)

The system selects `coverIcon` based on category and tags:

**Geospatial projects:**
- `map-pin` (default for location/mapping projects)
- `satellite` (for satellite/remote sensing)
- `building-2` (for urban/architecture)
- `layers` (for layer-based tools)

**AI/Automation projects:**
- `terminal` (default for CLI/code tools)
- `wand-2` (for AI generation tools)
- `sparkles` (for AI/ML features)
- `workflow` (for automation)

Icons are never reused. If multiple projects could use the same icon, select the next available from the category's list.

## Phase 1 — Infer scope

1. **Page deploy**
   - frontmatter `slug` equals `/`, `/about`, `/projects`, `/contact`
   - or title indicates one of these pages
2. **Project deploy**
   - project-shaped keys (`category`, `tags`, `github`)
   - or slug is not one of the fixed page slugs
3. **Ambiguous**
   - ask exactly one targeted question

## Phase 2 — Normalize content

- drop wrappers like `File target`, `Frontmatter`, `Body Content`
- if frontmatter in fenced code block, extract as true YAML
- if body in fenced markdown, extract only body
- enforce `.md` output
- remove local/temp references from final content

## Phase 3 — Media processing

Only when files are provided and `--skip-media` is not set:

1. Check `inbox/` folder for new files
2. Move screenshots to `public/projects/<slug>/`
3. Move PDFs/docs to `public/projects/<slug>/`
4. Update screenshot paths in frontmatter

## Phase 4 — Publish integrity checks

For touched routes verify:

- required frontmatter keys exist
- URL fields are valid URLs
- screenshots have alt text
- no obvious secrets in content
- page/project slugs resolve correctly

### Conditional security review

Do **not** run for normal content deploys.

Trigger `security-review` only when changes touch:
- form/user-input handling
- API/server route behavior
- file upload/processing
- auth/access control
- external script injection
- redirect/header behavior

## Phase 5 — Validation gates

Always run build gate with Node 24:

```bash
npx -y -p node@24 -p npm@11 npm run build
```

Run check gate for schema-sensitive or structural changes:

```bash
npx -y -p node@24 -p npm@11 npm run check
```

If any gate fails: stop, report, do not commit.

## Phase 6 — Commit and push

Commit message defaults:

- page: `content(page): update <route>`
- project: `content(project): upsert <slug>`

Push to `main` unless `--skip-push`.

## Non-negotiable safety rules

- Never run `npm install`
- Never run `brew install`
- Never mutate system Node/npm/toolchains
- Never bypass checks without explicit request
