<script lang="ts">
	import 'bulma/css/bulma.css';
	import Link from '../lib/components/Link.svelte';
	import Navbar from './../lib/components/Navbar.svelte';
	import { jsPDF } from 'jspdf';
	import { page } from '$app/stores';

	function getCV() {
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
			callback: (docOut) => {
				window.open(doc.output('bloburl'), '_blank');
				container.setAttribute('data-theme', 'dark');
			},
			margin: 6,
			width: 196,
			windowWidth: 1080,
			autoPaging: 'text'
		});
	}
</script>

<main class="container">
	<Navbar>
		<Link href="/">Home</Link>
		<Link href="/portfolio">Portfolio</Link>
		<Link href="/contact">Contact</Link>
		<Link href="/cv">CV</Link>

		<div slot="end" class="navbar-item">
			{#if $page.url.pathname === '/cv'}
				<button on:click={getCV} class="button is-primary">Download</button>
			{/if}
		</div>
	</Navbar>
	<slot></slot>
</main>

<style>
	:root {
		--page-vertical-padding: 2rem;
		--page-horizontal-padding: 5rem;
		font-size: 16px;
	}
	@media (max-width: 960px) {
		:root {
			--page-vertical-padding: 1rem;
			--page-horizontal-padding: 3rem;
			font-size: 14px;
		}
	}
	@media (max-width: 640px) {
		:root {
			--page-vertical-padding: 0.75rem;
			--page-horizontal-padding: 1.5rem;
			font-size: 12px;
		}
	}

	main {
		min-width: 448px;
		padding: var(--page-vertical-padding) var(--page-horizontal-padding);
	}
</style>
