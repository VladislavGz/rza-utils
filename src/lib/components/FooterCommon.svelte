<script lang="ts">
	import Link from "#lib/ui-kit/Link.svelte";
</script>

<footer class="footer-common">
	<div class="wrapper">
		<Link href="/privacy-policy">Политика конфиденциальности</Link>
		<Link href="/about">О проекте</Link>
		<Link href="/user-agreement">Пользовательское соглашение</Link>
	</div>
</footer>

<style>
	.footer-common {
		width: 100%;
	}

	.wrapper {
		padding-block: 12px;

		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		border-top: 1px solid var(--pale-text-color);
	}
</style>