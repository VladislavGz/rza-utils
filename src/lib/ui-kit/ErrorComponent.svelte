<script lang="ts">
	import ErrorSVG from '#lib/assets/icons/ErrorSVG.svelte';
	import type { TFont } from '#lib/types/ui-types.ts';
	import Icon from './Icon.svelte';

	type TErrorComponentProps = {
		font?: TFont;
		message: string;
	};

	const { font = 'main', message }: TErrorComponentProps = $props();
</script>

<div class="error">
	<Icon color='main' size='large'>
		<ErrorSVG />
	</Icon>
	<p class="g-main-text message _font-{font}">{message}</p>
</div>

<style>
	.error {
		width: 100%;
		height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
	}

	.message {
		&._font-main {
			font-family: var(--main-font);
		}

		&._font-accent {
			font-family: var(--accent-font);
		}

		&._font-logo {
			font-family: var(--logo-font);
		}
	}
</style>
