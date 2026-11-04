<script lang="ts">
	import DarkModeSVG from '#lib/assets/icons/DarkModeSVG.svelte';
	import LightModeSVG from '#lib/assets/icons/LightModeSVG.svelte';
	import NightSightAutoSVG from '#lib/assets/icons/NightSightAutoSVG.svelte';
	import { themeApi, themeState } from '#lib/services/themeService.svelte.ts';
	import type { TUiSize } from '#lib/types/ui-types.ts';
	import IconButton from '#lib/ui-kit/IconButton.svelte';

	type TThemeButtonProps = {
		size: TUiSize;
	};

	const { size }: TThemeButtonProps = $props();
</script>

<IconButton {size} onClick={() => themeApi.nextTheme()}>
	{#if themeState.theme === 'dark'}
		<DarkModeSVG />
	{:else if themeState.theme === 'light'}
		<LightModeSVG />
	{:else}
		<NightSightAutoSVG />
	{/if}
</IconButton>
