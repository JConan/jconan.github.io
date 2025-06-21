export interface SEOData {
	title: string;
	description: string;
	keywords?: string;
	image?: string;
	type?: 'website' | 'article' | 'profile';
}

export const defaultSEO: SEOData = {
	title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance",
	description:
		"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Disponible pour vos projets.",
	keywords:
		'développeur freelance, création application, développement sur mesure, React, Svelte, Node.js',
	image: '/images/johan.webp',
	type: 'website'
};

export const seoData: Record<string, SEOData> = {
	'/': {
		title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance",
		description:
			"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Disponible pour vos projets.",
		keywords:
			'développeur freelance, création application, développement sur mesure, React, Svelte, Node.js, application mobile',
		type: 'website'
	},
	'/cv': {
		title: 'CV Johan Chan - Développeur Freelance | Expérience React, Svelte, Node.js',
		description:
			'Consultez le CV de Johan Chan, développeur freelance spécialisé en applications web et mobile. Compétences React, Svelte, TypeScript.',
		keywords:
			'CV développeur freelance, expérience React, compétences Svelte, développeur fullstack, portfolio technique',
		type: 'profile'
	},
	'/portfolio': {
		title: "Portfolio Johan Chan - Réalisations d'Applications Web & Mobile",
		description:
			'Découvrez les applications créées par Johan Chan : projets React, Svelte, applications mobiles. Études de cas et technologies utilisées.',
		keywords:
			'portfolio développeur, réalisations React, projets Svelte, applications mobiles, études de cas',
		type: 'website'
	},
	'/contact': {
		title: 'Contact & Devis - Johan Chan Développeur Freelance',
		description:
			"Contactez Johan Chan pour votre projet d'application. Devis gratuit et réponse rapide pour vos besoins de développement.",
		keywords:
			'contact développeur freelance, devis développement, projet application, développeur React disponible',
		type: 'website'
	},
	'/services': {
		title: 'Services de Développement - Applications Web & Mobile | Johan Chan',
		description:
			'Services de développement sur mesure : applications web React/Svelte, applications mobiles, APIs, consultation technique. Freelance disponible.',
		keywords:
			'services développement, applications web, applications mobile, React, Svelte, API, consultation technique, freelance',
		type: 'website'
	},
	'/blog': {
		title: 'Blog Technique - Développement Web & Mobile | Johan Chan',
		description:
			"Articles techniques sur le développement web moderne, React, Svelte, Node.js, meilleures pratiques et retours d'expérience.",
		keywords:
			'blog développement, tutoriels web, React, Svelte, Node.js, JavaScript, TypeScript, meilleures pratiques',
		type: 'website'
	}
};

export function getSEOData(pathname: string): SEOData {
	return seoData[pathname] || defaultSEO;
}
