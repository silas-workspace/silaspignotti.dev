---
description: Unified content deploy for pages, projects, and batch updates
agent: build
---

Deploy the content provided in this chat using one unified workflow.

Command input: `$ARGUMENTS` (optional flags only).

Behavior:

1. Load and run the `site-deploy` skill.
2. Treat pasted chat content as source of truth.
3. Auto-detect deploy scope internally:
   - page update
   - project update
   - batch update
4. Auto-route content to target file paths.
5. Normalize messy Notion markdown exports before writing.
6. Run publish checks, validation, then conventional commit and push.

Supported optional flags:

- `--all`
- `--dry-run`
- `--skip-media`
- `--skip-cover`
- `--skip-check`
- `--skip-push`
- `--message "<custom commit message>"`
- `--file "tmp/source.ext -> final-name.ext"` (repeatable)

Safety:

- Never run `npm install` in this flow.
- Never run `brew install` in this flow.
- Never mutate global system toolchains in this flow.
- Use Node 24 wrapper runtime for validation commands.
