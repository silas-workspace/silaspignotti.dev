# silaspignotti.dev

Personal portfolio website. Central professional presence for recruiters, freelance clients, and the developer community. Replaces scattered profiles with a single, curated source of truth.

## Repository Category

`portfolio` — public-facing, presentable, polished.

- feature branches preferred for meaningful work; direct commits to `main` acceptable for small changes
- conventional commits always
- README quality matters — keep it accurate, clear, and presentable
- no formal release process needed

## Tech Stack

- Astro 5.x
- Node.js 24+
- npm — default package manager
- TypeScript via Astro tooling
- TailwindCSS (via theme)
- React (islands for interactivity)
- Content Collections (type-safe markdown content)

## Theme Reference

- Base template: https://github.com/cojocaru-david/portfolio
- For visual updates or feature additions, check the base template first for existing components, patterns, and options before introducing custom implementations.
- Treat this repository as the source of truth for current behavior; use the base template as a capabilities reference.

## Project Type

`static-site` — generates static HTML for GitHub Pages deployment

## Structure

```
src/
  pages/         # route-based pages
  components/    # reusable Astro/UI components + React islands
  layouts/       # shared page layouts
  content/       # Content Collections (pages, projects)
  lib/           # utility functions
  styles/        # global styles, Tailwind config
public/          # static assets (fonts, images)
```

## Validation

- `npm run build` — required validation gate before every commit
- `npm run check` — run for structural changes, content schema changes, and before larger pushes
- `npm run dev` — local development server (port 3010)
- `npm run preview` — preview the production build locally

## Deploy Workflow (Internal)

- Use `/deploy` for content publishing workflows
- `/deploy` auto-detects whether pasted content is a page update, project update, or batch update
- `/deploy` normalizes messy Notion markdown wrappers and routes content to the correct `src/content/...` path
- `/deploy` runs optional media + cover steps when needed, performs publish checks, validates, then commits and pushes

## Design Workflow (Internal)

- Use `/design` for frontend/design/layout/config requests
- `/design` loads `frontend-design`, references the base template lineage, and implements UI work using existing local patterns first
- `/design` runs SEO/integrity checks for touched routes, validates, then commits and pushes

## Security Workflow (Internal)

- No always-on security skill is required for normal static content/design changes
- Trigger `security-review` only when changes touch user input, API/server handlers, file processing, auth/session, external script embeds, or security-relevant redirect/header behavior

## Astro Conventions

- keep the site static-first; add client islands only when interactivity clearly needs them
- use Astro Content Collections for structured page and project content
- preserve performance and simplicity over novelty
- content managed in Notion, exported as Markdown with frontmatter

## Conventions

- follow existing patterns before introducing new ones
- keep the README honest and presentable — this is portfolio work
- minimal customization: theme is the baseline, v1 = colors, content, minor layout tweaks
- content tone: factual, honest, confident. Projects speak for themselves.

## Library Documentation

Context7 MCP is available in this project. When working with any external library, use it to fetch current, version-specific documentation rather than relying on training data. Invoke with the library name or a Context7 library ID (e.g. `/withastro/astro`, `/tailwindlabs/tailwindcss`).

## Known Constraints

- Content source: All page and project content comes from Notion Content-Spiegel and is exported to Markdown with frontmatter matching Content Collection schemas.
- Blocker: GitHub profile and repo structure should be presentable before website goes live.
- No CMS or admin UI (content managed in Notion, exported as Markdown)
- No i18n / multi-language support in v1
