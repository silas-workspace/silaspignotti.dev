---
name: astro-setup
description: Bootstrap an Astro portfolio repository from PROJECT.md — lean setup with Astro, Node, optional content collections, and build-first validation suited to portfolio sites
---
## Purpose

Use this skill to initialize a new Astro portfolio project from `PROJECT.md`.

Repository category: `portfolio` — public-facing, presentable, polished. The setup should stay lightweight: prioritize a working build, clear structure, and clean content workflow over heavy tooling.

## PROJECT.md Format

```markdown
## Identity
- **What:** [1 sentence — what the site is]
- **Why:** [1 sentence — why it exists]
- **Type:** static-site

## Architecture
- **Framework:** Astro 5.x
- **Theme:** [Astro starter name, GitHub repo, or "none"]
- **Styling:** [TailwindCSS | CSS | project-specific stack]
- **Content:** [Markdown/MDX via Content Collections | none]
- **Hosting:** [GitHub Pages | Netlify | Vercel | none]
- **Domain:** [https://example.com or "none"]

## Objectives
### MVP
- [ ] [Concrete, testable goal]

### Non-Goals
- [What this does not do]

## Setup
- **Category:** portfolio
- **Git Remote:** [https://github.com/user/repo or "local only"]
```

Fields the skill reads:
- `name` → project directory and display name
- `what` / `why` → README and `AGENTS.md`
- `type` → site type (expected: `static-site`)
- `framework` → should be Astro
- `theme` → starter choice (`basics` if absent or `none`)
- `styling` → whether Tailwind or another styling layer should be added
- `content` → whether to create Content Collections scaffolding
- `hosting` and `domain` → config hints for `astro.config.mjs`
- `git_remote` → remote URL or `local only`

## Toolchain

- Node.js 22+
- npm by default unless the repo already standardizes on another package manager
- Astro
- optional: TailwindCSS, MDX, sitemap, and other Astro integrations only when the project clearly calls for them

## Default Scripts

The project should expose these scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

## Bootstrap Process

### 1. Read PROJECT.md

Parse all fields. Stop immediately if `PROJECT.md` is missing.

### 2. Guard Against Existing Projects

If the directory already contains an Astro app (`package.json`, `astro.config.*`, `src/`, or `public/`), stop and tell the user to set it up manually rather than rerunning `/astro-init`.

### 3. Scaffold Astro

Use the lightest non-interactive Astro scaffold that fits the project.

If `theme` is a supported Astro starter name or a GitHub `owner/repo` template:

```bash
npm create astro@latest . -- --template <theme> --install --no-git --yes --skip-houston
```

If `theme` is a full GitHub URL, convert it to `owner/repo` first.

If `theme` is absent or `none`, use the default basics starter:

```bash
npm create astro@latest . -- --template basics --install --no-git --yes --skip-houston
```

### 4. Keep the Setup Lean

Do not add a default unit test stack. For portfolio sites the baseline quality gate is:
- successful production build
- Astro diagnostics via `astro check`
- optional linting only if the chosen starter already includes it or the project explicitly calls for it

### 5. Configure the Project

After scaffold:
- ensure `package.json` has `dev`, `build`, `preview`, and `check` scripts
- set `site` in `astro.config.mjs` when the project has a real domain
- keep output static unless the project clearly needs server rendering
- keep starter dependencies only if they support the actual project; remove demo-only extras

### 6. Optional Integrations

Add integrations only when the project clearly asks for them:

- TailwindCSS styling → `npx astro add tailwind --yes`
- MDX content → `npx astro add mdx --yes`
- sitemap for real deployed sites → `npx astro add sitemap --yes`

Prefer the smallest useful set. Do not add React, Vue, or other island frameworks unless the project actually needs them.

### 7. Content Collections Setup

If `content` mentions Markdown, MDX, blog posts, portfolio entries, or Content Collections, add a minimal content structure:

```
src/
  content/
    config.ts
    blog/
    projects/
```

Create only the minimum schemas needed for the content described in `PROJECT.md`.

### 8. Generate .gitignore

Always include:

```
node_modules/
dist/
.astro/
.DS_Store
```

Add `.env` only if the project actually has secrets.

### 9. Generate README.md

The README should be presentable and lightweight. Include:
- what the site is
- why it exists
- setup commands
- build command
- deployment target if already decided

### 10. Fill AGENTS.md

The `AGENTS.md` template is already present in the project root — it was copied from the Astro portfolio template. Fill in the placeholders from `PROJECT.md` and the actual scaffolded stack.

### 11. Initialize Git

```bash
git init
git add .
git commit -m "chore: initial Astro project setup"
```

If `git_remote` is configured (not `local only`):

```bash
git remote add origin <url>
git push -u origin main
```

If push fails: stop and report init is incomplete — likely causes: remote does not exist, wrong URL, or auth issue.

### 12. Verify

```bash
OPENCODE_CONFIG=./opencode.json opencode --help >/dev/null
npm run build
npm run check
```

If `check` is not available yet, add it before verification. All checks must be green before declaring success.

### 13. Summary

Report:
- project name, starter/theme, hosting target, and key integrations added
- package manager used
- git status: committed on main; remote push result if configured
- build/check result
- next step: start `auto` with `PROJECT.md`, or use `build`/`plan` for manual work

## Astro Workflow Guidance

- prefer Astro pages, layouts, and content collections before introducing client frameworks
- keep most content server-rendered or static; use islands only for clear interactive needs
- use `npm run build` as the main confidence gate; it catches route/content/config issues early
- use `npm run check` for `.astro` diagnostics and content schema feedback

## Guiding Principles

Scaffold only — the purpose of init is a working site skeleton, not a finished portfolio.

Keep the setup lean — portfolio websites usually need a clean build and content model more than a heavy test stack.

Preserve starter simplicity — remove demo content and adapt the starter, but do not over-engineer the template before the real site work begins.
