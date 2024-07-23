<script lang="ts">
	import { page } from '$app/stores';

	export let data;
	const { selectedProject } = data;

	let src: string;

	let iframe: HTMLIFrameElement;
	let height = 400;
	let isLoaded = false;

	function getHeightHandler(event: MessageEvent) {
		if (event.data.type === 'getHeight') {
			height = event.data.height + 10;
			isLoaded = true;
			window.removeEventListener('message', getHeightHandler);
		}
	}

	function getHeight() {
		isLoaded = true;
		iframe.contentWindow?.postMessage('getHeight', '*');
	}

	$: {
		if (iframe) {
			isLoaded = false;
			window.addEventListener('message', getHeightHandler);
			iframe.addEventListener('load', getHeight);
			iframe.src = $selectedProject.demoLink;
		}
	}
	$: console.log({ height });
</script>

<div class="columns">
	<div class="column is-8 title">{$selectedProject.name}</div>
	<div class="column">
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
