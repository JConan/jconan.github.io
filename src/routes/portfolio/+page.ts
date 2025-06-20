import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: "Portfolio Johan Chan - Réalisations d'Applications Web & Mobile",
			description:
				'Découvrez les applications créées par Johan Chan : projets React, Svelte, applications mobiles. Études de cas et technologies utilisées.',
			keywords:
				'portfolio développeur, réalisations React, projets Svelte, applications mobiles, études de cas'
		}
	};
};
