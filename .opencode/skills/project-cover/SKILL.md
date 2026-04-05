---
name: project-cover
description: Generate portfolio project cover images in public/covers from project frontmatter (coverIcon, slug, cover). Use after project deploys and batch deploys. Skip regeneration by default unless missing, icon changed, or force requested.
---

# Project Cover Skill

Use this skill when project content is created or updated.

## Purpose

Generate deterministic 1200x675 PNG covers for project cards and project detail pages.

## Data source

- Read projects from `src/content/projects/*.md`
- Required fields: `slug`, `cover`, `coverIcon`
- Generated output path: `public/covers/<slug>.png`

## Execution

Safety rules:

- Do not run `npm install` in this workflow.
- Do not run `brew install` in this workflow.
- Do not modify system Node/npm/toolchain state.

Run:

```bash
npx tsx scripts/generate-cover.ts
```

When only one project was touched, run:

```bash
npx tsx scripts/generate-cover.ts --slug <slug>
```

When a full regeneration is explicitly requested, run:

```bash
npx tsx scripts/generate-cover.ts --force
```

## Skip policy

Do not regenerate existing covers by default if icon and slug are unchanged.
Regenerate only when:

- project is new
- cover is missing
- `coverIcon` changed
- `--force` is requested

## Output format

Report one line per touched project:

```text
GEN      heatsense -> public/covers/heatsense.png (icon: thermometer)
SKIP     kitamap -> public/covers/kitamap.png (existing cover, icon unchanged)
WARN     renamr -> fallback icon 'code-2' used
```

Then print:

- generated count
- skipped count
- fallback warning count
