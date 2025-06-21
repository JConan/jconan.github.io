<div class="prose max-w-4xl mx-auto">
	<h1>Blog Technique</h1>

	<p class="lead">
		Articles et retours d'expérience sur le développement web moderne, les frameworks JavaScript et
		les meilleures pratiques.
	</p>

	<div class="coming-soon">
		<div class="icon">📝</div>
		<h2>Contenu en cours de préparation</h2>
		<p>Je prépare actuellement une série d'articles techniques sur :</p>
		<ul class="topics-list">
			<li>Migration de React vers Svelte 5</li>
			<li>Optimisation des performances web</li>
			<li>Architecture d'applications SvelteKit</li>
			<li>Intégration continue et déploiement</li>
			<li>Bonnes pratiques TypeScript</li>
		</ul>

		<div class="cta">
			<p>En attendant, n'hésitez pas à consulter mes projets de parcours :</p>
			<a href="/journey" class="btn btn-primary" data-sveltekit-preload-data="off"
				>Voir le Portfolio</a
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
