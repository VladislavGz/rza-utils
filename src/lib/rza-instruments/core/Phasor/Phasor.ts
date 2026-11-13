import type { TColorMode } from "#lib/types/types.ts";
import { Complex } from "../Complex/Complex";
import { toRadians } from "../utils/toRadians";
import { Drawer } from "../Drawer/Drawer";
import type { TPhasorVectorData, TCtxLine, TCtxPoint, TPhasorVectorStyle, TPhasorAxisOrientation, TPhasorSettings, TPhasorStaticFrame, TPhasorDynamicFrame, TPhasorInteractiveState, TPhasorEventName, TPhasorEventHandler } from "./types";
import type { TComplex } from "../Complex/types";

export class Phasor extends Drawer {
    static settings: TPhasorSettings = {
        radialGridStep: 15,

        defaultScalePos: 23,

        scales: [0.026, 0.031, 0.038, 0.045, 0.054, 0.065, 0.078, 0.093, 0.112, 0.135, 0.162, 0.194, 0.233, 0.279, 0.335, 0.402, 0.482, 0.579, 0.694, 0.833, 1, 1.2, 1.44, 1.728, 2.074, 2.488, 2.986, 3.583, 4.3, 5.16, 6.192, 7.43, 8.916, 10.7],

        style: {
            dark: {
                fontSize: 14,
                fontFamily: 'monospace',
                fontColor: '#eeeeee',
                cursorColor: '#5E6847',
                gridColor: '#333333',
                bgColor: '#111111'
            },

            light: {
                fontSize: 14,
                fontFamily: 'monospace',
                fontColor: '#000000',
                cursorColor: '#333333',
                gridColor: '#aaaaaa',
                bgColor: '#ffffff'
            }
        },

        lineDash: {
            solid: [],
            dashed: [4, 4]
        },

        defaultVectorStyle: {
            color: '#aaaaaa',
            style: "solid",
            lineWidth: 1
        },

        vectorDragSize: 8,
    }

    /**
     * Метод возвращает контекстные координаты комплексного числа с учетом масштаба и заданного смещения
     */
    static complexToCtx({
        vector,
        base = { value: 0, angle: 0 },
        orientation,
        scale,
        origin = { x: 0, y: 0 }
    }: {
        vector: TComplex;
        base?: TComplex;
        orientation: TPhasorAxisOrientation;
        scale: number;
        origin?: TCtxPoint
    }): TCtxLine {
        let normalizedVector, normalizedBase;

        if (orientation === 'standart') {
            normalizedVector = vector;
            normalizedBase = base;
        } else {
            normalizedVector = Complex.mul(vector, { value: 1, angle: 90 });
            normalizedBase = Complex.mul(base, { value: 1, angle: 90 });
        }

        const baseRect = Complex.toRect(normalizedBase);
        const vectorRect = Complex.toRect(normalizedVector);

        return {
            from: {
                x: baseRect.re * scale + origin.x,
                y: -baseRect.im * scale + origin.y
            },

            to: {
                x: (vectorRect.re + baseRect.re) * scale + origin.x,
                y: -(vectorRect.im + baseRect.im) * scale + origin.y
            }
        }
    }

    /**
     * Метод возвращает комплексное число для заданной точки в контекстных координатах с учетом масштаба и ориентации осей
     */
    static ctxToComplex({
        point,
        orientation,
        scale,
        origin = { x: 0, y: 0 }
    }: {
        point: TCtxPoint,
        orientation: TPhasorAxisOrientation;
        scale: number,
        origin?: TCtxPoint
    }): TComplex {
        const complex = Complex.toIndicative({
            re: (point.x - origin.x) / scale,
            im: -(point.y - origin.y) / scale
        });

        const normalized = orientation === 'standart' ? complex : Complex.mul(complex, { value: 1, angle: -90 });
        return normalized;
    }

    #currentStaticFrame: TPhasorStaticFrame = {
        vectors: [],
        ctxData: {},
        center: { x: 0, y: 0 }
    };

    #currentDynamicFrame: TPhasorDynamicFrame = {
        cursor: null
    }

    #interactiveState: TPhasorInteractiveState = {
        dragged: null,
        navigated: null,
        isDown: false
    }

    #phasorHandlers: Record<TPhasorEventName, () => void> = {
        drag: () => {
            const dragged = this.#interactiveState.dragged;
            if (!dragged) return;

            const cursor = this.#currentDynamicFrame.cursor;
            if (!cursor) return;

            this.#phasorEventEmitter.drag.forEach(callback => callback({
                eventName: 'drag',
                vectorId: dragged.id,
                complex: Phasor.ctxToComplex({
                    point: cursor,
                    orientation: this.#axisOrientation,
                    scale: Phasor.settings.scales[this.#scalePos],
                    origin: this.#currentStaticFrame.center
                })
            }));
        }
    }

    #phasorEventEmitter: Record<TPhasorEventName, Array<TPhasorEventHandler>>;

    #axisOrientation: TPhasorAxisOrientation = 'alternative';

    #colorMode: TColorMode = 'dark';

    #scalePos: number = Phasor.settings.defaultScalePos;

    #labelMode: boolean = true;

    constructor(container: HTMLDivElement, staticCnv: HTMLCanvasElement, dynamicCnv: HTMLCanvasElement) {
        super(container, staticCnv, dynamicCnv);

        super.on('resize', () => {
            this.rerender();
        });

        super.on('mousemove', (e) => {
            const { x, y } = e;

            this.setDynamicFrame({
                cursor: { x, y }
            });

            this.#phasorHandlers.drag();
        });

        super.on('mouseleave', () => {
            this.setDynamicFrame({
                cursor: null
            });

            this.#interactiveState = {
                dragged: null,
                isDown: false,
                navigated: null
            }
        });

        super.on('wheel', (e) => {
            const { sign } = e;
            const scalePos = Math.max(Math.min(this.#scalePos - sign, Phasor.settings.scales.length - 1), 0);
            this.setScalePos(scalePos);
        });

        super.on('mousedown', (e) => {
            this.#interactiveState.isDown = true;

            if (e.button === 'L' && this.#interactiveState.navigated && !this.#interactiveState.dragged) {
                this.#interactiveState.dragged = this.#interactiveState.navigated;
            }
        });

        super.on('mouseup', (e) => {
            this.#interactiveState.isDown = false;

            if (e.button === 'L' && this.#interactiveState.dragged) {
                this.#interactiveState.dragged = null;
            }
        });

        this.#phasorEventEmitter = {
            drag: []
        }
    }

    #drawGrid() {
        const { cnv, ctx } = this.staticLayer;
        const { x: xc, y: yc } = this.#currentStaticFrame.center;
        const w = cnv.width;
        const h = cnv.height;
        const settings = Phasor.settings;
        const step = settings.radialGridStep;

        ctx.strokeStyle = settings.style[this.#colorMode].gridColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);

        //Отрисовка радиальной сетки
        ctx.beginPath();
        for (let deg = 0; deg < 180; deg += step) {
            const rad = toRadians(deg);
            const dx = Math.cos(rad);
            const dy = Math.sin(rad);

            const tx = dx > 0 ? (w - xc) / dx : dx < 0 ? -xc / dx : Infinity;
            const ty = dy > 0 ? (h - yc) / dy : dy < 0 ? -yc / dy : Infinity;
            const t = Math.min(tx, ty);

            ctx.moveTo(xc - t * dx, yc - t * dy);
            ctx.lineTo(xc + t * dx, yc + t * dy);
        }
        ctx.stroke();

        //Отрисовка концентрической сетки
        if (this.#scalePos < 15) return;
        ctx.beginPath();
        const pxStep = 20 * settings.scales[this.#scalePos];
        const rmax = 0.5 * w;
        for (let i = 0; i < rmax; i += pxStep) {
            ctx.ellipse(xc, yc, i, i, 0, 0, 2 * Math.PI);
        }
        ctx.stroke();
    }

    #drawGridLabels() {
        if (!this.#labelMode) return;

        const { cnv, ctx } = this.dynamicLayer;
        const { x: xc, y: yc } = this.#currentStaticFrame.center;
        const w = cnv.width;
        const h = cnv.height;
        const style = Phasor.settings.style[this.#colorMode];

        //Подложка подписей
        ctx.fillStyle = style.bgColor;
        ctx.beginPath();
        ctx.ellipse(xc, yc, w * 0.5, h * 0.5, 0, 0, 2 * Math.PI);
        ctx.ellipse(xc, yc, w * 0.5 - 40, h * 0.5 - 40, 0, 2 * Math.PI, 0, true);
        ctx.fill();

        //Внутренняя граница области подписей
        ctx.strokeStyle = style.gridColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.ellipse(xc, yc, w * 0.5 - 40, h * 0.5 - 40, 0, 2 * Math.PI, 0);
        ctx.stroke();

        //Подписи
        ctx.font = `${style.fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labelRadius = 0.5 * w - 20;
        const norm = this.#axisOrientation === 'standart' ? 0 : 90;
        const step = 15;

        for (let deg = 180; deg > -180; deg -= step) {
            const rad = toRadians(deg + norm);
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            const x = xc + labelRadius * cos;
            const y = yc - labelRadius * sin;

            ctx.fillText(`${deg}`, x, y);
        }
    }

    #drawVector(ctxVector: TCtxLine, style?: TPhasorVectorStyle) {
        const ctx = this.staticLayer.ctx;
        const s = style ?? Phasor.settings.defaultVectorStyle;
        const dash = Phasor.settings.lineDash;

        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.lineWidth;
        ctx.setLineDash(dash[s.style]);

        const d = s.lineWidth % 2 === 0 ? 0 : 0.5;
        const { from, to } = ctxVector;

        ctx.beginPath();
        ctx.moveTo(from.x + d, from.y + d);
        ctx.lineTo(to.x + d, to.y + d);
        ctx.stroke();
    }

    #drawStatic() {
        this.#drawGrid();

        this.#currentStaticFrame.vectors.forEach(vector => {
            this.#drawVector(this.#currentStaticFrame.ctxData[vector.id], vector.style);
        });
    }

    #drawDynamic() {       
        if (!this.#currentDynamicFrame.cursor) return;
        const settings = Phasor.settings;
        const style = settings.style[this.#colorMode];

        const center = this.#currentStaticFrame.center;
        const cursor = this.#currentDynamicFrame.cursor;
        const radius = Math.hypot(cursor.x - center.x, cursor.y - center.y);

        //Сетка курсора
        const ctx = this.dynamicLayer.ctx;
        ctx.strokeStyle = style.cursorColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.ellipse(center.x, center.y, radius, radius, 0, 0, 2 * Math.PI);
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.stroke();

        const vector = Phasor.ctxToComplex({
            point: cursor,
            orientation: this.#axisOrientation,
            scale: settings.scales[this.#scalePos],
            origin: center
        });

        //Подписи курсора
        ctx.font = `${style.fontSize}px ${style.fontFamily}`;
        ctx.fillStyle = style.fontColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`A ${vector.value.toFixed(1)}`, cursor.x + 10, cursor.y - 20);
        ctx.fillText(`∠ ${vector.angle.toFixed(1)}`, cursor.x + 10, cursor.y);

        //Отклик при наведении на вектор
        if (this.#interactiveState.navigated) {
            const { to: { x, y } } = this.#currentStaticFrame.ctxData[this.#interactiveState.navigated.id];
            ctx.fillStyle = this.#interactiveState.navigated.style?.color || settings.defaultVectorStyle.color;
            ctx.beginPath();
            ctx.ellipse(x, y, settings.vectorDragSize, settings.vectorDragSize, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    #calcStatic() {
        const scale = Phasor.settings.scales[this.#scalePos];

        this.#currentStaticFrame.center = {
            x: this.staticLayer.cnv.width * 0.5,
            y: this.staticLayer.cnv.height * 0.5
        };

        this.#currentStaticFrame.ctxData = {};
        this.#currentStaticFrame.vectors.forEach(vector => {
            this.#currentStaticFrame.ctxData[vector.id] = Phasor.complexToCtx({
                vector: vector.vector,
                base: vector.base,
                orientation: this.#axisOrientation,
                scale,
                origin: this.#currentStaticFrame.center
            });
        });
    }

    #calcDynamic() {
        if (this.#interactiveState.dragged || this.#interactiveState.isDown) return;
        if (!this.#currentDynamicFrame.cursor) return;

        const { x, y } = this.#currentDynamicFrame.cursor;
        const size = Phasor.settings.vectorDragSize;

        if (this.#interactiveState.navigated) {
            const { to } = this.#currentStaticFrame.ctxData[this.#interactiveState.navigated.id];
            if (x < to.x - size || x > to.x + size || y < to.y - size || y > to.y + size) {
                this.#interactiveState.navigated = null;
            }
        } else {
            for (let i = 0; i < this.#currentStaticFrame.vectors.length; i++) {
                const vector = this.#currentStaticFrame.vectors[i];
                if (!vector.isInteractive) continue;

                const { to } = this.#currentStaticFrame.ctxData[vector.id];
                if (x < to.x - size || x > to.x + size) continue;
                if (y < to.y - size || y > to.y + size) continue;
                this.#interactiveState.navigated = vector;
                break;
            }
        }
    }

    destroy() {
        this.#currentStaticFrame.vectors = [];
        this.#currentStaticFrame.ctxData = {};
        this.#phasorEventEmitter = {
            drag: []
        }
        super.destroy();
    }

    clearStatic() {
        this.staticLayer.ctx.clearRect(0, 0, this.staticLayer.cnv.width, this.staticLayer.cnv.height);
    }

    clearDynamic() {
        this.dynamicLayer.ctx.clearRect(0, 0, this.dynamicLayer.cnv.width, this.dynamicLayer.cnv.height);
    }

    renderStatic() {
        this.#calcStatic();
        this.#drawStatic();
    }

    renderDynamic() {
        this.#calcDynamic();
        this.#drawDynamic();
        this.#drawGridLabels();
    }

    rerenderStatic() {
        this.clearStatic();
        this.renderStatic();
    }

    rerenderDynamic() {
        this.clearDynamic();
        this.renderDynamic();
    }

    rerender() {
        this.rerenderStatic();
        this.rerenderDynamic();
    }

    setStaticFrame(vectors: TPhasorVectorData[]) {
        this.#currentStaticFrame.vectors = vectors;
        this.rerenderStatic();
    }

    setDynamicFrame(frame: TPhasorDynamicFrame) {
        this.#currentDynamicFrame = frame;
        this.rerenderDynamic();
    }

    setAxisOrientation(orientation: TPhasorAxisOrientation) {
        if (orientation === this.#axisOrientation) return;
        this.#axisOrientation = orientation;
        this.rerender();
    }

    setColorMode(colorMode: TColorMode) {
        this.#colorMode = colorMode;
        this.rerender();
    }

    setLabelMode(labelMode: boolean) {
        this.#labelMode = labelMode;
        this.rerender();
    }

    setScalePos(scalePos: number) {
        this.#scalePos = scalePos;
        this.rerender();
    }

    onPhasor<E extends TPhasorEventName>(eventName: E, callback: TPhasorEventHandler<E>) {
        (this.#phasorEventEmitter[eventName] as Array<TPhasorEventHandler<E>>).push(callback);
    }
}