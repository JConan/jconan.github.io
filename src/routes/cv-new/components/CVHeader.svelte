<script lang="ts">
	import type { CVData } from '$lib/types/cv.js';

	interface Props {
		personalInfo: CVData['personalInfo'];
	}

	let { personalInfo }: Props = $props();
</script>

<header class="cv-header grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative">
	<div class="md:col-span-2">
		<h1 class="text-4xl font-bold text-primary mb-4">{personalInfo.name}</h1>

		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<strong class="text-base-content/70">Email:</strong>
				<span class="text-base-content">{personalInfo.email}</span>
			</div>

			<div class="flex items-center gap-2">
				<strong class="text-base-content/70">LinkedIn:</strong>
				<a
					href={personalInfo.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					class="link link-primary hover:link-accent"
				>
					{personalInfo.linkedin}
				</a>
			</div>

			<div class="flex items-center gap-2">
				<strong class="text-base-content/70">GitHub:</strong>
				<a
					href={personalInfo.github}
					target="_blank"
					rel="noopener noreferrer"
					class="link link-primary hover:link-accent"
				>
					{personalInfo.github}
				</a>
			</div>
		</div>
	</div>

	<div class="flex justify-center md:justify-end">
		<img
			src={personalInfo.photo}
			alt="Photo de profil de {personalInfo.name}"
			class="w-40 h-40 rounded-lg object-cover shadow-lg"
		/>
	</div>
</header>

<style>
	@reference "tailwindcss";
</style>
