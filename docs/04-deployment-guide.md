# Deployment Guide

## 🚀 Overview

This project is configured for static site deployment to GitHub Pages using SvelteKit's static adapter. The deployment process is automated through GitHub Actions.

## 🏗️ Build Configuration

### Static Adapter Setup
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};

export default config;
```

### Build Process
```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Preview build locally
pnpm preview
```

## 📦 GitHub Pages Deployment

### Repository Configuration
1. **Repository Name**: `jconan.github.io` (GitHub Pages user site)
2. **Branch**: `main` (source code)
3. **Pages Source**: GitHub Actions
4. **Custom Domain**: Optional configuration

### Deployment Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build
        run: pnpm build
        
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: build/
          
  deploy:
    needs: build
    runs-on: ubuntu-latest
    
    permissions:
      pages: write
      id-token: write
      
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
      
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## 🔧 Environment Configuration

### Environment Variables
```bash
# .env (for local development)
VITE_APP_TITLE="Johan Conan Portfolio"
VITE_APP_DESCRIPTION="Fullstack Developer"
VITE_CONTACT_EMAIL="contact@example.com"
```

### Production Environment
```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false
  }
});
```

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (`pnpm test`)
- [ ] Type checking clean (`pnpm check`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Code formatted (`pnpm format`)

### Content Review
- [ ] Portfolio items up to date
- [ ] CV/Resume current
- [ ] Contact information accurate
- [ ] Links working and current

### Performance
- [ ] Images optimized (WebP format)
- [ ] Bundle size acceptable
- [ ] Lighthouse scores > 90
- [ ] Mobile responsiveness tested

### SEO & Accessibility
- [ ] Meta tags configured
- [ ] Alt text for images
- [ ] Semantic HTML structure
- [ ] Color contrast ratios met

## 🌐 Custom Domain Setup

### DNS Configuration
```
# DNS Records for custom domain
Type    Name    Value
CNAME   www     jconan.github.io
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

### GitHub Pages Settings
1. Go to repository Settings > Pages
2. Set source to "Deploy from a branch"
3. Select branch and folder
4. Add custom domain in "Custom domain" field
5. Enable "Enforce HTTPS"

## 🔍 Build Optimization

### Bundle Analysis
```bash
# Analyze bundle size
pnpm build
npx vite-bundle-analyzer build/

# Check for unused dependencies
npx depcheck

# Audit dependencies
pnpm audit
```

### Performance Optimization
```javascript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte', '@sveltejs/kit'],
          ui: ['daisyui', '@iconify/svelte']
        }
      }
    }
  }
});
```

## 🚨 Troubleshooting

### Common Build Issues

#### Missing Dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Type Errors
```bash
# Regenerate types
pnpm check
npx svelte-kit sync
```

#### Build Failures
```bash
# Check for syntax errors
pnpm lint
pnpm check

# Verbose build output
pnpm build --verbose
```

### GitHub Pages Issues

#### 404 Errors
- Check base path configuration in `svelte.config.js`
- Verify file paths are correct
- Ensure static adapter is properly configured

#### Build Not Updating
- Check GitHub Actions workflow status
- Verify branch protection rules
- Clear browser cache

#### Custom Domain Issues
- Verify DNS propagation with `dig` command
- Check CNAME file in build output
- Ensure HTTPS is enforced

## 📊 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to app.html for basic analytics
<script>
  // Google Analytics or similar
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID');
  }
</script>
```

### Error Tracking
```javascript
// Error boundary for production
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    console.error('Production error:', event.error);
    // Send to error tracking service
  });
}
```

## 🔄 Rollback Strategy

### Quick Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force-with-lease origin main
```

### Backup Strategy
- **Automated Backups**: GitHub automatically maintains commit history
- **Branch Protection**: Require pull request reviews
- **Release Tags**: Tag stable versions for easy rollback

## 🚀 Alternative Deployment Options

### Netlify
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "build",
  "installCommand": "pnpm install"
}
```

### Self-Hosted
```bash
# Build and deploy to server
pnpm build
rsync -av build/ user@server:/var/www/html/
```

## 📈 Deployment Metrics

### Success Criteria
- **Build Time**: < 2 minutes
- **Deploy Time**: < 1 minute
- **Uptime**: 99.9%
- **Performance**: Lighthouse scores > 90

### Monitoring Tools
- **GitHub Actions**: Build and deploy status
- **GitHub Pages**: Uptime and performance
- **Google PageSpeed Insights**: Performance monitoring
- **Google Search Console**: SEO and indexing status