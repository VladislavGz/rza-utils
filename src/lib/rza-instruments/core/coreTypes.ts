/**
 * Комплексное число в показательной форме
 */
export type TComplex = {
    value: number;
    angle: number;
}

/**
 * Трехфазная система
 */
export type TThreePhaseSystem = {
    phaseA: TComplex;
    phaseB: TComplex;
    phaseC: TComplex;
}