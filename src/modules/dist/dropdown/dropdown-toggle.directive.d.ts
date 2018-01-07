import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { DropdownState } from './dropdown.state';
export declare class DropdownToggleDirective implements OnDestroy {
    private _state;
    private _element;
    private _renderer;
    isDisabled: boolean;
    isOpen: boolean;
    onClick(event: any): void;
    onEsc(): void;
    private _subscriptions;
    constructor(_state: DropdownState, _element: ElementRef, _renderer: Renderer2);
    ngOnDestroy(): void;
}
