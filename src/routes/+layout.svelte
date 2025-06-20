<script lang="ts">
	import '../app.css';
	import Link from './(root)/layout/Link.svelte';
	import Navbar from './(root)/layout/Navbar.svelte';

	const { children, data } = $props();
</script>

<!-- load user theme before rendering -->
<svelte:head>
	<script>
		const dataTheme = localStorage.getItem('theme');
		if (dataTheme) document.documentElement.setAttribute('data-theme', dataTheme);
	</script>
</svelte:head>

<Navbar>
	{#snippet brand()}
		<a class="btn btn-ghost text-xl" href="/">
			{' '}
			Blog
		</a>
	{/snippet}

	<Link href="/">Blog</Link>
	<Link href="/contact">Contact</Link>
	<Link href="/portfolio" preload="off">Portfolio</Link>

	<!-- public link -->
	{#if data.env === 'development'}
		<Link href="/cv">CV</Link>
	{/if}
</Navbar>

<main class="content-grid p-4">
	{@render children()}
</main>

<style>
	@reference "tailwindcss";
	:root {
		--page-breakout: 0.5rem;
		--page-margin: 0.5rem;
		font-size: 12px;
	}

	@media (min-width: 640px) {
		:root {
			--page-breakout: 1.5rem;
			--page-margin: 0.5rem;
			font-size: 14px;
		}
	}

	@media (min-width: 960px) {
		:root {
			--page-breakout: 2rem;
			--page-margin: 1rem;
			font-size: 16px;
		}
	}

	main {
		@apply w-full relative;
	}
</style>
