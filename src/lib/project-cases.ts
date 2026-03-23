export type ProjectCategory = 'Geo Data Science' | 'AI/Automation'

export interface ProjectCase {
  slug: string
  name: string
  tagline: string
  description: string
  problem: string
  solution: string
  result: string
  stack: string[]
  githubUrl: string
  pypiUrl?: string
  downloads?: {
    label: string
    href?: string
    note?: string
  }[]
  screenshots?: {
    src: string
    alt: string
  }[]
  coverImage: string
  category: ProjectCategory
}

export const PROJECT_CASES: ProjectCase[] = [
  {
    slug: 'building-detector',
    name: 'building-detector',
    tagline: 'Detecting buildings in satellite imagery. With a click, not by hand.',
    description:
      'Point-guided building detection from satellite imagery using SAM2. Interactive web app for selecting points on a map and extracting building footprints.',
    problem:
      'Building footprints in OpenStreetMap are incomplete or outdated in many regions. Manual digitization from satellite imagery is extremely time-consuming.',
    solution:
      'Web application using the Segment Anything Model 2 (SAM2) to automatically extract building footprints from high-resolution satellite imagery. Users select an area on the map, the system segments buildings, regularizes geometries, and exports OSM-compatible GeoJSON data.',
    result:
      'Pixel-accurate building extraction with minimal manual effort. Directly importable into OpenStreetMap. Demonstrates end-to-end integration of state-of-the-art deep learning into a geodata workflow.',
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
    screenshots: [
      {
        src: '/projects/building-detector/screenshot-01.png',
        alt: 'building-detector application screenshot',
      },
    ],
    coverImage: '/projects/building-detector/cover.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'urbaniq',
    name: 'urbanIQ',
    tagline: "Analyzing Berlin's districts. One question instead of ten datasets.",
    description:
      'Smart geodata aggregation for automated district-level analytics in Berlin.',
    problem:
      'Geodata on Berlin\'s districts is scattered across multiple sources (statistics offices, OpenStreetMap, public administration). Anyone needing a quick overview has to manually aggregate and join datasets.',
    solution:
      'NLP-driven geodata aggregation: users ask a natural-language question, the system identifies relevant datasets, retrieves them, performs spatial joins, and delivers a structured district analysis.',
    result:
      'Automated district profiles at the push of a button. Demonstrates the intersection of LLM-based query logic and spatial data processing.',
    stack: ['Python', 'FastAPI', 'LangChain', 'GeoPandas', 'SQLite', 'HTMX'],
    githubUrl: 'https://github.com/spignotti/urbanIQ',
    screenshots: [
      {
        src: '/projects/urbaniq/screenshot-01.png',
        alt: 'urbanIQ application screenshot',
      },
    ],
    coverImage: '/projects/urbaniq/cover.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'kitamap',
    name: 'kitamap',
    tagline:
      'Where are daycare spots missing in Berlin? A data-driven answer instead of guesswork.',
    description:
      'GIS-based analysis of childcare availability in Berlin: ETL pipelines, time series forecasting, and accessibility analysis.',
    problem:
      'Daycare supply in Berlin is unevenly distributed, but there is a lack of data-driven tools that spatially combine supply, demand, and accessibility.',
    solution:
      'GIS-based analysis pipeline: ETL from public data sources, time series forecasting of child population per planning area, routing-based accessibility analysis, and spatial overlay of supply and demand.',
    result:
      'Identification of underserved areas with a forecast horizon. The methodologically deepest project in the portfolio, combining ML (Prophet, scikit-learn), spatial analytics, and ETL in a cohesive pipeline.',
    stack: [
      'Python',
      'scikit-learn',
      'Prophet',
      'GeoPandas',
      'OpenRouteService',
    ],
    githubUrl: 'https://github.com/spignotti/kitamap',
    downloads: [{ label: 'Project report (PDF)', href: '/projects/kitamap/report.pdf' }],
    screenshots: [
      {
        src: '/projects/kitamap/screenshot-01.png',
        alt: 'kitamap analysis screenshot',
      },
    ],
    coverImage: '/projects/kitamap/cover.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'heatsense',
    name: 'heatsense',
    tagline:
      'Making urban heat islands visible. Satellites, weather data, and land use.',
    description:
      'Urban Heat Island analysis combining satellite data, weather stations, and land use classification for Berlin.',
    problem:
      'Urban heat islands are a growing climate risk, but their spatial distribution is hard to grasp. Scattered weather stations don\'t provide a full picture.',
    solution:
      'Analysis tool combining Landsat satellite data (via Google Earth Engine), CORINE land cover data, and DWD climate measurements. Computes land surface temperatures, identifies hotspots using spatial statistics (Local Moran\'s I, Getis-Ord Gi*), and quantifies land use effects on temperature distribution.',
    result:
      'City-wide heat analysis for Berlin with statistically validated hotspot maps. Interactive web application for exploring results.',
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
    screenshots: [
      {
        src: '/projects/heatsense/screenshot-01.png',
        alt: 'heatsense analysis screenshot',
      },
    ],
    coverImage: '/projects/heatsense/cover.png',
    category: 'Geo Data Science',
  },
  {
    slug: 'renamr',
    name: 'renamr',
    tagline: "Let AI name your files. So you don't have to.",
    description:
      'AI-powered CLI for automatic file renaming. Analyzes PDFs, scans, and images via LLM. Open source, published on PyPI.',
    problem:
      'Downloaded PDFs, scans, and documents come with cryptic filenames. Manually renaming them to a consistent schema takes time and discipline.',
    solution:
      'Open-source CLI tool that analyzes file contents via LLM (PDFs, scans, images) and automatically renames them following a YYMMDD_Sender_Subject.ext convention. Supports multiple LLM providers, batch operations, and handles iCloud sync edge cases.',
    result:
      'Consistent file organization with zero manual effort. Published on PyPI, MIT license. Demonstrates a production-grade OSS release process with CI/CD, SemVer, and Trusted Publishing.',
    stack: ['Python', 'Typer', 'LiteLLM', 'pypdf', 'pymupdf'],
    githubUrl: 'https://github.com/spignotti/renamr',
    pypiUrl: 'https://pypi.org/project/renamr/',
    coverImage: '/ogImage.png',
    category: 'AI/Automation',
  },
]
