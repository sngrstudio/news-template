import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.CONTENT_EXTERNAL_ENDPOINT}/wp/index.php?graphql`,
  documents: ['src/graphql/**/*.graphql', '!src/graphql/__generated__/**/*'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-generic-sdk'
      ],
      config: {
        useTypeImports: true
      }
    }
  }
}

export default config
