import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	validateContactForm,
	sanitizeContactFormData,
	type ContactFormData
} from '../../src/lib/utils/contact-form-validation';
import {
	createEmailTemplate,
	validateEmailConfig,
	MockEmailService,
	type EmailConfig,
	type EmailData
} from '../../src/lib/utils/email-service';

describe('Contact Form Integration', () => {
	let mockEmailService: MockEmailService;
	const validEmailConfig: EmailConfig = {
		host: 'localhost',
		port: 1025,
		from: 'test@example.com',
		to: 'recipient@example.com'
	};

	beforeEach(() => {
		mockEmailService = new MockEmailService();
	});

	describe('Complete Form Submission Flow', () => {
		it('should handle successful form submission end-to-end', async () => {
			const formData: ContactFormData = {
				name: '  John Doe  ',
				email: '  john@example.com  ',
				message: '  Hello, I would like to discuss a web development project.  '
			};

			// Step 1: Sanitize form data
			const sanitized = sanitizeContactFormData(formData);
			expect(sanitized.name).toBe('John Doe');
			expect(sanitized.email).toBe('john@example.com');

			// Step 2: Validate form data
			const validation = validateContactForm(sanitized);
			expect(validation.isValid).toBe(true);

			// Step 3: Prepare email data
			const emailData: EmailData = {
				name: sanitized.name,
				email: sanitized.email,
				message: sanitized.message,
				timestamp: new Date('2024-01-01T10:00:00Z')
			};

			// Step 4: Send email
			const result = await mockEmailService.sendEmail(validEmailConfig, emailData);
			expect(result.success).toBe(true);
			expect(result.messageId).toBeTruthy();

			// Step 5: Verify email was sent
			const sentEmails = mockEmailService.getSentEmails();
			expect(sentEmails).toHaveLength(1);
			expect(sentEmails[0].data.name).toBe('John Doe');
		});

		it('should handle form submission with validation errors', async () => {
			const invalidFormData: ContactFormData = {
				name: 'A',
				email: 'invalid-email',
				message: 'Too short'
			};

			// Step 1: Sanitize form data
			const sanitized = sanitizeContactFormData(invalidFormData);

			// Step 2: Validate form data
			const validation = validateContactForm(sanitized);
			expect(validation.isValid).toBe(false);
			expect(validation.errors).toEqual({
				name: 'Name must be at least 2 characters long',
				email: 'Please enter a valid email address',
				message: 'Message must be at least 10 characters long'
			});

			// Step 3: Don't send email if validation fails
			// This would be handled in the actual implementation
			expect(validation.isValid).toBe(false);
		});

		it('should handle email service failures gracefully', async () => {
			const formData: ContactFormData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'This is a valid message for testing email service failures.'
			};

			// Form validation passes
			const validation = validateContactForm(formData);
			expect(validation.isValid).toBe(true);

			// Configure email service to fail
			mockEmailService.setFailure(true, 'SMTP connection failed');

			const emailData: EmailData = {
				name: formData.name,
				email: formData.email,
				message: formData.message
			};

			// Email sending should fail
			const result = await mockEmailService.sendEmail(validEmailConfig, emailData);
			expect(result.success).toBe(false);
			expect(result.error).toBe('SMTP connection failed');
		});
	});

	describe('Form Data Processing Pipeline', () => {
		it('should process typical business inquiry', async () => {
			const businessInquiry: ContactFormData = {
				name: 'Sarah Johnson',
				email: 'sarah.johnson@techcorp.com',
				message: `Hi Johan,

We're looking for a React developer for a 3-month project.
Budget: €50,000-€70,000
Timeline: Starting next month

Can we schedule a call?

Best regards,
Sarah`
			};

			// Process the inquiry
			const sanitized = sanitizeContactFormData(businessInquiry);
			const validation = validateContactForm(sanitized);

			expect(validation.isValid).toBe(true);

			// Create email template
			const emailData: EmailData = {
				name: sanitized.name,
				email: sanitized.email,
				message: sanitized.message
			};

			const template = createEmailTemplate(emailData);
			expect(template.subject).toBe('New contact form submission from Sarah Johnson');
			expect(template.html).toContain('Sarah Johnson');
			expect(template.html).toContain('sarah.johnson@techcorp.com');
			expect(template.html).toContain('React developer');
			expect(template.text).toContain('€50,000-€70,000');
		});

		it('should process international inquiry with special characters', async () => {
			const internationalInquiry: ContactFormData = {
				name: 'François Müller',
				email: 'francois.muller@société.fr',
				message:
					"Bonjour Johan, j'aimerais discuter d'un projet de développement d'application mobile. Pouvez-vous me contacter ? Merci !"
			};

			const sanitized = sanitizeContactFormData(internationalInquiry);
			const validation = validateContactForm(sanitized);

			expect(validation.isValid).toBe(true);

			const emailData: EmailData = {
				name: sanitized.name,
				email: sanitized.email,
				message: sanitized.message
			};

			const template = createEmailTemplate(emailData);
			expect(template.html).toContain('François Müller');
			expect(template.text).toContain("j'aimerais discuter");
		});

		it('should handle form with maximum allowed content', async () => {
			const maxFormData: ContactFormData = {
				name: 'A'.repeat(100),
				email: 'very.long.email.address.for.testing@very-long-domain-name-example.com',
				message: 'A'.repeat(2000)
			};

			const sanitized = sanitizeContactFormData(maxFormData);
			const validation = validateContactForm(sanitized);

			expect(validation.isValid).toBe(true);

			const emailData: EmailData = {
				name: sanitized.name,
				email: sanitized.email,
				message: sanitized.message
			};

			const result = await mockEmailService.sendEmail(validEmailConfig, emailData);
			expect(result.success).toBe(true);

			const sentEmail = mockEmailService.getLastSentEmail();
			expect(sentEmail?.template.html).toContain('A'.repeat(100));
		});
	});

	describe('Error Recovery Scenarios', () => {
		it('should handle network timeout gracefully', async () => {
			const formData: ContactFormData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'Test message for network timeout scenario.'
			};

			mockEmailService.setFailure(true, 'Network timeout after 30 seconds');

			const validation = validateContactForm(formData);
			expect(validation.isValid).toBe(true);

			const emailData: EmailData = {
				name: formData.name,
				email: formData.email,
				message: formData.message
			};

			const result = await mockEmailService.sendEmail(validEmailConfig, emailData);
			expect(result.success).toBe(false);
			expect(result.error).toBe('Network timeout after 30 seconds');
		});

		it('should handle invalid email configuration', async () => {
			const formData: ContactFormData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'Test message for invalid email configuration.'
			};

			const invalidConfig: EmailConfig = {
				host: '',
				port: 0,
				from: 'invalid-email',
				to: 'another-invalid-email'
			};

			const validation = validateContactForm(formData);
			expect(validation.isValid).toBe(true);

			const emailData: EmailData = {
				name: formData.name,
				email: formData.email,
				message: formData.message
			};

			const result = await mockEmailService.sendEmail(invalidConfig, emailData);
			expect(result.success).toBe(false);
			expect(result.error).toContain('Configuration error');
		});

		it('should handle multiple rapid submissions', async () => {
			const formData: ContactFormData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'Test message for rapid submission scenario.'
			};

			const emailData: EmailData = {
				name: formData.name,
				email: formData.email,
				message: formData.message
			};

			// Submit multiple forms rapidly
			const promises = Array.from({ length: 5 }, () =>
				mockEmailService.sendEmail(validEmailConfig, emailData)
			);

			const results = await Promise.all(promises);

			// All should succeed
			results.forEach((result) => {
				expect(result.success).toBe(true);
			});

			// All emails should be stored
			const sentEmails = mockEmailService.getSentEmails();
			expect(sentEmails).toHaveLength(5);
		});
	});

	describe('Security and Validation Integration', () => {
		it('should reject and not process malicious form data', async () => {
			const maliciousData: ContactFormData = {
				name: '<script>alert("xss")</script>',
				email: 'test@example.com',
				message: 'This message contains a malicious name field.'
			};

			const validation = validateContactForm(maliciousData);
			expect(validation.isValid).toBe(false);
			expect(validation.errors.name).toBe(
				'Name can only contain letters, spaces, hyphens, and apostrophes'
			);

			// Since validation fails, email should not be sent
			// This demonstrates the security layer working correctly
		});

		it('should sanitize and safely process form data with HTML content', async () => {
			const formDataWithHtml: ContactFormData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'My message contains <b>bold text</b> and "quotes" & ampersands.'
			};

			const validation = validateContactForm(formDataWithHtml);
			expect(validation.isValid).toBe(true);

			const emailData: EmailData = {
				name: formDataWithHtml.name,
				email: formDataWithHtml.email,
				message: formDataWithHtml.message
			};

			const template = createEmailTemplate(emailData);

			// HTML should be escaped in HTML template
			expect(template.html).toContain('&lt;b&gt;bold text&lt;/b&gt;');
			expect(template.html).toContain('&quot;quotes&quot;');
			expect(template.html).toContain('&amp; ampersands');

			// Text template should preserve original content
			expect(template.text).toContain('<b>bold text</b>');
			expect(template.text).toContain('"quotes"');
			expect(template.text).toContain('& ampersands');
		});
	});

	describe('Performance and Load Testing', () => {
		it('should handle large form submissions efficiently', async () => {
			const largeFormData: ContactFormData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'A'.repeat(1999) // Just under the limit
			};

			const startTime = Date.now();

			const validation = validateContactForm(largeFormData);
			const emailData: EmailData = {
				name: largeFormData.name,
				email: largeFormData.email,
				message: largeFormData.message
			};
			const result = await mockEmailService.sendEmail(validEmailConfig, emailData);

			const endTime = Date.now();
			const processingTime = endTime - startTime;

			expect(validation.isValid).toBe(true);
			expect(result.success).toBe(true);
			expect(processingTime).toBeLessThan(1000); // Should process within 1 second
		});

		it('should maintain performance with multiple form fields', async () => {
			const complexFormData: ContactFormData = {
				name: "Jean-Pierre O'Connor-Smith",
				email: 'jean.pierre.oconnor.smith@very-long-company-name-example.com',
				message: `Dear Johan,

I hope this message finds you well. I am writing to inquire about your development services for a complex project that involves:

1. Building a modern web application using React and TypeScript
2. Implementing a robust backend API with Node.js and Express
3. Setting up a PostgreSQL database with proper indexing
4. Integrating third-party services like Stripe for payments
5. Implementing real-time features using WebSocket connections
6. Setting up comprehensive testing with Jest and Cypress
7. Deploying the application using Docker and Kubernetes
8. Setting up CI/CD pipelines with GitHub Actions

The project timeline is approximately 6 months, and we have a budget of €120,000.

Could we schedule a detailed discussion about the technical requirements and your availability?

Best regards,
Jean-Pierre`
			};

			const startTime = Date.now();

			const sanitized = sanitizeContactFormData(complexFormData);
			const validation = validateContactForm(sanitized);

			const emailData: EmailData = {
				name: sanitized.name,
				email: sanitized.email,
				message: sanitized.message
			};

			const template = createEmailTemplate(emailData);
			const result = await mockEmailService.sendEmail(validEmailConfig, emailData);

			const endTime = Date.now();
			const processingTime = endTime - startTime;

			expect(validation.isValid).toBe(true);
			expect(result.success).toBe(true);
			expect(template.html).toContain('Jean-Pierre');
			expect(template.html).toContain('€120,000');
			expect(processingTime).toBeLessThan(500); // Should process quickly
		});
	});
});
