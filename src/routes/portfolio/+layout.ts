import { writable } from 'svelte/store';
import type { LayoutLoad } from './$types';

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
		name: 'Tic Tac Toe',
		slug: 'fm-tic-tac-toe',
		shortDescription: 'Game Tic Tac Toe built with svelte',
		demoLink: 'https://jconan.github.io/fm-tic-tac-toe/',
		descriptionLink: 'https://raw.githubusercontent.com/JConan/fm-tic-tac-toe/main/DESCRIPTION.md',
		source: 'https://github.com/JConan/fm-tic-tac-toe/'
	},
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

export const load = (async () => {
	return {
		projects,
		selectedProject
	};
}) satisfies LayoutLoad;
