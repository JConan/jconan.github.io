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
	'/about': {
		title: 'À propos de Johan Chan - Développeur Freelance | Expérience & Expertise',
		description:
			"Découvrez l'expérience et l'expertise de Johan Chan, développeur freelance spécialisé en applications web et mobile sur mesure. Projets React, Svelte, Node.js.",
		keywords:
			'à propos développeur freelance, expérience développement, expertise React, compétences Svelte, développeur fullstack, portfolio professionnel',
		type: 'profile'
	},
	'/portfolio': {
		title: 'Portfolio Projets | Johan Chan',
		description:
			'Découvrez le portfolio de Johan Chan avec des projets Frontend Mentor et applications éducatives en développement web moderne.',
		keywords:
			'portfolio développeur, projets web, Frontend Mentor, développement web, React, Svelte, projets éducatifs',
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
	'/blogs': {
		title: 'Blog Technique - Développement Web & Mobile | Johan Chan',
		description:
			"Articles techniques sur le développement web moderne, React, Svelte, Node.js, meilleures pratiques et retours d'expérience.",
		keywords:
			'blog développement, tutoriels web, React, Svelte, Node.js, JavaScript, TypeScript, meilleures pratiques',
		type: 'website'
	},
	'/404': {
		title: 'Page introuvable - Erreur 404 | Johan Chan',
		description:
			"La page que vous recherchez est introuvable. Retournez à l'accueil ou explorez les autres sections du portfolio de Johan Chan.",
		keywords: 'page introuvable, erreur 404, développeur freelance, Johan Chan',
		type: 'website'
	}
};

export function getSEOData(pathname: string): SEOData {
	return seoData[pathname] || defaultSEO;
}
