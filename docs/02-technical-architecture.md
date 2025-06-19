# Technical Architecture

## 🏗️ Technology Stack

### Core Framework
- **SvelteKit 2.7**: Meta-framework for building web applications
- **Svelte 5**: Latest version with runes for reactive state management
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Build tool and development server

### Styling & UI
- **TailwindCSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **PostCSS**: CSS processing and optimization
- **Iconify**: Icon system with SVG support

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Svelte Check**: Svelte-specific type checking

### Testing
- **Playwright**: End-to-end testing
- **Vitest**: Unit testing framework
- **@playwright/test**: Browser automation testing

### Build & Deployment
- **@sveltejs/adapter-static**: Static site generation
- **GitHub Pages**: Hosting platform
- **pnpm**: Package manager

## 📁 Project Structure

```
jconan.github.io/
├── docs/                    # Documentation
├── src/
│   ├── app.html            # HTML template
│   ├── app.css             # Global styles
│   ├── lib/
│   │   ├── assets/         # Images, icons, static assets
│   │   ├── ROUTES.ts       # Auto-generated route definitions
│   │   └── index.ts        # Library exports
│   └── routes/
│       ├── +layout.svelte  # Root layout
│       ├── (root)/         # Homepage group
│       ├── blog/           # Blog section (markdown-based)
│       ├── contact/        # Contact page
│       ├── cv/             # CV/Resume page
│       └── portfolio/      # Portfolio section
├── static/
│   ├── blog/               # Blog content (markdown files)
│   │   ├── index.md        # Blog index with metadata
│   │   └── *.md            # Individual blog posts
│   └── images/             # Static images and assets
├── tests/                  # Test files
└── config files           # Various configuration files
```

## 🔧 Key Dependencies

### Production Dependencies
```json
{
  "@iconify/svelte": "^4.0.2",
  "@sveltejs/adapter-static": "^3.0.6",
  "@sveltejs/kit": "^2.7.3",
  "daisyui": "^4.12.13",
  "html2pdf.js": "^0.10.2",
  "jspdf": "^2.5.2",
  "marked": "^14.1.3",
  "mdsvex": "^0.12.3",
  "svelte": "5.1.3",
  "tailwindcss": "^3.4.14"
}
```

### Development Dependencies
- **Type Checking**: TypeScript, @types packages
- **Testing**: Playwright, Vitest
- **Linting**: ESLint, Prettier
- **Build Tools**: Vite, PostCSS, Autoprefixer

## 🛣️ Routing System

### Auto-Generated Routes
The project uses `vite-plugin-kit-routes` to generate type-safe route definitions:

```typescript
const PAGES = {
  "/": `/`,
  "/blog": `/blog`,
  "/blog/[slug]": (params: { slug: string | number }) =>
    `/blog/${params.slug}`,
  "/contact": `/contact`,
  "/cv": `/cv`,
  "/portfolio": `/portfolio`,
  "/portfolio/[slug]": (params: { slug: string | number }) =>
    `/portfolio/${params.slug}`,
  "/portfolio/[slug]/demo": (params: { slug: string | number }) =>
    `/portfolio/${params.slug}/demo`
}
```

### Route Groups
- **(root)**: Homepage and main layout components
- **blog**: Markdown-based blog system with dynamic post routing
- **portfolio**: Dynamic portfolio pages with slug-based routing
- **contact**: Contact form and information
- **cv**: Resume/CV with PDF generation

## 🎨 Styling Architecture

### TailwindCSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography')
  ]
}
```

### DaisyUI Components
- **Buttons**: `btn`, `btn-circle`, `btn-outline`
- **Layout**: `hero`, `badge`, `grid`
- **Navigation**: Responsive navbar components
- **Themes**: Built-in dark/light mode support

## 🔄 State Management

### Svelte 5 Runes
```typescript
// Modern reactive state with runes
const theme = $state('light');
const isMenuOpen = $state(false);
const portfolioItems = $derived(/* computed value */);
```

### Props System
```typescript
// Component props using $props rune
const { data, slug } = $props<{
  data: PageData;
  slug?: string;
}>();
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Base styles for mobile devices
- **Tablet**: `md:` classes for medium screens
- **Desktop**: `lg:` and `xl:` for larger displays
- **Responsive Images**: Optimized for different screen sizes

### Performance Optimizations
- **Static Site Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: WebP format and responsive sizing
- **Code Splitting**: Automatic route-based code splitting
- **CSS Purging**: Unused styles removed in production

## 🔧 Build Process

### Development
```bash
pnpm dev          # Start development server
pnpm check        # Type checking
pnpm lint         # Code linting
pnpm format       # Code formatting
```

### Production
```bash
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Testing
```bash
pnpm test         # Run all tests
pnpm test:unit    # Unit tests only
pnpm test:integration  # E2E tests only
```

## 🚀 Deployment Architecture

### Static Site Generation
- **Adapter**: `@sveltejs/adapter-static`
- **Output**: Static HTML, CSS, and JavaScript files
- **Hosting**: GitHub Pages with automatic deployment

### CI/CD Pipeline
- **Source Control**: GitHub repository
- **Build Trigger**: Push to main branch
- **Deployment**: Automatic to GitHub Pages
- **Domain**: Custom domain support available

## 🔒 Security Considerations

### Content Security Policy
- **Static Assets**: Served from trusted domains
- **External Links**: Proper `rel` attributes for security
- **Form Handling**: Client-side validation and sanitization

### Performance Security
- **Bundle Analysis**: Regular dependency auditing
- **Static Generation**: Reduced attack surface
- **HTTPS**: Enforced secure connections