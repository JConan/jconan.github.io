import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MailpitHelper } from '../utils/email-helpers';

describe('Contact Form Server Action Integration', () => {
	let mailpit: MailpitHelper;

	beforeEach(async () => {
		mailpit = new MailpitHelper();
		await mailpit.clearAllEmails();

		// Set up test environment variables
		process.env.MAILPIT_HOST = 'localhost';
		process.env.MAILPIT_PORT = '1025';
		process.env.CONTACT_EMAIL_FROM = 'test@johan-chan.fr';
		process.env.CONTACT_EMAIL_TO = 'contact@johan-chan.fr';
	});

	afterEach(() => {
		// Clean up environment variables
		delete process.env.MAILPIT_HOST;
		delete process.env.MAILPIT_PORT;
		delete process.env.CONTACT_EMAIL_FROM;
		delete process.env.CONTACT_EMAIL_TO;
	});

	describe('Form Action Processing', () => {
		it('should process valid form submission and send email', async () => {
			// Import the server action
			const { actions } = await import('../../src/routes/contact/+page.server');

			// Create mock request with valid form data
			const formData = new FormData();
			formData.append('name', 'Integration Test User');
			formData.append('email', 'integration@example.com');
			formData.append('message', 'This is a test message from integration tests.');

			const mockRequest = {
				formData: async () => formData
			} as Request;

			// Execute the server action
			const result = await actions.default({ request: mockRequest });

			// Check that the action succeeded
			expect(result).toBeDefined();
			if ('success' in result && result.success) {
				expect(result.success).toBe(true);
				expect(result.messageId).toBeDefined();
			} else {
				throw new Error('Expected successful result but got error or fail response');
			}

			// Verify email was sent to Mailpit
			const email = await mailpit.waitForEmail(
				(email) => email.Subject.includes('Integration Test User'),
				10000
			);

			expect(email).toBeDefined();
			expect(email.Subject).toBe('New contact form submission from Integration Test User');
			expect(email.From.Address).toBe('test@johan-chan.fr');
			expect(email.To[0].Address).toBe('contact@johan-chan.fr');
		});

		it('should return validation errors for invalid form data', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			// Create mock request with invalid form data
			const formData = new FormData();
			formData.append('name', ''); // Empty name
			formData.append('email', 'invalid-email'); // Invalid email
			formData.append('message', 'Hi'); // Too short message

			const mockRequest = {
				formData: async () => formData
			} as Request;

			// Execute the server action
			const result = await actions.default({ request: mockRequest });

			// Check that the action failed with validation errors
			expect(result).toBeDefined();
			if ('status' in result && result.status === 400) {
				expect(result.data.errors).toBeDefined();
				expect(result.data.errors.name).toBeDefined();
				expect(result.data.errors.email).toBeDefined();
				expect(result.data.errors.message).toBeDefined();
			} else {
				throw new Error('Expected validation error response');
			}

			// Verify no email was sent
			const emails = await mailpit.getEmails();
			expect(emails).toHaveLength(0);
		});

		it('should handle missing email configuration gracefully', async () => {
			// Remove email configuration
			delete process.env.MAILPIT_HOST;
			delete process.env.CONTACT_EMAIL_FROM;
			delete process.env.CONTACT_EMAIL_TO;

			const { actions } = await import('../../src/routes/contact/+page.server');

			// Create mock request with valid form data
			const formData = new FormData();
			formData.append('name', 'Config Test User');
			formData.append('email', 'config@example.com');
			formData.append('message', 'Testing missing configuration.');

			const mockRequest = {
				formData: async () => formData
			} as Request;

			// Execute the server action
			const result = await actions.default({ request: mockRequest });

			// Check that the action failed due to missing configuration
			expect(result).toBeDefined();
			if ('status' in result && result.status === 500) {
				expect(result.data.error).toBe('Email service not configured');
			} else {
				throw new Error('Expected configuration error response');
			}

			// Verify no email was sent
			const emails = await mailpit.getEmails();
			expect(emails).toHaveLength(0);
		});

		it('should preserve form data on validation errors', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			const originalName = 'Valid Name';
			const originalEmail = 'invalid-email-format';
			const originalMessage = 'Valid message content here';

			// Create mock request with partially invalid form data
			const formData = new FormData();
			formData.append('name', originalName);
			formData.append('email', originalEmail);
			formData.append('message', originalMessage);

			const mockRequest = {
				formData: async () => formData
			} as Request;

			// Execute the server action
			const result = await actions.default({ request: mockRequest });

			// Check that form data is preserved
			expect(result).toBeDefined();
			if ('status' in result && result.status === 400) {
				expect(result.data.data).toBeDefined();
				expect(result.data.data.name).toBe(originalName);
				expect(result.data.data.email).toBe(originalEmail);
				expect(result.data.data.message).toBe(originalMessage);
			} else {
				throw new Error('Expected validation error with preserved data');
			}
		});
	});

	describe('Email Content Verification Through Server Action', () => {
		it('should generate correct email content with custom subject', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			const formData = new FormData();
			formData.append('name', 'Custom Subject Test');
			formData.append('email', 'custom@example.com');
			formData.append('message', 'Testing custom email content generation.');

			const mockRequest = {
				formData: async () => formData
			} as Request;

			await actions.default({ request: mockRequest });

			// Verify email content
			const email = await mailpit.waitForEmail(
				(email) => email.Subject.includes('Custom Subject Test'),
				5000
			);

			const fullEmail = await mailpit.getEmailById(email.ID);

			// Check email contains all expected content
			expect(fullEmail.HTML).toContain('Custom Subject Test');
			expect(fullEmail.HTML).toContain('custom@example.com');
			expect(fullEmail.HTML).toContain('Testing custom email content generation.');
			expect(fullEmail.HTML).toContain('johan-chan.fr');

			// Check text version
			expect(fullEmail.Text).toContain('Name: Custom Subject Test');
			expect(fullEmail.Text).toContain('Email: custom@example.com');
			expect(fullEmail.Text).toContain('Message:\nTesting custom email content generation.');
		});

		it('should handle special characters in form submission', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			const formData = new FormData();
			formData.append('name', 'François Müller');
			formData.append('email', 'francois.muller@société.fr');
			formData.append('message', "Bonjour! J'aimerais discuter d'un projet. Coût: 1000€");

			const mockRequest = {
				formData: async () => formData
			} as Request;

			const result = await actions.default({ request: mockRequest });

			// Check that the action succeeded
			expect(result).toBeDefined();
			if ('success' in result && result.success) {
				expect(result.success).toBe(true);
			} else {
				throw new Error('Expected successful result for special characters');
			}

			// Verify email with special characters
			const email = await mailpit.waitForEmail(
				(email) => email.Subject.includes('François Müller'),
				5000
			);

			const fullEmail = await mailpit.getEmailById(email.ID);

			// Check special characters are preserved
			expect(fullEmail.HTML).toContain('François Müller');
			expect(fullEmail.HTML).toContain('francois.muller@société.fr');
			expect(fullEmail.HTML).toContain('1000€');
			expect(fullEmail.Text).toContain('François Müller');
			expect(fullEmail.Text).toContain('francois.muller@société.fr');
			expect(fullEmail.Text).toContain('1000€');
		});
	});

	describe('Error Recovery and Resilience', () => {
		it('should handle SMTP connection failures gracefully', async () => {
			// Set invalid SMTP configuration
			process.env.MAILPIT_HOST = 'invalid-host';
			process.env.MAILPIT_PORT = '9999';

			const { actions } = await import('../../src/routes/contact/+page.server');

			const formData = new FormData();
			formData.append('name', 'SMTP Error Test');
			formData.append('email', 'smtp@example.com');
			formData.append('message', 'Testing SMTP error handling.');

			const mockRequest = {
				formData: async () => formData
			} as Request;

			// Execute the server action
			const result = await actions.default({ request: mockRequest });

			// Check that the action failed gracefully
			expect(result).toBeDefined();
			if ('status' in result && result.status === 500) {
				expect(result.data.error).toBe('Failed to send email. Please try again later.');
				expect(result.data.data).toBeDefined(); // Form data should be preserved
			} else {
				throw new Error('Expected SMTP error response');
			}
		});

		it('should handle concurrent form submissions', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			// Create multiple concurrent submissions
			const submissions = Array.from({ length: 3 }, (_, i) => {
				const formData = new FormData();
				formData.append('name', `Concurrent User ${i + 1}`);
				formData.append('email', `concurrent${i + 1}@example.com`);
				formData.append('message', `Concurrent submission ${i + 1}`);

				return {
					formData: async () => formData
				} as Request;
			});

			// Execute all submissions concurrently
			const results = await Promise.all(submissions.map((request) => actions.default({ request })));

			// Check all submissions succeeded
			results.forEach((result, index) => {
				expect(result).toBeDefined();
				if ('success' in result && result.success) {
					expect(result.success).toBe(true);
				} else {
					throw new Error(`Concurrent submission ${index + 1} failed`);
				}
			});

			// Verify all emails were sent
			const emails = await mailpit.waitForEmailCount(3, 10000);
			expect(emails).toHaveLength(3);

			const subjects = emails.map((email) => email.Subject);
			expect(subjects).toContain('New contact form submission from Concurrent User 1');
			expect(subjects).toContain('New contact form submission from Concurrent User 2');
			expect(subjects).toContain('New contact form submission from Concurrent User 3');
		});
	});

	describe('Performance and Load Testing', () => {
		it('should handle rapid successive submissions efficiently', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			const startTime = Date.now();
			const submissions = Array.from({ length: 5 }, (_, i) => {
				const formData = new FormData();
				formData.append('name', `Rapid User ${i + 1}`);
				formData.append('email', `rapid${i + 1}@example.com`);
				formData.append('message', `Rapid submission ${i + 1} with detailed message content.`);

				return {
					formData: async () => formData
				} as Request;
			});

			// Execute submissions sequentially but rapidly
			const results = [];
			for (const request of submissions) {
				const result = await actions.default({ request });
				results.push(result);
			}

			const endTime = Date.now();
			const totalTime = endTime - startTime;

			// Check all submissions succeeded
			results.forEach((result, index) => {
				expect(result).toBeDefined();
				if ('success' in result && result.success) {
					expect(result.success).toBe(true);
				} else {
					throw new Error(`Rapid submission ${index + 1} failed`);
				}
			});

			// Verify reasonable performance (should complete within 30 seconds)
			expect(totalTime).toBeLessThan(30000);

			// Verify all emails were sent
			const emails = await mailpit.waitForEmailCount(5, 15000);
			expect(emails).toHaveLength(5);
		});
	});

	describe('Email Delivery Confirmation', () => {
		it('should confirm email delivery with message ID tracking', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			const formData = new FormData();
			formData.append('name', 'Delivery Confirmation Test');
			formData.append('email', 'delivery@example.com');
			formData.append('message', 'Testing delivery confirmation functionality.');

			const mockRequest = {
				formData: async () => formData
			} as Request;

			const result = await actions.default({ request: mockRequest });

			// Check that we received a message ID
			expect(result).toBeDefined();
			if ('success' in result && result.success) {
				expect(result.messageId).toBeDefined();
				expect(typeof result.messageId).toBe('string');
				expect(result.messageId.length).toBeGreaterThan(0);
			} else {
				throw new Error('Expected successful result with message ID');
			}

			// Verify email was actually delivered
			const email = await mailpit.waitForEmail(
				(email) => email.Subject.includes('Delivery Confirmation Test'),
				5000
			);

			expect(email).toBeDefined();
			expect(email.ID).toBeDefined();
		});

		it('should handle email size limits appropriately', async () => {
			const { actions } = await import('../../src/routes/contact/+page.server');

			// Create a very large message (but within reasonable limits)
			const largeMessage = 'Large message content: ' + 'A'.repeat(10000);

			const formData = new FormData();
			formData.append('name', 'Large Message Test');
			formData.append('email', 'large@example.com');
			formData.append('message', largeMessage);

			const mockRequest = {
				formData: async () => formData
			} as Request;

			const result = await actions.default({ request: mockRequest });

			// Check that large message is handled successfully
			expect(result).toBeDefined();
			if ('success' in result && result.success) {
				expect(result.success).toBe(true);
			} else {
				throw new Error('Expected successful result for large message');
			}

			// Verify email was sent with full content
			const email = await mailpit.waitForEmail(
				(email) => email.Subject.includes('Large Message Test'),
				5000
			);

			const fullEmail = await mailpit.getEmailById(email.ID);
			expect(fullEmail.Text).toContain('A'.repeat(10000));
		});
	});
});
