<script lang="ts">
	import { marked } from 'marked';
	import type { Project } from '$lib/types/portfolio.js';
	import { getLocale } from '$lib/paraglide/runtime';

	interface Props {
		data: {
			projects: Project[];
			selectedProject: Project;
			selectedSlug: string;
		};
	}

	let { data }: Props = $props();

	let description = $state('');
	let isLoading = $state(true);
	let error = $state('');

	// Fetch description when selected project changes
	$effect(() => {
		fetchDescription(data.selectedProject);
	});

	async function fetchDescription(project: Project) {
		if (!project) return;

		isLoading = true;
		error = '';

		try {
			const response = await fetch(
				typeof project.descriptionLink === 'string'
					? project.descriptionLink
					: project.descriptionLink(getLocale())
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch description: ${response.status}`);
			}
			const markdown = await response.text();
			description = await marked.parse(markdown);
		} catch (err) {
			console.error('Error fetching description:', err);
			error = err instanceof Error ? err.message : 'Failed to load description';
			description = `
				<h2>Description non disponible</h2>
				<p>Désolé, la description de ce projet n'a pas pu être chargée.</p>
				<p><strong>Projet:</strong> ${project.name}</p>
				<p><strong>Description courte:</strong> ${project.shortDescription}</p>
			`;
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="description-content">
	{#if isLoading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p class="loading-text">Chargement de la description...</p>
		</div>
	{:else if error}
		<div class="error-container">
			<h2>Erreur de chargement</h2>
			<p class="error-message">{error}</p>
			<button class="retry-button" onclick={() => fetchDescription(data.selectedProject)}>
				Réessayer
			</button>
		</div>
	{:else}
		<div class="prose-content">
			{@html description}
		</div>
	{/if}
</div>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	.description-content {
		width: 100%;
		max-width: none;
	}

	.loading-container {
		@apply flex flex-col items-center justify-center p-16 text-base-content/60;
	}

	.loading-spinner {
		@apply w-8 h-8 border-4 border-base-300 border-t-primary rounded-full mb-4;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		@apply text-lg font-medium;
	}

	.error-container {
		@apply p-8 text-center text-error;
	}

	.error-container h2 {
		@apply text-error mb-4;
	}

	.error-message {
		@apply text-base-content/60 mb-6;
	}

	.retry-button {
		@apply btn btn-primary;
	}

	.prose-content {
		@apply w-full max-w-none leading-relaxed;
	}

	/* Prose styling for markdown content */
	.prose-content :global(h1) {
		@apply text-3xl font-bold text-base-content mb-4 mt-8 first:mt-0;
	}

	.prose-content :global(h2) {
		@apply text-2xl font-semibold text-base-content mb-3 mt-6;
	}

	.prose-content :global(h3) {
		@apply text-xl font-semibold text-base-content/90 mb-2 mt-5;
	}

	.prose-content :global(p) {
		@apply text-base-content/80 mb-4 leading-relaxed;
	}

	.prose-content :global(strong) {
		@apply font-semibold text-base-content;
	}

	.prose-content :global(ul) {
		@apply mb-4 pl-6;
	}

	.prose-content :global(li) {
		@apply text-base-content/80 mb-2 leading-normal;
	}

	.prose-content :global(code) {
		@apply bg-base-200 text-base-content px-1 py-0.5 rounded text-sm;
	}

	.prose-content :global(pre) {
		@apply bg-neutral text-neutral-content p-4 rounded-lg overflow-x-auto my-4;
	}

	.prose-content :global(pre code) {
		@apply bg-transparent text-inherit p-0;
	}

	.prose-content :global(a) {
		@apply text-primary underline transition-colors hover:text-blue-600;
	}

	.prose-content :global(blockquote) {
		@apply border-l-4 border-base-300 pl-4 my-4 italic text-base-content/60;
	}
</style>
