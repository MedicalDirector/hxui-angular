import { AfterContentChecked, ElementRef, AfterContentInit } from '@angular/core';
export declare class AutoGrowDirective implements AfterContentInit, AfterContentChecked {
    element: ElementRef;
    constructor(element: ElementRef);
    onInput(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    resize(): void;
}
