import type { Loader } from 'astro/loaders'
import type { Post, RootQuery } from './graphql'
import { z } from 'astro:schema'
import getContent, { gql } from './fetcher'
import { defineCollection } from 'astro:content'

type PostSchema = z.ZodType<Partial<Omit<Post, 'date'>>>

const postsLoader = ({
  variables
}: { variables?: Record<'string', 'any'> } = {}): Loader => {
  const schema: PostSchema = z.object({
    title: z.string(),
    uri: z.string(),
    date: z.coerce.date()
  })
  return {
    name: 'posts-loader',
    load: async ({ store, parseData, generateDigest }) => {
      const content = await getContent({
        query: gql`
          query Posts($first: Int, $after: String) {
            posts(where: { status: PUBLISH }, first: $first, after: $after) {
              nodes {
                title
                uri
                date
                content
              }
            }
          }
        `,
        variables
      })

      if (content) {
        ;(content.data as Pick<RootQuery, 'posts'>).posts?.nodes.map(
          async ({ content, ...post }: Post) => {
            const data = await parseData({
              id: post.uri as string,
              data: post
            })

            store.set({
              id: post.uri as string,
              data,
              rendered: {
                html: content!
              },
              digest: generateDigest(data)
            })
          }
        )
      }
    },
    schema
  }
}

export const posts = defineCollection({
  type: 'content_layer',
  loader: postsLoader()
})
