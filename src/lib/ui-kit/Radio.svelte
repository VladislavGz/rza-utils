<script lang="ts">
	interface Props {
		legend: string;
		options: string[];
		onChange: (option: string) => void;
		defaultOption?: string;
	}

	let { legend, options, onChange, defaultOption }: Props = $props();

	const uid = $props.id();
	const legendId = `${uid}-legend`;
	const groupName = `${uid}-group`;

	// Инициализация один раз: если defaultOption есть и валиден — выбираем его.
	let selected = $state<string | null>(
		defaultOption != null && options.includes(defaultOption) ? defaultOption : null
	);

	function handleChange(option: string) {
		selected = option;
		onChange(option);
	}
</script>

<div class="radio" role="radiogroup" aria-labelledby={legendId}>
	<span class="g-main-text radio__legend" id={legendId}>{legend}</span>

	{#each options as option (option)}
		<label class="radio__option" class:radio__option--checked={selected === option}>
			<input
				class="g-visually-hidden"
				type="radio"
				name={groupName}
				value={option}
				checked={selected === option}
				onchange={() => handleChange(option)}
			/>
			<span>{option}</span>
		</label>
	{/each}
</div>

<style>
	.radio {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.radio__option {
		display: block;

		padding: 4px 20px;
		border-radius: 999px;
		background-color: var(--bg-main-color-0);

		color: var(--main-text-color);

		cursor: pointer;
		user-select: none;
	}

	.radio__option--checked {
		background-color: var(--bg-main-color-p200);
		color: var(--accent-text-color);

		pointer-events: none;
	}

	.radio__option:hover {
		background-color: var(--bg-main-color-p100);
	}

	.radio__option:has(input:focus-visible) {
		outline: 2px solid var(--main-text-color);
		outline-offset: 2px;
	}
</style>
