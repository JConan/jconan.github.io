# LLM Guide Registration Process

## CRITICAL: Adding New Guides to the Knowledge System

**PURPOSE**: Step-by-step instructions for registering new LLM knowledge guides in the [`extra-guide.md`](extra-guide.md) system.

---

## Prerequisites

Before registering a new guide:

1. ✅ **Guide Created**: New guide exists and follows [`writing-guide.md`](writing-guide.md) standards
2. ✅ **Guide Tested**: All commands/code tested and verified working
3. ✅ **Quality Check**: Guide passes quality checklist from writing guide
4. ✅ **Location Determined**: Guide placed in appropriate subdirectory (`tools/`, `frameworks/`, or `domains/`)

---

## Step 1: Determine Guide Category

**Choose the correct subdirectory**:

### Tools (`docs/llm/tools/`)

- Command-line tools (ImageMagick, Docker, Git)
- Development utilities
- Build tools and processors

### Frameworks (`docs/llm/frameworks/`)

- Web frameworks (SvelteKit, React, Vue, Next.js)
- Testing frameworks (Playwright, Jest, Vitest)
- UI libraries and component systems

### Domains (`docs/llm/domains/`)

- Domain expertise (Database, API, Security)
- Business logic patterns
- Architecture and design patterns

---

## Step 2: Add Guide to Available Knowledge Documents

**Edit**: [`docs/llm/_meta/extra-guide.md`](extra-guide.md)

**Location**: Find the "Available Knowledge Documents" section (around line 77)

**Add new entry** in the appropriate category:

### For Tools Category

```markdown
#### [Tool Category Name]

- **Path (Roo)**: [`docs/llm/tools/your-guide-name.md`](../../docs/llm/tools/your-guide-name.md)
- **Path (Direct)**: [`docs/llm/tools/your-guide-name.md`](../tools/your-guide-name.md)
- **Triggers**: keyword1, keyword2, keyword3, primary-tool-name
- **Content**: Brief description of what the guide covers
- **Project Types**: SvelteKit, React, Next.js, Vue, Generic (or subset)
- **Subtasks**: `subtask_1`, `subtask_2`, `subtask_3`
- **Condensation Safe**: YES
- **Last Updated**: [Current Date]
```

### For Frameworks Category

```markdown
#### [Framework Name] Development

- **Path (Roo)**: [`docs/llm/frameworks/framework-guide.md`](../../docs/llm/frameworks/framework-guide.md)
- **Path (Direct)**: [`docs/llm/frameworks/framework-guide.md`](../frameworks/framework-guide.md)
- **Triggers**: framework-name, specific-keywords, development-patterns
- **Content**: Framework-specific development patterns and solutions
- **Project Types**: [Framework Name], Generic
- **Subtasks**: `setup_project`, `implement_feature`, `optimize_performance`
- **Condensation Safe**: YES
- **Last Updated**: [Current Date]
```

### For Domains Category

```markdown
#### [Domain Name] Operations

- **Path (Roo)**: [`docs/llm/domains/domain-guide.md`](../../docs/llm/domains/domain-guide.md)
- **Path (Direct)**: [`docs/llm/domains/domain-guide.md`](../domains/domain-guide.md)
- **Triggers**: domain-keywords, operation-types, technical-terms
- **Content**: Domain-specific knowledge and best practices
- **Project Types**: Universal (or specific types)
- **Subtasks**: `analyze_requirements`, `implement_solution`, `validate_results`
- **Condensation Safe**: YES
- **Last Updated**: [Current Date]
```

---

## Step 3: Add Knowledge Loading Triggers

**Edit**: [`docs/llm/_meta/extra-guide.md`](extra-guide.md)

**Location**: Find the "Knowledge Loading Triggers" section (around line 29)

**Add new trigger section**:

```markdown
**IF** any of these scenarios are detected:

- [Primary use case description]
- [Secondary use case description]
- [Tool/framework-specific operations]
- [Domain-specific tasks]

**THEN** AUTOMATICALLY load:

- **Path (Roo)**: [`docs/llm/category/your-guide.md`](../../docs/llm/category/your-guide.md)
- **Path (Direct)**: [`docs/llm/category/your-guide.md`](../category/your-guide.md)
```

---

## Step 4: Update Trigger Keywords Reference

**Edit**: [`docs/llm/_meta/extra-guide.md`](extra-guide.md)

**Location**: Find the "Trigger Keywords Reference" section (around line 153)

**Add new keyword category** or **update existing category**:

### New Category Example

```markdown
**[Your Domain/Tool]**: `primary-keyword`, `secondary-keyword`, `tool-name`, `operation-type`, `specific-feature`, `use-case-keyword`
```

### Update Existing Category Example

```markdown
**Image Processing**: `image`, `svg`, `png`, `ico`, `favicon`, `convert`, `magick`, `transparency`, `background`, `raster`, `graphics`, `optimization`, `compression`, `your-new-keywords`
```

---

## Step 5: Update Future Knowledge Areas (Optional)

**Edit**: [`docs/llm/_meta/extra-guide.md`](extra-guide.md)

**Location**: Find the "Future Knowledge Areas" section (around line 110)

**Remove completed item** from "Planned Additions" list if your guide fulfills a planned area.

---

## Step 6: Test Registration

### Verification Checklist

- [ ] **Path Resolution**: Both Roo and Direct paths work correctly
- [ ] **Trigger Detection**: Keywords trigger guide loading
- [ ] **Category Placement**: Guide appears in correct section
- [ ] **Link Functionality**: All markdown links work in VSCode and GitHub
- [ ] **Dual-Path Format**: Both symlink and direct access paths included

### Manual Testing

1. **Test Symlink Path**: Access via `.roo/rules-code/extra-guide.md` and click Roo path
2. **Test Direct Path**: Access via `docs/llm/_meta/extra-guide.md` and click Direct path
3. **Test Trigger Keywords**: Verify LLM would load guide based on trigger keywords
4. **Test Guide Loading**: Use `read_file` tool to load the new guide

---

## Step 7: Update Related Documentation

### Update Category README

**Edit appropriate README**:

- [`docs/llm/tools/README.md`](../tools/README.md) for tools
- [`docs/llm/frameworks/README.md`](../frameworks/README.md) for frameworks
- [`docs/llm/domains/README.md`](../domains/README.md) for domains

**Add entry** to the relevant category list.

### Update Main System README

**Edit**: [`docs/llm/README.md`](../README.md)

**Update guide count** and **add to appropriate category** if it's a significant addition.

---

## Example: Complete Registration

### Scenario: Adding Docker Tool Guide

**Step 1**: Category = Tools (`docs/llm/tools/docker-guide.md`)

**Step 2**: Add to Available Knowledge Documents:

```markdown
#### Container & Deployment Tools

- **Path (Roo)**: [`docs/llm/tools/docker-guide.md`](../../docs/llm/tools/docker-guide.md)
- **Path (Direct)**: [`docs/llm/tools/docker-guide.md`](../tools/docker-guide.md)
- **Triggers**: docker, container, dockerfile, compose, deployment, containerization
- **Content**: Docker containerization, multi-stage builds, and deployment patterns
- **Project Types**: SvelteKit, React, Next.js, Vue, Generic
- **Subtasks**: `create_dockerfile`, `setup_compose`, `optimize_image`, `deploy_container`
- **Condensation Safe**: YES
- **Last Updated**: February 7, 2025
```

**Step 3**: Add Knowledge Loading Triggers:

```markdown
**IF** any of these scenarios are detected:

- Container deployment and management
- Docker configuration and optimization
- Multi-stage build setup
- Container orchestration tasks

**THEN** AUTOMATICALLY load:

- **Path (Roo)**: [`docs/llm/tools/docker-guide.md`](../../docs/llm/tools/docker-guide.md)
- **Path (Direct)**: [`docs/llm/tools/docker-guide.md`](../tools/docker-guide.md)
```

**Step 4**: Update Trigger Keywords:

```markdown
**Container & Deployment**: `docker`, `container`, `dockerfile`, `compose`, `image`, `build`, `deploy`, `containerization`, `orchestration`, `kubernetes`
```

**Step 5**: Remove from Future Knowledge Areas:

~~- Container deployment and Docker optimization~~

---

## Common Mistakes to Avoid

### ❌ Path Errors

```markdown
<!-- WRONG - Incorrect relative paths -->

- **Path (Roo)**: [`docs/llm/tools/guide.md`](../tools/guide.md)
- **Path (Direct)**: [`docs/llm/tools/guide.md`](../../docs/llm/tools/guide.md)
```

```markdown
<!-- CORRECT - Proper dual-path format -->

- **Path (Roo)**: [`docs/llm/tools/guide.md`](../../docs/llm/tools/guide.md)
- **Path (Direct)**: [`docs/llm/tools/guide.md`](../tools/guide.md)
```

### ❌ Missing Dual Paths

```markdown
<!-- WRONG - Only one path format -->

- **Path**: [`docs/llm/tools/guide.md`](../tools/guide.md)
```

```markdown
<!-- CORRECT - Both path formats -->

- **Path (Roo)**: [`docs/llm/tools/guide.md`](../../docs/llm/tools/guide.md)
- **Path (Direct)**: [`docs/llm/tools/guide.md`](../tools/guide.md)
```

### ❌ Inconsistent Formatting

```markdown
<!-- WRONG - Inconsistent metadata format -->

- Path: docs/llm/tools/guide.md
- Triggers: keyword1, keyword2
- Content: Description
```

```markdown
<!-- CORRECT - Consistent metadata format -->

- **Path (Roo)**: [`docs/llm/tools/guide.md`](../../docs/llm/tools/guide.md)
- **Path (Direct)**: [`docs/llm/tools/guide.md`](../tools/guide.md)
- **Triggers**: keyword1, keyword2, keyword3
- **Content**: Complete description
```

---

## Maintenance After Registration

### Weekly Checks

- Verify all paths still work correctly
- Check if trigger keywords need updates
- Validate guide content remains current

### Monthly Reviews

- Update project compatibility if needed
- Review and update trigger keywords based on usage
- Check for new subtasks that could be extracted

### Per Release

- Validate all commands/code still work
- Update "Last Updated" dates
- Review integration with other guides

---

**CRITICAL REMINDER**: Proper registration ensures the LLM knowledge system can automatically discover and load your guide when needed. Follow this process exactly to maintain system integrity.

**Last Updated**: February 7, 2025  
**Version**: 1.0  
**Integration**: extra-guide.md system
