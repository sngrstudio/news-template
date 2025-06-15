import type { RootQuery, Page } from '~/graphql/graphql'
import execute, { gql } from '~/graphql/execute'

type Pages = Pick<RootQuery, 'pages'>

const getPagesQuery = gql`
  query GetPages {
    pages(where: { status: PUBLISH }, first: 100) {
      nodes {
        title
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
      }
    }
  }
`

export const getPages = async () => {
  const { data } = await execute<Pages>(getPagesQuery)
  return data.pages?.nodes as Array<Page>
}
