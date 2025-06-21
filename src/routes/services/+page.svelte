<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<SEO {...data.seo} />

<div class="prose max-w-4xl mx-auto">
	<h1>{m['services.heading']()}</h1>

	<p class="lead">
		{m['services.lead_text']()}
	</p>

	<div class="grid md:grid-cols-2 gap-6 my-8">
		<div class="card">
			<h3>{m['services.web_apps.title']()}</h3>
			<p>{m['services.web_apps.description']()}</p>
		</div>

		<div class="card">
			<h3>{m['services.mobile_apps.title']()}</h3>
			<p>{m['services.mobile_apps.description']()}</p>
		</div>

		<div class="card">
			<h3>{m['services.api_integration.title']()}</h3>
			<p>{m['services.api_integration.description']()}</p>
		</div>

		<div class="card">
			<h3>{m['services.technical_consulting.title']()}</h3>
			<p>{m['services.technical_consulting.description']()}</p>
		</div>
	</div>

	<div class="cta-section">
		<h2>{m['services.cta_section.title']()}</h2>
		<p>{m['services.cta_section.description']()}</p>
		<a href="/contact" class="btn btn-primary">{m['services.cta_section.button']()}</a>
	</div>
</div>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	.prose {
		@apply text-base-content;
	}

	.lead {
		@apply text-xl text-base-content/80 mb-8 leading-relaxed;
	}

	.card {
		@apply bg-base-100 p-8 rounded-xl shadow-sm border border-base-300;
		@apply hover:shadow-md transition-all duration-300 hover:border-primary/30;
	}

	.card h3 {
		@apply text-xl font-bold mb-4 text-primary;
	}

	.card p {
		@apply text-base-content/80 leading-relaxed text-base;
	}

	.cta-section {
		@apply text-center py-16 px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50;
		@apply dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-xl mt-12;
		@apply border border-base-300 shadow-sm;
	}

	.cta-section h2 {
		@apply text-3xl font-bold mb-6 text-base-content;
	}

	.cta-section p {
		@apply text-lg text-base-content/80 mb-8 leading-relaxed;
	}

	.btn {
		@apply btn btn-primary btn-lg;
	}
</style>
