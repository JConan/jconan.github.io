<script lang="ts">
	import { page } from '$app/stores';
	import { route } from '$lib/ROUTES.js';
	import Icon from '@iconify/svelte';

	export let data;
	const { projects, selectedProject: selectedProjectStore } = data;

	$: selectProject = $selectedProjectStore!;

	$: isDemo = $page.url.pathname.endsWith('/demo');
</script>

<div class="full-width grid grid-cols-5 gap-x-2">
	<div>
		<aside>
			<a href="https://www.frontendmentor.io" target="_blank" class="menu-label">Frontend Mentor</a>
			<ul class="menu">
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
	<div class="col-start-2 col-end-5">
		<ul class="tabs tabs-bordered mb-4">
			<li role="tab" class="tab" class:tab-active={!isDemo}>
				<a href={route('/portfolio/[slug]', { slug: selectProject.slug })}>description</a>
			</li>
			<li role="tab" class="tab" class:tab-active={isDemo}>
				<a href={route('/portfolio/[slug]/demo', { slug: selectProject.slug })}>demo</a>
			</li>
			<li class="tab justify-end">
				<a href={selectProject.source} target="_blank" class="flex items-center"
					><Icon icon="mynaui:brand-github" height="18" /> github
				</a>
			</li>
		</ul>

		<slot />
	</div>
</div>
