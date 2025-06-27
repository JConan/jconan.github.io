/**
 * Contact form validation utilities
 */

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}

export interface ValidationConfig {
	nameMinLength?: number;
	nameMaxLength?: number;
	messageMinLength?: number;
	messageMaxLength?: number;
	emailPattern?: RegExp;
}

const DEFAULT_CONFIG: Required<ValidationConfig> = {
	nameMinLength: 2,
	nameMaxLength: 100,
	messageMinLength: 10,
	messageMaxLength: 2000,
	emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

/**
 * Validates a name field
 */
export function validateName(name: string, config: ValidationConfig = {}): string | null {
	const { nameMinLength, nameMaxLength } = { ...DEFAULT_CONFIG, ...config };

	if (!name || name.trim().length === 0) {
		return 'Name is required';
	}

	const trimmedName = name.trim();

	if (trimmedName.length < nameMinLength) {
		return `Name must be at least ${nameMinLength} characters long`;
	}

	if (trimmedName.length > nameMaxLength) {
		return `Name must be no more than ${nameMaxLength} characters long`;
	}

	// Check for basic name format (only letters, spaces, hyphens, apostrophes)
	if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedName)) {
		return 'Name can only contain letters, spaces, hyphens, and apostrophes';
	}

	return null;
}

/**
 * Validates an email field
 */
export function validateEmail(email: string, config: ValidationConfig = {}): string | null {
	const { emailPattern } = { ...DEFAULT_CONFIG, ...config };

	if (!email || email.trim().length === 0) {
		return 'Email is required';
	}

	const trimmedEmail = email.trim();

	if (!emailPattern.test(trimmedEmail)) {
		return 'Please enter a valid email address';
	}

	// Additional checks for common email issues
	if (trimmedEmail.length > 254) {
		return 'Email address is too long';
	}

	if (trimmedEmail.includes('..')) {
		return 'Email address cannot contain consecutive dots';
	}

	return null;
}

/**
 * Validates a message field
 */
export function validateMessage(message: string, config: ValidationConfig = {}): string | null {
	const { messageMinLength, messageMaxLength } = { ...DEFAULT_CONFIG, ...config };

	if (!message || message.trim().length === 0) {
		return 'Message is required';
	}

	const trimmedMessage = message.trim();

	if (trimmedMessage.length < messageMinLength) {
		return `Message must be at least ${messageMinLength} characters long`;
	}

	if (trimmedMessage.length > messageMaxLength) {
		return `Message must be no more than ${messageMaxLength} characters long`;
	}

	return null;
}

/**
 * Validates the entire contact form
 */
export function validateContactForm(
	data: ContactFormData,
	config: ValidationConfig = {}
): ValidationResult {
	const errors: Record<string, string> = {};

	const nameError = validateName(data.name, config);
	if (nameError) {
		errors.name = nameError;
	}

	const emailError = validateEmail(data.email, config);
	if (emailError) {
		errors.email = emailError;
	}

	const messageError = validateMessage(data.message, config);
	if (messageError) {
		errors.message = messageError;
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}

/**
 * Sanitizes form data by trimming whitespace
 */
export function sanitizeContactFormData(data: ContactFormData): ContactFormData {
	return {
		name: data.name.trim(),
		email: data.email.trim(),
		message: data.message.trim()
	};
}

/**
 * Checks if form data is empty
 */
export function isFormEmpty(data: ContactFormData): boolean {
	return !data.name.trim() && !data.email.trim() && !data.message.trim();
}

/**
 * Gets validation config with custom overrides
 */
export function getValidationConfig(overrides: ValidationConfig = {}): Required<ValidationConfig> {
	return { ...DEFAULT_CONFIG, ...overrides };
}
