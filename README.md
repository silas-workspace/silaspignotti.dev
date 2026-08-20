# silaspignotti.dev

Source code for [silaspignotti.dev](https://silaspignotti.dev), the personal portfolio of Silas Pignotti. The site presents selected projects as business cases, a CV, and contact information, focused on geospatial data science, data analytics, and AI & automation.

## Tech Stack

- Astro 5 (static site generator)
- Node.js 24 (runtime, enforced via `.node-version` and `verify:node`)
- pnpm (package manager)
- TypeScript
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- React (interactive islands)
- Astro Content Collections (type-safe markdown content)
- GitHub Pages (hosting)

## Setup

```bash
# Requires Node 24 (see .node-version; your version manager should switch automatically)
pnpm install

# Development server (port 3010)
pnpm run dev

# Production build
pnpm run build

# Type checking
pnpm run check
```

## Project Structure

```
src/
├── components/       # Reusable Astro components and React islands
├── content/          # Content Collections (pages, projects)
├── layouts/          # Page layouts
├── lib/              # Utility functions
├── pages/            # Route-based pages
└── styles/           # Global styles and Tailwind setup
public/               # Static assets (fonts, images, project media)
```

## Content

All page and project content is stored as markdown with typed frontmatter:

- Pages: `src/content/pages/`
- Projects: `src/content/projects/`

Schemas are defined in `src/content.config.ts`. `pnpm run check` validates content against them.

## Deployment

Hosted on GitHub Pages. [GitHub Actions](.github/workflows/deploy.yml) runs `pnpm install --frozen-lockfile`, `check`, and `build` on every pull request and push to `main`, then deploys the built site on pushes to `main`.

## License

MIT