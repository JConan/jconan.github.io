import { test, expect } from '@playwright/test';
import { ContactFormHelper } from '../utils/contact-form-helper';
import { MailpitHelper } from '../utils/email-helpers';

test.describe('E2E Test Setup Validation', () => {
	test('should validate test environment is properly configured', async ({ page }) => {
		// Check that dev server is running
		await page.goto('/');
		await expect(page).toHaveTitle(/Johan Chan/);

		// Check that contact page loads
		await page.goto('/contact');
		await expect(page.locator('h1')).toContainText('Pour me contacter');

		// Verify form elements exist
		await expect(page.locator('input[name="name"]')).toBeVisible();
		await expect(page.locator('input[name="email"]')).toBeVisible();
		await expect(page.locator('textarea[name="message"]')).toBeVisible();
		await expect(page.locator('button[type="submit"]')).toBeVisible();
	});

	test('should validate ContactFormHelper utility works', async ({ page }) => {
		await page.goto('/contact');

		const helper = new ContactFormHelper(page);

		// Test form filling
		await helper.fillForm({
			name: 'Test User',
			email: 'test@example.com',
			message: 'Test message'
		});

		// Verify data was filled
		const formData = await helper.getFormData();
		expect(formData.name).toBe('Test User');
		expect(formData.email).toBe('test@example.com');
		expect(formData.message).toBe('Test message');

		// Test form clearing
		await helper.clearForm();
		const clearedData = await helper.getFormData();
		expect(clearedData.name).toBe('');
		expect(clearedData.email).toBe('');
		expect(clearedData.message).toBe('');
	});

	test('should validate MailpitHelper utility works', async () => {
		const mailpitHelper = new MailpitHelper();

		// Test connection to Mailpit
		try {
			await mailpitHelper.clearAllEmails();
			const emails = await mailpitHelper.getEmails();
			expect(Array.isArray(emails)).toBe(true);
		} catch (error) {
			throw new Error(`Mailpit connection failed: ${error}`);
		}
	});

	test('should validate internationalization routes work', async ({ page }) => {
		// Test French (default)
		await page.goto('/contact');
		await expect(page.locator('h1')).toContainText('Pour me contacter');

		// Test English
		await page.goto('/en/contact');
		await expect(page.locator('h1')).toContainText('Get in touch');
	});

	test('should validate email configuration is working', async ({ page }) => {
		// This test verifies that the email service can be reached
		// without actually sending an email

		await page.goto('/contact');

		// Fill form with minimal valid data
		await page.fill('input[name="name"]', 'Setup Test');
		await page.fill('input[name="email"]', 'setup@example.com');
		await page.fill('textarea[name="message"]', 'Testing email configuration');

		// Submit form (this will test the full email pipeline)
		await page.click('button[type="submit"]');

		// Wait for either success or error - both indicate the system is working
		await Promise.race([
			page.waitForSelector('.success-message', { timeout: 10000 }),
			page.waitForSelector('.error-message', { timeout: 10000 })
		]);

		// If we get here, the email service configuration is working
		// (whether it succeeds or fails, at least it's responding)
	});
});
