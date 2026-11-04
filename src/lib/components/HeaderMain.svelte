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
    <div class="line"></div>
</header>

<style>
    .wrapper {
        padding-block: 26px;

        display: flex;
		flex-direction: row;
		justify-content: space-between;
    }

    .line {
        border-color: transparent;
		border-bottom: 6px solid var(--title-h1-color);
		border-style: dashed;
    }
</style>
