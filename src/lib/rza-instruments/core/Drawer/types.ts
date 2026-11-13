interface IDrawerEventBase {
    eventName: string;
}

export type TMouseButton = 'L' | 'C' | 'R' | null;

export interface IDrawerResizeEvent extends IDrawerEventBase {
    eventName: 'resize';
    width: number;
    height: number;
}

export interface IDrawerWheelEvent extends IDrawerEventBase {
    eventName: 'wheel';
    sign: number;
}

export interface IDrawerMouseEvent extends IDrawerEventBase {
    eventName: 'click' | 'mousemove' | 'mouseup' | 'mousedown' | 'mouseenter' | 'mouseleave';
    x: number;
    y: number;
    button: TMouseButton;
}

export type TDrawerEvent = IDrawerResizeEvent | IDrawerWheelEvent | IDrawerMouseEvent;

export type TDrawerEventMap = {
    resize: IDrawerResizeEvent;
    wheel: IDrawerWheelEvent;
    click: IDrawerMouseEvent;
    mousemove: IDrawerMouseEvent;
    mouseup: IDrawerMouseEvent;
    mousedown: IDrawerMouseEvent;
    mouseenter: IDrawerMouseEvent;
    mouseleave: IDrawerMouseEvent;
};

export type TDrawerEventName = keyof TDrawerEventMap;

export type TDrawerEventHandler<E extends TDrawerEventName = TDrawerEventName> =
    (event: TDrawerEventMap[E]) => void;

export type TGraphicLayer = {
    cnv: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}