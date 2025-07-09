import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Project } from '$lib/types/portfolio.js';
import type { Locale } from '$lib/paraglide/runtime';

const projects: Project[] = [
	{
		name: 'Memory Game',
		slug: 'fm-memory-game-challenge',
		shortDescription: 'Jeu de mémoire interactif avec deux niveaux de difficulté',
		demoLink: 'https://jconan.github.io/fm-memory-game-challenge/',
		descriptionLink: (locale: Locale) =>
			`https://raw.githubusercontent.com/JConan/fm-memory-game-challenge/main/DESCRIPTION.${locale}.md`,
		source: 'https://github.com/JConan/fm-memory-game-challenge/',
		iframeHeight: {
			desktop: 780,
			mobile: 600
		}
	},
	{
		name: 'Tic Tac Toe',
		slug: 'fm-tic-tac-toe',
		shortDescription: 'Jeu Tic Tac Toe construit avec Svelte',
		demoLink: 'https://jconan.github.io/fm-tic-tac-toe/',
		descriptionLink: (locale: Locale) =>
			`https://raw.githubusercontent.com/JConan/fm-tic-tac-toe/main/DESCRIPTION.${locale}.md`,
		source: 'https://github.com/JConan/fm-tic-tac-toe/',
		iframeHeight: {
			desktop: 720,
			mobile: 500
		}
	}
	// {
	// 	name: 'Connect Four',
	// 	slug: 'fm-connect-four',
	// 	shortDescription: 'Jeu Connect Four pour deux joueurs',
	// 	demoLink: 'https://jconan.github.io/fm-connect-four',
	// 	descriptionLink: 'https://raw.githubusercontent.com/JConan/fm-connect-four/main/DESCRIPTION.md',
	// 	source: 'https://github.com/JConan/fm-connect-four',
	// 	iframeHeight: {
	// 		desktop: 950,
	// 		mobile: 600
	// 	}
	// }
];

export const load = (async ({ params, url }) => {
	const selectedSlug = params.app || projects[0].slug;
	const selectedProject = projects.find((p) => p.slug === selectedSlug) || projects[0];

	// Redirect to default project if none selected and we're on the base portfolio route
	if (browser && !params.app && url.pathname === '/portfolio') {
		goto(`/portfolio/${selectedProject.slug}`, { replaceState: true });
	}

	return {
		projects,
		selectedProject,
		selectedSlug
	};
}) satisfies LayoutLoad;
