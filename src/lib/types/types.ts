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
};
