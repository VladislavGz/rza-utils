<script lang="ts">
	import Title from '#lib/ui-kit/Title.svelte';
	import ComplexInputField from '../components/ComplexInputField.svelte';
	import PhasorComponent from '../components/PhasorComponent.svelte';
	import { Complex } from '../core/Complex/Complex';
	import type { TComplex } from '../core/Complex/types';
	import type { TSymmetricalComponentsSystem, TThreePhaseSystem } from '../core/coreTypes';
	import { Symmetric } from '../core/Symmetric/Symmetric';

	let phaseSystem: TThreePhaseSystem = $state({
		phaseA: { value: 100, angle: 0 },
		phaseB: { value: 100, angle: -120 },
		phaseC: { value: 100, angle: 120 }
	});

	let symmetricalSystem: TSymmetricalComponentsSystem = $state(
		// svelte-ignore state_referenced_locally
		Symmetric.getSymmetricalComponents(phaseSystem)
	);

	const changePhase = (phaseName: keyof TThreePhaseSystem, value: TComplex) => {
		phaseSystem[phaseName] = value;
		symmetricalSystem = Symmetric.getSymmetricalComponents(phaseSystem);
	};

	const changeSymm = (component: keyof TSymmetricalComponentsSystem, value: TComplex) => {
		symmetricalSystem[component] = value;
		phaseSystem = Symmetric.getThreePhaseSystem(symmetricalSystem);
	};

	/**
	 * Сииметричные составляющие с разбивкой по фазам. Только для отрисовки на диаграмме
	 */
	const symmetricalComponents = $derived({
		phaseA: {
			A1: symmetricalSystem.A1,
			A2: symmetricalSystem.A2,
			A0: symmetricalSystem.A0
		},

		phaseB: {
			A1: Complex.mul(symmetricalSystem.A1, { value: 1, angle: -120 }),
			A2: Complex.mul(symmetricalSystem.A2, { value: 1, angle: 120 }),
			A0: symmetricalSystem.A0
		},

		phaseC: {
			A1: Complex.mul(symmetricalSystem.A1, { value: 1, angle: 120 }),
			A2: Complex.mul(symmetricalSystem.A2, { value: 1, angle: -120 }),
			A0: symmetricalSystem.A0
		}
	});
</script>

<Title level={1}>Калькулятор симметричных составляющих</Title>
<div class="grid">
	<div class="instrument phase-values">
		<Title level={3}>Фазные величины</Title>
		<ComplexInputField
			name="Фаза А"
			complex={phaseSystem.phaseA}
			oninput={(a) => {
				changePhase('phaseA', a);
			}}
		/>
		<span class="line"></span>
		<ComplexInputField
			name="Фаза B"
			complex={phaseSystem.phaseB}
			oninput={(b) => {
				changePhase('phaseB', b);
			}}
		/>
		<span class="line"></span>
		<ComplexInputField
			name="Фаза C"
			complex={phaseSystem.phaseC}
			oninput={(c) => {
				changePhase('phaseC', c);
			}}
		/>

		<PhasorComponent
			axisOrientation="alternative"
			labelMode={true}
			vectorLabelMode={true}
			vectors={[
				{
					id: 'A',
					vector: phaseSystem.phaseA,
					style: {
						color: '#ffff00',
						style: 'solid',
						lineWidth: 2,
						useLabel: true
					},

					isInteractive: true
				},

				{
					id: 'B',
					vector: phaseSystem.phaseB,
					style: {
						color: '#00ff00',
						style: 'solid',
						lineWidth: 2,
						useLabel: true
					},

					isInteractive: true
				},

				{
					id: 'C',
					vector: phaseSystem.phaseC,
					style: {
						color: '#ff0000',
						style: 'solid',
						lineWidth: 2,
						useLabel: true
					},

					isInteractive: true
				},

				{
					id: 'A1',
					vector: symmetricalComponents.phaseA.A1,
					style: {
						color: '#ffff00',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'A2',
					vector: symmetricalComponents.phaseA.A2,
					base: symmetricalComponents.phaseA.A1,
					style: {
						color: '#ffaa00',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'A0',
					vector: symmetricalComponents.phaseA.A0,
					base: Complex.add(symmetricalComponents.phaseA.A1, symmetricalComponents.phaseA.A2),
					style: {
						color: '#aaaaaa',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'B1',
					vector: symmetricalComponents.phaseB.A1,
					style: {
						color: '#00ff00',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'B2',
					vector: symmetricalComponents.phaseB.A2,
					base: symmetricalComponents.phaseB.A1,
					style: {
						color: '#aaff00',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'B0',
					vector: symmetricalComponents.phaseB.A0,
					base: Complex.add(symmetricalComponents.phaseB.A1, symmetricalComponents.phaseB.A2),
					style: {
						color: '#aaaaaa',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'C1',
					vector: symmetricalComponents.phaseC.A1,
					style: {
						color: '#ff0000',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'C2',
					vector: symmetricalComponents.phaseC.A2,
					base: symmetricalComponents.phaseC.A1,
					style: {
						color: '#ff00aa',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				},

				{
					id: 'C0',
					vector: symmetricalComponents.phaseC.A0,
					base: Complex.add(symmetricalComponents.phaseC.A1, symmetricalComponents.phaseC.A2),
					style: {
						color: '#aaaaaa',
						style: 'dashed',
						lineWidth: 1,
						useLabel: false
					},

					isInteractive: false
				}
			]}
			onDrag={({ vectorId, complex }) => {
				switch (vectorId) {
					case 'A':
						changePhase('phaseA', complex);
						break;
					case 'B':
						changePhase('phaseB', complex);
						break;
					case 'C':
						changePhase('phaseC', complex);
						break;
				}
			}}
		/>
	</div>
	<div class="instrument symm-values">
		<Title level={3}>Симметричные составляющие</Title>
		<ComplexInputField
			name="Прямая"
			complex={symmetricalSystem.A1}
			oninput={(A1) => {
				changeSymm('A1', A1);
			}}
		/>
		<span class="line"></span>
		<ComplexInputField
			name="Обратная"
			complex={symmetricalSystem.A2}
			oninput={(A2) => {
				changeSymm('A2', A2);
			}}
		/>
		<span class="line"></span>
		<ComplexInputField
			name="Нулевая"
			complex={symmetricalSystem.A0}
			oninput={(A0) => {
				changeSymm('A0', A0);
			}}
		/>

		<div class="symm-phasors-container">
			<PhasorComponent
				axisOrientation="alternative"
				labelMode={true}
				vectorLabelMode={true}
				vectors={[
					{
						id: 'A1',
						isInteractive: true,
						vector: symmetricalComponents.phaseA.A1,
						style: {
							color: '#ffff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					},

					{
						id: 'B1',
						isInteractive: true,
						vector: symmetricalComponents.phaseB.A1,
						style: {
							color: '#00ff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					},

					{
						id: 'C1',
						isInteractive: true,
						vector: symmetricalComponents.phaseC.A1,
						style: {
							color: '#ff0000',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					},

					{
						id: 'A2',
						isInteractive: true,
						vector: symmetricalComponents.phaseA.A2,
						style: {
							color: '#ffaa00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					},

					{
						id: 'B2',
						isInteractive: true,
						vector: symmetricalComponents.phaseB.A2,
						style: {
							color: '#aaff00',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					},

					{
						id: 'C2',
						isInteractive: true,
						vector: symmetricalComponents.phaseC.A2,
						style: {
							color: '#ff00aa',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					},

					{
						id: 'A0',
						isInteractive: true,
						vector: symmetricalComponents.phaseA.A0,
						style: {
							color: '#aaaaaa',
							lineWidth: 2,
							style: 'solid',
							useLabel: true
						}
					}
				]}
				onDrag={({ vectorId, complex }) => {
					if (vectorId === 'A1' || vectorId === 'A2' || vectorId === 'A0') {
						changeSymm(vectorId, complex);
					} else {
						switch (vectorId) {
							case 'B1':
								changeSymm('A1', Complex.mul(complex, { value: 1, angle: 120 }));
								break;
							case 'B2': {
								changeSymm('A2', Complex.mul(complex, { value: 1, angle: -120 }));
								break;
							}
							case 'C1':
								changeSymm('A1', Complex.mul(complex, { value: 1, angle: -120 }));
								break;
							case 'C2': {
								changeSymm('A2', Complex.mul(complex, { value: 1, angle: 120 }));
								break;
							}
						}
					}
				}}
			/>
		</div>
	</div>
</div>

<style>
	.grid {
		margin-top: 12px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
	}

	.instrument {
		max-width: 500px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.line {
		display: block;
		border-top: 1px solid var(--pale-text-color);
	}

	@media (width < 1000px) {
		.grid {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			justify-items: center;
		}
	}
</style>
