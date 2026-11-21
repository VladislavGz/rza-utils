<script lang="ts">
	import ConstructionSVG from '#lib/assets/icons/ConstructionSVG.svelte';
	import ErrorSVG from '#lib/assets/icons/ErrorSVG.svelte';
	import type { TFont } from '#lib/types/ui-types.ts';
	import Icon from './Icon.svelte';
	import Title from './Title.svelte';

	type TMessageComponentProps = {
		font?: TFont;
		icon?: 'error' | 'dev';
		message: string;
	};

	const { font = 'main', icon = 'error', message }: TMessageComponentProps = $props();
</script>

<div class="message-container">
	<div class="icon-container">
		<Icon color="main" size="auto">
			{#if icon === 'dev'}
				<ConstructionSVG />
			{:else}
				<ErrorSVG />
			{/if}
		</Icon>
	</div>
	<Title level={1} {font}>{message}</Title>
</div>

<style>
	.message-container {
		width: 100%;
		height: 100%;
		padding: 12px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.icon-container {
		width: 200px;
		aspect-ratio: 1;
	}
</style>
