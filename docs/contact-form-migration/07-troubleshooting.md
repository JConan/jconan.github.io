# 🔧 Troubleshooting Guide

## Overview

Comprehensive troubleshooting guide for common issues encountered during contact form migration development, testing, and production deployment.

## Development Issues

### Mailpit Connection Problems

#### Issue: Mailpit Web Interface Not Accessible

```
Error: Cannot connect to http://localhost:8025
```

**Diagnosis Steps**:

```bash
# Check if Mailpit is running
docker ps | grep mailpit

# Check port availability
lsof -i :8025
lsof -i :1025

# Check Docker logs
docker logs mailpit
```

**Solutions**:

1. **Restart Mailpit Container**:

```bash
docker stop mailpit
docker rm mailpit
docker run -d --name mailpit -p 8025:8025 -p 1025:1025 axllent/mailpit
```

2. **Port Conflict Resolution**:

```bash
# Find process using port 8025
sudo lsof -i :8025
# Kill conflicting process
sudo kill -9 [PID]
```

3. **Alternative Port Configuration**:

```bash
# Run Mailpit on different ports
docker run -d --name mailpit -p 8026:8025 -p 1026:1025 axllent/mailpit

# Update environment variables
MAILPIT_PORT=1026
```

#### Issue: Emails Not Appearing in Mailpit

**Diagnosis**:

```bash
# Check Nodemailer configuration
node -e "console.log(process.env.MAILPIT_HOST, process.env.MAILPIT_PORT)"

# Test direct SMTP connection
telnet localhost 1025
```

**Common Causes & Solutions**:

1. **Wrong SMTP Configuration**:

```typescript
// ❌ Incorrect
const transport = nodemailer.createTransporter({
	host: 'localhost',
	port: 8025, // Wrong port - this is web UI port
	secure: false
});

// ✅ Correct
const transport = nodemailer.createTransporter({
	host: 'localhost',
	port: 1025, // SMTP port
	secure: false
});
```

2. **Environment Variable Issues**:

```bash
# Check environment variables
echo $MAILPIT_HOST
echo $MAILPIT_PORT

# Set correct values
export MAILPIT_HOST=localhost
export MAILPIT_PORT=1025
```

### SvelteKit Development Issues

#### Issue: Form Actions Not Working

```
Error: 405 Method Not Allowed
```

**Diagnosis**:

```bash
# Check if +page.server.ts exists
ls -la src/routes/contact/+page.server.ts

# Check export structure
grep -n "export" src/routes/contact/+page.server.ts
```

**Solutions**:

1. **Ensure Proper Export Structure**:

```typescript
// ✅ Correct structure
export const actions = {
	default: async ({ request }) => {
		// Form action logic
	}
};
```

2. **Check Form Method**:

```svelte
<!-- ✅ Correct form setup -->
<form method="POST" action="?/default">
	<!-- form fields -->
</form>
```

#### Issue: TypeScript Errors in Form Actions

**Common Errors & Solutions**:

1. **Missing Type Imports**:

```typescript
// ❌ Missing imports
export const actions = {
	default: async ({ request }) => {
		// TypeScript errors here
	}
};

// ✅ Correct imports
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		// Properly typed
	}
};
```

2. **FormData Type Issues**:

```typescript
// ✅ Proper FormData handling
const formData = await request.formData();
const name = formData.get('name') as string;
const email = formData.get('email') as string;
```

### Validation Issues

#### Issue: Zod Validation Errors Not Displaying

**Diagnosis**:

```typescript
// Check validation result structure
const result = contactSchema.safeParse(data);
console.log('Validation result:', result);
```

**Solutions**:

1. **Proper Error Handling**:

```typescript
// ✅ Correct error handling
if (!result.success) {
	return fail(400, {
		errors: result.error.flatten().fieldErrors,
		data: Object.fromEntries(formData)
	});
}
```

2. **Frontend Error Display**:

```svelte
<!-- ✅ Display validation errors -->
{#if form?.errors}
	{#each Object.entries(form.errors) as [field, messages]}
		<div class="error">
			{field}: {messages.join(', ')}
		</div>
	{/each}
{/if}
```

## Production Issues

### Email Delivery Problems

#### Issue: Emails Not Being Sent in Production

**Diagnosis Steps**:

```bash
# Check environment variables
vercel env ls

# Check deployment logs
vercel logs [deployment-url]

# Test SMTP connection
telnet your-smtp-server.com 587
```

**Common Causes & Solutions**:

1. **SMTP Authentication Failure**:

```bash
# Verify SMTP credentials
echo $SMTP_USER
echo $SMTP_PASS

# Test credentials manually
curl -v --url 'smtps://smtp.gmail.com:465' \
  --ssl-reqd \
  --user 'your-email@gmail.com:your-app-password'
```

2. **Firewall/Network Issues**:

```bash
# Test different SMTP ports
telnet smtp.gmail.com 587  # STARTTLS
telnet smtp.gmail.com 465  # SSL/TLS
telnet smtp.gmail.com 25   # Plain (usually blocked)
```

3. **App Password Required**:

```
For Gmail/Google Workspace:
1. Enable 2FA on your account
2. Generate app-specific password
3. Use app password instead of account password
```

#### Issue: DKIM Verification Failures

**Diagnosis**:

```bash
# Check DKIM DNS record
dig TXT default._domainkey.yourdomain.com

# Verify DKIM key format
echo "$DKIM_PRIVATE_KEY" | openssl rsa -check -noout
```

**Solutions**:

1. **DNS Record Issues**:

```bash
# Correct DKIM DNS record format
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...

# Common mistakes:
# - Missing v=DKIM1
# - Incorrect key format
# - Wrong selector name
```

2. **Private Key Format Issues**:

```typescript
// ✅ Correct private key format
const dkimPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
-----END PRIVATE KEY-----`;

// Environment variable should include \n for line breaks
DKIM_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvg...\n-----END PRIVATE KEY-----';
```

### Vercel Deployment Issues

#### Issue: Build Failures

**Common Build Errors**:

1. **TypeScript Compilation Errors**:

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Common fixes:
# - Add missing type imports
# - Fix type annotations
# - Update tsconfig.json
```

2. **Missing Dependencies**:

```bash
# Ensure all dependencies are in package.json
pnpm install

# Check for missing peer dependencies
pnpm audit
```

3. **Environment Variable Issues**:

```bash
# Verify environment variables in Vercel
vercel env ls

# Add missing variables
vercel env add VARIABLE_NAME
```

#### Issue: Function Timeout Errors

```
Error: Function execution timed out after 30s
```

**Solutions**:

1. **Increase Function Timeout**:

```json
// vercel.json
{
	"functions": {
		"src/routes/contact/+page.server.ts": {
			"maxDuration": 60
		}
	}
}
```

2. **Optimize Email Sending**:

```typescript
// Add timeout to email operations
const emailResult = await Promise.race([
	emailService.sendContactEmail(data),
	new Promise((_, reject) => setTimeout(() => reject(new Error('Email timeout')), 25000))
]);
```

### DNS and Domain Issues

#### Issue: Custom Domain Not Working

**Diagnosis**:

```bash
# Check DNS propagation
dig yourdomain.com
dig www.yourdomain.com

# Check Vercel domain configuration
vercel domains ls
```

**Solutions**:

1. **DNS Configuration**:

```bash
# Correct A record for apex domain
yourdomain.com. IN A 76.76.19.61

# Correct CNAME for www
www.yourdomain.com. IN CNAME cname.vercel-dns.com.
```

2. **SSL Certificate Issues**:

```bash
# Force SSL certificate renewal
vercel certs renew yourdomain.com

# Check SSL status
curl -I https://yourdomain.com
```

## Performance Issues

### Slow Form Submissions

#### Issue: Form Takes Too Long to Submit

**Diagnosis**:

```typescript
// Add performance monitoring
const startTime = Date.now();
await emailService.sendContactEmail(data);
console.log(`Email sent in ${Date.now() - startTime}ms`);
```

**Solutions**:

1. **Optimize Email Templates**:

```typescript
// Pre-compile templates
const templates = {
	fr: compileTemplate(frenchTemplate),
	en: compileTemplate(englishTemplate)
};

// Use compiled templates
const template = templates[locale];
```

2. **Connection Pooling**:

```typescript
// Reuse SMTP connections
const transporter = nodemailer.createTransporter({
	pool: true,
	maxConnections: 5,
	maxMessages: 100
	// ... other config
});
```

### High Memory Usage

#### Issue: Function Memory Limits Exceeded

**Solutions**:

1. **Increase Memory Allocation**:

```json
// vercel.json
{
	"functions": {
		"src/routes/contact/+page.server.ts": {
			"memory": 1024
		}
	}
}
```

2. **Optimize Memory Usage**:

```typescript
// Avoid large object creation
// Use streaming for large templates
// Clean up resources properly
```

## Security Issues

### Rate Limiting Problems

#### Issue: Legitimate Users Being Rate Limited

**Diagnosis**:

```typescript
// Add logging to rate limiting
console.log(`Rate limit check for IP: ${clientIP}, count: ${count}`);
```

**Solutions**:

1. **Adjust Rate Limits**:

```typescript
// More lenient rate limiting
const rateLimitConfig = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 10, // Increased from 5
	skipSuccessfulRequests: true
};
```

2. **Whitelist Trusted IPs**:

```typescript
const trustedIPs = ['your-office-ip', 'testing-ip'];
if (trustedIPs.includes(clientIP)) {
	return true; // Skip rate limiting
}
```

### CSRF Protection Issues

#### Issue: CSRF Token Validation Failures

**Solutions**:

1. **Ensure Proper CSRF Setup**:

```svelte
<!-- Include CSRF token in form -->
<form method="POST" use:enhance>
	<input type="hidden" name="_token" value={csrfToken} />
	<!-- other fields -->
</form>
```

2. **Check SvelteKit Configuration**:

```typescript
// Ensure CSRF is enabled
export const config = {
	csrf: {
		checkOrigin: true
	}
};
```

## Monitoring and Debugging

### Production Debugging

#### Enable Debug Logging

```typescript
// src/lib/server/logger.ts
export function debugLog(message: string, data?: any) {
	if (process.env.NODE_ENV === 'production' && process.env.DEBUG_ENABLED === 'true') {
		console.log(`[DEBUG] ${message}`, data);
	}
}
```

#### Health Check Failures

```typescript
// Enhanced health check
export async function GET() {
	const checks = {
		environment: checkEnvironmentVariables(),
		smtp: await checkSMTPConnection(),
		dkim: await checkDKIMConfiguration()
	};

	const isHealthy = Object.values(checks).every((check) => check.status === 'ok');

	return json({
		status: isHealthy ? 'healthy' : 'unhealthy',
		checks,
		timestamp: new Date().toISOString()
	});
}
```

## Error Recovery Procedures

### Emergency Rollback

#### 1. Immediate Rollback to Previous Deployment

```bash
# List recent deployments
vercel ls

# Promote previous stable deployment
vercel promote [previous-deployment-url]
```

#### 2. Rollback to GitHub Pages (Emergency)

```bash
# Temporarily revert to FormSubmit.co
git revert [migration-commit]
git push origin main

# Update DNS to GitHub Pages
# A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
```

### Data Recovery

#### Email Delivery Failures

```typescript
// Implement email queue for failed sends
const failedEmails = [];

try {
	await emailService.sendContactEmail(data);
} catch (error) {
	// Store failed email for retry
	failedEmails.push({ data, timestamp: Date.now(), error: error.message });

	// Implement retry mechanism
	setTimeout(() => retryFailedEmails(), 60000);
}
```

## Common Error Messages

### Development Errors

| Error                          | Cause                 | Solution                     |
| ------------------------------ | --------------------- | ---------------------------- |
| `ECONNREFUSED localhost:1025`  | Mailpit not running   | Start Mailpit container      |
| `Module not found: nodemailer` | Missing dependency    | `pnpm add nodemailer`        |
| `Zod validation failed`        | Invalid form data     | Check validation schema      |
| `CSRF token mismatch`          | CSRF protection issue | Ensure proper token handling |

### Production Errors

| Error                        | Cause                    | Solution                          |
| ---------------------------- | ------------------------ | --------------------------------- |
| `SMTP Authentication failed` | Wrong credentials        | Verify SMTP username/password     |
| `DKIM signature invalid`     | DKIM configuration issue | Check DNS records and private key |
| `Function timeout`           | Long-running operation   | Increase timeout or optimize code |
| `Rate limit exceeded`        | Too many requests        | Adjust rate limiting rules        |

## Getting Help

### Debugging Checklist

1. **Check Environment Variables**: Ensure all required variables are set
2. **Verify Dependencies**: All packages installed and up to date
3. **Review Logs**: Check both application and deployment logs
4. **Test Components**: Isolate and test individual components
5. **Check External Services**: Verify SMTP, DNS, and other external dependencies

### Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **SvelteKit Documentation**: https://kit.svelte.dev/docs
- **Nodemailer Documentation**: https://nodemailer.com/about/
- **DKIM Validator**: https://dkimvalidator.com/

### Escalation Process

1. **Level 1**: Check this troubleshooting guide
2. **Level 2**: Review implementation phase documentation
3. **Level 3**: Check external service status (Vercel, SMTP provider)
4. **Level 4**: Contact support or create issue in repository

---

**Troubleshooting Guide Version**: 1.0  
**Last Updated**: December 26, 2025  
**Status**: Comprehensive Coverage
