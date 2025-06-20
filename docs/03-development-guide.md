# Development Guide

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18+ recommended
- **pnpm**: Package manager (install with `npm install -g pnpm`)
- **Git**: Version control
- **VS Code**: Recommended editor with Svelte extension

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/jconan/jconan.github.io.git
cd jconan.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
open http://localhost:5173
```

## 🛠️ Development Workflow

### Daily Development
```bash
# Start development with auto-reload
pnpm dev

# Run type checking in watch mode
pnpm check:watch

# Format code before committing
pnpm format

# Lint code for issues
pnpm lint
```

### Code Quality Checks
```bash
# Full type checking
pnpm check

# Run all tests
pnpm test

# Unit tests only
pnpm test:unit

# E2E tests only
pnpm test:integration
```

## 📝 Coding Standards

### Svelte 5 Best Practices

#### State Management
```typescript
// ✅ Use runes for reactive state
const count = $state(0);
const doubled = $derived(count * 2);

// ❌ Don't use stores for component state
import { writable } from 'svelte/store';
const count = writable(0);
```

#### Component Props
```typescript
// ✅ Use $props rune
const { title, description, items = [] } = $props<{
  title: string;
  description?: string;
  items?: Item[];
}>();

// ❌ Don't use export let
export let title: string;
```

#### Event Handling
```typescript
// ✅ Modern event syntax
<button onclick={() => handleClick()}>Click</button>

// ❌ Deprecated syntax
<button on:click={handleClick}>Click</button>
```

#### Children Components
```typescript
// ✅ Use children from $props
const { children } = $props();
{@render children?.()}

// ❌ Don't use slots
<slot></slot>
```

### TypeScript Guidelines

#### Type Definitions
```typescript
// ✅ Define clear interfaces
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

// ✅ Use utility types
type PartialPortfolioItem = Partial<PortfolioItem>;
type RequiredFields = Pick<PortfolioItem, 'id' | 'title'>;
```

#### Component Typing
```typescript
// ✅ Type component props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onclick?: () => void;
}

const { variant = 'primary', size = 'md', disabled = false, onclick } = $props<ButtonProps>();
```

### Styling Guidelines

#### TailwindCSS Usage
```html
<!-- ✅ Use utility classes with responsive modifiers -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
    Content
  </div>
</div>

<!-- ✅ Use DaisyUI components -->
<button class="btn btn-primary btn-lg">
  Primary Action
</button>
```

#### Custom Styles
```html
<!-- ✅ Use style blocks with Tailwind reference -->
<style>
	@reference "tailwindcss";
  @reference "tailwindcss";
  
  .custom-component {
    @apply flex items-center justify-between p-4;
  }
</style>

<!-- ❌ Avoid inline styles -->
<div style="display: flex; padding: 1rem;">Content</div>
```

## 🏗️ Project Structure Guidelines

### File Organization
```
src/
├── lib/
│   ├── components/         # Reusable components
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── stores/            # Global state (if needed)
│   └── assets/            # Static assets
├── routes/
│   ├── (group)/           # Route groups
│   ├── +layout.svelte     # Layout components
│   ├── +page.svelte       # Page components
│   └── +page.ts           # Page load functions
```

### Naming Conventions
- **Components**: PascalCase (`NavButton.svelte`)
- **Pages**: lowercase with + prefix (`+page.svelte`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`PortfolioItem.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🧪 Testing Strategy

### Unit Testing with Vitest
```typescript
// src/lib/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });
});
```

### Component Testing
```typescript
// src/lib/components/Button.test.ts
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders with correct text', () => {
    render(Button, { props: { children: 'Click me' } });
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

### E2E Testing with Playwright
```typescript
// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByRole('heading', { name: /Johan/ })).toBeVisible();
  await expect(page.getByText(/développeur Fullstack/)).toBeVisible();
});
```

## 🔧 Configuration Files

### ESLint Configuration
```javascript
// eslint.config.js
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  {
    rules: {
      // Custom rules
      '@typescript-eslint/no-unused-vars': 'error',
      'svelte/no-at-html-tags': 'error'
    }
  }
];
```

### Prettier Configuration
```json
{
  "useTabs": true,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "plugins": ["prettier-plugin-svelte"],
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte"
      }
    }
  ]
}
```

## 🐛 Debugging

### Development Tools
```typescript
// Enable debugging in development
if (import.meta.env.DEV) {
  console.log('Debug info:', { data, state });
}

// Type-safe environment variables
const API_URL = import.meta.env.VITE_API_URL as string;
```

### Browser DevTools
- **Svelte DevTools**: Install browser extension
- **Network Tab**: Monitor API calls and asset loading
- **Performance Tab**: Analyze runtime performance
- **Lighthouse**: Audit performance, accessibility, SEO

## 📦 Package Management

### Adding Dependencies
```bash
# Production dependency
pnpm add package-name

# Development dependency
pnpm add -D package-name

# Update all dependencies
pnpm update

# Check for outdated packages
pnpm outdated
```

### Dependency Guidelines
- **Minimize Bundle Size**: Prefer smaller, focused packages
- **Type Safety**: Choose packages with TypeScript support
- **Maintenance**: Select actively maintained packages
- **Security**: Regular dependency audits with `pnpm audit`

## 🔄 Git Workflow

### Branch Strategy
```bash
# Feature development
git checkout -b feature/new-portfolio-section
git commit -m "feat: add new portfolio section"
git push origin feature/new-portfolio-section

# Bug fixes
git checkout -b fix/navigation-mobile
git commit -m "fix: mobile navigation menu"
```

### Commit Convention
```bash
# Types: feat, fix, docs, style, refactor, test, chore
git commit -m "feat: add dark mode toggle"
git commit -m "fix: portfolio image loading"
git commit -m "docs: update development guide"
```

## 🚀 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
pnpm build
pnpm vite-bundle-analyzer

# Check build output
ls -la build/
```

### Runtime Performance
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: WebP format, responsive images
- **CSS Optimization**: Purging unused styles
- **JavaScript Minification**: Automatic in production builds