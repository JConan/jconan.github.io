---
title: "Migrating to Svelte 5: A Complete Guide"
description: "Learn how to migrate your Svelte 4 project to Svelte 5 with runes, covering breaking changes and best practices"
date: "2024-03-15"
author: "Johan Conan"
tags: ["Svelte", "Migration", "Web Development", "Runes"]
category: "Web Development"
featured: true
published: true
excerpt: "A step-by-step guide to migrating from Svelte 4 to Svelte 5, covering runes, breaking changes, and best practices for modern Svelte development."
readingTime: 8
---

# Migrating to Svelte 5: A Complete Guide

Svelte 5 introduces significant changes with the new runes system, bringing improved reactivity and better developer experience. This guide will walk you through the migration process from Svelte 4 to Svelte 5.

## Key Changes in Svelte 5

### 1. Runes System

The biggest change is the introduction of runes for reactive state management.

#### State Management
```typescript
// Svelte 4
let count = 0;
$: doubled = count * 2;

// Svelte 5
let count = $state(0);
let doubled = $derived(count * 2);
```

#### Props
```typescript
// Svelte 4
export let title;
export let description = 'Default description';

// Svelte 5
const { title, description = 'Default description' } = $props();
```

#### Event Handling
```svelte
<!-- Svelte 4 -->
<button on:click={handleClick}>Click me</button>

<!-- Svelte 5 -->
<button onclick={handleClick}>Click me</button>
```

### 2. Slots to Children

```svelte
<!-- Svelte 4 -->
<div>
  <slot></slot>
</div>

<!-- Svelte 5 -->
<script>
  const { children } = $props();
</script>

<div>
  {@render children?.()}
</div>
```

## Migration Steps

### Step 1: Update Dependencies

```bash
pnpm add svelte@5 @sveltejs/kit@latest
pnpm add -D @sveltejs/vite-plugin-svelte@latest
```

### Step 2: Convert State to Runes

Replace reactive declarations with `$state` and `$derived`:

```typescript
// Before
let items = [];
let filteredItems = [];
$: filteredItems = items.filter(item => item.active);

// After
let items = $state([]);
let filteredItems = $derived(items.filter(item => item.active));
```

### Step 3: Update Props Usage

```typescript
// Before
export let data;
export let optional = 'default';

// After
const { data, optional = 'default' } = $props();
```

### Step 4: Replace Slots with Children

```svelte
<!-- Before -->
<Card>
  <slot name="header" slot="header">Default Header</slot>
  <slot>Default content</slot>
</Card>

<!-- After -->
<script>
  const { header, children } = $props();
</script>

<Card>
  {@render header?.() ?? 'Default Header'}
  {@render children?.() ?? 'Default content'}
</Card>
```

### Step 5: Update Event Handlers

```svelte
<!-- Before -->
<input on:input={handleInput} on:change={handleChange} />

<!-- After -->
<input oninput={handleInput} onchange={handleChange} />
```

## Best Practices

### 1. Use TypeScript for Better Type Safety

```typescript
interface Props {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

const { title, items, onSelect } = $props<Props>();
```

### 2. Prefer $derived over $effect

```typescript
// Good - declarative
let total = $derived(items.reduce((sum, item) => sum + item.price, 0));

// Avoid - imperative
let total = $state(0);
$effect(() => {
  total = items.reduce((sum, item) => sum + item.price, 0);
});
```

### 3. Use $effect for Side Effects Only

```typescript
// Good - side effect
$effect(() => {
  document.title = `${title} - My App`;
});

// Avoid - derived value
$effect(() => {
  displayName = `${firstName} ${lastName}`;
});
```

## Common Pitfalls

### 1. Forgetting to Destructure Props

```typescript
// Wrong
export let data;

// Correct
const { data } = $props();
```

### 2. Using $effect for Derived Values

```typescript
// Wrong
let fullName = $state('');
$effect(() => {
  fullName = `${firstName} ${lastName}`;
});

// Correct
let fullName = $derived(`${firstName} ${lastName}`);
```

### 3. Not Handling Optional Children

```svelte
<!-- Wrong -->
{@render children()}

<!-- Correct -->
{@render children?.()}
```

## Testing Your Migration

### Unit Tests

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent.svelte';

describe('MyComponent', () => {
  it('renders with Svelte 5 props', () => {
    render(MyComponent, { 
      props: { title: 'Test Title' } 
    });
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test('component works after migration', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByRole('button')).toBeVisible();
  await page.getByRole('button').click();
  
  await expect(page.getByText('Updated')).toBeVisible();
});
```

## Conclusion

Migrating to Svelte 5 brings significant benefits:

- **Better Performance**: Improved reactivity system
- **Enhanced DX**: More intuitive APIs with runes
- **Type Safety**: Better TypeScript integration
- **Future-Proof**: Aligned with modern web standards

The migration process requires careful attention to the new runes system, but the improved developer experience and performance make it worthwhile.

Take your time with the migration, test thoroughly, and enjoy the enhanced capabilities of Svelte 5!