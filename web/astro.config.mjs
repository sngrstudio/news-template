// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['localhost:4321', 'localhost:4322'],
    experimentalLayout: 'constrained'
  },
  experimental: {
    responsiveImages: true
  }
})
