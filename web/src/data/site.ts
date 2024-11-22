import getContent, { gql, type GetContentResult } from './fetcher'
import type { RootQuery } from './graphql'

export type Site = {
  title: string
  description: string
}

export const getSiteInfo = async () => {
  const { data } = (await getContent({
    query: gql`
      query Site {
        generalSettings {
          title
          description
        }
      }
    `
  })) as GetContentResult<Pick<RootQuery, 'generalSettings'>>

  return {
    title: data.generalSettings?.title!,
    description: data.generalSettings?.description!
  } satisfies Site
}
