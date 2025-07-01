---
title: 'SvelteKit Deployment: From Development to Production'
description: 'Complete guide to deploying SvelteKit applications to various platforms including Vercel, Netlify, and GitHub Pages'
date: '2024-02-20'
author: 'Johan Conan'
tags: ['SvelteKit', 'Deployment', 'DevOps', 'GitHub Pages']
category: 'Deployment'
featured: true
published: true
excerpt: 'Learn how to deploy your SvelteKit applications to production with different hosting platforms, covering static generation, server-side rendering, and CI/CD setup.'
readingTime: 12
translation_id: 'sveltekit-deployment-2024'
---

# SvelteKit Deployment: From Development to Production

Deploying a SvelteKit application involves choosing the right adapter and hosting platform for your needs. This comprehensive guide covers various deployment strategies and platforms.

## Understanding SvelteKit Adapters

SvelteKit uses adapters to optimize your application for different deployment targets.

### Static Adapter (`@sveltejs/adapter-static`)

Perfect for static sites, GitHub Pages, and CDNs.

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

### Auto Adapter (`@sveltejs/adapter-auto`)

Automatically detects the deployment platform.

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
```

### Node Adapter (`@sveltejs/adapter-node`)

For traditional Node.js servers.

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: false,
			envPrefix: ''
		})
	}
};

export default config;
```

## Platform-Specific Deployments

### GitHub Pages

Perfect for portfolio sites and static applications.

#### 1. Configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/your-repo-name' : ''
		}
	}
};

export default config;
```

#### 2. GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
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

### Vercel

Excellent for full-stack applications with serverless functions.

#### 1. Installation

```bash
pnpm add -D @sveltejs/adapter-vercel
```

#### 2. Configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x',
			regions: ['iad1'],
			split: false
		})
	}
};

export default config;
```

#### 3. Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify

Great for static sites with form handling and edge functions.

#### 1. Configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-netlify';

const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: false
		})
	}
};

export default config;
```

#### 2. Netlify Configuration

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Docker Deployment

For containerized deployments.

#### 1. Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
CMD ["node", "build"]
```

#### 2. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  sveltekit-app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Environment Configuration

### Environment Variables

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My SvelteKit App

# .env.production
VITE_API_URL=https://api.production.com
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Runtime Configuration

```typescript
// src/lib/config.ts
export const config = {
	apiUrl: import.meta.env.VITE_API_URL,
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD,
	analyticsId: import.meta.env.VITE_ANALYTICS_ID
};
```

## Performance Optimization

### Prerendering

```javascript
// src/routes/+layout.ts
export const prerender = true;

// Or selectively
// src/routes/blog/+page.ts
export const prerender = true;
```

### Code Splitting

```javascript
// Dynamic imports for code splitting
const LazyComponent = lazy(() => import('./LazyComponent.svelte'));

// Route-based splitting is automatic in SvelteKit
```

### Image Optimization

```svelte
<script>
  import { dev } from '$app/environment';

  const getOptimizedImage = (src, size) => {
    if (dev) return src;
    return `/images/${src}-${size}.webp`;
  };
</script>

<picture>
  <source media="(min-width: 768px)" srcset={getOptimizedImage('hero', 'lg')} />
  <source media="(min-width: 480px)" srcset={getOptimizedImage('hero', 'md')} />
  <img src={getOptimizedImage('hero', 'sm')} alt="Hero" loading="lazy" />
</picture>
```

## CI/CD Best Practices

### Build Optimization

```bash
# Build script with optimizations
pnpm build --mode production

# Bundle analysis
pnpm build && npx vite-bundle-analyzer build/
```

### Testing in CI

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: pnpm install

      - name: Run tests
        run: pnpm test

      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Check types
        run: pnpm check

      - name: Lint
        run: pnpm lint
```

### Security Considerations

```javascript
// Content Security Policy
// app.html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">

// Environment variable validation
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is required');
}
```

## Monitoring and Analytics

### Error Tracking

```typescript
// src/hooks.client.ts
import { handleError } from '@sveltejs/kit';

export const handleError = ({ error, event }) => {
	console.error('Client error:', error);

	// Send to error tracking service
	if (import.meta.env.PROD) {
		// Sentry, LogRocket, etc.
	}
};
```

### Performance Monitoring

```typescript
// src/app.html
<script>
  // Web Vitals
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
</script>
```

## Troubleshooting Common Issues

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .svelte-kit node_modules
pnpm install
pnpm build

# Check for type errors
pnpm check
```

### Hydration Mismatches

```typescript
// Ensure SSR and client render the same content
import { browser } from '$app/environment';

{#if browser}
  <!-- Client-only content -->
{/if}
```

### Environment Variable Issues

```typescript
// Validate required environment variables
const requiredEnvVars = ['VITE_API_URL'];

requiredEnvVars.forEach((varName) => {
	if (!import.meta.env[varName]) {
		throw new Error(`Missing required environment variable: ${varName}`);
	}
});
```

## Conclusion

Successful SvelteKit deployment involves:

1. **Choosing the right adapter** for your hosting platform
2. **Configuring environment variables** properly
3. **Setting up CI/CD pipelines** for automated deployments
4. **Optimizing performance** with prerendering and code splitting
5. **Monitoring** your application in production

Each platform has its strengths - GitHub Pages for static sites, Vercel for full-stack apps, and Netlify for JAMstack applications. Choose based on your specific needs and scale accordingly.

Remember to test your deployment thoroughly and monitor performance metrics to ensure a smooth user experience.
