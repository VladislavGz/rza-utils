import type { Component } from "svelte";

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
 * Тема
 */
export type TTheme = 'dark' | 'light' | 'auto';

/**
 * Объект состояния темы
 */
export type TThemeState = {
    theme: TTheme
}
