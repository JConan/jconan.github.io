<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	let src = data.projects.filter((project) => project.slug === $page.params.slug)[0].demoLink;

	let iframe: HTMLIFrameElement;
	let height = 400;
	let isLoaded = false;

	function getHeightHandler(event: MessageEvent) {
		if (event.data.type === 'getHeight') {
			height = event.data.height + 10;
			isLoaded = true;
		}
	}

	function getHeight() {
		isLoaded = true;
		iframe.contentWindow?.postMessage('getHeight', '*');
	}

	$: {
		if (iframe) {
			window.addEventListener('message', getHeightHandler);
			iframe.addEventListener('load', getHeight);
			iframe.src = src;
			window.removeEventListener('message', getHeightHandler);
		}
	}
</script>

<div class="buttons is-right">
	<button
		class="button is-info is-outlined"
		on:click={() => {
			history.back();
		}}>&lt;= back</button
	>
</div>

<div style="opacity: {isLoaded ? 1 : 0}">
	<iframe bind:this={iframe} title="tic-tac-toe" frameborder="0" class="container" {height} />
</div>

<style>
	div {
		transition: all 1s;
		& iframe {
			border-radius: 15px;
		}
	}
</style>
