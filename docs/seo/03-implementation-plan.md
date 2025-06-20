# SEO Implementation Plan

## 📅 4-Week Implementation Timeline

### Week 1: Foundation & Critical SEO (Days 1-7)

**Goal**: Establish basic SEO foundation for immediate search visibility

#### Day 1-2: Meta Tags System

- [ ] Create SEO component in `src/lib/components/SEO.svelte`
- [ ] Implement dynamic meta tags in `src/routes/+layout.svelte`
- [ ] Add page-specific meta data to each route's `+page.ts`
- [ ] Update `src/app.html` with essential meta tags

#### Day 3-4: Social Media Optimization

- [ ] Add Open Graph meta tags
- [ ] Implement Twitter Cards
- [ ] Create social preview images (1200x630px)
- [ ] Test social sharing previews

#### Day 5-7: Technical Foundation

- [ ] Create `static/robots.txt`
- [ ] Implement canonical URLs
- [ ] Add basic XML sitemap generation
- [ ] Set up favicon and web manifest

**Expected Result**: Basic SEO foundation, social sharing ready

---

### Week 2: Structured Data & Professional Optimization (Days 8-14)

**Goal**: Enhance professional discovery and search engine understanding

#### Day 8-10: Structured Data Implementation

- [ ] Add Person schema for professional profile
- [ ] Implement WebSite schema with search action
- [ ] Add BreadcrumbList schema for navigation
- [ ] Create Organization schema (if applicable)

#### Day 11-12: CV Page Optimization

- [ ] Optimize CV page for "développeur freelance" keywords
- [ ] Add professional skills schema
- [ ] Implement downloadable CV with proper meta
- [ ] Add availability status

#### Day 13-14: Portfolio Enhancement

- [ ] Add CreativeWork schema for projects
- [ ] Optimize project pages for technology keywords
- [ ] Implement project case study structure
- [ ] Add technology tags and skills

**Expected Result**: Rich snippets ready, professional profile optimized

---

### Week 3: Content Optimization & French Market (Days 15-21)

**Goal**: Target French freelance market with optimized content

#### Day 15-16: Homepage Optimization

- [ ] Rewrite homepage copy for "développeur d'applications"
- [ ] Add clear freelance availability messaging
- [ ] Implement service descriptions with keywords
- [ ] Add client testimonials section (if available)

#### Day 17-18: French Keyword Integration

- [ ] Update all page titles with French keywords
- [ ] Optimize meta descriptions for French market
- [ ] Add location-based keywords (if targeting specific regions)
- [ ] Implement French business terminology

#### Day 19-21: Internal Linking & Navigation

- [ ] Create strategic internal linking structure
- [ ] Add related projects linking
- [ ] Implement skill-based navigation
- [ ] Add "Services" or "Expertise" section

**Expected Result**: French market optimization, improved site structure

---

### Week 4: International Expansion & Monitoring (Days 22-28)

**Goal**: Prepare for international market and set up monitoring

#### Day 22-24: Bilingual Preparation

- [ ] Add English meta tags (secondary)
- [ ] Implement hreflang attributes (if needed)
- [ ] Create English keyword variations
- [ ] Add international remote work messaging

#### Day 25-26: Advanced Features

- [ ] Implement search functionality (if needed)
- [ ] Add contact form optimization
- [ ] Create project inquiry CTAs
- [ ] Add response time commitments

#### Day 27-28: Monitoring & Analytics

- [ ] Set up Google Search Console
- [ ] Implement Google Analytics 4
- [ ] Create SEO monitoring dashboard
- [ ] Document maintenance procedures

**Expected Result**: International-ready, full monitoring setup

---

## 🛠️ Technical Implementation Details

### File Structure Changes

```
src/
├── lib/
│   ├── components/
│   │   └── SEO.svelte (new)
│   ├── data/
│   │   └── seo-data.ts (new)
│   └── utils/
│       └── seo-helpers.ts (new)
├── routes/
│   ├── +layout.svelte (update)
│   ├── +layout.ts (update)
│   ├── (root)/
│   │   └── +page.ts (new)
│   ├── cv/
│   │   └── +page.ts (update)
│   ├── portfolio/
│   │   └── +page.ts (update)
│   └── contact/
│       └── +page.ts (new)
static/
├── robots.txt (new)
├── sitemap.xml (new)
└── images/
    └── og-images/ (new)
```

### Priority Components to Create

#### 1. SEO Component (`src/lib/components/SEO.svelte`)

```svelte
<script lang="ts">
	interface SEOProps {
		title: string;
		description: string;
		keywords?: string;
		image?: string;
		type?: string;
		canonical?: string;
	}

	const { title, description, keywords, image, type = 'website', canonical } = $props<SEOProps>();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords}<meta name="keywords" content={keywords} />{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	{#if image}<meta property="og:image" content={image} />{/if}
	{#if canonical}<link rel="canonical" href={canonical} />{/if}
</svelte:head>
```

#### 2. SEO Data (`src/lib/data/seo-data.ts`)

```typescript
export const seoData = {
	site: {
		name: "Johan Chan - Développeur d'Applications",
		description: 'Développeur freelance spécialisé en applications web et mobile sur mesure',
		url: 'https://jconan.github.io',
		image: '/images/johan.webp'
	},
	pages: {
		home: {
			title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance Fullstack",
			description:
				"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Devis gratuit.",
			keywords:
				'développeur freelance, création application, développement sur mesure, React, Svelte'
		},
		cv: {
			title: 'CV Johan Chan - Développeur Freelance | Expérience & Compétences',
			description:
				"Consultez l'expérience professionnelle de Johan Chan, développeur freelance spécialisé en applications web et mobile.",
			keywords:
				'CV développeur freelance, expérience React, compétences Svelte, développeur fullstack'
		}
	}
};
```

### robots.txt Content

```
User-agent: *
Allow: /

Sitemap: https://jconan.github.io/sitemap.xml
```

## 📋 Implementation Checklist

### Week 1 Checklist

- [ ] SEO component created and functional
- [ ] Meta tags system implemented
- [ ] Open Graph tags working
- [ ] Twitter Cards implemented
- [ ] robots.txt created
- [ ] Basic sitemap generated
- [ ] Social sharing tested

### Week 2 Checklist

- [ ] Person schema implemented
- [ ] WebSite schema added
- [ ] CV page optimized
- [ ] Portfolio schema added
- [ ] Professional profile enhanced
- [ ] Skills and experience highlighted

### Week 3 Checklist

- [ ] French keywords integrated
- [ ] Homepage copy optimized
- [ ] Service descriptions added
- [ ] Internal linking improved
- [ ] Navigation optimized
- [ ] Freelance messaging clear

### Week 4 Checklist

- [ ] English keywords added
- [ ] International messaging ready
- [ ] Contact optimization complete
- [ ] Analytics implemented
- [ ] Search Console verified
- [ ] Monitoring dashboard created

## 🎯 Success Criteria

### Week 1 Success Metrics

- All pages have proper meta tags
- Social sharing shows correct previews
- Search Console can crawl site
- No technical SEO errors

### Week 2 Success Metrics

- Rich snippets appear in search results
- Professional profile schema validates
- CV page ranks for "CV développeur"
- Portfolio projects properly indexed

### Week 3 Success Metrics

- French keywords show in search console
- Homepage optimized for target terms
- Internal linking score improves
- Site structure validates

### Week 4 Success Metrics

- Full analytics tracking active
- International keywords tracked
- Monitoring system operational
- Documentation complete

## 🔧 Tools and Resources Needed

### Development Tools

- SvelteKit (already installed)
- Schema markup validator
- Open Graph debugger
- Google Search Console
- Google Analytics

### Testing Tools

- Facebook Sharing Debugger
- Twitter Card Validator
- Google Rich Results Test
- PageSpeed Insights
- Mobile-Friendly Test

### Monitoring Tools

- Google Search Console
- Google Analytics 4
- Keyword ranking tracker
- Site performance monitor

---

_Implementation plan created: June 20, 2025_
_Next: Review [Keywords Research](04-keywords-research.md)_
