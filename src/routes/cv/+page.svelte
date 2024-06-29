<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let cvHTML: string | Promise<string>;

	onMount(async () => {
		const cvData = await (await fetch('/CV.md')).text();
		cvHTML = marked.parse(cvData);
	});
</script>

<main id="cv" data-theme="light" class="cv card">
	{#await cvHTML}
		<progress class="progress is-small is-primary" max="100"></progress>
	{:then cvContent}
		{@html cvContent}
	{/await}
</main>

<style>
	.cv {
		margin: auto;
		margin-top: 1rem;
		width: 1080px;
		padding: 2rem;

		& h1 {
			font-size: 2rem;
		}
		& h2 {
			margin: 1rem 0;
			font-size: 1.75rem;
			border-bottom: 1px solid black;
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

		& strong {
			color: black;
		}

		& ul {
			margin: 0 3rem;
			list-style: unset;
			& li {
				font-size: 1rem;
			}
		}
	}
</style>
