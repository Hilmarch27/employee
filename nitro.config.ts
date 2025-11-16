import { defineConfig } from 'nitro/config'

export default defineConfig({
	rollupConfig: {
    	external: ['canvas'], // this is for excluding bundling
  	},
	externals: {
		inline: ['xlsx'],
		external: ['canvas'],
	},
});