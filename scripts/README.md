# Scripts Directory

This directory contains project-specific utility scripts.

## CV Generation Scripts

- `generate-cv-pdf.ts`: Production CV PDF generation
- `generate-cv-pdf-dev.ts`: Development CV generation with debug output
- `generate-cv-pdf-new.ts`: New CV format generation

### Usage

```bash
pnpm run generate-cv-pdf
pnpm run generate-cv-pdf-dev
pnpm run generate-cv-pdf-new
```

## Other Scripts

- `pre-commit-tests.sh`: Pre-commit validation script
- `validate-testing-infrastructure.ts`: Testing infrastructure validation

## Contributing

When adding new scripts:

1. Make scripts executable: `chmod +x scripts/your-script.sh`
2. Add npm script shortcuts to `package.json` (for Node.js projects)
3. Document usage in this README
4. Follow existing naming conventions
5. Include error handling and help options

## Security

- Scripts should validate inputs and environment
- Use relative paths from project root
- Avoid hardcoded absolute paths
- Include dry-run options for destructive operations

## LLM Knowledge Management

The LLM knowledge management system (including setup scripts) is now located in `docs/llm/_meta/` to maintain project-agnostic architecture. This allows the knowledge system to be shared across different project types (Node.js, Python, Go, etc.) without dependency on specific package managers.

For LLM setup, see: `docs/llm/_meta/setup-llm-knowledge.sh`
