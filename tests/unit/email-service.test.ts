import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
	createEmailTemplate,
	escapeHtml,
	validateEmailConfig,
	createEmailConfigFromEnv,
	MockEmailService,
	mockEmailService,
	type EmailConfig,
	type EmailData
} from '../../src/lib/utils/email-service';

describe('Email Service', () => {
	describe('createEmailTemplate', () => {
		const mockData: EmailData = {
			name: 'John Doe',
			email: 'john@example.com',
			message: 'Hello, I would like to discuss a project with you.'
		};

		it('should create a complete email template', () => {
			const template = createEmailTemplate(mockData);

			expect(template.subject).toBe('New contact form submission from John Doe');
			expect(template.html).toContain('John Doe');
			expect(template.html).toContain('john@example.com');
			expect(template.html).toContain('Hello, I would like to discuss a project with you.');
			expect(template.text).toContain('John Doe');
			expect(template.text).toContain('john@example.com');
			expect(template.text).toContain('Hello, I would like to discuss a project with you.');
		});

		it('should use custom subject when provided', () => {
			const dataWithSubject: EmailData = {
				...mockData,
				subject: 'Custom Subject Line'
			};

			const template = createEmailTemplate(dataWithSubject);
			expect(template.subject).toBe('Custom Subject Line');
		});

		it('should use custom timestamp when provided', () => {
			const customDate = new Date('2024-01-01T10:00:00Z');
			const dataWithTimestamp: EmailData = {
				...mockData,
				timestamp: customDate
			};

			const template = createEmailTemplate(dataWithTimestamp);
			expect(template.html).toContain(customDate.toLocaleString());
			expect(template.text).toContain(customDate.toLocaleString());
		});

		it('should escape HTML in user data', () => {
			const dataWithHtml: EmailData = {
				name: '<script>alert("xss")</script>',
				email: 'test@example.com',
				message: 'Message with <b>HTML</b> & "quotes"'
			};

			const template = createEmailTemplate(dataWithHtml);
			expect(template.html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
			expect(template.html).toContain(
				'Message with &lt;b&gt;HTML&lt;/b&gt; &amp; &quot;quotes&quot;'
			);
			// Text version should contain original content
			expect(template.text).toContain('<script>alert("xss")</script>');
			expect(template.text).toContain('Message with <b>HTML</b> & "quotes"');
		});

		it('should preserve line breaks in message', () => {
			const dataWithLineBreaks: EmailData = {
				...mockData,
				message: 'Line 1\nLine 2\n\nLine 4'
			};

			const template = createEmailTemplate(dataWithLineBreaks);
			expect(template.html).toContain('white-space: pre-wrap');
			expect(template.text).toContain('Line 1\nLine 2\n\nLine 4');
		});
	});

	describe('escapeHtml', () => {
		it('should escape basic HTML characters', () => {
			expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
			expect(escapeHtml('Hello & goodbye')).toBe('Hello &amp; goodbye');
			expect(escapeHtml('"quoted text"')).toBe('&quot;quoted text&quot;');
			expect(escapeHtml("'single quotes'")).toBe('&#039;single quotes&#039;');
		});

		it('should handle empty strings', () => {
			expect(escapeHtml('')).toBe('');
		});

		it('should handle strings without special characters', () => {
			expect(escapeHtml('Normal text')).toBe('Normal text');
		});

		it('should handle complex HTML injection attempts', () => {
			const malicious = '<script>alert("xss")</script><img src="x" onerror="alert(1)">';
			const escaped = escapeHtml(malicious);
			expect(escaped).toBe(
				'&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;'
			);
		});
	});

	describe('validateEmailConfig', () => {
		const validConfig: EmailConfig = {
			host: 'localhost',
			port: 1025,
			from: 'sender@example.com',
			to: 'recipient@example.com'
		};

		it('should validate a correct configuration', () => {
			const errors = validateEmailConfig(validConfig);
			expect(errors).toEqual([]);
		});

		it('should require host', () => {
			const config = { ...validConfig, host: '' };
			const errors = validateEmailConfig(config);
			expect(errors).toContain('Email host is required');
		});

		it('should require valid port', () => {
			const invalidPorts = [0, -1, 65536, 100000];

			invalidPorts.forEach((port) => {
				const config = { ...validConfig, port };
				const errors = validateEmailConfig(config);
				expect(errors).toContain('Valid email port is required (1-65535)');
			});
		});

		it('should require from email', () => {
			const config = { ...validConfig, from: '' };
			const errors = validateEmailConfig(config);
			expect(errors).toContain('From email address is required');
		});

		it('should validate from email format', () => {
			const config = { ...validConfig, from: 'invalid-email' };
			const errors = validateEmailConfig(config);
			expect(errors).toContain('From email address must be valid');
		});

		it('should require to email', () => {
			const config = { ...validConfig, to: '' };
			const errors = validateEmailConfig(config);
			expect(errors).toContain('To email address is required');
		});

		it('should validate to email format', () => {
			const config = { ...validConfig, to: 'invalid-email' };
			const errors = validateEmailConfig(config);
			expect(errors).toContain('To email address must be valid');
		});

		it('should validate auth when provided', () => {
			const configWithIncompleteAuth = {
				...validConfig,
				auth: { user: 'username', pass: '' }
			};
			const errors = validateEmailConfig(configWithIncompleteAuth);
			expect(errors).toContain('Auth password is required when auth is provided');
		});

		it('should accept valid auth configuration', () => {
			const configWithAuth = {
				...validConfig,
				auth: { user: 'username', pass: 'password' }
			};
			const errors = validateEmailConfig(configWithAuth);
			expect(errors).toEqual([]);
		});

		it('should validate DKIM configuration when provided', () => {
			const configWithIncompleteDkim = {
				...validConfig,
				dkim: {
					domainName: 'example.com',
					keySelector: 'default',
					privateKey: ''
				}
			};
			const errors = validateEmailConfig(configWithIncompleteDkim);
			expect(errors).toContain('DKIM private key is required when DKIM is provided');
		});

		it('should require valid PEM format for DKIM private key', () => {
			const configWithInvalidDkim = {
				...validConfig,
				dkim: {
					domainName: 'example.com',
					keySelector: 'default',
					privateKey: 'invalid-key-format'
				}
			};
			const errors = validateEmailConfig(configWithInvalidDkim);
			expect(errors).toContain('DKIM private key must be in PEM format');
		});

		it('should accept valid DKIM configuration', () => {
			const configWithDkim = {
				...validConfig,
				dkim: {
					domainName: 'example.com',
					keySelector: 'default',
					privateKey:
						'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----'
				}
			};
			const errors = validateEmailConfig(configWithDkim);
			expect(errors).toEqual([]);
		});

		it('should require all DKIM fields when DKIM is provided', () => {
			const configWithPartialDkim = {
				...validConfig,
				dkim: {
					domainName: '',
					keySelector: 'default',
					privateKey: '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----'
				}
			};
			const errors = validateEmailConfig(configWithPartialDkim);
			expect(errors).toContain('DKIM domain name is required when DKIM is provided');
		});
	});

	describe('createEmailConfigFromEnv', () => {
		const originalEnv = process.env;

		beforeEach(() => {
			vi.resetModules();
			process.env = { ...originalEnv };
		});

		afterEach(() => {
			process.env = originalEnv;
		});

		it('should create config from environment variables', () => {
			process.env.SMTP_HOST = 'smtp.example.com';
			process.env.SMTP_PORT = '587';
			process.env.SMTP_SECURE = 'true';
			process.env.CONTACT_EMAIL_FROM = 'sender@example.com';
			process.env.CONTACT_EMAIL_TO = 'recipient@example.com';
			process.env.SMTP_USER = 'username';
			process.env.SMTP_PASS = 'password';

			const config = createEmailConfigFromEnv();
			expect(config).toEqual({
				host: 'smtp.example.com',
				port: 587,
				secure: true,
				from: 'sender@example.com',
				to: 'recipient@example.com',
				auth: {
					user: 'username',
					pass: 'password'
				}
			});
		});

		it('should use Mailpit environment variables as fallback', () => {
			process.env.MAILPIT_HOST = 'localhost';
			process.env.MAILPIT_PORT = '1025';
			process.env.CONTACT_EMAIL_FROM = 'test@localhost';
			process.env.CONTACT_EMAIL_TO = 'recipient@localhost';

			const config = createEmailConfigFromEnv();
			expect(config).toEqual({
				host: 'localhost',
				port: 1025,
				secure: false,
				from: 'test@localhost',
				to: 'recipient@localhost'
			});
		});

		it('should return null when required variables are missing', () => {
			process.env.SMTP_HOST = 'smtp.example.com';
			// Clear all email variables to ensure they're missing
			delete process.env.CONTACT_EMAIL_FROM;
			delete process.env.CONTACT_EMAIL_TO;

			const config = createEmailConfigFromEnv();
			expect(config).toBeNull();
		});

		it('should handle missing auth credentials', () => {
			process.env.SMTP_HOST = 'smtp.example.com';
			process.env.CONTACT_EMAIL_FROM = 'sender@example.com';
			process.env.CONTACT_EMAIL_TO = 'recipient@example.com';
			process.env.SMTP_USER = 'username';
			// Missing SMTP_PASS

			const config = createEmailConfigFromEnv();
			expect(config).toEqual({
				host: 'smtp.example.com',
				port: 1025,
				secure: false,
				from: 'sender@example.com',
				to: 'recipient@example.com'
			});
			expect(config?.auth).toBeUndefined();
		});

		it('should include DKIM configuration when all DKIM variables are present', () => {
			process.env.SMTP_HOST = 'smtp.example.com';
			process.env.CONTACT_EMAIL_FROM = 'sender@example.com';
			process.env.CONTACT_EMAIL_TO = 'recipient@example.com';
			process.env.DKIM_DOMAIN_NAME = 'example.com';
			process.env.DKIM_KEY_SELECTOR = 'default';
			process.env.DKIM_PRIVATE_KEY =
				'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----';

			const config = createEmailConfigFromEnv();
			expect(config?.dkim).toEqual({
				domainName: 'example.com',
				keySelector: 'default',
				privateKey:
					'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----'
			});
		});

		it('should not include DKIM configuration when DKIM variables are missing', () => {
			process.env.SMTP_HOST = 'smtp.example.com';
			process.env.CONTACT_EMAIL_FROM = 'sender@example.com';
			process.env.CONTACT_EMAIL_TO = 'recipient@example.com';
			process.env.DKIM_DOMAIN_NAME = 'example.com';
			// Missing DKIM_KEY_SELECTOR and DKIM_PRIVATE_KEY

			const config = createEmailConfigFromEnv();
			expect(config?.dkim).toBeUndefined();
		});

		it('should not include DKIM configuration when only some DKIM variables are present', () => {
			process.env.SMTP_HOST = 'smtp.example.com';
			process.env.CONTACT_EMAIL_FROM = 'sender@example.com';
			process.env.CONTACT_EMAIL_TO = 'recipient@example.com';
			process.env.DKIM_DOMAIN_NAME = 'example.com';
			process.env.DKIM_KEY_SELECTOR = 'default';
			// Missing DKIM_PRIVATE_KEY

			const config = createEmailConfigFromEnv();
			expect(config?.dkim).toBeUndefined();
		});
	});

	describe('MockEmailService', () => {
		let emailService: MockEmailService;
		const validConfig: EmailConfig = {
			host: 'localhost',
			port: 1025,
			from: 'sender@example.com',
			to: 'recipient@example.com'
		};
		const validData: EmailData = {
			name: 'John Doe',
			email: 'john@example.com',
			message: 'Test message'
		};

		beforeEach(() => {
			emailService = new MockEmailService();
		});

		it('should send email successfully with valid data', async () => {
			const result = await emailService.sendEmail(validConfig, validData);

			expect(result.success).toBe(true);
			expect(result.messageId).toMatch(/^mock-\d+-[a-z0-9]+$/);
			expect(result.error).toBeUndefined();
		});

		it('should store sent emails', async () => {
			await emailService.sendEmail(validConfig, validData);

			const sentEmails = emailService.getSentEmails();
			expect(sentEmails).toHaveLength(1);
			expect(sentEmails[0].data).toEqual(validData);
			expect(sentEmails[0].config).toEqual(validConfig);
		});

		it('should fail when configuration is invalid', async () => {
			const invalidConfig = { ...validConfig, from: 'invalid-email' };
			const result = await emailService.sendEmail(invalidConfig, validData);

			expect(result.success).toBe(false);
			expect(result.error).toContain('Configuration error');
		});

		it('should simulate failures when configured', async () => {
			emailService.setFailure(true, 'Network error');
			const result = await emailService.sendEmail(validConfig, validData);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network error');
		});

		it('should clear sent emails', async () => {
			await emailService.sendEmail(validConfig, validData);
			expect(emailService.getSentEmails()).toHaveLength(1);

			emailService.clearSentEmails();
			expect(emailService.getSentEmails()).toHaveLength(0);
		});

		it('should get last sent email', async () => {
			const data1 = { ...validData, name: 'First' };
			const data2 = { ...validData, name: 'Second' };

			await emailService.sendEmail(validConfig, data1);
			await emailService.sendEmail(validConfig, data2);

			const lastEmail = emailService.getLastSentEmail();
			expect(lastEmail?.data.name).toBe('Second');
		});

		it('should return null for last email when no emails sent', () => {
			const lastEmail = emailService.getLastSentEmail();
			expect(lastEmail).toBeNull();
		});

		it('should create email template when sending', async () => {
			await emailService.sendEmail(validConfig, validData);

			const lastEmail = emailService.getLastSentEmail();
			expect(lastEmail?.template.subject).toBe('New contact form submission from John Doe');
			expect(lastEmail?.template.html).toContain('John Doe');
			expect(lastEmail?.template.text).toContain('Test message');
		});
	});

	describe('mockEmailService singleton', () => {
		beforeEach(() => {
			mockEmailService.clearSentEmails();
			mockEmailService.setFailure(false);
		});

		it('should be a singleton instance', () => {
			expect(mockEmailService).toBeInstanceOf(MockEmailService);
		});

		it('should maintain state across calls', async () => {
			const config: EmailConfig = {
				host: 'localhost',
				port: 1025,
				from: 'sender@example.com',
				to: 'recipient@example.com'
			};
			const data: EmailData = {
				name: 'Test User',
				email: 'test@example.com',
				message: 'Test message'
			};

			await mockEmailService.sendEmail(config, data);
			expect(mockEmailService.getSentEmails()).toHaveLength(1);
		});
	});

	describe('Edge Cases and Error Handling', () => {
		let emailService: MockEmailService;
		const validConfig: EmailConfig = {
			host: 'localhost',
			port: 1025,
			from: 'sender@example.com',
			to: 'recipient@example.com'
		};

		beforeEach(() => {
			emailService = new MockEmailService();
		});

		it('should handle empty email data', async () => {
			const emptyData: EmailData = {
				name: '',
				email: '',
				message: ''
			};

			const result = await emailService.sendEmail(validConfig, emptyData);
			expect(result.success).toBe(true);

			const lastEmail = emailService.getLastSentEmail();
			expect(lastEmail?.template.html).toContain('New Contact Form Submission');
		});

		it('should handle special characters in data', async () => {
			const specialData: EmailData = {
				name: 'José María',
				email: 'jose@example.com',
				message: 'Message with émojis 🚀 and special chars: ñáéíóú'
			};

			const result = await emailService.sendEmail(validConfig, specialData);
			expect(result.success).toBe(true);

			const lastEmail = emailService.getLastSentEmail();
			expect(lastEmail?.template.text).toContain('José María');
			expect(lastEmail?.template.text).toContain('🚀');
		});

		it('should handle very long messages', async () => {
			const longMessage = 'A'.repeat(5000);
			const longData: EmailData = {
				name: 'Test User',
				email: 'test@example.com',
				message: longMessage
			};

			const result = await emailService.sendEmail(validConfig, longData);
			expect(result.success).toBe(true);

			const lastEmail = emailService.getLastSentEmail();
			expect(lastEmail?.template.text).toContain(longMessage);
		});
	});
});
