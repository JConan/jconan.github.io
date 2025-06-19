<script lang="ts">
	interface Props {
		skills: string[];
	}

	let { skills }: Props = $props();
</script>

<div class="skills-container">
	<ul class="space-y-2">
		{#each skills as skill}
			<li class="flex items-start gap-2">
				<span class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
				<span class="text-base-content">{skill}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	@reference "tailwindcss";
</style>
