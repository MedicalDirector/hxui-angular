import { AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class TooltipContentComponent implements AfterViewInit {
    private element;
    private cdr;
    hostElement: HTMLElement;
    content: string;
    placement: 'top' | 'bottom' | 'left' | 'right';
    animation: boolean;
    top: number;
    left: number;
    active: boolean;
    constructor(element: ElementRef, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    show(): void;
    hide(): void;
    private positionElements(hostEl, targetEl, positionStr, appendToBody?);
    private position(nativeEl);
    private offset(nativeEl);
    private getStyle(nativeEl, cssProp);
    private isStaticPositioned(nativeEl);
    private parentOffsetEl(nativeEl);
}
