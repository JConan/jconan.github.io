<script lang="ts">
	import type { Project } from '$lib/types/portfolio.js';

	interface Props {
		data: {
			projects: Project[];
			selectedProject: Project;
			selectedSlug: string;
		};
	}

	let { data }: Props = $props();

	let iframe = $state<HTMLIFrameElement | null>(null);
	let isLoaded = $state(false);
	let isError = $state(false);
	let isMobile = $state(false);

	// Check if mobile on mount
	$effect(() => {
		isMobile = window.innerWidth <= 768;

		const handleResize = () => {
			isMobile = window.innerWidth <= 768;
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	// Setup iframe when element or project changes
	$effect(() => {
		if (!iframe || !data.selectedProject) return;

		isLoaded = false;
		isError = false;

		const handleLoad = () => {
			isLoaded = true;
			isError = false;
		};

		const handleError = () => {
			isLoaded = false;
			isError = true;
		};

		iframe.addEventListener('load', handleLoad);
		iframe.addEventListener('error', handleError);

		// Set iframe source and class for project-specific styling
		iframe.src = data.selectedProject.demoLink;
		iframe.className = `demo-iframe ${data.selectedProject.slug}`;

		return () => {
			iframe?.removeEventListener('load', handleLoad);
			iframe?.removeEventListener('error', handleError);
		};
	});

	// Get iframe height based on project and screen size
	let iframeHeight = $derived(
		data.selectedProject
			? isMobile
				? data.selectedProject.iframeHeight.mobile
				: data.selectedProject.iframeHeight.desktop
			: 600
	);

	function retryLoad() {
		if (iframe && data.selectedProject) {
			isLoaded = false;
			isError = false;
			iframe.src = data.selectedProject.demoLink;
		}
	}
</script>

<div class="demo-container">
	{#if !isLoaded && !isError}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p class="loading-text">Chargement du projet...</p>
			<p class="loading-subtext">Initialisation de {data.selectedProject.name}</p>
		</div>
	{/if}

	{#if isError}
		<div class="error-container">
			<h2>Erreur de chargement</h2>
			<p>Le projet n'a pas pu être chargé. Cela peut être dû à:</p>
			<ul>
				<li>Une connexion internet instable</li>
				<li>Le projet est temporairement indisponible</li>
				<li>Des restrictions de sécurité du navigateur</li>
			</ul>
			<div class="error-actions">
				<button class="retry-button" onclick={retryLoad}> Réessayer </button>
				<a href={data.selectedProject.demoLink} target="_blank" class="external-link">
					Ouvrir dans un nouvel onglet
				</a>
			</div>
		</div>
	{/if}

	<div class="iframe-container" class:loaded={isLoaded}>
		<iframe
			bind:this={iframe}
			title={`Démo de ${data.selectedProject.name}`}
			style="height: {iframeHeight}px; opacity: {isLoaded ? 1 : 0};"
			allow="fullscreen"
		></iframe>
	</div>
</div>

<style>
	@reference "tailwindcss";

	:global(.demo-iframe) {
		margin: auto;
		width: 100%;
	}

	.demo-container {
		position: relative;
		width: 100%;
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
		width: 3rem;
		height: 3rem;
		border: 4px solid #e5e7eb;
		border-top: 4px solid #2563eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1.5rem;
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
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.loading-subtext {
		font-size: 1rem;
		color: #9ca3af;
	}

	.error-container {
		padding: 2rem;
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 0.5rem;
		color: #dc2626;
	}

	.error-container h2 {
		color: #dc2626;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.error-container p {
		color: #374151;
		margin-bottom: 1rem;
	}

	.error-container ul {
		color: #374151;
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.error-container li {
		margin-bottom: 0.5rem;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		margin-top: 1.5rem;
		flex-wrap: wrap;
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

	.external-link {
		padding: 0.75rem 1.5rem;
		background-color: white;
		color: #2563eb;
		border: 1px solid #2563eb;
		border-radius: 0.5rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.external-link:hover {
		background-color: #2563eb;
		color: white;
	}

	.iframe-container {
		width: 100%;
		transition: opacity 0.3s ease;
	}

	.iframe-container.loaded {
		opacity: 1;
	}

	iframe {
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		background-color: white;
	}

	iframe:hover {
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.demo-container {
			margin: -1rem;
		}

		iframe {
			border-radius: 0.5rem;
		}

		.loading-container {
			padding: 2rem 1rem;
		}

		.error-container {
			margin: 0 -1rem;
			border-radius: 0.5rem;
		}

		.error-actions {
			flex-direction: column;
		}
	}

	/* Project-specific styles can be added here if needed */
	:global(.fm-memory-game-challenge) {
		/* Memory Game specific adjustments if needed */
	}

	:global(.fm-tic-tac-toe) {
		/* Tic Tac Toe specific adjustments if needed */
	}

	:global(.fm-connect-four) {
		/* Connect Four specific adjustments if needed */
	}
</style>
