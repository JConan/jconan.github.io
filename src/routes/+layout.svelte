<script>
	import Link from '../lib/components/Link.svelte';
	import Navbar from './../lib/components/Navbar.svelte';
	import 'bulma/css/bulma.css';
</script>

<Navbar>
	<Link href="/">Home</Link>
	<Link href="/portfolio">Portfolio</Link>
	<Link href="/contact">Contact</Link>

	<div slot="end" class="navbar-item">
		<div class="buttons">
			<a class="button is-light" href="/">Get my CV</a>
		</div>
	</div>
</Navbar>

<slot></slot>
