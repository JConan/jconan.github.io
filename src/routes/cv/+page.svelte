<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let cvHTML: string | Promise<string>;

	onMount(async () => {
		const cvData = await (await fetch('/CV.md')).text();
		cvHTML = marked.parse(cvData);
	});
</script>

<div id="cv" class="cv">
	{#await cvHTML}
		<progress class="progress is-small is-primary"></progress>
	{:then cvContent}
		{@html cvContent}
	{/await}
</div>

<style>
	.cv {
		min-width: 448px;

		& h1 {
			font-size: 2rem;
		}
		& h2 {
			margin: 1rem 0;
			font-size: 1.75rem;
			border-bottom: 1px solid;
		}
		& h3 {
			font-size: 1.3rem;
			font-weight: 500;

			& ::before {
				content: '⇒ ';
			}

			margin-top: 1rem;

			& + p {
				margin-left: 1.5rem;
			}
		}

		& p {
			margin-bottom: 0.25rem;
			font-size: 1.1rem;
		}

		& ul {
			margin: 0 3rem;
			list-style: unset;
			& li {
				font-size: 1rem;
			}
		}
	}
	@media (max-width: 960px) {
		:global(.cv img) {
			transform: scale(0.75);
		}
	}

	@media (max-width: 640px) {
		:global(.cv img) {
			transform: scale(0.5);
		}
	}
</style>
