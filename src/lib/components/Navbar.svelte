<script lang="ts">
	import { theme } from '$lib/stores/Theme';
	import { Sun, Moon } from 'lucide-svelte';

	let isActiveClass = '';
	function toggle() {
		isActiveClass = isActiveClass === '' ? 'is-active' : '';
	}
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
				<button on:click={theme.toggle} class="button is-ghost is-small navbar-item">
					{#if $theme === 'dark'}
						<Sun />
					{:else}
						<Moon />
					{/if}
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
	}
</style>
