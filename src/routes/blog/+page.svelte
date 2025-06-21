<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Blog Technique | Johan Chan"
	description="Articles et tutoriels sur le développement web, React, Svelte, Node.js et les meilleures pratiques de développement."
	keywords="blog développement, tutoriels web, React, Svelte, Node.js, JavaScript, TypeScript"
/>

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
			<a href="/portfolio" class="btn btn-primary">Voir le Portfolio</a>
		</div>
	</div>
</div>

<style>
	@reference "tailwindcss";

	.prose {
		@apply text-gray-800 dark:text-gray-200;
	}

	.lead {
		@apply text-xl text-gray-600 dark:text-gray-400 mb-12;
	}

	.coming-soon {
		@apply text-center py-16 px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl;
	}

	.icon {
		@apply text-6xl mb-6;
	}

	.coming-soon h2 {
		@apply text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200;
	}

	.topics-list {
		@apply text-left max-w-md mx-auto mb-8 space-y-2;
	}

	.topics-list li {
		@apply flex items-center text-gray-700 dark:text-gray-300;
	}

	.topics-list li::before {
		content: '→';
		@apply text-blue-500 mr-3 font-bold;
	}

	.cta {
		@apply pt-6 border-t border-gray-200 dark:border-gray-700;
	}

	.btn {
		@apply inline-block px-6 py-3 rounded-lg font-medium transition-colors mt-4;
	}

	.btn-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600;
	}
</style>
