// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const SITE_URL = process.env.SITE_URL || 'http://localhost:4321'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  adapter: node({
    mode: 'middleware'
  }),
  image: {
    domains: [new URL(SITE_URL).hostname]
  }
})
