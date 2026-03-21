# silaspignotti.dev

Personal portfolio and blog website built with Astro.

## What

Professional portfolio showcasing projects as business cases, technical blog posts, CV, and contact information.

## Why

Central professional presence for recruiters, freelance clients, and the developer community. Replaces scattered profiles with a single, curated source of truth.

## Tech Stack

- Astro 5.x (static site generator)
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
├── content/           # Content Collections (blog, projects)
├── layouts/           # Page layouts
├── pages/             # Route-based pages
└── styles/            # Global styles
```

## Content

- **Blog posts**: Add markdown files to `src/content/blog/`
- **Projects**: Add markdown files to `src/content/projects/`

Both collections use type-safe schemas defined in `src/content.config.ts`.

## Deployment

Hosted on GitHub Pages. Auto-deploys on push to main via GitHub Actions.

## License

MIT
