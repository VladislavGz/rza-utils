<script lang="ts">
	import Title from '#lib/ui-kit/Title.svelte';
	import ComplexInputField from '../components/ComplexInputField.svelte';
	import type {
		TComplex,
		TSymmetricalComponentsSystem,
		TThreePhaseSystem
	} from '../core/coreTypes';
	import { Symmetric } from '../core/Symmetric/Symmetric';

	let phaseSystem: TThreePhaseSystem = $state({
		phaseA: { value: 220, angle: 0 },
		phaseB: { value: 220, angle: -120 },
		phaseC: { value: 220, angle: 120 }
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

	$inspect(symmetricalSystem);
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
