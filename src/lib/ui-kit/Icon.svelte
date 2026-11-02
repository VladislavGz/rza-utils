<script lang="ts">
	import type { TUiSize } from '#lib/types/ui-types.ts';
	import type { Snippet } from 'svelte';

	type TIconProps = {
		size?: TUiSize;
		color?: 'main' | 'accent' | 'error';
		children: Snippet;
	};

	const { size = 'auto', color = 'main', children }: TIconProps = $props();
</script>

<span class="icon _size-{size} _color-{color}">
	{@render children?.()}
</span>

<style>
	.icon {
		display: block;
		pointer-events: none;

		/* size */
		&._size-auto {
			width: var(--icon-size-auto);
			height: var(--icon-size-auto);
		}

		&._size-micro {
			width: var(--icon-size-micro);
			height: var(--icon-size-micro);
		}

		&._size-small {
			width: var(--icon-size-small);
			height: var(--icon-size-small);
		}

		&._size-medium {
			width: var(--icon-size-medium);
			height: var(--icon-size-medium);
		}

		&._size-big {
			width: var(--icon-size-big);
			height: var(--icon-size-big);
		}

		&._size-large {
			width: var(--icon-size-large);
			height: var(--icon-size-large);
		}

		/* color */
		&._color-main {
			fill: var(--icon-color-main);
		}

		&._color-accent {
			fill: var(--icon-color-accent);
		}

		&._color-error {
			fill: var(--icon-color-error);
		}
	}
</style>
