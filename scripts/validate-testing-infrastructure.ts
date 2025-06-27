#!/usr/bin/env tsx

/**
 * Comprehensive Test Infrastructure Validation Script
 *
 * This script validates that all testing infrastructure is properly set up
 * and runs sample tests from each layer to ensure everything works correctly.
 */

import { execSync, spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// ANSI color codes for console output
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m'
};

interface ValidationResult {
	name: string;
	status: 'pass' | 'fail' | 'warning';
	message: string;
	details?: string;
}

class TestingInfrastructureValidator {
	private results: ValidationResult[] = [];
	private readonly requiredFiles = [
		'package.json',
		'vitest.config.ts',
		'vitest.integration.config.ts',
		'playwright.config.ts',
		'tests/setup/vitest.setup.ts',
		'tests/setup/integration.setup.ts',
		'tests/setup/playwright.setup.ts',
		'tests/utils/email-helpers.ts'
	];

	private readonly requiredDirectories = [
		'tests/unit',
		'tests/integration',
		'tests/e2e',
		'tests/performance',
		'tests/setup',
		'tests/utils'
	];

	private readonly requiredDependencies = [
		'vitest',
		'@playwright/test',
		'@types/k6',
		'jsdom',
		'@vitest/coverage-v8',
		'@vitest/ui'
	];

	constructor() {
		console.log(
			`${colors.cyan}${colors.bright}🧪 Testing Infrastructure Validation${colors.reset}\n`
		);
	}

	async validate(): Promise<void> {
		try {
			await this.validateFileStructure();
			await this.validateDependencies();
			await this.validateConfiguration();
			await this.validateServices();
			await this.runSampleTests();

			this.printSummary();
		} catch (error) {
			this.addResult('validation-error', 'fail', `Validation failed: ${error}`);
			this.printSummary();
			process.exit(1);
		}
	}

	private async validateFileStructure(): Promise<void> {
		console.log(`${colors.blue}📁 Validating file structure...${colors.reset}`);

		// Check required files
		for (const file of this.requiredFiles) {
			if (existsSync(file)) {
				this.addResult(`file-${file}`, 'pass', `Required file exists: ${file}`);
			} else {
				this.addResult(`file-${file}`, 'fail', `Missing required file: ${file}`);
			}
		}

		// Check required directories
		for (const dir of this.requiredDirectories) {
			if (existsSync(dir)) {
				this.addResult(`dir-${dir}`, 'pass', `Required directory exists: ${dir}`);
			} else {
				this.addResult(`dir-${dir}`, 'fail', `Missing required directory: ${dir}`);
			}
		}

		// Check test files exist
		const testFiles = [
			'tests/unit/example.test.ts',
			'tests/integration/contact-form-email.test.ts',
			'tests/e2e/contact-form.e2e.test.ts',
			'tests/performance/contact-form.js'
		];

		for (const testFile of testFiles) {
			if (existsSync(testFile)) {
				this.addResult(`testfile-${testFile}`, 'pass', `Test file exists: ${testFile}`);
			} else {
				this.addResult(`testfile-${testFile}`, 'warning', `Test file missing: ${testFile}`);
			}
		}
	}

	private async validateDependencies(): Promise<void> {
		console.log(`${colors.blue}📦 Validating dependencies...${colors.reset}`);

		try {
			const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
			const allDeps = {
				...packageJson.dependencies,
				...packageJson.devDependencies
			};

			for (const dep of this.requiredDependencies) {
				if (allDeps[dep]) {
					this.addResult(`dep-${dep}`, 'pass', `Dependency installed: ${dep}@${allDeps[dep]}`);
				} else {
					this.addResult(`dep-${dep}`, 'fail', `Missing dependency: ${dep}`);
				}
			}

			// Check for k6 binary
			try {
				execSync('k6 version', { stdio: 'pipe' });
				this.addResult('k6-binary', 'pass', 'k6 binary is available');
			} catch {
				this.addResult('k6-binary', 'warning', 'k6 binary not found - performance tests may fail');
			}

			// Check for Docker
			try {
				execSync('docker --version', { stdio: 'pipe' });
				this.addResult('docker', 'pass', 'Docker is available');
			} catch {
				this.addResult('docker', 'fail', 'Docker not found - required for Mailpit');
			}
		} catch (error) {
			this.addResult('package-json', 'fail', `Failed to read package.json: ${error}`);
		}
	}

	private async validateConfiguration(): Promise<void> {
		console.log(`${colors.blue}⚙️  Validating configuration files...${colors.reset}`);

		// Validate Vitest config
		try {
			const vitestConfig = readFileSync('vitest.config.ts', 'utf-8');
			if (vitestConfig.includes('jsdom') && vitestConfig.includes('coverage')) {
				this.addResult('vitest-config', 'pass', 'Vitest configuration is valid');
			} else {
				this.addResult('vitest-config', 'warning', 'Vitest configuration may be incomplete');
			}
		} catch (error) {
			this.addResult('vitest-config', 'fail', `Failed to validate Vitest config: ${error}`);
		}

		// Validate Playwright config
		try {
			const playwrightConfig = readFileSync('playwright.config.ts', 'utf-8');
			if (playwrightConfig.includes('webServer') && playwrightConfig.includes('projects')) {
				this.addResult('playwright-config', 'pass', 'Playwright configuration is valid');
			} else {
				this.addResult(
					'playwright-config',
					'warning',
					'Playwright configuration may be incomplete'
				);
			}
		} catch (error) {
			this.addResult('playwright-config', 'fail', `Failed to validate Playwright config: ${error}`);
		}

		// Check package.json scripts
		try {
			const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
			const requiredScripts = [
				'test:unit',
				'test:integration',
				'test:e2e',
				'test:performance',
				'test:all',
				'mailpit:start',
				'mailpit:stop'
			];

			for (const script of requiredScripts) {
				if (packageJson.scripts[script]) {
					this.addResult(`script-${script}`, 'pass', `Script exists: ${script}`);
				} else {
					this.addResult(`script-${script}`, 'fail', `Missing script: ${script}`);
				}
			}
		} catch (error) {
			this.addResult('package-scripts', 'fail', `Failed to validate package scripts: ${error}`);
		}
	}

	private async validateServices(): Promise<void> {
		console.log(`${colors.blue}🔧 Validating services...${colors.reset}`);

		// Check if Mailpit is running
		try {
			const response = await fetch('http://localhost:8025/api/v1/info');
			if (response.ok) {
				this.addResult('mailpit-service', 'pass', 'Mailpit service is running');
			} else {
				this.addResult('mailpit-service', 'warning', 'Mailpit service not responding correctly');
			}
		} catch (error) {
			this.addResult(
				'mailpit-service',
				'warning',
				'Mailpit service not running - will start automatically during tests'
			);
		}

		// Check development server port availability
		try {
			const response = await fetch('http://localhost:5173');
			this.addResult('dev-server', 'warning', 'Development server is running on port 5173');
		} catch (error) {
			this.addResult('dev-server', 'pass', 'Port 5173 is available for development server');
		}
	}

	private async runSampleTests(): Promise<void> {
		console.log(`${colors.blue}🧪 Running sample tests from each layer...${colors.reset}`);

		// Unit test sample
		try {
			console.log(`${colors.yellow}  Running unit test sample...${colors.reset}`);
			execSync('pnpm test:unit --run --reporter=basic tests/unit/example.test.ts', {
				stdio: 'pipe',
				timeout: 30000
			});
			this.addResult('unit-test-sample', 'pass', 'Unit test sample passed');
		} catch (error) {
			this.addResult('unit-test-sample', 'fail', `Unit test sample failed: ${error}`);
		}

		// Integration test sample (if Mailpit is available)
		const mailpitResult = this.results.find((r) => r.name === 'mailpit-service');
		if (mailpitResult?.status === 'pass') {
			try {
				console.log(`${colors.yellow}  Running integration test sample...${colors.reset}`);
				execSync('pnpm test:integration --run --reporter=basic', {
					stdio: 'pipe',
					timeout: 60000
				});
				this.addResult('integration-test-sample', 'pass', 'Integration test sample passed');
			} catch (error) {
				this.addResult(
					'integration-test-sample',
					'warning',
					`Integration test sample failed: ${error}`
				);
			}
		} else {
			this.addResult(
				'integration-test-sample',
				'warning',
				'Skipped integration test - Mailpit not available'
			);
		}

		// E2E test validation (check if browsers are installed)
		try {
			console.log(`${colors.yellow}  Validating E2E test setup...${colors.reset}`);
			execSync('pnpm exec playwright install --dry-run', { stdio: 'pipe' });
			this.addResult('e2e-test-setup', 'pass', 'E2E test setup is valid');
		} catch (error) {
			this.addResult('e2e-test-setup', 'warning', `E2E test setup needs attention: ${error}`);
		}

		// Performance test validation
		if (this.results.find((r) => r.name === 'k6-binary')?.status === 'pass') {
			try {
				console.log(`${colors.yellow}  Validating performance test...${colors.reset}`);
				execSync('k6 run --vus 1 --duration 5s tests/performance/contact-form.js', {
					stdio: 'pipe',
					timeout: 15000
				});
				this.addResult('performance-test-sample', 'pass', 'Performance test sample passed');
			} catch (error) {
				this.addResult(
					'performance-test-sample',
					'warning',
					`Performance test sample failed: ${error}`
				);
			}
		} else {
			this.addResult(
				'performance-test-sample',
				'warning',
				'Skipped performance test - k6 not available'
			);
		}
	}

	private addResult(
		name: string,
		status: 'pass' | 'fail' | 'warning',
		message: string,
		details?: string
	): void {
		this.results.push({ name, status, message, details });

		const statusColor =
			status === 'pass' ? colors.green : status === 'fail' ? colors.red : colors.yellow;
		const statusIcon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';

		console.log(`  ${statusIcon} ${statusColor}${message}${colors.reset}`);
		if (details) {
			console.log(`     ${colors.cyan}${details}${colors.reset}`);
		}
	}

	private printSummary(): void {
		console.log(`\n${colors.cyan}${colors.bright}📊 Validation Summary${colors.reset}\n`);

		const passed = this.results.filter((r) => r.status === 'pass').length;
		const failed = this.results.filter((r) => r.status === 'fail').length;
		const warnings = this.results.filter((r) => r.status === 'warning').length;
		const total = this.results.length;

		console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
		console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
		console.log(`${colors.yellow}⚠️  Warnings: ${warnings}${colors.reset}`);
		console.log(`📊 Total: ${total}\n`);

		// Print failed items
		if (failed > 0) {
			console.log(`${colors.red}${colors.bright}❌ Failed Items:${colors.reset}`);
			this.results
				.filter((r) => r.status === 'fail')
				.forEach((r) => console.log(`  • ${r.message}`));
			console.log();
		}

		// Print warnings
		if (warnings > 0) {
			console.log(`${colors.yellow}${colors.bright}⚠️  Warnings:${colors.reset}`);
			this.results
				.filter((r) => r.status === 'warning')
				.forEach((r) => console.log(`  • ${r.message}`));
			console.log();
		}

		// Overall status
		if (failed === 0) {
			console.log(
				`${colors.green}${colors.bright}🎉 Testing infrastructure is ready!${colors.reset}\n`
			);

			console.log(`${colors.cyan}Next steps:${colors.reset}`);
			console.log(`  • Run ${colors.bright}pnpm test:all${colors.reset} to execute all tests`);
			console.log(
				`  • Run ${colors.bright}pnpm test:unit:coverage${colors.reset} to check coverage`
			);
			console.log(
				`  • Run ${colors.bright}pnpm test:e2e:ui${colors.reset} for interactive E2E testing`
			);
			console.log(
				`  • Check ${colors.bright}docs/TESTING.md${colors.reset} for detailed documentation\n`
			);
		} else {
			console.log(
				`${colors.red}${colors.bright}❌ Testing infrastructure needs attention!${colors.reset}\n`
			);

			console.log(`${colors.cyan}Recommended fixes:${colors.reset}`);
			console.log(`  • Install missing dependencies: ${colors.bright}pnpm install${colors.reset}`);
			console.log(
				`  • Install Playwright browsers: ${colors.bright}pnpm exec playwright install${colors.reset}`
			);
			console.log(`  • Install k6: ${colors.bright}brew install k6${colors.reset} (macOS)`);
			console.log(`  • Start Mailpit: ${colors.bright}pnpm mailpit:start${colors.reset}`);
			console.log(`  • Check ${colors.bright}docs/TESTING.md${colors.reset} for troubleshooting\n`);

			process.exit(1);
		}
	}
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const validator = new TestingInfrastructureValidator();
	validator.validate();
}

export { TestingInfrastructureValidator };
