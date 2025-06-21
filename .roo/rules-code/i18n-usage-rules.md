# LLM i18n Usage Rules - Internationalization Guidelines

## CRITICAL: Auto-Trigger i18n Validation

**RULE**: Whenever ANY component contains user-facing text, AUTOMATICALLY validate i18n usage.

### i18n Change Detection Triggers

**IF** any of these files are modified:

- `src/routes/**/*.svelte` (components with user-facing text)
- `src/lib/components/**/*.svelte` (reusable components)
- `messages/*.json` (message files)

**THEN** AUTOMATICALLY execute i18n Validation Workflow below.

## Project Setup Overview

This project uses **Paraglide JS** with **Svelte 5** for internationalization:

- **Base locale**: French (`fr`) - no URL prefix
- **Secondary locale**: English (`en`) - uses `/en/` URL prefix
- **Message files**: [`messages/en.json`](messages/en.json) and [`messages/fr.json`](messages/fr.json)
- **Direct Paraglide import**: Use `import { m } from '$lib/paraglide/messages';`

## How to Use Translations

### 1. Import and use in components

```typescript
import { m } from '$lib/paraglide/messages';
```

```svelte
<!-- IMPORTANT: Always call the message functions! -->
<!-- Paraglide flattens nested objects to dot notation -->
<h1>{m['nav.home']()}</h1>
<p>{m['pages.home.title']()}</p>
<button>{m['common.submit']()}</button>
```

### 2. With parameters

```svelte
<p>{m['common.welcome']({ name: 'Johan' })}</p>
```

## Message Organization Options

**CRITICAL**: Paraglide automatically flattens nested JSON objects into dot-notation keys at runtime. You have two approaches:

### Option A: Nested Objects (Better for maintenance)

**[`messages/fr.json`](messages/fr.json)**:

```json
{
	"nav": {
		"home": "Accueil",
		"contact": "Contact",
		"about": "À propos"
	},
	"pages": {
		"home": {
			"title": "Johan Chan - Développeur Freelance"
		},
		"contact": {
			"title": "Contactez-moi"
		}
	},
	"common": {
		"submit": "Envoyer",
		"loading": "Chargement...",
		"welcome": "Bienvenue {name}"
	}
}
```

**Usage**: `{m["nav.home"]()}` (bracket notation required)

### Option B: Flat Keys (Simpler access)

**[`messages/fr.json`](messages/fr.json)**:

```json
{
	"nav_home": "Accueil",
	"nav_contact": "Contact",
	"nav_about": "À propos",
	"pages_home_title": "Johan Chan - Développeur Freelance",
	"pages_contact_title": "Contactez-moi",
	"common_submit": "Envoyer",
	"common_loading": "Chargement...",
	"common_welcome": "Bienvenue {name}"
}
```

**Usage**: `{m.nav_home()}` (direct access)

## Usage Examples

### With Nested Objects (Recommended for maintenance)

```svelte
<!-- Navigation -->
<Link href="/">{m['nav.home']()}</Link>

<!-- Page content -->
<h1>{m['pages.home.title']()}</h1>

<!-- Common elements -->
<button>{m['common.submit']()}</button>
<div>{m['common.loading']()}</div>
```

### With Flat Keys (Simpler syntax)

```svelte
<!-- Navigation -->
<Link href="/">{m.nav_home()}</Link>

<!-- Page content -->
<h1>{m.pages_home_title()}</h1>

<!-- Common elements -->
<button>{m.common_submit()}</button>
<div>{m.common_loading()}</div>
```

## Organization Rules (MANDATORY)

1. **CRITICAL: Always call functions**: `m["nav.home"]()` or `m.nav_home()` not `m.nav.home`
2. **Paraglide flattens nested objects**: Nested JSON becomes dot-notation keys at runtime
3. **Choose your approach**: Nested objects (better maintenance) vs flat keys (simpler access)
4. **Both files**: Always update both `en.json` and `fr.json`
5. **Same structure**: Keep identical organization in both language files
6. **No hardcoded text**: All user-facing text must use `m` function calls

## Organization Categories

- `nav` / `nav_*` - Navigation links
- `pages` / `pages_*` - Page-specific content organized by page name
- `common` / `common_*` - Shared messages across the app
- `forms` / `forms_*` - Form elements (labels, placeholders, buttons)
- `buttons` / `buttons_*` - Reusable button texts
- `seo` / `seo_*` - SEO-related content

## Validation Commands (EXECUTE AFTER CHANGES)

### Build Validation

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

### Hardcoded Text Detection

```
Error: Hardcoded text found in component
```

**Fix**: Replace with appropriate `m` function call

### Function Call Missing Error

```
Error: Expected function call m["key"]() not m.key
```

**Fix**: Add parentheses to call the message function

## Best Practices Checklist

### Do's ✅

- Choose between nested objects (maintenance) or flat keys (simplicity)
- Call message functions: `m["nav.home"]()` or `m.nav_home()`
- Keep message files synchronized
- Use camelCase for nested keys, snake_case for flat keys
- Test both languages during development
- Use parameters for dynamic content

### Don'ts ❌

- Mix hardcoded text with message functions
- Forget to call message functions (missing parentheses)
- Break structure consistency between languages
- Use object notation for nested keys (`m.nav.home()` won't work)

## Integration with Existing Rules

### SEO Rules Compatibility

- Message functions work with existing SEO meta tag system
- Language-specific meta descriptions supported

### Theming Rules Compatibility

- Message functions don't affect styling classes
- Maintain Tailwind usage patterns

---

**CRITICAL REMINDER**: These i18n rules MUST be followed whenever working with user-facing text. No hardcoded content allowed in components.

**Key Insight**: Paraglide flattens nested JSON objects to dot-notation keys at runtime, requiring bracket notation or flat key structure.

**Last Updated**: June 22, 2025
**Version**: 2.0
**Auto-Trigger**: ON
