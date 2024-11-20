import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/wp/graphql',
  generates: {
    'src/content/graphql.ts': {
      plugins: ['typescript']
    }
  }
}

export default config
