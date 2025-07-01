<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, locales, setLocale, type Locale } from '$lib/paraglide/runtime';

	let currentLocale = $derived(() => {
		page.url;
		return getLocale();
	});

	// Check if we're on a blog post page and get translation URLs
	let translationUrls = $derived(() => {
		if (page.route?.id === '/blogs/[slug]' && page.data?.translationUrls) {
			return page.data.translationUrls as Record<string, string>;
		}
		return {};
	});

	function onSelectLang(locale: Locale) {
		return async () => {
			details.attributes.removeNamedItem('open');
			
			const urls = translationUrls();
			
			// Check if we have a specific translation URL for this locale
			if (urls[locale]) {
				// Navigate to the translated blog post using window.location
				window.location.href = urls[locale];
			} else {
				// Fall back to standard locale switching for non-blog pages
				setLocale(locale);
			}
		};
	}

	let details: HTMLDetailsElement;
</script>

<details class="dropdown" bind:this={details}>
	<summary class="btn m-1">{currentLocale().toUpperCase()}</summary>
	<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
		{#each locales.filter((locale) => locale !== currentLocale()) as locale}
			<li>
				<button onclick={onSelectLang(locale)}>
					{locale.toUpperCase()}
					{#if translationUrls()[locale]}
						<!-- Show indicator that translation is available -->
						<span class="ml-2 text-xs opacity-60">📄</span>
					{/if}
				</button>
			</li>
		{/each}
	</ul>
</details>