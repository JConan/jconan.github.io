<script lang="ts">
	import type { PageData } from './$types';
	import './cv.css';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>CV - Johan CHAN</title>
	<meta
		name="description"
		content="CV professionnel de Johan CHAN - Développeur Fullstack spécialisé en Svelte et SvelteKit"
	/>
</svelte:head>

<div class="cv-container">
	<!-- Print Button - Hidden in print mode -->
	<div class="cv-actions">
		<button onclick={handlePrint} class="btn btn-primary gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
				/>
			</svg>
			Télécharger PDF
		</button>
	</div>

	<div class="cv">
		{@html data.cvHTML}
	</div>
</div>

<style>
	@reference "tailwindcss";
</style>
