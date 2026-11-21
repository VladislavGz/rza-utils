<script lang="ts">
	import type { TArticle } from '#lib/types/types.ts';
	import Title from '#lib/ui-kit/Title.svelte';
	import InstrumentIcon from './InstrumentIcon.svelte';

	type TDamageCardProps = {
		article: TArticle;
	};

	const { article }: TDamageCardProps = $props();
	const Icon = $derived(article.icon);
</script>

<a href={article.link} class="instrument-link">
	<article class="instrument-card">
		<div class="icon-container">
			<InstrumentIcon strokeWidth={article.iconStrokeWidth}>
				<Icon />
			</InstrumentIcon>
		</div>
		<Title level={3} font="main">{article.title}</Title>
	</article>
</a>

<style>
	.instrument-card {
		width: 300px;
		height: 300px;

		padding: 20px;

		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;
		align-items: center;
		justify-items: center;

		border-radius: 26px;
		border: 2px solid var(--pale-text-color);
		border-style: dashed;

		transition: border-color 0.2s ease-in;

		&:hover {
			border-color: var(--title-h1-color);
		}
	}

	.icon-container {
		width: 200px;
		aspect-ratio: 1;
	}
</style>
