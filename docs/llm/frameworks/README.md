# Framework Correction Guides

This directory contains specialized correction guides that fix common LLM mistakes when working with web development frameworks and libraries.

## Philosophy: Mistake→Correction Focus

Rather than general documentation, these guides specifically target frequent LLM errors and provide immediate corrections. Each guide follows the pattern:

1. **Identify Common Mistakes** - What LLMs frequently get wrong
2. **Provide Immediate Corrections** - Show the right way
3. **Explain Context** - Why the correction matters
4. **Project-Specific Examples** - Tailored to detected project type

## Implemented Correction Guides

### ✅ Svelte 5 Corrections ([`svelte5-corrections-guide.md`](svelte5-corrections-guide.md))

Corrects common Svelte 5 migration mistakes:

- **Event Handling**: `on:click` → `onclick` (removing colon)
- **Slot System**: `<slot>` → `{@render children?.()}` (runes-based)
- **Reactive State**: Svelte stores → `$state()` runes
- **Component Props**: Traditional props → `$props()` rune
- **Styling**: Inline styles → `<style>` blocks with Tailwind

**Example Correction**:

```svelte
<!-- ❌ LLM Mistake -->
<button on:click={handleClick}>
  <slot name="content" />
</button>

<!-- ✅ Corrected -->
<button onclick={handleClick}>
  {@render children?.content?.()}
</button>
```

### ✅ Modern HTML Corrections ([`modern-html-corrections-guide.md`](modern-html-corrections-guide.md))

Corrects semantic HTML and accessibility mistakes:

- **Semantic Elements**: `<div>` overuse → proper `<section>`, `<article>`, `<nav>`
- **Native Elements**: Custom implementations → native `<dialog>`, `<details>`
- **Accessibility**: Missing ARIA → proper semantic structure
- **Form Elements**: Generic inputs → specific input types
- **Document Structure**: Poor hierarchy → logical heading structure

**Example Correction**:

```html
<!-- ❌ LLM Mistake -->
<div class="modal">
	<div class="modal-content">
		<div class="close-button">×</div>
		Content here
	</div>
</div>

<!-- ✅ Corrected -->
<dialog>
	<form method="dialog">
		<button type="submit">×</button>
		Content here
	</form>
</dialog>
```

## Correction Guide Standards

Each framework correction guide follows this structure:

1. **Common LLM Mistakes Section** - Categorized frequent errors
2. **Immediate Corrections** - Side-by-side mistake→correction examples
3. **Context Explanations** - Why corrections matter for the framework
4. **Project Detection Integration** - Automatic loading based on file patterns
5. **Condensation-Safe Markers** - Critical corrections preserved in context compression
6. **Cross-Reference Links** - Connections to related correction guides

## Correction Trigger Patterns

Framework correction guides auto-load when detecting mistake-prone contexts:

- **Svelte 5**: `svelte` + (`on:click`, `slot`, `store`, `bind:`, deprecated syntax)
- **HTML**: `html` + (`div`, `modal`, `form`, `accessibility`, semantic elements)
- **React**: `react` + (hooks errors, lifecycle mistakes, state management issues)
- **TypeScript**: `typescript` + (type errors, interface mistakes, generic issues)

## Project-Aware Corrections

Corrections adapt based on detected project type:

- **SvelteKit Projects**: Focus on Svelte 5 runes, SvelteKit routing patterns
- **React Projects**: Emphasize hooks patterns, JSX corrections
- **HTML Projects**: Prioritize semantic elements, accessibility fixes
- **TypeScript Projects**: Include type-safe correction patterns

Detection triggers from file patterns:

- **Svelte**: `svelte.config.js`, `.svelte` files, `src/routes/`
- **React**: `package.json` with "react", `.jsx/.tsx` files
- **HTML**: `.html` files, static site structure

## Adding New Framework Corrections

When creating new correction guides:

1. **Identify Mistake Patterns**: Research common LLM errors for the framework
2. **Use Correction Template**: Start with [`../_meta/template.md`](../_meta/template.md)
3. **Follow Correction Standards**: Apply [`../_meta/llm-writing-guide.md`](../_meta/llm-writing-guide.md)
4. **Add Trigger Keywords**: Update [`../_meta/extra-guide.md`](../_meta/extra-guide.md) with mistake-detection patterns
5. **Test Correction Loading**: Verify corrections load for relevant mistake contexts
6. **Document Examples**: Include before/after correction examples
7. **Update This README**: Add the new guide to implemented corrections

## Planned Framework Corrections

- **React Hooks Corrections** - useState/useEffect mistake patterns
- **TypeScript Corrections** - Type definition and generic mistakes
- **Vue 3 Corrections** - Composition API and reactivity errors
- **Next.js Corrections** - App router and SSR mistake patterns

---

**Last Updated**: March 7, 2025  
**Version**: 2.0 (Corrective Guidance Implementation)  
**Status**: Core corrections implemented, ready for expansion
