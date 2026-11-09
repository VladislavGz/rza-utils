<script lang="ts">
	type TNumberInputFieldPropd = {
		label: string;
		value: number;
		oninput: (value: number) => void;
	};

	const { label, value, oninput }: TNumberInputFieldPropd = $props();

	const id = $props.id();
</script>

<div class="number-input-field">
	<label for={id} class="input-field-label">{label}</label>
	<input
		type="number"
		class="input"
		value={value.toFixed(3)}
		oninput={(e) => {
			const input = e.target as HTMLInputElement;
			oninput(Number(input.value));
		}}
	/>
</div>

<style>
	.number-input-field {
		display: grid;
        grid-template-columns: 1fr 4fr;
        align-items: center;
        gap: 10px;
	}

	.input-field-label {
		color: var(--main-text-color);
		font-family: var(--main-font);
		font-size: var(--main-font-size);
	}

	.input {
		display: block;
		padding: 4px;

		font-family: var(--main-font);
		color: var(--main-text-color);
        font-size: var(--main-font-size);

		outline: none;
		border: none;
		background-color: var(--bg-main-color-0);
	}
</style>
