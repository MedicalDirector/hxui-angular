import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { DropdownConfig } from './dropdown.config';
import { DropdownState } from './dropdown.state';
export declare class DropdownDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _viewContainerRef;
    private _cis;
    private _config;
    private _state;
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     */
    placement: string;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    container: string;
    /**
     * This attribute indicates that the dropdown should be opened upwards
     */
    dropup: boolean;
    /**
     * Indicates that dropdown will be closed on item or document click,
     * and after pressing ESC
     */
    autoClose: boolean;
    /**
     * Disables dropdown toggle and hides dropdown menu if opened
     */
    isDisabled: boolean;
    /**
     * Returns whether or not dropdown is position right of the toggle
     */
    isRight: boolean;
    /**
     * Returns whether or not the dropdown is currently being shown
     */
    isOpen: boolean;
    /**
     * Emits an event when isOpen change
     */
    isOpenChange: EventEmitter<any>;
    /**
     * Emits an event when the popover is shown
     */
    onShown: EventEmitter<any>;
    /**
     * Emits an event when the popover is hidden
     */
    onHidden: EventEmitter<any>;
    private _isInlineOpen;
    private _isInlineRight;
    private _showInline;
    private _inlinedMenu;
    private _isDisabled;
    private _dropdown;
    private _subscriptions;
    private _isInited;
    constructor(_elementRef: ElementRef, _renderer: Renderer, _viewContainerRef: ViewContainerRef, _cis: ComponentLoaderFactory, _config: DropdownConfig, _state: DropdownState);
    ngOnInit(): void;
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show(): void;
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide(): void;
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    toggle(value?: boolean): void;
    ngOnDestroy(): void;
}
