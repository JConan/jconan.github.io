<script lang="ts">
	import Icon from '@iconify/svelte';
	import { theme } from '$lib/stores/Theme';
	import { onMount } from 'svelte';

	let isActiveClass = '';
	let icon = '';
	let isAnimating = false;

	onMount(() => {
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

	$: console.log({ icon });
</script>

<section>
	<nav class="navbar" aria-label="main navigation">
		<div class="navbar-brand">
			<slot name="brand" />

			<button
				class="navbar-burger {isActiveClass}"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbar-items"
				on:click={toggle}
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</button>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div id="navbar-items" class="navbar-menu {isActiveClass}" on:click={toggle}>
			<div class="navbar-start">
				<slot />
			</div>

			<div class="navbar-end">
				<button
					bind:this={button}
					on:click={theme.toggle}
					class="button is-ghost is-small navbar-item"
					on:mouseenter={() => {
						isAnimating = true;
					}}
					on:mouseleave={() => {
						isAnimating = false;
					}}
				>
					{#key icon}
						<Icon {icon} height={'2rem'} />
					{/key}
				</button>
			</div>
		</div>
	</nav>
</section>

<style>
	section {
		& .navbar-small {
			width: 100%;
			display: flex;
		}
		margin-bottom: 1rem;

		& :global(svg animate) {
			fill: freeze;
			animation-fill-mode: forwards;
			animation-iteration-count: 1;
		}
	}
</style>
