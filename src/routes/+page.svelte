<script lang="ts">
	import MaltLogo from '$lib/assets/icons/malt-logo.svelte';
	import { m } from '$lib/paraglide/messages';
	import Icon from '@iconify/svelte';
</script>

<div class="grid p-0 full-width">
	<div class="text-center pt-4 padded-container">
		<div class="badge badge-outline badge-lg">{m['homepage.availability_badge']()}</div>
		<h1 class="text-4xl md:text-5xl xl:text-7xl font-semibold brightness-150">
			{@html m['homepage.hero_title']({ name: '<span class="text-blue-600">Johan</span>' })}
		</h1>
		<p class="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-base-content/80">
			{m['homepage.hero_description']()}
		</p>
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
		<h2 class="text-xl font-light">{m['homepage.cta_section_title']()}</h2>
		<p class="text-base-content/70 mb-6 text-center max-w-md">
			{m['homepage.cta_section_description']()}
		</p>
		<div class="flex justify-center lg:justify-start space-x-4 mt-4">
			<a
				class="btn btn-circle btn-md"
				href="https://www.linkedin.com/in/johan-chan/"
				target="_blank"
				aria-label={m['homepage.linkedin_aria_label']()}
			>
				<Icon icon="teenyicons:linkedin-outline" height="2rem" />
			</a>
			<a
				class="btn btn-circle btn-md"
				href="https://www.malt.fr/profile/johanchan"
				target="_blank"
				aria-label={m['homepage.malt_aria_label']()}
			>
				<MaltLogo />
			</a>
		</div>
	</div>
</div>

<style>
	@reference "tailwindcss";
</style>
