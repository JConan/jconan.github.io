import type { PageLoad } from './$types';
import * as m from '$lib/paraglide/messages';

export const load: PageLoad = async () => {
	return {
		seo: {
			title: m['services.page_title'](),
			description: m['services.page_description'](),
			keywords: m['services.page_keywords'](),
			type: 'website' as const
		}
	};
};
