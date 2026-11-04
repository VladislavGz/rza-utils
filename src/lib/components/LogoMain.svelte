<script lang="ts">
	import ScrambledText from '#lib/ui-kit/ScrambledText.svelte';
</script>

<span class="logo-main" aria-hidden="true">
	<ScrambledText text="Инструменты" />
	<div class="padding">
		<ScrambledText text="релейщика" />
	</div>
</span>

<style>
	.padding {
		margin-top: 0.2em;
		padding-left: 5em;
		font-size: var(--h1-font-size);
	}
</style>
