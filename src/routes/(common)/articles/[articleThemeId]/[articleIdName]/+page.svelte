<script lang="ts">
	import ArticlePage from '#lib/pages/common/ArticlePage.svelte';
	import { ARTICLES } from '#lib/rza-instruments/data/articles/ARTICLES.ts';
	import { page } from '$app/state';

	const articleTheme = ARTICLES.find((item) => item.themeId === page.params.articleThemeId);
	if (!articleTheme) throw new Error('404 custom'); //TODO: разобраться как выкинуть 404 в корень

	const article = articleTheme.articles.find(
		(article) => article.idName === page.params.articleIdName
	);
	if (!article) throw new Error('404 custom'); //TODO: разобраться как выкинуть 404 в корень
</script>

<svelte:head>
	<title>{article.title} | Инструменты релейщика</title>
	<!-- TODO: добавить SEO-теги -->
</svelte:head>

<ArticlePage {article} />
