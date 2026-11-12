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