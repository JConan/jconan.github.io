# ⚙️ Environment Setup

## Overview

This guide covers the complete environment configuration for developing and deploying the new contact form system, including local development with Mailpit and production deployment with DKIM support.

## Development Environment Setup

### Prerequisites

```bash
# Required tools
node --version    # v18.0.0 or higher
pnpm --version    # v8.0.0 or higher
git --version     # Any recent version
```

### Mailpit Installation

Mailpit is a local email testing server that captures emails without sending them.

#### Option 1: Docker (Recommended)

```bash
# Pull and run Mailpit container
docker run -d \
  --name mailpit \
  -p 8025:8025 \
  -p 1025:1025 \
  axllent/mailpit

# Verify installation
curl http://localhost:8025
```

#### Option 2: Binary Installation

```bash
# macOS with Homebrew
brew install mailpit

# Start Mailpit
mailpit

# Or run in background
mailpit --daemon
```

#### Option 3: Go Installation

```bash
# Install via Go
go install github.com/axllent/mailpit@latest

# Run Mailpit
mailpit
```

### Mailpit Configuration

```bash
# Default settings (can be customized)
SMTP_HOST=localhost
SMTP_PORT=1025
WEB_UI_PORT=8025
```

**Web Interface**: http://localhost:8025

### Project Dependencies

```bash
# Install new dependencies
pnpm add nodemailer zod

# Install development dependencies
pnpm add -D @types/nodemailer
```

## Environment Variables

### Development Configuration

Create `.env.local` file:

```bash
# Development Email Configuration
NODE_ENV=development
EMAIL_TRANSPORT=mailpit
MAILPIT_HOST=localhost
MAILPIT_PORT=1025

# Form Configuration
CONTACT_EMAIL_FROM=contact@localhost
CONTACT_EMAIL_TO=test@localhost

# Development Flags
ENABLE_EMAIL_LOGGING=true
ENABLE_FORM_DEBUG=true
```

### Production Configuration

Environment variables for Vercel deployment:

```bash
# Production Email Configuration
NODE_ENV=production
EMAIL_TRANSPORT=smtp

# SMTP Server Configuration
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-app-password

# Email Addresses
CONTACT_EMAIL_FROM=contact@yourdomain.com
CONTACT_EMAIL_TO=your-email@yourdomain.com

# DKIM Configuration
DKIM_DOMAIN=yourdomain.com
DKIM_SELECTOR=default
DKIM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour DKIM private key here\n-----END PRIVATE KEY-----"

# Security Configuration
ENABLE_RATE_LIMITING=true
RATE_LIMIT_WINDOW=900000  # 15 minutes
RATE_LIMIT_MAX=5          # 5 submissions per window
```

## Email Service Configuration

### Development Email Flow

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#1f2937', 'primaryTextColor': '#f9fafb', 'primaryBorderColor': '#374151', 'lineColor': '#6b7280', 'secondaryColor': '#374151', 'tertiaryColor': '#111827', 'background': '#111827', 'mainBkg': '#1f2937', 'secondBkg': '#374151'}}}%%
graph LR
    A[Form Submission] --> B[Nodemailer]
    B --> C[Mailpit SMTP]
    C --> D[Mailpit Storage]
    D --> E[Web Interface]

    style A fill:#1f2937,stroke:#3b82f6,stroke-width:2px,color:#f9fafb
    style C fill:#1f2937,stroke:#10b981,stroke-width:2px,color:#f9fafb
    style E fill:#1f2937,stroke:#f59e0b,stroke-width:2px,color:#f9fafb
```

### Production Email Flow

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#1f2937', 'primaryTextColor': '#f9fafb', 'primaryBorderColor': '#374151', 'lineColor': '#6b7280', 'secondaryColor': '#374151', 'tertiaryColor': '#111827', 'background': '#111827', 'mainBkg': '#1f2937', 'secondBkg': '#374151'}}}%%
graph LR
    A[Form Submission] --> B[Nodemailer + DKIM]
    B --> C[SMTP Server]
    C --> D[Email Delivery]
    D --> E[Recipient Inbox]

    style A fill:#1f2937,stroke:#3b82f6,stroke-width:2px,color:#f9fafb
    style B fill:#1f2937,stroke:#10b981,stroke-width:2px,color:#f9fafb
    style E fill:#1f2937,stroke:#f59e0b,stroke-width:2px,color:#f9fafb
```

## DKIM Configuration

### DNS Records Setup

#### 1. Generate DKIM Key Pair

```bash
# Generate DKIM private key
openssl genrsa -out dkim_private.key 2048

# Generate public key
openssl rsa -in dkim_private.key -pubout -out dkim_public.key

# Extract public key for DNS (remove headers and newlines)
grep -v "BEGIN\|END" dkim_public.key | tr -d '\n'
```

#### 2. DNS TXT Record

Add TXT record to your domain:

```
Name: default._domainkey.yourdomain.com
Value: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY_HERE
```

#### 3. Additional DNS Records

**SPF Record**:

```
Name: yourdomain.com
Type: TXT
Value: v=spf1 include:your-smtp-provider.com ~all
```

**DMARC Record**:

```
Name: _dmarc.yourdomain.com
Type: TXT
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

### DKIM Verification

```bash
# Test DKIM DNS record
dig TXT default._domainkey.yourdomain.com

# Verify SPF record
dig TXT yourdomain.com

# Check DMARC record
dig TXT _dmarc.yourdomain.com
```

## Vercel Deployment Setup

### Project Configuration

Create `vercel.json`:

```json
{
	"framework": "sveltekit",
	"buildCommand": "pnpm build",
	"devCommand": "pnpm dev",
	"installCommand": "pnpm install",
	"functions": {
		"src/routes/contact/+page.server.ts": {
			"maxDuration": 30
		}
	},
	"env": {
		"NODE_ENV": "production"
	}
}
```

### Environment Variables in Vercel

#### Via Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add CONTACT_EMAIL_FROM
vercel env add CONTACT_EMAIL_TO
vercel env add DKIM_DOMAIN
vercel env add DKIM_SELECTOR
vercel env add DKIM_PRIVATE_KEY
```

#### Via Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all production environment variables
4. Set appropriate environments (Production, Preview, Development)

## Local Development Workflow

### 1. Start Development Services

```bash
# Terminal 1: Start Mailpit
docker run --rm -p 8025:8025 -p 1025:1025 axllent/mailpit

# Terminal 2: Start SvelteKit dev server
pnpm dev
```

### 2. Development URLs

- **Application**: http://localhost:5173
- **Mailpit Web UI**: http://localhost:8025
- **Contact Form**: http://localhost:5173/contact

### 3. Testing Email Flow

1. Fill out contact form at http://localhost:5173/contact
2. Submit the form
3. Check Mailpit interface at http://localhost:8025
4. Verify email content and formatting

## Environment Validation

### Development Checklist

```bash
# Verify Mailpit is running
curl -f http://localhost:8025 && echo "✅ Mailpit is running"

# Verify SvelteKit dev server
curl -f http://localhost:5173 && echo "✅ SvelteKit is running"

# Check environment variables
node -e "console.log('EMAIL_TRANSPORT:', process.env.EMAIL_TRANSPORT)"
```

### Production Checklist

```bash
# Verify DKIM DNS records
dig TXT default._domainkey.yourdomain.com

# Test SMTP connection
telnet your-smtp-server.com 587

# Verify Vercel environment variables
vercel env ls
```

## Troubleshooting

### Common Development Issues

#### Mailpit Not Accessible

```bash
# Check if Mailpit is running
docker ps | grep mailpit

# Check port availability
lsof -i :8025
lsof -i :1025

# Restart Mailpit
docker restart mailpit
```

#### Email Not Appearing in Mailpit

1. **Check SMTP configuration**: Ensure `MAILPIT_HOST=localhost` and `MAILPIT_PORT=1025`
2. **Verify Nodemailer configuration**: Check transport settings
3. **Check Mailpit logs**: `docker logs mailpit`

### Common Production Issues

#### DKIM Verification Failures

```bash
# Test DKIM record
nslookup -type=TXT default._domainkey.yourdomain.com

# Verify private key format
echo "$DKIM_PRIVATE_KEY" | openssl rsa -check -noout
```

#### SMTP Authentication Errors

1. **Verify credentials**: Test SMTP username/password
2. **Check security settings**: Ensure app passwords are used
3. **Verify SMTP server**: Confirm host and port settings

## Configuration Files

### Email Service Configuration

Create `src/lib/server/email-config.ts`:

```typescript
interface EmailConfig {
	transport: 'mailpit' | 'smtp';
	host: string;
	port: number;
	secure: boolean;
	auth?: {
		user: string;
		pass: string;
	};
	dkim?: {
		domainName: string;
		keySelector: string;
		privateKey: string;
	};
}

export const getEmailConfig = (): EmailConfig => {
	const isDev = process.env.NODE_ENV === 'development';

	if (isDev) {
		return {
			transport: 'mailpit',
			host: process.env.MAILPIT_HOST || 'localhost',
			port: parseInt(process.env.MAILPIT_PORT || '1025'),
			secure: false
		};
	}

	return {
		transport: 'smtp',
		host: process.env.SMTP_HOST!,
		port: parseInt(process.env.SMTP_PORT!),
		secure: process.env.SMTP_SECURE === 'true',
		auth: {
			user: process.env.SMTP_USER!,
			pass: process.env.SMTP_PASS!
		},
		dkim: {
			domainName: process.env.DKIM_DOMAIN!,
			keySelector: process.env.DKIM_SELECTOR!,
			privateKey: process.env.DKIM_PRIVATE_KEY!
		}
	};
};
```

## Security Considerations

### Development Security

- ✅ Use `.env.local` for local secrets
- ✅ Never commit environment files to git
- ✅ Use Mailpit to avoid sending real emails during development

### Production Security

- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS for all communications
- ✅ Implement proper DKIM signing
- ✅ Configure SPF and DMARC records
- ✅ Use app passwords instead of account passwords

## Next Steps

1. **Testing Strategy**: Review [Testing Strategy](05-testing-strategy.md)
2. **Deployment**: Check [Deployment Guide](06-deployment-guide.md)
3. **Implementation**: Start [Phase 1: Mailpit Setup](implementation/phase-1-mailpit-setup.md)

---

**Environment Version**: 1.0  
**Last Updated**: December 26, 2025  
**Status**: Configuration Ready
