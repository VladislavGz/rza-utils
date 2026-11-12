import { toDegrees } from "../utils/toDegrees";
import { toRadians } from "../utils/toRadians";
import type { TComplex, TComplexRect } from "./types";

/**
 * Нормализация угла к диапазону [0, 360)
 */
function normalizeAngle(deg: number): number {
    const a = deg % 360;
    return a < 0 ? a + 360 : a;
}

/**
 * Возвращает алгебраическую форму комплексного числа на основе показательной
 */
function toRect(c: TComplex): TComplexRect {
    const r = toRadians(c.angle);
    return {
        re: c.value * Math.cos(r),
        im: c.value * Math.sin(r),
    };
}

/**
 * Возвращает показательную форму комплексного числа на основе алгебраической
 */
function toIndicative(c: TComplexRect): TComplex {
    return {
        value: Math.hypot(c.re, c.im),
        angle: normalizeAngle(toDegrees(Math.atan2(c.im, c.re))),
    };
}

/**
 * Возвращает новое комплексное число, явялющееся результатом суммы двух переданных
 * комплексных чисел
 */
function add(a: TComplex, b: TComplex): TComplex {
    const ra = toRect(a), rb = toRect(b);
    return toIndicative({
        re: ra.re + rb.re,
        im: ra.im + rb.im
    });
}

/**
 * Возвращает новое комплексное число, явялющееся результатом разности двух переданных
 * комплексных чисел
 */
function sub(a: TComplex, b: TComplex): TComplex {
    const ra = toRect(a), rb = toRect(b);
    return toIndicative({
        re: ra.re - rb.re,
        im: ra.im - rb.im
    });
}

/**
 * Возвращает новое комплексное число, явялющееся результатом произведения двух переданных
 * комплексных чисел
 */
function mul(a: TComplex, b: TComplex): TComplex {
    return {
        value: a.value * b.value,
        angle: normalizeAngle(a.angle + b.angle),
    };
}

/**
 * Возвращает новое комплексное число, явялющееся результатом деления двух переданных
 * комплексных чисел
 */
function div(a: TComplex, b: TComplex): TComplex {
    if (b.value === 0) throw new Error('Division by zero');
    return {
        value: a.value / b.value,
        angle: normalizeAngle(a.angle - b.angle),
    };
}



export const Complex = {
    normalizeAngle,
    toRect,
    toIndicative,
    add,
    sub,
    mul,
    div
}