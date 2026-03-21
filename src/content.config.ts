import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      category: z.enum(['Geo Data Science', 'AI/Automation']),
      stack: z.array(z.string()),
      github: z.string().url().optional(),
      featured: z.boolean().default(false),
      sortOrder: z.number().default(0),
      image: image().optional(),
    }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx?', base: './src/content/blog' }),
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Geo & Remote Sensing',
      'AI & Automation',
      'Tools & Workflows',
      'Career & Reflections',
    ]),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { projects, blog }
