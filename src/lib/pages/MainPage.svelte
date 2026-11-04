<script>
	import HeaderMain from '#lib/components/HeaderMain.svelte';
	import InstrumentCard from '#lib/components/InstrumentCard.svelte';
	import { INSTRUMENTS } from '#lib/rza-instruments/data/INSTRUMENTS.ts';
</script>

<div class="g-common-wrapper">
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
</div>

<style>
	.instruments-list {
		margin-top: 26px;

		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 30px;
	}
</style>
