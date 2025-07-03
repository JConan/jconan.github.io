# LLM Extra Knowledge Loading Guide

<!-- CONDENSATION_SAFE_START -->

## CRITICAL: Dynamic Context Loading Rules

**RULE**: When encountering specific technical tasks, AUTOMATICALLY check this guide for relevant specialized knowledge and load it ONCE per session.

**Condensation Resilience**: This guide survives context condensation through marked sections and project-aware loading.

<!-- CONDENSATION_SAFE_END -->

### Project Detection & Adaptive Loading

**AUTOMATIC PROJECT DETECTION**: Before loading specialized knowledge, detect project type:

```
1. Scan for project indicators:
   - SvelteKit: svelte.config.js, src/routes/, +page.svelte files
   - React: package.json with "react" dependency, src/components/
   - Next.js: next.config.js, pages/ or app/ directory
   - Vue: vue.config.js, src/views/, .vue files
   - Generic: Fallback when no specific patterns found

2. Load project-compatible knowledge sections
3. Apply project-specific guidance from loaded guides
```

### Knowledge Loading Triggers

**IF** any of these scenarios are detected:

- Image processing, conversion, or generation tasks
- SVG manipulation or raster conversion
- ImageMagick operations
- Favicon generation
- Transparency handling in graphics

**THEN** AUTOMATICALLY load:

- **Path (Roo)**: [`docs/llm/tools/imagemagick-guide.md`](../../docs/llm/tools/imagemagick-guide.md)
- **Path (Direct)**: [`docs/llm/tools/imagemagick-guide.md`](../tools/imagemagick-guide.md)

**IF** any of these scenarios are detected:

- Package management commands (npm, pnpm, yarn)
- Dependency installation or updates
- Lock file management
- Script execution or optimization
- Node.js project setup

**THEN** AUTOMATICALLY load:

- **Path (Roo)**: [`docs/llm/tools/package-management-corrections-guide.md`](../../docs/llm/tools/package-management-corrections-guide.md)
- **Path (Direct)**: [`docs/llm/tools/package-management-corrections-guide.md`](../tools/package-management-corrections-guide.md)

**IF** any of these scenarios are detected:

- Svelte 5 component creation or modification
- Event handling syntax issues
- Reactivity patterns (stores vs runes)
- Component composition patterns
- Style block configuration

**THEN** AUTOMATICALLY load:

- **Path (Roo)**: [`docs/llm/frameworks/svelte5-corrections-guide.md`](../../docs/llm/frameworks/svelte5-corrections-guide.md)
- **Path (Direct)**: [`docs/llm/frameworks/svelte5-corrections-guide.md`](../frameworks/svelte5-corrections-guide.md)

**IF** any of these scenarios are detected:

- HTML markup generation or review
- Semantic structure issues
- Accessibility violations or improvements
- Form creation or validation
- Navigation structure

**THEN** AUTOMATICALLY load:

- **Path (Roo)**: [`docs/llm/frameworks/modern-html-corrections-guide.md`](../../docs/llm/frameworks/modern-html-corrections-guide.md)
- **Path (Direct)**: [`docs/llm/frameworks/modern-html-corrections-guide.md`](../frameworks/modern-html-corrections-guide.md)

### Enhanced Loading Protocol (MANDATORY)

1. **Project Detection**: Identify project type from file structure
2. **Task Detection**: Identify task category from user request
3. **Guide Selection**: Reference this guide for applicable knowledge documents
4. **Conditional Load**: Read the referenced document if not already loaded in current session
5. **Project Filtering**: Extract project-relevant sections from loaded guide
6. **Subtask Extraction**: If task is complex, extract specific subtasks from guide
7. **Application**: Use the specialized knowledge to solve the task
8. **Session Tracking**: Mark knowledge as loaded to prevent duplicate loading

### Context Management Rules

**CRITICAL EFFICIENCY RULES**:

- ✅ **Load once per session**: Never reload the same guide multiple times
- ✅ **Load on demand**: Only load when task context matches triggers
- ✅ **Project-aware loading**: Filter content by detected project type
- ✅ **Subtask extraction**: Extract only relevant sections for complex tasks
- ✅ **Reference first**: Always check this index before loading
- ❌ **Never bulk load**: Don't load all guides preemptively
- ❌ **Never duplicate**: Don't load if already in context
- ❌ **Never ignore project context**: Always consider project compatibility

### Condensation Resilience Features

**SURVIVAL MECHANISMS**:

- **Critical markers**: `<!-- CONDENSATION_SAFE_START -->` sections always preserved
- **Quick reference**: Essential commands marked for preservation
- **Subtask boundaries**: Clear extraction markers for partial loading
- **Project metadata**: Compatibility info survives condensation

### Available Knowledge Documents

#### Image Processing & Graphics

- **Path (Roo)**: [`docs/llm/tools/imagemagick-guide.md`](../../docs/llm/tools/imagemagick-guide.md)
- **Path (Direct)**: [`docs/llm/tools/imagemagick-guide.md`](../tools/imagemagick-guide.md)
- **Triggers**: ImageMagick, SVG conversion, transparency, favicon generation, image optimization
- **Content**: Proven solutions for SVG-to-raster conversion with transparency
- **Project Types**: SvelteKit, React, Next.js, Vue, Generic
- **Subtasks**: `svg_to_png_conversion`, `favicon_generation_multi_size`, `verify_transparency_properties`
- **Condensation Safe**: YES
- **Last Updated**: February 7, 2025

#### Package Management & Development Tools

- **Path (Roo)**: [`docs/llm/tools/package-management-corrections-guide.md`](../../docs/llm/tools/package-management-corrections-guide.md)
- **Path (Direct)**: [`docs/llm/tools/package-management-corrections-guide.md`](../tools/package-management-corrections-guide.md)
- **Triggers**: npm, pnpm, yarn, package, install, dependency, node_modules, package.json, lock file
- **Content**: Corrections for package manager choice, dependency management, modern practices
- **Project Types**: Node.js, SvelteKit, React, Vue, Next.js, Generic JavaScript
- **Subtasks**: `package_manager_correction`, `dependency_installation`, `lock_file_management`, `script_optimization`
- **Condensation Safe**: YES
- **Last Updated**: March 7, 2025

#### Frontend Framework Corrections

##### Svelte 5 Corrections

- **Path (Roo)**: [`docs/llm/frameworks/svelte5-corrections-guide.md`](../../docs/llm/frameworks/svelte5-corrections-guide.md)
- **Path (Direct)**: [`docs/llm/frameworks/svelte5-corrections-guide.md`](../frameworks/svelte5-corrections-guide.md)
- **Triggers**: svelte, svelte5, on:click, slot, store, runes, $state, $derived, $props
- **Content**: Critical corrections for Svelte 5 syntax migration and modern patterns
- **Project Types**: SvelteKit, Svelte 5 projects
- **Subtasks**: `event_syntax_correction`, `children_pattern_correction`, `reactivity_migration`, `style_block_correction`
- **Condensation Safe**: YES
- **Last Updated**: March 7, 2025

##### Modern HTML Corrections

- **Path (Roo)**: [`docs/llm/frameworks/modern-html-corrections-guide.md`](../../docs/llm/frameworks/modern-html-corrections-guide.md)
- **Path (Direct)**: [`docs/llm/frameworks/modern-html-corrections-guide.md`](../frameworks/modern-html-corrections-guide.md)
- **Triggers**: html, semantic, accessibility, div, aria, form, validation, a11y, wcag, dialog, modal, toast, notification
- **Content**: Corrections for semantic HTML, accessibility violations, modern patterns, native dialog elements
- **Project Types**: SvelteKit, React, Vue, Next.js, Generic HTML
- **Subtasks**: `semantic_structure_correction`, `form_validation_correction`, `accessibility_enhancement`, `dialog_element_correction`, `navigation_correction`
- **Condensation Safe**: YES
- **Last Updated**: March 7, 2025

#### Meta Documentation & Standards

**Domain**: LLM knowledge management and documentation standards
**Workflow**: Writing Standards → Template Usage → System Registration

##### 1. Writing Standards & Guidelines

- **Path (Roo)**: [`docs/llm/_meta/writing-guide.md`](../../docs/llm/_meta/writing-guide.md)
- **Path (Direct)**: [`docs/llm/_meta/writing-guide.md`](writing-guide.md)
- **Purpose**: Standards for creating condensation-resilient LLM knowledge documents
- **Triggers**: documentation, guide creation, knowledge management, LLM standards
- **Subtasks**: `create_new_guide`, `enhance_existing_guide`, `validate_condensation_safety`

##### 2. Guide Template

- **Path (Roo)**: [`docs/llm/_meta/template.md`](../../docs/llm/_meta/template.md)
- **Path (Direct)**: [`docs/llm/_meta/template.md`](template.md)
- **Purpose**: Copy-paste template for creating new LLM knowledge guides
- **Triggers**: template, new guide, documentation template
- **Subtasks**: N/A (Template only)

##### 3. Registration Process

- **Path (Roo)**: [`docs/llm/_meta/guide-registration.md`](../../docs/llm/_meta/guide-registration.md)
- **Path (Direct)**: [`docs/llm/_meta/guide-registration.md`](guide-registration.md)
- **Purpose**: Step-by-step process for registering new guides in the extra-guide.md system
- **Triggers**: registration, register guide, add guide, new guide registration, guide system
- **Subtasks**: `determine_category`, `add_to_knowledge_docs`, `update_triggers`, `test_registration`

**Shared Metadata**:

- **Project Types**: Universal (all guides apply to any project type)
- **Condensation Safe**: YES (all guides use preservation markers)
- **Last Updated**: February 7, 2025

#### Future Knowledge Areas

_This section will expand as new specialized guides are created_

**Planned Additions**:

- Database operations and migrations
- API integration patterns
- Performance optimization techniques
- Security implementation guides
- Testing strategy patterns
- SvelteKit-specific development patterns
- React optimization techniques

### Enhanced Implementation for LLMs

When starting a new task:

1. **Project Detection**: Analyze file structure to determine project type
2. **Task Analysis**: Scan task description for trigger keywords
3. **Guide Matching**: Check this guide for matching knowledge documents
4. **Conditional Loading**: Load relevant guides using `read_file` tool (if not already loaded)
5. **Project Filtering**: Extract project-compatible sections from loaded guides
6. **Subtask Extraction**: For complex tasks, extract specific subtasks using boundary markers
7. **Application**: Apply specialized knowledge with project-specific adaptations
8. **Documentation**: Update this guide if new knowledge documents are created

### Subtask Extraction Rules

**WHEN** a task is complex or multi-step:

1. **Identify subtasks** from loaded guide using `<!-- SUBTASK_START: identifier -->` markers
2. **Extract boundaries** between `SUBTASK_START` and `SUBTASK_END` markers
3. **Load minimal context** - only the specific subtask needed
4. **Preserve dependencies** - include prerequisite subtasks if referenced
5. **Maintain verification** - always include verification steps from subtasks

**EXAMPLE**: For "Generate favicon and optimize images":

- Extract: `favicon_generation_multi_size` subtask
- Extract: `svg_to_png_conversion` subtask
- Include: `verify_transparency_properties` for validation

### Trigger Keywords Reference

**Image Processing**: `image`, `svg`, `png`, `ico`, `favicon`, `convert`, `magick`, `transparency`, `background`, `raster`, `graphics`, `optimization`, `compression`

**Package Management**: `npm`, `pnpm`, `yarn`, `package`, `install`, `dependency`, `node_modules`, `package.json`, `lock file`, `script`, `build`, `dev`

**Svelte 5 Corrections**: `svelte`, `svelte5`, `on:click`, `slot`, `store`, `runes`, `$state`, `$derived`, `$props`, `children`, `event handling`, `reactivity`

**HTML Corrections**: `html`, `semantic`, `accessibility`, `div`, `aria`, `form`, `validation`, `a11y`, `wcag`, `dialog`, `modal`, `toast`, `notification`, `button`, `nav`, `header`, `main`, `section`, `article`

**Documentation & Standards**: `documentation`, `guide`, `template`, `standards`, `knowledge management`, `LLM`, `condensation`, `registration`, `register guide`, `add guide`, `new guide registration`, `guide system`

**Database**: `database`, `migration`, `sql`, `query`, `schema`, `orm`, `prisma`, `drizzle`

**API**: `api`, `endpoint`, `rest`, `graphql`, `integration`, `webhook`, `fetch`, `axios`

**Performance**: `performance`, `optimization`, `speed`, `memory`, `cache`, `bundling`, `lazy loading`

**Security**: `security`, `auth`, `encryption`, `validation`, `sanitization`, `CSRF`, `XSS`

**Testing**: `test`, `spec`, `mock`, `coverage`, `e2e`, `unit`, `playwright`, `vitest`, `jest`

**SvelteKit Specific**: `sveltekit`, `svelte`, `+page`, `+layout`, `$app`, `$lib`, `paraglide`, `runes`

**React Specific**: `react`, `jsx`, `tsx`, `hooks`, `context`, `redux`, `next.js`

### Advanced Session Tracking

**LLMs should mentally track loaded knowledge with enhanced metadata**:

- "ImageMagick guide: ✅ Loaded (SvelteKit project, subtasks: favicon_generation)"
- "Documentation guide: ✅ Loaded (Universal, full guide)"
- "Database guide: ❌ Not loaded"
- "API guide: ❌ Not loaded"

**Session State Example**:

```
Project Type: SvelteKit
Loaded Guides: imagemagick-tool-guide.md
Active Subtasks: favicon_generation_multi_size
Context Efficiency: 85% (condensation-safe sections loaded)
```

### Enhanced Example Usage Flows

#### Simple Task Flow

```
User: "Generate favicon from SVG"
↓
LLM detects: SvelteKit project (svelte.config.js found)
↓
LLM detects: image processing + favicon keywords
↓
LLM checks: .roo/rules-code/extra-guide.md
↓
LLM finds: docs/llm/tools/imagemagick-guide.md
↓
LLM loads: Specialized ImageMagick knowledge (once)
↓
LLM extracts: SvelteKit-compatible sections + favicon_generation subtask
↓
LLM applies: Proven transparency solution with SvelteKit integration
↓
Task completed efficiently with project-aware expert knowledge
```

#### Complex Multi-Step Flow

```
User: "Set up image processing pipeline with optimization"
↓
LLM detects: React project (package.json with react dependency)
↓
LLM detects: image processing + optimization + pipeline keywords
↓
LLM checks: .roo/rules-code/extra-guide.md
↓
LLM finds: docs/llm/tools/imagemagick-guide.md
↓
LLM loads: ImageMagick guide (once)
↓
LLM extracts: Multiple subtasks (svg_to_png_conversion, optimization_pipeline)
↓
LLM applies: React-specific implementation with extracted subtasks
↓
LLM verifies: Each subtask completion before proceeding
↓
Complex task completed with minimal context usage
```

#### Condensation Recovery Flow

```
Context condensed, user asks: "Fix the transparency issue"
↓
LLM detects: Condensation occurred, limited context
↓
LLM finds: CONDENSATION_SAFE markers in memory
↓
LLM recovers: Essential ImageMagick transparency commands
↓
LLM applies: Critical preserve commands without full reload
↓
Issue resolved with condensation-resilient knowledge
```

### Git Submodule Preparation

**FUTURE SCALING**: This system is designed for git submodule architecture:

```
Current: /docs/llm/ (local knowledge)
Future:  /knowledge-modules/llm-guides/ (shared submodule)
         /knowledge-modules/project-patterns/ (project-specific submodule)
         /knowledge-modules/domain-expertise/ (domain-specific submodule)
```

**Migration Path**:

1. **Phase 1**: Local docs/llm/ with enhanced structure (CURRENT)
2. **Phase 2**: Extract to separate repository with same structure
3. **Phase 3**: Add as git submodule to multiple projects
4. **Phase 4**: Cross-project knowledge sharing and updates

---

**CRITICAL REMINDER**: This enhanced system prevents context saturation while providing project-aware, condensation-resilient specialized knowledge. Always reference this guide before loading additional documentation.

**Last Updated**: February 7, 2025
**Version**: 2.0 (Enhanced with project detection, condensation resilience, subtask extraction)
**Auto-Trigger**: ON
