# End-to-End (E2E) Tests

This directory contains comprehensive E2E tests for the contact form using Playwright. These tests verify the complete user journey from the browser perspective.

## Test Structure

### Main Test File

- [`contact-form.e2e.test.ts`](./contact-form.e2e.test.ts) - Comprehensive contact form E2E tests
- [`test.ts`](./test.ts) - Basic smoke tests and test imports

### Test Categories

#### 1. Form Rendering and Accessibility

- ✅ Form elements visibility and structure
- ✅ Proper accessibility attributes (ARIA, roles)
- ✅ Required field validation
- ✅ Semantic HTML structure

#### 2. Form Validation

- ✅ Client-side validation (required fields, email format)
- ✅ Server-side validation error handling
- ✅ Validation error display and messaging
- ✅ Form data persistence after validation errors

#### 3. Form Submission Flow

- ✅ Successful form submission with email verification
- ✅ Loading states and user feedback
- ✅ Error handling and recovery
- ✅ Email delivery verification via Mailpit

#### 4. Internationalization (i18n)

- ✅ French content display (default)
- ✅ English content display (/en/ routes)
- ✅ Language-specific form submission
- ✅ Localized validation messages

#### 5. Cross-Browser Compatibility

- ✅ Chromium/Chrome support
- ✅ Firefox support
- ✅ WebKit/Safari support
- ✅ Consistent behavior across browsers

#### 6. Mobile Responsiveness

- ✅ Mobile viewport compatibility
- ✅ Touch target accessibility
- ✅ Form usability on small screens
- ✅ Responsive layout validation

#### 7. Performance and Loading States

- ✅ Loading state visualization
- ✅ Button disable during submission
- ✅ Network failure handling
- ✅ Slow network condition testing

#### 8. User Experience Scenarios

- ✅ Multiple rapid submission prevention
- ✅ Form resubmission after success
- ✅ Form abandonment and return
- ✅ Special character handling
- ✅ Long input value handling

#### 9. Security and Edge Cases

- ✅ HTML input sanitization
- ✅ XSS prevention testing
- ✅ Network failure graceful handling
- ✅ Input length validation

## Test Data

### Valid Test Data

```typescript
const validFormData = {
	name: 'Jean Dupont',
	email: 'jean.dupont@example.com',
	message: 'Bonjour, je souhaite développer une application web...'
};
```

### Invalid Test Data

- Empty required fields
- Invalid email formats
- Overly long input values
- HTML/script injection attempts

### Language-Specific Data

- French labels and messages
- English labels and messages
- Localized validation feedback

## Dependencies

### Test Utilities

- [`ContactFormHelper`](../utils/contact-form-helper.ts) - Form interaction utilities
- [`MailpitHelper`](../utils/email-helpers.ts) - Email verification utilities

### External Services

- **Mailpit** (localhost:8025) - Email testing service
- **Dev Server** (localhost:5173) - SvelteKit development server

## Running Tests

### All E2E Tests

```bash
pnpm test:e2e
```

### Specific Browser

```bash
pnpm test:e2e --project=chromium
pnpm test:e2e --project=firefox
pnpm test:e2e --project=webkit
```

### Mobile Tests

```bash
pnpm test:e2e --project="Mobile Chrome"
pnpm test:e2e --project="Mobile Safari"
```

### Debug Mode

```bash
pnpm test:e2e --debug
```

### Headed Mode (See Browser)

```bash
pnpm test:e2e --headed
```

## Test Environment Setup

### Prerequisites

1. **Mailpit Container**: Must be running on localhost:8025
2. **Dev Server**: Must be running on localhost:5173
3. **Environment Variables**: Proper email configuration

### Automatic Setup

The Playwright configuration automatically starts:

- SvelteKit dev server
- Mailpit container

### Manual Setup

```bash
# Start Mailpit
pnpm mailpit:start

# Start dev server
pnpm dev

# Run tests
pnpm test:e2e
```

## Test Reports

### HTML Report

```bash
pnpm test:e2e
npx playwright show-report
```

### JSON Report

Available at: `test-results/results.json`

### JUnit Report

Available at: `test-results/results.xml`

## Debugging Failed Tests

### Screenshots

- Automatic screenshots on failure
- Available in `test-results/`

### Videos

- Automatic video recording on failure
- Available in `test-results/`

### Traces

- Detailed execution traces on retry
- View with: `npx playwright show-trace trace.zip`

### Debug Mode

```bash
# Run single test in debug mode
pnpm test:e2e --debug -g "should successfully submit valid form"

# Run with browser visible
pnpm test:e2e --headed --timeout=0 -g "form validation"
```

## Common Issues and Solutions

### Email Not Received

1. Check Mailpit is running: `http://localhost:8025`
2. Verify email configuration in environment
3. Check server logs for email sending errors

### Form Submission Timeout

1. Increase timeout in test configuration
2. Check network conditions
3. Verify server response times

### Cross-Browser Failures

1. Check browser-specific CSS/JS issues
2. Verify feature support across browsers
3. Update browser versions if needed

### Mobile Test Failures

1. Verify touch target sizes
2. Check responsive CSS breakpoints
3. Test actual mobile devices if needed

## Continuous Integration

### GitHub Actions

Tests run automatically on:

- Pull requests
- Pushes to main branch
- Scheduled runs (daily)

### Test Parallelization

- CI runs tests in parallel across browsers
- Local development uses single worker by default
- Configurable via `playwright.config.ts`

## Performance Considerations

### Test Execution Time

- Full suite: ~5-10 minutes
- Single browser: ~2-3 minutes
- Critical path tests: ~1 minute

### Resource Usage

- Memory: ~500MB per browser instance
- CPU: Moderate during test execution
- Network: Local services only

## Future Enhancements

### Planned Additions

- [ ] Visual regression testing
- [ ] Accessibility audit integration
- [ ] Performance metrics collection
- [ ] API response mocking scenarios

### Monitoring

- [ ] Test execution metrics
- [ ] Flaky test detection
- [ ] Performance trend analysis

## Contributing

### Adding New Tests

1. Follow existing test structure
2. Use descriptive test names
3. Include proper cleanup
4. Add documentation comments

### Test Data Management

- Use realistic test data
- Avoid hardcoded values where possible
- Consider data privacy implications
- Clean up test data after execution

### Best Practices

- Keep tests independent
- Use page object patterns (ContactFormHelper)
- Include proper wait conditions
- Handle async operations correctly
