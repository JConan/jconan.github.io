import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: 'Contact & Devis - Johan Chan Développeur Freelance',
			description:
				"Contactez Johan Chan pour votre projet d'application. Devis gratuit et réponse rapide pour vos besoins de développement.",
			keywords:
				'contact développeur freelance, devis développement, projet application, développeur React disponible'
		}
	};
};
