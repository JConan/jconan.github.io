export interface MailpitEmail {
	ID: string;
	From: { Address: string; Name: string };
	To: Array<{ Address: string; Name: string }>;
	Subject: string;
	Date: string;
	Size: number;
	Snippet: string;
}

export class MailpitHelper {
	private baseUrl = 'http://localhost:8025/api/v1';

	async clearAllEmails(): Promise<void> {
		const response = await fetch(`${this.baseUrl}/messages`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error(`Failed to clear emails: ${response.statusText}`);
		}
	}

	async getEmails(): Promise<MailpitEmail[]> {
		const response = await fetch(`${this.baseUrl}/messages`);

		if (!response.ok) {
			throw new Error(`Failed to fetch emails: ${response.statusText}`);
		}

		const data = await response.json();
		return data.messages || [];
	}

	async getEmailById(id: string): Promise<any> {
		const response = await fetch(`${this.baseUrl}/message/${id}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch email ${id}: ${response.statusText}`);
		}

		return response.json();
	}

	async waitForEmail(
		predicate: (email: MailpitEmail) => boolean,
		timeout = 10000
	): Promise<MailpitEmail> {
		const startTime = Date.now();

		while (Date.now() - startTime < timeout) {
			const emails = await this.getEmails();
			const email = emails.find(predicate);

			if (email) {
				return email;
			}

			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		throw new Error(`Email not found within ${timeout}ms timeout`);
	}

	async waitForEmailCount(expectedCount: number, timeout = 10000): Promise<MailpitEmail[]> {
		const startTime = Date.now();

		while (Date.now() - startTime < timeout) {
			const emails = await this.getEmails();

			if (emails.length >= expectedCount) {
				return emails;
			}

			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		throw new Error(`Expected ${expectedCount} emails not found within ${timeout}ms timeout`);
	}
}
