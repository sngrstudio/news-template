import getContent, { gql, type GetContentResult } from './fetcher'
import type { Post, RootQuery } from './graphql'

export const getPosts = async ({
  first,
  after
}: {
  first?: number
  after?: string
} = {}) => {
  const { data } = (await getContent({
    query: gql`
      query Posts($first: Int = 8, $after: String = "") {
        posts(first: $first, after: $after) {
          nodes {
            title
            uri
            date
            content
            author {
              node {
                name
                uri
              }
            }
            featuredImage {
              node {
                sourceUrl(size: _2048X2048)
                caption
              }
            }
          }
        }
      }
    `,
    variables: {
      first,
      after
    }
  })) as GetContentResult<Pick<RootQuery, 'posts'>>

  if (data.posts) return data.posts.nodes as Array<Post>
  return []
}

export const getPost = async ({ id }: { id: string }) => {
  const { data } = (await getContent({
    query: gql`
      query Post($id: ID!) {
        post(id: $id, idType: URI) {
          title
          uri
          date
          content
          author {
            node {
              name
              uri
            }
          }
          featuredImage {
            node {
              sourceUrl(size: _2048X2048)
              caption
            }
          }
        }
      }
    `,
    variables: {
      id
    }
  })) as GetContentResult<Pick<RootQuery, 'post'>>

  if (data.post) return data.post as Post
  return null
}
