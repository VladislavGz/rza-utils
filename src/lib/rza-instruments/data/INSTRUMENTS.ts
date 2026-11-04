import type { TUtilDescription } from "#lib/types/types.ts";
import KzVectorsSVG from "./icons/KzVectorsSVG.svelte";
import SineSVG from "./icons/SineSVG.svelte";
import SymmetricSVG from "./icons/SymmetricSVG.svelte";
import TransformSVG from "./icons/TransformSVG.svelte";
import VahSVG from "./icons/VahSVG.svelte";

export const INSTRUMENTS: TUtilDescription[] = [
	{
		idName: 'vah-viewer',
		name: 'Просмотр ВАХ',
		description:
			'Этот инструмент позволяет просматривать вольт-амперные характеристики в нативном формате РЕТОМ 21 (.r21_transl)',
		link: '/vah-viewer',
		icon: VahSVG
	},

	{
		idName: 'osc-viewer',
		name: 'Просмотр осциллограмм',
		description: 'Этот инструмент позволяет просматривать осциллограммы в различных форматах',
		link: '/osc-viewer',
		icon: SineSVG
	},

	{
		idName: 'symmetric-components-calculator',
		name: 'Калькулятор симметричных составляющих',
		description: '',
		link: '/symmetric-components-calculator',
		icon: SymmetricSVG
	},

	{
		idName: 'vector-diagrams',
		name: 'Векторные диаграммы',
		description: 'Памятка по векторным диаграммам для типичных видов повреждений',
		link: '/vector-diagrams',
		icon: KzVectorsSVG
	},

	{
		idName: 'transform-calc',
		name: 'Калькулятор вторичных величин',
		description: 'Пересчет первичных значений тока, напряжения, сопротивления и мощности во вторичные и наоборот',
		link: '/transform-calc',
		icon: TransformSVG
	},
];