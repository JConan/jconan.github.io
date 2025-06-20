import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ fetch }) => {
	const cvData = await (await fetch('/CV.md')).text();
	const cvHTML = await marked.parse(cvData, { async: false });
	return {
		cvHTML,
		seo: {
			title: 'CV Johan Chan - Développeur Freelance | Expérience React, Svelte, Node.js',
			description:
				'Consultez le CV de Johan Chan, développeur freelance spécialisé en applications web et mobile. Compétences React, Svelte, TypeScript.',
			keywords:
				'CV développeur freelance, expérience React, compétences Svelte, développeur fullstack, portfolio technique',
			type: 'profile' as const
		}
	};
}) satisfies PageLoad;
