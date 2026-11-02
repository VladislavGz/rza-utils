<script lang="ts">
	/**
	 * Установить свою фавиконку
	 */
	// import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import '#lib/styles/index.css';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<!-- Установить свою фавиконку -->
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

{@render children()}

<style>
    :global(body) {
        background-color: var(--bg-base-color);
    }
</style>
