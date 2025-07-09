<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import type { Project } from '$lib/types/portfolio.js';
	import { locales, localizeHref, localizeUrl } from '$lib/paraglide/runtime.js';

	let { data, children } = $props();

	// Svelte 5 runes for reactive state
	let selectedProject = $state(data.selectedProject);
	let currentTab = $state<'description' | 'demo' | 'github'>('description');

	// Update selected project when data changes
	$effect(() => {
		selectedProject = data.selectedProject;
	});

	// Determine current tab based on URL
	$effect(() => {
		const pathname = page.url.pathname;
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
		window.location.href = localizeHref(`/portfolio/${project.slug}`);
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

<!-- static generation strategy -->
<div style="display:none">
	{#each data.projects as project}
		{#each locales as locale}
			<a href={localizeHref(`/journey/${project.slug}`, { locale })}>{locale}</a>
			<a href={localizeHref(`/journey/${project.slug}/demo`, { locale })}>{locale}</a>
		{/each}
	{/each}
</div>
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
			{@render children?.()}
		</div>
	</section>
</div>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

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
		@apply bg-base-200 rounded-2xl border border-base-300 shadow-lg p-6;
		height: fit-content;
		position: sticky;
		top: 2rem;
	}

	.sidebar-header {
		@apply mb-6;
	}

	.frontend-mentor-link {
		@apply block text-xl font-bold text-base-content no-underline link link-hover;
	}

	.frontend-mentor-link:hover {
		@apply text-primary;
	}

	.project-nav {
		@apply flex flex-col gap-2;
	}

	.project-button {
		@apply btn btn-ghost w-full justify-start font-medium text-base-content;
	}

	.project-button.active {
		@apply btn-primary;
	}

	/* Main Content Area */
	.content-area {
		@apply bg-base-100 rounded-2xl border border-base-300 shadow-lg overflow-hidden;
	}

	.tab-nav {
		@apply flex border-b-2 border-base-300 bg-base-200;
	}

	.tab-button {
		@apply px-6 py-4 font-medium text-base-content/70 bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-all flex items-center gap-2;
	}

	.tab-button:hover {
		@apply text-primary bg-primary/10;
	}

	.tab-button.active {
		@apply text-primary border-b-primary bg-base-100;
	}

	.github-button {
		@apply ml-auto;
	}

	.content-container {
		@apply p-8 text-base-content h-full overflow-y-auto;
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
