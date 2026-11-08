<script lang="ts">
	import HeaderCommon from '#lib/components/HeaderCommon.svelte';
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<HeaderCommon />
{@render children()}
