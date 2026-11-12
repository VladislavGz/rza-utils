/**
 * Комплексное число в показательной форме
 */
export type TComplex = {
    value: number; //величина
    angle: number; //угол в градусах
}

/**
 * Комплексное число в алгебраической форме
 */
export type TComplexRect = {
    re: number;
    im: number;
}

/**
 * Трехфазная система
 */
export type TThreePhaseSystem = {
    phaseA: TComplex;
    phaseB: TComplex;
    phaseC: TComplex;
}

/**
 * Система симметричных составляющих
 */
export type TSymmetricalComponentsSystem = {
    A1: TComplex;
    A2: TComplex;
    A0: TComplex;
}

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
export type TComplexAxisOrientation =
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