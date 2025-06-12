import type { RootQuery } from '~/graphql/graphql'
import execute, { gql, type RemoveNull } from '~/graphql/execute'

type SiteRQ = RemoveNull<Pick<RootQuery, 'generalSettings'>>
type Site = Omit<SiteRQ, 'generalSettings'> & {
  generalSettings: RemoveNull<
    Pick<SiteRQ['generalSettings'], 'title' | 'description'>
  >
}

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
