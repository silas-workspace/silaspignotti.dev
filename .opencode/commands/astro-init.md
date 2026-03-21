---
description: Bootstrap this Astro portfolio project from PROJECT.md
agent: build
---
Initialize this Astro portfolio project from `PROJECT.md`.

Load the local `astro-setup` skill and execute the full bootstrap process.

Guards — stop immediately if:
- `PROJECT.md` is missing in the current directory
- the directory already has a `package.json`, `astro.config.mjs`, `astro.config.ts`, `src/`, or `public/` — use manual setup instead of `/astro-init`

The skill will:
1. read `PROJECT.md` and extract project name, site purpose, theme/starter, styling, content setup, hosting, domain, and git remote
2. scaffold a minimal Astro site, install dependencies, and ensure a `check` script is present
3. generate or update `.gitignore`, `README.md`, `AGENTS.md`, and Astro config files for the chosen setup
4. add lightweight content-collection structure when the project needs in-repo portfolio/blog content
5. initialize git, commit, and push to remote if configured
6. verify: `OPENCODE_CONFIG=./opencode.json opencode --help >/dev/null`, `npm run build`, and `npm run check` must be green

Scaffold only — do not implement the actual site content or custom design from `PROJECT.md`.
Keep the setup lean: no default test suite unless the project explicitly needs one.
