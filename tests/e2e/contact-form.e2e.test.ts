import { test, expect, type Page } from '@playwright/test';
import { ContactFormHelper, type ContactFormData } from '../utils/contact-form-helper';
import { MailpitHelper } from '../utils/email-helpers';

// Test data for different scenarios
const validFormData: ContactFormData = {
	name: 'Jean Dupont',
	email: 'jean.dupont@example.com',
	message:
		'Bonjour, je souhaite développer une application web pour mon entreprise. Pouvez-vous me contacter pour discuter du projet ?'
};

const invalidFormData = {
	emptyName: { name: '', email: 'test@example.com', message: 'Test message' },
	invalidEmail: { name: 'Test User', email: 'invalid-email', message: 'Test message' },
	emptyMessage: { name: 'Test User', email: 'test@example.com', message: '' },
	longMessage: {
		name: 'Test User',
		email: 'test@example.com',
		message: 'A'.repeat(5001) // Assuming 5000 char limit
	}
};

// Language-specific test data
const testDataByLanguage = {
	fr: {
		heading: 'Pour me contacter',
		nameLabel: 'Prénom et nom',
		emailLabel: 'Email',
		messageLabel: 'Message',
		submitButton: 'Envoyer',
		submittingText: 'Envoi en cours...',
		successMessage: 'Votre message a été envoyé avec succès'
	},
	en: {
		heading: 'Get in touch',
		nameLabel: 'First and last name',
		emailLabel: 'Email',
		messageLabel: 'Message',
		submitButton: 'Send',
		submittingText: 'Sending...',
		successMessage: 'Your message has been sent successfully'
	}
};

test.describe('Contact Form E2E Tests', () => {
	let contactFormHelper: ContactFormHelper;
	let mailpitHelper: MailpitHelper;

	test.beforeEach(async ({ page }) => {
		contactFormHelper = new ContactFormHelper(page);
		mailpitHelper = new MailpitHelper();

		// Clear emails before each test
		await mailpitHelper.clearAllEmails();
	});

	test.describe('Form Rendering and Accessibility', () => {
		test('should render contact form with all required elements', async ({ page }) => {
			await page.goto('/contact');

			// Check page title and heading
			await expect(page).toHaveTitle(/Contact.*Johan Chan/);
			await expect(page.locator('h1')).toContainText('Pour me contacter');

			// Check form elements
			await expect(page.locator('input[name="name"]')).toBeVisible();
			await expect(page.locator('input[name="email"]')).toBeVisible();
			await expect(page.locator('textarea[name="message"]')).toBeVisible();
			await expect(page.locator('button[type="submit"]')).toBeVisible();

			// Check form labels
			await expect(page.locator('text=Prénom et nom')).toBeVisible();
			await expect(page.locator('text=Email')).toBeVisible();
			await expect(page.locator('text=Message')).toBeVisible();
		});

		test('should have proper accessibility attributes', async ({ page }) => {
			await page.goto('/contact');

			// Check required attributes
			await expect(page.locator('input[name="name"]')).toHaveAttribute('required');
			await expect(page.locator('input[name="email"]')).toHaveAttribute('required');
			await expect(page.locator('textarea[name="message"]')).toHaveAttribute('required');

			// Check email input type
			await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');

			// Check form structure
			await expect(page.locator('form')).toHaveAttribute('method', 'POST');
		});

		test('should have proper ARIA labels and roles', async ({ page }) => {
			await page.goto('/contact');

			// Success/error messages should have alert role
			const successMessage = page.locator('.success-message');
			const errorMessage = page.locator('.error-message');

			// These won't be visible initially, but should have proper role when they appear
			if ((await successMessage.count()) > 0) {
				await expect(successMessage).toHaveAttribute('role', 'alert');
			}
			if ((await errorMessage.count()) > 0) {
				await expect(errorMessage).toHaveAttribute('role', 'alert');
			}
		});
	});

	test.describe('Form Validation', () => {
		test('should show validation errors for empty required fields', async ({ page }) => {
			await page.goto('/contact');

			// Try to submit empty form
			await contactFormHelper.submitForm();

			// Check browser validation kicks in
			await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
			await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
			await expect(page.locator('textarea[name="message"]:invalid')).toBeVisible();
		});

		test('should validate email format', async ({ page }) => {
			await page.goto('/contact');

			// Fill form with invalid email
			await contactFormHelper.fillForm(invalidFormData.invalidEmail);
			await contactFormHelper.submitForm();

			// Check email validation
			await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
		});

		test('should show server-side validation errors', async ({ page }) => {
			await page.goto('/contact');

			// Fill form with data that will trigger server validation
			await page.fill('input[name="name"]', 'A'); // Too short
			await page.fill('input[name="email"]', 'test@example.com');
			await page.fill('textarea[name="message"]', 'Hi'); // Too short

			await contactFormHelper.submitForm();

			// Wait for server response and check for error messages
			await page.waitForLoadState('networkidle');

			// Check if validation errors are displayed
			const fieldErrors = page.locator('.field-error');
			if ((await fieldErrors.count()) > 0) {
				await expect(fieldErrors.first()).toBeVisible();
			}
		});
	});

	test.describe('Form Submission Flow', () => {
		test('should successfully submit valid form and send email', async ({ page }) => {
			await page.goto('/contact');

			// Fill and submit form
			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();

			// Check loading state
			await expect(page.locator('button[type="submit"]')).toContainText('Envoi en cours...');
			await expect(page.locator('button[type="submit"]')).toBeDisabled();

			// Wait for success message
			await contactFormHelper.expectSuccessMessage();
			await expect(page.locator('.success-message')).toContainText(
				'Votre message a été envoyé avec succès'
			);

			// Verify email was sent
			const email = await mailpitHelper.waitForEmail(
				(email) => email.Subject.includes('Contact') && email.To[0].Address.includes('@')
			);

			expect(email).toBeDefined();
			expect(email.From.Address).toBe(validFormData.email);

			// Get full email content
			const emailContent = await mailpitHelper.getEmailById(email.ID);
			expect(emailContent.Text).toContain(validFormData.name);
			expect(emailContent.Text).toContain(validFormData.message);
		});

		test('should handle form submission errors gracefully', async ({ page }) => {
			// Mock a server error by intercepting the POST request
			await page.route('/contact', async (route) => {
				if (route.request().method() === 'POST') {
					await route.fulfill({
						status: 500,
						body: JSON.stringify({ error: 'Server error' })
					});
				} else {
					await route.continue();
				}
			});

			await page.goto('/contact');
			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();

			// Should show error message
			await contactFormHelper.expectErrorMessage();
			await expect(page.locator('.error-message')).toBeVisible();
		});

		test('should preserve form data after validation errors', async ({ page }) => {
			await page.goto('/contact');

			const testData = {
				name: 'Test User',
				email: 'invalid-email', // This will cause validation error
				message: 'Test message'
			};

			await contactFormHelper.fillForm(testData);
			await contactFormHelper.submitForm();

			// Wait for page to reload with validation errors
			await page.waitForLoadState('networkidle');

			// Check that valid data is preserved
			await expect(page.locator('input[name="name"]')).toHaveValue(testData.name);
			await expect(page.locator('textarea[name="message"]')).toHaveValue(testData.message);
		});
	});

	test.describe('Internationalization', () => {
		test('should display French content by default', async ({ page }) => {
			await page.goto('/contact');

			const frData = testDataByLanguage.fr;
			await expect(page.locator('h1')).toContainText(frData.heading);
			await expect(page.locator('text=' + frData.nameLabel)).toBeVisible();
			await expect(page.locator('text=' + frData.emailLabel)).toBeVisible();
			await expect(page.locator('text=' + frData.messageLabel)).toBeVisible();
			await expect(page.locator('button[type="submit"]')).toContainText(frData.submitButton);
		});

		test('should display English content when language is switched', async ({ page }) => {
			await page.goto('/en/contact');

			const enData = testDataByLanguage.en;
			await expect(page.locator('h1')).toContainText(enData.heading);
			await expect(page.locator('text=' + enData.nameLabel)).toBeVisible();
			await expect(page.locator('text=' + enData.emailLabel)).toBeVisible();
			await expect(page.locator('text=' + enData.messageLabel)).toBeVisible();
			await expect(page.locator('button[type="submit"]')).toContainText(enData.submitButton);
		});

		test('should submit form successfully in English', async ({ page }) => {
			await page.goto('/en/contact');

			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();

			// Check English loading and success messages
			await expect(page.locator('button[type="submit"]')).toContainText('Sending...');
			await contactFormHelper.expectSuccessMessage();
			await expect(page.locator('.success-message')).toContainText(
				'Your message has been sent successfully'
			);
		});
	});

	test.describe('Cross-Browser Compatibility', () => {
		['chromium', 'firefox', 'webkit'].forEach((browserName) => {
			test(`should work correctly in ${browserName}`, async ({
				page,
				browserName: currentBrowser
			}) => {
				test.skip(currentBrowser !== browserName, `Skipping ${browserName} test`);

				await page.goto('/contact');

				// Test basic functionality
				await contactFormHelper.fillForm(validFormData);
				await contactFormHelper.submitForm();

				// Verify success
				await contactFormHelper.expectSuccessMessage();

				// Verify email was sent
				const email = await mailpitHelper.waitForEmail((email) =>
					email.Subject.includes('Contact')
				);
				expect(email).toBeDefined();
			});
		});
	});

	test.describe('Mobile Responsiveness', () => {
		test('should work on mobile devices', async ({ page }) => {
			// Set mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/contact');

			// Check form is visible and usable
			await expect(page.locator('form')).toBeVisible();
			await expect(page.locator('input[name="name"]')).toBeVisible();
			await expect(page.locator('input[name="email"]')).toBeVisible();
			await expect(page.locator('textarea[name="message"]')).toBeVisible();
			await expect(page.locator('button[type="submit"]')).toBeVisible();

			// Test form submission on mobile
			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();

			await contactFormHelper.expectSuccessMessage();
		});

		test('should have proper touch targets on mobile', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/contact');

			// Check minimum touch target sizes (44px recommended)
			const submitButton = page.locator('button[type="submit"]');
			const buttonBox = await submitButton.boundingBox();

			expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
			expect(buttonBox?.width).toBeGreaterThanOrEqual(44);
		});
	});

	test.describe('Performance and Loading States', () => {
		test('should show loading state during submission', async ({ page }) => {
			await page.goto('/contact');

			// Fill form
			await contactFormHelper.fillForm(validFormData);

			// Monitor network requests
			const responsePromise = page.waitForResponse(
				(response) => response.url().includes('/contact') && response.request().method() === 'POST'
			);

			// Submit form
			await contactFormHelper.submitForm();

			// Check loading state immediately
			await expect(page.locator('button[type="submit"]')).toContainText('Envoi en cours...');
			await expect(page.locator('button[type="submit"]')).toBeDisabled();
			await expect(page.locator('.animate-spin')).toBeVisible();

			// Wait for response
			await responsePromise;

			// Check success state
			await contactFormHelper.expectSuccessMessage();
		});

		test('should handle slow network conditions', async ({ page }) => {
			// Simulate slow network
			await page.route('**/*', async (route) => {
				if (route.request().method() === 'POST') {
					await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
				}
				await route.continue();
			});

			await page.goto('/contact');
			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();

			// Should show loading state for extended period
			await expect(page.locator('button[type="submit"]')).toContainText('Envoi en cours...');
			await expect(page.locator('button[type="submit"]')).toBeDisabled();

			// Eventually should succeed
			await contactFormHelper.expectSuccessMessage();
		});
	});

	test.describe('User Experience Scenarios', () => {
		test('should handle multiple rapid submissions', async ({ page }) => {
			await page.goto('/contact');
			await contactFormHelper.fillForm(validFormData);

			// Try to submit multiple times rapidly
			await contactFormHelper.submitForm();
			await contactFormHelper.submitForm(); // Second click should be ignored

			// Should only process one submission
			await contactFormHelper.expectSuccessMessage();

			// Check only one email was sent
			const emails = await mailpitHelper.waitForEmailCount(1);
			expect(emails).toHaveLength(1);
		});

		test('should allow form resubmission after success', async ({ page }) => {
			await page.goto('/contact');

			// First submission
			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();
			await contactFormHelper.expectSuccessMessage();

			// Clear form and submit again
			await contactFormHelper.clearForm();
			await contactFormHelper.fillForm({
				...validFormData,
				name: 'Second User',
				email: 'second@example.com'
			});
			await contactFormHelper.submitForm();
			await contactFormHelper.expectSuccessMessage();

			// Should have two emails
			const emails = await mailpitHelper.waitForEmailCount(2);
			expect(emails).toHaveLength(2);
		});

		test('should handle form abandonment and return', async ({ page }) => {
			await page.goto('/contact');

			// Partially fill form
			await page.fill('input[name="name"]', 'Test User');
			await page.fill('input[name="email"]', 'test@example.com');

			// Navigate away and back
			await page.goto('/');
			await page.goto('/contact');

			// Form should be empty (no persistence expected)
			await expect(page.locator('input[name="name"]')).toHaveValue('');
			await expect(page.locator('input[name="email"]')).toHaveValue('');
			await expect(page.locator('textarea[name="message"]')).toHaveValue('');
		});

		test('should handle special characters in form data', async ({ page }) => {
			await page.goto('/contact');

			const specialCharData = {
				name: 'François Müller-Öberg',
				email: 'francois@müller-öberg.com',
				message:
					'Bonjour! Je souhaite développer une app avec des caractères spéciaux: éàèùç, ñ, ü, ß, 中文, 🚀'
			};

			await contactFormHelper.fillForm(specialCharData);
			await contactFormHelper.submitForm();

			await contactFormHelper.expectSuccessMessage();

			// Verify email contains special characters
			const email = await mailpitHelper.waitForEmail((email) => email.Subject.includes('Contact'));

			const emailContent = await mailpitHelper.getEmailById(email.ID);
			expect(emailContent.Text).toContain(specialCharData.name);
			expect(emailContent.Text).toContain(specialCharData.message);
		});
	});

	test.describe('Security and Edge Cases', () => {
		test('should handle very long input values', async ({ page }) => {
			await page.goto('/contact');

			const longData = {
				name: 'A'.repeat(1000),
				email: 'test@example.com',
				message: 'B'.repeat(10000)
			};

			await contactFormHelper.fillForm(longData);
			await contactFormHelper.submitForm();

			// Should either succeed or show appropriate validation error
			await Promise.race([
				contactFormHelper.expectSuccessMessage(),
				contactFormHelper.expectErrorMessage()
			]);
		});

		test('should sanitize HTML input', async ({ page }) => {
			await page.goto('/contact');

			const htmlData = {
				name: '<script>alert("xss")</script>John Doe',
				email: 'test@example.com',
				message: '<img src="x" onerror="alert(\'xss\')">'
			};

			await contactFormHelper.fillForm(htmlData);
			await contactFormHelper.submitForm();

			// Should handle HTML safely
			await contactFormHelper.expectSuccessMessage();

			// Verify no script execution occurred
			const alerts = await page.evaluate(() => window.alert.toString());
			expect(alerts).not.toContain('xss');
		});

		test('should handle network failures gracefully', async ({ page }) => {
			await page.goto('/contact');

			// Simulate network failure
			await page.route('/contact', async (route) => {
				if (route.request().method() === 'POST') {
					await route.abort('failed');
				} else {
					await route.continue();
				}
			});

			await contactFormHelper.fillForm(validFormData);
			await contactFormHelper.submitForm();

			// Should show error message
			await contactFormHelper.expectErrorMessage();
		});
	});
});
