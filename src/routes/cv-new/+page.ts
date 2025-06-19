import type { PageLoad } from './$types';
import type { CVData } from '$lib/types/cv.js';
import cvData from '$lib/data/cv-data.json';

export const load: PageLoad = async () => {
	return {
		cvData: cvData as CVData
	};
};
