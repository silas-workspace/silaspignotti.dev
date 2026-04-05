---
name: project-media
description: Process explicitly declared project media files and place them in public/projects/<slug> during project deploys. Use for screenshots and PDFs. Never auto-scan tmp globally.
---

# Project Media Skill

Use this skill when a project deploy includes files (screenshots, PDFs, attachments).

## Rules

- Process only files explicitly declared by the user in the command input.
- Never auto-scan `tmp/` globally.
- Published assets must live under `public/projects/<slug>/`.
- Project content must reference published paths (`/projects/<slug>/...`), never `tmp/...`.

## Input mapping format

Use one mapping per file:

```text
tmp/source-file.png -> screenshot-01.png
tmp/my-report.pdf -> report.pdf
```

Destination must be a filename only (no nested path).

## Execution

Run:

```bash
npx tsx scripts/process-project-media.ts --slug <slug> --file "tmp/source.png -> screenshot-01.png"
```

For multiple files, pass `--file` multiple times.

Default mode is copy (safe). Use `--move` only when explicitly requested.

## Expected effects

- Copies/moves declared files into `public/projects/<slug>/`
- Upserts `screenshots` entries for image files
- Upserts `downloads` entries for PDF files
- Leaves undeclared files untouched

## Output format

```text
COPY   tmp/heatsense_screenshot.png -> /projects/heatsense/screenshot-01.png
COPY   tmp/heatsense_report.pdf -> /projects/heatsense/report.pdf
Summary: screenshots=2, downloads=1, mode=copy
```
