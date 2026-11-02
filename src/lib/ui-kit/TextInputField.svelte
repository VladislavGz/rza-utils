<script lang="ts">
	import VisibilityOffSVG from '#lib/assets/icons/VisibilityOffSVG.svelte';
	import VisibilitySVG from '#lib/assets/icons/VisibilitySVG.svelte';
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';

	type TTextInputFieldProps = {
		label: string;
		type?: 'text' | 'password';
		placeholder?: string;
		minlength?: number;
		maxlength?: number;
	};

	const {
		label,
		type = 'text',
		placeholder = '',
		minlength = 0,
		maxlength = 100
	}: TTextInputFieldProps = $props();

	const id = $props.id();
	let visibility: boolean = $state(false);
	let currentType: 'text' | 'password' = $derived.by(() => {
		if (type === 'text' || visibility) return 'text';
		return 'password';
	});
</script>

<div class="text-input-field">
	<label for={id} class="input-field-label">{label}</label>
	<input {id} class="input" type={currentType} {placeholder} {minlength} {maxlength} />
	{#if type === 'password'}
		<IconButton
			onClick={() => {
				visibility = !visibility;
			}}
		>
			<Icon>
				{#if visibility}
					<VisibilityOffSVG />
				{:else}
					<VisibilitySVG />
				{/if}
			</Icon>
		</IconButton>
	{/if}
</div>

<style>
	.text-input-field {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.input-field-label {
		display: block;
	}

	.input {
		display: block;
	}
</style>
