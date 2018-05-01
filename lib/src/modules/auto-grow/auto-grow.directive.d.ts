import { AfterContentChecked, ElementRef } from '@angular/core';
export declare class AutoGrowDirective implements AfterContentChecked {
    element: ElementRef;
    constructor(element: ElementRef);
    onInput(): void;
    ngAfterContentChecked(): void;
    resize(): void;
}
