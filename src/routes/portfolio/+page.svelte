<script lang="ts">
	let iframe: HTMLIFrameElement;
	let height = 400;
	let isLoaded = false;

	function getHeightHandler(event: MessageEvent) {
		if (event.data.type === 'getHeight') {
			console.log({ data: event.data });
			height = event.data.height + 10;
			isLoaded = true;
		}
	}

	function getHeight() {
		window.addEventListener('message', getHeightHandler);
		iframe.contentWindow?.postMessage('getHeight', '*');
	}
</script>

<p>Tic Tac Toe</p>

<div style="opacity: {isLoaded ? 1 : 0}">
	<iframe
		bind:this={iframe}
		title="tic-tac-toe"
		src="https://jconan.github.io/fm-tic-tac-toe/"
		frameborder="0"
		class="container"
		{height}
		on:load={getHeight}
	></iframe>
</div>

<style>
	div {
		transition: all 1s;
		& iframe {
			border-radius: 15px;
		}
	}
</style>
