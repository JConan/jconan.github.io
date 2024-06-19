<script>
	import 'bulma/css/bulma.css';
	import { route } from '$lib/ROUTES';
</script>

<nav>
	<a href={route('/')}>Home</a>
	<a href={route('/portfolio')}>Portfolio</a>
	<a href={route('/about')}>About</a>
</nav>

<slot></slot>
<slot></slot>

<style></style>
