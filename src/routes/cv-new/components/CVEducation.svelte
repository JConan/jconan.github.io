<script lang="ts">
	import type { CVData } from '$lib/types/cv.js';

	interface Props {
		education: CVData['education'];
	}

	let { education }: Props = $props();
</script>

<div class="education-container space-y-4">
	{#each education as edu}
		<div class="education-item p-3 bg-base-200/30 rounded-lg border-l-4 border-secondary/50">
			<div class="flex flex-wrap items-center gap-2 mb-2">
				<h3 class="font-semibold text-base-content">{edu.institution}</h3>
				<span class="text-sm text-base-content/70">• {edu.year}</span>
			</div>

			{#if edu.certification}
				<div class="certification mb-2">
					{#if edu.link}
						<a
							href={edu.link}
							target="_blank"
							rel="noopener noreferrer"
							class="link link-secondary hover:link-accent text-sm"
						>
							{edu.certification}
						</a>
					{:else}
						<span class="text-sm text-secondary">{edu.certification}</span>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	@reference "tailwindcss";
</style>
