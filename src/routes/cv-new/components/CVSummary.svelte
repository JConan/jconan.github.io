<script lang="ts">
	interface Props {
		summary: string;
	}

	let { summary }: Props = $props();
</script>

<div class="summary-container">
	<p class="text-base-content leading-relaxed text-justify">
		{summary}
	</p>
</div>

<style>
	@reference "tailwindcss";
</style>
