<script lang="ts">
	import NumberInputField from '#lib/ui-kit/NumberInputField.svelte';
	import type { TComplex } from '../core/coreTypes';

	type TComplexInputField = {
		name: string;
		complex: TComplex;
		oninput: (value: TComplex) => void;
	};

	const { name, complex, oninput }: TComplexInputField = $props();
</script>

<div class="complex-input-field">
	<p class="field-name">{name}</p>
	<div class="wrapper">
		<NumberInputField
			label="Величина"
			value={complex.value}
			oninput={(value) => {
				oninput({
					value,
					angle: complex.angle
				});
			}}
		/>

		<NumberInputField
			label="Угол, гр"
			value={complex.angle}
			oninput={(angle) => {
				oninput({
					value: complex.value,
					angle
				});
			}}
		/>
	</div>
</div>

<style>
	.complex-input-field {
		display: grid;
        grid-template-columns: 1fr 5fr;
        align-items: center;
        justify-items: center;
        gap: 10px;
	}

	.field-name {
        color: var(--main-text-color);
		font-family: var(--main-font);
		font-size: var(--main-font-size);
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
