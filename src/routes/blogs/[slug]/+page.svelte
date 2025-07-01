<script>
	import { formatDate } from '$lib/utils/blog-client';

	const { data } = $props();
	const { post, relatedPosts } = data;
</script>

<svelte:head>
	<title>{post.title} | Blog Johan Chan</title>
	<meta name="description" content={post.description} />
	<meta name="keywords" content={post.tags.join(', ')} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:type" content="article" />
	<meta property="article:author" content={post.author} />
	<meta property="article:published_time" content={post.date} />
	{#each post.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
</svelte:head>

<article class="blog-post">
	<header class="post-header">
		<nav class="breadcrumb">
			<a href="/blogs">← Retour au blog</a>
		</nav>
		
		<div class="post-meta">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			<span class="separator">•</span>
			<span class="reading-time">{post.readingTime} min de lecture</span>
			<span class="separator">•</span>
			<span class="category">{post.category}</span>
			{#if post.featured}
				<span class="featured-badge">⭐ À la une</span>
			{/if}
		</div>
		
		<h1 class="post-title">{post.title}</h1>
		
		<p class="post-description">{post.description}</p>
		
		<div class="post-tags">
			{#each post.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="post-content">
		{@html post.content}
	</div>

	{#if relatedPosts.length > 0}
		<aside class="related-posts">
			<h3>Articles similaires</h3>
			<div class="related-posts-grid">
				{#each relatedPosts as relatedPost}
					<a href="/blogs/{relatedPost.slug}" class="related-post-card">
						<h4>{relatedPost.title}</h4>
						<p>{relatedPost.excerpt}</p>
						<div class="related-post-meta">
							<time datetime={relatedPost.date}>{formatDate(relatedPost.date)}</time>
							<span class="reading-time">{relatedPost.readingTime} min</span>
						</div>
					</a>
				{/each}
			</div>
		</aside>
	{/if}
</article>

<style>
	@reference "tailwindcss";
	@plugin "daisyui";

	.blog-post {
		@apply max-w-4xl mx-auto px-4 py-8;
	}

	.post-header {
		@apply mb-12 pb-8 border-b border-base-300;
	}

	.breadcrumb {
		@apply mb-6;
	}

	.breadcrumb a {
		@apply text-base-content/60 hover:text-primary transition-colors duration-200 no-underline;
	}

	.post-meta {
		@apply flex items-center gap-2 text-sm text-base-content/60 mb-4;
	}

	.separator {
		@apply text-base-content/40;
	}

	.featured-badge {
		@apply bg-warning text-warning-content px-2 py-1 rounded-full text-xs font-medium;
	}

	.post-title {
		@apply text-4xl font-bold text-base-content mb-4 leading-tight;
	}

	.post-description {
		@apply text-xl text-base-content/80 mb-6 leading-relaxed;
	}

	.post-tags {
		@apply flex flex-wrap gap-2;
	}

	.tag {
		@apply bg-base-200 text-base-content/70 px-3 py-1 rounded-full text-sm font-medium;
	}

	.post-content {
		@apply max-w-none text-base-content mb-12 text-lg leading-relaxed;
	}

	/* Markdown content styling */
	.post-content :global(h1),
	.post-content :global(h2),
	.post-content :global(h3),
	.post-content :global(h4),
	.post-content :global(h5),
	.post-content :global(h6) {
		@apply text-base-content font-bold mt-8 mb-4;
	}

	.post-content :global(h2) {
		@apply text-2xl border-b border-base-300 pb-2;
	}

	.post-content :global(h3) {
		@apply text-xl;
	}

	.post-content :global(p) {
		@apply text-base-content/80 mb-4 leading-relaxed;
	}

	.post-content :global(a) {
		@apply text-primary hover:text-blue-600 underline;
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		@apply text-base-content/80 mb-4 pl-6;
	}

	.post-content :global(li) {
		@apply mb-2;
	}

	.post-content :global(blockquote) {
		@apply border-l-4 border-primary bg-base-200 p-4 mb-4 italic;
	}

	.post-content :global(code) {
		@apply bg-base-200 text-base-content px-2 py-1 rounded text-sm font-mono;
	}

	.post-content :global(pre) {
		@apply bg-base-200 text-base-content p-4 rounded-lg overflow-x-auto mb-4;
	}

	.post-content :global(pre code) {
		@apply bg-transparent p-0;
	}

	.post-content :global(table) {
		@apply w-full border-collapse border border-base-300 mb-4;
	}

	.post-content :global(th),
	.post-content :global(td) {
		@apply border border-base-300 px-4 py-2 text-left;
	}

	.post-content :global(th) {
		@apply bg-base-200 font-bold;
	}

	/* Related posts */
	.related-posts {
		@apply border-t border-base-300 pt-8;
	}

	.related-posts h3 {
		@apply text-2xl font-bold text-base-content mb-6;
	}

	.related-posts-grid {
		@apply grid gap-4 md:grid-cols-2 lg:grid-cols-3;
	}

	.related-post-card {
		@apply block bg-base-100 border border-base-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 no-underline;
	}

	.related-post-card h4 {
		@apply text-lg font-bold text-base-content mb-2;
	}

	.related-post-card p {
		@apply text-base-content/70 text-sm mb-3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.related-post-meta {
		@apply flex items-center gap-2 text-xs text-base-content/60;
	}
</style>