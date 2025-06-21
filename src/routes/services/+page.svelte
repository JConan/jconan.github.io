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
