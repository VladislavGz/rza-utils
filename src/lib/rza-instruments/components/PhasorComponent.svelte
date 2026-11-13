<script lang="ts">
	import ErrorComponent from '#lib/ui-kit/ErrorComponent.svelte';
	import { onMount } from 'svelte';
	import { Phasor } from '../core/Phasor/Phasor';
	import { themeState } from '#lib/services/themeService.svelte.ts';
	import type {
		IPhasorDragEvent,
		TPhasorAxisOrientation,
		TPhasorVectorData
	} from '../core/Phasor/types';

	type TPhasorComponentProps = {
		vectors: TPhasorVectorData[];
		axisOrientation: TPhasorAxisOrientation;
		labelMode: boolean;
		onDrag: (e: IPhasorDragEvent) => void;
	};

	const { vectors, axisOrientation, labelMode, onDrag }: TPhasorComponentProps = $props();

	let err = $state.raw<Error | null>(null);

	let container: HTMLDivElement, staticLayer: HTMLCanvasElement, dynamicLayer: HTMLCanvasElement;

	onMount(() => {
		try {
			const phasor = new Phasor(container, staticLayer, dynamicLayer);
			phasor.onPhasor('drag', (e) => onDrag(e));

			$effect(() => {
				phasor.setStaticFrame(vectors);
			});

			$effect(() => {
				phasor.setColorMode(themeState.currentColorMode);
			});

			$effect(() => {
				phasor.setAxisOrientation(axisOrientation);
			});

			$effect(() => {
				phasor.setLabelMode(labelMode);
			});

			return () => phasor.destroy();
		} catch (error) {
			err = error as Error;
		}
	});
</script>

<div bind:this={container} class="phasor">
	<canvas bind:this={staticLayer} class="layer cnv static-layer"></canvas>
	<canvas bind:this={dynamicLayer} class="layer cnv dynamic-layer"></canvas>
	{#if err}
		<div class="layer">
			<ErrorComponent message={err.message} />
		</div>
	{/if}
</div>

<style>
	.phasor {
		width: 100%;
		aspect-ratio: 1;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		border-radius: 50%;

		/*
        NOTE
        Здесь предпочтительно использовать именно outline, а не border, поскольку outline
        не влияет на getBoundingClientRect и clientWidth / clientHeight / offsetWidth / offsetHeight,
        что важно для canvas
        */
		outline: 2px solid var(--pale-text-color);
		overflow: hidden;
	}

	.layer {
		grid-column: 1/2;
		grid-row: 1/2;
	}

	.cnv {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
