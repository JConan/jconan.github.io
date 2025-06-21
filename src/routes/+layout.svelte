<script lang="ts">
	import '../app.css';
	import Link from './(root)/layout/Link.svelte';
	import Navbar from './(root)/layout/Navbar.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { getSEOData } from '$lib/data/seo-data';
	import { page } from '$app/stores';

	const { children, data } = $props();

	// Get SEO data for current page
	const seoData = $derived(getSEOData($page.url.pathname));
</script>

<!-- SEO Component -->
<SEO {...seoData} />

<!-- load user theme before rendering -->
<svelte:head>
	<script>
		const dataTheme = localStorage.getItem('theme');
		if (dataTheme) document.documentElement.setAttribute('data-theme', dataTheme);
	</script>
</svelte:head>

<Navbar>
	{#snippet brand()}
		<a class="btn btn-ghost text-xl" href="/"> Johan Chan </a>
	{/snippet}

	<Link href="/">Accueil</Link>
	<Link href="/portfolio" preload="off">Portfolio</Link>
	<Link href="/cv">CV</Link>
	<Link href="/contact">Contact</Link>

	<!-- Development-only additional pages -->
	{#if data.env === 'development'}
		<Link href="/services">Services</Link>
		<Link href="/blog">Blog</Link>
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
