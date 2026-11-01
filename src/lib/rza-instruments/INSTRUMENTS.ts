import type { TUtilDescription } from "#lib/types/types.ts";

export const UTILS_LIST: TUtilDescription[] = [
	{
		idName: 'vah-viewer',
		name: 'Просмотр ВАХ',
		description:
			'Этот инструмент позволяет просматривать вольт-амперные характеристики в нативном формате РЕТОМ 21 (.r21_transl)',
		link: '/vah-viewer'
	},

	{
		idName: 'osc-viewer',
		name: 'Просмотр осциллограмм',
		description: 'Этот инструмент позволяет просматривать осциллограммы в различных форматах',
		link: '/osc-viewer'
	},

	{
		idName: 'symmetric-components-calculator',
		name: 'Калькулятор симметричных составляющих',
		description: '',
		link: '/symmetric-components-calculator'
	},

	{
		idName: 'vector-diagrams',
		name: 'Векторные диаграммы',
		description: 'Памятка по векторным диаграммам для типичных видов повреждений',
		link: '/vector-diagrams'
	},

	{
		idName: 'transform-calc',
		name: 'Калькулятор вторичных величин',
		description: 'Пересчет первичных значений тока, напряжения, сопротивления и мощности во вторичные и наоборот',
		link: '/transform-calc'
	},
];