<script lang="ts">
	import { renderMath } from '#lib/utils/renderMath.ts';
	import 'katex/dist/katex.min.css';

	type TKatexProps = {
		text: string;
	};

	const { text }: TKatexProps = $props();
</script>

{@html renderMath(text, true)}
