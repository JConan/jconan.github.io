# LLM Knowledge Management System - Meta Directory

This directory contains the core infrastructure for the LLM Knowledge Management System.

## Files

### Core System Files

- **[`extra-guide.md`](extra-guide.md)** - Central loading rules and project detection
- **[`llm-writing-guide.md`](llm-writing-guide.md)** - Documentation standards for LLM guides
- **[`template.md`](template.md)** - Template for creating new knowledge guides

### Setup Infrastructure

- **[`setup-llm-knowledge.sh`](setup-llm-knowledge.sh)** - Project-agnostic setup script

## Setup Script Usage

The setup script is designed to work across different project types (Node.js, Python, Go, etc.) without dependencies on specific package managers or frameworks.

### Basic Usage

```bash
# Quick setup
./docs/llm/_meta/setup-llm-knowledge.sh

# See what would be done (dry run)
./docs/llm/_meta/setup-llm-knowledge.sh --dry-run

# Verbose output with system status
./docs/llm/_meta/setup-llm-knowledge.sh --verbose

# Help
./docs/llm/_meta/setup-llm-knowledge.sh --help
```

### What It Does

1. **Validates Environment**: Basic directory and permission checks
2. **Creates Directories**: Sets up required directory structure
3. **Manages Symlinks**: Maintains links between centralized docs and project integration
4. **Verifies Setup**: Tests functionality and reports status

### Project Integration

The script creates symlinks to integrate the knowledge system with project-specific tools:

```
docs/llm/_meta/               # Centralized knowledge (MASTER)
├── extra-guide.md       # Core loading rules
├── llm-writing-guide.md     # Documentation standards
├── template.md              # Guide template
└── setup-llm-knowledge.sh   # This setup script

.roo/rules-code/              # Project integration (if using Roo)
└── extra-guide.md ──────→ ../../docs/llm/_meta/extra-guide.md
```

### Cross-Project Compatibility

The system is designed to work with:

- **SvelteKit** projects (current implementation)
- **React/Next.js** projects
- **Vue/Nuxt** projects
- **Python** projects
- **Go** projects
- **Any project** with a docs/ directory structure

### Future Scaling

This architecture prepares for git submodule sharing:

1. **Current**: Local `docs/llm/` directory
2. **Future**: Shared git submodule across multiple projects
3. **Benefits**: Centralized knowledge updates, consistent LLM guidance

## System Features

### Dynamic Loading

- Loads specialized knowledge only when needed
- Prevents context saturation
- Project-aware guidance adaptation

### Condensation Resilience

- Survives Roo's context compression
- Critical content preservation markers
- Quick recovery mechanisms

### Intelligent Organization

- Semantic search integration ready
- Subtask extraction boundaries
- Cross-reference linking

## Contributing

When adding new knowledge guides:

1. Use the [`template.md`](template.md) as starting point
2. Follow [`llm-writing-guide.md`](llm-writing-guide.md) standards
3. Add trigger keywords to [`extra-guide.md`](extra-guide.md)
4. Test with the setup script
5. Update this README if needed

## Troubleshooting

### Permission Issues

```bash
chmod +x docs/llm/_meta/setup-llm-knowledge.sh
```

### Symlink Problems

- Run setup script with `--verbose` to diagnose
- Check file conflicts at symlink locations
- Verify target files exist

### Cross-Platform Notes

- Works on macOS, Linux, and Windows (Git Bash)
- Uses relative paths for portability
- Handles different shell environments

---

**Last Updated**: February 7, 2025  
**Version**: 1.0 (Project-agnostic architecture)
