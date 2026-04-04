import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    ogImage: z.string().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      category: z.enum(['Geo Data Science', 'AI/Automation']),
      stack: z.array(z.string()),
      github: z.string().url(),
      pypi: z.string().url().optional(),
      cover: z.string(),
      coverIcon: z.string().default('code-2'),
      tagline: z.string().optional(),
      featuredOrder: z.number().optional(),
      downloads: z
        .array(
          z.object({
            label: z.string(),
            href: z.string().optional(),
            note: z.string().optional(),
          })
        )
        .optional(),
      screenshots: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string(),
          })
        )
        .optional(),
    }),
})

export const collections = { pages, projects }
