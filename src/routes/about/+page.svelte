<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';
	import './cv.css';
	import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
	import { page } from '$app/state';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function handlePrint() {
		window.print();
	}

	function handleDownload() {
		// Download the static PDF file
		const lang = extractLocaleFromUrl(page.url) || 'fr';
		const link = document.createElement('a');
		link.href = `/CV.${lang}.pdf`;
		link.download = 'CV-Johan-CHAN.pdf';
		link.click();
	}
</script>

<div class="cv-container">
	<!-- Action Buttons - Hidden in print mode -->
	<div class="cv-actions">
		<button onclick={handlePrint} class="btn btn-secondary gap-2">
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
			{m['cv.print_button']()}
		</button>

		<button onclick={handleDownload} class="btn btn-primary gap-2">
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
					d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			{m['cv.download_button']()}
		</button>
	</div>

	<div class="cv">
		{@html data.cvHTML}
	</div>
</div>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";
</style>
