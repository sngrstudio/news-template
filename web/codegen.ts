import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.CONTENT_ENDPOINT,
  generates: {
    'src/graphql/graphql.ts': {
      plugins: ['typescript']
    }
  }
}

export default config
