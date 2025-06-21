<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, locales, setLocale, type Locale } from '$lib/paraglide/runtime';

	let currentLocale = $derived(() => {
		page.url;
		return getLocale();
	});

	function onSelectlang(locale: Locale) {
		return () => {
			details.attributes.removeNamedItem('open');
			setLocale(locale);
		};
	}

	let details: HTMLDetailsElement;
</script>

<details class="dropdown" bind:this={details}>
	<summary class="btn m-1">{currentLocale().toUpperCase()}</summary>
	<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
		{#each locales.filter((locale) => locale !== currentLocale()) as locale}
			<li>
				<button onclick={onSelectlang(locale)}>{locale.toUpperCase()}</button>
			</li>
		{/each}
	</ul>
</details>
