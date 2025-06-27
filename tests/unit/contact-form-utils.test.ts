import { describe, it, expect, vi } from 'vitest';
import {
	validateContactForm,
	sanitizeContactFormData,
	isFormEmpty,
	type ContactFormData
} from '../../src/lib/utils/contact-form-validation';

describe('Contact Form Utilities', () => {
	describe('Form Data Processing', () => {
		it('should process valid form submission data', () => {
			const rawFormData: ContactFormData = {
				name: '  John Doe  ',
				email: '  john@example.com  ',
				message: '  Hello, I would like to discuss a project.  '
			};

			const sanitized = sanitizeContactFormData(rawFormData);
			const validation = validateContactForm(sanitized);

			expect(sanitized).toEqual({
				name: 'John Doe',
				email: 'john@example.com',
				message: 'Hello, I would like to discuss a project.'
			});

			expect(validation.isValid).toBe(true);
			expect(validation.errors).toEqual({});
		});

		it('should handle form submission with validation errors', () => {
			const invalidFormData: ContactFormData = {
				name: 'A',
				email: 'invalid-email',
				message: 'Short'
			};

			const validation = validateContactForm(invalidFormData);

			expect(validation.isValid).toBe(false);
			expect(validation.errors).toEqual({
				name: 'Name must be at least 2 characters long',
				email: 'Please enter a valid email address',
				message: 'Message must be at least 10 characters long'
			});
		});

		it('should detect empty forms correctly', () => {
			const emptyForm: ContactFormData = {
				name: '',
				email: '',
				message: ''
			};

			const whitespaceForm: ContactFormData = {
				name: '   ',
				email: '\t',
				message: '\n'
			};

			const partialForm: ContactFormData = {
				name: 'John',
				email: '',
				message: ''
			};

			expect(isFormEmpty(emptyForm)).toBe(true);
			expect(isFormEmpty(whitespaceForm)).toBe(true);
			expect(isFormEmpty(partialForm)).toBe(false);
		});
	});

	describe('Real-world Form Scenarios', () => {
		it('should handle typical contact form submission', () => {
			const typicalSubmission: ContactFormData = {
				name: 'Marie Dubois',
				email: 'marie.dubois@example.fr',
				message:
					"Bonjour, je souhaiterais discuter d'un projet de développement web pour mon entreprise. Pouvez-vous me contacter ?"
			};

			const sanitized = sanitizeContactFormData(typicalSubmission);
			const validation = validateContactForm(sanitized);

			expect(validation.isValid).toBe(true);
			expect(sanitized.name).toBe('Marie Dubois');
			expect(sanitized.email).toBe('marie.dubois@example.fr');
		});

		it('should handle international names and emails', () => {
			const internationalSubmission: ContactFormData = {
				name: 'José María González-López',
				email: 'jose.maria@empresa.es',
				message:
					'Hola, necesito desarrollar una aplicación móvil para mi startup. ¿Podríamos hablar sobre los requisitos y el presupuesto?'
			};

			const validation = validateContactForm(internationalSubmission);
			expect(validation.isValid).toBe(true);
		});

		it('should handle business inquiry format', () => {
			const businessInquiry: ContactFormData = {
				name: 'Sarah Johnson',
				email: 'sarah.johnson@techcorp.com',
				message: `Hi Johan,

I found your portfolio and I'm impressed with your work. We're looking for a developer to help us build a new e-commerce platform using React and Node.js.

The project timeline is approximately 3-4 months, and we have a budget of €50,000-€70,000.

Could we schedule a call to discuss the details?

Best regards,
Sarah`
			};

			const validation = validateContactForm(businessInquiry);
			expect(validation.isValid).toBe(true);
		});

		it('should reject spam-like submissions', () => {
			const spamSubmission: ContactFormData = {
				name: 'X',
				email: 'spam@fake.com',
				message: 'Buy now!'
			};

			const validation = validateContactForm(spamSubmission);
			expect(validation.isValid).toBe(false);
			expect(validation.errors.name).toBe('Name must be at least 2 characters long');
			expect(validation.errors.message).toBe('Message must be at least 10 characters long');
		});
	});

	describe('Form Security', () => {
		it('should handle potential XSS attempts in form data', () => {
			const maliciousSubmission: ContactFormData = {
				name: '<script>alert("xss")</script>',
				email: 'test@example.com',
				message: 'Normal message content here that is long enough to pass validation.'
			};

			const validation = validateContactForm(maliciousSubmission);

			// Name validation should reject script tags
			expect(validation.isValid).toBe(false);
			expect(validation.errors.name).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
		});

		it('should handle SQL injection attempts', () => {
			const sqlInjectionSubmission: ContactFormData = {
				name: "'; DROP TABLE users; --",
				email: 'test@example.com',
				message: 'This is a test message that is long enough to pass validation requirements.'
			};

			const validation = validateContactForm(sqlInjectionSubmission);

			// Name validation should reject SQL injection patterns
			expect(validation.isValid).toBe(false);
			expect(validation.errors.name).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);
		});

		it('should sanitize whitespace but preserve content', () => {
			const messySubmission: ContactFormData = {
				name: '  John   Doe  ',
				email: '  john@example.com  ',
				message: '  This is my message with  extra   spaces.  '
			};

			const sanitized = sanitizeContactFormData(messySubmission);

			expect(sanitized.name).toBe('John   Doe');
			expect(sanitized.email).toBe('john@example.com');
			expect(sanitized.message).toBe('This is my message with  extra   spaces.');
		});
	});

	describe('Form Validation Edge Cases', () => {
		it('should handle minimum valid input', () => {
			const minimalSubmission: ContactFormData = {
				name: 'Jo',
				email: 'a@b.co',
				message: 'Hello test'
			};

			const validation = validateContactForm(minimalSubmission);
			expect(validation.isValid).toBe(true);
		});

		it('should handle maximum length inputs', () => {
			const maxSubmission: ContactFormData = {
				name: 'A'.repeat(100),
				email: 'test@example.com',
				message: 'A'.repeat(2000)
			};

			const validation = validateContactForm(maxSubmission);
			expect(validation.isValid).toBe(true);
		});

		it('should reject inputs that exceed maximum length', () => {
			const oversizedSubmission: ContactFormData = {
				name: 'A'.repeat(101),
				email: 'test@example.com',
				message: 'A'.repeat(2001)
			};

			const validation = validateContactForm(oversizedSubmission);
			expect(validation.isValid).toBe(false);
			expect(validation.errors.name).toBe('Name must be no more than 100 characters long');
			expect(validation.errors.message).toBe('Message must be no more than 2000 characters long');
		});

		it('should handle various email formats', () => {
			const validEmails = [
				'user@example.com',
				'test.email@domain.co.uk',
				'user+tag@example.org',
				'firstname.lastname@company.com',
				'user123@test-domain.com'
			];

			validEmails.forEach((email) => {
				const submission: ContactFormData = {
					name: 'Test User',
					email,
					message: 'This is a test message for email validation.'
				};

				const validation = validateContactForm(submission);
				expect(validation.isValid).toBe(true);
			});
		});

		it('should reject invalid email formats', () => {
			const invalidEmails = [
				'invalid',
				'invalid@',
				'@domain.com',
				'user@',
				'user@domain',
				'user..name@example.com',
				'user@domain..com'
			];

			invalidEmails.forEach((email) => {
				const submission: ContactFormData = {
					name: 'Test User',
					email,
					message: 'This is a test message for email validation.'
				};

				const validation = validateContactForm(submission);
				expect(validation.isValid).toBe(false);
				expect(validation.errors.email).toBeTruthy();
			});
		});
	});

	describe('Form Data Transformation', () => {
		it('should preserve line breaks in messages', () => {
			const messageWithLineBreaks = `Hello Johan,

I have a project that involves:
1. Building a web application
2. Implementing user authentication
3. Creating a dashboard

Can we discuss this further?

Thanks!`;

			const submission: ContactFormData = {
				name: 'Test User',
				email: 'test@example.com',
				message: messageWithLineBreaks
			};

			const sanitized = sanitizeContactFormData(submission);
			expect(sanitized.message).toContain('\n');
			expect(sanitized.message).toContain('1. Building a web application');
		});

		it('should handle special characters in names', () => {
			const specialNames = ['Jean-Pierre', "O'Connor", 'José María', 'Anne-Sophie', 'François'];

			specialNames.forEach((name) => {
				const submission: ContactFormData = {
					name,
					email: 'test@example.com',
					message: 'This is a test message with valid length.'
				};

				const validation = validateContactForm(submission);
				expect(validation.isValid).toBe(true);
			});
		});

		it('should handle empty vs whitespace-only fields', () => {
			const emptyFieldSubmission: ContactFormData = {
				name: '',
				email: '',
				message: ''
			};

			const whitespaceFieldSubmission: ContactFormData = {
				name: '   ',
				email: '   ',
				message: '   '
			};

			const emptyValidation = validateContactForm(emptyFieldSubmission);
			const whitespaceValidation = validateContactForm(whitespaceFieldSubmission);

			expect(emptyValidation.isValid).toBe(false);
			expect(whitespaceValidation.isValid).toBe(false);

			// Both should produce the same validation errors
			expect(emptyValidation.errors).toEqual(whitespaceValidation.errors);
		});
	});
});
