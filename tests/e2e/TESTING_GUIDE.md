# E2E Testing Guide

## Quick Start

### Run All E2E Tests

```bash
pnpm test:e2e
```

### Run with UI (Interactive Mode)

```bash
pnpm test:e2e:ui
```

### Run Contact Form Tests Only

```bash
pnpm test:e2e:contact
```

### Debug Mode

```bash
pnpm test:e2e:debug
```

## Test Categories

### 1. Setup Validation

```bash
# Validate test environment
npx playwright test validate-setup.test.ts
```

### 2. Contact Form Comprehensive Tests

```bash
# All contact form scenarios
npx playwright test contact-form.e2e.test.ts

# Specific test groups
npx playwright test -g "Form Rendering"
npx playwright test -g "Form Validation"
npx playwright test -g "Form Submission"
npx playwright test -g "Internationalization"
npx playwright test -g "Mobile Responsiveness"
```

### 3. Browser-Specific Testing

```bash
# Chrome only
pnpm test:e2e:chromium

# Firefox only
pnpm test:e2e:firefox

# Safari only
pnpm test:e2e:webkit

# Mobile browsers
pnpm test:e2e:mobile
```

## Advanced Usage

### Custom Test Runner

```bash
# Use the custom runner script
./tests/e2e/run-tests.sh

# Examples:
./tests/e2e/run-tests.sh validation chromium
./tests/e2e/run-tests.sh mobile mobile-chrome --debug
./tests/e2e/run-tests.sh all all --headed
```

### Environment Setup

```bash
# Start services manually
pnpm mailpit:start
pnpm dev

# Check Mailpit
curl http://localhost:8025/api/v1/info

# Check dev server
curl http://localhost:5173
```

## Debugging Failed Tests

### View Test Reports

```bash
# After test run
npx playwright show-report
```

### Debug Specific Test

```bash
# Run single test in debug mode
npx playwright test --debug -g "should successfully submit valid form"
```

### View Screenshots and Videos

- Screenshots: `test-results/`
- Videos: `test-results/`
- Traces: `test-results/`

### Common Issues

#### Mailpit Not Running

```bash
# Check if running
docker ps | grep mailpit

# Start if needed
pnpm mailpit:start

# Check logs
docker logs mailpit
```

#### Dev Server Issues

```bash
# Check if running
curl http://localhost:5173

# Start manually
pnpm dev
```

#### Network Timeouts

```bash
# Increase timeout
npx playwright test --timeout=60000
```

## Test Data

### Valid Form Data

- Name: "Jean Dupont"
- Email: "jean.dupont@example.com"
- Message: Professional inquiry in French

### Invalid Test Cases

- Empty fields
- Invalid email formats
- Overly long content
- Special characters
- HTML/script injection

### Language Testing

- French: `/contact` (default)
- English: `/en/contact`

## Performance Expectations

### Typical Execution Times

- Setup validation: ~30 seconds
- Full contact form suite: ~5-10 minutes
- Single browser: ~2-3 minutes
- Mobile tests: ~1-2 minutes

### Resource Usage

- Memory: ~500MB per browser
- CPU: Moderate during execution
- Network: Local services only

## CI/CD Integration

### GitHub Actions

Tests run automatically on:

- Pull requests to main
- Pushes to main branch
- Manual workflow dispatch

### Local CI Simulation

```bash
# Run like CI
CI=true npx playwright test --reporter=json
```

## Best Practices

### Test Isolation

- Each test starts with clean state
- Emails cleared before each test
- No shared state between tests

### Realistic Testing

- Use realistic form data
- Test actual user workflows
- Include edge cases and errors

### Maintenance

- Update test data regularly
- Review flaky tests
- Keep documentation current

## Troubleshooting

### Test Flakiness

1. Check network conditions
2. Increase timeouts if needed
3. Verify service stability
4. Review test logic

### Email Delivery Issues

1. Verify Mailpit configuration
2. Check email service logs
3. Test with curl/Postman
4. Review SMTP settings

### Browser Compatibility

1. Update browser versions
2. Check feature support
3. Test on real devices
4. Review CSS/JS compatibility

## Contributing

### Adding New Tests

1. Follow existing patterns
2. Use ContactFormHelper utilities
3. Include proper cleanup
4. Add documentation

### Updating Test Data

1. Keep realistic scenarios
2. Consider privacy implications
3. Update multiple languages
4. Test edge cases

### Performance Optimization

1. Minimize test execution time
2. Parallel execution where possible
3. Efficient selectors
4. Proper wait strategies
