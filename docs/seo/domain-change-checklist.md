# Domain Change Checklist & SEO Update Guide

## Overview

This document provides a comprehensive checklist for domain changes and SEO updates to ensure consistency across the entire application and avoid missing critical files.

## 🚨 Critical Files to Update for Domain Changes

### 1. SEO Core Configuration

**File**: `src/lib/components/SEO.svelte`

- **Line ~26**: `const siteUrl = 'https://www.johan-chan.fr'`
- **Impact**: All canonical URLs, Open Graph images, and meta tags
- **Test**: Check meta tags in browser dev tools

### 2. SEO Data Configuration

**File**: `src/lib/data/seo-data.ts`

- **Purpose**: Page-specific SEO metadata
- **When to update**: Adding new routes or changing domain
- **Required for each route**: title, description, keywords, type

### 3. Static SEO Files

**Files to update**:

- `static/sitemap.xml` - All `<loc>` URLs
- `static/robots.txt` - Sitemap URL reference
- `static/social-preview-test.html` - Domain references and test URLs

### 4. Development/Testing Files

**Files that may need updates**:

- `static/social-preview-test.html` - Social media preview testing
- Any documentation with domain examples

## 🔍 Files to AVOID Changing

### Build Outputs (Auto-generated)

- `.svelte-kit/output/**/*` - Regenerated on build
- `build/**/*` - Regenerated on build
- Any files in `node_modules/` - Third-party dependencies

### External Project References

- `src/routes/portfolio/+layout.ts` - Demo links should remain as GitHub Pages
- Git configuration files - Repository-specific settings

## 📋 Complete Domain Change Checklist

### Pre-Change Analysis

- [ ] Search for old domain: `grep -r "old-domain.com" src/ static/ docs/`
- [ ] Identify external vs internal references
- [ ] Check for hardcoded URLs in configuration files

### Core Updates

- [ ] Update `src/lib/components/SEO.svelte` siteUrl
- [ ] Update `src/lib/data/seo-data.ts` if needed
- [ ] Update `static/sitemap.xml` all URLs
- [ ] Update `static/robots.txt` sitemap reference
- [ ] Update `static/social-preview-test.html` domain references

### New Route Addition Process

- [ ] Create route files (`+page.svelte`, `+page.ts`)
- [ ] Add SEO data to `src/lib/data/seo-data.ts`
- [ ] Add route to `static/sitemap.xml`
- [ ] Update navigation if needed
- [ ] Test SEO meta tags
- [ ] Update social preview test file

### Validation Steps

- [ ] Build project: `pnpm build`
- [ ] Test local development: `pnpm dev`
- [ ] Verify meta tags in browser dev tools
- [ ] Check sitemap accessibility: `/sitemap.xml`
- [ ] Test social media preview: `static/social-preview-test.html`
- [ ] Validate robots.txt: `/robots.txt`

## 🛠️ SEO Update Workflow

### Adding New Routes

1. **Create route structure**:

   ```
   src/routes/new-route/
   ├── +page.svelte
   └── +page.ts
   ```

2. **Add SEO configuration**:

   ```typescript
   // src/lib/data/seo-data.ts
   '/new-route': {
     title: 'Page Title | Johan Chan',
     description: 'Page description for SEO',
     keywords: 'relevant, keywords, here',
     type: 'website'
   }
   ```

3. **Update sitemap**:

   ```xml
   <url>
     <loc>https://www.johan-chan.fr/new-route</loc>
     <lastmod>2025-06-21T05:44:00+00:00</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.7</priority>
   </url>
   ```

4. **Test and validate**:
   - Check meta tags
   - Verify sitemap entry
   - Test social sharing

### Development Environment Routes

For development-only routes, wrap navigation links:

```svelte
{#if data.env === 'development'}
	<Link href="/dev-route">Dev Route</Link>
{/if}
```

## 🔧 Common Issues & Solutions

### Issue: TypeScript errors for new routes

**Solution**: Ensure both `+page.svelte` and `+page.ts` files exist

### Issue: Missing SEO data

**Solution**: Add route to `src/lib/data/seo-data.ts` with complete metadata

### Issue: 404s on new routes

**Solution**: Check route file structure and naming conventions

### Issue: Social media previews not working

**Solution**: Verify Open Graph meta tags and image URLs

## 📊 SEO Priority Guidelines

### URL Priority Levels

- **1.0**: Homepage
- **0.9**: CV/Resume page
- **0.8**: Portfolio, Services (business-critical)
- **0.7**: Contact
- **0.6**: Blog
- **0.5**: Individual blog posts/projects

### Change Frequency

- **daily**: Blog posts, dynamic content
- **weekly**: Homepage, Portfolio
- **monthly**: CV, Services, Contact
- **yearly**: Static pages

## 🚀 Deployment Considerations

### Pre-Deployment

- [ ] All domain references updated
- [ ] Sitemap includes all routes
- [ ] Meta tags tested locally
- [ ] Build completes without errors

### Post-Deployment

- [ ] Submit new sitemap to search engines
- [ ] Update DNS records if domain changed
- [ ] Verify canonical URLs resolve correctly
- [ ] Test social media sharing

## 📝 Documentation Updates

When making changes, update:

- This checklist if process changes
- `docs/seo/README.md` with new strategies
- Project README if domain changes
- Deployment guides with new URLs

## 🔍 Monitoring & Maintenance

### Regular Checks

- Monthly: Verify sitemap accuracy
- Quarterly: Review SEO performance
- After major updates: Re-validate all meta tags
- Before releases: Run complete domain checklist

### Tools for Validation

- Browser dev tools for meta tags
- Google Search Console for sitemap
- Social media debuggers for Open Graph
- SEO audit tools for comprehensive checks

---

**Last Updated**: June 21, 2025  
**Version**: 1.0  
**Maintainer**: SEO Implementation Team
