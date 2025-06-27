// Import comprehensive contact form E2E tests
import './contact-form.e2e.test';

// Basic smoke test for homepage
import { expect, test } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page).toHaveTitle(/Johan Chan/);
});
