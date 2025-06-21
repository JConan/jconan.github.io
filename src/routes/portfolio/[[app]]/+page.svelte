<script lang="ts">
	import { marked } from 'marked';
	import type { Project } from '$lib/types/portfolio.js';

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
			const response = await fetch(project.descriptionLink);
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

	.description-content {
		width: 100%;
		max-width: none;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		color: #6b7280;
	}

	.loading-spinner {
		width: 2rem;
		height: 2rem;
		border: 4px solid #e5e7eb;
		border-top: 4px solid #2563eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
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
		font-size: 1.125rem;
		font-weight: 500;
	}

	.error-container {
		padding: 2rem;
		text-align: center;
		color: #dc2626;
	}

	.error-container h2 {
		color: #dc2626;
		margin-bottom: 1rem;
	}

	.error-message {
		color: #6b7280;
		margin-bottom: 1.5rem;
	}

	.retry-button {
		padding: 0.75rem 1.5rem;
		background-color: #2563eb;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.retry-button:hover {
		background-color: #1d4ed8;
	}

	.prose-content {
		width: 100%;
		max-width: none;
		line-height: 1.7;
	}

	/* Prose styling for markdown content */
	.prose-content :global(h1) {
		font-size: 2rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 1rem;
		margin-top: 2rem;
	}

	.prose-content :global(h1:first-child) {
		margin-top: 0;
	}

	.prose-content :global(h2) {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
		margin-bottom: 0.75rem;
		margin-top: 1.5rem;
	}

	.prose-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: #374151;
		margin-bottom: 0.5rem;
		margin-top: 1.25rem;
	}

	.prose-content :global(p) {
		color: #374151;
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	.prose-content :global(strong) {
		font-weight: 600;
		color: #1f2937;
	}

	.prose-content :global(ul) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	.prose-content :global(li) {
		color: #374151;
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	.prose-content :global(code) {
		background-color: #f3f4f6;
		color: #1f2937;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	.prose-content :global(pre) {
		background-color: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.prose-content :global(pre code) {
		background: none;
		color: inherit;
		padding: 0;
	}

	.prose-content :global(a) {
		color: #2563eb;
		text-decoration: underline;
		transition: color 0.2s ease;
	}

	.prose-content :global(a:hover) {
		color: #1d4ed8;
	}

	.prose-content :global(blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1rem 0;
		font-style: italic;
		color: #6b7280;
	}
</style>
