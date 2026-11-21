<script lang="ts">
	import ConstructionSVG from '#lib/assets/icons/ConstructionSVG.svelte';
	import ErrorSVG from '#lib/assets/icons/ErrorSVG.svelte';
	import type { TFont } from '#lib/types/ui-types.ts';
	import Icon from './Icon.svelte';

	type TErrorComponentProps = {
		font?: TFont;
		icon?: 'error' | 'dev';
		message: string;
	};

	const { font = 'main', icon = 'error', message }: TErrorComponentProps = $props();
</script>

<div class="error">
	<Icon color="main" size="large">
		{#if icon === 'dev'}
			<ConstructionSVG />
		{:else}
			<ErrorSVG />
		{/if}
	</Icon>
	<p class="g-main-text message _g-font-{font}">{message}</p>
</div>

<style>
	.error {
		width: 100%;
		height: 100%;
		padding: 12px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.message {
		text-align: center;
	}
</style>
