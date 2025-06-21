import type { PageLoad } from './$types';
import * as m from '$lib/paraglide/messages';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: m['blog.page_title'](),
			description: m['blog.page_description'](),
			keywords: m['blog.page_keywords'](),
			type: 'website' as const
		}
	};
};
