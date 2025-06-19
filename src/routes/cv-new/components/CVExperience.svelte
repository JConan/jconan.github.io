<script lang="ts">
	import type { CVData } from '$lib/types/cv.js';

	interface Props {
		experience: CVData['experience'][0];
		showDetails?: boolean;
	}

	let { experience, showDetails = true }: Props = $props();
</script>

<article class="experience-item mb-6 p-4 border-l-4 border-primary/30 bg-base-200/50 rounded-r-lg">
	<div class="experience-header mb-3">
		<h3 class="text-lg font-semibold text-primary mb-1">
			{experience.title}
		</h3>

		<div class="text-sm text-base-content/70 space-y-1">
			<div class="flex flex-wrap gap-2">
				<span class="font-medium">{experience.company}</span>
				{#if experience.location}
					<span>• {experience.location}</span>
				{/if}
			</div>
			<div class="font-medium text-accent">
				{experience.period}
			</div>
		</div>
	</div>

	{#if showDetails && experience.responsibilities.length > 0}
		<div class="experience-responsibilities">
			<ul class="list-disc list-inside space-y-1 text-sm">
				{#each experience.responsibilities as responsibility}
					<li class="text-base-content/90">{responsibility}</li>
				{/each}
			</ul>
		</div>
	{/if}
</article>

<style>
	@reference "tailwindcss";
</style>
