<script lang="ts">
	let isActiveClass = '';
	function toggle() {
		isActiveClass = isActiveClass === '' ? 'is-active' : '';
	}
</script>

<section>
	<nav class="navbar" aria-label="main navigation">
		<div class="navbar-brand">
			<slot name="brand" />

			<div class="navbar-small {isActiveClass}">
				<button class="button is-small">download</button>
				<button
					class="navbar-burger"
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
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div id="navbar-items" class="navbar-menu {isActiveClass}" on:click={toggle}>
			<div class="navbar-start">
				<slot />
			</div>

			<div class="navbar-end">
				<slot name="end" />
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
