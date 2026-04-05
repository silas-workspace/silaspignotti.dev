---
name: technical-seo
description: Run technical SEO checks/fixes after content deployment for pages and project routes. Never rewrite editorial copy.
---

# Technical SEO Skill

Use this skill after `/deploy-page`, `/deploy-project`, and `/deploy-all`.

## Non-Negotiable Rules

- Do **not** rewrite page copy for tone, style, or persuasion.
- Only change technical SEO concerns and machine-readable metadata.
- Keep fixes minimal and route-scoped.
- Do **not** install dependencies or mutate the system toolchain in this skill (`npm install`, `brew install`, global Node/npm changes).
- If validation cannot run in the current environment, fail with a clear instruction and use explicit Node 22 runtime wrappers.

## Scope

### 1) Frontmatter and metadata

For each deployed route, verify content frontmatter has:

- `title`
- `description`
- `slug`
- `ogImage` (optional, fallback allowed)

Ensure page templates pass title/description/og image to `PageHead`.

### 2) Meta tags

Verify final markup includes:

- `<meta name="description">`
- `og:title`, `og:description`, `og:image`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- canonical URL

### 3) Structured data

- About page (`/about`): Person schema with
  - name: Silas Pignotti
  - jobTitle: Geo Data Scientist
  - location: Berlin
- Breadcrumb pages: Breadcrumb schema present
- Project detail pages: Project schema present

### 4) Indexing

- `robots.txt` route exists and points to sitemap
- sitemap route includes deployed pages and project detail pages

### 5) Content structure validation

- exactly one `h1` per page
- heading hierarchy should not skip levels unexpectedly
- all images require non-empty alt text
- internal links resolve to existing routes/content
- no orphan project pages (every project reachable from `/projects`)

## Severity

### Blockers (must fail deploy)

- Missing required frontmatter (`title`, `description`, `slug`)
- Broken internal links on deployed routes
- Missing required project frontmatter (`cover`, `github`, `category`, `tags`)
- Missing `h1`

### Warnings (deploy may proceed)

- Description length outside recommended range
- Fallback og image used
- Minor heading-depth issues
- Missing optional social/profile metadata

## Output format

Return one section per route:

```text
SEO Check: /about
[OK] Frontmatter complete
[OK] Meta description: "..."
[OK] OG tags set
[OK] Heading hierarchy valid
[WARN] Missing alt text on 1 image
[OK] Internal links valid
```

Finish with:

- `Blockers: <n>`
- `Warnings: <n>`
- `Deploy gate: PASS|FAIL`
