import type { TUtilDescription } from '#lib/types/types.ts';
import KzVectorsSVG from './icons/KzVectorsSVG.svelte';
import SineSVG from './icons/SineSVG.svelte';
import SymmetricSVG from './icons/SymmetricSVG.svelte';
import TransformSVG from './icons/TransformSVG.svelte';
import VahSVG from './icons/VahSVG.svelte';

export const INSTRUMENTS: TUtilDescription[] = [
	{
		idName: 'vah-viewer',
		name: 'Просмотр вольт-амперных характеристик',
		description: 'Просмотр вольт-амперных характеристик в формате .r21_transl',
		link: '/vah-viewer',
		icon: VahSVG,
		iconStrokeWidth: 2
	},

	{
		idName: 'osc-viewer',
		name: 'Просмотр осциллограмм',
		description: 'Просмотр осциллограмм в различных форматах',
		link: '/osc-viewer',
		icon: SineSVG,
		iconStrokeWidth: 2
	},

	{
		idName: 'symmetric-components-calculator',
		name: 'Калькулятор симметричных составляющих',
		description: 'Расчет и визуализация симметричных составляющих на основе фазных значений',
		link: '/symmetric-components-calculator',
		icon: SymmetricSVG,
		iconStrokeWidth: 2
	},

	{
		idName: 'vector-diagrams',
		name: 'Памятка по векторным диаграммам',
		description: 'Интерактивные векторные диаграммы для типичных видов повреждений',
		link: '/vector-diagrams',
		icon: KzVectorsSVG,
		iconStrokeWidth: 2
	},

	{
		idName: 'transform-calc',
		name: 'Калькулятор вторичных величин',
		description:
			'Пересчет первичных значений тока, напряжения, сопротивления и мощности во вторичные и наоборот',
		link: '/transform-calc',
		icon: TransformSVG,
		iconStrokeWidth: 2
	}
];
