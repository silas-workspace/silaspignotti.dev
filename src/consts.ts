import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Silas Pignotti',
  description:
    'Geo Data Scientist and AI Engineer building geospatial data pipelines, ML systems, and automation tooling for real-world urban and infrastructure use cases.',
  href: 'https://silas-workspace.github.io/silaspignotti.dev',
  author: 'Silas Pignotti',
  locale: 'en-US',
  location: 'Berlin, Germany',
  email: 'pignottisilas@gmail.com'
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/projects',
    label: 'projects',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/spignotti',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/silas-pignotti/',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:pignottisilas@gmail.com',
    label: 'Email',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Email: 'lucide:mail',
}

export interface Category {
  text: string
  logo: string
}

export type Technologies = Record<string, Category[]>

export const technologies: Technologies = {
  'Geospatial & EO': [
    { text: 'Google Earth Engine', logo: 'si:googleearth' },
    { text: 'QGIS', logo: 'si:qgis' },
    { text: 'OpenStreetMap', logo: 'si:openstreetmap' },
    { text: 'GeoPandas', logo: 'lucide:map' },
    { text: 'Rasterio', logo: 'lucide:satellite' },
    { text: 'PostGIS', logo: 'si:postgresql' },
  ],
  'ML/AI': [
    { text: 'PyTorch', logo: 'si:pytorch' },
    { text: 'scikit-learn', logo: 'si:scikitlearn' },
    { text: 'XGBoost', logo: 'lucide:brain' },
    { text: 'LLMs', logo: 'lucide:sparkles' },
    { text: 'Computer Vision', logo: 'lucide:scan-search' },
    { text: 'LiteLLM', logo: 'lucide:bot' },
  ],
  'Data Engineering': [
    { text: 'Python', logo: 'si:python' },
    { text: 'SQL', logo: 'lucide:database' },
    { text: 'Pandas', logo: 'si:pandas' },
    { text: 'NumPy', logo: 'si:numpy' },
    { text: 'DuckDB', logo: 'si:duckdb' },
    { text: 'Apache Spark', logo: 'si:apachespark' },
  ],
  'Backend & APIs': [
    { text: 'FastAPI', logo: 'si:fastapi' },
    { text: 'Typer CLI', logo: 'lucide:terminal' },
    { text: 'Pydantic', logo: 'lucide:shield-check' },
    { text: 'REST APIs', logo: 'lucide:waypoints' },
    { text: 'Automation Pipelines', logo: 'lucide:workflow' },
  ],
  'Cloud & DevOps': [
    { text: 'Docker', logo: 'si:docker' },
    { text: 'Google Cloud', logo: 'si:googlecloud' },
    { text: 'GitHub Actions', logo: 'si:githubactions' },
    { text: 'CI/CD', logo: 'lucide:git-branch' },
    { text: 'Linux', logo: 'lucide:server' },
  ],
  Tooling: [
    { text: 'Git', logo: 'mdi:git' },
    { text: 'Astro', logo: 'simple-icons:astro' },
    { text: 'TypeScript', logo: 'si:typescript' },
    { text: 'Node.js', logo: 'mdi:nodejs' },
    { text: 'VS Code', logo: 'mdi:visual-studio-code' },
    { text: 'Prompt Engineering', logo: 'lucide:wand-sparkles' },
  ],
}
