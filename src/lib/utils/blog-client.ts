import type { BlogPost, BlogPostMetadata } from '$lib/types/blog';

// Format date for display (client-safe)
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Get related posts by tags (client-safe version that works with pre-loaded data)
export function getRelatedPosts(
	currentPost: BlogPost,
	allPosts: BlogPostMetadata[],
	limit = 3
): BlogPostMetadata[] {
	if (!currentPost.tags || currentPost.tags.length === 0) {
		// If no tags, return most recent posts excluding current
		return allPosts.filter((post) => post.slug !== currentPost.slug).slice(0, limit);
	}

	// Score posts by number of matching tags
	const postsWithScore = allPosts
		.filter((post) => post.slug !== currentPost.slug)
		.map((post) => {
			const matchingTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
			return {
				post,
				score: matchingTags.length,
				hasMatchingTags: matchingTags.length > 0
			};
		})
		.filter((item) => item.hasMatchingTags)
		.sort((a, b) => {
			// First sort by score (number of matching tags)
			if (b.score !== a.score) {
				return b.score - a.score;
			}
			// Then by date (most recent first)
			return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
		});

	const relatedPosts = postsWithScore.map((item) => item.post);

	// If we don't have enough related posts, fill with recent posts
	if (relatedPosts.length < limit) {
		const recentPosts = allPosts
			.filter(
				(post) =>
					post.slug !== currentPost.slug && !relatedPosts.some((rp) => rp.slug === post.slug)
			)
			.slice(0, limit - relatedPosts.length);

		relatedPosts.push(...recentPosts);
	}

	return relatedPosts.slice(0, limit);
}

// Calculate estimated reading time based on content length
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const readingTime = Math.ceil(words / wordsPerMinute);
	return Math.max(1, readingTime); // Minimum 1 minute
}

// Extract excerpt from content (client-safe)
export function extractExcerpt(content: string, maxLength = 160): string {
	// Remove markdown syntax and HTML tags
	const plainText = content
		.replace(/#{1,6}\s+/g, '') // Remove headers
		.replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
		.replace(/\*(.*?)\*/g, '$1') // Remove italic
		.replace(/`(.*?)`/g, '$1') // Remove inline code
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.replace(/\n+/g, ' ') // Replace newlines with spaces
		.trim();

	if (plainText.length <= maxLength) {
		return plainText;
	}

	// Find the last complete word within the limit
	const truncated = plainText.substring(0, maxLength);
	const lastSpaceIndex = truncated.lastIndexOf(' ');

	if (lastSpaceIndex > maxLength * 0.8) {
		return truncated.substring(0, lastSpaceIndex) + '...';
	}

	return truncated + '...';
}
