import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const { subscribe, set, update } = writable<string | undefined>(undefined);

export const theme = {
	subscribe,
	toggle: () => {
		update((current) => {
			const dataTheme = current === 'dark' ? 'light' : 'dark';
			localStorage.setItem('theme', dataTheme);
			document.documentElement.setAttribute('data-theme', dataTheme);
			return dataTheme;
		});
	}
};

// auto initialize the store
if (browser) {
	const defaultDataTheme =
		document.documentElement.getAttribute('data-theme') ??
		window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	const userDataTheme = localStorage.getItem('theme');
	set(userDataTheme ?? defaultDataTheme);
}
