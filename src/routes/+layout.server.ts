import type { LayoutServerLoad } from './$types';

interface LayoutData {
	env: 'development' | 'production';
}

export const load = (async () => {
	return {
		env: process.env.NODE_ENV ?? 'development'
	} as LayoutData;
}) satisfies LayoutServerLoad;
