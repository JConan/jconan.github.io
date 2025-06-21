import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ fetch }) => {
	const cvData = await (await fetch('/CV.md')).text();
	const cvHTML = await marked.parse(cvData, { async: false });
	return {
		cvHTML,
		seo: {
			title: 'À propos de Johan Chan - Développeur Freelance | Expérience & Expertise',
			description:
				"Découvrez l'expérience et l'expertise de Johan Chan, développeur freelance spécialisé en applications web et mobile sur mesure. Projets React, Svelte, Node.js.",
			keywords:
				'à propos développeur freelance, expérience développement, expertise React, compétences Svelte, développeur fullstack, portfolio professionnel',
			type: 'profile' as const
		}
	};
}) satisfies PageLoad;
