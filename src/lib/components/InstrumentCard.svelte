<script lang="ts">
	import type { TUtilDescription } from '#lib/types/types.ts';
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
        <p class="g-main-text description">{instrument.description}</p>
	</article>
</a>

<style>
	.instrument-card {
		width: 300px;
		height: 350px;

		padding: 20px;

		display: grid;
		grid-template-rows: 1fr 4fr 1fr;
        grid-template-columns: 1fr;
        align-items: center;
        justify-items: center;

		border-radius: 26px;
		border: 2px solid var(--pale-text-color);
		border-style: dashed;

        transition: border-color .2s ease-in;

        &:hover {
            border-color: var(--title-h1-color);
        }
	}

	.icon-container {
		width: 200px;
		aspect-ratio: 1;
	}

    .description {
        text-align: center;
    }
</style>
