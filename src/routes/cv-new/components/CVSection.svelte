<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
		printBreakBefore?: boolean;
	}

	let { title, children, printBreakBefore = false }: Props = $props();
</script>

<section class="cv-section mb-8 {printBreakBefore ? 'print:break-before-page' : ''}">
	<h2 class="cv-section-title text-2xl font-bold border-b-2 border-primary pb-2 mb-4">
		{title}
	</h2>

	<div class="cv-section-content">
		{@render children()}
	</div>
</section>

<style>
	@reference "tailwindcss";
</style>
