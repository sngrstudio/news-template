import type { RootQuery } from './graphql'
import execute, { gql, type RemoveNull } from './execute'

type SettingsRQ = RemoveNull<Pick<RootQuery, 'generalSettings'>>
type Settings = Omit<SettingsRQ, 'generalSettings'> & {
  generalSettings: RemoveNull<
    Pick<SettingsRQ['generalSettings'], 'title' | 'description'>
  >
}

const getSettingsQuery = gql`
  query Settings {
    generalSettings {
      title
      description
    }
  }
`

export const getSettings = async () => {
  const { data } = await execute<Settings>(getSettingsQuery)
  return data.generalSettings
}
