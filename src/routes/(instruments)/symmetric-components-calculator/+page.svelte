<script lang="ts">
	import { APP } from '#lib/constants/APP.ts';
	import SymmCompCalcPage from '#lib/pages/instruments/SymmCompCalcPage.svelte';

	const fullUrl = `${APP.domain}/symmetric-components-calculator`;

	const title = 'Калькулятор симметричных составляющих (Фортескью) | Инструменты релейщика';

	const description =
		'Интерактивный онлайн калькулятор для расчета симметричных составляющих. Визуализация векторов, прямое и обратное преобразование Фортескью.';

	const ogImage = `${APP.domain}/ogImages/ogImg-symmetric-components-calculator.png`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: title,
		url: fullUrl,
		description: description,
		applicationCategory: 'EngineeringApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'RUB'
		}
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta
		name="keywords"
		content="симметричные составляющие, метод фортескью, калькулятор, релейная защита, РЗА, векторная диаграмма, электротехника"
	/>
	<link rel="canonical" href={fullUrl} />
	<meta name="robots" content="index, follow" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content="Инструменты релейщика" />
	<meta property="og:locale" content="ru_RU" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}

	<meta name="theme-color" content="#121212" />
</svelte:head>

<SymmCompCalcPage />
