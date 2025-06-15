import { defineCollection } from 'astro:content'
import { getSite } from '../graphql/site'
import { z } from 'astro:schema'

const site = defineCollection({
  loader: async () => {
    const siteData = await getSite()
    return [
      {
        id: 'SITE',
        ...siteData
      }
    ]
  },
  schema: z.object({
    title: z.string(),
    description: z.string()
  })
})

export default site
