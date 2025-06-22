# CV PDF Generator Migration Guide

## Overview

The CV PDF generator has been updated to support internationalization and automatic generation during the build process.

## Key Changes

### 1. Internationalization Support

- **Two PDF files generated**: `CV.en.pdf` and `CV.fr.pdf`
- **Two routes supported**: `/en/about` and `/fr/about`
- **Language-specific source files**: `static/CV.en.md` and `static/CV.fr.md`

### 2. Single-Phase Approach

- **Automatic generation**: PDFs are now generated during `pnpm build`
- **No manual step**: No longer need to run separate generation commands
- **Build integration**: PDF generation happens in the `buildStart` hook

### 3. Updated Manifest Structure

```json
{
	"en": {
		"lastHash": "abc12345",
		"generated": "2025-06-22T01:55:00.000Z",
		"sourceFiles": [
			"static/CV.en.md",
			"src/routes/about/+page.svelte",
			"src/routes/about/+page.ts",
			"src/routes/about/cv.css",
			"src/app.css",
			"plugins/cv-pdf-generator.ts"
		],
		"pdfPath": "static/CV.en.pdf"
	},
	"fr": {
		"lastHash": "def67890",
		"generated": "2025-06-22T01:55:00.000Z",
		"sourceFiles": [
			"static/CV.fr.md",
			"src/routes/about/+page.svelte",
			"src/routes/about/+page.ts",
			"src/routes/about/cv.css",
			"src/app.css",
			"plugins/cv-pdf-generator.ts"
		],
		"pdfPath": "static/CV.fr.pdf"
	}
}
```

## Usage

### Build Process

```bash
pnpm build
```

This command will:

1. Check for changes in source files for each language
2. Generate PDFs only for languages with changes
3. Update the manifest with generation timestamps
4. Output both `CV.en.pdf` and `CV.fr.pdf` in the `static/` directory

### Manual Scripts (Deprecated)

The following scripts now show deprecation warnings:

- `pnpm run generate-cv-pdf`
- `pnpm run generate-cv-pdf-dev`
- `pnpm run generate-cv-pdf-new`

These scripts will guide users to use `pnpm build` instead.

## Technical Details

### Language Configuration

Each language has its own configuration:

```typescript
{
  lang: 'en',
  route: '/en/about',
  sourceFiles: [
    'static/CV.en.md',
    'src/routes/about/+page.svelte',
    // ... other files
  ],
  outputFilename: 'CV.en.pdf'
}
```

### Change Detection

- Each language has independent hash calculation
- Only changed languages trigger PDF regeneration
- Efficient build process that skips unnecessary work

### Server Management

- **Dev Server Priority**: Checks for running dev server via `.dev-server-port` file first
- **Fallback to Preview**: Automatically starts preview server if dev server unavailable
- **Sequential Generation**: Generates PDFs for both languages sequentially
- **Clean Shutdown**: Properly cleans up server processes after completion

## Migration Steps

1. ✅ **Plugin Updated**: The `cvPDFGenerator` plugin now supports dual languages
2. ✅ **Scripts Updated**: Manual generation scripts show deprecation warnings
3. ✅ **Manifest Structure**: Updated to track both languages separately
4. ✅ **Build Integration**: PDFs generated automatically during build

## Benefits

- **Simplified Workflow**: Single `pnpm build` command generates everything
- **Efficient**: Only regenerates PDFs when source files change
- **Internationalized**: Supports multiple languages out of the box
- **Maintainable**: Clear separation of language-specific configurations
- **Robust**: Proper error handling and server cleanup

## Backward Compatibility

- Manual generation functions are preserved but deprecated
- Existing scripts continue to work but show guidance messages
- Manifest file location remains the same (`static/CV.manifest.json`)
- Output directory remains the same (`static/`)
