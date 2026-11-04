<script lang="ts">
	import type { Snippet } from 'svelte';

	type TIconProps = {
		strokeWidth?: number;
		children: Snippet;
	};

	const { strokeWidth = 4, children }: TIconProps = $props();

	const attach = (element: HTMLSpanElement) => {
		if (strokeWidth) {
			element.style.strokeWidth = `${strokeWidth}`;
		}
	};
</script>

<span {@attach attach} class="instrument-icon">
	{@render children?.()}
</span>

<style>
	.instrument-icon {
		display: block;
		pointer-events: none;
		width: 100%;
		height: 100%;

		color: var(--icon-color-main);
		fill: var(--icon-color-main);
		stroke: var(--icon-color-main);
		stroke-width: 4;
	}
</style>
