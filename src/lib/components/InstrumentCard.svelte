<script lang="ts">
	import type { TUtilDescription } from '#lib/types/types.ts';
	import Paragraph from '#lib/ui-kit/Paragraph.svelte';
	import Title from '#lib/ui-kit/Title.svelte';
	import InstrumentIcon from './InstrumentIcon.svelte';

	type TInstrumentCardProps = {
		instrument: TUtilDescription;
	};

	const { instrument }: TInstrumentCardProps = $props();
	const Icon = $derived(instrument.icon);
</script>

<a href={instrument.link} class="instrument-link">
	<article class="instrument-card">
		<Title level={3} font="main">{instrument.name}</Title>
		<div class="icon-container">
			<InstrumentIcon strokeWidth={instrument.iconStrokeWidth}>
				<Icon />
			</InstrumentIcon>
		</div>

		<Paragraph>{instrument.description}</Paragraph>
	</article>
</a>

<style>
	.instrument-card {
		width: 300px;
		height: 350px;

		padding: 20px;

		display: grid;
		grid-template-rows: 1fr 4fr 1fr;

		border-radius: 26px;
		border: 2px solid var(--pale-text-color);
		border-style: dashed;
	}

	.icon-container {
		width: 200px;
		aspect-ratio: 1;
	}
</style>
