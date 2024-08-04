import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
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

		}),
		prerender: {
			entries: ['*', 
				'/portfolio/fm-memory-game-challenge/demo',
				'/portfolio/fm-tic-tac-toe/demo',
				'/portfolio/fm-connect-four-game/demo',
			]
		}
	},

	extensions: ['.svelte', '.svx']
};

export default config;
