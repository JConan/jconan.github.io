import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ fetch }) => {
	const cvData = await (await fetch('/CV.md')).text();
	const cvHTML = await marked.parse(cvData, { async: false });
	return { cvHTML };
}) satisfies PageLoad;
