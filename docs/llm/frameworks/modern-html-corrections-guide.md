# Modern HTML Corrections Guide - Semantic Elements & Accessibility

<!-- CONDENSATION_SAFE_START -->

## Meta Information

- **Domain**: Frontend HTML Corrections
- **Correction Focus**: Semantic HTML, accessibility violations, modern patterns
- **LLM Mistake Patterns**: Div abuse, missing ARIA, non-semantic markup, accessibility violations
- **Project Types**: SvelteKit, React, Vue, Next.js, Generic HTML
- **Trigger Keywords**: html, semantic, accessibility, div, aria, form, validation, a11y, wcag, dialog, modal, toast, notification
- **Subtasks Supported**: semantic_structure_correction, form_validation_correction, accessibility_enhancement, dialog_element_correction, navigation_correction
- **Last Updated**: March 7, 2025
- **Condensation Safe**: YES
<!-- CONDENSATION_SAFE_END -->

## Quick Correction Reference

<!-- CRITICAL_PRESERVE_START -->

**Most Critical HTML Corrections**:

1. ❌ LLM often generates: `<div class="header">`, `<div class="nav">`
   ✅ Use instead: `<header>`, `<nav>`

2. ❌ LLM often generates: `<div>` for everything
   ✅ Use instead: `<section>`, `<article>`, `<aside>`, `<main>`

3. ❌ LLM often generates: `<input>` without labels
   ✅ Use instead: `<label><input></label>` or proper `for` attribute

4. ❌ LLM often generates: `<div onclick="...">`
   ✅ Use instead: `<button>` for interactive elements

5. ❌ LLM often generates: Complex modal with custom backdrop/focus trapping
   ✅ Use instead: `<dialog>` element with `showModal()`

<!-- CRITICAL_PRESERVE_END -->

---

## Overview

This guide addresses common mistakes LLMs make when generating HTML markup. LLMs often default to generic `<div>` elements and miss critical accessibility requirements that are essential for modern web development.

---

<!-- SUBTASK_START: semantic_structure_correction -->

## Correction: Semantic HTML Structure

### LLM Mistake Pattern

**What LLMs Often Generate**:

```html
<!-- ❌ Generic div-based structure -->
<div class="page">
	<div class="header">
		<div class="logo">Brand</div>
		<div class="nav">
			<div class="nav-item">Home</div>
			<div class="nav-item">About</div>
		</div>
	</div>

	<div class="content">
		<div class="sidebar">
			<div class="widget">Recent Posts</div>
		</div>
		<div class="main">
			<div class="post">
				<div class="title">Post Title</div>
				<div class="body">Post content...</div>
			</div>
		</div>
	</div>

	<div class="footer">
		<div class="copyright">© 2025</div>
	</div>
</div>
```

**Why This Is Wrong**:

- No semantic meaning for screen readers
- Poor SEO structure
- Accessibility violations
- Harder to maintain and style

### Correct Approach

**What To Use Instead**:

```html
<!-- ✅ Semantic HTML structure -->
<div class="page">
	<header class="site-header">
		<div class="brand">Brand</div>
		<nav class="main-navigation" role="navigation">
			<ul>
				<li><a href="/" aria-current="page">Home</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</nav>
	</header>

	<div class="content-wrapper">
		<aside class="sidebar" role="complementary">
			<section class="widget">
				<h2>Recent Posts</h2>
				<!-- widget content -->
			</section>
		</aside>

		<main class="main-content" role="main">
			<article class="post">
				<header class="post-header">
					<h1>Post Title</h1>
				</header>
				<div class="post-content">
					<p>Post content...</p>
				</div>
			</article>
		</main>
	</div>

	<footer class="site-footer" role="contentinfo">
		<p class="copyright">© 2025</p>
	</footer>
</div>
```

**Why This Is Better**:

- Clear semantic structure for assistive technologies
- Better SEO with proper heading hierarchy
- ARIA landmarks for navigation
- Maintainable and accessible

### Detection & Verification

**How to Detect This Mistake**:

- Excessive `<div>` usage without semantic meaning
- Missing `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- No ARIA landmarks or roles
- Flat heading structure

**How to Verify Correction**:

```bash
# Check for semantic elements
grep -r "<header\|<nav\|<main\|<aside\|<footer\|<section\|<article" src/ --include="*.html" --include="*.svelte"

# Check for ARIA landmarks
grep -r "role=" src/ --include="*.html" --include="*.svelte"
```

### Framework-Specific Examples

#### SvelteKit Implementation

```svelte
<!-- ✅ Semantic SvelteKit layout -->
<div class="app">
  <header class="site-header">
    <nav class="main-nav" role="navigation">
      <a href="/" class="brand">Brand</a>
      <ul class="nav-links">
        <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
        <li><a href="/about" class:active={$page.url.pathname === '/about'}>About</a></li>
      </ul>
    </nav>
  </header>

  <main class="main-content" role="main">
    <slot />
  </main>

  <footer class="site-footer" role="contentinfo">
    <p>&copy; 2025 Brand Name</p>
  </footer>
</div>
```

<!-- SUBTASK_END: semantic_structure_correction -->

---

<!-- SUBTASK_START: form_validation_correction -->

## Correction: Form Validation & Accessibility

### LLM Mistake Pattern

**What LLMs Often Generate**:

```html
<!-- ❌ Inaccessible form with JavaScript-only validation -->
<div class="form">
	<div class="field">
		<div class="label">Email</div>
		<input type="text" id="email" />
	</div>

	<div class="field">
		<div class="label">Password</div>
		<input type="password" id="password" />
	</div>

	<div class="submit">
		<div onclick="submitForm()" class="button">Submit</div>
	</div>
</div>

<script>
	function submitForm() {
		const email = document.getElementById('email').value;
		if (!email.includes('@')) {
			alert('Invalid email');
			return;
		}
		// Submit logic
	}
</script>
```

**Why This Is Wrong**:

- No proper labels associated with inputs
- Missing HTML5 validation
- Non-semantic submit button
- No error messaging structure
- Poor accessibility

### Correct Approach

**What To Use Instead**:

```html
<!-- ✅ Accessible form with native validation -->
<form class="contact-form" novalidate>
	<fieldset>
		<legend>Contact Information</legend>

		<div class="form-field">
			<label for="email">
				Email Address
				<span class="required" aria-label="required">*</span>
			</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				aria-describedby="email-error email-help"
				autocomplete="email"
			/>
			<div id="email-help" class="field-help">We'll never share your email address</div>
			<div id="email-error" class="field-error" role="alert" aria-live="polite">
				<!-- Error message inserted here -->
			</div>
		</div>

		<div class="form-field">
			<label for="password">
				Password
				<span class="required" aria-label="required">*</span>
			</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				minlength="8"
				aria-describedby="password-error password-requirements"
				autocomplete="new-password"
			/>
			<div id="password-requirements" class="field-help">Minimum 8 characters</div>
			<div id="password-error" class="field-error" role="alert" aria-live="polite">
				<!-- Error message inserted here -->
			</div>
		</div>
	</fieldset>

	<div class="form-actions">
		<button type="submit" class="submit-button">Submit</button>
	</div>
</form>
```

**Why This Is Better**:

- Proper label associations
- HTML5 native validation
- ARIA error messaging
- Semantic form structure
- Better UX and accessibility

### Detection & Verification

**How to Detect This Mistake**:

- `<input>` elements without proper `<label>`
- Missing `type` attributes or wrong types
- `<div onclick>` instead of `<button>`
- No validation attributes (`required`, `pattern`, etc.)
- Missing ARIA attributes for errors

**How to Verify Correction**:

```bash
# Check for unlabeled inputs
grep -r "<input" src/ --include="*.html" --include="*.svelte" | grep -v "aria-label\|<label"

# Check for div buttons
grep -r "<div.*onclick" src/ --include="*.html" --include="*.svelte"

# Check for missing form validation
grep -r "<input" src/ --include="*.html" --include="*.svelte" | grep -v "required\|pattern\|type="
```

### Framework Integration

#### SvelteKit Form Enhancement

```svelte
<!-- ✅ Enhanced SvelteKit form -->
<script>
  import { enhance } from '$app/forms';

  let form;
  let errors = {};

  function handleSubmit() {
    return async ({ result, update }) => {
      if (result.type === 'failure') {
        errors = result.data?.errors || {};
      }
      await update();
    };
  }
</script>

<form
  method="POST"
  use:enhance={handleSubmit}
  bind:this={form}
  novalidate
>
  <div class="form-field">
    <label for="email">Email Address *</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-invalid={errors.email ? 'true' : 'false'}
      aria-describedby={errors.email ? 'email-error' : 'email-help'}
    />
    <div id="email-help" class="field-help">
      We'll never share your email
    </div>
    {#if errors.email}
      <div id="email-error" class="field-error" role="alert">
        {errors.email}
      </div>
    {/if}
  </div>

  <button type="submit">Submit</button>
</form>
```

<!-- SUBTASK_END: form_validation_correction -->

---

<!-- SUBTASK_START: accessibility_enhancement -->

## Correction: Interactive Elements & ARIA

### LLM Mistake Pattern

**What LLMs Often Generate**:

```html
<!-- ❌ Inaccessible interactive elements -->
<div class="modal" style="display: none;">
	<div class="modal-content">
		<span onclick="closeModal()" class="close">&times;</span>
		<div class="title">Modal Title</div>
		<div class="body">Modal content</div>
	</div>
</div>

<div class="tabs">
	<div class="tab active" onclick="showTab(1)">Tab 1</div>
	<div class="tab" onclick="showTab(2)">Tab 2</div>
</div>
<div class="tab-content" id="tab1">Content 1</div>
<div class="tab-content" id="tab2" style="display: none;">Content 2</div>

<div class="dropdown">
	<div class="trigger" onclick="toggleDropdown()">Menu</div>
	<div class="menu" style="display: none;">
		<div onclick="selectItem(1)">Item 1</div>
		<div onclick="selectItem(2)">Item 2</div>
	</div>
</div>
```

**Why This Is Wrong**:

- No keyboard navigation support
- Missing ARIA attributes
- Non-semantic interactive elements
- No focus management
- Screen reader incompatible

### Correct Approach

**What To Use Instead**:

```html
<!-- ✅ Accessible interactive elements -->
<dialog class="modal" id="modal" aria-labelledby="modal-title">
	<div class="modal-content">
		<header class="modal-header">
			<h2 id="modal-title">Modal Title</h2>
			<button type="button" class="close-button" aria-label="Close modal" onclick="closeModal()">
				&times;
			</button>
		</header>
		<div class="modal-body">
			<p>Modal content</p>
		</div>
	</div>
</dialog>

<div class="tabs" role="tablist" aria-label="Content sections">
	<button role="tab" aria-selected="true" aria-controls="panel1" id="tab1" class="tab active">
		Tab 1
	</button>
	<button role="tab" aria-selected="false" aria-controls="panel2" id="tab2" class="tab">
		Tab 2
	</button>
</div>

<div role="tabpanel" tabindex="0" aria-labelledby="tab1" id="panel1">Content 1</div>
<div role="tabpanel" tabindex="0" aria-labelledby="tab2" id="panel2" hidden>Content 2</div>

<div class="dropdown">
	<button
		class="dropdown-trigger"
		aria-expanded="false"
		aria-haspopup="true"
		aria-controls="dropdown-menu"
		onclick="toggleDropdown()"
	>
		Menu
	</button>
	<ul role="menu" id="dropdown-menu" class="dropdown-menu" hidden>
		<li role="none">
			<button role="menuitem" onclick="selectItem(1)">Item 1</button>
		</li>
		<li role="none">
			<button role="menuitem" onclick="selectItem(2)">Item 2</button>
		</li>
	</ul>
</div>
```

**Why This Is Better**:

- Native `<dialog>` element for modals
- Proper ARIA roles and states
- Keyboard navigation support
- Screen reader compatible
- Focus management built-in

### Detection & Verification

**How to Detect This Mistake**:

- Interactive `<div>` elements with `onclick`
- Missing ARIA attributes on complex widgets
- No keyboard event handlers
- Missing focus management
- Improper modal implementation

**How to Verify Correction**:

```bash
# Check for interactive divs
grep -r "<div.*onclick" src/ --include="*.html" --include="*.svelte"

# Check for missing ARIA
grep -r "role=\|aria-" src/ --include="*.html" --include="*.svelte"

# Test with keyboard navigation
# Tab through interface, ensure all interactive elements are reachable
```

<!-- SUBTASK_END: accessibility_enhancement -->

---

<!-- SUBTASK_START: dialog_element_correction -->

## Correction: Native Dialog Element for Modals

### LLM Mistake Pattern

**What LLMs Often Generate**:

```html
<!-- ❌ Complex manual modal implementation -->
<div class="modal-backdrop" onclick="closeModal()">
	<div class="modal-container" onclick="event.stopPropagation()">
		<div class="modal-header">
			<h2>Modal Title</h2>
			<button onclick="closeModal()">×</button>
		</div>
		<div class="modal-body">
			<p>Modal content here</p>
		</div>
		<div class="modal-footer">
			<button onclick="closeModal()">Cancel</button>
			<button onclick="submitForm()">Submit</button>
		</div>
	</div>
</div>

<script>
	let isModalOpen = false;
	let previousFocus = null;

	function openModal() {
		isModalOpen = true;
		previousFocus = document.activeElement;
		document.body.style.overflow = 'hidden';
		// Manual focus trapping logic...
		trapFocus();
	}

	function closeModal() {
		isModalOpen = false;
		document.body.style.overflow = '';
		if (previousFocus) previousFocus.focus();
	}

	function trapFocus() {
		// Complex focus management code...
	}

	// ESC key handling
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && isModalOpen) {
			closeModal();
		}
	});
</script>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-container {
		background: white;
		border-radius: 8px;
		max-width: 500px;
		width: 90%;
		max-height: 80vh;
		overflow-y: auto;
	}
</style>
```

**Why This Is Wrong**:

- Manual backdrop creation and event handling
- Complex focus trapping implementation
- Custom ESC key handling
- Manual body scroll prevention
- Accessibility attributes that should be automatic
- Prone to focus management bugs
- More code to maintain and test

### Correct Approach

**Use Native `<dialog>` Element**:

```html
<!-- ✅ Native dialog implementation -->
<dialog id="confirmation-modal">
	<div class="modal-content">
		<header>
			<h2>Confirm Action</h2>
			<button type="button" onclick="closeModal()" aria-label="Close modal">×</button>
		</header>
		<main>
			<p>Are you sure you want to proceed with this action?</p>
		</main>
		<footer>
			<button type="button" onclick="closeModal()">Cancel</button>
			<button type="button" onclick="confirmAction()" autofocus>Confirm</button>
		</footer>
	</div>
</dialog>

<button onclick="openModal()">Open Modal</button>

<script>
	const modal = document.getElementById('confirmation-modal');

	function openModal() {
		modal.showModal(); // Built-in modal functionality
	}

	function closeModal() {
		modal.close(); // Built-in close functionality
	}

	function confirmAction() {
		// Handle confirmation
		closeModal();
	}

	// Optional: Handle backdrop clicks
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});
</script>

<style>
	dialog {
		border: none;
		border-radius: 8px;
		padding: 0;
		max-width: 500px;
		width: 90%;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		padding: 1.5rem;
	}

	.modal-content header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.modal-content footer {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin-top: 1.5rem;
	}
</style>
```

### SvelteKit Implementation

**SvelteKit Dialog Component**:

```svelte
<!-- ✅ SvelteKit dialog component -->
<script>
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let title = '';

	let dialog;
	const dispatch = createEventDispatcher();

	$: if (dialog) {
		if (open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}

	function handleClose() {
		open = false;
		dispatch('close');
	}

	function handleBackdropClick(event) {
		if (event.target === dialog) {
			handleClose();
		}
	}
</script>

<dialog bind:this={dialog} on:click={handleBackdropClick} on:close={handleClose}>
	<div class="modal-content">
		{#if title}
			<header>
				<h2>{title}</h2>
				<button type="button" on:click={handleClose} aria-label="Close modal">×</button>
			</header>
		{/if}

		<main>
			<slot />
		</main>

		<footer>
			<slot name="footer">
				<button type="button" on:click={handleClose}>Close</button>
			</slot>
		</footer>
	</div>
</dialog>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	dialog {
		@apply border-none rounded-lg p-0 max-w-lg w-full;
	}

	dialog::backdrop {
		@apply bg-black bg-opacity-50;
	}

	.modal-content {
		@apply p-6;
	}

	header {
		@apply flex justify-between items-center mb-4;
	}

	footer {
		@apply flex gap-2 justify-end mt-6;
	}
</style>
```

**Usage Example**:

```svelte
<script>
	import Modal from '$lib/components/Modal.svelte';

	let showConfirmation = false;

	function handleConfirm() {
		// Handle confirmation logic
		showConfirmation = false;
	}
</script>

<button on:click={() => showConfirmation = true}>
	Delete Item
</button>

<Modal bind:open={showConfirmation} title="Confirm Deletion" on:close={() => showConfirmation = false}>
	<p>Are you sure you want to delete this item? This action cannot be undone.</p>

	<svelte:fragment slot="footer">
		<button type="button" on:click={() => showConfirmation = false}>Cancel</button>
		<button type="button" on:click={handleConfirm} class="btn-danger">Delete</button>
	</svelte:fragment>
</Modal>
```

### Toast/Notification Correction

**LLM Mistake - Complex Toast System**:

```javascript
// ❌ Over-engineered toast system
class ToastManager {
	constructor() {
		this.toasts = [];
		this.container = this.createContainer();
	}

	createContainer() {
		const container = document.createElement('div');
		container.className = 'toast-container';
		document.body.appendChild(container);
		return container;
	}

	show(message, type = 'info', duration = 3000) {
		const toast = this.createToast(message, type);
		this.container.appendChild(toast);
		this.animateIn(toast);
		setTimeout(() => this.remove(toast), duration);
	}

	// More complex implementation...
}
```

**Simple Alternative**:

```html
<!-- ✅ Simple toast with dialog -->
<dialog id="toast" class="toast">
	<div class="toast-content">
		<span id="toast-message"></span>
		<button onclick="closeToast()">×</button>
	</div>
</dialog>

<script>
	function showToast(message, duration = 3000) {
		const toast = document.getElementById('toast');
		const messageEl = document.getElementById('toast-message');

		messageEl.textContent = message;
		toast.show(); // Use show() instead of showModal() for non-modal

		setTimeout(() => toast.close(), duration);
	}

	function closeToast() {
		document.getElementById('toast').close();
	}
</script>

<style>
	.toast {
		position: fixed;
		top: 1rem;
		right: 1rem;
		border: none;
		border-radius: 8px;
		padding: 1rem;
		background: #333;
		color: white;
		max-width: 300px;
	}

	.toast-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}
</style>
```

### Why Native `<dialog>` Is Better

**Built-in Features**:

- **Automatic backdrop**: No manual overlay creation needed
- **Focus trapping**: Automatically traps focus within dialog
- **ESC key support**: Built-in ESC key handling
- **Accessibility**: Proper ARIA roles and states automatic
- **showModal() vs show()**: Modal vs non-modal behavior
- **::backdrop pseudo-element**: Easy backdrop styling
- **Browser optimized**: Better performance than custom solutions

**Browser Support**:

- Modern browsers: Full support (Chrome 37+, Firefox 98+, Safari 15.4+)
- Polyfill available for older browsers
- Progressive enhancement friendly

**Accessibility Benefits**:

- Screen reader announcements work correctly
- Proper focus management out of the box
- Keyboard navigation handled automatically
- No need for manual ARIA attributes

### Detection & Verification

**How to Detect This Mistake**:

```bash
# Look for manual modal implementations
grep -r "modal-backdrop\|modal-overlay" src/ --include="*.html" --include="*.svelte"

# Check for complex focus trapping
grep -r "trapFocus\|focusTrap" src/ --include="*.js" --include="*.svelte"

# Look for manual ESC key handling
grep -r "keydown.*Escape" src/ --include="*.js" --include="*.svelte"

# Check for missing dialog elements
grep -r "<dialog" src/ --include="*.html" --include="*.svelte" || echo "No dialog elements found"
```

**How to Verify Correction**:

```bash
# Verify dialog usage
grep -r "<dialog" src/ --include="*.html" --include="*.svelte"

# Check for proper dialog methods
grep -r "showModal()\|\.show()\|\.close()" src/ --include="*.js" --include="*.svelte"

# Test accessibility
# 1. Open modal and verify focus is trapped
# 2. Press ESC key to close
# 3. Verify focus returns to trigger element
# 4. Test with screen reader
```

**Modern HTML Validation**:

```html
<!-- ✅ Validate dialog structure -->
<dialog>
	<!-- Content should be properly structured -->
	<form method="dialog">
		<!-- Form automatically closes dialog on submit -->
		<button type="submit">Close</button>
	</form>
</dialog>
```

### Common Patterns & Best Practices

**Confirmation Dialogs**:

```html
<dialog id="confirm-delete">
	<form method="dialog">
		<h2>Confirm Deletion</h2>
		<p>This action cannot be undone.</p>
		<button type="submit" value="cancel">Cancel</button>
		<button type="submit" value="confirm">Delete</button>
	</form>
</dialog>
```

**Form Dialogs**:

```html
<dialog id="edit-form">
	<form method="dialog">
		<h2>Edit Item</h2>
		<input type="text" name="title" required />
		<button type="submit" value="cancel">Cancel</button>
		<button type="submit" value="save">Save</button>
	</form>
</dialog>
```

**Non-Modal Notifications**:

```html
<dialog id="notification">
	<div class="notification-content">
		<span>Operation completed successfully!</span>
		<button onclick="this.closest('dialog').close()">×</button>
	</div>
</dialog>
```

<!-- SUBTASK_END: dialog_element_correction -->

---

<!-- SUBTASK_START: navigation_correction -->

## Correction: Navigation Structure

### LLM Mistake Pattern

**What LLMs Often Generate**:

```html
<!-- ❌ Poor navigation structure -->
<div class="navbar">
	<div class="brand">Brand</div>
	<div class="menu">
		<span onclick="navigate('/')">Home</span>
		<span onclick="navigate('/about')">About</span>
		<span onclick="navigate('/contact')">Contact</span>
	</div>
</div>

<div class="breadcrumbs"><span>Home</span> > <span>Products</span> > <span>Item</span></div>
```

**Why This Is Wrong**:

- No semantic navigation structure
- Non-interactive elements used for navigation
- Missing landmark roles
- Poor breadcrumb implementation
- No current page indication

### Correct Approach

**What To Use Instead**:

```html
<!-- ✅ Semantic navigation structure -->
<header class="site-header">
	<nav class="main-navigation" role="navigation" aria-label="Main">
		<a href="/" class="brand">Brand</a>

		<ul class="nav-menu">
			<li>
				<a href="/" aria-current="page" class="nav-link active"> Home </a>
			</li>
			<li>
				<a href="/about" class="nav-link"> About </a>
			</li>
			<li>
				<a href="/contact" class="nav-link"> Contact </a>
			</li>
		</ul>
	</nav>
</header>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	<ol class="breadcrumb-list">
		<li class="breadcrumb-item">
			<a href="/">Home</a>
		</li>
		<li class="breadcrumb-item">
			<a href="/products">Products</a>
		</li>
		<li class="breadcrumb-item" aria-current="page">
			<span>Current Item</span>
		</li>
	</ol>
</nav>
```

**Why This Is Better**:

- Proper semantic navigation with `<nav>`
- Accessible links instead of spans
- ARIA landmarks and labels
- Current page indication
- Structured breadcrumbs with `<ol>`

### Framework Implementation

#### SvelteKit Navigation

```svelte
<!-- ✅ SvelteKit navigation component -->
<script>
  import { page } from '$app/stores';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  $: currentPath = $page.url.pathname;
</script>

<nav class="main-nav" role="navigation" aria-label="Main navigation">
  <a href="/" class="brand">Brand</a>

  <ul class="nav-menu">
    {#each navItems as item}
      <li>
        <a
          href={item.href}
          class="nav-link"
          class:active={currentPath === item.href}
          aria-current={currentPath === item.href ? 'page' : undefined}
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
```

<!-- SUBTASK_END: navigation_correction -->

---

## Common Error Patterns

### Error: Elements not focusable

**Cause**: Using `<div>` or `<span>` for interactive elements
**Solution**: Use `<button>`, `<a>`, or add `tabindex="0"`
**Prevention**: Always use semantic interactive elements

```html
<!-- ❌ Not focusable -->
<div onclick="doSomething()">Click me</div>

<!-- ✅ Properly focusable -->
<button onclick="doSomething()">Click me</button>
```

### Error: Screen readers can't navigate

**Cause**: Missing landmark roles and semantic structure
**Solution**: Use `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`
**Prevention**: Structure pages with semantic HTML

### Error: Form submission fails

**Cause**: Using `<div>` instead of `<button type="submit">`
**Solution**: Use proper form elements
**Prevention**: Follow form correction patterns from this guide

---

## Project Compatibility

<!-- PROJECT_DETECTION_START -->

**Detectable Patterns**:

- HTML files: `.html`, `.htm` extensions
- SvelteKit: `.svelte` files with HTML content
- React: `.jsx`, `.tsx` files with JSX
- Vue: `.vue` files with template sections

<!-- PROJECT_DETECTION_END -->

### Cross-Framework Patterns

These HTML corrections apply across all frameworks:

- **Semantic structure**: Always use proper HTML5 elements
- **Accessibility**: ARIA attributes work in any framework
- **Form validation**: HTML5 validation is universal
- **Navigation**: Semantic nav patterns work everywhere

---

## Usage Notes for LLMs

### Session Management

**Load Once Rule**: Mark as loaded after first read
**Context Key**: `html_corrections_loaded`
**Dependencies**: None
**Conflicts**: None

### When to Use This Guide

1. **Primary trigger**: HTML generation or component creation
2. **Secondary triggers**: Form creation, navigation, accessibility concerns
3. **Integration**: Works with all web frameworks

### Best Practices

1. **Semantic first**: Choose HTML elements by meaning, not appearance
2. **Accessibility always**: Include ARIA attributes for complex widgets
3. **Progressive enhancement**: Start with semantic HTML, enhance with JavaScript
4. **Test with keyboard**: Ensure all functionality works without mouse

---

**Last Updated**: March 7, 2025
**Next Review**: When new HTML standards emerge
**Maintenance**: Auto-updated through accessibility pattern collection
