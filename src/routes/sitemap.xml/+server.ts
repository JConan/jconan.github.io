import type { RequestHandler } from '@sveltejs/kit';
import { loadBlogPostsMetadata } from '$lib/utils/blog';
import { getRouteMetadata, getCurrentTimestamp } from '$lib/utils/sitemap-utils';

const SITE_URL = 'https://www.johan-chan.fr';

interface SitemapEntry {
	url: string;
	lastmod: string;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: number;
}

function formatDate(date: Date): string {
	return date.toISOString();
}

function generateStaticRoutes(): SitemapEntry[] {
	const staticRoutes = ['/', '/about', '/portfolio', '/contact', '/services', '/blogs'];
	const entries: SitemapEntry[] = [];

	staticRoutes.forEach((path) => {
		const metadata = getRouteMetadata(path);

		// French version (default, no prefix) - always include
		entries.push({
			url: `${SITE_URL}${path}`,
			lastmod: metadata.lastmod || getCurrentTimestamp(),
			changefreq: metadata.changefreq || 'monthly',
			priority: metadata.priority || 0.5
		});

		// English version (with /en prefix) - all pages support language switching
		entries.push({
			url: `${SITE_URL}/en${path}`,
			lastmod: metadata.lastmod || getCurrentTimestamp(),
			changefreq: metadata.changefreq || 'monthly',
			priority: metadata.priority || 0.5
		});
	});

	return entries;
}

function generateBlogRoutes(): SitemapEntry[] {
	const entries: SitemapEntry[] = [];

	try {
		// Get blog posts for both locales
		const frenchPosts = loadBlogPostsMetadata('fr');
		const englishPosts = loadBlogPostsMetadata('en');

		// French blog posts
		frenchPosts.forEach((post) => {
			entries.push({
				url: `${SITE_URL}/blogs/${post.slug}`,
				lastmod: formatDate(new Date(post.date)),
				changefreq: 'monthly',
				priority: 0.5
			});
		});

		// English blog posts
		englishPosts.forEach((post) => {
			entries.push({
				url: `${SITE_URL}/en/blogs/${post.slug}`,
				lastmod: formatDate(new Date(post.date)),
				changefreq: 'monthly',
				priority: 0.5
			});
		});
	} catch (error) {
		console.error('Error generating blog routes for sitemap:', error);
	}

	return entries;
}

function generateSitemapXML(entries: SitemapEntry[]): string {
	const urlEntries = entries
		.map(
			(entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export const GET: RequestHandler = async () => {
	try {
		// Generate all sitemap entries
		const staticEntries = generateStaticRoutes();
		const blogEntries = generateBlogRoutes();

		// Combine all entries
		const allEntries = [...staticEntries, ...blogEntries];

		// Sort by priority (highest first), then by URL
		allEntries.sort((a, b) => {
			if (a.priority !== b.priority) {
				return b.priority - a.priority;
			}
			return a.url.localeCompare(b.url);
		});

		// Generate the sitemap XML
		const sitemap = generateSitemapXML(allEntries);

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);

		// Return a minimal sitemap if there's an error
		const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

		return new Response(fallbackSitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=300' // Cache for 5 minutes on error
			}
		});
	}
};
