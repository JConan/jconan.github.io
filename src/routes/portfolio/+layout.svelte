<script lang="ts">
	import { page } from '$app/stores';
	import { route } from '$lib/ROUTES.js';
	import { Github } from 'lucide-svelte';
	export let data;
	const { projects, selectedProject: selectedProjectStore } = data;

	$: selectProject = $selectedProjectStore!;

	$: isDemo = $page.url.pathname.endsWith('/demo');
	$: console.log({ isDemo });
</script>

<div class="columns">
	<div class="column is-one-fifth">
		<aside class="menu">
			<a href="https://www.frontendmentor.io" class="menu-label">Frontend Mentor</a>
			<ul class="menu-list">
				{#each projects as { name, slug }}
					<li>
						<a
							class={selectProject.slug === slug ? 'is-selected' : ''}
							href={route('/portfolio/[slug]', { slug })}>{name}</a
						>
					</li>
				{/each}
			</ul>
		</aside>
	</div>
	<div class="column is-four-fifths">
		<div class="tabs">
			<ul>
				<li class={!isDemo ? 'is-active' : ''}>
					<a href={route('/portfolio/[slug]', { slug: selectProject.slug })}>description</a>
				</li>
				<li class={isDemo ? 'is-active' : ''}>
					<a href={route('/portfolio/[slug]/demo', { slug: selectProject.slug })}>demo</a>
				</li>
				<li>
					<a href={selectProject.source} target="_blank"><Github size="18" />github</a>
				</li>
			</ul>
		</div>

		<slot />
	</div>
</div>

<style>
	.tabs {
		& li:last-child {
			margin-left: auto;
		}
	}
</style>
