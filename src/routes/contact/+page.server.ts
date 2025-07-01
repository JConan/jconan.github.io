import { fail, type Actions } from '@sveltejs/kit';
import { validateContactForm } from '$lib/utils/contact-form-validation';
import {
	createEmailConfigFromEnv,
	createEmailTemplate,
	type EmailData
} from '$lib/utils/email-service';
import nodemailer from 'nodemailer';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			message: formData.get('message') as string
		};

		// Validate form data
		const validation = validateContactForm(data);
		if (!validation.isValid) {
			return fail(400, {
				errors: validation.errors,
				data
			});
		}

		// Get email configuration
		const emailConfig = createEmailConfigFromEnv();
		if (!emailConfig) {
			console.error('Email configuration not found');
			return fail(500, {
				error: 'Email service not configured',
				data
			});
		}

		try {
			// Create email template
			const emailData: EmailData = {
				name: data.name,
				email: data.email,
				message: data.message,
				timestamp: new Date()
			};

			const template = createEmailTemplate(emailData);

			// Create transporter
			const transporterConfig: any = {
				host: emailConfig.host,
				port: emailConfig.port,
				secure: emailConfig.secure || false,
				auth: emailConfig.auth,
				// For Mailpit in development
				tls: {
					rejectUnauthorized: false
				}
			};

			// Add DKIM configuration if available
			if (emailConfig.dkim) {
				transporterConfig.dkim = {
					domainName: emailConfig.dkim.domainName,
					keySelector: emailConfig.dkim.keySelector,
					privateKey: emailConfig.dkim.privateKey
				};
			}

			const transporter = nodemailer.createTransport(transporterConfig);

			// Send email
			const result = await transporter.sendMail({
				from: emailConfig.from,
				to: emailConfig.to,
				subject: template.subject,
				text: template.text,
				html: template.html,
				replyTo: data.email
			});

			console.log('Email sent successfully:', result.messageId);

			return {
				success: true,
				messageId: result.messageId
			};
		} catch (error) {
			console.error('Failed to send email:', error);
			return fail(500, {
				error: 'Failed to send email. Please try again later.',
				data
			});
		}
	}
};
