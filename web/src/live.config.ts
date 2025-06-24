import { defineLiveCollection } from 'astro:content'
import { postsLoader } from './content/posts'
import { z } from 'astro:schema'

const postsSchema = z.object({
  title: z.string(),
  uri: z.string(),
  date: z.string(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  pageInfo: z
    .object({
      hasPreviousPage: z.boolean(),
      hasNextPage: z.boolean(),
      startCursor: z.string().optional(),
      endCursor: z.string().optional()
    })
    .optional()
})

export const posts = defineLiveCollection({
  type: 'live',
  loader: postsLoader(),
  schema: postsSchema
})

export const collections = { posts }
