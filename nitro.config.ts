import { defineConfig } from 'nitro/config'

export default defineConfig({
	externals: {
		inline: ['xlsx'],
	},
	// CRITICAL: Exclude canvas dan .node files dari bundling
	rollupConfig: {
		external: (id) => {
			// Exclude canvas dan semua .node files
			if (id.includes('canvas') || id.endsWith('.node')) {
				return true;
			}
			return false;
		},
	},
});