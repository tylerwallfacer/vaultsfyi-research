import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://blog.vaults.fyi',
  // When deploying to a subdirectory (e.g. GitHub Pages project site), set:
  // base: '/research'
  // For a custom domain root, leave base unset.
  output: 'static',
  integrations: [sitemap()],
})
