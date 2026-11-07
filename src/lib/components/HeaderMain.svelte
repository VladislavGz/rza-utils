<script lang="ts">
	import Title from '#lib/ui-kit/Title.svelte';
	import LogoMain from './LogoMain.svelte';
	import ThemeButton from './ThemeButton.svelte';
</script>

<header class="g-common-wrapper header-main">
	<div class="g-visually-hidden">
		<Title level={1}>Инструменты релейщика</Title>
	</div>
	<div class="wrapper">
		<LogoMain />
		<ThemeButton size="large" />
	</div>
</header>

<style>
    .header-main {
        width: 100%;
    }

	.wrapper {
		padding-block: 26px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;

        border-bottom: 6px dashed var(--title-h1-color);
	}
</style>
