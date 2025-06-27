import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/integration/**/*.{test,spec}.{js,ts}'],
		environment: 'node',
		setupFiles: ['tests/setup/integration.setup.ts'],
		testTimeout: 30000, // Longer timeout for integration tests
		hookTimeout: 10000,
		teardownTimeout: 10000,
		globals: true,
		sequence: {
			concurrent: false // Run integration tests sequentially
		}
	}
});
