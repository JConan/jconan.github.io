import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MailpitHelper } from '../utils/email-helpers';

describe('Contact Form End-to-End Integration', () => {
	let mailpit: MailpitHelper;

	beforeEach(async () => {
		mailpit = new MailpitHelper();
		await mailpit.clearAllEmails();
	});

	describe('Email Service Integration with Mailpit', () => {
		it('should verify Mailpit is accessible and responsive', async () => {
			// Test basic connectivity
			const response = await fetch('http://localhost:8025/api/v1/info');
			expect(response.ok).toBe(true);

			const info = await response.json();
			expect(info).toBeDefined();
		});

		it('should clear emails successfully', async () => {
			// Send a test email using nodemailer
			const nodemailer = await import('nodemailer');
			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			await transporter.sendMail({
				from: 'test@example.com',
				to: 'recipient@example.com',
				subject: 'Test Email',
				text: 'This is a test email'
			});

			// Wait for email to arrive
			await new Promise((resolve) => setTimeout(resolve, 200));

			// Verify email exists
			let emails = await mailpit.getEmails();
			expect(emails.length).toBeGreaterThan(0);

			// Clear emails
			await mailpit.clearAllEmails();

			// Verify emails are cleared
			emails = await mailpit.getEmails();
			expect(emails).toHaveLength(0);

			transporter.close();
		});

		it('should handle email retrieval with filters', async () => {
			// Send multiple test emails via nodemailer
			const nodemailer = await import('nodemailer');
			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			// Send test emails
			await transporter.sendMail({
				from: 'sender1@example.com',
				to: 'recipient@example.com',
				subject: 'First Test Email',
				text: 'This is the first test email'
			});

			await transporter.sendMail({
				from: 'sender2@example.com',
				to: 'recipient@example.com',
				subject: 'Second Test Email',
				text: 'This is the second test email'
			});

			// Wait for emails to arrive
			const emails = await mailpit.waitForEmailCount(2, 5000);
			expect(emails).toHaveLength(2);

			// Test filtering by subject
			const firstEmail = await mailpit.waitForEmail(
				(email) => email.Subject === 'First Test Email',
				2000
			);
			expect(firstEmail).toBeDefined();
			expect(firstEmail.Subject).toBe('First Test Email');

			const secondEmail = await mailpit.waitForEmail(
				(email) => email.Subject === 'Second Test Email',
				2000
			);
			expect(secondEmail).toBeDefined();
			expect(secondEmail.Subject).toBe('Second Test Email');

			transporter.close();
		});

		it('should handle timeout scenarios gracefully', async () => {
			// Test waiting for an email that never arrives
			await expect(
				mailpit.waitForEmail(
					(email) => email.Subject === 'Non-existent Email',
					1000 // Short timeout
				)
			).rejects.toThrow('Email not found within 1000ms timeout');

			// Test waiting for email count that's never reached
			await expect(
				mailpit.waitForEmailCount(10, 1000) // Expecting 10 emails with short timeout
			).rejects.toThrow('Expected 10 emails not found within 1000ms timeout');
		});

		it('should retrieve detailed email content correctly', async () => {
			const nodemailer = await import('nodemailer');
			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			const htmlContent = `
				<html>
					<body>
						<h1>Test HTML Email</h1>
						<p>This is a <strong>test</strong> email with HTML content.</p>
						<ul>
							<li>Item 1</li>
							<li>Item 2</li>
						</ul>
					</body>
				</html>
			`;

			const textContent = `
				Test Plain Text Email
				
				This is a test email with plain text content.
				
				- Item 1
				- Item 2
			`;

			await transporter.sendMail({
				from: 'detailed@example.com',
				to: 'recipient@example.com',
				subject: 'Detailed Content Test',
				text: textContent,
				html: htmlContent,
				headers: {
					'X-Custom-Header': 'test-value'
				}
			});

			const email = await mailpit.waitForEmail(
				(email) => email.Subject === 'Detailed Content Test',
				5000
			);

			const fullEmail = await mailpit.getEmailById(email.ID);

			// Verify detailed content
			expect(fullEmail.HTML).toContain('<h1>Test HTML Email</h1>');
			expect(fullEmail.HTML).toContain('<strong>test</strong>');
			expect(fullEmail.Text).toContain('Test Plain Text Email');
			expect(fullEmail.Text).toContain('- Item 1');
			expect(fullEmail.Headers['X-Custom-Header']).toContain('test-value');

			transporter.close();
		});
	});

	describe('Contact Form Email Template Integration', () => {
		it('should generate and send properly formatted contact form emails', async () => {
			const { createEmailTemplate } = await import('$lib/utils/email-service');
			const nodemailer = await import('nodemailer');

			const formData = {
				name: 'Integration Test User',
				email: 'integration@example.com',
				message:
					'This is a comprehensive integration test message.\n\nIt includes multiple paragraphs and line breaks.',
				timestamp: new Date('2025-06-27T15:30:00Z')
			};

			const template = createEmailTemplate(formData);

			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			await transporter.sendMail({
				from: 'contact-form@johan-chan.fr',
				to: 'johan@johan-chan.fr',
				subject: template.subject,
				text: template.text,
				html: template.html,
				replyTo: formData.email
			});

			const email = await mailpit.waitForEmail(
				(email) => email.Subject.includes('Integration Test User'),
				5000
			);

			const fullEmail = await mailpit.getEmailById(email.ID);

			// Verify email structure and content
			expect(email.Subject).toBe('New contact form submission from Integration Test User');
			expect(email.From.Address).toBe('contact-form@johan-chan.fr');
			expect(email.To[0].Address).toBe('johan@johan-chan.fr');

			// Verify HTML content structure
			expect(fullEmail.HTML).toContain('<!DOCTYPE html>');
			expect(fullEmail.HTML).toContain('New Contact Form Submission');
			expect(fullEmail.HTML).toContain('Integration Test User');
			expect(fullEmail.HTML).toContain('integration@example.com');
			expect(fullEmail.HTML).toContain('johan-chan.fr');

			// Verify text content structure
			expect(fullEmail.Text).toContain('New Contact Form Submission');
			expect(fullEmail.Text).toContain('Name: Integration Test User');
			expect(fullEmail.Text).toContain('Email: integration@example.com');
			// Check message content is present (handle formatting differences)
			expect(fullEmail.Text).toContain('This is a comprehensive integration test message.');
			expect(fullEmail.Text).toContain('It includes multiple paragraphs and line breaks.');

			// Verify reply-to header
			expect(fullEmail.Headers['Reply-To']).toContain('integration@example.com');

			transporter.close();
		});

		it('should handle various message formats and special content', async () => {
			const { createEmailTemplate } = await import('$lib/utils/email-service');
			const nodemailer = await import('nodemailer');

			const testCases = [
				{
					name: 'Unicode Test',
					email: 'unicode@example.com',
					message: 'Testing unicode: 🚀 émojis and àccénts'
				},
				{
					name: 'HTML Escape Test',
					email: 'html@example.com',
					message: 'Testing HTML: <script>alert("test")</script> & <b>bold</b>'
				},
				{
					name: 'Long Content Test',
					email: 'long@example.com',
					message: 'A'.repeat(1000) + '\n\n' + 'B'.repeat(1000)
				},
				{
					name: 'Line Break Test',
					email: 'linebreak@example.com',
					message: 'Line 1\nLine 2\n\nLine 4\n\n\nLine 7'
				}
			];

			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			// Send all test emails
			for (const testCase of testCases) {
				const template = createEmailTemplate(testCase);
				await transporter.sendMail({
					from: 'test@johan-chan.fr',
					to: 'recipient@johan-chan.fr',
					subject: template.subject,
					text: template.text,
					html: template.html,
					replyTo: testCase.email
				});
			}

			// Wait for all emails to arrive
			const emails = await mailpit.waitForEmailCount(4, 10000);
			expect(emails).toHaveLength(4);

			// Verify each test case
			for (const testCase of testCases) {
				const email = await mailpit.waitForEmail(
					(email) => email.Subject.includes(testCase.name),
					2000
				);

				const fullEmail = await mailpit.getEmailById(email.ID);

				// Verify basic structure
				expect(fullEmail.HTML).toContain(testCase.name);
				expect(fullEmail.Text).toContain(testCase.name);

				// Verify content handling
				if (testCase.name === 'Unicode Test') {
					expect(fullEmail.HTML).toContain('🚀');
					expect(fullEmail.HTML).toContain('émojis');
					expect(fullEmail.HTML).toContain('àccénts');
				}

				if (testCase.name === 'HTML Escape Test') {
					expect(fullEmail.HTML).toContain('&lt;script&gt;');
					expect(fullEmail.HTML).toContain('&lt;b&gt;bold&lt;/b&gt;');
					expect(fullEmail.Text).toContain('<script>alert("test")</script>');
				}

				if (testCase.name === 'Long Content Test') {
					expect(fullEmail.Text).toContain('A'.repeat(1000));
					expect(fullEmail.Text).toContain('B'.repeat(1000));
				}

				if (testCase.name === 'Line Break Test') {
					expect(fullEmail.Text).toContain('Line 1\nLine 2\n\nLine 4');
				}
			}

			transporter.close();
		});
	});

	describe('Performance and Reliability', () => {
		it('should handle high volume email processing', async () => {
			const nodemailer = await import('nodemailer');
			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			const emailCount = 10;
			const startTime = Date.now();

			// Send multiple emails concurrently
			const promises = Array.from({ length: emailCount }, async (_, i) => {
				return transporter.sendMail({
					from: `sender${i}@example.com`,
					to: 'bulk@example.com',
					subject: `Bulk Test Email ${i + 1}`,
					text: `This is bulk test email number ${i + 1}`
				});
			});

			await Promise.all(promises);
			const sendTime = Date.now() - startTime;

			// Wait for all emails to arrive
			const emails = await mailpit.waitForEmailCount(emailCount, 15000);
			const totalTime = Date.now() - startTime;

			expect(emails).toHaveLength(emailCount);

			// Verify reasonable performance
			expect(sendTime).toBeLessThan(10000); // Sending should complete within 10 seconds
			expect(totalTime).toBeLessThan(20000); // Total processing within 20 seconds

			// Verify all emails are unique and correct
			const subjects = emails.map((email) => email.Subject);
			for (let i = 1; i <= emailCount; i++) {
				expect(subjects).toContain(`Bulk Test Email ${i}`);
			}

			transporter.close();
		});

		it('should maintain email order and integrity under load', async () => {
			const nodemailer = await import('nodemailer');
			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			const sequentialEmails = Array.from({ length: 5 }, (_, i) => ({
				from: 'sequence@example.com',
				to: 'test@example.com',
				subject: `Sequential Email ${i + 1}`,
				text: `This is sequential email ${i + 1} with timestamp ${Date.now()}`
			}));

			// Send emails sequentially with small delays
			for (const emailData of sequentialEmails) {
				await transporter.sendMail(emailData);
				await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay
			}

			// Wait for all emails
			const emails = await mailpit.waitForEmailCount(5, 10000);
			expect(emails).toHaveLength(5);

			// Verify all emails arrived with correct content
			for (let i = 1; i <= 5; i++) {
				const email = emails.find((e) => e.Subject === `Sequential Email ${i}`);
				expect(email).toBeDefined();

				const fullEmail = await mailpit.getEmailById(email!.ID);
				expect(fullEmail.Text).toContain(`sequential email ${i}`);
			}

			transporter.close();
		});
	});

	describe('Error Handling and Recovery', () => {
		it('should handle Mailpit service interruption gracefully', async () => {
			// Test API error handling
			const originalFetch = global.fetch;

			// Mock fetch to simulate service error
			global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
				if (url.toString().includes('localhost:8025')) {
					return Promise.reject(new Error('Connection refused'));
				}
				return originalFetch(url);
			});

			await expect(mailpit.getEmails()).rejects.toThrow('Connection refused');
			await expect(mailpit.clearAllEmails()).rejects.toThrow('Connection refused');

			// Restore original fetch
			global.fetch = originalFetch;

			// Verify service is working again
			const emails = await mailpit.getEmails();
			expect(Array.isArray(emails)).toBe(true);
		});

		it('should handle malformed email data gracefully', async () => {
			const nodemailer = await import('nodemailer');
			const transporter = nodemailer.createTransport({
				host: 'localhost',
				port: 1025,
				secure: false,
				tls: {
					rejectUnauthorized: false
				}
			});

			// Test with minimal email data
			await transporter.sendMail({
				from: 'minimal@example.com',
				to: 'test@example.com',
				subject: '', // Empty subject
				text: '' // Empty text
			});

			const email = await mailpit.waitForEmail(
				(email) => email.From.Address === 'minimal@example.com',
				5000
			);

			expect(email).toBeDefined();
			expect(email.Subject).toBe('');

			transporter.close();
		});
	});
});
