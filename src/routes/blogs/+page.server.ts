import type { PageServerLoad } from './$types';
import { loadBlogPostsMetadata, loadBlogMetadata } from '$lib/utils/blog.js';

export const load: PageServerLoad = async ({ url }) => {
	// Extract locale from URL pathname
	const locale = url.pathname.startsWith('/en/') ? 'en' : 'fr';

	// Load blog posts and metadata
	const posts = loadBlogPostsMetadata(locale);
	const metadata = loadBlogMetadata(locale);

	return {
		posts,
		metadata,
		locale
	};
};
