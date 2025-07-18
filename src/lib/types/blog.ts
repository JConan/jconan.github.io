export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
	category: string;
	featured: boolean;
	published: boolean;
	excerpt: string;
	readingTime: number;
	content: string;
	translation_id?: string;
}

export interface BlogPostMetadata {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
	category: string;
	featured: boolean;
	published: boolean;
	excerpt: string;
	readingTime: number;
	translation_id?: string;
}
