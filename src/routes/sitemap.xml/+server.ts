import { generateSitemap } from '$lib/utils/sitemap-generator';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const sitemap = generateSitemap();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600' // Cache for 1 hour
		}
	});
};
