<script lang="ts">
	import type { Snippet } from 'svelte';
	import HamburgerButton from './HamburgerButton.svelte';
	import ThemeButton from './ThemeButton.svelte';
	import { page } from '$app/state';
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';

	interface Props {
		brand?: Snippet;
		children: Snippet;
	}
	const { brand, children }: Props = $props();
	let pathname = $derived(page.url.pathname);
</script>

<header class="sticky top-0 z-50">
	<nav
		class="navbar bg-base-100/90 shadow-xs backdrop-blur-lg justify-center items-center py-2 md:px-10 px-5"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<HamburgerButton />

				<div
					class="menu dropdown-content menu-md z-1 mt-3 w-52 gap-2 rounded-box bg-base-100 p-2 shadow-sm"
				>
					{@render children()}
				</div>
			</div>

			{#if brand}
				{@render brand()}
			{/if}
		</div>

		<div class="navbar-center hidden lg:flex">
			{@render children()}
		</div>

		<div class="navbar-end">
			<ThemeButton />
			<details class="dropdown">
				<summary class="btn m-1">{getLocale()}</summary>
				<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each locales as locale}
						<li>
							<button onclick={() => goto(localizeHref(page.url.pathname, { locale }))}
								>{locale.toUpperCase()}</button
							>
						</li>
					{/each}
				</ul>
			</details>
		</div>
	</nav>
</header>

<style>
	@reference "tailwindcss";
</style>
