<script lang="ts">
	import Icon from '@iconify/svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<SEO
	title={m['contact.page_title']()}
	description={m['contact.page_description']()}
	keywords={m['contact.page_keywords']()}
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
	<h1>{m['contact.heading']()}</h1>

	<p class="lead">
		{m['contact.lead_text']()}
	</p>

	<div class="contact-form">
		<form
			target="_blank"
			action="https://formsubmit.co/formsubmit@mojojo.mozmail.com"
			method="POST"
		>
			{@render textInput({
				label: m['contact.form_name_label'](),
				name: 'name',
				placeholder: m['contact.form_name_placeholder']()
			})}
			{@render textInput({
				label: m['contact.form_email_label'](),
				name: 'email',
				type: 'email',
				placeholder: m['contact.form_email_placeholder']()
			})}

			<label>
				<span>{m['contact.form_message_label']()}</span>
				<textarea
					class="form-textarea"
					placeholder={m['contact.form_message_placeholder']()}
					name="message"
					required
				></textarea>
			</label>

			<button type="submit" class="btn btn-primary">{m['contact.form_submit_button']()}</button>
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
