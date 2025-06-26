# 🚀 Deployment Guide

## Overview

Complete guide for deploying the contact form migration from GitHub Pages to Vercel, including environment configuration, DKIM setup, and production monitoring.

## Pre-Deployment Checklist

### Code Readiness

- [ ] All implementation phases completed
- [ ] Unit tests passing
- [ ] Integration tests with Mailpit working
- [ ] E2E tests passing
- [ ] Security tests validated

### Environment Preparation

- [ ] DKIM keys generated
- [ ] DNS records configured
- [ ] SMTP credentials obtained
- [ ] Environment variables documented

## Vercel Deployment Setup

### 1. Project Configuration

#### Install Vercel CLI

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Login to Vercel
vercel login
```

#### Initialize Vercel Project

```bash
# In your project root
vercel

# Follow the prompts:
# ? Set up and deploy "~/jconan.github.io"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? jconan-portfolio
# ? In which directory is your code located? ./
```

### 2. Framework Configuration

#### Vercel Configuration File

**File**: `vercel.json`

```json
{
	"framework": "sveltekit",
	"buildCommand": "pnpm build",
	"devCommand": "pnpm dev",
	"installCommand": "pnpm install",
	"outputDirectory": "build",
	"functions": {
		"src/routes/contact/+page.server.ts": {
			"maxDuration": 30,
			"memory": 1024
		}
	},
	"env": {
		"NODE_ENV": "production"
	},
	"regions": ["cdg1"],
	"headers": [
		{
			"source": "/contact",
			"headers": [
				{
					"key": "X-Frame-Options",
					"value": "DENY"
				},
				{
					"key": "X-Content-Type-Options",
					"value": "nosniff"
				}
			]
		}
	]
}
```

#### SvelteKit Adapter Configuration

**File**: `svelte.config.js`

```javascript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x',
			regions: ['cdg1'], // Paris region for better performance in Europe
			memory: 1024,
			maxDuration: 30
		}),

		// Ensure contact page is not prerendered
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn',
			handleHttpError: ({ path, referrer, message }) => {
				// Skip contact page from prerendering
				if (path === '/contact') {
					return;
				}
				throw new Error(`${message} (${path})`);
			}
		}
	}
};

export default config;
```

## Environment Variables Setup

### Production Environment Variables

```bash
# Core Application
vercel env add NODE_ENV
# Value: production

# Email Transport Configuration
vercel env add EMAIL_TRANSPORT
# Value: smtp

vercel env add SMTP_HOST
# Value: your-smtp-server.com

vercel env add SMTP_PORT
# Value: 587

vercel env add SMTP_SECURE
# Value: true

vercel env add SMTP_USER
# Value: your-email@yourdomain.com

vercel env add SMTP_PASS
# Value: your-app-password

# Email Addresses
vercel env add CONTACT_EMAIL_FROM
# Value: contact@yourdomain.com

vercel env add CONTACT_EMAIL_TO
# Value: your-email@yourdomain.com

# DKIM Configuration
vercel env add DKIM_DOMAIN
# Value: yourdomain.com

vercel env add DKIM_SELECTOR
# Value: default

vercel env add DKIM_PRIVATE_KEY
# Value: -----BEGIN PRIVATE KEY-----\nYour DKIM private key here\n-----END PRIVATE KEY-----

# Security Configuration
vercel env add ENABLE_RATE_LIMITING
# Value: true

vercel env add RATE_LIMIT_WINDOW
# Value: 900000

vercel env add RATE_LIMIT_MAX
# Value: 5
```

### Environment Variable Validation

**File**: `src/lib/server/env-validation.ts`

```typescript
import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	EMAIL_TRANSPORT: z.enum(['smtp', 'mailpit']),
	SMTP_HOST: z.string().min(1).optional(),
	SMTP_PORT: z.string().regex(/^\d+$/).optional(),
	SMTP_USER: z.string().email().optional(),
	SMTP_PASS: z.string().min(1).optional(),
	CONTACT_EMAIL_FROM: z.string().email(),
	CONTACT_EMAIL_TO: z.string().email(),
	DKIM_DOMAIN: z.string().min(1).optional(),
	DKIM_SELECTOR: z.string().min(1).optional(),
	DKIM_PRIVATE_KEY: z.string().min(1).optional()
});

export function validateEnvironment() {
	const result = envSchema.safeParse(process.env);

	if (!result.success) {
		console.error('❌ Invalid environment configuration:');
		console.error(result.error.format());
		process.exit(1);
	}

	return result.data;
}

// Validate on startup
export const env = validateEnvironment();
```

## DNS Configuration

### DKIM Setup

#### 1. Generate DKIM Keys (if not done)

```bash
# Generate private key
openssl genrsa -out dkim_private.key 2048

# Generate public key
openssl rsa -in dkim_private.key -pubout -out dkim_public.key

# Format for DNS (remove headers and join lines)
grep -v "BEGIN\|END" dkim_public.key | tr -d '\n'
```

#### 2. DNS Records Configuration

**DKIM Record**:

```
Type: TXT
Name: default._domainkey.yourdomain.com
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
TTL: 3600
```

**SPF Record**:

```
Type: TXT
Name: yourdomain.com
Value: v=spf1 include:_spf.google.com ~all
TTL: 3600
```

**DMARC Record**:

```
Type: TXT
Name: _dmarc.yourdomain.com
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; sp=none; aspf=r;
TTL: 3600
```

### DNS Verification

```bash
# Verify DKIM record
dig TXT default._domainkey.yourdomain.com

# Verify SPF record
dig TXT yourdomain.com | grep spf

# Verify DMARC record
dig TXT _dmarc.yourdomain.com
```

## Deployment Process

### 1. Pre-Deployment Testing

```bash
# Run full test suite
pnpm test:all

# Build production bundle
pnpm build

# Test production build locally
pnpm preview
```

### 2. Deploy to Vercel

#### Automatic Deployment (Recommended)

```bash
# Connect GitHub repository to Vercel
# Deployments will trigger automatically on push to main branch

# Manual deployment for testing
vercel --prod
```

#### Manual Deployment

```bash
# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

### 3. Post-Deployment Verification

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Test production endpoint
curl -X POST https://yourdomain.com/contact \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "message=Deployment test"
```

## Domain Configuration

### Custom Domain Setup

#### 1. Add Domain to Vercel

```bash
# Add custom domain
vercel domains add yourdomain.com

# Add www subdomain
vercel domains add www.yourdomain.com
```

#### 2. DNS Configuration for Custom Domain

**A Record** (for apex domain):

```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600
```

**CNAME Record** (for www):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### SSL Certificate

Vercel automatically provisions SSL certificates for custom domains. Verify SSL is working:

```bash
# Check SSL certificate
curl -I https://yourdomain.com

# Verify SSL grade
# Use SSL Labs test: https://www.ssllabs.com/ssltest/
```

## Monitoring & Observability

### Production Monitoring Setup

#### 1. Vercel Analytics

```bash
# Enable Vercel Analytics
vercel env add VERCEL_ANALYTICS_ID
# Value: your-analytics-id
```

#### 2. Error Monitoring

**File**: `src/hooks.server.ts`

```typescript
import { error } from '@sveltejs/kit';

export async function handleError({ error, event }) {
	// Log errors in production
	if (process.env.NODE_ENV === 'production') {
		console.error('Server error:', {
			message: error.message,
			stack: error.stack,
			url: event.url.pathname,
			userAgent: event.request.headers.get('user-agent'),
			timestamp: new Date().toISOString()
		});
	}

	return {
		message: 'An unexpected error occurred',
		code: error?.code ?? 'UNKNOWN'
	};
}
```

#### 3. Performance Monitoring

```typescript
// src/lib/server/metrics.ts
export function logPerformanceMetric(operation: string, duration: number) {
	if (process.env.NODE_ENV === 'production') {
		console.log(`METRIC: ${operation} took ${duration}ms`);
	}
}

// Usage in form action
const startTime = Date.now();
await emailService.sendContactEmail(data);
logPerformanceMetric('email_send', Date.now() - startTime);
```

## Rollback Strategy

### Deployment Rollback

#### 1. Automatic Rollback

```bash
# List recent deployments
vercel ls

# Promote previous deployment to production
vercel promote [deployment-url]
```

#### 2. Emergency Rollback to GitHub Pages

If critical issues occur, temporarily rollback to GitHub Pages:

```bash
# 1. Revert contact form to FormSubmit.co
git revert [migration-commit-hash]

# 2. Push to GitHub
git push origin main

# 3. Update DNS to point back to GitHub Pages
# Change A record from Vercel IP to GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

### Database Backup (Future Enhancement)

If database is added in the future:

```bash
# Backup contact form submissions
vercel env add DATABASE_BACKUP_URL
# Configure automatic backups
```

## Security Hardening

### Production Security Configuration

#### 1. Security Headers

**File**: `src/hooks.server.ts`

```typescript
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Add security headers in production
	if (process.env.NODE_ENV === 'production') {
		response.headers.set('X-Frame-Options', 'DENY');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
		response.headers.set(
			'Content-Security-Policy',
			"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
		);
	}

	return response;
}
```

#### 2. Rate Limiting Configuration

```typescript
// src/lib/server/rate-limit.ts
import { error } from '@sveltejs/kit';

const rateLimitMap = new Map();

export function checkRateLimit(clientIP: string): boolean {
	const now = Date.now();
	const windowMs = 15 * 60 * 1000; // 15 minutes
	const maxRequests = 5;

	const clientData = rateLimitMap.get(clientIP) || { count: 0, resetTime: now + windowMs };

	if (now > clientData.resetTime) {
		clientData.count = 1;
		clientData.resetTime = now + windowMs;
	} else {
		clientData.count++;
	}

	rateLimitMap.set(clientIP, clientData);

	return clientData.count <= maxRequests;
}
```

## Performance Optimization

### Production Performance Configuration

#### 1. Caching Strategy

**File**: `src/routes/contact/+page.ts`

```typescript
export const load = async () => {
	return {
		seo: {
			title: 'Contact & Devis - Johan Chan Développeur Freelance',
			description: "Contactez Johan Chan pour votre projet d'application...",
			keywords: 'contact développeur freelance, devis développement...'
		}
	};
};

// Cache page for 1 hour
export const csr = true;
export const ssr = true;
export const prerender = false;
```

#### 2. Email Template Optimization

```typescript
// Pre-compile email templates for better performance
export const emailTemplates = {
  fr: {
    subject: 'Nouveau message de contact',
    html: /* compiled template */,
    text: /* compiled template */
  },
  en: {
    subject: 'New contact message',
    html: /* compiled template */,
    text: /* compiled template */
  }
};
```

## Health Checks

### Production Health Monitoring

#### Health Check Endpoint

**File**: `src/routes/api/health/+server.ts`

```typescript
import { json } from '@sveltejs/kit';
import { validateEnvironment } from '$lib/server/env-validation';

export async function GET() {
	try {
		// Validate environment
		validateEnvironment();

		// Check SMTP connection
		const emailService = new EmailService();
		const isEmailHealthy = await emailService.checkHealth();

		return json({
			status: 'healthy',
			timestamp: new Date().toISOString(),
			services: {
				email: isEmailHealthy ? 'healthy' : 'unhealthy'
			}
		});
	} catch (error) {
		return json(
			{
				status: 'unhealthy',
				timestamp: new Date().toISOString(),
				error: error.message
			},
			{ status: 500 }
		);
	}
}
```

#### Monitoring Script

```bash
#!/bin/bash
# health-check.sh

HEALTH_URL="https://yourdomain.com/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
  echo "✅ Health check passed"
  exit 0
else
  echo "❌ Health check failed with status: $RESPONSE"
  exit 1
fi
```

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] DNS records updated
- [ ] DKIM keys generated and configured
- [ ] SSL certificate ready

### During Deployment

- [ ] Vercel project configured
- [ ] Custom domain added
- [ ] Environment variables set
- [ ] Production build successful

### Post-Deployment

- [ ] Health check endpoint responding
- [ ] Contact form submission working
- [ ] Email delivery confirmed
- [ ] DKIM signature validated
- [ ] Performance metrics within targets
- [ ] Security headers configured
- [ ] Monitoring alerts configured

## Troubleshooting

Common deployment issues and solutions are documented in [Troubleshooting Guide](07-troubleshooting.md).

## Next Steps

1. **Troubleshooting**: Review [Troubleshooting Guide](07-troubleshooting.md)
2. **Future Enhancements**: Check [Future Enhancements](08-future-enhancements.md)
3. **Implementation**: Begin [Phase 1: Mailpit Setup](implementation/phase-1-mailpit-setup.md)

---

**Deployment Guide Version**: 1.0  
**Last Updated**: December 26, 2025  
**Status**: Production Ready
