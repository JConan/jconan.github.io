import type { Locale } from '$lib/paraglide/runtime';

export type Project = {
	name: string;
	slug: string;
	shortDescription: string;
	descriptionLink: string | ((locale: Locale) => string);
	source: string;
	demoLink: string;
	iframeHeight: {
		desktop: number;
		mobile: number;
	};
};
