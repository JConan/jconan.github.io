<script lang="ts">
	import { page } from '$app/stores';
	import type { KIT_ROUTES } from '$lib/ROUTES';
	import type { Snippet } from 'svelte';

	type Routes = keyof KIT_ROUTES['PAGES'];

	interface Props {
		href: Routes;
		preload?: 'hover' | 'tap' | 'off';
		children: Snippet;
	}

	const { href, preload = $bindable('hover'), children }: Props = $props();

	let currentPath = $state('');
	$effect(() => {
		currentPath = $page.url.pathname;
	});
</script>

<a
	data-sveltekit-preload-data={preload}
	class="menu menu-horizontal hover:text-blue-600 hover:bg-blue-100 transition flex py-2 px-4 rounded-md"
	class:active={(href === '/' && href === currentPath) ||
		(href !== '/' && currentPath.startsWith(href))}
	{href}
>
	{@render children()}
</a>

<style>
	@reference "tailwindcss";
	.active {
		@apply text-blue-600 bg-blue-100;
	}
</style>
