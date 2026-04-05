# Notion Project Export Spec

This document defines the canonical Notion-to-repo export format for project entries.

Publishing note:

- Paste exports into chat and use `/deploy`.
- `/deploy` can normalize messy Notion wrappers, but this spec remains the preferred clean format for predictable results.

## Output contract

For each project export, return exactly these sections in this order:

1. `## Project Markdown`
2. `## File Mapping`
3. `## Cover Recommendation`

## 1) Project Markdown

Target file:

```text
src/content/projects/<slug>.md
```

Use this frontmatter shape:

```yaml
---
title: "<project title>"
slug: "<kebab-case slug>"
description: "<short SEO-safe summary>"
category: "<Geospatial | AI/Automation>"
tags:
  - "<tag 1>"
  - "<tag 2>"
github: "<github url>"
demo: "<demo url>"      # omit when empty
paper: "<paper url>"    # omit when empty
cover: "/covers/<slug>.png"
coverIcon: "<lucide icon name>"
tagline: "<hero one-liner>"
featuredOrder: <number>  # required when project should appear on landing featured section
screenshots:
  - src: "/projects/<slug>/screenshot-01.png"
    alt: "<descriptive alt text>"
downloads:
  - label: "<human-readable label>"
    href: "/projects/<slug>/report.pdf"
---
```

Rules:

- Use `.md`, not `.mdx`
- `slug` must be kebab-case
- `cover` must always be `/covers/<slug>.png`
- `category` must be exactly `Geospatial` or `AI/Automation`
- Use `tags`, not `stack`
- Include `featuredOrder` for projects that should appear on landing (`1` = highest priority)
- Omit empty optional fields
- Never reference `tmp/`, `public/`, Notion URLs, or local filesystem paths
- Screenshot/download paths must be final published paths under `/projects/<slug>/...`

If an export includes wrapper blocks like `File target`, `Frontmatter`, or `Body Content`, `/deploy` strips those wrappers before writing the canonical markdown file.

Body sections (in order; omit if empty):

```md
## Problem

...

## Solution

...

## Result

...

## Lessons Learned

...

## Deep Dive

...
```

Do not add `## Links` or `## Visuals` sections to the body. Use structured frontmatter fields instead.

## 2) File Mapping

Provide explicit intake-to-final mapping lines:

```md
## File Mapping
- <source export filename> -> screenshot-01.png
- <source export filename> -> screenshot-02.png
- <source export filename> -> report.pdf
```

Rules:

- Include only files for this project
- Destination must be filename only (no nested path)
- Screenshots should be sequentially numbered
- Documents should use stable names (`report.pdf`, `case-study.pdf`, `slides.pdf`)

Mapped files are processed into:

```text
public/projects/<slug>/
```

## 3) Cover Recommendation

```md
## Cover Recommendation
coverIcon: "<lucide icon name>"
Reason: "<one short sentence>"
```

Use one icon that best represents the project.

## Writing constraints

- Tone: factual, honest, confident
- No hype language
- No marketing fluff
- Description should work for SEO + project cards
- Alt text should be descriptive and practical
