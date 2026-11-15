<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import ChatInfoSVG from '#lib/assets/icons/ChatInfoSVG.svelte';

	type TInfoProps = {
		children: Snippet;
	};

	const { children }: TInfoProps = $props();
</script>

<div class="info">
	<Icon size="large">
		<ChatInfoSVG />
	</Icon>
	<div class="g-main-text info-text">
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
