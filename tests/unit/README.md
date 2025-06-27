# Contact Form Unit Tests

This directory contains comprehensive unit tests for the contact form functionality, covering validation logic, email service utilities, and integration scenarios.

## Test Files Overview

### 1. `contact-form-validation.test.ts`

Tests the core validation utilities for contact form data.

**Coverage:**

- Name validation (length, format, special characters)
- Email validation (format, length, security)
- Message validation (length requirements)
- Complete form validation with error handling
- Data sanitization and utility functions
- Edge cases and security scenarios

**Key Test Scenarios:**

- Valid input acceptance
- Required field validation
- Length limit enforcement
- XSS prevention in name fields
- International character support
- Custom validation configuration

### 2. `email-service.test.ts`

Tests the email service utilities and mock email functionality.

**Coverage:**

- Email template generation from form data
- HTML escaping for security
- Email configuration validation
- Environment variable configuration
- Mock email service functionality
- Error handling and failure scenarios

**Key Test Scenarios:**

- Template creation with proper HTML/text formatting
- XSS prevention through HTML escaping
- Email configuration validation
- Mock service state management
- Failure simulation for testing

### 3. `contact-form-utils.test.ts`

Tests real-world form processing scenarios and edge cases.

**Coverage:**

- Complete form submission workflows
- International and multilingual support
- Business inquiry handling
- Security validation integration
- Performance with large inputs
- Form data transformation

**Key Test Scenarios:**

- Typical business inquiries
- International names and messages
- Maximum length content handling
- Spam detection through validation
- Special character preservation

### 4. `contact-form-integration.test.ts`

Tests the complete integration flow from form submission to email sending.

**Coverage:**

- End-to-end form processing pipeline
- Validation + email service integration
- Error recovery scenarios
- Security and sanitization integration
- Performance testing
- Multiple submission handling

**Key Test Scenarios:**

- Successful submission flow
- Validation failure handling
- Email service failure recovery
- Network timeout simulation
- Rapid submission handling
- Large form data processing

## Test Utilities Used

### Validation Functions

- `validateContactForm()` - Complete form validation
- `validateName()`, `validateEmail()`, `validateMessage()` - Individual field validation
- `sanitizeContactFormData()` - Data cleaning
- `isFormEmpty()` - Empty form detection

### Email Service Functions

- `createEmailTemplate()` - HTML/text email generation
- `escapeHtml()` - XSS prevention
- `validateEmailConfig()` - Configuration validation
- `MockEmailService` - Testing email functionality

## Test Data Patterns

### Valid Test Data

```typescript
const validFormData: ContactFormData = {
	name: 'John Doe',
	email: 'john@example.com',
	message: 'Hello, I would like to discuss a project.'
};
```

### Invalid Test Data

```typescript
const invalidFormData: ContactFormData = {
	name: 'A', // Too short
	email: 'invalid-email', // Invalid format
	message: 'Short' // Too short
};
```

### Security Test Data

```typescript
const maliciousData: ContactFormData = {
	name: '<script>alert("xss")</script>', // XSS attempt
	email: 'test@example.com',
	message: 'Normal message content.'
};
```

## Running the Tests

### Run all unit tests:

```bash
pnpm test:unit
```

### Run with coverage:

```bash
pnpm test:unit:coverage
```

### Run with UI:

```bash
pnpm test:unit:ui
```

### Run specific test file:

```bash
pnpm vitest contact-form-validation.test.ts
```

## Test Configuration

The tests use the Vitest framework with the following setup:

- **Setup file**: `tests/setup/vitest.setup.ts`
- **Environment**: jsdom for DOM testing
- **Mocks**: Fetch API, console methods, DOM APIs
- **Coverage**: v8 provider for code coverage

## Expected Test Results

All tests should pass with the following coverage expectations:

- **Validation functions**: 100% line coverage
- **Email service**: 95%+ line coverage
- **Integration scenarios**: 90%+ line coverage
- **Edge cases**: Comprehensive error handling coverage

## Test Categories

### 1. **Functional Tests**

- Core validation logic
- Email template generation
- Configuration handling

### 2. **Security Tests**

- XSS prevention
- SQL injection prevention
- Input sanitization

### 3. **Performance Tests**

- Large input handling
- Multiple rapid submissions
- Processing time validation

### 4. **Integration Tests**

- Complete submission workflows
- Error recovery scenarios
- Service interaction testing

### 5. **Edge Case Tests**

- Empty/whitespace handling
- Maximum length inputs
- Special character support
- International content

## Maintenance Notes

### Adding New Tests

1. Follow existing naming conventions
2. Include both positive and negative test cases
3. Add security-focused tests for new functionality
4. Update this README when adding new test files

### Test Data Management

- Use realistic test data that reflects actual user input
- Include international characters and edge cases
- Maintain separate test data for different scenarios

### Mock Service Updates

- Keep MockEmailService in sync with actual email service interfaces
- Update mock behaviors to match real service responses
- Add new failure modes as they're discovered

## Integration with CI/CD

These unit tests are part of the automated testing pipeline:

- Run on every pull request
- Required to pass before merging
- Coverage reports generated and tracked
- Performance regression detection

## Related Documentation

- [Contact Form Migration Guide](../../docs/contact-form-migration/)
- [Testing Strategy](../../docs/contact-form-migration/05-testing-strategy.md)
- [Integration Tests](../integration/)
- [E2E Tests](../e2e/)
