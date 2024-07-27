<script lang="ts">
	import { page } from '$app/stores';
	import type { KIT_ROUTES } from '$lib/ROUTES';

	type Routes = keyof KIT_ROUTES['PAGES'];

	export let href: Routes;
	export let preload: 'hover' | 'tap' | 'off' = 'hover';

	$: currentPath = $page.url.pathname;
</script>

<a
	data-sveltekit-preload-data={preload}
	class="navbar-item {(href === '/' && href === currentPath) ||
	(href !== '/' && currentPath.startsWith(href))
		? 'is-selected'
		: ''}"
	{href}
>
	<slot />
</a>
