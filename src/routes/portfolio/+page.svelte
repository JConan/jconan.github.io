<script lang="ts">
	import { route } from '$lib/ROUTES';
	import { onMount } from 'svelte';
	export let data;

	const { projects, selectedProject } = data;

	let description = '';

	onMount(() => {
		return data.selectedProject.subscribe(async ($selected) => {
			description = await (await fetch($selected.descriptionLink)).text();
		});
	});

	function selectProject(slug: string) {
		return function () {
			$selectedProject = projects.filter((project) => project.slug === slug)[0];
		};
	}
</script>

<div class="columns">
	<div class="column is-one-fifth">
		<aside class="menu">
			<a href="https://www.frontendmentor.io" class="menu-label">Frontend Mentor</a>
			<ul class="menu-list">
				{#each projects as { name, slug }}
					<li>
						<button
							class={$selectedProject.slug === slug ? 'is-selected' : ''}
							on:click={selectProject(slug)}>{name}</button
						>
					</li>
				{/each}
			</ul>
		</aside>
	</div>
	<div class="column card is-info">
		<header class="card-header">
			<p class="card-header-title">{$selectedProject.shortDescription}</p>
		</header>
		<div class="card-content">{description}</div>
		<footer class="card-footer">
			<a href={$selectedProject.source} target="_blank" class="card-footer-item">github</a>
			<a
				href={route('/portfolio/demo/[slug]', { slug: $selectedProject.slug })}
				class="card-footer-item">demo</a
			>
		</footer>
	</div>
</div>
