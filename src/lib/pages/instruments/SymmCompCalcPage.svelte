<script>
	import FooterCommon from '#lib/components/FooterCommon.svelte';
	import HeaderCommon from '#lib/components/HeaderCommon.svelte';
	import SymmCompCalc from '#lib/rza-instruments/symmetric-components-calculator/SymmCompCalc.svelte';
</script>

<div class="wrapper">
	<HeaderCommon />
	<div class="g-common-wrapper container">
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

    .container {
        width: 100%;
    }
</style>
