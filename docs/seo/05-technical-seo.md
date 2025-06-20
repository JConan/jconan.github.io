# Technical SEO Implementation Guide

## 🔧 Core Technical SEO Components

### 1. Meta Tags System Implementation

#### SEO Component (`src/lib/components/SEO.svelte`)

```svelte
<script lang="ts">
	import { page } from '$app/stores';

	interface SEOProps {
		title: string;
		description: string;
		keywords?: string;
		image?: string;
		type?: 'website' | 'article' | 'profile';
		canonical?: string;
		noindex?: boolean;
		author?: string;
	}

	const {
		title,
		description,
		keywords,
		image = '/images/johan.webp',
		type = 'website',
		canonical,
		noindex = false,
		author = 'Johan Chan'
	} = $props<SEOProps>();

	const siteUrl = 'https://jconan.github.io';
	const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
	const fullCanonical = canonical || `${siteUrl}${$page.url.pathname}`;
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords}<meta name="keywords" content={keywords} />{/if}
	<meta name="author" content={author} />
	<link rel="canonical" href={fullCanonical} />

	<!-- Robots -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullCanonical} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:image:alt" content={title} />
	<meta property="og:site_name" content="Johan Chan - Développeur d'Applications" />
	<meta property="og:locale" content="fr_FR" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:creator" content="@johanchan" />

	<!-- Additional SEO -->
	<meta name="language" content="French" />
	<meta name="geo.region" content="FR" />
	<meta name="geo.placename" content="France" />
</svelte:head>
```

#### SEO Data Configuration (`src/lib/data/seo-data.ts`)

```typescript
export interface SEOData {
	title: string;
	description: string;
	keywords?: string;
	image?: string;
	type?: 'website' | 'article' | 'profile';
}

export const defaultSEO: SEOData = {
	title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance Fullstack",
	description:
		"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Devis gratuit sous 24h.",
	keywords:
		'développeur freelance, création application, développement sur mesure, React, Svelte, Node.js',
	image: '/images/johan.webp',
	type: 'website'
};

export const seoData: Record<string, SEOData> = {
	'/': {
		title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance Fullstack",
		description:
			"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Devis gratuit sous 24h.",
		keywords:
			'développeur freelance, création application, développement sur mesure, React, Svelte, Node.js, application mobile',
		type: 'website'
	},
	'/cv': {
		title: 'CV Johan Chan - Développeur Freelance | Expérience React, Svelte, Node.js',
		description:
			'Consultez le CV de Johan Chan, développeur freelance avec expertise en applications web et mobile. Compétences React, Svelte, TypeScript.',
		keywords:
			'CV développeur freelance, expérience React, compétences Svelte, développeur fullstack, portfolio technique',
		type: 'profile'
	},
	'/portfolio': {
		title: "Portfolio Johan Chan - Réalisations d'Applications Web & Mobile",
		description:
			'Découvrez les applications créées par Johan Chan : projets React, Svelte, applications mobiles. Études de cas et technologies utilisées.',
		keywords:
			'portfolio développeur, réalisations React, projets Svelte, applications mobiles, études de cas',
		type: 'website'
	},
	'/contact': {
		title: 'Contact & Devis Gratuit - Johan Chan Développeur Freelance',
		description:
			"Contactez Johan Chan pour votre projet d'application. Devis gratuit et réponse rapide sous 24h pour vos besoins de développement.",
		keywords:
			'contact développeur freelance, devis développement, projet application, développeur React disponible',
		type: 'website'
	}
};

export function getSEOData(pathname: string): SEOData {
	return seoData[pathname] || defaultSEO;
}
```

### 2. Structured Data Implementation

#### JSON-LD Schema (`src/lib/components/StructuredData.svelte`)

```svelte
<script lang="ts">
	import { page } from '$app/stores';

	const siteUrl = 'https://jconan.github.io';

	// Person Schema for Professional Profile
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Johan Chan',
		jobTitle: "Développeur d'Applications Freelance",
		description:
			"Spécialiste en création d'applications web et mobile sur mesure avec React, Svelte et Node.js",
		url: siteUrl,
		image: `${siteUrl}/images/johan.webp`,
		sameAs: [
			'https://www.linkedin.com/in/johan-chan/',
			'https://www.malt.fr/profile/johanchan',
			'https://github.com/jconan'
		],
		knowsAbout: [
			'React Development',
			'Svelte Development',
			'Node.js',
			'TypeScript',
			'Mobile App Development',
			'Full-stack Development',
			'Custom Application Development'
		],
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Freelance Application Developer',
			description: "Création d'applications web et mobile personnalisées",
			skills: 'React, Svelte, Node.js, TypeScript, Mobile Development'
		},
		worksFor: {
			'@type': 'Organization',
			name: 'Freelance',
			description: "Services de développement d'applications indépendant"
		}
	};

	// Website Schema
	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: "Johan Chan - Développeur d'Applications",
		description: "Portfolio professionnel et services de développement d'applications",
		url: siteUrl,
		author: {
			'@type': 'Person',
			name: 'Johan Chan'
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: `${siteUrl}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};

	// Professional Service Schema
	const serviceSchema = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: "Services de Développement d'Applications",
		description: "Création d'applications web et mobile sur mesure",
		provider: {
			'@type': 'Person',
			name: 'Johan Chan'
		},
		serviceType: 'Application Development',
		areaServed: 'France',
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services de Développement',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: "Développement d'Applications Web",
						description: "Création d'applications web avec React, Svelte"
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: "Développement d'Applications Mobile",
						description: 'Applications mobiles natives et hybrides'
					}
				}
			]
		}
	};

	// BreadcrumbList for Navigation
	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Accueil',
				item: siteUrl
			}
		]
	};

	// Add current page to breadcrumb
	if ($page.url.pathname !== '/') {
		const pathSegments = $page.url.pathname.split('/').filter(Boolean);
		pathSegments.forEach((segment, index) => {
			breadcrumbSchema.itemListElement.push({
				'@type': 'ListItem',
				position: index + 2,
				name: segment.charAt(0).toUpperCase() + segment.slice(1),
				item: `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`
			});
		});
	}
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>
```

### 3. Sitemap Generation

#### Sitemap Generator (`src/lib/utils/sitemap-generator.ts`)

```typescript
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
```

### 4. robots.txt Configuration

#### Static robots.txt (`static/robots.txt`)

```
User-agent: *
Allow: /

# Disallow admin or private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /.git/

# Allow important files
Allow: /images/
Allow: /static/
Allow: /*.css
Allow: /*.js

# Sitemap location
Sitemap: https://jconan.github.io/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1
```

### 5. Layout Integration

#### Updated Layout (`src/routes/+layout.svelte`)

```svelte
<script lang="ts">
	import '../app.css';
	import Link from './(root)/layout/Link.svelte';
	import Navbar from './(root)/layout/Navbar.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { getSEOData } from '$lib/data/seo-data';
	import { page } from '$app/stores';

	const { children, data } = $props();

	// Get SEO data for current page
	$: seoData = getSEOData($page.url.pathname);
</script>

<!-- SEO Components -->
<SEO {...seoData} />
<StructuredData />

<!-- Theme loading script -->
<svelte:head>
	<script>
		const dataTheme = localStorage.getItem('theme');
		if (dataTheme) document.documentElement.setAttribute('data-theme', dataTheme);
	</script>
</svelte:head>

<Navbar>
	{#snippet brand()}
		<a class="btn btn-ghost text-xl" href="/"> Johan Chan </a>
	{/snippet}

	<Link href="/">Accueil</Link>
	<Link href="/portfolio" preload="off">Portfolio</Link>
	<Link href="/cv">CV</Link>
	<Link href="/contact">Contact</Link>
</Navbar>

<main class="content-grid p-4">
	{@render children()}
</main>

<style>
	@reference "tailwindcss";
	/* ... existing styles ... */
</style>
```

### 6. Page-Specific SEO Implementation

#### Homepage SEO (`src/routes/(root)/+page.ts`)

```typescript
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance Fullstack",
			description:
				"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Devis gratuit sous 24h.",
			keywords:
				'développeur freelance, création application, développement sur mesure, React, Svelte, Node.js, application mobile'
		}
	};
};
```

#### CV Page SEO (`src/routes/cv/+page.ts`)

```typescript
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: 'CV Johan Chan - Développeur Freelance | Expérience React, Svelte, Node.js',
			description:
				'Consultez le CV de Johan Chan, développeur freelance avec expertise en applications web et mobile. Compétences React, Svelte, TypeScript.',
			keywords:
				'CV développeur freelance, expérience React, compétences Svelte, développeur fullstack, portfolio technique',
			type: 'profile' as const
		}
	};
};
```

### 7. Performance Optimization

#### Image Optimization

```svelte
<!-- Optimized images with proper alt text -->
<img
	src="/images/johan.webp"
	alt="Johan Chan - Développeur d'applications freelance spécialisé React et Svelte"
	width="400"
	height="400"
	loading="lazy"
	decoding="async"
/>
```

#### Critical CSS Inlining

```html
<!-- In src/app.html -->
<style>
	/* Critical CSS for above-the-fold content */
	.hero {
		/* ... */
	}
	.navbar {
		/* ... */
	}
</style>
```

### 8. Monitoring and Analytics

#### Google Analytics 4 Integration

```svelte
<!-- In src/app.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Search Console Verification

```html
<!-- In src/app.html head -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

## 📋 Technical SEO Checklist

### Core Implementation

- [ ] SEO component created and integrated
- [ ] Structured data schemas implemented
- [ ] Meta tags system functional
- [ ] Canonical URLs implemented
- [ ] robots.txt created
- [ ] Sitemap generated

### Social Media Optimization

- [ ] Open Graph tags implemented
- [ ] Twitter Cards configured
- [ ] Social preview images optimized
- [ ] Social sharing tested

### Performance

- [ ] Image optimization implemented
- [ ] Critical CSS identified
- [ ] Loading performance optimized
- [ ] Mobile responsiveness verified

### Monitoring

- [ ] Google Analytics implemented
- [ ] Search Console verified
- [ ] Error monitoring setup
- [ ] Performance monitoring active

---

_Technical SEO guide completed: June 20, 2025_
_Next: Review [Content Guidelines](06-content-guidelines.md)_
