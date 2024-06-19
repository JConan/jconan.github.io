<script lang="ts">
	import { page } from '$app/stores';
	import type { KIT_ROUTES } from '$lib/ROUTES';

	type Routes = keyof KIT_ROUTES['PAGES'];

	export let href: Routes;

	$: currentPath = $page.url.pathname;
</script>

<a class="navbar-item {currentPath === href ? 'is-selected' : ''}" {href}>
	<slot />
</a>
