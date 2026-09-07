import {
  BookOpenCheck,
  Building2,
  FileSearch,
  Layers,
  LayoutDashboard,
  MapPin,
  Satellite,
  Terminal,
  Trees,
  Wand2,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export const PROJECT_COVER_ICONS = [
  'layers',
  'terminal',
  'satellite',
  'map-pin',
  'file-search',
  'layout-dashboard',
  'wand-2',
  'trees',
  'building-2',
  'book-open-check',
  'workflow',
] as const

export type ProjectCoverIcon = (typeof PROJECT_COVER_ICONS)[number]

export const PROJECT_COVER_ICON_MAP: Record<ProjectCoverIcon, LucideIcon> = {
  layers: Layers,
  terminal: Terminal,
  satellite: Satellite,
  'map-pin': MapPin,
  'file-search': FileSearch,
  'layout-dashboard': LayoutDashboard,
  'wand-2': Wand2,
  trees: Trees,
  'building-2': Building2,
  'book-open-check': BookOpenCheck,
  workflow: Workflow,
}

// decision: workflow kept in the valid set, because routing-engine.md uses it as its coverIcon. Alternative: remove it and fall back to the default icon.
export const PROJECT_COVER_ICON_DEFAULT: ProjectCoverIcon = 'layers'
