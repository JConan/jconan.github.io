<script>
	import Icon from '@iconify/svelte';
</script>

<h1 class="title">Formulaire de contact</h1>
<form target="_blank" action="https://formsubmit.co/formsubmit@mojojo.mozmail.com" method="POST">
	<label class="label">
		<span>Name</span>
		<div class="control has-icons-left">
			<input class="input" name="name" type="text" placeholder="Comment te référer?" />
			<span class="icon is-left">
				<Icon icon="mdi:user-outline" />
			</span>
		</div>
	</label>
	<label class="label">
		<span class="">Email</span>
		<div class="control has-icons-left">
			<input
				class="input"
				type="email"
				name="email"
				placeholder="A quelle adresse électronique te contacter ?"
				required
			/>
			<span class="icon is-left">
				<Icon icon="tabler:mail" />
			</span>
		</div>
	</label>

	<label class="label">
		<span>Message</span>
		<div class="control">
			<textarea class="textarea" placeholder="Your Message" name="message" required></textarea>
		</div>
	</label>
	<button type="submit" class="button is-fullwidth is-outlined is-primary">Submit Form</button>
</form>

<style>
	label :last-child {
		margin-bottom: 1.25rem;
	}
</style>
