import { Complex } from "../Complex/Complex";
import type { TComplex, TSymmetricalComponentsSystem, TThreePhaseSystem } from "../coreTypes";

/**
 * Оператор поворота a = e^(j120°)
 */
const a: TComplex = { value: 1, angle: 120 };

/**
 * Оператор поворота a^2 = e^(j240°) = e^(-j120°)
 */
const a2: TComplex = { value: 1, angle: 240 };

/**
 * Множитель 1/3
 */
const oneThird: TComplex = { value: 1 / 3, angle: 0 };

/**
 * Возвращает систему симметричных составляющих для заданной трехфазной системы
 * 
 * A0 = (A + B + C) / 3
 * A1 = (A + aB + a^2 C) / 3
 * A2 = (A + a^2 B + aC) / 3
 */
function getSymmetricalComponents(threePhase: TThreePhaseSystem): TSymmetricalComponentsSystem {
    const { phaseA, phaseB, phaseC } = threePhase;

    // A0 = (A + B + C) / 3
    const sumABC = Complex.add(Complex.add(phaseA, phaseB), phaseC);
    const A0 = Complex.mul(sumABC, oneThird);

    // A1 = (A + aB + a^2 C) / 3
    const sumA1 = Complex.add(
        phaseA,
        Complex.add(
            Complex.mul(a, phaseB),
            Complex.mul(a2, phaseC)
        )
    );
    const A1 = Complex.mul(sumA1, oneThird);

    // A2 = (A + a^2 B + aC) / 3
    const sumA2 = Complex.add(
        phaseA,
        Complex.add(
            Complex.mul(a2, phaseB),
            Complex.mul(a, phaseC)
        )
    );
    const A2 = Complex.mul(sumA2, oneThird);

    return { A0, A1, A2 };
}

/**
 * Возвращает трехфазную систему для заданной системы симметричных составляющих
 * 
 * A = A0 + A1 + A2
 * B = A0 + a^2 A1 + a A2
 * C = A0 + a A1 + a^2 A2
 */
function getThreePhaseSystem(symmetricalSystem: TSymmetricalComponentsSystem): TThreePhaseSystem {
    const { A0, A1, A2 } = symmetricalSystem;

    const phaseA = Complex.add(Complex.add(A0, A1), A2);

    const phaseB = Complex.add(
        A0,
        Complex.add(
            Complex.mul(a2, A1),
            Complex.mul(a, A2)
        )
    );

    const phaseC = Complex.add(
        A0,
        Complex.add(
            Complex.mul(a, A1),
            Complex.mul(a2, A2)
        )
    );

    return { phaseA, phaseB, phaseC };
}


export const Symmetric = {
    getSymmetricalComponents,
    getThreePhaseSystem
}