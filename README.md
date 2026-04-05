# silaspignotti.dev

Personal portfolio website built with Astro.

## What

Professional portfolio showcasing projects as business cases, CV, and contact information.

## Why

Central professional presence for recruiters, freelance clients, and the developer community. Replaces scattered profiles with a single, curated source of truth.

## Tech Stack

- Astro 5.x (static site generator)
- Node.js 24.x (runtime)
- TailwindCSS (styling)
- React (interactive islands)
- TypeScript
- Content Collections (type-safe markdown content)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run check
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── content/           # Content Collections (pages, projects)
├── layouts/           # Page layouts
├── pages/             # Route-based pages
└── styles/            # Global styles
```

## Content

- **Pages**: Edit markdown files in `src/content/pages/`
- **Projects**: Add markdown files to `src/content/projects/`

Both collections use type-safe schemas defined in `src/content.config.ts`.

## Internal Publishing Workflow

Use one internal command for content publishing:

- `/deploy`

`/deploy` will:

1. detect whether pasted content is a page update, project update, or batch update
2. normalize messy Notion markdown wrappers automatically
3. route content to the correct `src/content/...` destination
4. run optional media/cover steps when needed
5. run publish checks + validation
6. commit and push to `main`

## Deployment

Hosted on GitHub Pages. Auto-deploys on push to main via GitHub Actions.

## License

MIT
