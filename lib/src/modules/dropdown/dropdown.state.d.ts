import { EventEmitter } from '@angular/core';
import { HxComponentRef } from '../component-loader/hx-component-ref.class';
export declare class DropdownState {
    direction: 'down' | 'up';
    autoClose: boolean;
    isOpen: boolean;
    isOpenChange: EventEmitter<boolean>;
    isDisabledChange: EventEmitter<boolean>;
    toggleClick: EventEmitter<boolean>;
    /**
     * Content to be displayed as popover.
     */
    dropdownMenu: Promise<HxComponentRef<any>>;
    resolveDropdownMenu: (componentRef: HxComponentRef<any>) => void;
    constructor();
}
