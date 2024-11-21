const GRAPHQL_ENDPOINT = import.meta.env.GRAPHQL_ENDPOINT
export const gql = String.raw

interface GetContentInput {
  query: ReturnType<typeof gql>
  variables?: Record<string, any> | undefined
}

export interface GetContentResult<T> {
  data: T
  extensions?: any
}

const getContent = async ({ query, variables }: GetContentInput) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })

    const json = await response.json()
    if (json.errors) {
      ;(json.errors as Array<any>).map((error) => {
        throw new Error(error.message)
      })
    }

    return json as GetContentResult<unknown>
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }

    return null
  }
}

export default getContent
