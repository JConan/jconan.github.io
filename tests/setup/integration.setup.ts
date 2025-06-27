import { beforeAll, afterAll, beforeEach } from 'vitest';

// Ensure Mailpit is running before integration tests
beforeAll(async () => {
	// Check if Mailpit is accessible
	try {
		const response = await fetch('http://localhost:8025/api/v1/info');
		if (!response.ok) {
			throw new Error('Mailpit not accessible');
		}
		console.log('✅ Mailpit is running and accessible');
	} catch (error) {
		console.error(
			'❌ Mailpit is not running. Please start Mailpit before running integration tests.'
		);
		console.error('Run: npm run mailpit:start');
		process.exit(1);
	}
});

// Clear emails before each test
beforeEach(async () => {
	try {
		await fetch('http://localhost:8025/api/v1/messages', {
			method: 'DELETE'
		});
	} catch (error) {
		console.warn('Warning: Could not clear Mailpit emails');
	}
});

afterAll(async () => {
	// Cleanup if needed
	console.log('Integration tests completed');
});
