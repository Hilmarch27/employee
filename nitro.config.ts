import { defineConfig } from 'nitro/config'

export default defineConfig({
  externals: {
    inline: ['xlsx']
  },
})