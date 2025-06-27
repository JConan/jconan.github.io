import { describe, it, expect } from 'vitest';
import {
	validateName,
	validateEmail,
	validateMessage,
	validateContactForm,
	sanitizeContactFormData,
	isFormEmpty,
	getValidationConfig,
	type ContactFormData,
	type ValidationConfig
} from '../../src/lib/utils/contact-form-validation';

describe('Contact Form Validation', () => {
	describe('validateName', () => {
		it('should accept valid names', () => {
			expect(validateName('John Doe')).toBeNull();
			expect(validateName('Jean-Pierre')).toBeNull();
			expect(validateName("O'Connor")).toBeNull();
			expect(validateName('José María')).toBeNull();
			expect(validateName('Anne-Sophie Müller')).toBeNull();
		});

		it('should reject empty names', () => {
			expect(validateName('')).toBe('Name is required');
			expect(validateName('   ')).toBe('Name is required');
		});

		it('should reject names that are too short', () => {
			expect(validateName('A')).toBe('Name must be at least 2 characters long');
		});

		it('should reject names that are too long', () => {
			const longName = 'A'.repeat(101);
			expect(validateName(longName)).toBe('Name must be no more than 100 characters long');
		});

		it('should reject names with invalid characters', () => {
			expect(validateName('John123')).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
			expect(validateName('John@Doe')).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
			expect(validateName('John.Doe')).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
		});

		it('should respect custom configuration', () => {
			const config: ValidationConfig = { nameMinLength: 5, nameMaxLength: 10 };
			expect(validateName('John', config)).toBe('Name must be at least 5 characters long');
			expect(validateName('John Doe Smith', config)).toBe(
				'Name must be no more than 10 characters long'
			);
			expect(validateName('John Doe', config)).toBeNull();
		});
	});

	describe('validateEmail', () => {
		it('should accept valid email addresses', () => {
			expect(validateEmail('user@example.com')).toBeNull();
			expect(validateEmail('test.email@domain.co.uk')).toBeNull();
			expect(validateEmail('user+tag@example.org')).toBeNull();
			expect(validateEmail('firstname.lastname@company.com')).toBeNull();
		});

		it('should reject empty emails', () => {
			expect(validateEmail('')).toBe('Email is required');
			expect(validateEmail('   ')).toBe('Email is required');
		});

		it('should reject invalid email formats', () => {
			expect(validateEmail('invalid')).toBe('Please enter a valid email address');
			expect(validateEmail('invalid@')).toBe('Please enter a valid email address');
			expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');
			expect(validateEmail('user@')).toBe('Please enter a valid email address');
			expect(validateEmail('user@domain')).toBe('Please enter a valid email address');
		});

		it('should reject emails that are too long', () => {
			const longEmail = 'a'.repeat(250) + '@example.com';
			expect(validateEmail(longEmail)).toBe('Email address is too long');
		});

		it('should reject emails with consecutive dots', () => {
			expect(validateEmail('user..name@example.com')).toBe(
				'Email address cannot contain consecutive dots'
			);
		});

		it('should respect custom email pattern', () => {
			const config: ValidationConfig = {
				emailPattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
			};
			expect(validateEmail('user+tag@example.com', config)).toBe(
				'Please enter a valid email address'
			);
			expect(validateEmail('user@example.com', config)).toBeNull();
		});
	});

	describe('validateMessage', () => {
		it('should accept valid messages', () => {
			expect(validateMessage('This is a valid message for testing purposes.')).toBeNull();
			expect(validateMessage('Hello, I would like to discuss a project with you.')).toBeNull();
		});

		it('should reject empty messages', () => {
			expect(validateMessage('')).toBe('Message is required');
			expect(validateMessage('   ')).toBe('Message is required');
		});

		it('should reject messages that are too short', () => {
			expect(validateMessage('Hi')).toBe('Message must be at least 10 characters long');
			expect(validateMessage('Short')).toBe('Message must be at least 10 characters long');
		});

		it('should reject messages that are too long', () => {
			const longMessage = 'A'.repeat(2001);
			expect(validateMessage(longMessage)).toBe(
				'Message must be no more than 2000 characters long'
			);
		});

		it('should respect custom configuration', () => {
			const config: ValidationConfig = { messageMinLength: 5, messageMaxLength: 50 };
			expect(validateMessage('Hi', config)).toBe('Message must be at least 5 characters long');
			expect(validateMessage('This is a very long message that exceeds the limit', config)).toBe(
				'Message must be no more than 50 characters long'
			);
			expect(validateMessage('Valid message', config)).toBeNull();
		});
	});

	describe('validateContactForm', () => {
		const validFormData: ContactFormData = {
			name: 'John Doe',
			email: 'john@example.com',
			message: 'Hello, I would like to discuss a project.'
		};

		it('should validate a completely valid form', () => {
			const result = validateContactForm(validFormData);
			expect(result.isValid).toBe(true);
			expect(result.errors).toEqual({});
		});

		it('should return errors for invalid form data', () => {
			const invalidFormData: ContactFormData = {
				name: '',
				email: 'invalid-email',
				message: 'Short'
			};

			const result = validateContactForm(invalidFormData);
			expect(result.isValid).toBe(false);
			expect(result.errors).toEqual({
				name: 'Name is required',
				email: 'Please enter a valid email address',
				message: 'Message must be at least 10 characters long'
			});
		});

		it('should return partial errors for partially invalid form', () => {
			const partiallyInvalidFormData: ContactFormData = {
				name: 'John Doe',
				email: 'invalid-email',
				message: 'This is a valid message for testing.'
			};

			const result = validateContactForm(partiallyInvalidFormData);
			expect(result.isValid).toBe(false);
			expect(result.errors).toEqual({
				email: 'Please enter a valid email address'
			});
		});

		it('should respect custom validation configuration', () => {
			const config: ValidationConfig = {
				nameMinLength: 5,
				messageMinLength: 20
			};

			const formData: ContactFormData = {
				name: 'John',
				email: 'john@example.com',
				message: 'Short message'
			};

			const result = validateContactForm(formData, config);
			expect(result.isValid).toBe(false);
			expect(result.errors).toEqual({
				name: 'Name must be at least 5 characters long',
				message: 'Message must be at least 20 characters long'
			});
		});
	});

	describe('sanitizeContactFormData', () => {
		it('should trim whitespace from all fields', () => {
			const formData: ContactFormData = {
				name: '  John Doe  ',
				email: '  john@example.com  ',
				message: '  Hello, this is my message.  '
			};

			const sanitized = sanitizeContactFormData(formData);
			expect(sanitized).toEqual({
				name: 'John Doe',
				email: 'john@example.com',
				message: 'Hello, this is my message.'
			});
		});

		it('should handle empty strings correctly', () => {
			const formData: ContactFormData = {
				name: '',
				email: '',
				message: ''
			};

			const sanitized = sanitizeContactFormData(formData);
			expect(sanitized).toEqual({
				name: '',
				email: '',
				message: ''
			});
		});

		it('should preserve internal spaces', () => {
			const formData: ContactFormData = {
				name: '  John   Doe  ',
				email: '  test@example.com  ',
				message: '  This is a  message with  spaces.  '
			};

			const sanitized = sanitizeContactFormData(formData);
			expect(sanitized).toEqual({
				name: 'John   Doe',
				email: 'test@example.com',
				message: 'This is a  message with  spaces.'
			});
		});
	});

	describe('isFormEmpty', () => {
		it('should return true for completely empty form', () => {
			const emptyForm: ContactFormData = {
				name: '',
				email: '',
				message: ''
			};
			expect(isFormEmpty(emptyForm)).toBe(true);
		});

		it('should return true for form with only whitespace', () => {
			const whitespaceForm: ContactFormData = {
				name: '   ',
				email: '  ',
				message: '\t\n'
			};
			expect(isFormEmpty(whitespaceForm)).toBe(true);
		});

		it('should return false if any field has content', () => {
			expect(
				isFormEmpty({
					name: 'John',
					email: '',
					message: ''
				})
			).toBe(false);

			expect(
				isFormEmpty({
					name: '',
					email: 'john@example.com',
					message: ''
				})
			).toBe(false);

			expect(
				isFormEmpty({
					name: '',
					email: '',
					message: 'Hello'
				})
			).toBe(false);
		});
	});

	describe('getValidationConfig', () => {
		it('should return default config when no overrides provided', () => {
			const config = getValidationConfig();
			expect(config).toEqual({
				nameMinLength: 2,
				nameMaxLength: 100,
				messageMinLength: 10,
				messageMaxLength: 2000,
				emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			});
		});

		it('should merge overrides with defaults', () => {
			const overrides: ValidationConfig = {
				nameMinLength: 5,
				messageMaxLength: 500
			};

			const config = getValidationConfig(overrides);
			expect(config).toEqual({
				nameMinLength: 5,
				nameMaxLength: 100,
				messageMinLength: 10,
				messageMaxLength: 500,
				emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			});
		});

		it('should handle custom email pattern', () => {
			const customPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			const overrides: ValidationConfig = {
				emailPattern: customPattern
			};

			const config = getValidationConfig(overrides);
			expect(config.emailPattern).toBe(customPattern);
		});
	});

	describe('Edge Cases and Security', () => {
		it('should handle null and undefined inputs gracefully', () => {
			// @ts-expect-error Testing runtime behavior with invalid input
			expect(validateName(null)).toBe('Name is required');
			// @ts-expect-error Testing runtime behavior with invalid input
			expect(validateEmail(undefined)).toBe('Email is required');
			// @ts-expect-error Testing runtime behavior with invalid input
			expect(validateMessage(null)).toBe('Message is required');
		});

		it('should handle special characters in names correctly', () => {
			expect(validateName('François')).toBeNull();
			expect(validateName('José María')).toBeNull();
			expect(validateName('Björk')).toBeNull();
			expect(validateName('李小明')).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
		});

		it('should prevent XSS attempts in validation', () => {
			const xssAttempt = '<script>alert("xss")</script>';
			expect(validateName(xssAttempt)).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
			expect(validateMessage(xssAttempt)).toBeNull(); // Message allows more characters
		});

		it('should handle very long inputs without crashing', () => {
			const veryLongString = 'A'.repeat(10000);
			expect(validateName(veryLongString)).toBe('Name must be no more than 100 characters long');
			expect(validateEmail(veryLongString + '@example.com')).toBe('Email address is too long');
			expect(validateMessage(veryLongString)).toBe(
				'Message must be no more than 2000 characters long'
			);
		});
	});
});
