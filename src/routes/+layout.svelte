<script lang="ts">
	/**
	 * Установить свою фавиконку
	 */
	// import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import '#lib/styles/index.css';
    import 'katex/dist/katex.min.css';
	import { onMount } from 'svelte';
	import { themeApi } from '#lib/services/themeService.svelte.ts';

	let { children }: LayoutProps = $props();

	onMount(() => {
		/**
		 * Тема
		 */
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			themeApi.setTheme(savedTheme);
		} else {
			themeApi.setTheme('auto');
		}
	});
</script>

<svelte:head>
	<!-- Установить свою фавиконку -->
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

{@render children()}

<style>
	:global(body) {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 26px;

		background-color: var(--bg-base-color);
	}
</style>
