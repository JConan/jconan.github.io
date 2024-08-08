<script lang="ts">
	export let data;
	const { selectedProject } = data;

	let iframe: HTMLIFrameElement;
	let isLoaded = false;

	$: if (iframe) {
		iframe.onload = () => {
			isLoaded = true;
			iframe.scrollIntoView({ behavior: 'smooth' });
		};
		iframe.classList.add($selectedProject!.slug);
		iframe.src = $selectedProject!.demoLink;
	}
</script>

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
		height: 780px;
	}

	:global(.fm-tic-tac-toe) {
		height: 720px;
	}

	:global(.fm-connect-four) {
		height: 950px;
	}

	@media (max-width: 851px) {
		:global(.fm-memory-game-challenge) {
			height: 600px;
		}
	}
</style>
