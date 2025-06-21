<script lang="ts">
	import { page } from '$app/stores';
	import { route } from '$lib/ROUTES.js';
	import Icon from '@iconify/svelte';
	import SEO from '$lib/components/SEO.svelte';
	import type { Project } from '$lib/types/portfolio.js';

	interface Props {
		data: {
			projects: Project[];
			selectedProject: Project;
			selectedSlug: string;
		};
	}

	let { data }: Props = $props();

	// Svelte 5 runes for reactive state
	let selectedProject = $state(data.selectedProject);
	let currentTab = $state<'description' | 'demo' | 'github'>('description');

	// Update selected project when data changes
	$effect(() => {
		selectedProject = data.selectedProject;
	});

	// Determine current tab based on URL
	$effect(() => {
		const pathname = $page.url.pathname;
		if (pathname.includes('/demo')) {
			currentTab = 'demo';
		} else if (pathname.includes('/github')) {
			currentTab = 'github';
		} else {
			currentTab = 'description';
		}
	});

	// Navigate to project
	function navigateToProject(project: Project) {
		window.location.href = `/portfolio/${project.slug}`;
	}

	// Navigate to tab
	function navigateToTab(tab: 'description' | 'demo' | 'github') {
		const baseUrl = `/portfolio/${selectedProject.slug}`;
		switch (tab) {
			case 'description':
				window.location.href = baseUrl;
				break;
			case 'demo':
				window.location.href = `${baseUrl}/demo`;
				break;
			case 'github':
				window.open(selectedProject.source, '_blank');
				break;
		}
	}
</script>

<SEO
	title="Portfolio | Johan Chan"
	description="Découvrez les projets et réalisations de Johan Chan, développeur freelance spécialisé en applications web modernes."
	keywords="portfolio, projets web, développeur freelance, React, Svelte, applications"
/>

<div class="portfolio-container">
	<!-- Project Navigation Sidebar -->
	<aside class="project-sidebar">
		<div class="sidebar-header">
			<a href="https://www.frontendmentor.io" target="_blank" class="frontend-mentor-link">
				Frontend Mentor
			</a>
		</div>

		<nav class="project-nav">
			{#each data.projects as project (project.slug)}
				<button
					class="project-button"
					class:active={selectedProject.slug === project.slug}
					onclick={() => navigateToProject(project)}
				>
					{project.name}
				</button>
			{/each}
		</nav>
	</aside>

	<!-- Main Content Area -->
	<section class="content-area">
		<!-- Tab Navigation -->
		<nav class="tab-nav">
			<button
				class="tab-button"
				class:active={currentTab === 'description'}
				onclick={() => navigateToTab('description')}
			>
				Description
			</button>
			<button
				class="tab-button"
				class:active={currentTab === 'demo'}
				onclick={() => navigateToTab('demo')}
			>
				Demo
			</button>
			<button class="tab-button github-button" onclick={() => navigateToTab('github')}>
				<Icon icon="mdi:github" />
				GitHub
			</button>
		</nav>

		<!-- Content Container -->
		<div class="content-container">
			<slot />
		</div>
	</section>
</div>

<style>
	@reference "tailwindcss";

	.portfolio-container {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 2rem;
		max-width: 1400px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
		min-height: calc(100vh - 120px);
	}

	/* Project Sidebar */
	.project-sidebar {
		background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
		border-radius: 1rem;
		border: 1px solid #d1d5db;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		height: fit-content;
		position: sticky;
		top: 2rem;
	}

	.sidebar-header {
		margin-bottom: 1.5rem;
	}

	.frontend-mentor-link {
		display: block;
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.frontend-mentor-link:hover {
		color: #2563eb;
	}

	.project-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.project-button {
		width: 100%;
		padding: 0.875rem 1rem;
		text-align: left;
		font-weight: 500;
		color: #374151;
		background: transparent;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.project-button:hover {
		background-color: #dbeafe;
		color: #1d4ed8;
	}

	.project-button.active {
		background-color: #2563eb;
		color: white;
	}

	.project-button.active:hover {
		background-color: #1d4ed8;
	}

	/* Main Content Area */
	.content-area {
		background: white;
		border-radius: 1rem;
		border: 1px solid #d1d5db;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.tab-nav {
		display: flex;
		border-bottom: 2px solid #e5e7eb;
		background: #f9fafb;
	}

	.tab-button {
		padding: 1rem 1.5rem;
		font-weight: 500;
		color: #6b7280;
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tab-button:hover {
		color: #2563eb;
		background-color: #eff6ff;
	}

	.tab-button.active {
		color: #2563eb;
		border-bottom-color: #2563eb;
		background-color: white;
	}

	.github-button {
		margin-left: auto;
	}

	.content-container {
		padding: 2rem;
		color: #1f2937;
		min-height: 600px;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.portfolio-container {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 1rem;
		}

		.project-sidebar {
			position: relative;
			top: 0;
		}

		.project-nav {
			flex-direction: row;
			overflow-x: auto;
			padding-bottom: 0.5rem;
		}

		.project-button {
			white-space: nowrap;
			min-width: fit-content;
		}

		.tab-nav {
			flex-wrap: wrap;
		}

		.content-container {
			padding: 1rem;
		}
	}

	@media (max-width: 480px) {
		.tab-button {
			padding: 0.75rem 1rem;
			font-size: 0.875rem;
		}
	}
</style>
