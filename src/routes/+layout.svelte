<script lang="ts">
	import '../app.css';
	import Link from '../lib/components/Link.svelte';
	import Navbar from './../lib/components/Navbar.svelte';
</script>

<!-- load user theme before rendering -->
<svelte:head>
	<script>
		const dataTheme = localStorage.getItem('theme');
		if (dataTheme) document.documentElement.setAttribute('data-theme', dataTheme);
	</script>
</svelte:head>

<main class="container">
	<Navbar>
		<Link href="/">Blog</Link>
		<Link href="/portfolio" preload="off">Portfolio</Link>
		<Link href="/contact">Contact</Link>
		<Link href="/cv">CV</Link>
	</Navbar>
	<slot></slot>
</main>

<style lang="postcss">
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
			--page-horizontal-padding: 0.5rem;
			font-size: 12px;
		}
	}

	main {
		padding: var(--page-vertical-padding) var(--page-horizontal-padding);
	}
</style>
