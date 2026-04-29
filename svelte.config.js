import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			"@/*": "./src/*"
		},
		experimental: {
			remoteFunctions: true
		},
		version: {
			pollInterval: 60000
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;