# DKIM Email Authentication Setup Guide

## Overview

DKIM (DomainKeys Identified Mail) provides email authentication that improves deliverability and prevents spoofing. This guide explains how to configure DKIM for the Johan Chan portfolio contact form.

## Benefits

- **Improved Deliverability**: Emails are less likely to be marked as spam
- **Email Authentication**: Proves emails come from your domain
- **Brand Protection**: Prevents spoofing of your domain
- **Professional Standards**: Complies with modern email authentication requirements

## Quick Setup

### 1. Generate DKIM Key Pair

```bash
# Generate 2048-bit RSA private key
openssl genrsa -out dkim-private.key 2048

# Extract public key
openssl rsa -in dkim-private.key -pubout -out dkim-public.key

# Format public key for DNS (remove headers and newlines)
grep -v "BEGIN\|END" dkim-public.key | tr -d '\n'
```

### 2. Configure Environment Variables

Add to your `.env.local` or production environment:

```bash
# DKIM Configuration (optional)
DKIM_DOMAIN_NAME=johan-chan.fr
DKIM_KEY_SELECTOR=default
DKIM_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...your-private-key-here...
-----END RSA PRIVATE KEY-----"
```

### 3. Add DNS TXT Record

Add this DNS TXT record to your domain:

```
Record Type: TXT
Name: default._domainkey.johan-chan.fr
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...your-public-key...
```

### 4. Test Configuration

```bash
# Test the contact form locally
pnpm dev

# Check DKIM headers in Mailpit web interface
# Look for DKIM-Signature header in sent emails
```

## Production Deployment

### Security Best Practices

1. **Private Key Storage**: Store private key securely, never commit to git
2. **Environment Variables**: Use secure environment variable management
3. **Key Rotation**: Rotate DKIM keys annually for security
4. **DNS Security**: Use DNSSEC if available

### Validation Tools

- [MXToolbox DKIM Checker](https://mxtoolbox.com/dkim.aspx)
- [Mail Tester](https://www.mail-tester.com/)
- Gmail "Show Original" → Check for "signed-by" indicator

## Troubleshooting

### Common Issues

**DKIM signature missing**

- Verify all environment variables are set
- Check private key format (must include BEGIN/END headers)
- Ensure DNS record is properly formatted

**DKIM validation fails**

- Verify DNS TXT record is published and accessible
- Check domain name matches exactly
- Ensure public/private key pair match

**Email still goes to spam**

- DKIM is one factor; also configure SPF and DMARC
- Check sender reputation and content quality
- Monitor delivery reports

### Debug Commands

```bash
# Check DNS TXT record
dig TXT default._domainkey.johan-chan.fr

# Test DKIM configuration
node -e "
const config = require('./src/lib/utils/email-service').createEmailConfigFromEnv();
console.log('DKIM configured:', !!config?.dkim);
"
```

## Integration with Testing

The DKIM implementation includes comprehensive test coverage:

- **Unit Tests**: DKIM configuration validation
- **Integration Tests**: Email sending with DKIM headers
- **E2E Tests**: Full contact form flow with DKIM

Run tests to verify DKIM setup:

```bash
# Run all tests
pnpm test

# Run specific email service tests
pnpm test tests/unit/email-service.test.ts
```

## Optional Configuration

DKIM is completely optional. The contact form works perfectly without it:

- **Without DKIM**: Basic email sending works normally
- **With DKIM**: Enhanced deliverability and authentication
- **Graceful Fallback**: No DKIM configuration = no DKIM signing

This allows flexible deployment - start without DKIM and add it later when needed for production.
