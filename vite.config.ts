import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import type { KIT_ROUTES } from '$lib/ROUTES'
import { kitRoutes } from 'vite-plugin-kit-routes'

export default defineConfig({
	plugins: [sveltekit(), kitRoutes<KIT_ROUTES>({

		
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
