<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	let isActiveClass = '';
	function toggle() {
		isActiveClass = isActiveClass === '' ? 'is-active' : '';
	}

	let isDarkTheme: boolean | undefined = undefined;

	onMount(() => {
		const bodyTheme = document.documentElement.getAttribute('data-theme');
		isDarkTheme = bodyTheme
			? bodyTheme === 'dark'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	function toggleTheme() {
		isDarkTheme = !isDarkTheme;
	}

	$: if (isDarkTheme !== undefined) {
		document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
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
				<button on:click={toggleTheme} class="button is-ghost is-small navbar-item">
					{#if isDarkTheme}
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
