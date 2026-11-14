import katex from "katex";

/**
 * Функция принимает текст выражения и возвращает html разметку katex
 */
export function renderMath(text: string, displayMode: boolean = false): string {
    return katex.renderToString(text, {
        displayMode,
        throwOnError: false // Чтобы при ошибке не ломался весь UI
    });
}