<script>
	import FooterCommon from '#lib/components/FooterCommon.svelte';
	import HeaderCommon from '#lib/components/HeaderCommon.svelte';
	import SymmCompCalc from '#lib/rza-instruments/symmetric-components-calculator/SymmCompCalc.svelte';
</script>

<div class="wrapper">
	<HeaderCommon />
	<div class="g-common-wrapper">
		<SymmCompCalc />
	</div>
	<FooterCommon />
</div>

<style>
	.wrapper {
		display: flex;
        flex-direction: column;
        gap: 26px;
	}
</style>
