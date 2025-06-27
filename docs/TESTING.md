# Comprehensive Testing Guide

## Overview

This project implements a comprehensive 4-layer testing strategy designed to ensure reliability, performance, and maintainability of the Johan Chan portfolio website. Each testing layer serves a specific purpose and works together to provide complete coverage.

## Testing Architecture

### 4-Layer Testing Approach

```
┌─────────────────────────────────────────────────────────────────┐
│                    Performance Tests (Layer 4)                  │
│                     Load & Stress Testing                       │
├─────────────────────────────────────────────────────────────────┤
│                  End-to-End Tests (Layer 3)                    │
│                   Full User Workflows                          │
├─────────────────────────────────────────────────────────────────┤
│                 Integration Tests (Layer 2)                    │
│              Component & Service Integration                    │
├─────────────────────────────────────────────────────────────────┤
│                   Unit Tests (Layer 1)                        │
│                Individual Function Testing                     │
└─────────────────────────────────────────────────────────────────┘
```

### Layer 1: Unit Tests

- **Framework**: Vitest
- **Purpose**: Test individual functions, utilities, and components in isolation
- **Location**: `tests/unit/`
- **Coverage Target**: 80%+ for functions, lines, branches, statements

### Layer 2: Integration Tests

- **Framework**: Vitest with custom setup
- **Purpose**: Test component interactions, API endpoints, and service integrations
- **Location**: `tests/integration/`
- **Dependencies**: Mailpit for email testing

### Layer 3: End-to-End Tests

- **Framework**: Playwright
- **Purpose**: Test complete user workflows across multiple browsers
- **Location**: `tests/e2e/`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

### Layer 4: Performance Tests

- **Framework**: k6
- **Purpose**: Load testing, stress testing, and performance validation
- **Location**: `tests/performance/`
- **Metrics**: Response time, throughput, error rates

## Quick Start

### Prerequisites

1. **Node.js**: Version 18+ with pnpm package manager
2. **Docker**: For Mailpit email testing service
3. **Browsers**: Automatically installed by Playwright

### Installation

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install

# Install k6 (macOS)
brew install k6

# Install k6 (Linux)
sudo apt-get install k6

# Install k6 (Windows)
winget install k6
```

### Running Tests

#### All Tests (Recommended for CI/CD)

```bash
# Run complete test suite
pnpm test:all

# Run with coverage and reports
pnpm test:ci
```

#### Individual Test Layers

```bash
# Unit tests only
pnpm test:unit

# Unit tests with coverage
pnpm test:unit:coverage

# Unit tests with UI
pnpm test:unit:ui

# Integration tests
pnpm test:integration

# E2E tests (all browsers)
pnpm test:e2e

# E2E tests (specific browser)
pnpm test:e2e:chromium
pnpm test:e2e:firefox
pnpm test:e2e:webkit

# E2E tests (mobile devices)
pnpm test:e2e:mobile

# E2E tests with UI
pnpm test:e2e:ui

# Performance tests
pnpm test:performance
```

## Development Workflow

### 1. Test-Driven Development (TDD)

```bash
# Start unit test watcher
pnpm test:unit --watch

# Start development server
pnpm dev

# Write failing test → Implement feature → Make test pass
```

### 2. Feature Development Workflow

1. **Write Unit Tests**: Start with isolated function tests
2. **Implement Feature**: Build the functionality
3. **Integration Tests**: Test component interactions
4. **E2E Tests**: Validate user workflows
5. **Performance Tests**: Ensure acceptable performance

### 3. Pre-Commit Validation

```bash
# Run essential tests before commit
./scripts/pre-commit-tests.sh

# Manual validation
pnpm lint && pnpm test:unit && pnpm test:integration
```

## Testing Each Layer

### Unit Tests (`tests/unit/`)

**Purpose**: Test individual functions and utilities in isolation

**Example Structure**:

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail } from '$lib/utils/contact-form-validation';

describe('Email Validation', () => {
	it('should validate correct email format', () => {
		expect(validateEmail('test@example.com')).toBe(true);
	});

	it('should reject invalid email format', () => {
		expect(validateEmail('invalid-email')).toBe(false);
	});
});
```

**Coverage Requirements**:

- Functions: 80%+
- Lines: 80%+
- Branches: 80%+
- Statements: 80%+

### Integration Tests (`tests/integration/`)

**Purpose**: Test component interactions and service integrations

**Dependencies**:

- Mailpit service for email testing
- Test database/fixtures

**Example Structure**:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { startMailpit, clearEmails } from '../utils/email-helpers';

describe('Contact Form Integration', () => {
	beforeAll(async () => {
		await startMailpit();
	});

	it('should send email when form is submitted', async () => {
		// Test implementation
	});
});
```

### End-to-End Tests (`tests/e2e/`)

**Purpose**: Test complete user workflows

**Browser Coverage**:

- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)

**Example Structure**:

```typescript
import { test, expect } from '@playwright/test';

test('contact form submission workflow', async ({ page }) => {
	await page.goto('/contact');

	await page.fill('[name="name"]', 'Test User');
	await page.fill('[name="email"]', 'test@example.com');
	await page.fill('[name="message"]', 'Test message');

	await page.click('button[type="submit"]');

	await expect(page.locator('.success-message')).toBeVisible();
});
```

### Performance Tests (`tests/performance/`)

**Purpose**: Validate application performance under load

**Metrics Monitored**:

- Response time (p95 < 500ms)
- Throughput (requests/second)
- Error rate (< 1%)
- Resource utilization

**Example Structure**:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
	stages: [
		{ duration: '30s', target: 10 },
		{ duration: '1m', target: 50 },
		{ duration: '30s', target: 0 }
	]
};

export default function () {
	const response = http.get('http://localhost:5173/contact');

	check(response, {
		'status is 200': (r) => r.status === 200,
		'response time < 500ms': (r) => r.timings.duration < 500
	});

	sleep(1);
}
```

## Dependencies and Services

### Mailpit Email Testing Service

**Purpose**: Local SMTP server for testing email functionality

**Setup**:

```bash
# Start Mailpit service
pnpm mailpit:start

# Stop Mailpit service
pnpm mailpit:stop

# Restart Mailpit service
pnpm mailpit:restart
```

**Access**:

- Web UI: http://localhost:8025
- SMTP: localhost:1025

### Test Data Management

**Fixtures**: Located in `tests/fixtures/`
**Helpers**: Located in `tests/utils/`

## CI/CD Integration

### GitHub Actions Workflow

The testing infrastructure includes a comprehensive GitHub Actions workflow that:

1. **Sets up environment**: Node.js, pnpm, Docker
2. **Installs dependencies**: Including Playwright browsers
3. **Starts services**: Mailpit for email testing
4. **Runs test suites**: All layers in sequence
5. **Generates reports**: Coverage, test results, artifacts
6. **Uploads artifacts**: Test reports, screenshots, videos

### Test Reports and Artifacts

**Generated Reports**:

- Unit test coverage (HTML, JSON)
- Integration test results
- E2E test reports (HTML)
- Performance test metrics
- Screenshots and videos (on failure)

**Artifact Locations**:

- `coverage/`: Unit test coverage reports
- `playwright-report/`: E2E test reports
- `test-results/`: Test artifacts and results

## Troubleshooting

### Common Issues and Solutions

#### 1. Mailpit Connection Issues

**Error**: `Connection refused to localhost:1025`

**Solutions**:

```bash
# Check if Mailpit is running
docker ps | grep mailpit

# Restart Mailpit
pnpm mailpit:restart

# Check Docker logs
docker logs mailpit
```

#### 2. Playwright Browser Issues

**Error**: `Browser not found` or `Installation failed`

**Solutions**:

```bash
# Reinstall browsers
pnpm exec playwright install

# Install system dependencies (Linux)
pnpm exec playwright install-deps

# Clear browser cache
rm -rf ~/.cache/ms-playwright
pnpm exec playwright install
```

#### 3. Test Timeouts

**Error**: `Test timeout exceeded`

**Solutions**:

- Increase timeout in configuration
- Check system resources
- Optimize test logic
- Use proper wait conditions

#### 4. Coverage Threshold Failures

**Error**: `Coverage threshold not met`

**Solutions**:

- Add missing tests for uncovered code
- Review coverage exclusions
- Adjust thresholds if appropriate
- Remove dead code

#### 5. Port Conflicts

**Error**: `Port 5173 already in use`

**Solutions**:

```bash
# Find and kill process using port
lsof -ti:5173 | xargs kill -9

# Use different port
PORT=3000 pnpm dev
```

### Debug Mode

#### Unit Tests Debug

```bash
# Run with debug output
DEBUG=vitest pnpm test:unit

# Run specific test file
pnpm test:unit contact-form-validation.test.ts
```

#### E2E Tests Debug

```bash
# Run with debug mode
pnpm test:e2e:debug

# Run with headed browser
pnpm test:e2e:headed

# Run with UI mode
pnpm test:e2e:ui
```

#### Performance Tests Debug

```bash
# Run with verbose output
k6 run --verbose tests/performance/contact-form.js

# Run with custom options
k6 run --vus 1 --duration 30s tests/performance/contact-form.js
```

## Best Practices

### Test Organization

1. **Descriptive Names**: Use clear, descriptive test names
2. **Arrange-Act-Assert**: Structure tests with clear phases
3. **Single Responsibility**: Each test should verify one behavior
4. **Independent Tests**: Tests should not depend on each other
5. **Cleanup**: Always clean up test data and state

### Performance Considerations

1. **Parallel Execution**: Run tests in parallel when possible
2. **Resource Management**: Clean up resources after tests
3. **Mocking**: Mock external dependencies in unit tests
4. **Test Data**: Use minimal test data sets
5. **Selective Testing**: Run only relevant tests during development

### Maintenance

1. **Regular Updates**: Keep testing frameworks updated
2. **Review Coverage**: Regularly review and improve coverage
3. **Refactor Tests**: Keep tests maintainable and readable
4. **Documentation**: Document complex test scenarios
5. **Monitoring**: Monitor test execution times and reliability

## Configuration Files

### Key Configuration Files

- `vitest.config.ts`: Unit test configuration
- `vitest.integration.config.ts`: Integration test configuration
- `playwright.config.ts`: E2E test configuration
- `tests/setup/`: Test setup and utilities
- `.github/workflows/test.yml`: CI/CD workflow

### Environment Variables

```bash
# Test environment
NODE_ENV=test

# CI/CD mode
CI=true

# Custom ports
PORT=5173
MAILPIT_PORT=8025
MAILPIT_SMTP_PORT=1025

# Debug mode
DEBUG=vitest
PLAYWRIGHT_DEBUG=1
```

## Metrics and Monitoring

### Success Criteria

**Unit Tests**:

- Coverage: 80%+ across all metrics
- Execution time: < 30 seconds
- Zero flaky tests

**Integration Tests**:

- All critical workflows pass
- Email delivery validation
- API endpoint validation

**E2E Tests**:

- Cross-browser compatibility
- Mobile responsiveness
- User workflow completion

**Performance Tests**:

- Response time p95 < 500ms
- Error rate < 1%
- Throughput meets requirements

### Continuous Monitoring

1. **Test Execution Trends**: Track test duration and reliability
2. **Coverage Trends**: Monitor coverage changes over time
3. **Failure Analysis**: Investigate and resolve flaky tests
4. **Performance Baselines**: Establish and monitor performance baselines

## Resources

### Documentation Links

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [k6 Documentation](https://k6.io/docs/)
- [Testing Best Practices](./contact-form-migration/05-testing-strategy.md)

### Internal Documentation

- [Unit Testing Guide](../tests/unit/README.md)
- [E2E Testing Guide](../tests/e2e/README.md)
- [Contact Form Testing](./contact-form-migration/09-testing-setup-guide.md)

---

**Last Updated**: June 27, 2025
**Version**: 1.0
**Maintainer**: Development Team
