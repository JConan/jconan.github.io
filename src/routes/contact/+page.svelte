<script lang="ts">
	import Icon from '@iconify/svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Contact | Johan Chan"
	description="Contactez Johan Chan, développeur freelance, pour discuter de vos projets d'applications web et mobile."
	keywords="contact, développeur freelance, Johan Chan, projets web, devis développement"
/>

{#snippet textInput({
	label,
	name,
	placeholder,
	type = 'text'
}: {
	label: string;
	name: string;
	placeholder: string;
	type?: string;
})}
	<label>
		<span>{label}</span>
		<input class="form-input" {name} {type} {placeholder} required />
	</label>
{/snippet}

<div class="prose max-w-4xl mx-auto">
	<h1>Pour me contacter</h1>

	<p class="lead">
		Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos besoins et voir
		comment je peux vous aider.
	</p>

	<div class="contact-form">
		<form
			target="_blank"
			action="https://formsubmit.co/formsubmit@mojojo.mozmail.com"
			method="POST"
		>
			{@render textInput({
				label: 'Prénom et nom',
				name: 'name',
				placeholder: 'Comment te référer ?'
			})}
			{@render textInput({
				label: 'Email',
				name: 'email',
				type: 'email',
				placeholder: 'A quelle adresse électronique te contacter ?'
			})}

			<label>
				<span>Message</span>
				<textarea
					class="form-textarea"
					placeholder="Décrivez votre projet ou votre demande"
					name="message"
					required
				></textarea>
			</label>

			<button type="submit" class="btn btn-primary"> Envoyer </button>
		</form>
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

	.contact-form {
		@apply bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-50 dark:to-blue-50;
		@apply p-8 rounded-xl border border-gray-200 dark:border-gray-300 shadow-sm;
		@apply mt-8;
	}

	label {
		@apply grid my-6 gap-3;
	}

	label span {
		@apply text-lg font-medium text-gray-800 dark:text-gray-900;
	}

	.form-input,
	.form-textarea {
		@apply w-full bg-white dark:bg-slate-50;
		@apply border-2 border-gray-200 dark:border-gray-300;
		@apply text-gray-800 dark:text-gray-900;
		@apply rounded-lg px-4 py-3;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20;
		@apply placeholder-gray-500 dark:placeholder-gray-600;
	}

	.form-textarea {
		height: 10rem;
		@apply resize-none;
	}

	/* Override any DaisyUI classes */
	input,
	textarea {
		@apply w-full bg-white dark:bg-slate-50;
		@apply border-2 border-gray-200 dark:border-gray-300;
		@apply text-gray-800 dark:text-gray-900;
		@apply rounded-lg px-4 py-3;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20;
		@apply placeholder-gray-500 dark:placeholder-gray-600;
	}

	.btn {
		@apply inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold;
		@apply transition-all duration-200 text-center cursor-pointer;
		@apply shadow-lg hover:shadow-xl transform hover:-translate-y-1;
		@apply text-lg leading-none w-full;
		@apply no-underline;
	}

	.btn-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700;
		@apply border-2 border-blue-600 hover:border-blue-700;
	}
</style>
