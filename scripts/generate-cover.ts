import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { createRequire } from 'node:module'
import { createElement as h } from 'react'

type ManifestEntry = {
  icon: string
  generatedAt: string
}

type CoverManifest = Record<string, ManifestEntry>

type ProjectFrontmatter = {
  slug?: string
  cover?: string
  coverIcon?: string
}

type ResolvedIcon = {
  svg: string
  fallbackUsed: boolean
  iconName: string
}

type SvgElement = {
  tag: string
  attrs: Record<string, string | number | undefined>
  children?: SvgElement[]
}

type ParsedSvg = {
  viewBox: string
  elements: SvgElement[]
}

const ROOT = process.cwd()
const PROJECTS_DIR = path.join(ROOT, 'src/content/projects')
const COVERS_DIR = path.join(ROOT, 'public/covers')
const MANIFEST_PATH = path.join(COVERS_DIR, '.cover-manifest.json')

const WIDTH = 1200
const HEIGHT = 675
const ICON_SIZE = 180
const BACKGROUND = '#121212'
const GOLD = '#c9a84c'
const FALLBACK_ICON = 'code-2'

function parseArgs() {
  const args = process.argv.slice(2)
  let slug: string | undefined
  let force = false

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--force') {
      force = true
      continue
    }

    if (arg === '--slug') {
      slug = args[index + 1]
      index += 1
    }
  }

  return { slug, force }
}

function toKebabCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
}

async function loadManifest(): Promise<CoverManifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8')
    return JSON.parse(raw) as CoverManifest
  } catch {
    return {}
  }
}

async function saveManifest(manifest: CoverManifest) {
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

function parseSvgPaths(rawSvg: string): ParsedSvg {
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  const elements: SvgElement[] = []

  const pathRegex = /<path([^>]*)\/>/g
  let match
  while ((match = pathRegex.exec(rawSvg)) !== null) {
    const attrsStr = match[1]
    const attrs: Record<string, string | number | undefined> = {
      stroke: GOLD,
      fill: 'none',
      'stroke-width': 2,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }

    const attrMatches = attrsStr.matchAll(/(\w+(?:-\w+)?)="([^"]*)"/g)
    for (const [, key, value] of attrMatches) {
      attrs[key] = value
    }

    elements.push({ tag: 'path', attrs })
  }

  const polygonRegex = /<polygon([^>]*)\/>/g
  while ((match = polygonRegex.exec(rawSvg)) !== null) {
    const attrsStr = match[1]
    const attrs: Record<string, string | number | undefined> = {
      stroke: GOLD,
      fill: 'none',
      'stroke-width': 2,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }

    const attrMatches = attrsStr.matchAll(/(\w+(?:-\w+)?)="([^"]*)"/g)
    for (const [, key, value] of attrMatches) {
      attrs[key] = value
    }

    elements.push({ tag: 'polygon', attrs })
  }

  const circleRegex = /<circle([^>]*)\/>/g
  while ((match = circleRegex.exec(rawSvg)) !== null) {
    const attrsStr = match[1]
    const attrs: Record<string, string | number | undefined> = {
      stroke: GOLD,
      fill: 'none',
      'stroke-width': 2,
    }

    const attrMatches = attrsStr.matchAll(/(\w+(?:-\w+)?)="([^"]*)"/g)
    for (const [, key, value] of attrMatches) {
      attrs[key] = value
    }

    elements.push({ tag: 'circle', attrs })
  }

  const rectRegex = /<rect([^>]*)\/>/g
  while ((match = rectRegex.exec(rawSvg)) !== null) {
    const attrsStr = match[1]
    const attrs: Record<string, string | number | undefined> = {
      stroke: GOLD,
      fill: 'none',
      'stroke-width': 2,
    }

    const attrMatches = attrsStr.matchAll(/(\w+(?:-\w+)?)="([^"]*)"/g)
    for (const [, key, value] of attrMatches) {
      attrs[key] = value
    }

    elements.push({ tag: 'rect', attrs })
  }

  const lineRegex = /<line([^>]*)\/>/g
  while ((match = lineRegex.exec(rawSvg)) !== null) {
    const attrsStr = match[1]
    const attrs: Record<string, string | number | undefined> = {
      stroke: GOLD,
      fill: 'none',
      'stroke-width': 2,
      'stroke-linecap': 'round',
    }

    const attrMatches = attrsStr.matchAll(/(\w+(?:-\w+)?)="([^"]*)"/g)
    for (const [, key, value] of attrMatches) {
      attrs[key] = value
    }

    elements.push({ tag: 'line', attrs })
  }

  return { viewBox, elements }
}

function svgElementToReact(element: SvgElement): ReturnType<typeof h> {
  return h(element.tag, element.attrs, element.children?.map(svgElementToReact))
}

async function resolveIconSvg(iconName: string): Promise<ResolvedIcon> {
  const require = createRequire(import.meta.url)
  const packageJsonPath = require.resolve('lucide-static/package.json')
  const baseDir = path.dirname(packageJsonPath)
  const iconPath = path.join(baseDir, 'icons', `${iconName}.svg`)

  try {
    const rawSvg = await readFile(iconPath, 'utf8')
    const coloredSvg = rawSvg
      .replace('<svg', `<svg stroke="${GOLD}"`)
      .replace('stroke="currentColor"', `stroke="${GOLD}"`)
    return { svg: coloredSvg, fallbackUsed: false, iconName }
  } catch {
    if (iconName === FALLBACK_ICON) {
      throw new Error(`Fallback icon '${FALLBACK_ICON}' could not be loaded from lucide-static.`)
    }
    return resolveIconSvg(FALLBACK_ICON).then(({ svg }: ResolvedIcon) => ({
      svg,
      fallbackUsed: true,
      iconName: FALLBACK_ICON,
    }))
  }
}

async function renderCoverPng(iconSvg: string) {
  const parsed = parseSvgPaths(iconSvg)

  const markup = h(
    'div',
    {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: BACKGROUND,
        overflow: 'hidden',
      },
    },
    h('div', {
      style: {
        position: 'absolute',
        width: '520px',
        height: '520px',
        borderRadius: '9999px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0) 70%)',
      },
    }),
    h('div', {
      style: {
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.55) 0.75px, transparent 0.75px), radial-gradient(rgba(255,255,255,0.35) 0.75px, transparent 0.75px)',
        backgroundSize: '4px 4px, 7px 7px',
        backgroundPosition: '0 0, 3px 2px',
      },
    }),
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: ICON_SIZE,
        height: ICON_SIZE,
        viewBox: parsed.viewBox,
        fill: 'none',
        stroke: GOLD,
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      parsed.elements.map(svgElementToReact),
    ),
  )

  const svg = await satori(markup, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [],
  })

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: WIDTH,
    },
  })

  return resvg.render().asPng()
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function run() {
  const { slug: targetSlug, force } = parseArgs()
  const manifest = await loadManifest()
  await mkdir(COVERS_DIR, { recursive: true })

  const projectFiles = await readdir(PROJECTS_DIR)
  const markdownFiles = projectFiles.filter((file) => file.endsWith('.md'))

  let generated = 0
  let skipped = 0
  let fallbackWarnings = 0

  for (const fileName of markdownFiles) {
    const filePath = path.join(PROJECTS_DIR, fileName)
    const raw = await readFile(filePath, 'utf8')
    const { data } = matter(raw)
    const frontmatter = data as ProjectFrontmatter

    const slug = frontmatter.slug ?? fileName.replace(/\.md$/, '')
    if (targetSlug && slug !== targetSlug) {
      continue
    }

    const coverIcon = toKebabCase(frontmatter.coverIcon ?? FALLBACK_ICON)
    const outputPath = path.join(COVERS_DIR, `${slug}.png`)
    const alreadyExists = await fileExists(outputPath)
    const manifestEntry = manifest[slug]
    const iconChanged = manifestEntry ? manifestEntry.icon !== coverIcon : false

    if (alreadyExists && !force && !iconChanged) {
      console.log(`SKIP  ${slug} -> public/covers/${slug}.png (existing cover, icon unchanged)`)
      skipped += 1
      continue
    }

    const { svg, fallbackUsed, iconName } = await resolveIconSvg(coverIcon)
    const png = await renderCoverPng(svg)
    await writeFile(outputPath, png)

    manifest[slug] = {
      icon: iconName,
      generatedAt: new Date().toISOString(),
    }

    if (fallbackUsed) {
      fallbackWarnings += 1
      console.log(`WARN  ${slug} -> fallback icon '${FALLBACK_ICON}' used`) 
    }

    const mode = alreadyExists ? 'OVERWRITE' : 'GEN'
    console.log(`${mode.padEnd(8)} ${slug} -> public/covers/${slug}.png (icon: ${iconName})`)
    generated += 1
  }

  await saveManifest(manifest)

  if (targetSlug && generated === 0 && skipped === 0) {
    throw new Error(`No project found with slug '${targetSlug}'.`)
  }

  console.log(`\nSummary: generated=${generated}, skipped=${skipped}, fallbackWarnings=${fallbackWarnings}`)
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`generate-cover failed: ${message}`)
  process.exit(1)
})
