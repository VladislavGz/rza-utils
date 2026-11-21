<script lang="ts">
	import FooterCommon from '#lib/components/FooterCommon.svelte';
	import HeaderCommon from '#lib/components/HeaderCommon.svelte';
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<HeaderCommon />
<main class="g-common-wrapper main">
	{@render children()}
</main>
<FooterCommon />

<style>
    .main {
        width: 100%;
        flex: 1 0 auto;

        align-content: center;
    }
</style>
