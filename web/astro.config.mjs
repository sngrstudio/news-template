// @ts-check
import { defineConfig } from 'astro/config'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['localhost:4321', 'localhost:4322'],
    layout: 'constrained'
  },

  experimental: {
    liveContentCollections: true
  },

  adapter: node({
    mode: 'standalone'
  })
})
