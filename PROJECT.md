## Identity

- **What:** Personal portfolio website. Project showcases as business cases plus profile pages.
- **Why:** Central professional presence for recruiters, freelance clients, and the developer community.
- **Type:** static-site
- **Category:** portfolio

## Architecture

- **Framework:** Astro 5.x
- **Theme:** [Developer Portfolio](https://github.com/cojocaru-david/portfolio)
- **Styling:** TailwindCSS
- **Content:** Astro Content Collections with Markdown (`src/content/pages`, `src/content/projects`)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions (push to `main` triggers deploy)
- **Live URL:** https://silas-workspace.github.io/silaspignotti.dev/

### Site Structure

```text
src/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   └── projects/
│       ├── index.astro
│       └── [...id].astro
├── content/
│   ├── pages/
│   │   ├── landing.md
│   │   ├── about.md
│   │   ├── projects.md
│   │   └── contact.md
│   └── projects/
├── components/
├── layouts/
└── lib/

public/
├── covers/
└── projects/
```

## Content Contract (Projects)

`src/content.config.ts` defines the project schema.

Required fields:

- `title`
- `slug`
- `description`
- `category` (`Geospatial` | `AI/Automation`)
- `tags`
- `github`
- `cover`
- `coverIcon`

Optional fields:

- `demo`
- `paper`
- `tagline`
- `featuredOrder`
- `downloads`
- `screenshots`

Featured landing logic:

- `featuredOrder` controls landing featured projects
- Lower number = higher priority
- Landing shows up to 3 projects with `featuredOrder`

## Notion Export Contract

- Canonical template: `docs/notion-project-export-spec.md`
- Export projects as `.md` (not `.mdx`) to `src/content/projects/<slug>.md`
- Use `tags` (not `stack`)
- Use category values: `Geospatial` | `AI/Automation`
- Use `cover: /covers/<slug>.png`
- For featured landing projects, include `featuredOrder`

## Media Workflow

Published media:

- Covers: `public/covers/<slug>.png`
- Project assets: `public/projects/<slug>/...`

Intake media:

- Stage raw files in `tmp/` (local only)
- Never reference `tmp/` in content

Process media with explicit mappings only:

```bash
npx tsx scripts/process-project-media.ts \
  --slug heatsense \
  --file "tmp/heatsense_screenshot.png -> screenshot-01.png" \
  --file "tmp/heatsense_report.pdf -> report.pdf"
```

## Cover Workflow

Generate missing covers:

```bash
npx tsx scripts/generate-cover.ts
```

Single project:

```bash
npx tsx scripts/generate-cover.ts --slug heatsense
```

Force regenerate:

```bash
npx tsx scripts/generate-cover.ts --force
```

## Deploy Workflow

Single command:

- `/deploy`

`/deploy` auto-detects whether pasted content is:

- page update
- project update
- batch update

Then it handles the full pipeline internally:

1. normalize messy Notion markdown wrappers
2. route content to the correct `src/content/...` file
3. run optional media processing for explicit file mappings
4. generate/update project covers when needed
5. run publish integrity checks (SEO/frontmatter/path hygiene)
6. validate (`build`, and `check` for structural/batch changes)
7. commit + push to `main`

## Design Workflow

Single command:

- `/design`

`/design` handles frontend/design/layout/config work and runs this internal pipeline:

1. load frontend design guidance
2. inspect local implementation patterns
3. reference base template patterns when relevant
4. implement requested UI/frontend/config updates
5. run SEO/integrity checks on touched routes
6. validate (`build`, and `check` for larger structural changes)
7. commit + push to `main`

## Security Review Behavior

- No always-on security skill for normal static content/design work
- Trigger security review only when changes touch forms/input, API/server routes, file processing, auth/session, external scripts/embeds, or redirect/header behavior

## Validation

- `npm run build` (required before commit)
- `npm run check` (schema/structure changes and larger pushes)

## Constraints

- Content is authored in Notion and exported to Markdown
- No CMS/admin UI
- No i18n in v1
- Keep customizations minimal; prefer existing theme patterns
