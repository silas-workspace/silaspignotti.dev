---
description: Unified frontend/design/config workflow with SEO checks and git finalization
agent: build
---

Implement frontend, design, and presentation-focused config work from this chat request.

Command input: `$ARGUMENTS` (optional flags).

Behavior:

1. Load and run the `site-design` skill.
2. Use the request and any screenshots/mockups as design input.
3. Preserve existing patterns and check template lineage before custom changes.
4. Implement requested UI/frontend/config work.
5. Run SEO/integrity checks for touched routes.
6. Validate, then commit and push.

Supported optional flags:

- `--dry-run`
- `--skip-check`
- `--skip-push`
- `--message "<custom commit message>"`
- `--route "</path>"`
- `--component "<name>"`

Safety:

- Never run `npm install` in this flow.
- Never run `brew install` in this flow.
- Never mutate global system toolchains in this flow.
- Run validation directly via `npm run build` (and `npm run check` when needed).
