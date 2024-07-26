<script lang="ts">
	export let data;
	const { selectedProject } = data;

	let iframe: HTMLIFrameElement;
	let isLoaded = false;

	$: if (iframe) {
		iframe.onload = () => {
			isLoaded = true;
		};
		iframe.classList.add($selectedProject.slug);
		iframe.src = $selectedProject.demoLink;
	}
</script>

<div class="columns level">
	<div class="column is-8 title level-left">{$selectedProject.name}</div>
	<div class="column level-right">
		<div class="buttons is-justify-content-flex-end">
			<button
				class="button is-info is-outlined"
				on:click={() => {
					history.back();
				}}>back</button
			>
		</div>
	</div>
</div>

{#if !isLoaded}
	<progress class="progress is-large" />
{/if}

<div style="opacity: {isLoaded ? 1 : 0}">
	<iframe
		style="opacity: {isLoaded ? 1 : 0}"
		bind:this={iframe}
		title="tic-tac-toe"
		frameborder="0"
		class="container"
	/>
</div>

<style>
	div {
		transition: all 1s;
		& iframe {
			border-radius: 15px;
			resize: both;
		}
	}

	:global(.fm-memory-game-challenge) {
		height: 700px;
	}

	@media (max-width: 851px) {
		:global(.fm-memory-game-challenge) {
			height: 600px;
		}
	}

	:global(.fm-tic-tac-toe) {
		height: 720px;
	}
</style>
