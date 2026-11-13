import type { TDrawerEventHandler, TDrawerEventName, TGraphicLayer, TMouseButton } from "./types";

function getMouseButton({ button, buttons }: MouseEvent): TMouseButton {
    if (button === 0) return 'L';
    if (button === 1 && buttons === 4) return 'C';
    if (button === 2 && buttons === 2) return 'R';
    return null;
}

export abstract class Drawer {
    container: HTMLDivElement;
    staticLayer: TGraphicLayer;
    dynamicLayer: TGraphicLayer;
    resizeObserver: ResizeObserver;
    #eventEmitter: Record<TDrawerEventName, Array<TDrawerEventHandler>>;

    #handlers = {
        wheel: (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.#eventEmitter.wheel.forEach(callback => callback({
                eventName: 'wheel',
                sign: Math.sign(e.deltaY)
            }));
        },

        mousemove: (e: MouseEvent) => {
            this.#eventEmitter.mousemove.forEach(callback => callback({
                eventName: 'mousemove',
                x: e.offsetX,
                y: e.offsetY,
                button: getMouseButton(e)
            }));
        },

        mouseup: (e: MouseEvent) => {
            this.#eventEmitter.mouseup.forEach(callback => callback({
                eventName: 'mouseup',
                x: e.offsetX,
                y: e.offsetY,
                button: getMouseButton(e)
            }));
        },

        mousedown: (e: MouseEvent) => {
            this.#eventEmitter.mousedown.forEach(callback => callback({
                eventName: 'mousedown',
                x: e.offsetX,
                y: e.offsetY,
                button: getMouseButton(e)
            }));
        },

        mouseenter: (e: MouseEvent) => {
            this.#eventEmitter.mouseenter.forEach(callback => callback({
                eventName: 'mouseenter',
                x: e.offsetX,
                y: e.offsetY,
                button: getMouseButton(e)
            }));
        },

        mouseleave: (e: MouseEvent) => {
            this.#eventEmitter.mouseleave.forEach(callback => callback({
                eventName: 'mouseleave',
                x: e.offsetX,
                y: e.offsetY,
                button: getMouseButton(e)
            }));
        },
    }

    constructor(container: HTMLDivElement, staticCnv: HTMLCanvasElement, dynamicCnv: HTMLCanvasElement) {
        this.container = container;

        const staticCtx = staticCnv.getContext('2d');
        if (!staticCtx) throw new Error('Ошибка инициализации статического контекста рендера');

        const dynamicCtx = dynamicCnv.getContext('2d');
        if (!dynamicCtx) throw new Error('Ошибка инициализации динамического контекста рендера');

        this.staticLayer = {
            cnv: staticCnv,
            ctx: staticCtx
        };

        this.dynamicLayer = {
            cnv: dynamicCnv,
            ctx: dynamicCtx
        };

        this.#eventEmitter = {
            resize: [],
            wheel: [],
            click: [],
            mousemove: [],
            mouseup: [],
            mousedown: [],
            mouseenter: [],
            mouseleave: []
        };

        this.resizeObserver = new ResizeObserver(() => {
            this.resize();
            this.#eventEmitter.resize.forEach(callback => callback({
                eventName: 'resize',
                width: this.container.offsetWidth,
                height: this.container.offsetHeight
            }));
        });
        this.resizeObserver.observe(this.container);

        for (const [event, handler] of Object.entries(this.#handlers)) {
            this.dynamicLayer.cnv.addEventListener(event, handler as EventListener);
        }
    }

    destroy() {
        this.resizeObserver.disconnect();

        for (const [event, handler] of Object.entries(this.#handlers)) {
            this.dynamicLayer.cnv.removeEventListener(event, handler as EventListener);
        }

        this.#eventEmitter = {
            resize: [],
            wheel: [],
            click: [],
            mousemove: [],
            mouseup: [],
            mousedown: [],
            mouseenter: [],
            mouseleave: []
        };
    }

    resize() {
        this.staticLayer.cnv.width = this.container.offsetWidth;
        this.staticLayer.cnv.height = this.container.offsetHeight;
        this.dynamicLayer.cnv.width = this.container.offsetWidth;
        this.dynamicLayer.cnv.height = this.container.offsetHeight;
    }

    on<E extends TDrawerEventName>(eventName: E, callback: TDrawerEventHandler<E>) {
        (this.#eventEmitter[eventName] as Array<TDrawerEventHandler<E>>).push(callback);
    }
}