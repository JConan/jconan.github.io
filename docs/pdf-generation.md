# CV PDF Generation System

This project includes a build-time PDF generation system that creates static PDFs of the CV page using Puppeteer. The system is hash-based, meaning it only regenerates PDFs when the source files change.

## How It Works

1. **Hash Calculation**: The system calculates a hash from key source files:
   - `static/CV.md` (CV content)
   - `src/routes/cv/+page.svelte` (CV page component)
   - `src/routes/cv/+page.ts` (CV page loader)
   - `src/app.css` (global styles)

2. **Version Management**: PDFs are stored as `cv-{hash}.pdf` in `static/pdf/` with a manifest tracking versions.

3. **Automatic Fallback**: The CV download buttons first try to use static PDFs, falling back to client-side generation if unavailable.

## Usage

### During Development (Recommended)

When you have the dev server running:

```bash
# Start dev server first
pnpm dev

# In another terminal, generate PDF from dev server
pnpm run generate-cv-pdf-dev [port]
```

The script will automatically detect the dev server and use it for PDF generation.

### After Build

Generate PDF from preview server:

```bash
# Build the project first
pnpm build

# Generate PDF using preview server
pnpm run generate-cv-pdf
```

### Custom Port

You can specify a custom port for the dev server:

```bash
pnpm run generate-cv-pdf-dev 3000
```

## Files Structure

```
static/pdf/
├── cv-manifest.json          # Version manifest
├── cv-{hash1}.pdf           # PDF version 1
├── cv-{hash2}.pdf           # PDF version 2
└── ...                      # Up to 5 versions kept
```

## Manifest Format

```json
{
  "latest": "cv-a1b2c3d4.pdf",
  "versions": [
    {
      "hash": "a1b2c3d4",
      "filename": "cv-a1b2c3d4.pdf",
      "generated": "2025-06-20T00:46:08Z",
      "source_files": ["static/CV.md", "src/routes/cv/+page.svelte", ...]
    }
  ]
}
```

## Integration

The CV pages (`/cv` and `/cv-v2`) automatically:

1. Check for static PDFs via the manifest
2. Download static PDFs if available
3. Fall back to client-side PDF generation if needed

## Build Integration

The Vite plugin runs during build to:

1. Check if PDFs need updating (hash comparison)
2. Log when PDF generation is needed
3. Ensure the PDF directory exists

## Benefits

- **Performance**: Static PDFs load instantly
- **Consistency**: Server-side rendering ensures perfect styling
- **Efficiency**: Only regenerates when content changes
- **Reliability**: Automatic fallback to client-side generation
- **Version Management**: Keeps track of PDF versions and cleans up old ones

## Dependencies

- `puppeteer`: For headless browser PDF generation
- `tsx`: For running TypeScript scripts
- Custom Vite plugin for build integration