import { describe, it, expect } from 'vitest';

describe('Testing Infrastructure', () => {
	it('should run unit tests correctly', () => {
		expect(1 + 1).toBe(2);
	});

	it('should have access to vitest globals', () => {
		expect(typeof describe).toBe('function');
		expect(typeof it).toBe('function');
		expect(typeof expect).toBe('function');
	});
});
