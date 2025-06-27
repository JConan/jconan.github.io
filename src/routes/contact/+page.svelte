<script lang="ts">
	import Icon from '@iconify/svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { m } from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form?: ActionData;
	}

	let { form }: Props = $props();
	let submitting = $state(false);
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
	type = 'text',
	value = '',
	error
}: {
	label: string;
	name: string;
	placeholder: string;
	type?: string;
	value?: string;
	error?: string;
})}
	<label>
		<span>{label}</span>
		<input class="form-input" {name} {type} {placeholder} {value} required />
		{#if error}
			<span class="field-error">{error}</span>
		{/if}
	</label>
{/snippet}

<div class="prose max-w-4xl mx-auto">
	<h1>{m['contact.heading']()}</h1>

	<p class="lead">
		{m['contact.lead_text']()}
	</p>

	<div class="contact-form">
		{#if form?.success}
			<div class="success-message" role="alert">
				<Icon icon="mdi:check-circle" />
				<span>{m['contact.success_message']()}</span>
			</div>
		{/if}

		{#if form?.error}
			<div class="error-message" role="alert">
				<Icon icon="mdi:alert-circle" />
				<span>{form.error}</span>
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
		>
			{@render textInput({
				label: m['contact.form_name_label'](),
				name: 'name',
				placeholder: m['contact.form_name_placeholder'](),
				value: form?.data?.name || '',
				error: form?.errors?.name
			})}
			{@render textInput({
				label: m['contact.form_email_label'](),
				name: 'email',
				type: 'email',
				placeholder: m['contact.form_email_placeholder'](),
				value: form?.data?.email || '',
				error: form?.errors?.email
			})}

			<label>
				<span>{m['contact.form_message_label']()}</span>
				<textarea
					class="form-textarea"
					placeholder={m['contact.form_message_placeholder']()}
					name="message"
					value={form?.data?.message || ''}
					required
				></textarea>
				{#if form?.errors?.message}
					<span class="field-error">{form.errors.message}</span>
				{/if}
			</label>

			<button type="submit" class="btn btn-primary" disabled={submitting}>
				{#if submitting}
					<Icon icon="mdi:loading" class="animate-spin" />
					{m['contact.form_submitting']()}
				{:else}
					{m['contact.form_submit_button']()}
				{/if}
			</button>
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

	.success-message,
	.error-message {
		@apply flex items-center gap-3 p-4 rounded-lg mb-6;
	}

	.success-message {
		@apply bg-success/10 text-success border border-success/20;
	}

	.error-message {
		@apply bg-error/10 text-error border border-error/20;
	}

	.field-error {
		@apply text-error text-sm mt-1;
	}


	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
