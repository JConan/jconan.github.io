<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

{#snippet textInput({
	label,
	name,
	placeholder
}: {
	label: string;
	name: string;
	placeholder: string;
})}
	<label>
		<span>{label}</span>
		<div class="join join-horizontal items-center">
			<Icon class="joint-item mx-4" icon="mdi:user-outline" height={'2rem'} />
			<input class="input input-bordered join-item m-0 grow" {name} type="text" {placeholder} />
		</div>
	</label>
{/snippet}

<h1 class="text-4xl">Pour me contacter</h1>
<form target="_blank" action="https://formsubmit.co/formsubmit@mojojo.mozmail.com" method="POST">
	{@render textInput({ label: 'Prénom et nom', name: 'name', placeholder: 'Comment te référer ?' })}
	{@render textInput({
		label: 'Email',
		name: 'email',
		placeholder: 'A quelle adresse électronique te contacter ?'
	})}

	<label>
		<span>Message</span>
		<textarea
			class="textarea textarea-bordered h-24"
			placeholder="Your Message"
			name="message"
			required
		></textarea>
	</label>

	<button type="submit" class="btn btn-outline btn-primary mt-4">Submit Form</button>
</form>

<style lang="postcss">
	label {
		@apply grid my-4 gap-2;
	}
	input,
	textarea {
		&:focus {
			@apply textarea-primary input-primary;
		}
	}
</style>
