# Tool Correction Guides

This directory contains specialized correction guides that fix common LLM mistakes when working with development tools and utilities.

## Implemented Correction Guides

### ✅ ImageMagick Corrections ([`imagemagick-guide.md`](imagemagick-guide.md))

Enhanced tool guide with correction-focused sections:

- **SVG Conversion Mistakes**: Incorrect density, missing transparency preservation
- **Favicon Generation Errors**: Wrong size specifications, format mistakes
- **Path Resolution Issues**: Incorrect project-specific directory usage
- **Command Syntax Errors**: Parameter ordering, option mistakes

### ✅ Package Management Corrections ([`package-management-corrections-guide.md`](package-management-corrections-guide.md))

Corrects common package manager mistakes:

- **Manager Confusion**: `npm install` → `pnpm add` (project-specific)
- **Dependency Types**: Wrong `--save-dev` vs `--save` usage
- **Lock File Issues**: Mixing package managers, incorrect update commands
- **Workspace Errors**: Monorepo package management mistakes

**Example Correction**:

```bash
# ❌ LLM Mistake (common default)
npm install typescript --save-dev

# ✅ Corrected (project-aware)
pnpm add -D typescript
```

## Planned Tool Corrections

- **Docker Corrections** - Containerization and image management mistakes
- **Git Corrections** - Workflow and branching strategy errors
- **Build Tool Corrections** - Webpack/Vite configuration mistakes
- **Linting Corrections** - ESLint/Prettier setup and rule errors

## Correction Guide Standards

Each tool correction guide follows this structure:

1. **Common LLM Mistakes Section** - Categorized frequent tool errors
2. **Immediate Corrections** - Side-by-side mistake→correction examples
3. **Project-Aware Context** - Tool usage adapted to detected project type
4. **Command Syntax Fixes** - Correct parameter usage and option ordering
5. **Integration Corrections** - Proper tool integration within project workflows
6. **Cross-Platform Notes** - Platform-specific correction considerations

## Correction Trigger Patterns

Tool correction guides auto-load when detecting mistake-prone contexts:

- **ImageMagick**: `image` + (`svg`, `convert`, `favicon`, `transparency`, conversion errors)
- **Package Management**: `npm` + (`install`, `add`, `dependency`, package manager confusion)
- **Docker**: `docker` + (`build`, `run`, `compose`, containerization mistakes)
- **Git**: `git` + (`merge`, `rebase`, `conflict`, workflow errors)

## Project-Aware Tool Corrections

Tool corrections adapt based on detected project environment:

- **SvelteKit Projects**:
  - ImageMagick outputs to `static/` directory
  - Package management uses `pnpm` commands
  - Build tool integration with Vite
- **React Projects**:
  - ImageMagick outputs to `public/` directory
  - Package management may use `npm` or `yarn`
  - Build tool integration with Webpack/Vite

- **Generic Projects**:
  - ImageMagick outputs to `assets/` directory
  - Standard package manager detection
  - Universal tool integration patterns

## Adding New Tool Corrections

When creating new tool correction guides:

1. **Research Common Mistakes**: Identify frequent LLM errors with the tool
2. **Use Correction Template**: Start with [`../_meta/template.md`](../_meta/template.md)
3. **Follow Correction Standards**: Apply [`../_meta/llm-writing-guide.md`](../_meta/llm-writing-guide.md)
4. **Add Mistake Triggers**: Update [`../_meta/extra-guide.md`](../_meta/extra-guide.md) with error-detection patterns
5. **Test Correction Loading**: Verify corrections load for relevant mistake contexts
6. **Include Project Adaptation**: Show how corrections vary by project type
7. **Update This README**: Document the new correction guide

## Transformation Success

The tools directory has successfully evolved from general documentation to **mistake-focused corrective guidance**:

**Before**: General tool documentation with broad usage patterns
**After**: Targeted correction guides that fix specific LLM mistakes

This transformation ensures LLMs receive precise corrections when they make common tool-related errors, rather than generic documentation that may not address the specific mistake context.

---

**Last Updated**: March 7, 2025
**Version**: 2.0 (Corrective Guidance Implementation)
**Status**: Core tool corrections implemented, transformation complete
