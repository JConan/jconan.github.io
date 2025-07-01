import type { BlogPost, BlogPostMetadata } from '$lib/types/blog';

// Client-safe utility functions for blog functionality

// Get related posts by tags (client-safe version that works with pre-loaded data)
export function getRelatedPosts(
	currentPost: BlogPost,
	allPosts: BlogPostMetadata[],
	limit = 3
): BlogPostMetadata[] {
	// Filter out current post and calculate relevance score
	const relatedPosts = allPosts
		.filter((post) => post.slug !== currentPost.slug)
		.map((post) => {
			const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
			const categoryMatch = post.category === currentPost.category ? 1 : 0;
			const score = commonTags.length + categoryMatch;

			return { ...post, score };
		})
		.filter((post) => post.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);

	// Remove the score property before returning
	return relatedPosts.map(({ score, ...post }) => post);
}

// Format date for display
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Calculate reading time estimate
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

// Extract excerpt from content
export function extractExcerpt(content: string, maxLength = 150): string {
	// Remove HTML tags and get plain text
	const plainText = content.replace(/<[^>]*>/g, '');

	if (plainText.length <= maxLength) {
		return plainText;
	}

	// Find the last complete word within the limit
	const truncated = plainText.substring(0, maxLength);
	const lastSpace = truncated.lastIndexOf(' ');

	return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}
