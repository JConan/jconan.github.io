# Package Management Corrections Guide - Modern Package Manager Patterns

<!-- CONDENSATION_SAFE_START -->

## Meta Information

- **Domain**: Development Tools & Package Management
- **Correction Focus**: Package manager choice, dependency management, modern practices
- **LLM Mistake Patterns**: npm defaults, outdated commands, inefficient workflows, security issues
- **Project Types**: Node.js, SvelteKit, React, Vue, Next.js, Generic JavaScript
- **Trigger Keywords**: npm, pnpm, yarn, package, install, dependency, node_modules, package.json, lock file
- **Subtasks Supported**: package_manager_correction, dependency_installation, lock_file_management, script_optimization
- **Last Updated**: March 7, 2025
- **Condensation Safe**: YES
<!-- CONDENSATION_SAFE_END -->

## Quick Correction Reference

<!-- CRITICAL_PRESERVE_START -->

**Most Critical Package Management Corrections**:

1. ❌ LLM often generates: `npm install package-name`
   ✅ Use instead: `pnpm add package-name`

2. ❌ LLM often generates: `npm run dev`
   ✅ Use instead: `pnpm dev` (shorter syntax)

3. ❌ LLM often generates: `npm install` without lock file consideration
   ✅ Use instead: `pnpm install --frozen-lockfile` (CI) or `pnpm install` (dev)

4. ❌ LLM often generates: Global package installations
   ✅ Use instead: `pnpm dlx` for one-time usage or proper local installation

<!-- CRITICAL_PRESERVE_END -->

---

## Overview

This guide addresses common mistakes LLMs make when generating package management commands. LLMs often default to npm commands and miss modern package manager benefits like pnpm's efficiency, better dependency resolution, and improved security.

---

<!-- SUBTASK_START: package_manager_correction -->

## Correction: Package Manager Choice & Commands

### LLM Mistake Pattern

**What LLMs Often Generate**:

```bash
# ❌ Default npm commands
npm install express
npm install --save-dev typescript
npm install -g create-react-app
npm run build
npm run dev
npm run test

# Package.json scripts
{
  "scripts": {
    "dev": "npm run vite",
    "build": "npm run vite build"
  }
}
```

**Why This Is Wrong**:

- npm is slower and uses more disk space
- Less efficient dependency resolution
- Weaker security model
- Outdated global installation patterns
- Verbose command syntax

### Correct Approach

**What To Use Instead**:

```bash
# ✅ Modern pnpm commands
pnpm add express
pnpm add -D typescript
pnpm dlx create-react-app my-app  # One-time usage
pnpm build  # Direct script execution
pnpm dev
pnpm test

# Package.json scripts (no need for pnpm run prefix)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Why This Is Better**:

- **Faster**: Parallel installation, content-addressable storage
- **Efficient**: Symlinked node_modules, saves disk space
- **Secure**: Better dependency isolation
- **Modern**: Built-in workspace support, better CLI UX
- **Compatible**: Drop-in replacement for npm

### Detection & Verification

**How to Detect This Mistake**:

- Commands starting with `npm install` or `npm add`
- Usage of `npm run` for script execution
- Global npm installations (`npm install -g`)
- Missing pnpm-lock.yaml file

**How to Verify Correction**:

```bash
# Check for pnpm usage
grep -r "pnpm" package.json

# Verify pnpm lock file exists
ls pnpm-lock.yaml

# Check for npm artifacts that should be removed
ls package-lock.json node_modules/.package-lock.json 2>/dev/null
```

### Project Setup Correction

#### Initial Project Setup

```bash
# ❌ LLM often suggests
npm create svelte@latest my-app
cd my-app
npm install

# ✅ Modern pnpm approach
pnpm create svelte@latest my-app
cd my-app
pnpm install
```

#### Dependency Management

```bash
# ❌ npm patterns
npm install lodash
npm install --save-dev @types/lodash
npm uninstall lodash
npm update

# ✅ pnpm equivalents
pnpm add lodash
pnpm add -D @types/lodash
pnpm remove lodash
pnpm update
```

<!-- SUBTASK_END: package_manager_correction -->

---

<!-- SUBTASK_START: dependency_installation -->

## Correction: Dependency Installation Patterns

### LLM Mistake Pattern

**What LLMs Often Generate**:

```bash
# ❌ Inefficient dependency installation
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
npm install --save-dev typescript
npm install --save-dev vite

# Multiple separate commands
npm install express
npm install cors
npm install helmet
npm install dotenv
```

**Why This Is Wrong**:

- Multiple network requests
- Inefficient lock file updates
- Slower installation process
- Poor batching of dependencies

### Correct Approach

**What To Use Instead**:

```bash
# ✅ Efficient batch installation
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom typescript vite

# Single command for multiple dependencies
pnpm add express cors helmet dotenv

# Production vs development dependencies clearly separated
pnpm add express fastify  # Production
pnpm add -D typescript @types/node nodemon  # Development
```

**Why This Is Better**:

- Single network round-trip per dependency type
- Atomic lock file updates
- Faster installation
- Clear dependency categorization

### Detection & Verification

**How to Detect This Mistake**:

- Multiple consecutive install commands
- Mixed production/dev dependencies in single command
- Inefficient dependency grouping

**How to Verify Correction**:

```bash
# Check dependency organization in package.json
cat package.json | jq '.dependencies, .devDependencies'

# Verify lock file is properly updated
pnpm audit
```

### Framework-Specific Patterns

#### SvelteKit Project

```bash
# ✅ Efficient SvelteKit setup
pnpm create svelte@latest my-sveltekit-app
cd my-sveltekit-app
pnpm install

# Add common SvelteKit dependencies
pnpm add @tailwindcss/typography
pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/forms
```

#### React Project

```bash
# ✅ Efficient React setup
pnpm create react-app my-react-app --template typescript
cd my-react-app

# Add common React dependencies
pnpm add react-router-dom axios
pnpm add -D @types/react-router-dom
```

<!-- SUBTASK_END: dependency_installation -->

---

<!-- SUBTASK_START: lock_file_management -->

## Correction: Lock File Management

### LLM Mistake Pattern

**What LLMs Often Generate**:

```bash
# ❌ Poor lock file practices
npm install  # In CI/CD
npm install --save package  # Outdated flag
rm package-lock.json  # Dangerous
npm install --force  # Bypasses lock file

# Mixed lock files in repository
git add package-lock.json pnpm-lock.yaml  # Both present
```

**Why This Is Wrong**:

- Inconsistent dependency versions across environments
- Security vulnerabilities from outdated lock files
- Build failures from version mismatches
- Repository pollution with multiple lock files

### Correct Approach

**What To Use Instead**:

```bash
# ✅ Proper lock file management

# Development environment
pnpm install  # Respects lock file, updates if needed

# CI/CD environment
pnpm install --frozen-lockfile  # Fails if lock file is outdated

# Adding new dependencies
pnpm add package-name  # Updates lock file automatically

# Updating dependencies
pnpm update  # Updates within semver ranges
pnpm update package-name  # Update specific package
```

**Why This Is Better**:

- Consistent builds across environments
- Automatic security updates
- Faster CI/CD builds
- Better dependency resolution

### Detection & Verification

**How to Detect This Mistake**:

- Multiple lock files in repository
- Missing `--frozen-lockfile` in CI scripts
- Outdated lock file management commands

**How to Verify Correction**:

```bash
# Check for multiple lock files
ls package-lock.json yarn.lock pnpm-lock.yaml 2>/dev/null

# Verify CI uses frozen lockfile
grep -r "frozen-lockfile" .github/ .gitlab-ci.yml 2>/dev/null

# Check lock file is up to date
pnpm install --frozen-lockfile
```

### CI/CD Integration

#### GitHub Actions

```yaml
# ✅ Proper pnpm setup in CI
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test
```

#### Docker Integration

```dockerfile
# ✅ Efficient Docker with pnpm
FROM node:18-alpine

# Install pnpm
RUN corepack enable

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile --production

# Copy source code
COPY . .

# Build application
RUN pnpm build

CMD ["pnpm", "start"]
```

<!-- SUBTASK_END: lock_file_management -->

---

<!-- SUBTASK_START: script_optimization -->

## Correction: Script Execution & Optimization

### LLM Mistake Pattern

**What LLMs Often Generate**:

```json
{
	"scripts": {
		"dev": "npm run vite",
		"build": "npm run vite build",
		"test": "npm run vitest",
		"lint": "npm run eslint .",
		"format": "npm run prettier --write .",
		"start": "npm run node dist/index.js"
	}
}
```

**Why This Is Wrong**:

- Unnecessary `npm run` prefixes
- Verbose script definitions
- Missing parallel execution opportunities
- Poor script organization

### Correct Approach

**What To Use Instead**:

```json
{
	"scripts": {
		"dev": "vite",
		"build": "vite build",
		"preview": "vite preview",
		"test": "vitest",
		"test:ui": "vitest --ui",
		"lint": "eslint .",
		"lint:fix": "eslint . --fix",
		"format": "prettier --write .",
		"format:check": "prettier --check .",
		"check": "pnpm lint && pnpm format:check && pnpm test",
		"ci": "pnpm install --frozen-lockfile && pnpm check && pnpm build"
	}
}
```

**Why This Is Better**:

- Direct command execution
- Clear script naming
- Parallel execution support
- Comprehensive CI script

### Detection & Verification

**How to Detect This Mistake**:

- Scripts with unnecessary `npm run` prefixes
- Missing parallel execution opportunities
- Verbose or unclear script names

**How to Verify Correction**:

```bash
# Test script execution
pnpm dev  # Should work without npm run prefix
pnpm check  # Should run multiple commands

# Verify parallel execution works
pnpm run --parallel lint test  # If supported
```

### Advanced Script Patterns

#### Workspace Scripts

```json
{
	"scripts": {
		"dev": "pnpm --recursive --parallel dev",
		"build": "pnpm --recursive build",
		"test": "pnpm --recursive test",
		"clean": "pnpm --recursive clean"
	}
}
```

#### Environment-Specific Scripts

```json
{
	"scripts": {
		"dev": "vite --mode development",
		"dev:prod": "vite --mode production",
		"build": "vite build",
		"build:staging": "vite build --mode staging",
		"preview": "vite preview",
		"preview:prod": "vite preview --mode production"
	}
}
```

<!-- SUBTASK_END: script_optimization -->

---

## Common Error Patterns

### Error: Command not found

**Cause**: Using npm commands in pnpm project
**Solution**: Replace npm with pnpm commands
**Prevention**: Use pnpm consistently throughout project

```bash
# ❌ Error-prone
npm start  # When project uses pnpm

# ✅ Correct
pnpm start
```

### Error: Lock file conflicts

**Cause**: Multiple package managers used in same project
**Solution**: Choose one package manager and remove others' artifacts
**Prevention**: Set up .gitignore and team guidelines

```bash
# ✅ Clean up mixed lock files
rm package-lock.json yarn.lock  # Keep only pnpm-lock.yaml
echo "package-lock.json" >> .gitignore
echo "yarn.lock" >> .gitignore
```

### Error: CI build failures

**Cause**: Missing --frozen-lockfile in CI
**Solution**: Always use frozen lockfile in CI/CD
**Prevention**: Include in CI templates and documentation

---

## Project Compatibility

<!-- PROJECT_DETECTION_START -->

**Detectable Patterns**:

- Node.js projects: `package.json` file present
- pnpm projects: `pnpm-lock.yaml` exists
- npm projects: `package-lock.json` exists
- Workspace projects: `pnpm-workspace.yaml` present

<!-- PROJECT_DETECTION_END -->

### Migration from npm to pnpm

```bash
# ✅ Safe migration process
# 1. Remove npm artifacts
rm package-lock.json node_modules -rf

# 2. Install pnpm if not present
npm install -g pnpm  # One-time global install

# 3. Install dependencies with pnpm
pnpm install

# 4. Update scripts if needed (remove npm run prefixes)
# 5. Update CI/CD to use pnpm

# 6. Add to .gitignore
echo "package-lock.json" >> .gitignore
echo "yarn.lock" >> .gitignore
```

### .npmrc Configuration

```ini
# ✅ Recommended .npmrc for pnpm projects
# Use pnpm for this project
package-manager=pnpm

# Security settings
audit-level=moderate
fund=false

# Performance settings
prefer-offline=true
```

---

## Usage Notes for LLMs

### Session Management

**Load Once Rule**: Mark as loaded after first read
**Context Key**: `package_management_corrections_loaded`
**Dependencies**: None
**Conflicts**: npm-specific guides (if any exist)

### When to Use This Guide

1. **Primary trigger**: Package management commands, dependency installation
2. **Secondary triggers**: Project setup, CI/CD configuration, build scripts
3. **Integration**: Works with all Node.js-based projects

### Best Practices

1. **Consistency**: Use pnpm throughout entire project lifecycle
2. **Lock files**: Always commit and respect lock files
3. **CI optimization**: Use frozen lockfile in production builds
4. **Script clarity**: Use direct commands without unnecessary prefixes

---

## Future Enhancements

_This section will be expanded as new package management patterns emerge._

### Planned Additions

- Workspace management patterns
- Monorepo optimization techniques
- Security audit automation
- Dependency update strategies
- Performance optimization patterns

---

**Last Updated**: March 7, 2025
**Next Review**: When new package manager features are released
**Maintenance**: Auto-updated through package management pattern collection
