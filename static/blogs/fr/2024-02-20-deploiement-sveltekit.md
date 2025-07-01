---
title: 'Déploiement SvelteKit : Du Développement à la Production'
description: 'Guide complet pour déployer des applications SvelteKit sur diverses plateformes incluant Vercel, Netlify et GitHub Pages'
date: '2024-02-20'
author: 'Johan Conan'
tags: ['SvelteKit', 'Déploiement', 'DevOps', 'GitHub Pages']
category: 'Déploiement'
featured: true
published: false
excerpt: "Apprenez à déployer vos applications SvelteKit en production avec différentes plateformes d'hébergement, couvrant la génération statique, le rendu côté serveur et la configuration CI/CD."
readingTime: 12
translation_id: 'sveltekit-deployment-2024'
---

# Déploiement SvelteKit : Du Développement à la Production

Le déploiement d'une application SvelteKit implique de choisir le bon adaptateur et la plateforme d'hébergement adaptée à vos besoins. Ce guide complet couvre diverses stratégies de déploiement et plateformes.

## Comprendre les Adaptateurs SvelteKit

SvelteKit utilise des adaptateurs pour optimiser votre application selon différentes cibles de déploiement.

### Adaptateur Statique (`@sveltejs/adapter-static`)

Parfait pour les sites statiques, GitHub Pages et les CDN.

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

### Adaptateur Auto (`@sveltejs/adapter-auto`)

Détecte automatiquement la plateforme de déploiement.

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

### Adaptateur Node (`@sveltejs/adapter-node`)

Pour les serveurs Node.js traditionnels.

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

## Déploiements Spécifiques aux Plateformes

### GitHub Pages

Parfait pour les sites portfolio et applications statiques.

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
			base: process.env.NODE_ENV === 'production' ? '/nom-de-votre-repo' : ''
		}
	}
};

export default config;
```

#### 2. Workflow GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Déployer sur GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configuration Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Configuration pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Installation des dépendances
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Upload de l'artefact Pages
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
      - name: Déployer sur GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Vercel

Excellent pour les applications full-stack avec fonctions serverless.

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

#### 3. Déploiement

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Déploiement en production
vercel --prod
```

### Netlify

Idéal pour les sites statiques avec gestion de formulaires et edge functions.

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

#### 2. Configuration Netlify

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

### Déploiement Docker

Pour les déploiements conteneurisés.

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

## Configuration d'Environnement

### Variables d'Environnement

```bash
# .env
VITE_API_URL=https://api.exemple.com
VITE_APP_TITLE=Mon App SvelteKit

# .env.production
VITE_API_URL=https://api.production.com
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Configuration Runtime

```typescript
// src/lib/config.ts
export const config = {
	apiUrl: import.meta.env.VITE_API_URL,
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD,
	analyticsId: import.meta.env.VITE_ANALYTICS_ID
};
```

## Optimisation des Performances

### Pré-rendu

```javascript
// src/routes/+layout.ts
export const prerender = true;

// Ou sélectivement
// src/routes/blog/+page.ts
export const prerender = true;
```

### Division du Code

```javascript
// Imports dynamiques pour la division du code
const LazyComponent = lazy(() => import('./LazyComponent.svelte'));

// La division basée sur les routes est automatique dans SvelteKit
```

### Optimisation d'Images

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

## Bonnes Pratiques CI/CD

### Optimisation du Build

```bash
# Script de build avec optimisations
pnpm build --mode production

# Analyse du bundle
pnpm build && npx vite-bundle-analyzer build/
```

### Tests en CI

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

      - name: Installation des dépendances
        run: pnpm install

      - name: Exécution des tests
        run: pnpm test

      - name: Tests E2E
        run: pnpm test:e2e

      - name: Vérification des types
        run: pnpm check

      - name: Lint
        run: pnpm lint
```

### Considérations de Sécurité

```javascript
// Content Security Policy
// app.html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">

// Validation des variables d'environnement
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL est requis');
}
```

## Monitoring et Analytics

### Suivi des Erreurs

```typescript
// src/hooks.client.ts
import { handleError } from '@sveltejs/kit';

export const handleError = ({ error, event }) => {
	console.error('Erreur client:', error);

	// Envoyer au service de suivi d'erreurs
	if (import.meta.env.PROD) {
		// Sentry, LogRocket, etc.
	}
};
```

### Monitoring des Performances

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

## Résolution de Problèmes Courants

### Échecs de Build

```bash
# Nettoyer le cache et rebuilder
rm -rf .svelte-kit node_modules
pnpm install
pnpm build

# Vérifier les erreurs de type
pnpm check
```

### Désaccords d'Hydratation

```typescript
// S'assurer que SSR et client rendent le même contenu
import { browser } from '$app/environment';

{#if browser}
  <!-- Contenu uniquement côté client -->
{/if}
```

### Problèmes de Variables d'Environnement

```typescript
// Valider les variables d'environnement requises
const requiredEnvVars = ['VITE_API_URL'];

requiredEnvVars.forEach((varName) => {
	if (!import.meta.env[varName]) {
		throw new Error(`Variable d'environnement requise manquante: ${varName}`);
	}
});
```

## Conclusion

Un déploiement SvelteKit réussi implique :

1. **Choisir le bon adaptateur** pour votre plateforme d'hébergement
2. **Configurer correctement les variables d'environnement**
3. **Mettre en place des pipelines CI/CD** pour des déploiements automatisés
4. **Optimiser les performances** avec le pré-rendu et la division du code
5. **Surveiller et maintenir** votre application en production

Avec ces stratégies, vous serez équipé pour déployer des applications SvelteKit robustes et performantes qui évoluent avec vos besoins.
