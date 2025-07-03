# LLM Corrective Guidance System

Specialized knowledge system focused on correcting common LLM mistakes in development workflows. Provides targeted mistake→correction patterns with dynamic loading and project-aware context.

## Directory Structure

```
docs/llm/
├── _meta/                    # System Infrastructure
│   ├── extra-guide.md   # Core loading rules & project detection
│   ├── llm-writing-guide.md # Documentation standards
│   ├── template.md          # Guide template
│   ├── setup-llm-knowledge.sh # Project-agnostic setup script
│   └── README.md            # System documentation
├── tools/                   # Tool-Specific Guides
│   ├── imagemagick-guide.md # ImageMagick operations & SVG conversion
│   └── README.md            # Tools directory documentation
├── frameworks/              # Framework-Specific Guides
│   └── README.md            # Frameworks directory documentation
├── domains/                 # Domain-Specific Knowledge
│   └── README.md            # Domains directory documentation
└── system-test-results.md   # System validation records
```

## Quick Start

### Setup (One-time)

```bash
# Run the project-agnostic setup script
./docs/llm/_meta/setup-llm-knowledge.sh

# Verify setup with verbose output
./docs/llm/_meta/setup-llm-knowledge.sh --verbose
```

### For LLMs

The system automatically loads relevant knowledge based on:

1. **Task Context**: Keywords trigger appropriate guides
2. **Project Type**: Auto-detects SvelteKit, React, Vue, etc.
3. **File Patterns**: Analyzes project structure for compatibility
4. **Condensation Safety**: Preserves critical content through compression

## Knowledge Categories

### System Infrastructure (`_meta/`)

Core system files that manage the knowledge loading and organization:

- **Loading Rules**: Dynamic knowledge loading based on task context
- **Writing Standards**: Condensation-safe documentation patterns
- **Setup Scripts**: Project-agnostic installation and maintenance
- **Templates**: Consistent guide creation patterns

### Tool Corrections (`tools/`)

Corrective guidance for common tool-related mistakes:

- **ImageMagick**: SVG conversion errors, transparency issues, favicon generation mistakes
- **Package Management**: pnpm vs npm confusion, dependency resolution errors

### Framework Corrections (`frameworks/`)

Corrective guidance for framework-specific LLM mistakes:

- **Svelte 5**: Outdated syntax corrections, rune usage errors, slot deprecation fixes
- **Modern HTML**: Semantic element mistakes, accessibility oversights, deprecated patterns

### Domain Knowledge (`domains/`)

Cross-cutting technical domains:

- **Database**: SQL, ORMs, migrations, optimization (planned)
- **API Design**: REST, GraphQL, authentication (planned)
- **Security**: Encryption, validation, CSRF protection (planned)
- **Performance**: Optimization, caching, monitoring (planned)
- **Testing**: Strategies, automation, quality assurance (planned)

## Corrective Approach

### Mistake→Correction Pattern

```
LLM Mistake: Uses deprecated Svelte syntax like on:click
↓
System detects: svelte + event handling keywords
↓
Auto-loads: docs/llm/frameworks/svelte5-corrections-guide.md
↓
Provides: Correct onclick syntax and modern event handling
```

### Example Corrections

**Svelte 5 Mistake**:

```svelte
<!-- ❌ LLM often generates -->
<button on:click={handler}>Click me</button>
<slot name="content" />

<!-- ✅ Corrected to -->
<button onclick={handler}>Click me</button>
{@render children?.content?.()}
```

**Package Management Mistake**:

```bash
# ❌ LLM often suggests
npm install package-name

# ✅ Corrected to (for this project)
pnpm add package-name
```

### Project Awareness

- **Auto-Detection**: Identifies project type from file patterns
- **Adaptive Guidance**: Tailors solutions to detected framework
- **Cross-Platform**: Works with different package managers and tools
- **Scalable**: Ready for git submodule sharing across projects

### Condensation Resilience

- **Preservation Markers**: Critical content survives context compression
- **Quick Recovery**: Essential commands remain accessible
- **Efficient Loading**: Load-once rules prevent duplication
- **Session Tracking**: Monitors loaded knowledge to optimize context

## Integration Points

### Roo Integration

```
.roo/rules-code/
└── extra-guide.md ──────→ docs/llm/_meta/extra-guide.md
```

The setup script creates symlinks for seamless integration with Roo's rule system while maintaining centralized knowledge management.

### Project Detection

Automatically detects project types:

- **SvelteKit**: `svelte.config.js`, `src/routes/`, `+page.svelte`
- **React**: `package.json` with "react", `src/components/`
- **Next.js**: `next.config.js`, `pages/` or `app/` directory
- **Vue**: `vue.config.js`, `src/views/`, `.vue` files
- **Generic**: Fallback for unrecognized patterns

## Contributing

### Adding New Guides

1. **Choose Category**: tools/, frameworks/, or domains/
2. **Use Template**: Start with [`_meta/template.md`](_meta/template.md)
3. **Follow Standards**: Apply [`_meta/llm-writing-guide.md`](_meta/llm-writing-guide.md)
4. **Add Triggers**: Update [`_meta/extra-guide.md`](_meta/extra-guide.md)
5. **Test Integration**: Run setup script and validate loading

### Updating Existing Guides

1. **Maintain Compatibility**: Preserve existing trigger keywords
2. **Add Boundaries**: Use subtask markers for complex guides
3. **Update References**: Check cross-references and file paths
4. **Test Condensation**: Verify preservation markers work correctly

## Troubleshooting

### Setup Issues

```bash
# Check permissions
chmod +x docs/llm/_meta/setup-llm-knowledge.sh

# Verify project structure
./docs/llm/_meta/setup-llm-knowledge.sh --dry-run

# Debug with verbose output
./docs/llm/_meta/setup-llm-knowledge.sh --verbose
```

### Loading Problems

- **Missing Triggers**: Add keywords to loading rules
- **Path Issues**: Verify file paths in references
- **Context Overflow**: Use subtask extraction boundaries
- **Condensation Loss**: Add preservation markers to critical content

## Implementation Status

### Phase 1: Core Corrections (✅ Complete)

- ✅ Svelte 5 corrections guide with runes, events, slots
- ✅ Modern HTML corrections with semantic elements
- ✅ Package management corrections (pnpm focus)
- ✅ Enhanced ImageMagick guide with correction format
- ✅ Updated loading rules for correction-focused triggers

### Phase 2: Expanded Corrections (Planned)

- [ ] React hooks and modern patterns corrections
- [ ] TypeScript common mistake corrections
- [ ] CSS and styling anti-pattern corrections
- [ ] API design mistake corrections

### Phase 3: Advanced Correction Features (Planned)

- [ ] Context-aware mistake detection
- [ ] Automated correction suggestions
- [ ] Cross-framework mistake patterns
- [ ] Performance anti-pattern corrections

---

**Last Updated**: March 7, 2025
**Version**: 3.0 (Corrective Guidance Focus)
**Status**: Transformation Complete - Production Ready
