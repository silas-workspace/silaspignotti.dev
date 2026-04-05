---
name: site-deploy
description: Unified portfolio deployment workflow. Auto-detect page/project/batch content, normalize Notion markdown, optionally process media and covers, run publish checks, validate, then commit and push.
---

# Site Deploy Skill

Use this skill for **all** content publishing in this repository.

Single entrypoint: `/deploy`

## Goal

Given content pasted in chat, handle the complete publish workflow end-to-end:

1. infer content type (page/project/batch)
2. normalize and route to correct files
3. run optional media and cover steps
4. run SEO/integrity checks
5. run validation
6. commit and push

## Inputs

- Primary input: pasted content in chat
- Optional command flags:
  - `--all`
  - `--dry-run`
  - `--skip-media`
  - `--skip-cover`
  - `--skip-check`
  - `--skip-push`
  - `--message "..."`
  - repeated `--file "tmp/source.ext -> final-name.ext"`

## Repository contracts

Pages:

- `src/content/pages/landing.md`
- `src/content/pages/about.md`
- `src/content/pages/projects.md`
- `src/content/pages/contact.md`

Projects:

- `src/content/projects/<slug>.md`

Project schema (from `src/content.config.ts`):

- required: `title`, `description`, `slug`, `category`, `tags`, `github`, `cover`, `coverIcon`
- optional: `tagline`, `demo`, `paper`, `featuredOrder`, `downloads`, `screenshots`

Published media:

- covers: `public/covers/<slug>.png`
- project assets: `public/projects/<slug>/...`

## Phase 1 — Infer scope and targets

Infer in this order:

1. **Batch deploy**
   - multiple content blocks or explicit file targets
   - or `--all`
2. **Page deploy**
   - frontmatter `slug` equals `/`, `/about`, `/projects`, `/contact`
   - or wrapper/title clearly indicates one of those pages
3. **Project deploy**
   - includes project-shaped keys (`category`, `tags`, `github`, `cover`, `coverIcon`)
   - or slug is not one of the fixed page slugs
4. **Fallback**
   - infer from file target/title/body context
5. **Ambiguous**
   - ask exactly one targeted question

Routing:

- `/` -> `src/content/pages/landing.md`
- `/about` -> `src/content/pages/about.md`
- `/projects` -> `src/content/pages/projects.md`
- `/contact` -> `src/content/pages/contact.md`
- project -> `src/content/projects/<slug>.md`

## Phase 2 — Normalize pasted content

Normalize before writing files:

- drop wrappers like `File target`, `Frontmatter`, `Body Content`, `Media`
- if frontmatter appears in fenced code block, extract as true YAML frontmatter
- if body appears in fenced markdown, extract only body
- remove duplicate paragraphs/sections from copy-paste merges
- enforce `.md` output (no `.mdx`)
- remove local/temp references (`tmp/`, local file paths, Notion URLs) from final published content

Landing-specific rules:

- do not allow manual featured-project section in landing markdown
- do not keep plain markdown tech-stack chips if they duplicate rendered UI sections

Project-specific rules:

- `slug` must match target filename
- normalize `cover` to `/covers/<slug>.png` when safe
- map ad hoc links/visuals into frontmatter fields when possible (`demo`, `paper`, `downloads`, `screenshots`)
- keep screenshot/download paths under `/projects/<slug>/...`

## Phase 3 — Optional media and cover tasks

Media processing (only when mappings are explicitly provided and `--skip-media` is not set):

```bash
npm run process:project-media -- --slug <slug> --file "tmp/source.ext -> final-name.ext"
```

Cover generation (for touched/new project slugs unless `--skip-cover`):

```bash
npm run generate:cover -- --slug <slug>
```

Use `--force` only when explicitly requested.

## Phase 4 — Publish integrity checks

For touched routes/files verify:

- required frontmatter keys exist
- URL fields are valid URLs where schema requires them
- no `tmp/` references remain in final markdown/frontmatter
- screenshots have alt text
- no obvious secrets in staged content
- page/project slugs resolve to expected route structure

### Conditional security review (not always-on)

Do not run heavy security review for normal static content deploys.

Trigger `security-review` skill only when deploy changes touch security-relevant surface:

- form/user-input handling
- API/server route behavior
- file upload/processing logic
- auth/session/access control
- external script/embed injection
- redirect/header/cookie/security policy behavior

If triggered, run `security-review` before commit.

## Phase 5 — Validation gates

Always run build gate with Node 24 wrapper:

```bash
npx -y -p node@24 -p npm@11 npm run build
```

Run check gate when `--all` is used, schema-sensitive files changed, or structural edits are present (unless `--skip-check`):

```bash
npx -y -p node@24 -p npm@11 npm run check
```

If any gate fails: stop, report failures, do not commit.

## Phase 6 — Commit and push

Stage only intended files.

Commit message defaults:

- page: `content(page): update <route>`
- project: `content(project): upsert <slug>`
- batch: `content: deploy batch update`

If `--message` is provided, use it.

Push behavior:

- push to `main` unless `--skip-push`
- do not use force push

## Non-negotiable safety rules

- Never run `npm install` in this workflow
- Never run `brew install` in this workflow
- Never mutate system Node/npm/toolchains in this workflow
- Never bypass checks/hooks without explicit user request
