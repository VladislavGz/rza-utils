<script>
	import FooterMain from '#lib/components/FooterMain.svelte';
	import HeaderMain from '#lib/components/HeaderMain.svelte';
	import InstrumentCard from '#lib/components/InstrumentCard.svelte';
	import { INSTRUMENTS } from '#lib/rza-instruments/data/INSTRUMENTS.ts';
</script>

<div class="page">
	<HeaderMain />
	<div class="g-common-wrapper">
		<ul class="instruments-list">
			{#each INSTRUMENTS as instrument (instrument.idName)}
				<li>
					<InstrumentCard {instrument} />
				</li>
			{/each}
		</ul>
	</div>
	<FooterMain />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        gap: 26px;
    }

	.instruments-list {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 26px;
	}
</style>
