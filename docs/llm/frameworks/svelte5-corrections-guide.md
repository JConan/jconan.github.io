# Svelte 5 Corrections Guide - Modern Syntax & Patterns

<!-- CONDENSATION_SAFE_START -->

## Meta Information

- **Domain**: Frontend Framework Corrections
- **Correction Focus**: Svelte 5 syntax migration and modern patterns
- **LLM Mistake Patterns**: Deprecated syntax, outdated patterns, store-based reactivity
- **Project Types**: SvelteKit, Svelte 5 projects
- **Trigger Keywords**: svelte, svelte5, on:click, slot, store, runes, $state, $derived, $props
- **Subtasks Supported**: event_syntax_correction, children_pattern_correction, reactivity_migration, style_block_correction
- **Last Updated**: March 7, 2025
- **Condensation Safe**: YES
<!-- CONDENSATION_SAFE_END -->

## Quick Correction Reference

<!-- CRITICAL_PRESERVE_START -->

**Most Critical Svelte 5 Corrections**:

1. ❌ LLM often generates: `on:click={handler}`
   ✅ Use instead: `onclick={handler}`

2. ❌ LLM often generates: `<slot></slot>`
   ✅ Use instead: `{@render children()}`

3. ❌ LLM often generates: `import { writable } from 'svelte/store'`
   ✅ Use instead: `let state = $state(initialValue)`

4. ❌ LLM often generates: `style="color: red"`
   ✅ Use instead: `<style>` block with Tailwind reference

<!-- CRITICAL_PRESERVE_END -->

---

## Overview

This guide addresses common mistakes LLMs make when generating Svelte 5 code. LLMs often default to Svelte 4 patterns or outdated syntax that breaks in Svelte 5 projects.

---

<!-- SUBTASK_START: event_syntax_correction -->

## Correction: Event Handling Syntax

### LLM Mistake Pattern

**What LLMs Often Generate**:

```svelte
<!-- ❌ Deprecated Svelte 4 syntax -->
<button on:click={handleClick}>Click me</button>
<input on:input={handleInput} />
<form on:submit={handleSubmit}>
```

**Why This Is Wrong**:

- `on:` syntax is deprecated in Svelte 5
- Causes compilation errors
- Not future-compatible

### Correct Approach

**What To Use Instead**:

```svelte
<!-- ✅ Modern Svelte 5 syntax -->
<button onclick={handleClick}>Click me</button>
<input oninput={handleInput} />
<form onsubmit={handleSubmit}>
```

**Why This Is Better**:

- Native Svelte 5 syntax
- Better performance
- Aligns with web standards
- Future-proof

### Detection & Verification

**How to Detect This Mistake**:

- Search for `on:` patterns in `.svelte` files
- Look for `:` in event handler attributes
- Check for compilation errors mentioning deprecated syntax

**How to Verify Correction**:

```bash
# Search for remaining deprecated patterns
grep -r "on:" src/ --include="*.svelte"

# Should return no results after correction
```

### Project-Specific Adaptations

#### SvelteKit Integration

```svelte
<!-- ✅ Modern event handling in SvelteKit -->
<script>
	import { goto } from '$app/navigation';

	function handleNavigation() {
		goto('/new-page');
	}
</script>

<button onclick={handleNavigation}>Navigate</button>
```

<!-- SUBTASK_END: event_syntax_correction -->

---

<!-- SUBTASK_START: children_pattern_correction -->

## Correction: Component Children Pattern

### LLM Mistake Pattern

**What LLMs Often Generate**:

```svelte
<!-- ❌ Deprecated slot syntax -->
<!-- Parent component -->
<div class="wrapper">
	<slot></slot>
</div>

<!-- Usage -->
<ParentComponent>
	<p>Child content</p>
</ParentComponent>
```

**Why This Is Wrong**:

- `<slot>` is deprecated in Svelte 5
- Replaced by more flexible children pattern
- Causes compilation warnings/errors

### Correct Approach

**What To Use Instead**:

```svelte
<!-- ✅ Modern children pattern -->
<!-- Parent component -->
<script>
	let { children } = $props();
</script>

<div class="wrapper">
	{@render children()}
</div>

<!-- Usage remains the same -->
<ParentComponent>
	<p>Child content</p>
</ParentComponent>
```

**Why This Is Better**:

- More flexible and powerful
- Better TypeScript support
- Consistent with Svelte 5 patterns
- Allows for conditional rendering

### Detection & Verification

**How to Detect This Mistake**:

- Search for `<slot>` tags in components
- Look for slot-related attributes
- Check for deprecation warnings

**How to Verify Correction**:

```bash
# Search for remaining slot usage
grep -r "<slot" src/ --include="*.svelte"

# Check for slot attributes
grep -r "slot=" src/ --include="*.svelte"
```

### Advanced Children Patterns

```svelte
<!-- ✅ Conditional children rendering -->
<script>
	let { children, showChildren = true } = $props();
</script>

{#if showChildren}
	<div class="children-wrapper">
		{@render children()}
	</div>
{/if}

<!-- ✅ Multiple children patterns -->
<script>
	let { header, children, footer } = $props();
</script>

<div class="layout">
	{#if header}
		<header>{@render header()}</header>
	{/if}

	<main>{@render children()}</main>

	{#if footer}
		<footer>{@render footer()}</footer>
	{/if}
</div>
```

<!-- SUBTASK_END: children_pattern_correction -->

---

<!-- SUBTASK_START: reactivity_migration -->

## Correction: Reactive State Management

### LLM Mistake Pattern

**What LLMs Often Generate**:

```svelte
<!-- ❌ Store-based reactivity -->
<script>
	import { writable, derived } from 'svelte/store';

	const count = writable(0);
	const doubled = derived(count, $count => $count * 2);

	function increment() {
		count.update(n => n + 1);
	}
</script>

<p>Count: {$count}</p>
<p>Doubled: {$doubled}</p>
<button on:click={increment}>+</button>
```

**Why This Is Wrong**:

- Unnecessary complexity for component state
- Store overhead for simple reactive values
- Mixing old and new patterns
- Performance implications

### Correct Approach

**What To Use Instead**:

```svelte
<!-- ✅ Runes-based reactivity -->
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

	function increment() {
		count++;
	}
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
<button onclick={increment}>+</button>
```

**Why This Is Better**:

- Simpler, more intuitive syntax
- Better performance
- Built-in reactivity
- Less boilerplate

### Detection & Verification

**How to Detect This Mistake**:

- Search for `import { writable` or `import { derived`
- Look for `$` prefix on store subscriptions
- Check for `.update()` or `.set()` method calls

**How to Verify Correction**:

```bash
# Search for store imports
grep -r "from 'svelte/store'" src/ --include="*.svelte"

# Search for store subscription syntax
grep -r "\$[a-zA-Z]" src/ --include="*.svelte"
```

### Advanced Runes Patterns

```svelte
<!-- ✅ Complex reactive state -->
<script>
	let user = $state({ name: '', age: 0 });
	let isAdult = $derived(user.age >= 18);
	let greeting = $derived(`Hello, ${user.name}!`);

	// Effect for side effects
	$effect(() => {
		console.log(`User age changed to ${user.age}`);
	});

	function updateUser(newData) {
		user = { ...user, ...newData };
	}
</script>

<input bind:value={user.name} placeholder="Name" />
<input bind:value={user.age} type="number" placeholder="Age" />

<p>{greeting}</p>
{#if isAdult}
	<p>User is an adult</p>
{/if}
```

<!-- SUBTASK_END: reactivity_migration -->

---

<!-- SUBTASK_START: style_block_correction -->

## Correction: Style Block Usage

### LLM Mistake Pattern

**What LLMs Often Generate**:

```svelte
<!-- ❌ Inline styles -->
<div style="color: red; background: blue;">
	<p style="font-size: 14px; margin: 10px;">Text</p>
</div>

<!-- Or missing Tailwind reference -->
<style>
	.container {
		@apply bg-blue-500 text-white;
	}
</style>
```

**Why This Is Wrong**:

- Inline styles don't support Tailwind classes
- Missing `@reference "tailwindcss"` breaks Tailwind processing
- Not maintainable or consistent
- Accessibility issues

### Correct Approach

**What To Use Instead**:

```svelte
<script>
	// Component logic here
</script>

<div class="container">
	<p class="text">Text content</p>
</div>

<style>
	@reference "tailwindcss";

	.container {
		@apply bg-blue-500 text-white p-4;
	}

	.text {
		@apply text-sm text-gray-800 dark:text-gray-900;
	}
</style>
```

**Why This Is Better**:

- Proper Tailwind integration
- Maintainable styles
- Theme-aware (dark mode support)
- Better performance

### Detection & Verification

**How to Detect This Mistake**:

- Search for `style="` attributes
- Look for `<style>` blocks without `@reference "tailwindcss"`
- Check for hardcoded colors instead of theme classes

**How to Verify Correction**:

```bash
# Search for inline styles
grep -r 'style="' src/ --include="*.svelte"

# Check for missing Tailwind reference
grep -L "@reference" src/**/*.svelte | xargs grep -l "<style>"
```

### Project-Specific Style Patterns

#### SvelteKit with DaisyUI

```svelte
<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	.card {
		@apply bg-base-100 border border-base-300;
	}

	.button {
		@apply btn btn-primary;
	}
</style>
```

#### Accessibility-First Styling

```svelte
<style>
	@reference "tailwindcss";

	.interactive {
		@apply focus:outline-none focus:ring-2 focus:ring-blue-500;
		@apply hover:bg-gray-100 dark:hover:bg-gray-800;
	}

	.text-content {
		@apply text-gray-800 dark:text-gray-900; /* High contrast */
	}
</style>
```

<!-- SUBTASK_END: style_block_correction -->

---

## Common Error Patterns

### Error: Component not rendering

**Cause**: Mixed Svelte 4/5 syntax
**Solution**: Ensure consistent Svelte 5 patterns throughout
**Prevention**: Use this guide's patterns consistently

```svelte
<!-- ❌ Mixed patterns -->
<script>
	let count = $state(0);  // Svelte 5
</script>
<button on:click={() => count++}>  <!-- Svelte 4 event syntax -->

<!-- ✅ Consistent Svelte 5 -->
<script>
	let count = $state(0);
</script>
<button onclick={() => count++}>
```

### Error: Tailwind classes not applying

**Cause**: Missing `@reference "tailwindcss"` in style block
**Solution**: Always include reference directive
**Prevention**: Use style block template from this guide

```svelte
<!-- ✅ Correct style block -->
<style>
	@reference "tailwindcss";
	/* Your styles here */
</style>
```

---

## Project Compatibility

<!-- PROJECT_DETECTION_START -->

**Detectable Patterns**:

- SvelteKit: `svelte.config.js`, `src/routes/`, `+page.svelte` files
- Svelte 5: `package.json` with `"svelte": "^5.0.0"`
- Vite + Svelte: `vite.config.js` with `@sveltejs/vite-plugin-svelte`

<!-- PROJECT_DETECTION_END -->

### SvelteKit Integration

```svelte
<!-- ✅ Modern SvelteKit component -->
<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let isActive = $derived($page.url.pathname === '/current');

	function navigate(path) {
		goto(path);
	}
</script>

<nav class="navigation">
	<button
		onclick={() => navigate('/home')}
		class:active={isActive}
	>
		Home
	</button>
</nav>

<style>
	@reference "tailwindcss";

	.navigation {
		@apply bg-white dark:bg-slate-50 border-b border-gray-200;
	}

	.active {
		@apply text-blue-600 bg-blue-50;
	}
</style>
```

---

## Usage Notes for LLMs

### Session Management

**Load Once Rule**: Mark as loaded after first read
**Context Key**: `svelte5_corrections_loaded`
**Dependencies**: None
**Conflicts**: Svelte 4 guides (if any exist)

### When to Use This Guide

1. **Primary trigger**: Svelte 5 project detected + component creation/editing
2. **Secondary triggers**: Event handling, component composition, reactivity
3. **Integration**: Works with SvelteKit, standalone Svelte projects

### Best Practices

1. **Always verify**: Check Svelte version before applying corrections
2. **Consistent patterns**: Use Svelte 5 syntax throughout entire project
3. **Migration strategy**: Convert deprecated patterns systematically
4. **Testing**: Verify components work after applying corrections

---

## Future Enhancements

_This section will be expanded as new Svelte 5 patterns emerge._

### Planned Additions

- Server-side rendering corrections
- Advanced runes patterns
- Performance optimization corrections
- TypeScript integration corrections
- Animation and transition corrections

---

**Last Updated**: March 7, 2025
**Next Review**: When Svelte 5 stable is released
**Maintenance**: Auto-updated through LLM correction pattern collection
