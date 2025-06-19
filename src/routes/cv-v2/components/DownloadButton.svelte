<script lang="ts">
	import Icon from '@iconify/svelte';

	const { isLoading, onclick } = $props<{
		isLoading: boolean;
		onclick: () => void;
	}>();
</script>

<button class="download-btn" class:loading={isLoading} disabled={isLoading} {onclick} type="button">
	{#if isLoading}
		<Icon icon="eos-icons:loading" class="animate-spin" />
		<span>Génération PDF...</span>
	{:else}
		<Icon icon="material-symbols:download" />
		<span>Télécharger PDF</span>
	{/if}
</button>

<style>
	@reference "tailwindcss";

	.download-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	.download-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.15);
	}

	.download-btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.download-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.download-btn :global(.iconify) {
		font-size: 1.25rem;
	}

	@media (max-width: 640px) {
		.download-btn {
			padding: 0.5rem 1rem;
			font-size: 0.875rem;
		}

		.download-btn span {
			display: none;
		}
	}
</style>
