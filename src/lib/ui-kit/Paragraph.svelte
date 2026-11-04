<script lang="ts">
	import type { Snippet } from 'svelte';

	type TParagraphProps = {
		children: Snippet;
	};

	const { children }: TParagraphProps = $props();
</script>

<p class="g-main-text">
	{@render children()}
</p>
