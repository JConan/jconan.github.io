interface SitemapEntry {
	url: string;
	lastmod: string;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: number;
}

export function generateSitemap(): string {
	const baseUrl = 'https://jconan.github.io';
	const now = new Date().toISOString();

	const pages: SitemapEntry[] = [
		{
			url: `${baseUrl}/`,
			lastmod: now,
			changefreq: 'weekly',
			priority: 1.0
		},
		{
			url: `${baseUrl}/cv`,
			lastmod: now,
			changefreq: 'monthly',
			priority: 0.9
		},
		{
			url: `${baseUrl}/portfolio`,
			lastmod: now,
			changefreq: 'weekly',
			priority: 0.8
		},
		{
			url: `${baseUrl}/contact`,
			lastmod: now,
			changefreq: 'monthly',
			priority: 0.7
		}
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return sitemap;
}
