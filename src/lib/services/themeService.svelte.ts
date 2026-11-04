import type { TTheme, TThemeState } from '#lib/types/types.ts';

export const themeState: TThemeState = $state({
	theme: 'auto'
});

/**
 * Функция принимает строку с именем темы и возвращает только
 * разрешенные варианты. Если передан неразрешенный вариант названия
 * темы будет возвращено 'dark'
 */
function normalizeTheme(theme: string): TTheme {
	if (theme === 'dark' || theme === 'light') return theme;
	return 'auto';
}

/**
 * Функция устанавливает новую тему по ее имени.
 * Эту функцию следует вызывать только контекстах, имеющих
 * loacalStorage и document (т.е. после монтирования компонента на клиенте)
 */
function setNormTheme(normTheme: TTheme) {
	themeState.theme = normTheme;

	try {
		document.documentElement.setAttribute('data-theme', normTheme);
		localStorage.setItem('theme', normTheme);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Функция устанавливает новую тему по ее имени с проверкой корректности имени
 */
function setTheme(theme: string) {
	const normTheme = normalizeTheme(theme);
	if (normTheme === themeState.theme) return;

	setNormTheme(normTheme);
}

/**
 * Функция меняет тему на следующую
 */
function nextTheme() {
	if (themeState.theme === 'dark') return setNormTheme('light');
	if (themeState.theme === 'light') return setNormTheme('auto');
	setNormTheme('dark');
}

export const themeApi = {
	setTheme,
	nextTheme
};
