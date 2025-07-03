# LLM Writing Guide - Knowledge Documentation Standards

## CRITICAL: Condensation-Resilient Documentation

**PURPOSE**: Create LLM knowledge documents that survive context condensation and enable efficient subtask extraction.

---

## Document Structure Standards

### Header Requirements (MANDATORY)

Every LLM knowledge document MUST start with these condensation-safe markers:

```markdown
# [DOMAIN] Tool Guide - [SPECIFIC_PURPOSE]

<!-- CONDENSATION_SAFE_START -->

## Meta Information

- **Domain**: [Primary technical domain]
- **Project Types**: [Compatible project types, comma-separated]
- **Trigger Keywords**: [Keywords that should load this guide]
- **Subtasks Supported**: [List of extractable subtasks]
- **Last Updated**: [Date]
- **Condensation Safe**: YES
<!-- CONDENSATION_SAFE_END -->

## Quick Reference

[Essential commands/patterns that must survive condensation]

---
```

### Content Organization Rules

#### 1. Extraction Boundaries (CRITICAL)

Use clear markers for subtask extraction:

```markdown
<!-- SUBTASK_START: [subtask_name] -->

### [Subtask Title]

[Complete, self-contained solution]

**Prerequisites**: [Required context]
**Output**: [Expected result]
**Verification**: [How to confirm success]

<!-- SUBTASK_END: [subtask_name] -->
```

#### 2. Project Compatibility Metadata

Include project-specific guidance:

```markdown
### Project Compatibility

**SvelteKit Projects**:

- [Specific considerations]
- [Required dependencies]
- [Integration patterns]

**React Projects**:

- [Specific considerations]
- [Required dependencies]
- [Integration patterns]

**Generic Projects**:

- [Universal approaches]
- [Fallback solutions]
```

#### 3. Condensation Resilience Markers

Critical information must be marked for preservation:

````markdown
<!-- CRITICAL_PRESERVE_START -->

**Essential Command Pattern**:

```bash
[Most important command that must survive condensation]
```
````

<!-- CRITICAL_PRESERVE_END -->

````

---

## Writing Guidelines

### Language Standards

1. **Imperative Voice**: Use direct commands ("Run this", "Execute that")
2. **No Ambiguity**: Every instruction must be unambiguous
3. **Complete Context**: Each section should be self-contained
4. **Verification Steps**: Always include success verification

### Code Block Standards

```markdown
### Working Solution

```bash
# Clear comment explaining the command
command --parameter value --flag
````

### Verification

```bash
# Command to verify success
verify-command | grep "expected-output"
```

### Expected Output

```
Expected output pattern
```

````

### Error Handling Patterns

```markdown
### Common Errors

#### Error: [Specific error message]

**Cause**: [Why this happens]
**Solution**: [How to fix]
**Prevention**: [How to avoid]

```bash
# Fixed command
corrected-command --parameters
````

````

---

## Subtask Extraction Rules

### Extractable Subtask Structure

Each subtask must be complete and independent:

```markdown
<!-- SUBTASK_START: task_identifier -->
### Task: [Clear Task Name]

**Context**: [When to use this]
**Prerequisites**: [What must exist first]

#### Implementation

```language
[Complete code/commands]
````

#### Verification

```bash
[How to confirm it worked]
```

**Expected Result**: [What success looks like]

<!-- SUBTASK_END: task_identifier -->

````

### Subtask Naming Convention

- Use snake_case: `svg_to_png_conversion`
- Be specific: `favicon_generation_multi_size`
- Include action: `verify_transparency_properties`

---

## Project Detection Integration

### Project Type Markers

Include these markers for automatic project detection:

```markdown
<!-- PROJECT_DETECTION_START -->
**Detectable Patterns**:
- SvelteKit: `svelte.config.js`, `src/routes/`
- React: `package.json` with react dependency
- Next.js: `next.config.js`
- Vue: `vue.config.js`
- Generic: Fallback for unrecognized projects
<!-- PROJECT_DETECTION_END -->
````

### Adaptive Instructions

Provide project-specific variations:

````markdown
### Implementation by Project Type

#### For SvelteKit Projects

```typescript
// SvelteKit-specific approach
import { dev } from '$app/environment';
```
````

#### For React Projects

```typescript
// React-specific approach
import { useState } from 'react';
```

#### For Generic Projects

```bash
# Universal shell approach
npm install package-name
```

````

---

## Context Management

### Session Tracking Integration

Include session tracking guidance:

```markdown
### LLM Session Management

**Load Once Rule**: Mark as loaded after first read
**Context Key**: `[domain]_guide_loaded`
**Dependencies**: [Other guides this depends on]
**Conflicts**: [Guides that shouldn't be loaded simultaneously]
````

### Memory Optimization

Structure for efficient context usage:

1. **Front-load critical info**: Most important patterns first
2. **Progressive detail**: General → specific → edge cases
3. **Reference links**: Point to related sections without duplication
4. **Compression-friendly**: Use consistent terminology

---

## Quality Checklist

### Before Publishing (MANDATORY)

- [ ] Condensation-safe markers present
- [ ] All subtasks have clear boundaries
- [ ] Project compatibility documented
- [ ] Verification steps included
- [ ] Error handling covered
- [ ] Session tracking guidance added
- [ ] Quick reference section complete
- [ ] Trigger keywords listed
- [ ] No duplicate information from other guides

### Testing Requirements

1. **Isolation Test**: Each subtask works independently
2. **Project Test**: Instructions work across project types
3. **Condensation Test**: Essential info survives summarization
4. **Integration Test**: Works with extra-guide.md system

---

## Template Usage

Use [`template.md`](template.md) as starting point for new guides:

1. Copy template.md
2. Replace placeholders with actual content
3. Add domain-specific subtasks
4. Include project compatibility info
5. Test all commands/code
6. Validate against quality checklist

---

## Integration with Existing System

### Guide Registration Process

**CRITICAL**: After creating a new guide, you MUST register it in the knowledge system.

**Follow**: [`guide-registration.md`](guide-registration.md) for complete step-by-step registration process.

**Quick Summary**:

1. Determine guide category (tools/, frameworks/, domains/)
2. Add to Available Knowledge Documents with dual-path format
3. Update Knowledge Loading Triggers section
4. Add trigger keywords to reference section
5. Test registration works correctly

**Do NOT** skip the registration process - unregistered guides won't be automatically loaded by LLMs.

### Maintenance Schedule

- **Weekly**: Check for new use cases
- **Monthly**: Update project compatibility
- **Quarterly**: Review condensation resilience
- **Per Release**: Validate all commands still work

---

**CRITICAL REMINDER**: These standards ensure LLM knowledge documents remain useful across different context sizes and project types.

**Last Updated**: February 7, 2025  
**Version**: 1.0  
**Standards Compliance**: MANDATORY
