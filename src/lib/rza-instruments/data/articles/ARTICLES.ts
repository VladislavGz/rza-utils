import type { TAllArticles } from "#lib/types/types.ts";
import DoublePhaseKzSVG from "../icons/DoublePhaseKzSVG.svelte";
import DoublePhaseZGroundSVG from "../icons/DoublePhaseZGroundSVG.svelte";
import OnePhaseBreakLineIsolatedSVG from "../icons/OnePhaseBreakLineIsolatedSVG.svelte";
import OnePhaseBreakLineSVG from "../icons/OnePhaseBreakLineSVG.svelte";
import OnePhaseKzSVG from "../icons/OnePhaseKzSVG.svelte";
import OnePhaseZGroundSVG from "../icons/OnePhaseZGroundSVG.svelte";
import ThreePhaseKzSVG from "../icons/ThreePhaseKzSVG.svelte";
import TwoPhaseBreakLineIsolatedSVG from "../icons/TwoPhaseBreakLineIsolatedSVG.svelte";
import TwoPhaseBreakLineSVG from "../icons/TwoPhaseBreakLineSVG.svelte";
import TwoPhaseKzGroundSVG from "../icons/TwoPhaseKzGroundSVG.svelte";
import TwoPhaseKzSVG from "../icons/TwoPhaseKzSVG.svelte";
import TwoPhaseZGroundSVG from "../icons/TwoPhaseZGroundSVG.svelte";
import DoublePhaseKzGround from "./damagesTypes/DoublePhaseKzGround.svelte";
import DoublePhaseZ from "./damagesTypes/DoublePhaseZ.svelte";
import OnePhaseBreakLine from "./damagesTypes/OnePhaseBreakLine.svelte";
import OnePhaseBreakLineIsolated from "./damagesTypes/OnePhaseBreakLineIsolated.svelte";
import OnePhaseKz from "./damagesTypes/OnePhaseKz.svelte";
import OnePhaseZ from "./damagesTypes/OnePhaseZ.svelte";
import ThreePhaseKz from "./damagesTypes/ThreePhaseKz.svelte";
import TwoPhaseBreakLine from "./damagesTypes/TwoPhaseBreakLine.svelte";
import TwoPhaseBreakLineIsolated from "./damagesTypes/TwoPhaseBreakLineIsolated.svelte";
import TwoPhaseKz from "./damagesTypes/TwoPhaseKz.svelte";
import TwoPhaseKzGround from "./damagesTypes/TwoPhaseKzGround.svelte";
import TwoPhaseZ from "./damagesTypes/TwoPhaseZ.svelte";

export const ARTICLES: TAllArticles = [
    {
        themeId: 'damages',
        themeName: 'Виды повреждений в электроэнергетических системах',
        themeDescription: '',
        articles: [
            {
                idName: 'three-phase-kz',
                title: 'Трехфазное короткое замыкание',
                description: '',
                link: '/articles/damages/three-phase-kz',
                icon: ThreePhaseKzSVG,
                iconStrokeWidth: 2,
                articleComponent: ThreePhaseKz
            },

            {
                idName: 'one-phase-kz',
                title: 'Однофазное короткое замыкание',
                description: '',
                link: '/articles/damages/one-phase-kz',
                icon: OnePhaseKzSVG,
                iconStrokeWidth: 2,
                articleComponent: OnePhaseKz
            },

            {
                idName: 'two-phase-kz',
                title: 'Двухфазное короткое замыкание',
                description: '',
                link: '/articles/damages/two-phase-kz',
                icon: TwoPhaseKzSVG,
                iconStrokeWidth: 2,
                articleComponent: TwoPhaseKz
            },

            {
                idName: 'two-phase-kz-ground',
                title: 'Двухфазное КЗ на землю в сети с глухозаземленной нейтралью',
                description: '',
                link: '/articles/damages/two-phase-kz-ground',
                icon: TwoPhaseKzGroundSVG,
                iconStrokeWidth: 2,
                articleComponent: TwoPhaseKzGround
            },

            {
                idName: 'double-phase-kz',
                title: 'Двойное (распределенное) КЗ на землю в сети с глухозаземленной нейтралью',
                description: '',
                link: '/articles/damages/double-phase-kz',
                icon: DoublePhaseKzSVG,
                iconStrokeWidth: 2,
                articleComponent: DoublePhaseKzGround
            },

            {
                idName: 'one-phase-z',
                title: 'Однофазное замыкание на землю в сети с изолированной нейтралью',
                description: '',
                link: '/articles/damages/one-phase-z',
                icon: OnePhaseZGroundSVG,
                iconStrokeWidth: 2,
                articleComponent: OnePhaseZ
            },

            {
                idName: 'two-phase-z',
                title: 'Двухфазное КЗ на землю в сети с изолированной нейтралью',
                description: '',
                link: '/articles/damages/two-phase-z',
                icon: TwoPhaseZGroundSVG,
                iconStrokeWidth: 2,
                articleComponent: TwoPhaseZ
            },

            {
                idName: 'double-phase-z',
                title: 'Двойное (распределенное) замыкание на землю в сети с изолированной нейтралью',
                description: '',
                link: '/articles/damages/double-phase-z',
                icon: DoublePhaseZGroundSVG,
                iconStrokeWidth: 2,
                articleComponent: DoublePhaseZ
            },

            {
                idName: 'one-phase-break-line',
                title: 'Обрыв одной фазы в сети с глухозаземленной нейтралью',
                description: '',
                link: '/articles/damages/one-phase-break-line',
                icon: OnePhaseBreakLineSVG,
                iconStrokeWidth: 2,
                articleComponent: OnePhaseBreakLine
            },

            {
                idName: 'two-phase-break-line',
                title: 'Обрыв двух фаз в сети с глухозаземленной нейтралью',
                description: '',
                link: '/articles/damages/two-phase-break-line',
                icon: TwoPhaseBreakLineSVG,
                iconStrokeWidth: 2,
                articleComponent: TwoPhaseBreakLine
            },

            {
                idName: 'one-phase-break-line-isolated',
                title: 'Обрыв одной фазы в сети с изолированной нейтралью',
                description: '',
                link: '/articles/damages/one-phase-break-line-isolated',
                icon: OnePhaseBreakLineIsolatedSVG,
                iconStrokeWidth: 2,
                articleComponent: OnePhaseBreakLineIsolated
            },

            {
                idName: 'two-phase-break-line-isolated',
                title: 'Обрыв двух фаз в сети с изолированной нейтралью',
                description: '',
                link: '/articles/damages/two-phase-break-line-isolated',
                icon: TwoPhaseBreakLineIsolatedSVG,
                iconStrokeWidth: 2,
                articleComponent: TwoPhaseBreakLineIsolated
            },
        ]
    }
]