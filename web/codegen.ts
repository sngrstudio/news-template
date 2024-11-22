import type { CodegenConfig } from '@graphql-codegen/cli'

const GRAPHQL_ENDPOINT = import.meta.env.GRAPHQL_ENDPOINT

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_ENDPOINT,
  generates: {
    'src/data/graphql.ts': {
      plugins: ['typescript']
    }
  }
}

export default config
