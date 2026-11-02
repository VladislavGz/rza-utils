<script lang="ts">
	import Title from '#lib/ui-kit/Title.svelte';
	import { getScrambledText } from '#lib/utils/getScrambledText.svelte.ts';
	import { onDestroy } from 'svelte';

	let scrambled = getScrambledText('Инструменты релейщика');

	onDestroy(() => {
		scrambled.destroy();
	});
</script>

<header class="header-main">
	<Title level={1} font="accent">{scrambled.text}</Title>
</header>
