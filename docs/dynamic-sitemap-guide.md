# Dynamic Sitemap Implementation Guide

## Overview

The website now uses a **dynamic sitemap** that automatically generates XML content based on your routes and blog posts, replacing the static `sitemap.xml` file.

## 🎯 Benefits

✅ **Automatic Updates**: New blog posts are automatically included  
✅ **Multi-language Support**: Both French and English routes  
✅ **Maintainable**: Centralized configuration for lastmod dates  
✅ **SEO Optimized**: Proper priorities and change frequencies  
✅ **Error Handling**: Fallback sitemap if generation fails

## 📁 File Structure

```
src/
├── routes/
│   └── sitemap.xml/
│       └── +server.ts          # Dynamic sitemap endpoint
├── lib/
│   └── utils/
│       ├── sitemap-utils.ts     # Sitemap utilities and metadata
│       └── blog.ts              # Blog post loading functions
└── lib/data/
    └── seo-data.ts              # SEO metadata (used for reference)
```

## 🔧 How It Works

### 1. Dynamic Generation

- **Endpoint**: `/sitemap.xml` (SvelteKit server route)
- **Runtime**: Generates XML on each request
- **Caching**: 1-hour cache headers for performance

### 2. Content Sources

- **Static Routes**: From `sitemap-utils.ts` configuration
- **Blog Posts**: Dynamically loaded from `static/blogs/`
- **Languages**: Automatic French/English URL generation

### 3. Route Types

```typescript
// Static pages with custom metadata
'/' | '/about' | '/portfolio' | '/contact' | '/services' | '/blogs';

// Blog posts (dynamic)
'/blogs/[slug]' | '/en/blogs/[slug]';
```

## ⚙️ Configuration

### Route Metadata (`src/lib/utils/sitemap-utils.ts`)

```typescript
export const routeMetadata: Record<string, RouteMetadata> = {
	'/': {
		lastmod: '2025-06-20T19:18:00+00:00',
		changefreq: 'weekly',
		priority: 1.0
	},
	'/about': {
		lastmod: '2025-06-21T13:49:00+00:00',
		changefreq: 'monthly',
		priority: 0.9
	}
	// ... more routes
};
```

### Priority Guidelines

- **1.0**: Homepage (/)
- **0.9**: About page (/about)
- **0.8**: Journey (/journey), Services (/services)
- **0.7**: Contact (/contact)
- **0.6**: Blog listing (/blogs)
- **0.5**: Individual blog posts

### Change Frequency Guidelines

- **weekly**: Homepage, Journey, Blog listing
- **monthly**: About, Services, Contact, Individual blog posts

## 🔄 Updating Content

### When to Update lastmod Dates

1. **Content Changes**: When page content is significantly updated
2. **New Features**: When new functionality is added to a page
3. **Design Updates**: When major design changes are made

### How to Update

```typescript
// In sitemap-utils.ts
import { updateRouteLastmod } from '$lib/utils/sitemap-utils';

// Update a specific route
updateRouteLastmod('/services', new Date());

// Or edit the routeMetadata object directly
routeMetadata['/services'].lastmod = '2025-01-07T10:00:00+00:00';
```

## 🧪 Testing

### 1. Development Testing

```bash
pnpm dev
# Visit: http://localhost:3000/sitemap.xml
```

### 2. Production Testing

```bash
pnpm build
pnpm preview
# Visit: http://localhost:4173/sitemap.xml
```

### 3. Validation

- **XML Validation**: Use online XML validators
- **Google Search Console**: Submit sitemap for validation
- **SEO Tools**: Test with SEO crawling tools

## 📊 Generated Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage (highest priority) -->
  <url>
    <loc>https://www.johan-chan.fr/</loc>
    <lastmod>2025-06-20T19:18:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- English homepage -->
  <url>
    <loc>https://www.johan-chan.fr/en/</loc>
    <lastmod>2025-06-20T19:18:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog posts (dynamic) -->
  <url>
    <loc>https://www.johan-chan.fr/blogs/2024-03-15-svelte-5-migration</loc>
    <lastmod>2024-03-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- ... more URLs -->
</urlset>
```

## 🚀 Deployment

### Automatic Updates

- **Blog Posts**: Automatically included when published
- **Route Changes**: Require code deployment
- **Metadata Updates**: Require code deployment

### Search Engine Submission

1. **robots.txt**: Already configured to point to `/sitemap.xml`
2. **Google Search Console**: Submit sitemap URL
3. **Bing Webmaster Tools**: Submit sitemap URL

## 🔧 Maintenance

### Regular Tasks

- [ ] Review and update lastmod dates monthly
- [ ] Check sitemap accessibility after deployments
- [ ] Monitor search console for sitemap errors
- [ ] Validate XML structure periodically

### When Adding New Routes

1. Add route metadata to `sitemap-utils.ts`
2. Test sitemap generation
3. Deploy changes
4. Verify in search console

## 🐛 Troubleshooting

### Common Issues

**Sitemap returns 404**

- Check if `src/routes/sitemap.xml/+server.ts` exists
- Verify build completed successfully

**Missing blog posts**

- Check blog post `published: true` in frontmatter
- Verify blog files are in correct directories

**XML validation errors**

- Check for special characters in URLs
- Verify all URLs are properly escaped

**Performance issues**

- Consider implementing additional caching
- Monitor blog post loading performance

### Debug Mode

```typescript
// In +server.ts, add logging
console.log('Generated entries:', allEntries.length);
console.log('Blog posts found:', blogEntries.length);
```

## 📈 SEO Impact

### Benefits

- **Faster Discovery**: Search engines find new content faster
- **Better Indexing**: Proper priority signals to search engines
- **Multi-language SEO**: Both French and English content indexed
- **Fresh Content**: Accurate lastmod dates improve crawl efficiency

### Monitoring

- Google Search Console sitemap reports
- Bing Webmaster Tools coverage reports
- Third-party SEO tools sitemap analysis

---

**Migration Complete**: Static `sitemap.xml` has been removed and replaced with dynamic generation.

**Next Steps**: Monitor search console for proper sitemap processing and update route metadata as content evolves.
