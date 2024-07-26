import { writable } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { page } from '$app/stores';
import { browser } from '$app/environment';

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
		slug: 'fm-connect-four-game',
		shortDescription: '',
		demoLink: 'https://github.com/JConan/fm-connect-four-game',
		descriptionLink:
			'https://raw.githubusercontent.com/JConan/fm-connect-four-game/main/DESCRIPTION.md',
		source: 'https://github.com/JConan/fm-connect-four-game'
	}
];

const selectedProject = writable(projects[0]);

if (browser)
	page.subscribe(($page) => {
		if ('/portfolio/demo/[slug]' === $page.route?.id) {
			const project = projects.filter((project) => project.slug === $page.params.slug)[0];
			selectedProject.set(project);
		}
	});

export const load = (async () => {
	return {
		projects,
		selectedProject
	};
}) satisfies LayoutLoad;
