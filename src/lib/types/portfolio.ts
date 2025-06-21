export type Project = {
	name: string;
	slug: string;
	shortDescription: string;
	descriptionLink: string;
	source: string;
	demoLink: string;
	iframeHeight: {
		desktop: number;
		mobile: number;
	};
};
