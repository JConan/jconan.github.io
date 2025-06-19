# API Reference

## 🛣️ Routes

### Page Routes

#### Homepage
- **Route**: [`/`](../src/routes/(root)/+page.svelte)
- **Description**: Main landing page with hero section
- **Components**: Hero, Navigation, Social Links
- **Data**: Static content

#### Portfolio
- **Route**: [`/portfolio`](../src/routes/portfolio/+page.svelte)
- **Description**: Portfolio overview page
- **Components**: Project grid, filters
- **Data**: Portfolio items list

#### Portfolio Item
- **Route**: [`/portfolio/[slug]`](../src/routes/portfolio/[slug]/+page.svelte)
- **Description**: Individual project page
- **Parameters**: `slug` - Project identifier
- **Data**: Project content from markdown

#### Portfolio Demo
- **Route**: [`/portfolio/[slug]/demo`](../src/routes/portfolio/[slug]/demo/+page.svelte)
- **Description**: Live demo or detailed view
- **Parameters**: `slug` - Project identifier
- **Data**: Demo configuration

#### CV/Resume
- **Route**: [`/cv`](../src/routes/cv/+page.svelte)
- **Description**: Resume/CV page with PDF download
- **Components**: CV content, PDF generator
- **Data**: CV markdown content

#### Blog
- **Route**: [`/blog`](../src/routes/blog/+page.svelte)
- **Description**: Blog index with all posts
- **Components**: Post list, categories, featured posts
- **Data**: Blog posts from markdown files

#### Blog Post
- **Route**: [`/blog/[slug]`](../src/routes/blog/[slug]/+page.svelte)
- **Description**: Individual blog post
- **Parameters**: `slug` - Post identifier (YYYY-MM-DD-title format)
- **Data**: Post content from markdown

#### Contact
- **Route**: [`/contact`](../src/routes/contact/+page.svelte)
- **Description**: Contact form and information
- **Components**: Contact form, social links
- **Data**: Contact information

## 🧩 Components

### Layout Components

#### Navbar
```typescript
// src/routes/(root)/layout/Navbar.svelte
interface NavbarProps {
  // No required props - uses global state
}

// Usage
<Navbar />
```

#### Link Component
```typescript
// src/routes/(root)/layout/Link.svelte
interface LinkProps {
  href: string;
  children: Snippet;
  class?: string;
  external?: boolean;
}

// Usage
<Link href="/portfolio">Portfolio</Link>
<Link href="https://github.com" external>GitHub</Link>
```

#### Theme Button
```typescript
// src/routes/(root)/layout/ThemeButton.svelte
interface ThemeButtonProps {
  // No props - manages theme state internally
}

// Usage
<ThemeButton />
```

#### Hamburger Button
```typescript
// src/routes/(root)/layout/HamburgerButton.svelte
interface HamburgerButtonProps {
  isOpen: boolean;
  onclick: () => void;
}

// Usage
<HamburgerButton {isOpen} {onclick} />
```

### Icon Components

#### Malt Logo
```typescript
// src/lib/assets/icons/malt-logo.svelte
interface MaltLogoProps {
  size?: number;
  class?: string;
}

// Usage
<MaltLogo size={24} class="text-primary" />
```

## 🔧 Utilities

### Route Helper
```typescript
// src/lib/ROUTES.ts

// Get typed route path
route('/') // returns '/'
route('/blog/[slug]', { slug: '2024-03-15-svelte-tips' }) // returns '/blog/2024-03-15-svelte-tips'
route('/portfolio/[slug]', { slug: 'my-project' }) // returns '/portfolio/my-project'

// Available routes
type Routes =
  | '/'
  | '/blog'
  | '/blog/[slug]'
  | '/contact'
  | '/cv'
  | '/portfolio'
  | '/portfolio/[slug]'
  | '/portfolio/[slug]/demo'

// Route function with parameters
function route<T extends keyof AllTypes>(key: T, ...params: any[]): string

// Search params helper
appendSp({ page: 1, filter: 'web' }) // returns '?page=1&filter=web'
currentSp() // returns current URL search params as object
```

### Theme Management
```typescript
// src/routes/(root)/layout/Theme.svelte.ts

class Theme {
  current: 'light' | 'dark' = $state('light');
  
  toggle(): void;
  set(theme: 'light' | 'dark'): void;
  init(): void; // Initialize from localStorage/system preference
}

// Usage
import { theme } from '$lib/theme';

theme.toggle(); // Switch between light/dark
theme.set('dark'); // Set specific theme
```

## 📊 Data Types

### Portfolio Item
```typescript
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  images?: {
    hero: string;
    screenshots: string[];
  };
  content?: string; // Markdown content
}
```

### Blog Data
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD format
  author: string;
  tags: string[];
  category: string;
  featured?: boolean;
  published?: boolean;
  excerpt?: string;
  readingTime?: number;
  content?: ComponentType; // Svelte component from markdown
}

interface BlogIndex {
  title: string;
  description: string;
  featuredPosts?: string[]; // Array of slugs
  categories?: string[];
}

interface BlogPageData {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: string[];
  meta: BlogIndex;
}
```

### CV Data
```typescript
interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
}
```

### Contact Form
```typescript
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

## 🎨 Styling API

### TailwindCSS Classes

#### Layout Classes
```css
/* Grid layouts */
.grid-portfolio { @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6; }
.grid-hero { @apply grid grid-rows-3 min-h-screen; }

/* Container classes */
.padded-container { @apply px-4 md:px-6 lg:px-8; }
.max-content-width { @apply max-w-7xl mx-auto; }
```

#### Component Classes
```css
/* Buttons */
.btn-primary { @apply btn bg-primary text-primary-content hover:bg-primary-focus; }
.btn-secondary { @apply btn bg-secondary text-secondary-content hover:bg-secondary-focus; }

/* Cards */
.card-portfolio { @apply card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow; }
.card-cv { @apply card bg-base-200 p-6; }
```

### DaisyUI Theme Variables
```css
:root {
  --primary: oklch(65.69% 0.196 275.75);
  --secondary: oklch(74.8% 0.26 183.61);
  --accent: oklch(74.51% 0.167 183.61);
  --neutral: oklch(25.3% 0.015 260.38);
  --base-100: oklch(100% 0 0);
  --base-200: oklch(96.14% 0 0);
  --base-300: oklch(94.51% 0 0);
}
```

## 📱 Responsive Breakpoints

### Breakpoint System
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
} as const;

// Usage in components
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Responsive grid -->
</div>
```

### Responsive Utilities
```typescript
// Check current breakpoint
const isDesktop = $derived(window.innerWidth >= 1024);
const isMobile = $derived(window.innerWidth < 768);

// Responsive image loading
const getImageSrc = (basePath: string, size: 'sm' | 'md' | 'lg') => {
  return `${basePath}-${size}.webp`;
};
```

## 🔍 SEO & Meta

### Meta Tags API
```typescript
// In +page.svelte files
<svelte:head>
  <title>{pageTitle} | Johan Conan Portfolio</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonicalUrl} />
</svelte:head>
```

### Structured Data
```typescript
// JSON-LD for portfolio items
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "author": {
    "@type": "Person",
    "name": "Johan Conan"
  },
  "url": project.demoUrl
};
```

## 🧪 Testing Utilities

### Component Testing
```typescript
// Test utilities for components
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

// Mock data factories
export const createMockPortfolioItem = (overrides = {}): PortfolioItem => ({
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project',
  technologies: ['Svelte', 'TypeScript'],
  ...overrides
});

export const createMockCVData = (overrides = {}): CVData => ({
  personal: {
    name: 'Test User',
    title: 'Developer',
    email: 'test@example.com',
    location: 'Test City'
  },
  experience: [],
  education: [],
  skills: [],
  ...overrides
});
```

### E2E Testing Helpers
```typescript
// Playwright test helpers
import { test, expect, Page } from '@playwright/test';

export const navigateToPortfolio = async (page: Page) => {
  await page.goto('/portfolio');
  await expect(page.getByRole('heading', { name: /portfolio/i })).toBeVisible();
};

export const fillContactForm = async (page: Page, data: ContactForm) => {
  await page.fill('[name="name"]', data.name);
  await page.fill('[name="email"]', data.email);
  await page.fill('[name="subject"]', data.subject);
  await page.fill('[name="message"]', data.message);
};
```

## 🔧 Configuration APIs

### SvelteKit Configuration
```typescript
// svelte.config.js
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['*'],
      handleMissingId: 'warn'
    },
    alias: {
      $components: 'src/lib/components',
      $utils: 'src/lib/utils',
      $types: 'src/lib/types'
    }
  }
};
```

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    sveltekit(),
    kitRoutes<KIT_ROUTES>({
      PAGES: {
        '/portfolio/[slug]': 'slug'
      }
    })
  ],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
});
```

## 📦 Build APIs

### Static Adapter Options
```typescript
import adapter from '@sveltejs/adapter-static';

adapter({
  pages: 'build',        // Output directory
  assets: 'build',       // Assets directory
  fallback: null,        // SPA fallback
  precompress: false,    // Gzip compression
  strict: true          // Strict mode
});
```

### Environment Variables
```typescript
// Available in components
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE;

// Custom environment variables (prefixed with VITE_)
const apiUrl = import.meta.env.VITE_API_URL;
const analyticsId = import.meta.env.VITE_ANALYTICS_ID;