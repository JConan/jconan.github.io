# LLM SEO Rules - Automatic Updates on Route Changes

## CRITICAL: Auto-Trigger SEO Updates

**RULE**: Whenever ANY route-related file is created, modified, or deleted, AUTOMATICALLY check and update SEO components.

### Route Change Detection Triggers

**IF** any of these files are modified:

- `src/routes/**/*+page.svelte` (page components)
- `src/routes/**/*+page.ts` (page load functions)
- `src/routes/**/*+layout.svelte` (layout components)
- `src/routes/**/*+layout.ts` (layout load functions)

**THEN** AUTOMATICALLY execute SEO Update Workflow below.

## SEO Update Workflow (MANDATORY)

### Step 1: Route Analysis

```
1. Extract route path from file location
   Example: `src/routes/services/+page.svelte` → route = "/services"
   Example: `src/routes/blog/[slug]/+page.svelte` → route = "/blog/[slug]"

2. Check if route exists in `src/lib/data/seo-data.ts`
   - IF exists: validate metadata completeness
   - IF missing: CREATE new SEO entry (proceed to Step 2)
```

### Step 2: SEO Data Validation/Creation

**File**: `src/lib/data/seo-data.ts`

**PREFERRED APPROACH**: Use centralized SEO data configuration for consistency and maintainability.

**IF** route missing from seoData object:

```typescript
'/new-route': {
  title: 'Page Title | Johan Chan',
  description: 'SEO-optimized description (150-160 chars)',
  keywords: 'french, keywords, relevant, to, content',
  type: 'website' // or 'article' for blog posts
}
```

**REQUIRED VALIDATIONS**:

- Title: Must end with "| Johan Chan"
- Description: 150-160 characters optimal
- Keywords: French-focused, comma-separated
- Type: 'website', 'article', or 'profile'

**SEO ARCHITECTURE RULE**:

- **PREFER**: Centralized SEO data in `seo-data.ts` over inline SEO components
- **AVOID**: Duplicate SEO definitions (both centralized and inline)
- **EXCEPTION**: Only use inline SEO for highly specialized layouts with unique requirements

### Step 3: Sitemap Update

**File**: `static/sitemap.xml`

**IF** route not in sitemap:

```xml
<url>
  <loc>https://www.johan-chan.fr/new-route</loc>
  <lastmod>CURRENT_DATE_ISO</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

**Priority Guidelines**:

- 1.0: Homepage (/)
- 0.9: CV (/cv)
- 0.8: Journey (/journey), Services (/services)
- 0.7: Contact (/contact)
- 0.6: Blog (/blog)
- 0.5: Individual blog posts, project pages

**Changefreq Guidelines**:

- daily: Blog posts, dynamic content
- weekly: Homepage, Journey
- monthly: Services, CV, Contact, static pages

### Step 4: Route Type Detection & Special Handling

**Blog Routes** (`/blog/*`):

- Type: 'article'
- Priority: 0.5
- Changefreq: 'daily'
- Keywords: Include "blog, article, tutorial"

**Service Routes** (`/services/*`):

- Type: 'website'
- Priority: 0.8
- Keywords: Include "services, développement, freelance"

**Journey Routes** (`/journey/*`):

- Type: 'website'
- Priority: 0.8
- Keywords: Include "parcours apprentissage, learning journey, défis coding, Frontend Mentor"

### Step 5: TypeScript Route Validation

**ALWAYS** ensure both files exist for new routes:

- `+page.svelte` (component)
- `+page.ts` (load function, can be minimal)

**Minimal +page.ts template**:

```typescript
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {};
};
```

## Domain Change Protocol

**IF** domain change detected in `src/lib/components/SEO.svelte`:

### Mandatory Updates (EXECUTE ALL):

1. **SEO Component**: `src/lib/components/SEO.svelte` - siteUrl constant
2. **Sitemap**: `static/sitemap.xml` - all `<loc>` URLs
3. **Robots**: `static/robots.txt` - Sitemap URL
4. **Social Preview**: `static/social-preview-test.html` - domain references

### Files to NEVER Change:

- `src/routes/journey/+layout.ts` - External demo links (GitHub Pages)
- `.svelte-kit/**/*` - Build outputs
- `build/**/*` - Build outputs
- `node_modules/**/*` - Dependencies

## Validation Commands (EXECUTE AFTER CHANGES)

### 1. Build Validation

```bash
pnpm build
```

**Expected**: No TypeScript errors

### 2. Route Accessibility

```bash
pnpm dev
```

**Test**: Navigate to new/modified routes

### 3. SEO Meta Tag Verification

**Browser Dev Tools**: Check `<head>` section for:

- `<title>` tag
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- Open Graph tags (`<meta property="og:*">`)

### 4. Sitemap Validation

**URL**: `/sitemap.xml`
**Check**: New routes appear with correct metadata

## Error Recovery Procedures

### Missing SEO Data Error:

```
Error: Route '/new-route' missing SEO configuration
```

**Fix**: Add entry to `src/lib/data/seo-data.ts`

### TypeScript Route Error:

```
Error: Cannot resolve route '/new-route'
```

**Fix**: Ensure both `+page.svelte` and `+page.ts` exist

### Sitemap XML Error:

```
Error: Invalid XML in sitemap
```

**Fix**: Validate XML structure, check for unescaped characters

### Build Error After Route Addition:

```
Error: Type errors in route files
```

**Fix**: Check PageLoad type imports and export structure

## SEO Content Guidelines

### French Market Optimization:

- **Primary Keywords**: développeur freelance, applications sur mesure, React, Svelte
- **Secondary Keywords**: développement web, applications mobile, Node.js
- **Location Keywords**: France, français, développeur français

### Meta Description Templates:

- **Services**: "Services de développement [TECHNOLOGY] par Johan Chan, développeur freelance. [SPECIFIC_BENEFIT] pour vos projets."
- **Journey**: "Découvrez le parcours d'apprentissage de Johan Chan à travers [PROJECT_TYPE]. Projet éducatif [TECHNOLOGY] avec [KEY_FEATURES]."
- **Blog**: "Article technique sur [TOPIC]. Guide pratique pour [TARGET_AUDIENCE] par Johan Chan, développeur freelance."

### Title Tag Templates:

- **Pages**: "[PAGE_TOPIC] | Johan Chan - Développeur Freelance"
- **Blog**: "[ARTICLE_TITLE] | Blog Technique Johan Chan"
- **Projects**: "[PROJECT_NAME] - Parcours d'Apprentissage Johan Chan"

## Monitoring & Maintenance

### Weekly Checks:

- Verify all routes have SEO data
- Check sitemap completeness
- Validate meta tag accuracy

### After Major Updates:

- Re-run complete validation workflow
- Test social media sharing
- Verify canonical URLs

### Performance Monitoring:

- Check Core Web Vitals impact
- Monitor search console for errors
- Track keyword ranking changes

---

**CRITICAL REMINDER**: These rules MUST be executed automatically whenever route files are modified. No exceptions.

**Last Updated**: June 21, 2025
**Version**: 1.0
**Auto-Trigger**: ON
