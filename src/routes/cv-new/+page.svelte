<script lang="ts">
	import type { PageData } from './$types';
	import CVHeader from './components/CVHeader.svelte';
	import CVSection from './components/CVSection.svelte';
	import CVSummary from './components/CVSummary.svelte';
	import CVSkills from './components/CVSkills.svelte';
	import CVEducation from './components/CVEducation.svelte';
	import CVExperience from './components/CVExperience.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>CV - {data.cvData.personalInfo.name}</title>
	<meta name="description" content="CV professionnel de {data.cvData.personalInfo.name}" />
</svelte:head>

<div class="cv-container max-w-4xl mx-auto p-6 bg-base-100 min-h-screen">
	<!-- Print Button - Hidden in print mode -->
	<div class="cv-actions mb-6 print:hidden">
		<button onclick={handlePrint} class="btn btn-primary gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
				/>
			</svg>
			Télécharger PDF
		</button>
	</div>

	<!-- CV Header -->
	<CVHeader personalInfo={data.cvData.personalInfo} />

	<!-- Professional Summary -->
	<CVSection title="Résumé Professionnel">
		<CVSummary summary={data.cvData.summary} />
	</CVSection>

	<!-- Skills -->
	<CVSection title="Skills">
		<CVSkills skills={data.cvData.skills} />
	</CVSection>

	<!-- Education -->
	<CVSection title="Formation">
		<CVEducation education={data.cvData.education} />
	</CVSection>

	<!-- Experience -->
	<CVSection title="Experience" printBreakBefore={true}>
		<div class="space-y-4">
			{#each data.cvData.experience as experience}
				<CVExperience {experience} />
			{/each}
		</div>
	</CVSection>
</div>

<style>
	@reference "tailwindcss";
</style>
