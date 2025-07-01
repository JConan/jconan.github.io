import type { BlogPost, BlogPostMetadata } from '$lib/types/blog';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { createShikiRenderer } from '$lib/utils/syntax-highlighting';

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { metadata: any; content: string } {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		throw new Error('Invalid frontmatter format');
	}

	const [, frontmatterStr, markdownContent] = match;
	const metadata: any = {};

	// Parse YAML-like frontmatter
	frontmatterStr.split('\n').forEach((line) => {
		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) return;

		const key = line.slice(0, colonIndex).trim();
		const value = line.slice(colonIndex + 1).trim();

		// Handle different value types
		if (value.startsWith('[') && value.endsWith(']')) {
			// Array
			metadata[key] = value
				.slice(1, -1)
				.split(',')
				.map((item) => item.trim().replace(/^["']|["']$/g, ''));
		} else if (value === 'true' || value === 'false') {
			// Boolean
			metadata[key] = value === 'true';
		} else if (!isNaN(Number(value))) {
			// Number
			metadata[key] = Number(value);
		} else {
			// String (remove quotes if present)
			metadata[key] = value.replace(/^["']|["']$/g, '');
		}
	});

	return { metadata, content: markdownContent };
}

// Load all blog posts metadata for a specific locale
export function loadBlogPostsMetadata(locale?: string): BlogPostMetadata[] {
	try {
		const currentLocale = locale || 'fr'; // Default to French
		const blogDir = join(process.cwd(), 'static', 'blogs', currentLocale);
		const files = readdirSync(blogDir).filter(
			(file) => file.endsWith('.md') && file !== 'index.md'
		);

		const posts: BlogPostMetadata[] = files
			.map((file) => {
				const slug = file.replace('.md', '');
				const filePath = join(blogDir, file);
				const fileContent = readFileSync(filePath, 'utf-8');

				const { metadata } = parseFrontmatter(fileContent);

				return {
					slug,
					title: metadata.title || 'Untitled',
					description: metadata.description || '',
					date: metadata.date || '',
					author: metadata.author || 'Johan Conan',
					tags: metadata.tags || [],
					category: metadata.category || 'General',
					featured: metadata.featured || false,
					published: metadata.published || false,
					excerpt: metadata.excerpt || '',
					readingTime: metadata.readingTime || 5,
					translation_id: metadata.translation_id
				} as BlogPostMetadata;
			})
			.filter((post) => post.published)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return posts;
	} catch (error) {
		console.error('Error loading blog posts metadata:', error);
		return [];
	}
}

// Load a single blog post by slug for a specific locale
export async function loadBlogPost(slug: string, locale?: string): Promise<BlogPost | null> {
	try {
		const currentLocale = locale || 'fr'; // Default to French
		const filePath = join(process.cwd(), 'static', 'blogs', currentLocale, `${slug}.md`);
		const fileContent = readFileSync(filePath, 'utf-8');

		const { metadata, content } = parseFrontmatter(fileContent);

		// Configure marked with Shiki renderer for syntax highlighting
		const renderer = await createShikiRenderer();
		marked.use({ renderer });

		const post: BlogPost = {
			slug,
			title: metadata.title || 'Untitled',
			description: metadata.description || '',
			date: metadata.date || '',
			author: metadata.author || 'Johan Conan',
			tags: metadata.tags || [],
			category: metadata.category || 'General',
			featured: metadata.featured || false,
			published: metadata.published || false,
			excerpt: metadata.excerpt || '',
			readingTime: metadata.readingTime || 5,
			content: await marked(content),
			translation_id: metadata.translation_id
		};

		return post.published ? post : null;
	} catch (error) {
		console.error(`Error loading blog post "${slug}":`, error);
		return null;
	}
}

// Load blog metadata (SEO data) for a specific locale
export function loadBlogMetadata(locale?: string): any {
	try {
		const currentLocale = locale || 'fr'; // Default to French
		const metadataPath = join(process.cwd(), 'static', 'blogs', currentLocale, 'metadata.json');
		const metadataContent = readFileSync(metadataPath, 'utf-8');
		const metadata = JSON.parse(metadataContent);
		return metadata.seo;
	} catch (error) {
		console.error('Error loading blog metadata:', error);
		return {
			title: 'Blog | Johan Chan',
			description: 'Technical articles and tutorials',
			keywords: 'blog, web development, programming',
			type: 'website' as const
		};
	}
}

// Find the translated version of a blog post by translation_id
export function findTranslatedPost(
	translationId: string,
	targetLocale: string
): BlogPostMetadata | null {
	try {
		const posts = loadBlogPostsMetadata(targetLocale);
		return posts.find((post) => post.translation_id === translationId) || null;
	} catch (error) {
		console.error(`Error finding translated post for translation_id "${translationId}":`, error);
		return null;
	}
}

// Get all available translations for a blog post
export function getPostTranslations(translationId: string): Record<string, BlogPostMetadata> {
	const translations: Record<string, BlogPostMetadata> = {};

	try {
		// Check French posts
		const frenchPosts = loadBlogPostsMetadata('fr');
		const frenchPost = frenchPosts.find((post) => post.translation_id === translationId);
		if (frenchPost) {
			translations['fr'] = frenchPost;
		}

		// Check English posts
		const englishPosts = loadBlogPostsMetadata('en');
		const englishPost = englishPosts.find((post) => post.translation_id === translationId);
		if (englishPost) {
			translations['en'] = englishPost;
		}
	} catch (error) {
		console.error(`Error getting translations for translation_id "${translationId}":`, error);
	}

	return translations;
}

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
