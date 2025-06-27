import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
	// Ensure Mailpit is running
	try {
		const response = await fetch('http://localhost:8025/api/v1/info');
		if (!response.ok) {
			throw new Error('Mailpit not accessible');
		}
		console.log('✅ Mailpit is ready for E2E tests');
	} catch (error) {
		console.error('❌ Mailpit setup failed for E2E tests');
		throw error;
	}

	// Clear any existing emails
	try {
		await fetch('http://localhost:8025/api/v1/messages', {
			method: 'DELETE'
		});
		console.log('✅ Mailpit emails cleared');
	} catch (error) {
		console.warn('Warning: Could not clear Mailpit emails');
	}

	// Warm up the application
	const browser = await chromium.launch();
	const page = await browser.newPage();

	try {
		await page.goto('http://localhost:5173');
		await page.waitForLoadState('networkidle');
		console.log('✅ Application warmed up');
	} catch (error) {
		console.error('❌ Application warmup failed');
		throw error;
	} finally {
		await browser.close();
	}
}

export default globalSetup;
