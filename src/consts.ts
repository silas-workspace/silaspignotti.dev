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
  'Geospatial & ML': [
    { text: 'Python', logo: 'si:python' },
    { text: 'SQL', logo: 'lucide:database' },
    { text: 'PyTorch', logo: 'si:pytorch' },
    { text: 'scikit-learn', logo: 'si:scikitlearn' },
    { text: 'Google Earth Engine', logo: 'si:googleearth' },
    { text: 'PostGIS', logo: 'si:postgresql' },
    { text: 'QGIS', logo: 'si:qgis' },
  ],
  'AI & Dev Tools': [
    { text: 'LangChain', logo: 'lucide:sparkles' },
    { text: 'LangGraph', logo: 'lucide:waypoints' },
    { text: 'LiteLLM', logo: 'lucide:bot' },
    { text: 'Claude Code', logo: 'lucide:terminal' },
    { text: 'OpenCode', logo: 'lucide:wand-sparkles' },
    { text: 'n8n', logo: 'lucide:workflow' },
    { text: 'Notion', logo: 'lucide:file-text' },
    { text: 'Codex', logo: 'lucide:code' },
  ],
  'Infrastructure & Tooling': [
    { text: 'GCP', logo: 'si:googlecloud' },
    { text: 'PostgreSQL', logo: 'si:postgresql' },
    { text: 'FastAPI', logo: 'si:fastapi' },
    { text: 'Docker', logo: 'si:docker' },
    { text: 'Git', logo: 'mdi:git' },
    { text: 'Linux', logo: 'lucide:server' },
    { text: 'Prefect', logo: 'lucide:settings' },
    { text: 'MLflow', logo: 'lucide:brain' },
  ],
}
