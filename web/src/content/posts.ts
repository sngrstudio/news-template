import type { Loader } from 'astro/loaders'
import type { Post, User, Category, Tag, RootQuery } from './graphql'
import { z } from 'astro:schema'
import getContent, { gql, type GetContentResult } from './fetcher'
import { defineCollection } from 'astro:content'

interface PostCollection extends Pick<Post, 'title' | 'uri'> {
  date: Date
  author: {
    node: Pick<User, 'name' | 'slug' | 'uri'>
  }
  categories: {
    nodes: Array<Pick<Category, 'name' | 'slug' | 'uri'>>
  }
  tags: {
    nodes: Array<Pick<Tag, 'name' | 'slug' | 'uri'>>
  }
}

type PostSchema = z.ZodType<PostCollection>

const postsLoader = (): Loader => {
  const schema: PostSchema = z.object({
    title: z.string(),
    uri: z.string(),
    date: z.coerce.date(),
    author: z.object({
      node: z.object({
        name: z.string(),
        slug: z.string(),
        uri: z.string()
      })
    }),
    categories: z.object({
      nodes: z
        .object({
          name: z.string(),
          slug: z.string(),
          uri: z.string()
        })
        .array()
    }),
    tags: z.object({
      nodes: z
        .object({
          name: z.string(),
          slug: z.string(),
          uri: z.string()
        })
        .array()
    })
  })
  return {
    name: 'posts-loader',
    load: async ({ store, parseData, generateDigest }) => {
      const getPosts = async (
        after: string = '',
        content: Array<Post> = []
      ) => {
        const contentData = await getContent({
          query: gql`
            query Posts($after: String = "") {
              posts(where: { status: PUBLISH }, after: $after, first: 64) {
                nodes {
                  title
                  uri
                  date
                  author {
                    node {
                      name
                      slug
                      uri
                    }
                  }
                  categories {
                    nodes {
                      name
                      slug
                      uri
                    }
                  }
                  tags {
                    nodes {
                      name
                      slug
                      uri
                    }
                  }
                  content
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          `,
          variables: {
            after
          }
        })

        if (contentData) {
          const { data } = contentData as GetContentResult<
            Pick<RootQuery, 'posts'>
          >
          if (data.posts) {
            const { nodes, pageInfo } = data.posts
            content.push(...nodes)

            if (pageInfo.hasNextPage && pageInfo.endCursor) {
              return getPosts(pageInfo.endCursor, content)
            }
          }
        }

        return content
      }

      store.clear()
      await getPosts().then((posts) =>
        posts.map(async ({ content, ...post }) => {
          const data = await parseData({
            id: post.uri!,
            data: post
          })

          store.set({
            id: post.uri!,
            rendered: {
              html: content!
            },
            digest: generateDigest({ ...data, content }),
            data
          })
        })
      )
    },
    schema
  }
}

export const posts = defineCollection({
  type: 'content_layer',
  loader: postsLoader()
})
