<script lang="ts">
	import { route } from '$lib/ROUTES';
	export let data;
</script>

<aside class="menu">
	<a href="https://www.frontendmentor.io" class="menu-label">Frontend Mentor</a>
	<ul class="menu-list">
		{#each data.projects as { name, slug }}
			<li><a href={route('/portfolio/demo/[slug]', { slug })}>{name}</a></li>
		{/each}
	</ul>
</aside>
