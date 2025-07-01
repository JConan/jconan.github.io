<script>
	import * as m from '$lib/paraglide/messages';
	import { formatDate } from '$lib/utils/blog';

	const { data } = $props();
	const { posts } = data;
</script>

<div class="prose max-w-4xl mx-auto">
	<h1>{m['blog.heading']()}</h1>

	<p class="lead">
		{m['blog.lead_text']()}
	</p>

	{#if posts.length > 0}
		<div class="blog-posts">
			{#each posts as post}
				<article class="blog-post-card">
					<div class="post-header">
						<h2>
							<a href="/blog/{post.slug}" class="post-title-link">
								{post.title}
							</a>
						</h2>
						<div class="post-meta">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span class="separator">•</span>
							<span class="reading-time">{post.readingTime} min de lecture</span>
							{#if post.featured}
								<span class="featured-badge">⭐ À la une</span>
							{/if}
						</div>
					</div>
					
					<p class="post-excerpt">{post.excerpt}</p>
					
					<div class="post-footer">
						<div class="post-tags">
							{#each post.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
						<a href="/blog/{post.slug}" class="read-more">
							Lire la suite →
						</a>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="coming-soon">
			<div class="icon">📝</div>
			<h2>{m['blog.coming_soon.heading']()}</h2>
			<p>{m['blog.coming_soon.description']()}</p>
			<ul class="topics-list">
				<li>{m['blog.coming_soon.topics.react_to_svelte']()}</li>
				<li>{m['blog.coming_soon.topics.performance_optimization']()}</li>
				<li>{m['blog.coming_soon.topics.sveltekit_architecture']()}</li>
				<li>{m['blog.coming_soon.topics.ci_cd']()}</li>
				<li>{m['blog.coming_soon.topics.typescript_best_practices']()}</li>
			</ul>

			<div class="cta">
				<p>{m['blog.coming_soon.cta_text']()}</p>
				<a href="/journey" class="btn btn-primary" data-sveltekit-preload-data="off"
					>{m['blog.coming_soon.cta_button']()}</a
				>
			</div>
		</div>
	{/if}
</div>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	.prose {
		@apply text-base-content;
	}

	.prose h1 {
		@apply text-3xl font-bold mb-6 text-base-content;
	}

	.lead {
		@apply text-xl text-base-content/80 mb-12;
	}

	/* Blog posts layout */
	.blog-posts {
		@apply space-y-8;
	}

	.blog-post-card {
		@apply bg-base-100 border border-base-300 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200;
	}

	.post-header {
		@apply mb-4;
	}

	.post-title-link {
		@apply text-2xl font-bold text-base-content hover:text-primary transition-colors duration-200 no-underline;
	}

	.post-meta {
		@apply flex items-center gap-2 text-sm text-base-content/60 mt-2;
	}

	.separator {
		@apply text-base-content/40;
	}

	.featured-badge {
		@apply bg-warning text-warning-content px-2 py-1 rounded-full text-xs font-medium;
	}

	.post-excerpt {
		@apply text-base-content/80 mb-4 leading-relaxed;
	}

	.post-footer {
		@apply flex items-center justify-between flex-wrap gap-4;
	}

	.post-tags {
		@apply flex flex-wrap gap-2;
	}

	.tag {
		@apply bg-base-200 text-base-content/70 px-3 py-1 rounded-full text-sm font-medium;
	}

	.read-more {
		@apply text-primary hover:text-blue-600 font-medium no-underline transition-colors duration-200;
	}

	/* Coming soon fallback styles */
	.coming-soon {
		@apply text-center py-16 px-8 bg-base-200 rounded-xl;
	}

	.icon {
		@apply text-6xl mb-6;
	}

	.coming-soon h2 {
		@apply text-2xl font-bold mb-6 text-base-content;
	}

	.coming-soon p {
		@apply text-base-content/80 mb-6;
	}

	.topics-list {
		@apply text-left max-w-md mx-auto mb-8 space-y-2;
	}

	.topics-list li {
		@apply flex items-center text-base-content/80;
	}

	.topics-list li::before {
		content: '→';
		@apply text-primary mr-3 font-bold;
	}

	.cta {
		@apply pt-6 border-t border-base-300;
	}

	.cta p {
		@apply text-base-content/80 mb-4;
	}

	.btn {
		@apply btn btn-primary btn-lg;
	}
</style>
