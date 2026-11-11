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
 * Объект графики
 */
export type TGraphicLayer = {
    cnv: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

/**
 * Интерактивный слой графики
 */
export type TInteractiveLayer = HTMLDivElement;

/**
 * Объект кадра отрисовки ComplexDrawer
 */
export type TComplexDrawerFrame = {
    vectors: TComplex[];
    threePhaseSystems: TThreePhaseSystem[];
    symmetricalComponentsSystems: TSymmetricalComponentsSystem[];
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

/**
 * Имя события Drawer
 */
export type TDrawerEventName = 'resize';