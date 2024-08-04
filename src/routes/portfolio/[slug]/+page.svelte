<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	export let data;

	let description = '';

	onMount(() => {
		return data.selectedProject.subscribe(async ($selected) => {
			description = await marked.parse(await (await fetch($selected.descriptionLink)).text());
		});
	});
</script>

<div class="content">
	{@html description}
</div>
