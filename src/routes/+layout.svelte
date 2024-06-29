<script lang="ts">
	import 'bulma/css/bulma.css';
	import Link from '../lib/components/Link.svelte';
	import Navbar from './../lib/components/Navbar.svelte';
	import { jsPDF } from 'jspdf';
	import { page } from '$app/stores';

	function getCV() {
		const doc = new jsPDF({
			format: 'a4',
			orientation: 'portrait',
			unit: 'mm'
		});
		doc.addFont('Inter-VariableFont_slnt,wght.ttf', 'Inter', 'normal');
		doc.setFont('Inter');
		doc.html(document.getElementById('cv')!, {
			callback: (docOut) => {
				window.open(doc.output('bloburl'), '_blank');
			},
			margin: 6,
			width: 196,
			windowWidth: 1080,
			autoPaging: 'text'
		});
	}
</script>

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
