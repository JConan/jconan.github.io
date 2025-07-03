# LLM Knowledge - Domains

This directory contains specialized guides for domain-specific development areas and technical concepts.

## Planned Guides

### Database & Data

- **database-guide.md** - SQL patterns, migrations, optimization
- **prisma-guide.md** - Prisma ORM, schema design, queries
- **drizzle-guide.md** - Drizzle ORM patterns, migrations
- **redis-guide.md** - Caching strategies, session management
- **mongodb-guide.md** - Document design, aggregation, indexing

### API & Integration

- **api-design-guide.md** - REST API design, versioning, documentation
- **graphql-guide.md** - Schema design, resolvers, optimization
- **webhook-guide.md** - Webhook patterns, security, reliability
- **auth-guide.md** - Authentication, authorization, security patterns
- **oauth-guide.md** - OAuth flows, token management, security

### Performance & Monitoring

- **performance-guide.md** - Optimization techniques, profiling, monitoring
- **caching-guide.md** - Caching strategies, invalidation, patterns
- **cdn-guide.md** - CDN configuration, optimization, deployment
- **monitoring-guide.md** - Logging, metrics, alerting, observability

### Security

- **security-guide.md** - Security best practices, vulnerability prevention
- **encryption-guide.md** - Encryption patterns, key management
- **validation-guide.md** - Input validation, sanitization, XSS prevention
- **csrf-guide.md** - CSRF protection, token patterns

### Testing & Quality

- **testing-guide.md** - Testing strategies, patterns, automation
- **e2e-guide.md** - End-to-end testing, Playwright, Cypress
- **performance-testing-guide.md** - Load testing, benchmarking
- **code-quality-guide.md** - Code review, static analysis, standards

### DevOps & Deployment

- **ci-cd-guide.md** - Continuous integration, deployment pipelines
- **deployment-guide.md** - Deployment strategies, rollbacks, monitoring
- **infrastructure-guide.md** - Infrastructure as code, scaling
- **monitoring-guide.md** - Application monitoring, logging, alerting

## Guide Standards

Each domain guide should include:

1. **Core Concepts** - Fundamental principles and patterns
2. **Best Practices** - Industry-standard approaches
3. **Common Patterns** - Reusable solutions and architectures
4. **Anti-Patterns** - What to avoid and why
5. **Tools & Libraries** - Recommended tools and integrations
6. **Security Considerations** - Domain-specific security concerns
7. **Performance** - Optimization and scaling strategies
8. **Troubleshooting** - Common issues and debugging approaches

## Trigger Keywords

Domain guides are automatically loaded when LLMs detect:

- **Database**: `database`, `sql`, `migration`, `query`, `orm`, `prisma`
- **API**: `api`, `rest`, `graphql`, `endpoint`, `webhook`, `integration`
- **Security**: `security`, `auth`, `encryption`, `validation`, `csrf`, `xss`
- **Performance**: `performance`, `optimization`, `cache`, `monitoring`
- **Testing**: `test`, `testing`, `e2e`, `unit`, `integration`, `mock`

## Cross-Domain Integration

Many guides will reference concepts from other domains:

- **API + Security**: Authentication patterns, rate limiting
- **Database + Performance**: Query optimization, indexing
- **Testing + Security**: Security testing, penetration testing
- **DevOps + Monitoring**: Deployment monitoring, health checks

## Contributing

When adding domain guides:

1. Use the [template](../_meta/template.md) as starting point
2. Follow [writing standards](../_meta/llm-writing-guide.md)
3. Add trigger keywords to [loading rules](../_meta/extra-guide.md)
4. Include cross-references to related domains
5. Provide framework-agnostic examples when possible
6. Test with multiple project types
7. Update this README

---

**Last Updated**: February 7, 2025  
**Version**: 1.0 (Organized structure)
