<script>
	import * as m from '$lib/paraglide/messages';
</script>

<div class="prose max-w-4xl mx-auto">
	<h1>{m['blog.heading']()}</h1>

	<p class="lead">
		{m['blog.lead_text']()}
	</p>

	<div class="coming-soon">
		<div class="icon">📝</div>
		<h2>{m['blog.coming_soon.heading']()}</h2>
		<p>{m['blog.coming_soon.description']()}</p>
		<ul class="topics-list">
			<li>{m['blog.coming_soon.topics.react_to_svelte']()}</li>
			<li>{m['blog.coming_soon.topics.performance_optimization']()}</li>
			<li>{m['blog.coming_soon.topics.sveltekit_architecture']()}</li>
			<li>{m['blog.coming_soon.topics.ci_cd']()}</li>
			<li>{m['blog.coming_soon.topics.typescript_best_practices']()}</li>
		</ul>

		<div class="cta">
			<p>{m['blog.coming_soon.cta_text']()}</p>
			<a href="/journey" class="btn btn-primary" data-sveltekit-preload-data="off"
				>{m['blog.coming_soon.cta_button']()}</a
			>
		</div>
	</div>
</div>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	.prose {
		@apply text-base-content;
	}

	.prose h1 {
		@apply text-3xl font-bold mb-6 text-base-content;
	}

	.lead {
		@apply text-xl text-base-content/80 mb-12;
	}

	.coming-soon {
		@apply text-center py-16 px-8 bg-base-200 rounded-xl;
	}

	.icon {
		@apply text-6xl mb-6;
	}

	.coming-soon h2 {
		@apply text-2xl font-bold mb-6 text-base-content;
	}

	.coming-soon p {
		@apply text-base-content/80 mb-6;
	}

	.topics-list {
		@apply text-left max-w-md mx-auto mb-8 space-y-2;
	}

	.topics-list li {
		@apply flex items-center text-base-content/80;
	}

	.topics-list li::before {
		content: '→';
		@apply text-primary mr-3 font-bold;
	}

	.cta {
		@apply pt-6 border-t border-base-300;
	}

	.cta p {
		@apply text-base-content/80 mb-4;
	}

	.btn {
		@apply btn btn-primary btn-lg;
	}
</style>
