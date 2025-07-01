/**
 * Email service utilities for contact form
 */

export interface EmailConfig {
	host: string;
	port: number;
	secure?: boolean;
	auth?: {
		user: string;
		pass: string;
	};
	from: string;
	to: string;
	dkim?: {
		domainName: string;
		keySelector: string;
		privateKey: string;
	};
}

export interface EmailData {
	name: string;
	email: string;
	message: string;
	subject?: string;
	timestamp?: Date;
}

export interface EmailResult {
	success: boolean;
	messageId?: string;
	error?: string;
}

export interface EmailTemplate {
	subject: string;
	html: string;
	text: string;
}

/**
 * Creates email template from contact form data
 */
export function createEmailTemplate(data: EmailData): EmailTemplate {
	const timestamp = data.timestamp || new Date();
	const subject = data.subject || `New contact form submission from ${data.name}`;

	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Contact Form Submission</title>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
				.field { margin-bottom: 15px; }
				.label { font-weight: bold; color: #555; }
				.value { margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-radius: 4px; }
				.message { white-space: pre-wrap; }
				.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h2>New Contact Form Submission</h2>
					<p>Received on ${timestamp.toLocaleString()}</p>
				</div>
				
				<div class="field">
					<div class="label">Name:</div>
					<div class="value">${escapeHtml(data.name)}</div>
				</div>
				
				<div class="field">
					<div class="label">Email:</div>
					<div class="value">${escapeHtml(data.email)}</div>
				</div>
				
				<div class="field">
					<div class="label">Message:</div>
					<div class="value message">${escapeHtml(data.message)}</div>
				</div>
				
				<div class="footer">
					<p>This email was sent from the contact form on johan-chan.fr</p>
				</div>
			</div>
		</body>
		</html>
	`;

	const text = `
New Contact Form Submission

Received on: ${timestamp.toLocaleString()}

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This email was sent from the contact form on johan-chan.fr
	`.trim();

	return { subject, html, text };
}

/**
 * Escapes HTML characters to prevent XSS
 */
export function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

/**
 * Validates email configuration
 */
export function validateEmailConfig(config: EmailConfig): string[] {
	const errors: string[] = [];

	if (!config.host || config.host.trim().length === 0) {
		errors.push('Email host is required');
	}

	if (!config.port || config.port < 1 || config.port > 65535) {
		errors.push('Valid email port is required (1-65535)');
	}

	if (!config.from || config.from.trim().length === 0) {
		errors.push('From email address is required');
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.from)) {
		errors.push('From email address must be valid');
	}

	if (!config.to || config.to.trim().length === 0) {
		errors.push('To email address is required');
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.to)) {
		errors.push('To email address must be valid');
	}

	if (config.auth) {
		if (!config.auth.user || config.auth.user.trim().length === 0) {
			errors.push('Auth user is required when auth is provided');
		}
		if (!config.auth.pass || config.auth.pass.trim().length === 0) {
			errors.push('Auth password is required when auth is provided');
		}
	}

	if (config.dkim) {
		if (!config.dkim.domainName || config.dkim.domainName.trim().length === 0) {
			errors.push('DKIM domain name is required when DKIM is provided');
		}
		if (!config.dkim.keySelector || config.dkim.keySelector.trim().length === 0) {
			errors.push('DKIM key selector is required when DKIM is provided');
		}
		if (!config.dkim.privateKey || config.dkim.privateKey.trim().length === 0) {
			errors.push('DKIM private key is required when DKIM is provided');
		} else if (
			!config.dkim.privateKey.includes('BEGIN') ||
			!config.dkim.privateKey.includes('END')
		) {
			errors.push('DKIM private key must be in PEM format');
		}
	}

	return errors;
}

/**
 * Creates email configuration from environment variables
 */
export function createEmailConfigFromEnv(): EmailConfig | null {
	const host = process.env.SMTP_HOST || process.env.MAILPIT_HOST;
	const port = parseInt(process.env.SMTP_PORT || process.env.MAILPIT_PORT || '1025');
	const secure = process.env.SMTP_SECURE === 'true';
	const from = process.env.CONTACT_EMAIL_FROM || '';
	const to = process.env.CONTACT_EMAIL_TO || '';
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;

	// DKIM configuration (optional)
	const dkimDomain = process.env.DKIM_DOMAIN_NAME;
	const dkimSelector = process.env.DKIM_KEY_SELECTOR;
	const dkimPrivateKey = process.env.DKIM_PRIVATE_KEY;

	if (!host || !from || !to) {
		console.log({ host, from, to });
		return null;
	}

	const config: EmailConfig = {
		host,
		port,
		secure,
		from,
		to
	};

	if (user && pass) {
		config.auth = { user, pass };
	}

	// Add DKIM configuration if all required fields are present
	if (dkimDomain && dkimSelector && dkimPrivateKey) {
		config.dkim = {
			domainName: dkimDomain,
			keySelector: dkimSelector,
			privateKey: dkimPrivateKey
		};
	}

	return config;
}

/**
 * Mock email service for testing and development
 */
export class MockEmailService {
	private sentEmails: Array<{
		config: EmailConfig;
		data: EmailData;
		template: EmailTemplate;
		timestamp: Date;
	}> = [];
	private shouldFail = false;
	private failureReason = 'Mock failure';

	/**
	 * Configures the mock to simulate failures
	 */
	setFailure(shouldFail: boolean, reason = 'Mock failure'): void {
		this.shouldFail = shouldFail;
		this.failureReason = reason;
	}

	/**
	 * Sends an email (mock implementation)
	 */
	async sendEmail(config: EmailConfig, data: EmailData): Promise<EmailResult> {
		// Validate configuration
		const configErrors = validateEmailConfig(config);
		if (configErrors.length > 0) {
			return {
				success: false,
				error: `Configuration error: ${configErrors.join(', ')}`
			};
		}

		// Simulate failure if configured
		if (this.shouldFail) {
			return {
				success: false,
				error: this.failureReason
			};
		}

		// Create email template
		const template = createEmailTemplate(data);

		// Store sent email for testing
		this.sentEmails.push({
			config,
			data,
			template,
			timestamp: new Date()
		});

		// Simulate successful send
		return {
			success: true,
			messageId: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
		};
	}

	/**
	 * Gets all sent emails (for testing)
	 */
	getSentEmails() {
		return [...this.sentEmails];
	}

	/**
	 * Clears sent emails (for testing)
	 */
	clearSentEmails(): void {
		this.sentEmails = [];
	}

	/**
	 * Gets the last sent email (for testing)
	 */
	getLastSentEmail() {
		return this.sentEmails[this.sentEmails.length - 1] || null;
	}
}

/**
 * Default mock email service instance
 */
export const mockEmailService = new MockEmailService();
