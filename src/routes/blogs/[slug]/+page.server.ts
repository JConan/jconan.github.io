import type { PageServerLoad } from './$types';
import { loadBlogPost, loadBlogPostsMetadata } from '$lib/utils/blog';
import { getRelatedPosts } from '$lib/utils/blog-client';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, url }) => {
	try {
		// Extract locale from URL or use current locale
		const locale = url.pathname.startsWith('/en/') ? 'en' : 'fr';

		const post = await loadBlogPost(params.slug, locale);

		if (!post) {
			throw error(404, 'Blog post not found');
		}

		// Load all posts metadata for related posts calculation
		const allPosts = loadBlogPostsMetadata(locale);
		const relatedPosts = getRelatedPosts(post, allPosts);

		return {
			post,
			relatedPosts,
			seo: {
				title: `${post.title} | Blog Johan Chan`,
				description: post.description,
				keywords: post.tags.join(', '),
				type: 'article' as const
			}
		};
	} catch (err) {
		console.error(`Error loading blog post "${params.slug}":`, err);
		throw error(404, 'Blog post not found');
	}
};
