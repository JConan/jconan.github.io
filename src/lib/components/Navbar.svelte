<nav class="navbar" aria-label="main navigation">
	<div class="navbar-brand">
		<slot name="brand" />

		<button
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar-items"
		>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</button>
	</div>

	<div id="navbar-items" class="navbar-menu">
		<div class="navbar-start">
			<slot />
		</div>

		<div class="navbar-end">
			<slot name="end" />
		</div>
	</div>
</nav>
