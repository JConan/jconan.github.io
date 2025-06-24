<script lang="ts">
	import '../app.css';
	import Link from '$lib/components/Link.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { getSEOData } from '$lib/data/seo-data';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';

	const { children, data } = $props();

	// Get SEO data for current page
	const seoData = $derived(getSEOData(page.url.pathname));
</script>

<!-- Paraglide static generation strategy -->
<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<!-- SEO Component -->
<SEO {...seoData} />

<!-- load user theme before rendering -->
<svelte:head>
	<script>
		dataTheme = localStorage.getItem('theme');
		if (dataTheme) document.documentElement.setAttribute('data-theme', dataTheme);
	</script>
</svelte:head>

<Navbar>
	{#snippet brand()}
		<a class="btn btn-ghost text-xl" href="/">{m['navigation.brand']()}</a>
	{/snippet}

	<Link href="/">{m['navigation.home']()}</Link>
	<Link href="/services">{m['navigation.services']()}</Link>
	<Link href="/contact">{m['navigation.contact']()}</Link>

	<!-- Development-only additional pages -->
	{#if data.env === 'development'}
		<Link href="/blog">{m['navigation.blog']()}</Link>
	{/if}

	<Link href="/journey" preload="off">{m['navigation.journey']()}</Link>
	<Link href="/about">{m['navigation.about']()}</Link>
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
		@apply w-full h-[calc(100%-4rem)] relative;
	}
</style>
