<script lang="ts">
	import type { Snippet } from 'svelte';
	import HamburgerButton from './HamburgerButton.svelte';
	import ThemeButton from './ThemeButton.svelte';

	interface Props {
		brand?: Snippet;
		children: Snippet;
	}
	const { brand, children }: Props = $props();
</script>

<header class="sticky top-0 z-50">
	<nav
		class="navbar bg-base-100/90 shadow-sm backdrop-blur-lg justify-center items-center py-2 md:px-10 px-5"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<HamburgerButton />

				<div
					class="menu dropdown-content menu-md z-[1] mt-3 w-52 gap-2 rounded-box bg-base-100 p-2 shadow"
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
		</div>
	</nav>
</header>

<style lang="postcss">
</style>
