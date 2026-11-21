import type { Component } from 'svelte';

/**
 * Описание утилиты
 */
export type TUtilDescription = {
	idName: string;
	name: string;
	description: string;
	link: string;
	icon: Component;
	iconStrokeWidth: number;
};

/**
 * Статья
 */
export type TArticle = {
	idName: string;
	title: string;
	description: string;
	link: string;
	icon: Component;
	iconStrokeWidth: number;
	articleComponent: Component;
}

/**
 * Темы статей
 */
export type TArticleThemeId = 'damages';

/**
 * Статьи одной темы
 */
export type TArticleTheme = {
	themeId: TArticleThemeId;
	themeName: string;
	themeDescription: string;
	articles: TArticle[]
}

/**
 * Сборка статей по темам
 */
export type TAllArticles = TArticleTheme[];

/**
 * Цветовой режим
 */
export type TColorMode = 'dark' | 'light';

/**
 * Тема
 */
export type TTheme = TColorMode | 'auto';

/**
 * Объект состояния темы
 */
export type TThemeState = {
	theme: TTheme;
	currentColorMode: TColorMode;
};
