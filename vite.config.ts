import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { imagetools } from 'vite-imagetools';
import type { KIT_ROUTES } from '$lib/ROUTES';
import { kitRoutes } from 'vite-plugin-kit-routes';
import tailwindcss from '@tailwindcss/vite';
import { cvPDFGenerator } from './plugins/cv-pdf-generator';
import { devServerCleanup } from './plugins/dev-server-cleanup';

export default defineConfig({
	plugins: [
		devServerCleanup(),
		tailwindcss(),
		cvPDFGenerator(),
		sveltekit(),
		kitRoutes<KIT_ROUTES>({}),
		imagetools(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale']
		})
	],
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
