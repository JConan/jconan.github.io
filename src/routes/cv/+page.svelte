<script lang="ts">
	import Icon from '@iconify/svelte';
	import { jsPDF } from 'jspdf';
	export let data;

	let downloadBtn: HTMLButtonElement;

	function getCV() {
		downloadBtn.classList.add('is-loading');
		downloadBtn.disabled = true;

		const container = document.getElementById('cv')!;
		container.setAttribute('data-theme', 'light');
		const doc = new jsPDF({
			format: 'a4',
			orientation: 'portrait',
			unit: 'mm'
		});
		doc.addFont('Inter-VariableFont_slnt,wght.ttf', 'Inter', 'normal');
		doc.setFont('Inter');
		doc.html(container, {
			callback: () => {
				window.open(doc.output('bloburl'), '_blank');
				// doc.save('CV - Johan CHAN.pdf');
				downloadBtn.classList.remove('is-loading');
				downloadBtn.disabled = false;
			},
			margin: 8,
			width: 196,
			windowWidth: 1080,
			autoPaging: 'text'
		});
	}
</script>

<div class="buttons">
	<button bind:this={downloadBtn} on:click={getCV} class="button is-ghost is-small">
		<Icon icon="uil:file-download" />
	</button>
</div>

<div class="cv card">
	{#if data.cvHTML}
		{@html data.cvHTML}
	{:else}
		<progress class="progress is-small is-info" />
	{/if}
</div>

<div style="display: none">
	<div data-theme="light" id="cv" class="cv card print">
		{#if data.cvHTML}
			{@html data.cvHTML}
		{/if}
	</div>
</div>

<style>
	.buttons {
		position: sticky;
		z-index: 1;
		top: 10px;
		margin: 10px;
		height: 50px;

		& button {
			position: absolute;
			right: 0;
		}
	}
	:global(.cv) {
		margin-top: -60px;
		padding: var(--page-vertical-padding) var(--page-horizontal-padding);
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;

		& img {
			width: 8em;
		}

		& h1 {
			font-size: 2em;
		}
		& h2 {
			margin: 1em 0;
			font-size: 1.75em;
			border-bottom: 1px solid;
		}
		& h3 {
			font-size: 1.3em;
			font-weight: 500;

			margin-top: 1em;

			& + p {
				margin-left: 1.5em;
			}

			& strong::before {
				content: '→ ';
				font-weight: bold;
			}
		}

		& p {
			margin-bottom: 0.25em;
			font-size: 1.1em;
		}

		& ul {
			margin: 0 3em;
			list-style: unset;
			& li {
				font-size: 1em;
			}
		}
	}

	:global([data-theme='light'] strong) {
		color: black;
	}

	:global(.print) {
		font-size: 16px;
		padding: 28px 70px;
		margin-top: 0px;
		min-width: 1080px;
		max-width: 1080px;

		& img {
			width: 128px;
		}
	}

	@media (max-width: 640px) {
		.buttons {
			margin: 10px 0px;
		}
	}

	@media (max-width: 445px) {
		:global(.cv:not(.print) img) {
			display: none;
		}
	}
</style>
