<script lang="ts">
	import type { TUiSize, TUiButtonMode } from '#lib/types/ui-types.ts';
	import type { Snippet } from 'svelte';

	type TIconButtonProps = {
		size?: TUiSize;
		mode?: TUiButtonMode;
		onClick: () => void;
		children: Snippet;
	};

	const { size = 'auto', mode = 'normal', onClick, children }: TIconButtonProps = $props();
</script>

<button
	type="button"
	class="icon-button _size-{size} _mode-{mode}"
	onclick={() => {
		onClick();
	}}
>
	{@render children()}
</button>

<style>
	.icon-button {
		aspect-ratio: 1;
		/* padding: 4px; */

		&._size-auto {
			width: var(--icon-button-size-auto);
			min-width: var(--icon-button-size-auto);
		}

		&._size-micro {
			width: var(--icon-button-size-micro);
			min-width: var(--icon-button-size-micro);
		}

		&._size-small {
			width: var(--icon-button-size-small);
			min-width: var(--icon-button-size-small);
		}

		&._size-medium {
			width: var(--icon-button-size-medium);
			min-width: var(--icon-button-size-medium);
		}

		&._size-big {
			width: var(--icon-button-size-big);
			min-width: var(--icon-button-size-big);
		}

		&._size-large {
			width: var(--icon-button-size-large);
			min-width: var(--icon-button-size-large);
		}

		&._mode-normal {
			fill: var(--icon-button-color-normal);

			&:hover {
				fill: var(--icon-button-color-hover);
			}
		}

		&._mode-disabled {
			fill: var(--icon-button-color-disabled);
		}

		&._mode-active {
			fill: var(--icon-button-color-active);
		}

		&._mode-error {
			fill: var(--icon-button-color-error);
		}
	}
</style>
