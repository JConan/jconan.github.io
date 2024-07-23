import type { PageLoad } from './$types';

type Project = {
	name: string;
	descriptionLink: string;
	source: string;
	demoLink: string;
};

const projects: Project[] = [
	{
		name: 'Tic Tac Toe',
		demoLink: 'https://jconan.github.io/fm-tic-tac-toe/',
		descriptionLink: 'https://raw.githubusercontent.com/JConan/fm-tic-tac-toe/main/DESCRIPTION.md',
		source: 'https://github.com/JConan/fm-tic-tac-toe/'
	}
	// {
	// 	name: 'Memory Game',
	// 	demoLink: 'https://jconan.github.io/fm-tic-tac-toe/',
	// 	descriptionLink:
	// 		'https://raw.githubusercontent.com/JConan/fm-memory-game-challenge/main/DESCRIPTION.md',
	// 	source: 'https://github.com/JConan/fm-memory-game-challenge/'
	// },
	// {
	// 	name: 'Connect Four',
	// 	demoLink: 'https://github.com/JConan/fm-connect-four-game',
	// 	descriptionLink:
	// 		'https://raw.githubusercontent.com/JConan/fm-connect-four-game/main/DESCRIPTION.md',
	// 	source: 'https://github.com/JConan/fm-connect-four-game'
	// }
];

export const load = (async () => {
	return { projects };
}) satisfies PageLoad;
