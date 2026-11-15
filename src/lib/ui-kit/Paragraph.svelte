<script lang="ts">
	import type { TFont } from '#lib/types/ui-types.ts';
	import type { Snippet } from 'svelte';

	type TParagraphProps = {
		font?: TFont;
		children: Snippet;
	};

	const { font = 'main', children }: TParagraphProps = $props();
</script>

<p class="g-main-text paragraph _g-font-{font}">
	{@render children()}
</p>
