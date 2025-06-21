import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl, setLocale, type Locale, getLocale } from '$lib/paraglide/runtime';

export const reroute: Reroute = (request) => {
	const delocalizePathname = deLocalizeUrl(request.url).pathname;
	const lang = request.url.pathname.replace(delocalizePathname, '').replaceAll('/', '') as Locale;

	if (lang && getLocale() !== lang) {
		setLocale(lang);
		console.log({ changeLocaleTo: lang });
	}

	return delocalizePathname;
};
