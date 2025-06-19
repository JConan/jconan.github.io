export interface CVData {
	personalInfo: {
		name: string;
		email: string;
		linkedin: string;
		github: string;
		photo: string;
	};
	summary: string;
	skills: string[];
	education: Array<{
		institution: string;
		year: number;
		certification?: string;
		link?: string;
	}>;
	experience: Array<{
		id: string;
		period: string;
		title: string;
		company: string;
		location: string;
		responsibilities: string[];
	}>;
}

export interface CVSectionProps {
	title: string;
	printBreakBefore?: boolean;
}

export interface ExperienceItemProps {
	experience: CVData['experience'][0];
	showDetails?: boolean;
}

export interface CVPageProps {
	data: CVData;
	printMode?: boolean;
}
