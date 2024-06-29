<script>
	import { User, Mail } from 'lucide-svelte';
</script>

<main class="card">
	<h1 class="title">Formulaire de contact</h1>
	<form target="_blank" action="https://formsubmit.co/formsubmit@mojojo.mozmail.com" method="POST">
		<label class="label">
			<span>Name</span>
			<div class="control has-icons-left">
				<input class="input" name="name" type="text" placeholder="Comment te référer?" />
				<span class="icon is-left">
					<User />
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
					<Mail />
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
</main>

<style>
	main {
		margin: auto;
		padding: 2rem 3rem;
	}
</style>
