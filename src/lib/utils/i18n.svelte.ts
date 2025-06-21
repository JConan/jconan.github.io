// src/lib/utils/i18n.svelte.ts
import { page } from '$app/state';
import { m } from '$lib/paraglide/messages';

const _lang = $derived(() => {
	page.url;
	return m;
});

export const lang = () => _lang;
