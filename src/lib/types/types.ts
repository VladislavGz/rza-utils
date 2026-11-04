import type { Component } from "svelte";

/**
 * Описание утилиты
 */
export type TUtilDescription = {
	idName: string;
	name: string;
	description: string;
	link: string;
	icon: Component
};

/**
 * Тема
 */
export type TTheme = 'dark' | 'light' | 'auto';

/**
 * Объект состояния темы
 */
export type TThemeState = {
    theme: TTheme
}
