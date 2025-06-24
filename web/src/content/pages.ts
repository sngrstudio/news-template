import { defineCollection } from 'astro:content'
import type { Loader } from 'astro/loaders'
import { getPages } from '~/graphql/pages'
import { z } from 'astro:schema'

export const pagesLoader = (): Loader => {
  return {
    name: 'pages-loader',
    load: async (ctx) => {
      ctx.logger.info('Loading static pages...')
      const pages = await getPages()
      ctx.store.clear()

      for (const page of pages) {
        const data = await ctx.parseData({
          id: page.uri!,
          data: {
            ...page,
            featuredImage: page.featuredImage?.node.sourceUrl ?? undefined
          }
        })
        const digest = ctx.generateDigest(data)
        ctx.store.set({
          id: page.uri!,
          data,
          rendered: {
            html: data.content ?? ''
          },
          digest
        })
      }
    },
    schema: z.object({
      title: z.string(),
      uri: z.string(),
      featuredImage: z.string().optional()
    })
  }
}

const pages = defineCollection({
  loader: pagesLoader()
})

export default pages
