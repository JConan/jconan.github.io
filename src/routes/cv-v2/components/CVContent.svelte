<script lang="ts">
	const { cvHTML } = $props<{
		cvHTML: string;
	}>();

	let element: HTMLElement;

	// Export the element so parent can access it
	export { element };
</script>

<article bind:this={element} class="cv-content">
	{@html cvHTML}
</article>

<style>
	@reference "tailwindcss";

	.cv-content {
		background: white;
		padding: 3rem;
		border-radius: 12px;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		max-width: 100%;
		overflow-x: auto;
	}

	/* CV Styling */
	.cv-content :global(h1) {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 1rem;
		text-align: center;
	}

	.cv-content :global(h2) {
		font-size: 1.875rem;
		font-weight: 600;
		color: #374151;
		margin: 2rem 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #e5e7eb;
	}

	.cv-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: #4b5563;
		margin: 1.5rem 0 0.5rem;
	}

	.cv-content :global(p) {
		line-height: 1.6;
		margin-bottom: 1rem;
		color: #374151;
	}

	.cv-content :global(ul) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.cv-content :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
		color: #374151;
	}

	.cv-content :global(a) {
		color: #3b82f6;
		text-decoration: underline;
	}

	.cv-content :global(a:hover) {
		color: #1d4ed8;
	}

	.cv-content :global(strong) {
		font-weight: 600;
		color: #1f2937;
	}

	/* Header grid styling */
	.cv-content :global(div[style*='grid-template-columns']) {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5rem 1rem;
		align-items: start;
		margin-bottom: 3rem;
		position: relative;
	}

	.cv-content :global(div[style*='grid-template-columns'] h1) {
		grid-column: 1 / -1;
		text-align: left;
		margin-bottom: 1.5rem;
	}

	.cv-content :global(img) {
		max-width: 160px;
		height: auto;
		border-radius: 8px;
		position: absolute;
		top: 0;
		right: 0;
	}

	/* Page break styling for PDF */
	.cv-content :global(div[style*='page-break-inside']) {
		break-inside: avoid;
		page-break-inside: avoid;
		margin-bottom: 1.5rem;
	}

	.cv-content :global(.page-break-before) {
		page-break-before: always;
	}

	.cv-content :global(.page-break-after) {
		page-break-after: always;
	}

	.cv-content :global(.page-break-avoid) {
		page-break-inside: avoid;
		break-inside: avoid;
	}

	@media (max-width: 768px) {
		.cv-content {
			padding: 1.5rem;
		}

		.cv-content :global(h1) {
			font-size: 2rem;
		}

		.cv-content :global(h2) {
			font-size: 1.5rem;
		}

		.cv-content :global(div[style*='grid-template-columns']) {
			grid-template-columns: 1fr;
		}

		.cv-content :global(img) {
			position: static;
			margin: 1rem auto;
			display: block;
			max-width: 120px;
		}
	}

	@media (max-width: 480px) {
		.cv-content {
			padding: 1rem;
		}

		.cv-content :global(img) {
			display: none;
		}
	}
</style>
