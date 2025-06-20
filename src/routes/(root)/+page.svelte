<script lang="ts">
	import MaltLogo from '$lib/assets/icons/malt-logo.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();
</script>

<div class="grid p-0 full-width">
	<div class="text-center pt-4 padded-container">
		<div class="badge badge-outline badge-lg">Salut!</div>
		<h1 class="text-4xl md:text-5xl xl:text-7xl font-semibold brightness-150">
			Je suis <span class="text-blue-600">Johan,</span>
			<br />
			développeur Fullstack dans le monde du web et mobile.
		</h1>
	</div>

	<div class="hero row-start-2 relative">
		<img
			src="/images/bg.png"
			alt="bg"
			height={500}
			width={700}
			class="max-w-md md:max-w-full absolute bottom-0 -z-10"
		/>

		<img src="/images/johan.webp" alt="bg" height={500} width={700} class="max-w-xs md:max-w-lg" />
	</div>

	<div class="w-full bg-base-200 py-20 flex flex-col justify-center items-center z-40 row-start-3">
		<h1 class="text-xl font-light">Retrouvez moi</h1>
		<div class="flex justify-center lg:justify-start space-x-4 mt-4">
			<a
				class="btn btn-circle btn-md"
				href="https://www.linkedin.com/in/johan-chan/"
				target="_blank"
				aria-label="linkedin"
			>
				<Icon icon="teenyicons:linkedin-outline" height="2rem" />
			</a>
			<a
				class="btn btn-circle btn-md"
				href="https://www.malt.fr/profile/johanchan"
				target="_blank"
				aria-label="youtube"
			>
				<MaltLogo />
			</a>
		</div>
	</div>
</div>

<style>
	@reference "tailwindcss";
</style>
