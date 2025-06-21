# LLM Paraglide Rules - Internationalization Guidelines

## CRITICAL: Auto-Trigger Paraglide Validation

**RULE**: Whenever ANY component or route file is created or modified, AUTOMATICALLY validate Paraglide message usage.

### Paraglide Change Detection Triggers

**IF** any of these files are modified:

- `src/routes/**/*.svelte` (components with user-facing text)
- `src/lib/components/**/*.svelte` (reusable components)
- `messages/*.json` (message files)

**THEN** AUTOMATICALLY execute Paraglide Validation Workflow below.

## Paraglide Validation Workflow (MANDATORY)

### Step 1: Message Function Import

**REQUIRED Import Pattern**:

```svelte
<script>
	import * as m from '$lib/paraglide/messages';
</script>
```

**NEVER use**:

- `import { specific_message } from '$lib/paraglide/messages'` (breaks tree-shaking)
- Direct string concatenation for translatable content
- Hardcoded text mixed with message functions

### Step 2: Message Key Naming Convention

**MANDATORY Structure**: `section_element_purpose`

```javascript
// ✅ CORRECT - Clear hierarchy
'homepage_hero_title'; // Homepage hero section title
'navigation_menu_about'; // Navigation menu about link
'contact_form_submit_button'; // Contact form submit button
'common_loading_message'; // Common loading message

// ❌ FORBIDDEN - Generic or unclear
'title1'; // No context
'button'; // Too generic
'text'; // Meaningless
'homepage_text1'; // Numbered instead of semantic
```

### Step 3: Text Replacement Patterns

**Basic Text Replacement**:

```svelte
<!-- ✅ AFTER - Internationalized -->
<script>
	import * as m from '$lib/paraglide/messages';
</script>

<!-- ❌ BEFORE - Hardcoded -->
<h1>Bienvenue sur mon site</h1>
<p>Contactez-moi pour vos projets</p>
<h1>{m.homepage_welcome_title()}</h1>
<p>{m.homepage_contact_cta()}</p>
```

**Text with Parameters**:

```svelte
<!-- ❌ BEFORE - Hardcoded with variables -->
<p>Bonjour {userName}, vous avez {count} messages</p>

<!-- ✅ AFTER - Parameterized message -->
<p>{m.dashboard_greeting({ userName, count })}</p>
```

**Conditional Text**:

```svelte
<!-- ❌ BEFORE - Hardcoded conditions -->
<button>{isLoading ? 'Chargement...' : 'Envoyer'}</button>

<!-- ✅ AFTER - Message functions -->
<button>{isLoading ? m.common_loading() : m.contact_submit_button()}</button>
```

### Step 4: Language Switching Implementation

**REQUIRED Language Toggle Pattern**:

```svelte
<script>
	import { switchLanguageTag, languageTag } from '$lib/paraglide/runtime';

	function toggleLanguage() {
		const newLang = languageTag() === 'fr' ? 'en' : 'fr';
		switchLanguageTag(newLang);
	}
</script>

<button onclick={toggleLanguage}>
	{languageTag() === 'fr' ? 'EN' : 'FR'}
</button>
```

**NEVER**:

- Hardcode language switching logic
- Use string manipulation for language detection
- Forget to update URL paths when switching languages

### Step 5: Localized Navigation

**REQUIRED Navigation Pattern**:

```svelte
<script>
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/stores';
</script>

<nav>
	<a href="/{$page.params.lang || 'fr'}/about">
		{m.navigation_about()}
	</a>
	<a href="/{$page.params.lang || 'fr'}/services">
		{m.navigation_services()}
	</a>
</nav>
```

**Path Construction Rules**:

- Always include language parameter in URLs
- Use fallback to base locale (`fr`) when lang param missing
- Maintain consistent URL structure across languages

## Message File Organization Standards

### Hierarchical Structure (MANDATORY)

```json
{
	"homepage": {
		"hero_title": "I'm {name}, custom application developer",
		"hero_subtitle": "Specialized in web and mobile development",
		"cta_button": "Get in touch",
		"availability_badge": "Available for projects"
	},
	"navigation": {
		"home": "Home",
		"about": "About",
		"services": "Services",
		"contact": "Contact",
		"blog": "Blog"
	},
	"contact": {
		"form_name_label": "Your name",
		"form_email_label": "Email address",
		"form_message_label": "Your message",
		"form_submit_button": "Send message",
		"success_message": "Message sent successfully!"
	},
	"common": {
		"loading": "Loading...",
		"error": "An error occurred",
		"retry": "Try again",
		"close": "Close"
	}
}
```

### Parameter Consistency (CRITICAL)

**REQUIRED**: Parameters must match exactly across all languages

```json
// ✅ CORRECT - Consistent parameters
// French
"welcome_message": "Bonjour {name}, bienvenue sur {siteName}!"

// English
"welcome_message": "Hello {name}, welcome to {siteName}!"

// ❌ FORBIDDEN - Inconsistent parameters
// French
"welcome_message": "Bonjour {userName}, bienvenue!"

// English
"welcome_message": "Hello {name}, welcome!" // Different parameter name
```

### Pluralization Handling

**REQUIRED ICU Message Format**:

```json
// French
"item_count": "Vous avez {count, plural, =0 {aucun élément} =1 {un élément} other {# éléments}}"

// English
"item_count": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}"
```

## Component Integration Rules

### Dynamic Content Integration

**REQUIRED Pattern**:

```svelte
<script>
	import * as m from '$lib/paraglide/messages';

	let items = [];
	$: itemCountMessage = m.dashboard_item_count({ count: items.length });
</script>

<p>{itemCountMessage}</p>
```

### Form Integration

**REQUIRED Form Pattern**:

```svelte
<script>
	import * as m from '$lib/paraglide/messages';
</script>

<form>
	<label for="name">{m.contact_form_name_label()}</label>
	<input id="name" placeholder={m.contact_form_name_placeholder()} />

	<label for="email">{m.contact_form_email_label()}</label>
	<input id="email" placeholder={m.contact_form_email_placeholder()} />

	<button type="submit">{m.contact_form_submit_button()}</button>
</form>
```

## Development Workflow (MANDATORY)

### Step 1: Content Audit

1. **Scan component** for hardcoded user-facing text
2. **Identify dynamic content** that needs parameters
3. **Create semantic message keys** following naming convention
4. **Add to both language files** with consistent parameters

### Step 2: Implementation

1. **Import message functions** at component level
2. **Replace hardcoded text** with message calls
3. **Test language switching** functionality
4. **Verify parameter consistency** across languages

### Step 3: Validation

1. **Build project** to check message compilation
2. **Test both languages** in browser
3. **Verify no hardcoded text** remains
4. **Check TypeScript errors** for invalid message keys

## Validation Commands (EXECUTE AFTER CHANGES)

### Message Compilation Check

```bash
pnpm build
```

**Expected**: No TypeScript errors, all message functions resolve

### Development Testing

```bash
pnpm dev
```

**Test**: Language switching, all content updates, no missing translations

## Error Recovery Procedures

### Missing Message Key Error

```
Error: Property 'nonexistent_key' does not exist
```

**Fix**: Add missing key to both `fr.json` and `en.json`

### Parameter Mismatch Error

```
Error: Argument of type '{ userName: string }' is not assignable
```

**Fix**: Ensure parameter names match exactly in all language files

### Hardcoded Text Detection

```
Error: Hardcoded text found in component
```

**Fix**: Replace with appropriate message function call

## Best Practices Checklist

### Do's ✅

- Use semantic message keys (`contact_form_submit` not `button1`)
- Keep message functions close to usage
- Test both languages during development
- Use parameters for dynamic content
- Organize messages by page/component
- Maintain parameter consistency across languages

### Don'ts ❌

- Mix hardcoded text with message functions
- Use generic keys (`text1`, `label2`)
- Forget to translate new content
- Break parameter consistency between languages
- Nest message function calls
- Import specific messages (use `* as m` pattern)

## TypeScript Integration

### Type Safety Validation

```svelte
<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	// ✅ TypeScript validates message key exists
	const title = m.homepage_hero_title();

	// ❌ TypeScript error if key doesn't exist
	const invalid = m.nonexistent_key(); // Error!
</script>
```

### Parameter Type Checking

```svelte
<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	// ✅ Correct parameter types
	const greeting = m.welcome_message({
		name: 'Johan', // string
		count: 5 // number
	});

	// ❌ TypeScript error for wrong types
	const invalid = m.welcome_message({
		name: 123, // Error: expected string
		count: 'five' // Error: expected number
	});
</script>
```

## Integration with Existing Rules

### SEO Rules Compatibility

- Message functions work with existing SEO meta tag system
- Language-specific meta descriptions supported
- Sitemap generation includes both language versions

### Theming Rules Compatibility

- Message functions don't affect styling classes
- Maintain Tailwind usage patterns
- Preserve accessibility standards

## Monitoring & Maintenance

### Weekly Checks

- Verify all new components use message functions
- Check for hardcoded text in recent changes
- Validate message key consistency

### After Major Updates

- Re-run complete Paraglide validation
- Test language switching across all pages
- Update message files with new content

### Performance Monitoring

- Monitor bundle size impact of message functions
- Ensure tree-shaking works correctly
- Check Core Web Vitals aren't affected

---

**CRITICAL REMINDER**: These Paraglide rules MUST be followed whenever working with user-facing text. No hardcoded content allowed in internationalized components.

**Last Updated**: June 21, 2025
**Version**: 1.0
**Auto-Trigger**: ON
