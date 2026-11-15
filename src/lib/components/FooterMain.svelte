<script lang="ts">
	import Link from '#lib/ui-kit/Link.svelte';
	import CopyrightNote from './CopyrightNote.svelte';
</script>

<footer class="g-common-wrapper footer-main">
	<div class="wrapper">
		<Link href="/privacy-policy">Политика конфиденциальности</Link>
		<Link href="/about">О проекте</Link>
		<Link href="/user-agreement">Пользовательское соглашение</Link>
	</div>
    <CopyrightNote/>
</footer>

<style>
	.footer-main {
		width: 100%;
        padding-bottom: 12px;
	}

	.wrapper {
		padding-block: 26px;

		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		border-top: 1px solid var(--pale-text-color);
	}
</style>
