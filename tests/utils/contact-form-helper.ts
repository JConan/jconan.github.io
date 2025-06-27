import type { Page, expect } from '@playwright/test';

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export class ContactFormHelper {
	constructor(private page: Page) {}

	async fillForm(data: ContactFormData): Promise<void> {
		await this.page.fill('input[name="name"]', data.name);
		await this.page.fill('input[name="email"]', data.email);
		await this.page.fill('textarea[name="message"]', data.message);
	}

	async submitForm(): Promise<void> {
		await this.page.click('button[type="submit"]');
	}

	async expectSuccessMessage(): Promise<void> {
		await this.page.waitForSelector('.success-message', { timeout: 10000 });
	}

	async expectErrorMessage(message?: string): Promise<void> {
		await this.page.waitForSelector('.error-message', { timeout: 5000 });

		if (message) {
			await this.page.locator('.error-message').filter({ hasText: message }).first().waitFor();
		}
	}

	async expectValidationError(field: string): Promise<void> {
		await this.page.waitForSelector(`[name="${field}"]:invalid`, { timeout: 5000 });
	}

	async getFormData(): Promise<ContactFormData> {
		return {
			name: await this.page.inputValue('input[name="name"]'),
			email: await this.page.inputValue('input[name="email"]'),
			message: await this.page.inputValue('textarea[name="message"]')
		};
	}

	async clearForm(): Promise<void> {
		await this.page.fill('input[name="name"]', '');
		await this.page.fill('input[name="email"]', '');
		await this.page.fill('textarea[name="message"]', '');
	}

	async expectSubmittingState(): Promise<void> {
		// Wait for submitting state to appear
		await this.page.waitForSelector('button[type="submit"]:disabled', { timeout: 5000 });
		await this.page.waitForSelector('.animate-spin', { timeout: 5000 });
	}

	async expectFormEnabled(): Promise<void> {
		// Wait for form to be enabled again
		await this.page.waitForSelector('button[type="submit"]:not([disabled])', { timeout: 10000 });
	}

	async fillPartialForm(data: Partial<ContactFormData>): Promise<void> {
		if (data.name !== undefined) {
			await this.page.fill('input[name="name"]', data.name);
		}
		if (data.email !== undefined) {
			await this.page.fill('input[name="email"]', data.email);
		}
		if (data.message !== undefined) {
			await this.page.fill('textarea[name="message"]', data.message);
		}
	}

	async expectFieldError(field: string, errorMessage?: string): Promise<void> {
		const errorSelector = `input[name="${field}"] + .field-error, textarea[name="${field}"] + .field-error`;
		await this.page.waitForSelector(errorSelector, { timeout: 5000 });

		if (errorMessage) {
			await this.page.locator(errorSelector).filter({ hasText: errorMessage }).first().waitFor();
		}
	}

	async getSubmitButtonText(): Promise<string> {
		return (await this.page.locator('button[type="submit"]').textContent()) || '';
	}

	async isSubmitButtonDisabled(): Promise<boolean> {
		return await this.page.locator('button[type="submit"]').isDisabled();
	}

	async waitForNetworkIdle(): Promise<void> {
		await this.page.waitForLoadState('networkidle');
	}

	async expectFormPersistence(expectedData: ContactFormData): Promise<void> {
		const actualData = await this.getFormData();
		if (actualData.name !== expectedData.name) {
			throw new Error(`Expected name "${expectedData.name}", got "${actualData.name}"`);
		}
		if (actualData.email !== expectedData.email) {
			throw new Error(`Expected email "${expectedData.email}", got "${actualData.email}"`);
		}
		if (actualData.message !== expectedData.message) {
			throw new Error(`Expected message "${expectedData.message}", got "${actualData.message}"`);
		}
	}

	async expectFormCleared(): Promise<void> {
		const data = await this.getFormData();
		if (data.name || data.email || data.message) {
			throw new Error('Form should be cleared but contains data');
		}
	}
}
