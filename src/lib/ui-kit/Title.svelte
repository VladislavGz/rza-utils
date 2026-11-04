<script lang="ts">
	import type { TFont, TTitleLevel } from '#lib/types/ui-types.ts';
	import type { Snippet } from 'svelte';

	type TTitleProps = {
		level: TTitleLevel;
		font?: TFont;
		children: Snippet;
	};

	const { level, font = 'main', children }: TTitleProps = $props();
</script>

{#if level === 1}
	<h1 class="g-title-h1 title _font-{font}">
		{@render children()}
	</h1>
{:else if level === 2}
	<h2 class="g-title-h2 title _font-{font}">
		{@render children()}
	</h2>
{:else if level === 3}
	<h3 class="g-title-h3 title _font-{font}">
		{@render children()}
	</h3>
{:else if level === 4}
	<h4 class="g-title-h4 title _font-{font}">
		{@render children()}
	</h4>
{:else if level === 5}
	<h5 class="g-title-h5 title _font-{font}">
		{@render children()}
	</h5>
{:else}
	<h6 class="g-title-h6 title _font-{font}">
		{@render children()}
	</h6>
{/if}

<style>
	.title {
        display: block;
        
		&._font-main {
			font-family: var(--main-font);
		}

		&._font-accent {
			font-family: var(--accent-font);
		}

        &._font-logo {
            font-family: var(--logo-font);
        }
	}
</style>
