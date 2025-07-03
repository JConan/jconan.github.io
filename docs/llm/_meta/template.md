# [DOMAIN] Tool Guide - [SPECIFIC_PURPOSE]

<!-- CONDENSATION_SAFE_START -->

## Meta Information

- **Domain**: [e.g., Database, API, Performance, Security]
- **Project Types**: [e.g., SvelteKit, React, Next.js, Vue, Generic]
- **Trigger Keywords**: [comma, separated, keywords, that, trigger, loading]
- **Subtasks Supported**: [list_of_extractable_subtasks]
- **Last Updated**: [YYYY-MM-DD]
- **Condensation Safe**: YES
<!-- CONDENSATION_SAFE_END -->

## Quick Reference

<!-- CRITICAL_PRESERVE_START -->

**Essential Command Pattern**:

```bash
[most-important-command --key-parameters]
```

**Key Success Indicators**:

- [What indicates success]
- [How to verify it worked]
<!-- CRITICAL_PRESERVE_END -->

---

## Overview

Brief description of what this guide covers and when to use it.

---

<!-- SUBTASK_START: main_task_identifier -->

## Main Task: [Primary Use Case]

### Problem

[Describe the specific problem this solves]

### Context

- **Input**: [What you start with]
- **Expected**: [What you want to achieve]
- **Common Issue**: [What typically goes wrong]

### Working Solution

```bash
# Clear explanation of what this does
command --parameter value \
  --another-param \
  --flag
```

### Key Parameters

- `--parameter`: [What this does and why it's important]
- `--another-param`: [Explanation]
- `--flag`: [When to use this]

### Verification

```bash
# Command to verify success
verify-command | grep "expected-pattern"

# Expected indicators of success:
# [What you should see]
# [Other success markers]
```

### Project-Specific Considerations

#### For SvelteKit Projects

```typescript
// SvelteKit-specific implementation
import { [relevant] } from '$lib/[module]';
```

#### For React Projects

```typescript
// React-specific implementation
import { [relevant] } from 'react';
```

#### For Generic Projects

```bash
# Universal approach
npm install [package-name]
```

### Failed Approaches

```bash
# ❌ These don't work reliably:
wrong-command --bad-param    # [Why this fails]
another-bad-approach         # [What goes wrong]
```

<!-- SUBTASK_END: main_task_identifier -->

---

<!-- SUBTASK_START: secondary_task_identifier -->

## Secondary Task: [Another Common Use Case]

### Problem

[Different problem this guide addresses]

### Working Solution

```bash
[command-for-secondary-task]
```

### Verification

```bash
[how-to-verify-secondary-task]
```

<!-- SUBTASK_END: secondary_task_identifier -->

---

## Common Errors

### Error: [Specific error message]

**Cause**: [Why this happens]
**Solution**: [How to fix it]
**Prevention**: [How to avoid it in future]

```bash
# Fixed command
corrected-command --proper-parameters
```

### Error: [Another common error]

**Cause**: [Root cause]
**Solution**: [Fix]

```bash
# Alternative approach
alternative-command
```

---

## Project Compatibility

<!-- PROJECT_DETECTION_START -->

**Detectable Patterns**:

- SvelteKit: `svelte.config.js`, `src/routes/`
- React: `package.json` with react dependency
- Next.js: `next.config.js`
- Vue: `vue.config.js`
- Generic: Fallback for unrecognized projects
<!-- PROJECT_DETECTION_END -->

### SvelteKit Integration

[Specific guidance for SvelteKit projects]

### React Integration

[Specific guidance for React projects]

### Generic Integration

[Universal approaches that work anywhere]

---

## Advanced Usage

### [Advanced Topic 1]

[More complex scenarios and solutions]

### [Advanced Topic 2]

[Edge cases and special situations]

---

## Usage Notes for LLMs

### Session Management

**Load Once Rule**: Mark as loaded after first read
**Context Key**: `[domain]_guide_loaded`
**Dependencies**: [Other guides this depends on]
**Conflicts**: [Guides that shouldn't be loaded simultaneously]

### When to Use This Guide

1. **Primary trigger**: [Main scenario]
2. **Secondary triggers**: [Other situations]
3. **Integration**: [How this works with other tools]

### Best Practices

1. **Always verify**: Use verification commands after implementation
2. **Project-aware**: Choose appropriate approach for project type
3. **Document new patterns**: Add successful solutions back to this guide
4. **Reference**: Link to this guide in future similar tasks

---

## Future Enhancements

_This section will be expanded as new scenarios are encountered._

### Planned Additions

- [Feature 1]
- [Feature 2]
- [Integration with other tools]

---

**Last Updated**: [YYYY-MM-DD]  
**Next Review**: [When to review this guide]  
**Maintenance**: [Who maintains this guide]
