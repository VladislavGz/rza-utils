<script lang="ts">
	import PhasorComponent from '#lib/rza-instruments/components/PhasorComponent.svelte';
	import SchemeKzComponent from '#lib/rza-instruments/components/SchemeKzComponent.svelte';
	import { Complex } from '#lib/rza-instruments/core/Complex/Complex.ts';
	import type { TComplex } from '#lib/rza-instruments/core/Complex/types.ts';
	import type { TThreePhaseSystem } from '#lib/rza-instruments/core/coreTypes.ts';
	import Paragraph from '#lib/ui-kit/Paragraph.svelte';
	import Title from '#lib/ui-kit/Title.svelte';

	/**
	 * Расстояние от шин до точки КЗ, %
	 */
	let controlDistance: number = $state(70);

	/**
	 * ЭДС системы, о.е.
	 */
	const Es: TThreePhaseSystem = {
		phaseA: { value: 1, angle: 0 },
		phaseB: { value: 1, angle: -120 },
		phaseC: { value: 1, angle: 120 }
	};

	/**
	 * Сопротивление системы, о.е.
	 */
	const Xs: TComplex = { value: 0.5, angle: 90 };

	/**
	 * Удельное сопротивление линии, о.е./%
	 */
	const Xol: TComplex = { value: 0.5 / 100, angle: 90 };

	/**
	 * Сопротивление до точки КЗ, о.е.
	 */
	const Xkz: TComplex = Complex.add(Xs, Complex.scale(Xol, 100));

	/**
	 * Сопротивление от точки контроля до точки КЗ, о.е.
	 */
	const Xcontrol: TComplex = $derived(Complex.scale(Xol, 100 - controlDistance));

	/**
	 * Отношение делителя напряжений для точки контроля
	 */
	const kx: number = $derived(Complex.div(Xcontrol, Complex.add(Xcontrol, Xkz)).value);

	/**
	 * Напряжения в точке контроля, %
	 */
	const voltage: TThreePhaseSystem = $derived({
		phaseA: Complex.scale(Es.phaseA, kx * 100),
		phaseB: Complex.scale(Es.phaseB, kx * 100),
		phaseC: Complex.scale(Es.phaseC, kx * 100)
	});

	/**
	 * Токи в точке контроля, %
	 */
	const current: TThreePhaseSystem = $state({
		phaseA: Complex.scale(Complex.div(Es.phaseA, Xkz), 100),
        phaseB: Complex.scale(Complex.div(Es.phaseB, Xkz), 100),
        phaseC: Complex.scale(Complex.div(Es.phaseC, Xkz), 100),
	});
</script>

<div class="article">
	<Title level={1}>Трехфазное короткое замыкание</Title>
	<SchemeKzComponent
		damageType="К(3)"
		{controlDistance}
		onDrag={({ controlDistance: dist }) => {
			controlDistance = dist;
		}}
	/>
	<div class="diagrams">
		<div class="diagram voltage-diagram">
			<Title level={3}>Векторная диаграмма напряжений в точке контроля</Title>
			<PhasorComponent
				axisOrientation="alternative"
				gridMode={false}
				labelMode={true}
				vectorLabelMode={true}
				vectors={[
					{
						id: 'Ua',
						style: {
							color: '#ffff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						},
						isInteractive: false,
						vector: voltage.phaseA
					},

					{
						id: 'Ub',
						style: {
							color: '#00ff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						},
						isInteractive: false,
						vector: voltage.phaseB
					},

					{
						id: 'Uc',
						style: {
							color: '#ff0000',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						},
						isInteractive: false,
						vector: voltage.phaseC
					}
				]}
				onDrag={() => {}}
			/>
		</div>
		<div class="diagram current-diagram">
			<Title level={3}>Векторная токов напряжений в точке контроля</Title>
			<PhasorComponent
				axisOrientation="alternative"
				gridMode={false}
				labelMode={true}
				vectorLabelMode={true}
				vectors={[
					{
						id: 'Ia',
						style: {
							color: '#ffff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						},
						isInteractive: false,
						vector: current.phaseA
					},

					{
						id: 'Ib',
						style: {
							color: '#00ff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						},
						isInteractive: false,
						vector: current.phaseB
					},

					{
						id: 'Ic',
						style: {
							color: '#ff0000',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						},
						isInteractive: false,
						vector: current.phaseC
					}
				]}
				onDrag={() => {}}
			/>
		</div>
	</div>
</div>

<style>
	.article {
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.diagrams {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		gap: 40px;
	}

	.diagram {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media (width < 1024px) {
		.diagrams {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			justify-items: center;
		}
	}
</style>
