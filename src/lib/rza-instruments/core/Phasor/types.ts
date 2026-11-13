import type { TColorMode } from "#lib/types/types.ts";
import type { TComplex } from "../Complex/types";

/**
 * Стиль линии
 */
export type TLineStyle = 'solid' | 'dashed';

/**
 * Стиль отрисовки вектора на фазоре
 */
export type TPhasorVectorStyle = {
    /**
     * Цвет вектора
     */
    color: string;

    /**
     * Стиль линии вектора
     */
    style: TLineStyle;

    /**
     * Толщина линии вектора
     */
    lineWidth: number;
}

/**
 * Данные комплексного вектора для передачи в Phasor
 */
export type TPhasorVectorData = {
    /**
     * Идентификатор вектора на диаграмме
     */
    id: string;

    /**
     * Непосредственно отрисовываемый вектор
     */
    vector: TComplex;

    /**
     * Базовый веткор, относительно которого будет отрисован вектор vector
     * Если не указан (или указан нулевой вектор), то vector будет отрисован из начала координат.
     * Если указан, то vector будет отрисован относительно конца вектора base
     */
    base?: TComplex;

    /**
     * Флаг, указывающий должен ли вектор на диаграмме быть интерактивным
     */
    isInteractive: boolean;

    /**
     * Стиль вектора
     */
    style?: TPhasorVectorStyle;
}

/**
 * Ориентация осей комплексной системы координат
 */
export type TPhasorAxisOrientation =
    'standart' //стандартная математическая (Re - вправо, Im - вверх)
    | 'alternative'; //повернутая на 90гр. (Re - вверх, Im - влево)

/**
 * Точка в координатах контекста canvas
 */
export type TCtxPoint = {
    x: number;
    y: number;
}

/**
 * Линия в координатах контекста canvas
 */
export type TCtxLine = {
    from: TCtxPoint;
    to: TCtxPoint;
}

/**
 * Объект статического кадра фазора
 */
export type TPhasorStaticFrame = {
    vectors: TPhasorVectorData[];
    ctxData: Record<string, TCtxLine>;
    center: TCtxPoint;
}

/**
 * Объект динамического кадра фазора
 */
export type TPhasorDynamicFrame = {
    /**
     * Положение курсора
     */
    cursor: TCtxPoint | null;
}

/**
 * Стили фазора
 */
export type TPhasorStyle = {
    fontSize: number;
    fontFamily: string;
    fontColor: string;
    gridColor: string;
    bgColor: string;
    cursorColor: string;
}

/**
 * Объект настроек фазора
 */
export type TPhasorSettings = {
    /**
     * Шаг радиальной сетки в градусах
     */
    radialGridStep: number;

    /**
     * Масштаб по умолчанию
     */
    defaultScalePos: number;

    /**
     * Массив масштабов
     */
    scales: number[];

    /**
     * Стили фазора
     */
    style: Record<TColorMode, TPhasorStyle>

    /**
     * Настройки стилей линий векторов
     */
    lineDash: Record<TLineStyle, number[]>;

    /**
     * Дефолтный стиль векторов
     */
    defaultVectorStyle: TPhasorVectorStyle;

    /**
     * Размер области захвата вектора
     */
    vectorDragSize: number;
}

/**
 * Состояние интерактивности фазора
 */
export type TPhasorInteractiveState = {
    dragged: TPhasorVectorData | null;
    navigated: TPhasorVectorData | null;
    isDown: boolean;
}

/**
 * Событие перетаскивания вектора
 */
export interface IPhasorDragEvent {
    eventName: 'drag',
    vectorId: string,
    complex: TComplex
}

export type IPhasorEventMap = {
    drag: IPhasorDragEvent;
};

export type TPhasorEventName = keyof IPhasorEventMap;

export type TPhasorEventHandler<E extends TPhasorEventName = TPhasorEventName> =
    (event: IPhasorEventMap[E]) => void;