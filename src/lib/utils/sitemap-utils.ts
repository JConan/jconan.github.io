/**
 * Sitemap utilities for managing lastmod dates and route metadata
 */

export interface RouteMetadata {
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

/**
 * Route metadata configuration
 * Update these dates when content changes significantly
 */
export const routeMetadata: Record<string, RouteMetadata> = {
	'/': {
		lastmod: '2025-06-20T19:18:00+00:00',
		changefreq: 'weekly',
		priority: 1.0
	},
	'/about': {
		lastmod: '2025-06-21T13:49:00+00:00',
		changefreq: 'monthly',
		priority: 0.9
	},
	'/portfolio': {
		lastmod: '2025-06-21T11:44:00+00:00',
		changefreq: 'weekly',
		priority: 0.8
	},
	'/contact': {
		lastmod: '2025-06-20T19:18:00+00:00',
		changefreq: 'monthly',
		priority: 0.7
	},
	'/services': {
		lastmod: '2025-06-21T05:44:00+00:00',
		changefreq: 'monthly',
		priority: 0.8
	},
	'/blogs': {
		lastmod: '2025-01-07T05:30:00+00:00',
		changefreq: 'weekly',
		priority: 0.6
	}
};

/**
 * Get metadata for a specific route
 */
export function getRouteMetadata(route: string): RouteMetadata {
	return (
		routeMetadata[route] || {
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: 0.5
		}
	);
}

/**
 * Update lastmod date for a specific route
 * Call this when content changes significantly
 */
export function updateRouteLastmod(route: string, date?: Date): void {
	const metadata = routeMetadata[route] || {};
	metadata.lastmod = (date || new Date()).toISOString();
	routeMetadata[route] = metadata;
}

/**
 * Get current timestamp in ISO format for sitemap
 */
export function getCurrentTimestamp(): string {
	return new Date().toISOString();
}

/**
 * Validate sitemap URL format
 */
export function validateSitemapUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}
