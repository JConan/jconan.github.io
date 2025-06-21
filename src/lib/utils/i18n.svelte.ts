// src/lib/utils/i18n.svelte.ts
import { page } from '$app/state';
import { m } from '$lib/paraglide/messages';

export const lang = $derived(() => {
	page.url;
	return m;
});
