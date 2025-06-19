# Content Management

## 📝 Overview

This guide explains how to update and manage content across the portfolio website, including blog posts, portfolio items, CV information, and general site content.

## 📝 Blog Management

### Blog System Overview

The blog uses a simple markdown-based approach with content stored in `static/blog/`. This system leverages:
- **Markdown files** for individual posts
- **Index file** for metadata and organization
- **MDSvex** for markdown processing
- **Static generation** for optimal performance

### Blog Structure

```
static/blog/
├── index.md                    # Blog index with metadata
├── 2024-01-15-first-post.md   # Individual posts (YYYY-MM-DD-slug.md)
├── 2024-02-20-svelte-tips.md
└── 2024-03-10-deployment.md
```

### Creating the Blog Index

#### 1. Blog Index File
```markdown
<!-- static/blog/index.md -->
---
title: "Blog"
description: "Technical articles and insights"
---

# Blog Posts

This is the main blog index that contains metadata for all posts.

## Featured Posts
- 2024-03-10-deployment
- 2024-02-20-svelte-tips

## Categories
- Web Development
- SvelteKit
- Deployment
- Best Practices
```

### Adding New Blog Posts

#### 1. Create Post File
Use the naming convention: `YYYY-MM-DD-slug.md`

```markdown
<!-- static/blog/2024-03-15-svelte-5-migration.md -->
---
title: "Migrating to Svelte 5: A Complete Guide"
description: "Learn how to migrate your Svelte 4 project to Svelte 5 with runes"
date: "2024-03-15"
author: "Johan Conan"
tags: ["Svelte", "Migration", "Web Development"]
category: "Web Development"
featured: true
published: true
excerpt: "A step-by-step guide to migrating from Svelte 4 to Svelte 5, covering runes, breaking changes, and best practices."
readingTime: 8
---

# Migrating to Svelte 5: A Complete Guide

## Introduction

Svelte 5 introduces significant changes with the new runes system...

## Key Changes

### State Management
```typescript
// Svelte 4
let count = 0;

// Svelte 5
let count = $state(0);
```

### Props
```typescript
// Svelte 4
export let title;

// Svelte 5
const { title } = $props();
```

## Migration Steps

1. **Update Dependencies**
2. **Convert State to Runes**
3. **Update Props Usage**
4. **Replace Slots with Children**

## Conclusion

The migration to Svelte 5 brings improved performance and developer experience...
```

#### 2. Post Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title |
| `description` | ✅ | Meta description for SEO |
| `date` | ✅ | Publication date (YYYY-MM-DD) |
| `author` | ✅ | Author name |
| `tags` | ✅ | Array of tags |
| `category` | ✅ | Main category |
| `featured` | ❌ | Featured post flag |
| `published` | ❌ | Publication status (default: true) |
| `excerpt` | ❌ | Short summary |
| `readingTime` | ❌ | Estimated reading time in minutes |

### Blog Route Implementation

#### 1. Blog Index Page
```svelte
<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
  const { data } = $props();
  const { posts, categories, featuredPosts } = data;
</script>

<svelte:head>
  <title>Blog | Johan Conan</title>
  <meta name="description" content="Technical articles and insights on web development" />
</svelte:head>

<div class="max-w-4xl mx-auto p-6">
  <header class="mb-12">
    <h1 class="text-4xl font-bold mb-4">Blog</h1>
    <p class="text-xl text-gray-600">Technical articles and insights</p>
  </header>
  
  {#if featuredPosts.length > 0}
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Featured Posts</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {#each featuredPosts as post}
          <article class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">
                <a href="/blog/{post.slug}" class="link link-hover">
                  {post.title}
                </a>
              </h3>
              <p class="text-gray-600">{post.excerpt}</p>
              <div class="card-actions justify-between items-center">
                <div class="flex flex-wrap gap-2">
                  {#each post.tags as tag}
                    <span class="badge badge-outline">{tag}</span>
                  {/each}
                </div>
                <span class="text-sm text-gray-500">{post.readingTime} min read</span>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </section>
  {/if}
  
  <section>
    <h2 class="text-2xl font-semibold mb-6">All Posts</h2>
    <div class="space-y-4">
      {#each posts as post}
        <article class="border-b border-gray-200 pb-4">
          <h3 class="text-xl font-semibold mb-2">
            <a href="/blog/{post.slug}" class="link link-hover">
              {post.title}
            </a>
          </h3>
          <p class="text-gray-600 mb-2">{post.description}</p>
          <div class="flex justify-between items-center text-sm text-gray-500">
            <span>{post.date}</span>
            <span>{post.readingTime} min read</span>
          </div>
        </article>
      {/each}
    </div>
  </section>
</div>
```

#### 2. Blog Post Page
```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  const { data } = $props();
  const { content, meta } = data;
</script>

<svelte:head>
  <title>{meta.title} | Johan Conan Blog</title>
  <meta name="description" content={meta.description} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
</svelte:head>

<article class="max-w-4xl mx-auto p-6">
  <header class="mb-8">
    <h1 class="text-4xl font-bold mb-4">{meta.title}</h1>
    <div class="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
      <span>By {meta.author}</span>
      <span>•</span>
      <time datetime={meta.date}>{meta.date}</time>
      <span>•</span>
      <span>{meta.readingTime} min read</span>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each meta.tags as tag}
        <span class="badge badge-primary">{tag}</span>
      {/each}
    </div>
  </header>
  
  <div class="prose prose-lg max-w-none">
    <svelte:component this={content} />
  </div>
  
  <footer class="mt-12 pt-8 border-t border-gray-200">
    <div class="flex justify-between items-center">
      <a href="/blog" class="btn btn-outline">← Back to Blog</a>
      <div class="flex gap-2">
        <!-- Social sharing buttons -->
        <button class="btn btn-sm btn-outline">Share</button>
      </div>
    </div>
  </footer>
</article>
```

#### 3. Load Functions
```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const blogIndex = await import('../../../static/blog/index.md');
  
  // Get all blog post files
  const modules = import.meta.glob('../../../static/blog/*.md');
  const posts = [];
  
  for (const path in modules) {
    if (path.includes('index.md')) continue;
    
    const module = await modules[path]();
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    posts.push({
      slug,
      ...module.metadata,
      content: module.default
    });
  }
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const featuredPosts = posts.filter(post => post.featured);
  const categories = [...new Set(posts.map(post => post.category))];
  
  return {
    posts: posts.filter(post => post.published !== false),
    featuredPosts,
    categories,
    meta: blogIndex.metadata
  };
};
```

```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../../static/blog/${params.slug}.md`);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    throw error(404, `Could not find blog post: ${params.slug}`);
  }
};
```

### Blog Content Guidelines

#### Writing Style
- **Technical Focus**: In-depth technical content
- **Code Examples**: Include practical code snippets
- **Clear Structure**: Use headings, lists, and code blocks
- **SEO Friendly**: Optimize titles and descriptions

#### Content Categories
- **Web Development**: Frontend/backend techniques
- **SvelteKit**: Framework-specific content
- **Deployment**: CI/CD and hosting guides
- **Best Practices**: Code quality and architecture

#### SEO Optimization
- **Keywords**: Include relevant technical keywords
- **Meta Descriptions**: Compelling 150-160 character descriptions
- **Internal Links**: Link to portfolio projects and other posts
- **External Links**: Reference authoritative sources

## 🎨 Portfolio Management

### Adding New Portfolio Items

#### 1. Create Portfolio Content
```markdown
<!-- static/portfolio/project-name.md -->
---
title: "Project Title"
description: "Brief project description"
technologies: ["Svelte", "TypeScript", "TailwindCSS"]
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/username/repo"
featured: true
order: 1
---

# Project Name

## Overview
Detailed description of the project...

## Technologies Used
- **Frontend**: Svelte, TypeScript
- **Styling**: TailwindCSS, DaisyUI
- **Build**: Vite, SvelteKit

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Challenges & Solutions
Description of technical challenges and how they were solved...
```

#### 2. Add Project Images
```
static/images/portfolio/
├── project-name/
│   ├── hero.webp          # Main project image
│   ├── screenshot-1.webp  # Additional screenshots
│   ├── screenshot-2.webp
│   └── demo.gif           # Demo animation (optional)
```

#### 3. Create Dynamic Route
```typescript
// src/routes/portfolio/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../../static/portfolio/${params.slug}.md`);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
};
```

### Portfolio Page Structure
```svelte
<!-- src/routes/portfolio/[slug]/+page.svelte -->
<script lang="ts">
  const { data } = $props();
  const { content, meta } = data;
</script>

<svelte:head>
  <title>{meta.title} | Johan Conan Portfolio</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<article class="prose prose-lg max-w-4xl mx-auto">
  <header class="mb-8">
    <h1 class="text-4xl font-bold">{meta.title}</h1>
    <p class="text-xl text-gray-600">{meta.description}</p>
    
    <div class="flex flex-wrap gap-2 mt-4">
      {#each meta.technologies as tech}
        <span class="badge badge-primary">{tech}</span>
      {/each}
    </div>
    
    <div class="flex gap-4 mt-6">
      {#if meta.demoUrl}
        <a href={meta.demoUrl} class="btn btn-primary" target="_blank">
          View Demo
        </a>
      {/if}
      {#if meta.githubUrl}
        <a href={meta.githubUrl} class="btn btn-outline" target="_blank">
          View Code
        </a>
      {/if}
    </div>
  </header>
  
  <svelte:component this={content} />
</article>
```

## 📄 CV/Resume Management

### Updating CV Content
```markdown
<!-- static/CV.md -->
---
name: "Johan Conan"
title: "Développeur Fullstack"
email: "contact@johanconan.com"
phone: "+33 X XX XX XX XX"
location: "France"
linkedin: "https://www.linkedin.com/in/johan-chan/"
github: "https://github.com/jconan"
---

# Johan Conan
## Développeur Fullstack

### 💼 Expérience Professionnelle

#### Développeur Fullstack Senior | Entreprise XYZ
*Janvier 2023 - Présent*

- Développement d'applications web modernes avec React/Svelte
- Architecture et mise en place d'APIs REST/GraphQL
- Optimisation des performances et SEO
- Encadrement d'équipe de développeurs junior

#### Développeur Frontend | Startup ABC
*Mars 2021 - Décembre 2022*

- Création d'interfaces utilisateur responsives
- Intégration d'APIs tierces
- Tests automatisés et déploiement continu

### 🎓 Formation

#### Master en Informatique
*Université de Technologie - 2020*

#### Licence en Informatique
*Université Locale - 2018*

### 🛠️ Compétences Techniques

#### Frontend
- **Frameworks**: React, Svelte, Vue.js
- **Langages**: TypeScript, JavaScript, HTML5, CSS3
- **Styling**: TailwindCSS, Styled Components, SASS

#### Backend
- **Langages**: Node.js, Python, PHP
- **Frameworks**: Express, FastAPI, Symfony
- **Bases de données**: PostgreSQL, MongoDB, Redis

#### DevOps & Outils
- **Cloud**: AWS, Google Cloud, Netlify
- **CI/CD**: GitHub Actions, GitLab CI
- **Outils**: Docker, Git, VS Code
```

### CV Page Implementation
```svelte
<!-- src/routes/cv/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import html2pdf from 'html2pdf.js';
  
  const { data } = $props();
  let cvElement: HTMLElement;
  
  const downloadPDF = () => {
    const opt = {
      margin: 1,
      filename: 'Johan_Conan_CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(cvElement).save();
  };
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold">Curriculum Vitae</h1>
    <button class="btn btn-primary" onclick={downloadPDF}>
      Télécharger PDF
    </button>
  </div>
  
  <div bind:this={cvElement} class="cv-content">
    <svelte:component this={data.content} />
  </div>
</div>

<style>
  :global(.cv-content) {
    @apply prose prose-lg max-w-none;
  }
  
  :global(.cv-content h1) {
    @apply text-2xl font-bold mb-2;
  }
  
  :global(.cv-content h2) {
    @apply text-xl font-semibold mb-4 text-primary;
  }
</style>
```

## 📞 Contact Information

### Updating Contact Details
```svelte
<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
  let form = $state({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = async () => {
    // Handle form submission
    console.log('Form submitted:', form);
  };
</script>

<div class="max-w-2xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-8">Contact</h1>
  
  <div class="grid md:grid-cols-2 gap-8">
    <div>
      <h2 class="text-xl font-semibold mb-4">Informations de contact</h2>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <Icon icon="mdi:email" class="text-primary" />
          <a href="mailto:contact@johanconan.com" class="link">
            contact@johanconan.com
          </a>
        </div>
        
        <div class="flex items-center gap-3">
          <Icon icon="mdi:linkedin" class="text-primary" />
          <a href="https://linkedin.com/in/johan-chan" class="link" target="_blank">
            LinkedIn Profile
          </a>
        </div>
        
        <div class="flex items-center gap-3">
          <Icon icon="mdi:github" class="text-primary" />
          <a href="https://github.com/jconan" class="link" target="_blank">
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
    
    <form class="space-y-4" onsubmit={handleSubmit}>
      <div class="form-control">
        <label class="label" for="name">Nom</label>
        <input 
          id="name"
          type="text" 
          class="input input-bordered" 
          bind:value={form.name}
          required 
        />
      </div>
      
      <div class="form-control">
        <label class="label" for="email">Email</label>
        <input 
          id="email"
          type="email" 
          class="input input-bordered" 
          bind:value={form.email}
          required 
        />
      </div>
      
      <div class="form-control">
        <label class="label" for="subject">Sujet</label>
        <input 
          id="subject"
          type="text" 
          class="input input-bordered" 
          bind:value={form.subject}
          required 
        />
      </div>
      
      <div class="form-control">
        <label class="label" for="message">Message</label>
        <textarea 
          id="message"
          class="textarea textarea-bordered h-32" 
          bind:value={form.message}
          required
        ></textarea>
      </div>
      
      <button type="submit" class="btn btn-primary w-full">
        Envoyer le message
      </button>
    </form>
  </div>
</div>
```

## 🏠 Homepage Content

### Hero Section Updates
```svelte
<!-- src/routes/(root)/+page.svelte -->
<script lang="ts">
  const heroContent = {
    greeting: "Salut!",
    name: "Johan",
    title: "développeur Fullstack dans le monde du web et mobile.",
    description: "Passionné par les technologies modernes et l'innovation."
  };
</script>

<div class="hero min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <div class="badge badge-outline badge-lg mb-4">
        {heroContent.greeting}
      </div>
      
      <h1 class="text-5xl font-bold">
        Je suis <span class="text-primary">{heroContent.name},</span>
        <br />
        {heroContent.title}
      </h1>
      
      <p class="py-6">{heroContent.description}</p>
      
      <div class="flex justify-center gap-4">
        <a href="/portfolio" class="btn btn-primary">
          Voir mes projets
        </a>
        <a href="/contact" class="btn btn-outline">
          Me contacter
        </a>
      </div>
    </div>
  </div>
</div>
```

## 🖼️ Image Management

### Image Optimization
```bash
# Convert images to WebP format
cwebp input.jpg -q 80 -o output.webp

# Resize images for different breakpoints
convert input.jpg -resize 400x300 output-sm.jpg
convert input.jpg -resize 800x600 output-md.jpg
convert input.jpg -resize 1200x900 output-lg.jpg
```

### Responsive Images
```svelte
<picture>
  <source media="(min-width: 768px)" srcset="/images/hero-lg.webp" />
  <source media="(min-width: 480px)" srcset="/images/hero-md.webp" />
  <img 
    src="/images/hero-sm.webp" 
    alt="Hero image"
    class="w-full h-auto"
    loading="lazy"
  />
</picture>
```

## 🔧 Configuration Updates

### Site Metadata
```javascript
// src/app.html
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%sveltekit.assets%/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- SEO Meta Tags -->
  <title>Johan Conan - Développeur Fullstack</title>
  <meta name="description" content="Portfolio de Johan Conan, développeur fullstack spécialisé dans le web et mobile. Découvrez mes projets et compétences." />
  <meta name="keywords" content="développeur, fullstack, web, mobile, JavaScript, TypeScript, Svelte, React" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Johan Conan - Développeur Fullstack" />
  <meta property="og:description" content="Portfolio professionnel et projets de développement web et mobile" />
  <meta property="og:image" content="%sveltekit.assets%/og-image.jpg" />
  <meta property="og:url" content="https://jconan.github.io" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Johan Conan - Développeur Fullstack" />
  <meta name="twitter:description" content="Portfolio professionnel et projets de développement web et mobile" />
  
  %sveltekit.head%
</head>
```

## 📊 Analytics & Tracking

### Google Analytics Setup
```javascript
// src/lib/analytics.ts
export const initAnalytics = () => {
  if (typeof gtag !== 'undefined' && import.meta.env.PROD) {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof gtag !== 'undefined' && import.meta.env.PROD) {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};
```

## 🔄 Content Workflow

### Content Update Process
1. **Edit Content**: Update markdown files or Svelte components
2. **Preview Changes**: Run `pnpm dev` to test locally
3. **Commit Changes**: Use descriptive commit messages
4. **Deploy**: Push to main branch for automatic deployment

### Content Validation
```bash
# Check for broken links
npx linkinator http://localhost:5173

# Validate HTML
npx html-validate build/**/*.html

# Check accessibility
npx pa11y http://localhost:5173
```

### Backup Strategy
- **Version Control**: All content tracked in Git
- **Regular Commits**: Frequent commits for content changes
- **Branch Protection**: Use feature branches for major updates
- **Export Options**: PDF generation for CV backup