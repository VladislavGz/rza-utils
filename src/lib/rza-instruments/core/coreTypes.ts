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