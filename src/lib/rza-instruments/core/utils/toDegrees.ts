const DEG = 180 / Math.PI;

/**
 * Функция принимает радианную меру угла и возвращает градусную
 */
export function toDegrees(rad: number): number {
    return rad * DEG;
}