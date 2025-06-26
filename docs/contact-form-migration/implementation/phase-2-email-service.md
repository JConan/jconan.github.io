# 🔧 Phase 2: Email Service Foundation

## 🎯 Goal

Create a robust, reusable email service module that handles email template generation, sending, and error handling for both development (Mailpit) and production (SMTP) environments.

## 📋 Tasks

### Email Service Architecture

- [ ] Design email service interface
- [ ] Implement template generation system
- [ ] Create email sending functionality
- [ ] Add comprehensive error handling

### Template System

- [ ] Create HTML email templates
- [ ] Create text email templates
- [ ] Implement internationalization support
- [ ] Add template validation

### Configuration Management

- [ ] Extend email configuration for production
- [ ] Add template configuration
- [ ] Implement environment-specific settings
- [ ] Add validation for required settings

### Testing Infrastructure

- [ ] Create email service test suite
- [ ] Implement template testing
- [ ] Add integration tests with Mailpit
- [ ] Create manual testing scripts

## 🧪 Unit Tests

### Email Service Core Tests

**File**: `tests/unit/email-service.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmailService } from '$lib/server/email-service';
import type { ContactFormData } from '$lib/schemas/contact';

describe('EmailService', () => {
	let emailService: EmailService;
	let mockTransporter: any;

	beforeEach(() => {
		mockTransporter = {
			sendMail: vi.fn().mockResolvedValue({
				messageId: 'test-message-id',
				response: '250 Message accepted'
			}),
			verify: vi.fn().mockResolvedValue(true)
		};

		emailService = new EmailService(mockTransporter);
	});

	describe('sendContactEmail', () => {
		const testData: ContactFormData = {
			name: 'John Doe',
			email: 'john@example.com',
			message: 'This is a test message.'
		};

		it('should send email successfully', async () => {
			const result = await emailService.sendContactEmail(testData);

			expect(result.success).toBe(true);
			expect(result.messageId).toBe('test-message-id');
			expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
		});

		it('should handle email sending failures', async () => {
			mockTransporter.sendMail.mockRejectedValue(new Error('SMTP Error'));

			const result = await emailService.sendContactEmail(testData);

			expect(result.success).toBe(false);
			expect(result.error).toContain('SMTP Error');
		});

		it('should include all required email fields', async () => {
			await emailService.sendContactEmail(testData);

			const emailCall = mockTransporter.sendMail.mock.calls[0][0];
			expect(emailCall).toHaveProperty('from');
			expect(emailCall).toHaveProperty('to');
			expect(emailCall).toHaveProperty('subject');
			expect(emailCall).toHaveProperty('html');
			expect(emailCall).toHaveProperty('text');
		});
	});

	describe('generateTemplate', () => {
		it('should generate HTML template', () => {
			const data: ContactFormData = {
				name: 'Jane Doe',
				email: 'jane@example.com',
				message: 'Template test message.'
			};

			const template = emailService.generateTemplate(data, 'en');

			expect(template.html).toContain('Jane Doe');
			expect(template.html).toContain('jane@example.com');
			expect(template.html).toContain('Template test message');
			expect(template.html).toContain('<html>');
		});

		it('should generate text template', () => {
			const data: ContactFormData = {
				name: 'Jane Doe',
				email: 'jane@example.com',
				message: 'Template test message.'
			};

			const template = emailService.generateTemplate(data, 'en');

			expect(template.text).toContain('Jane Doe');
			expect(template.text).toContain('jane@example.com');
			expect(template.text).toContain('Template test message');
			expect(template.text).not.toContain('<html>');
		});

		it('should support French locale', () => {
			const data: ContactFormData = {
				name: 'Jean Dupont',
				email: 'jean@example.com',
				message: 'Message de test en français.'
			};

			const template = emailService.generateTemplate(data, 'fr');

			expect(template.subject).toContain('Nouveau message');
			expect(template.html).toContain('jean@example.com');
		});
	});
});
```

### Template Generation Tests

**File**: `tests/unit/email-templates.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { generateHtmlTemplate, generateTextTemplate } from '$lib/server/email-templates';
import type { ContactFormData } from '$lib/schemas/contact';

describe('Email Templates', () => {
	const testData: ContactFormData = {
		name: 'Test User',
		email: 'test@example.com',
		message: 'This is a test message with special characters: <>&"'
	};

	describe('HTML Template', () => {
		it('should escape HTML special characters', () => {
			const html = generateHtmlTemplate(testData, 'en');

			expect(html).toContain('&lt;&gt;&amp;&quot;');
			expect(html).not.toContain('<>&"');
		});

		it('should include all contact information', () => {
			const html = generateHtmlTemplate(testData, 'en');

			expect(html).toContain('Test User');
			expect(html).toContain('test@example.com');
			expect(html).toContain('This is a test message');
		});

		it('should have proper HTML structure', () => {
			const html = generateHtmlTemplate(testData, 'en');

			expect(html).toContain('<!DOCTYPE html>');
			expect(html).toContain('<html>');
			expect(html).toContain('</html>');
			expect(html).toContain('<body>');
			expect(html).toContain('</body>');
		});
	});

	describe('Text Template', () => {
		it('should not contain HTML tags', () => {
			const text = generateTextTemplate(testData, 'en');

			expect(text).not.toContain('<');
			expect(text).not.toContain('>');
		});

		it('should include all contact information', () => {
			const text = generateTextTemplate(testData, 'en');

			expect(text).toContain('Test User');
			expect(text).toContain('test@example.com');
			expect(text).toContain('This is a test message');
		});

		it('should have readable formatting', () => {
			const text = generateTextTemplate(testData, 'en');

			expect(text).toContain('\n');
			expect(text).toContain('=====');
		});
	});
});
```

## 🔗 Integration Tests

### Email Service Integration

**File**: `tests/integration/email-service.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { EmailService } from '$lib/server/email-service';
import { createEmailTransport } from '$lib/server/email-transport';
import type { ContactFormData } from '$lib/schemas/contact';

describe('Email Service Integration', () => {
	let emailService: EmailService;

	beforeAll(() => {
		const transport = createEmailTransport();
		emailService = new EmailService(transport);
	});

	it('should send email to Mailpit successfully', async () => {
		const testData: ContactFormData = {
			name: 'Integration Test User',
			email: 'integration@example.com',
			message: 'This is an integration test message sent to Mailpit.'
		};

		const result = await emailService.sendContactEmail(testData);

		expect(result.success).toBe(true);
		expect(result.messageId).toBeDefined();
		expect(result.error).toBeUndefined();
	});

	it('should verify transport connection', async () => {
		const isHealthy = await emailService.checkHealth();
		expect(isHealthy).toBe(true);
	});

	it('should handle malformed email data gracefully', async () => {
		const invalidData = {
			name: '',
			email: 'invalid-email',
			message: ''
		} as ContactFormData;

		// Should not throw, but return error result
		const result = await emailService.sendContactEmail(invalidData);
		expect(result.success).toBe(false);
	});
});
```

### Mailpit API Integration

**File**: `tests/integration/mailpit-api.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('Mailpit API Integration', () => {
	const MAILPIT_API_BASE = 'http://localhost:8025/api/v1';

	it('should retrieve emails from Mailpit API', async () => {
		const response = await fetch(`${MAILPIT_API_BASE}/messages`);
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty('messages');
		expect(Array.isArray(data.messages)).toBe(true);
	});

	it('should clear all emails via API', async () => {
		const response = await fetch(`${MAILPIT_API_BASE}/messages`, {
			method: 'DELETE'
		});
		expect(response.status).toBe(200);

		// Verify emails are cleared
		const checkResponse = await fetch(`${MAILPIT_API_BASE}/messages`);
		const data = await checkResponse.json();
		expect(data.messages).toHaveLength(0);
	});
});
```

## ✅ Validation Criteria

### Technical Validation

- [ ] **Email Service Module**: Exports all required functions and classes
- [ ] **Template Generation**: HTML and text templates generate correctly
- [ ] **Email Sending**: Successfully sends emails to Mailpit
- [ ] **Error Handling**: Gracefully handles all error scenarios

### Functional Validation

- [ ] **Template Content**: All contact data appears in generated templates
- [ ] **Internationalization**: French and English templates work correctly
- [ ] **Email Delivery**: Emails appear in Mailpit within 1 second
- [ ] **Health Checks**: Service can verify SMTP connection health

### Quality Validation

- [ ] **HTML Validation**: HTML templates are well-formed and valid
- [ ] **Text Formatting**: Text templates are readable and properly formatted
- [ ] **Security**: All user input is properly escaped in templates
- [ ] **Performance**: Email generation and sending completes within 2 seconds

## 📁 Files Created/Modified

### New Files Created

**Email Service Core**:

```typescript
// src/lib/server/email-service.ts
import type { Transporter } from 'nodemailer';
import type { ContactFormData } from '$lib/schemas/contact';
import { generateHtmlTemplate, generateTextTemplate } from './email-templates';

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

export class EmailService {
	constructor(private transporter: Transporter) {}

	async sendContactEmail(data: ContactFormData): Promise<EmailResult> {
		try {
			const template = this.generateTemplate(data, 'fr'); // Default to French

			const mailOptions = {
				from: process.env.CONTACT_EMAIL_FROM,
				to: process.env.CONTACT_EMAIL_TO,
				replyTo: `"${data.name}" <${data.email}>`,
				subject: template.subject,
				html: template.html,
				text: template.text,
				headers: {
					'X-Mailer': 'Johan Chan Portfolio Contact Form',
					'X-Priority': '3'
				}
			};

			const result = await this.transporter.sendMail(mailOptions);

			return {
				success: true,
				messageId: result.messageId
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}

	generateTemplate(data: ContactFormData, locale: string): EmailTemplate {
		const isEnglish = locale === 'en';

		return {
			subject: isEnglish
				? `💼 Contact Portfolio: Message from ${data.name}`
				: `💼 Contact Portfolio: Message de ${data.name}`,
			html: generateHtmlTemplate(data, locale),
			text: generateTextTemplate(data, locale)
		};
	}

	async checkHealth(): Promise<boolean> {
		try {
			return await this.transporter.verify();
		} catch {
			return false;
		}
	}
}
```

**Email Templates**:

```typescript
// src/lib/server/email-templates.ts
import type { ContactFormData } from '$lib/schemas/contact';

export function generateHtmlTemplate(data: ContactFormData, locale: string): string {
	const { name, email, message } = data;
	const isEnglish = locale === 'en';

	const timestamp = new Date().toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR', {
		timeZone: 'Europe/Paris',
		dateStyle: 'full',
		timeStyle: 'short'
	});

	const labels = isEnglish
		? {
				title: 'NEW CONTACT MESSAGE',
				received: 'Received from',
				date: 'Date',
				contactInfo: 'CONTACT INFORMATION',
				nameLabel: 'Name',
				emailLabel: 'Email',
				messageLabel: 'MESSAGE',
				footer:
					'To reply to this message, use the "Reply" function of your email client. The reply address is automatically configured to'
			}
		: {
				title: 'NOUVEAU MESSAGE DE CONTACT',
				received: 'Reçu depuis',
				date: 'Date',
				contactInfo: 'INFORMATIONS DE CONTACT',
				nameLabel: 'Nom',
				emailLabel: 'Email',
				messageLabel: 'MESSAGE',
				footer:
					'Pour répondre à ce message, utilisez directement la fonction "Répondre" de votre client email. L\'adresse de réponse est automatiquement configurée sur'
			};

	return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${labels.title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; }
        .footer { background: #6c757d; color: white; padding: 15px; border-radius: 0 0 8px 8px; font-size: 14px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #495057; }
        .message-content { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; }
        .emoji { font-size: 1.2em; }
    </style>
</head>
<body>
    <div class="header">
        <h1><span class="emoji">💼</span> ${labels.title}</h1>
        <p><span class="emoji">📧</span> ${labels.received}: johan-chan.fr</p>
        <p><span class="emoji">🕒</span> ${labels.date}: ${timestamp}</p>
    </div>
    
    <div class="content">
        <h2>${labels.contactInfo}</h2>
        <div class="field">
            <span class="label"><span class="emoji">👤</span> ${labels.nameLabel}:</span> ${escapeHtml(name)}
        </div>
        <div class="field">
            <span class="label"><span class="emoji">✉️</span> ${labels.emailLabel}:</span> ${escapeHtml(email)}
        </div>
        
        <h2>${labels.messageLabel}</h2>
        <div class="message-content">
            ${escapeHtml(message).replace(/\n/g, '<br>')}
        </div>
    </div>
    
    <div class="footer">
        ${labels.footer}: <strong>${escapeHtml(email)}</strong>
    </div>
</body>
</html>`.trim();
}

export function generateTextTemplate(data: ContactFormData, locale: string): string {
	const { name, email, message } = data;
	const isEnglish = locale === 'en';

	const timestamp = new Date().toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR', {
		timeZone: 'Europe/Paris',
		dateStyle: 'full',
		timeStyle: 'short'
	});

	const labels = isEnglish
		? {
				title: 'NEW CONTACT MESSAGE',
				received: 'Received from',
				date: 'Date',
				contactInfo: 'CONTACT INFORMATION',
				nameLabel: 'Name',
				emailLabel: 'Email',
				messageLabel: 'MESSAGE',
				footer:
					'To reply to this message, use the "Reply" function of your email client.\nThe reply address is automatically configured to'
			}
		: {
				title: 'NOUVEAU MESSAGE DE CONTACT',
				received: 'Reçu depuis',
				date: 'Date',
				contactInfo: 'INFORMATIONS DE CONTACT',
				nameLabel: 'Nom',
				emailLabel: 'Email',
				messageLabel: 'MESSAGE',
				footer:
					'Pour répondre à ce message, utilisez directement la fonction "Répondre" de votre client email.\nL\'adresse de réponse est automatiquement configurée sur'
			};

	return `
${labels.title}
${'='.repeat(labels.title.length)}

📧 ${labels.received}: johan-chan.fr
🕒 ${labels.date}: ${timestamp}

${labels.contactInfo}:
------------------------
👤 ${labels.nameLabel}: ${name}
✉️  ${labels.emailLabel}: ${email}

${labels.messageLabel}:
--------
${message}

---
${labels.footer}: ${email}
`.trim();
}

function escapeHtml(text: string): string {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}
```

**Enhanced Email Configuration**:

```typescript
// src/lib/server/email-config.ts (updated)
interface EmailConfig {
	transport: 'mailpit' | 'smtp';
	host: string;
	port: number;
	secure: boolean;
	auth?: {
		user: string;
		pass: string;
	};
	from: string;
	to: string;
}

export function getEmailConfig(): EmailConfig {
	const isDev = process.env.NODE_ENV === 'development';

	// Validate required environment variables
	const requiredVars = ['CONTACT_EMAIL_FROM', 'CONTACT_EMAIL_TO'];
	for (const varName of requiredVars) {
		if (!process.env[varName]) {
			throw new Error(`Missing required environment variable: ${varName}`);
		}
	}

	if (isDev) {
		return {
			transport: 'mailpit',
			host: process.env.MAILPIT_HOST || 'localhost',
			port: parseInt(process.env.MAILPIT_PORT || '1025'),
			secure: false,
			from: process.env.CONTACT_EMAIL_FROM!,
			to: process.env.CONTACT_EMAIL_TO!
		};
	}

	throw new Error('Production email config not implemented yet');
}
```

**Test Utilities**:

```typescript
// tests/utils/email-helpers.ts
export async function clearMailpitEmails(): Promise<void> {
	await fetch('http://localhost:8025/api/v1/messages', {
		method: 'DELETE'
	});
}

export async function getMailpitEmails(): Promise<any[]> {
	const response = await fetch('http://localhost:8025/api/v1/messages');
	const data = await response.json();
	return data.messages || [];
}

export async function waitForEmail(
	predicate: (email: any) => boolean,
	timeout = 5000
): Promise<any> {
	const startTime = Date.now();

	while (Date.now() - startTime < timeout) {
		const emails = await getMailpitEmails();
		const email = emails.find(predicate);
		if (email) return email;

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	throw new Error('Email not found within timeout');
}
```

## 🔄 Rollback Strategy

### Immediate Rollback Steps

1. **Remove Email Service Files**:

   ```bash
   rm src/lib/server/email-service.ts
   rm src/lib/server/email-templates.ts
   rm tests/utils/email-helpers.ts
   ```

2. **Revert Email Configuration**:

   ```bash
   git checkout src/lib/server/email-config.ts
   ```

3. **Remove Test Files**:

   ```bash
   rm tests/unit/email-service.test.ts
   rm tests/unit/email-templates.test.ts
   rm tests/integration/email-service.test.ts
   rm tests/integration/mailpit-api.test.ts
   ```

4. **Clean Environment Variables**:
   ```bash
   # Remove from .env.local
   unset CONTACT_EMAIL_FROM
   unset CONTACT_EMAIL_TO
   ```

### Verification of Rollback

- [ ] Email service files removed
- [ ] Email configuration reverted to Phase 1 state
- [ ] Test files cleaned up
- [ ] Project builds successfully
- [ ] Phase 1 functionality still works

## 📝 Implementation Notes

### Development Discoveries

_Space for notes discovered during implementation_

### Template Design Decisions

_Document template design choices_

### Error Handling Strategies

_Note error handling approaches_

### Performance Optimizations

_Record performance improvements_

### Integration Challenges

_Document integration issues and solutions_

### Testing Results

_Record test execution results_

### Next Phase Preparation

_Notes for transitioning to Phase 3_

---

**Phase 2 Version**: 1.0  
**Last Updated**: December 26, 2025  
**Status**: Ready for Implementation  
**Estimated Duration**: 2-3 days
