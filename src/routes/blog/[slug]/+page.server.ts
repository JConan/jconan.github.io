import type { PageServerLoad } from './$types';
import type { BlogPost, BlogPostMetadata } from '$lib/types/blog';
import { getRelatedPosts } from '$lib/utils/blog';
import { error } from '@sveltejs/kit';
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

// Load a single blog post by slug
async function loadBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const filePath = join(process.cwd(), 'static', 'blog', `${slug}.md`);
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
			content: await marked(content)
		};

		return post.published ? post : null;
	} catch (error) {
		console.error(`Error loading blog post "${slug}":`, error);
		return null;
	}
}

// Load all blog posts metadata for related posts
function loadBlogPostsMetadata(): BlogPostMetadata[] {
	try {
		const blogDir = join(process.cwd(), 'static', 'blog');
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
					readingTime: metadata.readingTime || 5
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

export const load: PageServerLoad = async ({ params }) => {
	const post = await loadBlogPost(params.slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	// Load all posts metadata for related posts calculation
	const allPosts = loadBlogPostsMetadata();
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
};
