import { get, writable } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { page } from '$app/stores';
import { browser } from '$app/environment';
import { route } from '$lib/ROUTES';
import { goto } from '$app/navigation';

type Project = {
	name: string;
	slug: string;
	shortDescription: string;
	descriptionLink: string;
	source: string;
	demoLink: string;
};

const projects: Project[] = [
	{
		name: 'Memory Game',
		slug: 'fm-memory-game-challenge',
		shortDescription: '',
		demoLink: 'https://jconan.github.io/fm-memory-game-challenge/',
		descriptionLink:
			'https://raw.githubusercontent.com/JConan/fm-memory-game-challenge/main/DESCRIPTION.md',
		source: 'https://github.com/JConan/fm-memory-game-challenge/'
	},
	{
		name: 'Tic Tac Toe',
		slug: 'fm-tic-tac-toe',
		shortDescription: 'Game Tic Tac Toe built with svelte',
		demoLink: 'https://jconan.github.io/fm-tic-tac-toe/',
		descriptionLink: 'https://raw.githubusercontent.com/JConan/fm-tic-tac-toe/main/DESCRIPTION.md',
		source: 'https://github.com/JConan/fm-tic-tac-toe/'
	},
	{
		name: 'Connect Four',
		slug: 'fm-connect-four',
		shortDescription:
			'Connect Four is a two-player game where the goal is to align four discs in a row',
		demoLink: 'https://jconan.github.io/fm-connect-four',
		descriptionLink: 'https://raw.githubusercontent.com/JConan/fm-connect-four/main/DESCRIPTION.md',
		source: 'https://github.com/JConan/fm-connect-four'
	}
];

const selectedProject = writable(projects[0]);

// update project selection base on the path
if (browser)
	page.subscribe(($page) => {
		if ($page.route?.id?.startsWith('/portfolio/[slug]')) {
			const project = projects.filter((project) => project.slug === $page.params.slug)[0];
			selectedProject.set(project);
		}
	});

export const load = (async ({ url: { pathname } }) => {
	// redirect to the last selected project
	if (browser && pathname === route('/portfolio')) {
		goto(route('/portfolio/[slug]', { slug: get(selectedProject).slug }));
	}

	return {
		projects,
		selectedProject
	};
}) satisfies LayoutLoad;
