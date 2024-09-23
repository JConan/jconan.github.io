<script lang="ts">
	import Icon from '@iconify/svelte';
	import { theme } from '$lib/stores/Theme';
	import type { Snippet } from 'svelte';

	interface Props {
		brand?: Snippet;
		children: Snippet;
	}

	const { brand, children }: Props = $props();

	let isActiveClass = $state('');
	let icon = $state('');
	let isAnimating = $state(false);

	$effect(() => {
		icon = $theme === 'dark' ? 'line-md:moon-filled-loop' : 'line-md:sunny-filled-loop';
	});

	function toggle() {
		isActiveClass = isActiveClass === '' ? 'is-active' : '';
		icon =
			$theme === 'dark'
				? 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'
				: 'line-md:moon-filled-to-sunny-filled-loop-transition';
	}

	let button: HTMLButtonElement;
</script>

<header class="sticky top-0 z-50">
	<nav
		class="navbar bg-base-100/90 shadow-sm backdrop-blur-lg justify-center items-center py-2 md:px-10 px-5"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<button aria-label="button" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						></path>
					</svg>
				</button>

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
			<button
				bind:this={button}
				onclick={theme.toggle}
				class="button is-ghost is-small navbar-item"
				onmouseenter={() => {
					isAnimating = true;
				}}
				onmouseleave={() => {
					isAnimating = false;
				}}
			>
				{#key icon}
					<Icon {icon} height={'2rem'} />
				{/key}
			</button>
		</div>
	</nav>
</header>

<style>
</style>
