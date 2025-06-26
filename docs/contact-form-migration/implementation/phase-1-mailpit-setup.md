# 📧 Phase 1: Mailpit Setup

## 🎯 Goal

Set up Mailpit as a local email testing environment to capture and view emails during development without sending them to real recipients.

## 📋 Tasks

### Prerequisites Setup

- [ ] Docker installed and running
- [ ] SvelteKit development server accessible
- [ ] Basic understanding of email testing concepts

### Mailpit Installation

- [ ] Install Mailpit via Docker
- [ ] Configure Mailpit ports (SMTP: 1025, Web UI: 8025)
- [ ] Verify Mailpit web interface accessibility
- [ ] Test Mailpit email capture functionality

### Environment Configuration

- [ ] Create development environment variables
- [ ] Configure Nodemailer for Mailpit integration
- [ ] Test email sending to Mailpit
- [ ] Verify email viewing in web interface

### Documentation

- [ ] Document Mailpit setup process
- [ ] Create troubleshooting guide for common issues
- [ ] Update development workflow documentation

## 🧪 Unit Tests

### Test Email Configuration

**File**: `tests/unit/mailpit-config.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { getEmailConfig } from '$lib/server/email-config';

describe('Mailpit Configuration', () => {
	it('should use Mailpit configuration in development', () => {
		process.env.NODE_ENV = 'development';
		process.env.MAILPIT_HOST = 'localhost';
		process.env.MAILPIT_PORT = '1025';

		const config = getEmailConfig();

		expect(config.transport).toBe('mailpit');
		expect(config.host).toBe('localhost');
		expect(config.port).toBe(1025);
		expect(config.secure).toBe(false);
	});

	it('should validate required environment variables', () => {
		delete process.env.MAILPIT_HOST;
		delete process.env.MAILPIT_PORT;

		expect(() => getEmailConfig()).toThrow('Missing required environment variables');
	});
});
```

### Test Email Transport Creation

**File**: `tests/unit/email-transport.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import nodemailer from 'nodemailer';
import { createEmailTransport } from '$lib/server/email-transport';

vi.mock('nodemailer');

describe('Email Transport', () => {
	it('should create Mailpit transport for development', () => {
		const mockCreateTransporter = vi.mocked(nodemailer.createTransporter);

		createEmailTransport();

		expect(mockCreateTransporter).toHaveBeenCalledWith({
			host: 'localhost',
			port: 1025,
			secure: false,
			auth: undefined
		});
	});
});
```

## 🔗 Integration Tests

### Mailpit Connectivity Test

**File**: `tests/integration/mailpit-connection.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import nodemailer from 'nodemailer';

describe('Mailpit Integration', () => {
	let transporter: nodemailer.Transporter;

	beforeAll(() => {
		transporter = nodemailer.createTransporter({
			host: 'localhost',
			port: 1025,
			secure: false
		});
	});

	it('should connect to Mailpit SMTP server', async () => {
		const isConnected = await transporter.verify();
		expect(isConnected).toBe(true);
	});

	it('should send test email to Mailpit', async () => {
		const testEmail = {
			from: 'test@localhost',
			to: 'recipient@localhost',
			subject: 'Mailpit Integration Test',
			text: 'This is a test email for Mailpit integration.',
			html: '<p>This is a <strong>test email</strong> for Mailpit integration.</p>'
		};

		const result = await transporter.sendMail(testEmail);

		expect(result.messageId).toBeDefined();
		expect(result.response).toContain('250');
	});
});
```

### Mailpit Web Interface Test

**File**: `tests/integration/mailpit-web.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('Mailpit Web Interface', () => {
	it('should be accessible at localhost:8025', async () => {
		const response = await fetch('http://localhost:8025');
		expect(response.status).toBe(200);
		expect(response.headers.get('content-type')).toContain('text/html');
	});

	it('should have API endpoint for emails', async () => {
		const response = await fetch('http://localhost:8025/api/v1/messages');
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty('messages');
	});
});
```

## ✅ Validation Criteria

### Technical Validation

- [ ] **Mailpit Container Running**: `docker ps` shows Mailpit container
- [ ] **SMTP Port Accessible**: `telnet localhost 1025` connects successfully
- [ ] **Web Interface Accessible**: http://localhost:8025 loads correctly
- [ ] **Email Capture Working**: Test emails appear in Mailpit interface

### Functional Validation

- [ ] **Email Sending**: Nodemailer can send emails to Mailpit
- [ ] **Email Viewing**: Emails display correctly in web interface
- [ ] **HTML Rendering**: HTML emails render properly
- [ ] **Attachment Support**: File attachments work (if applicable)

### Performance Validation

- [ ] **Startup Time**: Mailpit starts within 10 seconds
- [ ] **Email Delivery**: Emails appear in interface within 1 second
- [ ] **Interface Responsiveness**: Web UI responds quickly to interactions

## 📁 Files Created/Modified

### New Files Created

**Environment Configuration**:

```bash
# .env.local
NODE_ENV=development
EMAIL_TRANSPORT=mailpit
MAILPIT_HOST=localhost
MAILPIT_PORT=1025
CONTACT_EMAIL_FROM=contact@localhost
CONTACT_EMAIL_TO=test@localhost
ENABLE_EMAIL_LOGGING=true
```

**Email Configuration Module**:

```typescript
// src/lib/server/email-config.ts
interface EmailConfig {
	transport: 'mailpit' | 'smtp';
	host: string;
	port: number;
	secure: boolean;
	auth?: {
		user: string;
		pass: string;
	};
}

export function getEmailConfig(): EmailConfig {
	const isDev = process.env.NODE_ENV === 'development';

	if (isDev) {
		return {
			transport: 'mailpit',
			host: process.env.MAILPIT_HOST || 'localhost',
			port: parseInt(process.env.MAILPIT_PORT || '1025'),
			secure: false
		};
	}

	throw new Error('Production email config not implemented yet');
}
```

**Email Transport Module**:

```typescript
// src/lib/server/email-transport.ts
import nodemailer from 'nodemailer';
import { getEmailConfig } from './email-config';

export function createEmailTransport() {
	const config = getEmailConfig();

	return nodemailer.createTransporter({
		host: config.host,
		port: config.port,
		secure: config.secure,
		auth: config.auth
	});
}
```

**Test Email Script**:

```typescript
// scripts/test-email.ts
import { createEmailTransport } from '../src/lib/server/email-transport';

async function testEmail() {
	const transporter = createEmailTransport();

	try {
		const result = await transporter.sendMail({
			from: 'test@localhost',
			to: 'recipient@localhost',
			subject: 'Test Email from Script',
			text: 'This is a test email sent from the test script.',
			html: '<h1>Test Email</h1><p>This is a test email sent from the test script.</p>'
		});

		console.log('✅ Email sent successfully:', result.messageId);
		console.log('📧 Check Mailpit at: http://localhost:8025');
	} catch (error) {
		console.error('❌ Failed to send email:', error);
	}
}

testEmail();
```

### Package Dependencies Added

```json
{
	"dependencies": {
		"nodemailer": "^6.9.0"
	},
	"devDependencies": {
		"@types/nodemailer": "^6.4.0"
	}
}
```

### Docker Configuration

```bash
# docker-compose.yml (optional)
version: '3.8'
services:
  mailpit:
    image: axllent/mailpit
    ports:
      - "8025:8025"
      - "1025:1025"
    environment:
      - MP_SMTP_AUTH_ACCEPT_ANY=1
      - MP_SMTP_AUTH_ALLOW_INSECURE=1
```

## 🔄 Rollback Strategy

### Immediate Rollback Steps

1. **Stop Mailpit Container**:

   ```bash
   docker stop mailpit
   docker rm mailpit
   ```

2. **Remove Added Dependencies**:

   ```bash
   pnpm remove nodemailer @types/nodemailer
   ```

3. **Delete Created Files**:

   ```bash
   rm src/lib/server/email-config.ts
   rm src/lib/server/email-transport.ts
   rm scripts/test-email.ts
   rm .env.local
   ```

4. **Revert Package.json**:
   ```bash
   git checkout package.json pnpm-lock.yaml
   ```

### Verification of Rollback

- [ ] No Mailpit containers running
- [ ] Dependencies removed from package.json
- [ ] Created files deleted
- [ ] Project builds successfully without errors

## 📝 Implementation Notes

### Development Discoveries

_Space for notes discovered during implementation_

**Example entries**:

- Mailpit web interface automatically refreshes when new emails arrive
- SMTP authentication is disabled by default in development
- Email storage is in-memory and clears on container restart

### Configuration Decisions

_Document configuration choices made_

**Example entries**:

- Chose port 1025 for SMTP to avoid conflicts with system mail services
- Used localhost instead of 127.0.0.1 for better compatibility
- Enabled email logging for debugging purposes

### Performance Observations

_Note any performance characteristics_

**Example entries**:

- Mailpit starts within 3-5 seconds on average
- Email delivery latency is under 100ms
- Web interface loads quickly even with many emails

### Integration Challenges

_Document any integration issues encountered_

**Example entries**:

- Initial connection timeout resolved by waiting for container startup
- Port conflicts resolved by checking for running services
- Environment variable loading order matters for configuration

### Testing Results

_Record test execution results_

**Example entries**:

- All unit tests pass consistently
- Integration tests require Mailpit to be running
- Manual testing confirms email capture and viewing works correctly

### Next Phase Preparation

_Notes for transitioning to next phase_

**Example entries**:

- Email configuration module ready for extension
- Transport creation abstracted for easy modification
- Test infrastructure in place for email service development

---

**Phase 1 Version**: 1.0  
**Last Updated**: December 26, 2025  
**Status**: Ready for Implementation  
**Estimated Duration**: 1-2 days
