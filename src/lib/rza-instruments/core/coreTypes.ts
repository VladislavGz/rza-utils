/**
 * Комплексное число в показательной форме
 */
export type TComplex = {
    value: number; //величина
    angle: number; //угол в градусах
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