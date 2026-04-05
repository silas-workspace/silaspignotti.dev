import { getCollection, type CollectionEntry } from 'astro:content'

export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects')
  return projects
    .sort((a, b) => {
      const aOrder = a.data.featuredOrder ?? Number.POSITIVE_INFINITY
      const bOrder = b.data.featuredOrder ?? Number.POSITIVE_INFINITY
      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }
      return a.data.title.localeCompare(b.data.title)
    })
}

export async function getProjectsFeaturedTags(maxCount: number): Promise<string[]> {
  const projects = await getAllProjects()
  const tags = new Set<string>()

  for (const project of projects) {
    if (project.data.tags) {
      for (const tag of project.data.tags) {
        tags.add(tag)
      }
    }
    if (tags.size >= maxCount) {
      break
    }
  }

  return Array.from(tags).slice(0, maxCount)
}
