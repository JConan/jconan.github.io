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
			<p>En attendant, n'hésitez pas à consulter mes projets :</p>
			<a href="/portfolio" class="btn btn-primary" data-sveltekit-preload-data="off"
				>Voir le Portfolio</a
			>
		</div>
	</div>
</div>

<style>
	@reference "tailwindcss";

	.prose {
		@apply text-gray-800 dark:text-gray-900;
	}

	.lead {
		@apply text-xl text-gray-600 dark:text-gray-700 mb-12;
	}

	.coming-soon {
		@apply text-center py-16 px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-50 dark:to-blue-50 rounded-xl;
	}

	.icon {
		@apply text-6xl mb-6;
	}

	.coming-soon h2 {
		@apply text-2xl font-bold mb-6 text-gray-800 dark:text-gray-900;
	}

	.topics-list {
		@apply text-left max-w-md mx-auto mb-8 space-y-2;
	}

	.topics-list li {
		@apply flex items-center text-gray-700 dark:text-gray-800;
	}

	.topics-list li::before {
		content: '→';
		@apply text-blue-500 mr-3 font-bold;
	}

	.cta {
		@apply pt-6 border-t border-gray-200 dark:border-gray-300;
	}

	.btn {
		@apply inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold;
		@apply transition-all duration-200 text-center cursor-pointer;
		@apply shadow-lg hover:shadow-xl transform hover:-translate-y-1;
		@apply text-lg leading-none;
		@apply no-underline;
	}

	.btn-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700;
		@apply border-2 border-blue-600 hover:border-blue-700;
	}
</style>
