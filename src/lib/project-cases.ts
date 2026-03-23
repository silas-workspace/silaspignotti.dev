export type ProjectCategory = 'Geo Data Science' | 'AI/Automation'

export interface ProjectCase {
  slug: string
  name: string
  description: string
  stack: string[]
  githubUrl: string
  coverImage: string
  category: ProjectCategory
}

export const PROJECT_CASES: ProjectCase[] = [
  {
    slug: 'building-detector',
    name: 'building-detector',
    description:
      'Point-guided building detection from satellite imagery using SAM2. Interactive web app for selecting points on a map and extracting building footprints.',
    stack: [
      'Python',
      'SAM2/PyTorch',
      'Flask',
      'Leaflet',
      'Shapely',
      'GeoPandas',
      'Rasterio',
    ],
    githubUrl: 'https://github.com/spignotti/building-detector',
    coverImage: '/ogImage.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'urbaniq',
    name: 'urbanIQ',
    description:
      'Smart geodata aggregation for automated district-level analytics in Berlin.',
    stack: ['Python', 'FastAPI', 'LangChain', 'GeoPandas', 'SQLite', 'HTMX'],
    githubUrl: 'https://github.com/spignotti/urbanIQ',
    coverImage: '/ogImage.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'kitamap',
    name: 'kitamap',
    description:
      'GIS-based analysis of childcare availability in Berlin: ETL pipelines, time series forecasting, and accessibility analysis.',
    stack: [
      'Python',
      'scikit-learn',
      'Prophet',
      'GeoPandas',
      'OpenRouteService',
    ],
    githubUrl: 'https://github.com/spignotti/kitamap',
    coverImage: '/ogImage.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'heatsense',
    name: 'heatsense',
    description:
      'Urban Heat Island analysis combining satellite data, weather stations, and land use classification for Berlin.',
    stack: [
      'Python',
      'Google Earth Engine',
      'Flask',
      'GeoPandas',
      'PySAL',
      'Rasterio',
      'Leaflet',
    ],
    githubUrl: 'https://github.com/spignotti/heatsense',
    coverImage: '/ogImage.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'renamr',
    name: 'renamr',
    description:
      'AI-powered CLI for automatic file renaming. Analyzes PDFs, scans, and images via LLM. Open source, published on PyPI.',
    stack: ['Python', 'Typer', 'LiteLLM', 'pypdf', 'pymupdf'],
    githubUrl: 'https://github.com/spignotti/renamr',
    coverImage: '/ogImage.png',
    category: 'AI/Automation',
  },
]
