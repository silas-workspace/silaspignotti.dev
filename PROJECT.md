## Identity

- **What:** Personal portfolio and blog website. Project showcases as business cases, technical blog, CV, and contact hub.
- **Why:** Central professional presence for recruiters, freelance clients, and the developer community. Replaces scattered profiles with a single, curated source of truth.
- **Type:** static-site
- **Category:** portfolio

## Architecture

- **Framework:** Astro 5.x (static site generator)
- **Theme:** [Developer Portfolio](https://github.com/cojocaru-david/portfolio) (cloned, not forked: clean history, full control)
- **Styling:** TailwindCSS (via theme)
- **Content:** Markdown/MDX via Astro Content Collections (type-safe, schema-validated)
- **Hosting:** GitHub Pages (free, custom domain)
- **CI/CD:** GitHub Actions (auto-deploy on push to main)
- **Domain:** [silaspignotti.dev](http://silaspignotti.dev)

### Site Structure

```
src/
├── components/         # Reusable UI components (.astro)
├── layouts/            # Page layouts (BaseLayout, BlogPostLayout, ProjectLayout)
├── pages/
│   ├── index.astro          # Landing Page (Hero + What I Do + Tech Stack + CTA)
│   ├── about.astro          # Bio + CV (Experience, Education, Skills)
│   ├── contact.astro        # Contact info + social links
│   ├── projects/
│   │   ├── index.astro      # Portfolio overview (grid, filterable by category)
│   │   └── [slug].astro     # Dynamic project detail page
│   └── blog/
│       ├── index.astro      # Blog overview (by category)
│       └── [slug].astro     # Dynamic blog post page
├── content/
│   ├── config.ts            # Content Collection schemas
│   ├── projects/            # Markdown files per portfolio project
│   │   └── building-detector.md
│   └── blog/                # Markdown/MDX files per blog post
│       └── first-post.md
└── styles/                  # Global styles, Tailwind config overrides
```

### Content Collections Schema

```tsx
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.enum(['Geo Data Science', 'AI/Automation']),
    stack: z.array(z.string()),
    github: z.string().url().optional(),
    featured: z.boolean().default(false),
    sortOrder: z.number().default(0),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Geo & Remote Sensing',
      'AI & Automation',
      'Tools & Workflows',
      'Career & Reflections',
    ]),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    pubDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
```

### Project Markdown Format

```markdown
---
title: "building-detector"
tagline: "Automated building footprint detection from satellite imagery using SAM2."
category: "Geo Data Science"
stack: ["Python", "SAM2", "Rasterio", "GeoPandas"]
github: "https://github.com/silas-workspace/building-detector"
featured: true
sortOrder: 1
---

## Problem
[Context and pain point]

## Solution
[What was built, key technical decisions]

## Result
[Outcomes, demonstrated competence]
```

## Objectives

### MVP (v1)

- [ ]  Clone theme, strip demo content, configure for [silaspignotti.dev](http://silaspignotti.dev)
- [ ]  Set up Content Collections with project and blog schemas
- [ ]  Implement Landing Page (Hero, What I Do, Tech Stack, CTA)
- [ ]  Implement About & CV page (Bio, Experience, Education, Skills)
- [ ]  Implement Contact page (info + social links)
- [ ]  Implement Projects overview (grid/list, category filter) + detail pages
- [ ]  Implement Blog overview + post pages (Markdown rendering)
- [ ]  Migrate 5 portfolio-ready projects from Notion Content-Spiegel to Markdown
- [ ]  Set up GitHub Actions deployment to GitHub Pages
- [ ]  Configure custom domain ([silaspignotti.dev](http://silaspignotti.dev))
- [ ]  SEO basics: meta tags, Open Graph, sitemap, robots.txt

### Non-Goals

- CMS or admin UI (content managed in Notion, exported as Markdown)
- Comments, interactions, or user-generated content
- Analytics (add Plausible in v1.1)
- i18n / multi-language support
- Notion-to-Markdown automation (manual handoff for v1)
- Newsletter / mailing list
- Search functionality
- Custom component development beyond theme customization

## Constraints

- **Blocker:** GitHub profile and repo structure (GitHub Housekeeping project) should be presentable before website goes live.
- **Content tone:** Factual, honest, confident. No self-branding theater. Projects speak for themselves.
- **Minimal customization:** Theme is the baseline. v1 = colors, content, minor layout tweaks. No custom components unless strictly necessary.
- **Content source:** All page content comes from Notion Content-Spiegel (5 subpages). Projects and blog posts are converted to Markdown with frontmatter matching the Content Collection schemas.

## Setup

- **Category:** portfolio
- **Git Remote:** https://github.com/silas-workspace/silaspignotti.dev

### Setup Steps

```bash
# 1. Clone theme repo
git clone https://github.com/cojocaru-david/portfolio silaspignotti.dev

# 2. Remove original git history
cd silaspignotti.dev && rm -rf .git

# 3. Initialize fresh repo
git init
git remote add origin https://github.com/silas-workspace/silaspignotti.dev.git

# 4. Install dependencies
npm install

# 5. Start dev server
npm run dev

# 6. Strip demo content, configure site metadata
# 7. Add Content Collections + Markdown files
```

## Context

- **Product Spec:** Notion subpage under Website project (Artefakte)
- **Content-Spiegel:** 5 Notion subpages (Landing Page, About & CV, Contact, My Projects, Blog) as SSOT
- **Portfolio-Projekte DB:** 12 projects total, 5 portfolio-ready with full business case content
- **Blog-Artikel DB:** Structure ready, no published articles yet

### Decisions

| # | Question | Decision | Rationale |
| --- | --- | --- | --- |
| 1 | Framework | Astro | Content-first SSG, Markdown-native, islands architecture for future interactivity |
| 2 | Theme strategy | Clone (not fork) | Clean history, full control, no upstream dependency |
| 3 | Hosting | GitHub Pages | Free, simple, GitHub-native CI/CD |
| 4 | Content source | Notion Content-Spiegel to Markdown | SSOT in Notion (where planning happens), static export for performance |
| 5 | Blog engine | Astro Content Collections | Type-safe schemas, frontmatter validation, same stack as portfolio |
| 6 | Alternatives rejected | Jekyll, Next.js, Framer, Notion Site | Ruby/not in stack, overpowered, vendor lock-in, too limited |
