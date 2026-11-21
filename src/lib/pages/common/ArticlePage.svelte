<script lang="ts">
	import type { TArticle } from '#lib/types/types.ts';
	import type { Component } from 'svelte';

	type TArticlePageProps = {
		article: TArticle;
	};

	const { article }: TArticlePageProps = $props();

	const ArticleComponent: Component = $derived(article.articleComponent);
</script>

<ArticleComponent />
