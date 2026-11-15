<script lang="ts">
	import Info from '#lib/ui-kit/Info.svelte';
	import Katex from '#lib/ui-kit/Katex.svelte';
	import Paragraph from '#lib/ui-kit/Paragraph.svelte';
	import Radio from '#lib/ui-kit/Radio.svelte';
	import Title from '#lib/ui-kit/Title.svelte';
	import Toggle from '#lib/ui-kit/Toggle.svelte';
	import ComplexInputField from '../components/ComplexInputField.svelte';
	import PhasorComponent from '../components/PhasorComponent.svelte';
	import { Complex } from '../core/Complex/Complex';
	import type { TComplex } from '../core/Complex/types';
	import type { TSymmetricalComponentsSystem, TThreePhaseSystem } from '../core/coreTypes';
	import type { TPhasorAxisOrientation } from '../core/Phasor/types';
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

	const settings: {
		axisOrientation: TPhasorAxisOrientation;
		labelMode: boolean;
		vectorLabelMode: boolean;
		gridMode: boolean;
	} = $state({
		axisOrientation: 'alternative',
		labelMode: true,
		vectorLabelMode: true,
		gridMode: true
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
			{...settings}
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
				{...settings}
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
<div class="panel">
	<Radio
		legend="Ориентация осей"
		options={['Стандартная', 'Альтернативная']}
		defaultOption="Альтернативная"
		onChange={(opt) => {
			if (opt === 'Альтернативная') {
				settings.axisOrientation = 'alternative';
			} else {
				settings.axisOrientation = 'standart';
			}
		}}
	/>
	<Toggle
		legend="Сетка"
		default={settings.gridMode}
		onChange={(value) => {
			settings.gridMode = value;
		}}
	/>
	<Toggle
		legend="Подписи"
		default={settings.labelMode}
		onChange={(value) => {
			settings.labelMode = value;
		}}
	/>
	<Toggle
		legend="Векторы"
		default={settings.vectorLabelMode}
		onChange={(value) => {
			settings.vectorLabelMode = value;
		}}
	/>
</div>
<div class="instrument-description">
	<div class="description-section">
		<Title level={2} font="main">Метод симметричных составляющих</Title>
		<Paragraph
			>Метод симметричных составляющих (преобразование Фортескью) — это математический приём,
			позволяющий анализировать любую несимметричную трёхфазную систему (токов или напряжений) как
			сумму трёх симметричных систем: <strong>прямой</strong>,
			<strong>обратной</strong>
			и
			<strong>нулевой</strong> последовательностей.
		</Paragraph>
	</div>

	<div class="description-section">
		<Title level={3} font="main">1. Оператор поворота</Title>
		<Paragraph
			>Для удобства расчётов вводится комплексный оператор <Katex
				text={String.raw`a`}
				displayMode={false}
			/>, который представляет собой поворот вектора на <Katex
				text={String.raw`120^\circ`}
				displayMode={false}
			/> против часовой стрелки:
		</Paragraph>
		<div>
			<Katex text={String.raw`a = e^{j120^\circ} = -\frac{1}{2} + j\frac{\sqrt{3}}{2}`} />
			<Katex
				text={String.raw`a^2 = e^{j240^\circ} = e^{-j120^\circ} = -\frac{1}{2} - j\frac{\sqrt{3}}{2}`}
			/>
		</div>
	</div>

	<div class="description-section">
		<Title level={3} font="main">2. Три последовательности</Title>
		<Paragraph>
			Любая несимметричная система векторов
			<Katex text={String.raw`\dot A, \dot B, \dot C`} displayMode={false} />
			раскладывается на:
		</Paragraph>

		<ul class="description-list">
			<li class="description-list-item">
				<strong>Прямая последовательность (A1, B1, C1)</strong> — симметричная система с
				чередованием фаз A → B → C. Векторы равны по модулю и сдвинуты на 120° (B отстаёт от A):
				<Katex text={String.raw`\dot B_1 = a^2 \dot A_1, \quad \dot C_1 = a \dot A_1`} />
			</li>
			<li class="description-list-item">
				<strong>Обратная последовательность (A2, B2, C2)</strong> — симметричная система с обратным
				чередованием фаз A → C → B. Векторы равны по модулю и сдвинуты на 120° (B опережает A):
				<Katex text={String.raw`\dot B_2 = a \dot A_2, \quad \dot C_2 = a^2 \dot A_2`} />
			</li>
			<li class="description-list-item">
				<strong>Нулевая последовательность (A0, B0, C0)</strong> — все три вектора равны по модулю и
				совпадают по фазе:
				<Katex text={String.raw`\dot A_0 = \dot B_0 = \dot C_0`} />
			</li>
		</ul>
	</div>

	<div class="description-section">
		<Title level={3} font="main">3. Прямое преобразование (разложение)</Title>
		<Paragraph>
			Чтобы найти симметричные составляющие для фазы A по известным фазным величинам, используются
			формулы:
		</Paragraph>
		<div>
			<Katex text={String.raw`\dot A_1 = \frac{\dot A + a\dot B + a^2\dot C}{3}`} />
			<Katex text={String.raw`\dot A_2 = \frac{\dot A + a^2\dot B + a\dot C}{3}`} />
			<Katex text={String.raw`\dot A_0 = \frac{\dot A + \dot B + \dot C}{3}`} />
		</div>

		<Paragraph>
			Составляющие для фаз B и C находятся через оператор
			<Katex text={String.raw`a`} displayMode={false} />
			(см. пункт 2).
		</Paragraph>
	</div>

	<div class="description-section">
		<Title level={3} font="main">4. Обратное преобразование (синтез)</Title>
		<Paragraph>
			Если известны симметричные составляющие, исходные фазные величины восстанавливаются по
			формулам:
		</Paragraph>
		<div>
			<Katex text={String.raw`\dot A = \dot A_1 + \dot A_2 + \dot A_0`} />
			<Katex text={String.raw`\dot B = a^2\dot A_1 + a\dot A_2 + \dot A_0`} />
			<Katex text={String.raw`\dot C = a\dot A_1 + a^2\dot A_2 + \dot A_0`} />
		</div>
	</div>

	<Info>
		Метод симметричных составляющих был изобретен американским инженером-электротехником Чарльзом
		Легейтом Фортескью (Charles LeGeyt Fortescue). В 1918 году он представил научную работу, в
		которой доказал теорему о том, что любую несимметричную систему из <em><strong>N</strong></em>
		векторов (фазоров) можно представить как сумму <em><strong>N</strong></em> симметричных систем. Для
		трёхфазных цепей это открытие стало революционным, так как позволило инженерам анализировать сложные
		аварийные режимы (например, однофазные замыкания на землю) с помощью обычных линейных уравнений.
	</Info>
</div>

<style>
	.grid {
		margin-top: 26px;
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

	.panel {
		margin-top: 26px;

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.instrument-description {
		margin-top: 26px;
		padding-top: 26px;

		display: flex;
		flex-direction: column;
		gap: 26px;

		border-top: 1px solid var(--pale-text-color);
		color: var(--main-text-color);
	}

	.description-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.description-list-item {
		margin-left: 26px;
		list-style: disc;

        font-family: var(--main-font);
	}

	@media (width < 1000px) {
		.grid {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			justify-items: center;
		}
	}
</style>
