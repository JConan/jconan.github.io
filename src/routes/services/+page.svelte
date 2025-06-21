<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Services de Développement | Johan Chan"
	description="Services de développement d'applications web et mobile sur mesure avec React, Svelte et Node.js."
	keywords="services développement, applications web, applications mobile, React, Svelte, freelance"
/>

<div class="prose max-w-4xl mx-auto">
	<h1>Services de Développement</h1>

	<p class="lead">
		Développement d'applications web et mobile sur mesure pour transformer vos idées en solutions
		performantes.
	</p>

	<div class="grid md:grid-cols-2 gap-6 my-8">
		<div class="card">
			<h3>Applications Web</h3>
			<p>Développement d'applications web modernes avec React, Svelte et Node.js.</p>
		</div>

		<div class="card">
			<h3>Applications Mobile</h3>
			<p>Applications mobiles performantes avec React Native et technologies hybrides.</p>
		</div>

		<div class="card">
			<h3>Intégration API</h3>
			<p>Intégration et développement d'APIs RESTful et GraphQL.</p>
		</div>

		<div class="card">
			<h3>Consultation Technique</h3>
			<p>Audit de code, optimisation de performance et architecture technique.</p>
		</div>
	</div>

	<div class="cta-section">
		<h2>Prêt à démarrer votre projet ?</h2>
		<p>Discutons de vos besoins et trouvons la solution adaptée.</p>
		<a href="/contact" class="btn btn-primary">Me contacter</a>
	</div>
</div>

<style>
	@reference "tailwindcss";

	.prose {
		@apply text-gray-800 dark:text-gray-200;
	}

	.lead {
		@apply text-xl text-gray-600 dark:text-gray-400 mb-8;
	}

	.card {
		@apply bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700;
	}

	.card h3 {
		@apply text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400;
	}

	.cta-section {
		@apply text-center py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg mt-12;
	}

	.btn {
		@apply inline-block px-6 py-3 rounded-lg font-medium transition-colors;
	}

	.btn-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600;
	}
</style>
