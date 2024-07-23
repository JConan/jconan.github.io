<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
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
