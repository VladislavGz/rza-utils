<script lang="ts">
	interface Props {
		legend: string;
		default?: boolean;
		onChange: (value: boolean) => void;
	}

	let { legend, default: initialValue = false, onChange }: Props = $props();

	const uid = $props.id();
	const inputId = `${uid}-toggle`;

	// svelte-ignore state_referenced_locally
	let checked = $state(initialValue);

	function handleChange(e: Event) {
		const value = (e.currentTarget as HTMLInputElement).checked;
		checked = value;
		onChange(value);
	}
</script>

<div class="toggle">
	<span class="g-main-text toggle__label" id={`${inputId}-label`}>{legend}</span>

	<label class="toggle__switch" for={inputId}>
		<input
            class="g-visually-hidden"
			id={inputId}
			type="checkbox"
			{checked}
			onchange={handleChange}
			aria-labelledby={`${inputId}-label`}
		/>
		<span class="toggle__track" aria-hidden="true">
			<span class="toggle__thumb"></span>
		</span>
	</label>
</div>

<style>
	.toggle {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.toggle__switch {
		position: relative;
		display: block;
		cursor: pointer;
	}

	.toggle__track {
		display: flex;
        align-items: center;
        padding-inline: 4px;
		width: 36px;
		height: 18px;
		border-radius: 999px;
		background-color: var(--bg-main-color-p100);
		transition: background-color 0.2s ease;
	}

	.toggle__thumb {
		display: block;
		width: 10px;
        aspect-ratio: 1;

		border-radius: 50%;
		background: #fff;

		transform: translateX(0);
		transition: transform 0.2s ease-in;
	}

	/* вкл */
	.toggle__switch input:checked + .toggle__track {
        background-color: var(--bg-accent-color-0);
	}

	.toggle__switch input:checked + .toggle__track .toggle__thumb {
		transform: translateX(18px);
	}

	/* hover */
	.toggle__switch:hover .toggle__track {
		background-color: var(--bg-main-color-p200);
	}

	.toggle__switch:hover input:checked + .toggle__track {
        background-color: var(--bg-accent-color-p100);
	}

	.toggle__switch input:focus-visible + .toggle__track {
		outline: 2px solid var(--bg-accent-color-p100);
		outline-offset: 2px;
	}
</style>
