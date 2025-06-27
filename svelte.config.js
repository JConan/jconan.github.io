import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// fallback: 'index.html'
		})
		// prerender: {
		// 	entries: ['*'],
		// 	handleHttpError: ({ path, referrer, message }) => {
		// 		// Handle 404s during prerendering by ignoring them
		// 		if (path.includes('/journey/') && path.includes('/demo')) {
		// 			console.warn(`Skipping missing demo page: ${path}`);
		// 			return;
		// 		}
		// 		// Re-throw other errors
		// 		throw new Error(`${message} (${path})`);
		// 	}
		// }
	},

	extensions: ['.svelte', '.svx']
};

export default config;
