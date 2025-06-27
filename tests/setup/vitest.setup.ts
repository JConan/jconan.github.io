import { vi, afterEach } from 'vitest';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.MAILPIT_HOST = 'localhost';
process.env.MAILPIT_PORT = '1025';
process.env.CONTACT_EMAIL_FROM = 'test@localhost';
process.env.CONTACT_EMAIL_TO = 'recipient@localhost';

// Mock fetch for browser environment
global.fetch = vi.fn();

// Mock console methods to reduce noise in tests
global.console = {
	...console,
	log: vi.fn(),
	debug: vi.fn(),
	info: vi.fn(),
	warn: vi.fn(),
	error: vi.fn()
};

// Mock DOM APIs that might be missing in jsdom
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Clean up after each test
afterEach(() => {
	vi.clearAllMocks();
});
