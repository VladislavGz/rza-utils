<script lang="ts">
	import ArticleCard from '#lib/components/ArticleCard.svelte';
	import { ARTICLES } from '#lib/rza-instruments/data/articles/ARTICLES.ts';
	import type { TArticleTheme, TArticleThemeId } from '#lib/types/types.ts';
	import Title from '#lib/ui-kit/Title.svelte';

	type TArticlesPageProps = {
		articlesThemeId: TArticleThemeId | 'all';
	};

	const { articlesThemeId }: TArticlesPageProps = $props();

	const articleTheme: TArticleTheme | null = $derived.by(() => {
		if (articlesThemeId === 'all') return null;
		return ARTICLES.find((item) => item.themeId === articlesThemeId) || null;
	});
</script>

<div class="container">
	{#if articlesThemeId === 'all'}
		<Title level={1}>Список всех статей</Title>
		<ul class="articles-themes-list">
			{#each ARTICLES as articleTheme (articleTheme.themeId)}
				<li class="article-theme-item">
					<Title level={2}>{articleTheme.themeName}</Title>
					<ul class="articles-list">
						{#each articleTheme.articles as article (article.idName)}
							<li class="article-item">
								<ArticleCard {article} />
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		{#if articleTheme}
			<Title level={1}>{articleTheme.themeName}</Title>
			<ul class="articles-list">
				{#each articleTheme.articles as article (article.idName)}
					<li class="article-item">
						<ArticleCard {article} />
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</div>

<style>
	.container {
		width: 100%;
	}

    .article-theme-item {
        margin-top: 26px;
    }

	.articles-list {
		margin-top: 26px;

		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 26px;
	}
</style>
