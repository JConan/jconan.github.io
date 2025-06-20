import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: "Johan Chan - Développeur d'Applications Sur Mesure | Freelance",
			description:
				"Création d'applications web et mobile personnalisées. Développeur freelance spécialisé React, Svelte, Node.js. Disponible pour vos projets.",
			keywords:
				'développeur freelance, création application, développement sur mesure, React, Svelte, Node.js, application mobile'
		}
	};
};
