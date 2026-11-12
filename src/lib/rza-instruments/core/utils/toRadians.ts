const RAD = Math.PI / 180;

/**
 * Функция принимает градусную меру угла и возвращает радианную
 */
export function toRadians(deg: number): number {
    return deg * RAD;
}