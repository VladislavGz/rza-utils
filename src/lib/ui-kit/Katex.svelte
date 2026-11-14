<script lang="ts">
	import { renderMath } from '#lib/utils/renderMath.ts';

	type TKatexProps = {
		text: string;
		displayMode?: boolean;
	};

	const { text, displayMode = true }: TKatexProps = $props();
</script>

{@html renderMath(text, displayMode)}
