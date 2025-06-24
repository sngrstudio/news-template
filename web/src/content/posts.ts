import type { LiveLoader } from 'astro/loaders'
import type { Post as PostEntry } from '~/graphql/graphql'
import { getPosts, getPost } from '~/graphql/posts'

export type Post = Pick<
  NonNullable<Awaited<ReturnType<typeof getPost>>>,
  'title' | 'uri' | 'date' | 'excerpt' | 'content'
> & {
  featuredImage?: string | null | undefined
}

type PostEntryFilter = Parameters<typeof getPost>[0]
type PostCollectionFilter = Parameters<typeof getPosts>[0]

export const postsLoader = (): LiveLoader<
  Post,
  PostEntryFilter,
  PostCollectionFilter
> => {
  return {
    name: 'posts-loader',
    loadEntry: async (ctx) => {
      try {
        const post = await getPost({ ...ctx.filter })
        if (!post) {
          throw new Error('No post found.')
        }

        return {
          id: post.uri!,
          data: {
            ...post,
            featuredImage: post.featuredImage?.node.sourceUrl
          },
          rendered: {
            html: post.content
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error occured when fetching post: ${error.message}`)
        } else {
          throw new Error(`An unknown error happened.`)
        }
      }
    },
    loadCollection: async (ctx) => {
      try {
        const posts = await getPosts({ ...ctx.filter })

        if (!posts) {
          throw new Error('')
        }

        return {
          entries: posts.nodes.map(({ featuredImage, ...post }: PostEntry) => {
            return {
              id: post.uri!,
              data: {
                ...post,
                featuredImage: featuredImage?.node.sourceUrl,
                pageInfo: posts.pageInfo
              }
            }
          })
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error occured when fetching post: ${error.message}`)
        } else {
          throw new Error(`An unknown error happened.`)
        }
      }
    }
  }
}
