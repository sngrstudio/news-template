import { defineCollection } from 'astro:content'
import { getPages } from '~/graphql/pages'
import { z } from 'astro:schema'

type Schema = Pick<
  Awaited<ReturnType<typeof getPages>>[number],
  'title' | 'uri' | 'content'
> & {
  featuredImage?: string | undefined
}

const schema: z.ZodType<Schema> = z.object({
  title: z.string(),
  uri: z.string(),
  featuredImage: z.string().optional(),
  content: z.string().optional()
})

const pages = defineCollection({
  loader: async () => {
    const pages = await getPages()
    return pages.map((page) => {
      return {
        id: page.uri!,
        title: page.title!,
        uri: page.uri!,
        featuredImage: page.featuredImage?.node.sourceUrl,
        content: page.content || ''
      }
    })
  },
  schema
})

export default pages
