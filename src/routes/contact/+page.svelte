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
	@plugin "daisyui";

	.prose {
		@apply text-base-content;
	}

	.lead {
		@apply text-xl text-base-content/80 mb-8 leading-relaxed;
	}

	.contact-form {
		@apply bg-base-200;
		@apply p-8 rounded-xl border border-base-300 shadow-sm;
		@apply mt-8;
	}

	label {
		@apply grid my-6 gap-3;
	}

	label span {
		@apply text-lg font-medium text-base-content;
	}

	.form-input,
	.form-textarea {
		@apply w-full bg-base-100;
		@apply border-2 border-base-300;
		@apply text-base-content;
		@apply rounded-lg px-4 py-3;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20;
		@apply placeholder-base-content/50;
	}

	.form-textarea {
		height: 10rem;
		@apply resize-none;
	}

	/* Override any DaisyUI classes */
	input,
	textarea {
		@apply w-full bg-base-100;
		@apply border-2 border-base-300;
		@apply text-base-content;
		@apply rounded-lg px-4 py-3;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20;
		@apply placeholder-base-content/50;
	}

	.btn {
		@apply btn btn-primary btn-lg w-full;
	}
</style>
