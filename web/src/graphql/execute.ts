export const gql = String.raw

type ExecuteResult<T> = {
  data: T
  extensions: any
}

const execute = async <TResult>(
  query: ReturnType<typeof gql>,
  variables: Record<string, string | Array<string> | number | undefined> = {}
) => {
  const res = await fetch(import.meta.env.CONTENT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json'
    },
    body: JSON.stringify({ query, variables })
  })

  if (!res.ok) {
    throw new Error('Error fetching GraphQL Data')
  }

  return (await res.json()) as ExecuteResult<TResult>
}

export default execute

export type RemoveNull<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export type NestedPick<T, K extends keyof T, U extends keyof T[K]> = {
  [P in K]: Pick<T[P], U>
}
