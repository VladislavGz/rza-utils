<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import ChatInfoSVG from '#lib/assets/icons/ChatInfoSVG.svelte';
	import type { TFont } from '#lib/types/ui-types.ts';

	type TInfoProps = {
        font?: TFont;
		children: Snippet;
	};

	const { font = 'main', children }: TInfoProps = $props();
</script>

<div class="info">
	<Icon size="large">
		<ChatInfoSVG />
	</Icon>
	<div class="g-main-text info-text _g-font-{font}">
		{@render children()}
	</div>
</div>

<style>
	.info {
		display: flex;
		flex-direction: row;
        align-items: center;
		gap: 26px;

        padding: 26px;

        border-radius: 12px;
		background-color: var(--bg-info-color-0);
	}

	.info-text {
		width: 100%;
	}
</style>
