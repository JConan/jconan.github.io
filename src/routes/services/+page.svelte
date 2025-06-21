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
		@apply text-gray-800 dark:text-gray-900;
	}

	.lead {
		@apply text-xl text-gray-600 dark:text-gray-700 mb-8 leading-relaxed;
	}

	.card {
		@apply bg-white dark:bg-slate-50 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-300;
		@apply hover:shadow-md transition-all duration-300 hover:border-blue-300;
	}

	.card h3 {
		@apply text-xl font-bold mb-4 text-blue-700 dark:text-blue-800;
	}

	.card p {
		@apply text-gray-700 dark:text-gray-800 leading-relaxed text-base;
	}

	.cta-section {
		@apply text-center py-16 px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50;
		@apply dark:from-blue-100 dark:via-indigo-100 dark:to-purple-100 rounded-xl mt-12;
		@apply border border-blue-200 dark:border-blue-300 shadow-sm;
	}

	.cta-section h2 {
		@apply text-3xl font-bold mb-6 text-gray-900 dark:text-gray-900;
	}

	.cta-section p {
		@apply text-lg text-gray-700 dark:text-gray-800 mb-8 leading-relaxed;
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
