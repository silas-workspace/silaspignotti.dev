---
name: site-design
description: Unified frontend/design/config workflow for this portfolio. Uses frontend-design guidance, checks base template patterns, validates SEO/integrity, then commits and pushes.
---

# Site Design Skill

Use this skill for **all UI/frontend/config requests** in this repository.

Single entrypoint: `/design`

## Goal

Given a design/frontend/config request in chat, deliver implementation-quality changes end-to-end:

1. inspect current local patterns
2. check relevant template lineage patterns
3. implement requested frontend/design/config changes
4. verify SEO/integrity and accessibility for touched routes
5. validate
6. commit and push

## Inputs

- Primary input: natural-language request, optional screenshot/mockup
- Optional flags:
  - `--dry-run`
  - `--skip-check`
  - `--skip-push`
  - `--message "..."`
  - `--route "/..."`
  - `--component "..."`

## Required workflow

1. Load `frontend-design` skill first.
2. Read 3-5 relevant files in affected area before editing.
3. Preserve existing local design system conventions first.
4. Reference base template capabilities:
   - https://github.com/cojocaru-david/portfolio
   - borrow established patterns before introducing custom abstractions.

## Change scope

Typical `/design` work includes:

- page layout and hierarchy improvements
- card/component visual polish
- responsive behavior improvements
- interaction and animation tuning (respect reduced motion)
- frontend presentation config related to visuals, metadata handoff, or UX polish

Avoid scope bleed into content-deploy ingestion logic (that belongs to `/deploy`).

## SEO and integrity checks (always)

For touched routes/components verify:

- exactly one `<h1>` per page
- heading hierarchy remains sensible
- `PageHead` integration remains intact (title/description/canonical/og)
- image alt text remains present
- internal links still resolve
- no accidental route/base-path regressions

## Conditional security review (not always-on)

Do **not** run heavy security review for normal static visual changes.

Trigger `security-review` skill only when the change touches security-relevant surface:

- user input/forms handling
- API endpoints/server handlers
- file upload/processing logic
- auth/session/access control
- external script/embed injection
- redirect/header/cookie/security policy behavior

If triggered, run `security-review` before final commit.

## Validation gates

Always run build gate:

```bash
npx -y -p node@24 -p npm@11 npm run build
```

Run check gate for structural or larger frontend/config changes (unless `--skip-check`):

```bash
npx -y -p node@24 -p npm@11 npm run check
```

If a gate fails: stop, report, do not commit.

## Commit and push

Stage only intended files.

Commit message defaults:

- `feat(ui): implement requested design updates`
- `fix(ui): polish layout and responsiveness`
- `chore(ui): adjust frontend config and seo checks`

Use `--message` override when provided.

Push to `main` unless `--skip-push`.

## Non-negotiable safety rules

- Never run `npm install` in this workflow
- Never run `brew install` in this workflow
- Never mutate system Node/npm/toolchains in this workflow
- Never bypass checks/hooks without explicit user request
