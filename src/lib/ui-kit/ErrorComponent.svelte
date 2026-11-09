<script lang="ts">
	import type { TFont } from '#lib/types/ui-types.ts';

	type TErrorComponentProps = {
		font?: TFont;
		message: string;
	};

	const { font = 'main', message }: TErrorComponentProps = $props();
</script>

<div class="error">
	<p class="g-error-text message _font-{font}">{message}</p>
</div>

<style>
	.error {
		width: 100%;
		height: 100%;
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
