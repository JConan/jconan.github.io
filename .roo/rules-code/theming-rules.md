# LLM Theming Rules - Accessibility & Readability Standards

## CRITICAL: Auto-Trigger Theming Validation

**RULE**: Whenever ANY styling-related file is created or modified, AUTOMATICALLY validate against these theming standards.

### Styling Change Detection Triggers

**IF** any of these files are modified:

- `src/routes/**/*+page.svelte` (page components with styles)
- `src/lib/components/**/*.svelte` (component styles)
- `src/app.html` (global styles)
- Any file containing `<style>` blocks or Tailwind classes

**THEN** AUTOMATICALLY execute Theming Validation Workflow below.

## Theming Validation Workflow (MANDATORY)

### Step 1: Contrast Ratio Validation

**CRITICAL REQUIREMENTS**:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

**FORBIDDEN COMBINATIONS**:

```css
/* ❌ NEVER USE - Poor readability */
dark:from-gray-800 dark:to-gray-900  /* Too dark for content areas */
dark:text-gray-200                   /* Light text on dark - poor contrast */
dark:text-gray-400                   /* Very poor contrast */
dark:bg-gray-800                     /* Dark backgrounds for content */
dark:bg-gray-900                     /* Extremely dark backgrounds */
```

**APPROVED COMBINATIONS**:

```css
/* ✅ ALWAYS USE - Excellent readability */
dark:from-slate-50 dark:to-blue-50   /* Light backgrounds */
dark:text-gray-900                   /* Dark text on light - high contrast */
dark:text-gray-800                   /* Dark text for lists/secondary */
dark:text-gray-700                   /* Dark text for descriptions */
dark:border-gray-300                 /* Light borders */
```

### Step 2: Background Pattern Standards

**Content Areas**:

```css
/* ✅ PREFERRED - Light, accessible backgrounds */
.content-card {
	@apply bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-50 dark:to-blue-50;
}

.content-section {
	@apply bg-white dark:bg-slate-50;
}
```

**Navigation/Header Areas** (Dark themes acceptable):

```css
/* ✅ ACCEPTABLE - Dark themes for navigation only */
.navigation {
	@apply bg-gray-900 dark:bg-gray-800;
}
```

**NEVER for Content**:

```css
/* ❌ FORBIDDEN for content areas */
.content-area {
	@apply dark:from-gray-800 dark:to-gray-900; /* Causes readability issues */
}
```

### Step 3: Typography Hierarchy Standards

**Headings**:

```css
/* ✅ REQUIRED - Maximum contrast for headings */
h1,
h2,
h3,
h4,
h5,
h6 {
	@apply text-gray-800 dark:text-gray-900;
}
```

**Body Text**:

```css
/* ✅ REQUIRED - High contrast for body text */
.prose,
.content {
	@apply text-gray-800 dark:text-gray-900;
}
```

**Secondary Text**:

```css
/* ✅ REQUIRED - Good contrast for secondary text */
.lead,
.description {
	@apply text-gray-600 dark:text-gray-700;
}
```

**List Items**:

```css
/* ✅ REQUIRED - Clear contrast for lists */
li {
	@apply text-gray-700 dark:text-gray-800;
}
```

### Step 4: Interactive Element Standards

**Buttons**:

```css
/* ✅ REQUIRED - High contrast buttons */
.btn-primary {
	@apply bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600;
}

.btn-secondary {
	@apply bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-100 dark:text-gray-900;
}
```

**Links**:

```css
/* ✅ REQUIRED - Accessible link colors */
a {
	@apply text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600;
}
```

### Step 5: Border and Divider Standards

**Borders**:

```css
/* ✅ REQUIRED - Visible but subtle borders */
.border-element {
	@apply border-gray-200 dark:border-gray-300;
}
```

**Dividers**:

```css
/* ✅ REQUIRED - Clear section separation */
.divider {
	@apply border-t border-gray-200 dark:border-gray-300;
}
```

## Component-Specific Rules

### Page Components (`+page.svelte`)

**MANDATORY Structure**:

```svelte
<style>
	@reference "tailwindcss";

	/* ✅ REQUIRED - Light theme for content */
	.main-content {
		@apply bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-50 dark:to-blue-50;
	}

	/* ✅ REQUIRED - Dark text on light */
	.prose {
		@apply text-gray-800 dark:text-gray-900;
	}
</style>
```

### Card Components

**MANDATORY Pattern**:

```css
/* ✅ REQUIRED - Accessible card styling */
.card {
	@apply bg-white dark:bg-slate-50 border border-gray-200 dark:border-gray-300;
}

.card-title {
	@apply text-gray-800 dark:text-gray-900;
}

.card-content {
	@apply text-gray-700 dark:text-gray-800;
}
```

## Accessibility Testing Protocol

### Manual Validation (EXECUTE AFTER CHANGES)

1. **Visual Inspection**:

   - Check all text is easily readable
   - Verify no light text on dark backgrounds in content areas
   - Confirm adequate spacing and typography hierarchy

2. **Browser Developer Tools**:

   - Use Accessibility tab to check contrast ratios
   - Verify WCAG AA compliance (4.5:1 for normal text)
   - Test with different zoom levels (up to 200%)

3. **Cross-Browser Testing**:
   - Test in Chrome, Firefox, Safari
   - Verify consistent rendering across browsers
   - Check mobile responsiveness

### Automated Validation Commands

```bash
# Build validation
pnpm build

# Development server
pnpm dev

# Accessibility audit (if available)
pnpm audit:a11y
```

## Error Recovery Procedures

### Poor Contrast Error:

```
Error: Text contrast ratio below 4.5:1
```

**Fix**: Replace with approved color combinations from Step 1

### Dark Background on Content:

```
Error: Dark theme background detected in content area
```

**Fix**: Use light background patterns from Step 2

### Light Text on Dark:

```
Error: Light text color detected (dark:text-gray-200)
```

**Fix**: Replace with dark text colors (dark:text-gray-900)

## Brand-Specific Guidelines

### Johan Chan Portfolio Standards

**Color Palette**:

- **Primary**: Blue (#3B82F6 / blue-500)
- **Secondary**: Slate (#64748B / slate-500)
- **Background**: Light gradients (blue-50 to indigo-50)
- **Text**: Dark grays (gray-800, gray-900)

**Typography**:

- **Headings**: Bold, high contrast (text-gray-800 dark:text-gray-900)
- **Body**: Medium contrast (text-gray-700 dark:text-gray-800)
- **Descriptions**: Subtle but readable (text-gray-600 dark:text-gray-700)

**Layout**:

- **Content Cards**: Light backgrounds with subtle gradients
- **Navigation**: Can use dark themes
- **CTAs**: High contrast buttons with clear hover states

## Performance Considerations

### CSS Optimization

- Use Tailwind's built-in color scales
- Avoid custom CSS colors when Tailwind equivalents exist
- Minimize style block complexity
- Leverage Tailwind's dark mode utilities

### Loading Performance

- Ensure theming doesn't impact Core Web Vitals
- Use system fonts when possible
- Optimize gradient usage for performance

## Maintenance Schedule

### Weekly Checks:

- Audit all pages for contrast compliance
- Verify new components follow theming rules
- Test accessibility across devices

### After Major Updates:

- Re-run complete theming validation
- Update ruleset if new patterns emerge
- Document any approved exceptions

### Quarterly Reviews:

- Review WCAG guideline updates
- Update color palette if needed
- Assess user feedback on readability

## Integration with Other Rules

### SEO Rules Compatibility

- Theming changes should not affect SEO meta tags
- Maintain structured data integrity
- Ensure social preview images reflect theme

### Performance Rules Compatibility

- Theming should not degrade Core Web Vitals
- Optimize CSS delivery for theme switching
- Monitor bundle size impact

---

**CRITICAL REMINDER**: These theming rules MUST be validated whenever styling files are modified. Accessibility is non-negotiable.

**Approved Examples**: Services page (`/services`) and Blog page (`/blog`) after readability improvements

**Last Updated**: June 21, 2025
**Version**: 1.0
**Auto-Trigger**: ON
