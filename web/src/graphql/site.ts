import type { RootQuery } from '~/graphql/graphql'
import execute, { gql } from '~/graphql/execute'

type Site = Pick<RootQuery, 'generalSettings'>

const getSiteQuery = gql`
  query GetSite {
    generalSettings {
      title
      description
    }
  }
`

export const getSite = async () => {
  const { data } = await execute<Site>(getSiteQuery)
  return data.generalSettings
}
