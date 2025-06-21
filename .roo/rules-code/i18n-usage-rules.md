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
- **Reactive utility**: [`src/lib/utils/i18n.svelte.ts`](src/lib/utils/i18n.svelte.ts) exports `lang` function

## How to Use Translations

### 1. Import and use in components

```typescript
import { lang } from '$lib/utils/i18n.svelte';
```

```svelte
<!-- IMPORTANT: Always call the message functions! -->
<h1>{lang().nav.home()}</h1>
<p>{lang().pages.home.title()}</p>
<button>{lang().common.submit()}</button>
```

### 2. With parameters

```svelte
<p>{lang().common.welcome({ name: 'Johan' })}</p>
```

## Message Organization (Nested Objects)

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

**[`messages/en.json`](messages/en.json)**:

```json
{
	"nav": {
		"home": "Home",
		"contact": "Contact",
		"about": "About"
	},
	"pages": {
		"home": {
			"title": "Johan Chan - Freelance Developer"
		},
		"contact": {
			"title": "Contact me"
		}
	},
	"common": {
		"submit": "Send",
		"loading": "Loading...",
		"welcome": "Welcome {name}"
	}
}
```

## Usage Examples

```svelte
<!-- Navigation -->
<Link href="/">{lang().nav.home()}</Link>

<!-- Page content -->
<h1>{lang().pages.home.title()}</h1>

<!-- Common elements -->
<button>{lang().common.submit()}</button>
<div>{lang().common.loading()}</div>
```

## Organization Rules (MANDATORY)

1. **CRITICAL: Always call functions**: `lang().nav.home()` not `lang().nav.home`
2. **Nested structure**: Group by category (`nav`, `pages`, `common`)
3. **camelCase keys**: Use camelCase for nested object keys
4. **Both files**: Always update both `en.json` and `fr.json`
5. **Same structure**: Keep identical nesting in both language files
6. **No hardcoded text**: All user-facing text must use `lang()` function

## Organization Categories

- `nav` - Navigation links
- `pages` - Page-specific content organized by page name
- `common` - Shared messages across the app
- `forms` - Form elements (labels, placeholders, buttons)
- `buttons` - Reusable button texts
- `seo` - SEO-related content

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

**Fix**: Replace with appropriate `lang()` function call

### Function Call Missing Error

```
Error: Expected function call lang().key() not lang().key
```

**Fix**: Add parentheses to call the message function

## Best Practices Checklist

### Do's ✅

- Use nested object structure for organization
- Call message functions: `lang().nav.home()`
- Keep message files synchronized
- Use camelCase for nested keys
- Test both languages during development
- Use parameters for dynamic content

### Don'ts ❌

- Mix hardcoded text with message functions
- Forget to call message functions (missing parentheses)
- Break structure consistency between languages
- Use flat key structure with prefixes

## Integration with Existing Rules

### SEO Rules Compatibility

- Message functions work with existing SEO meta tag system
- Language-specific meta descriptions supported

### Theming Rules Compatibility

- Message functions don't affect styling classes
- Maintain Tailwind usage patterns

---

**CRITICAL REMINDER**: These i18n rules MUST be followed whenever working with user-facing text. No hardcoded content allowed in components.

**Last Updated**: June 22, 2025
**Version**: 1.0
**Auto-Trigger**: ON
