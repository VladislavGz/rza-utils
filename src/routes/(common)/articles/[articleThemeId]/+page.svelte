<script lang="ts">
	import ArticlesPage from '#lib/pages/common/ArticlesPage.svelte';
	import { ARTICLES } from '#lib/rza-instruments/data/articles/ARTICLES.ts';
	import { page } from '$app/state';

    const articleTheme = ARTICLES.find(item => item.themeId === page.params.articleThemeId);
    if (!articleTheme) throw new Error('404 custom'); //TODO: разобраться как выкинуть 404 в корень
</script>

<svelte:head>
	<title>{articleTheme.themeName} | Инструменты релейщика</title>
	<!-- TODO: добавить SEO-теги -->
</svelte:head>

<ArticlesPage articlesThemeId={articleTheme.themeId} />
