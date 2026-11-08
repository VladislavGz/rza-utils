<script lang="ts">
	import LogoCommon from './LogoCommon.svelte';
	import ThemeButton from './ThemeButton.svelte';
</script>

<header class="g-common-wrapper">
	<div class="wrapper">
		<LogoCommon />
		<ThemeButton size="medium" />
	</div>
</header>

<style>
	.wrapper {
        padding-block: 4px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid var(--pale-text-color);
	}
</style>
