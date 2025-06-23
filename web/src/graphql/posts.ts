import type { RootQuery } from '~/graphql/graphql'
import execute, { gql } from '~/graphql/execute'

type Posts = Pick<RootQuery, 'posts'>

const getPostsQuery = gql`
  query GetPosts($first: Int = 10, $before: String = "", $after: String = "") {
    posts(first: $first, before: $before, after: $after) {
      nodes {
        title
        uri
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        excerpt
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const getPosts = async ({
  first,
  before,
  after
}: {
  first?: number
  before?: string
  after?: string
}) => {
  const { data } = await execute<Posts>(getPostsQuery, { first, before, after })
  return data.posts
}

type OnePost = Pick<RootQuery, 'post'>

const getPostQuery = gql`
  query GetPost($id: ID = "") {
    post(id: $id, idType: URI) {
      title
      uri
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
    }
  }
`

export const getPost = async ({ id }: { id: string }) => {
  const { data } = await execute<OnePost>(getPostQuery, { id })
  return data.post
}
