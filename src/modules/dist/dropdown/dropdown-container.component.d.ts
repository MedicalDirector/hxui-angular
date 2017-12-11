import { OnDestroy } from '@angular/core';
import { DropdownState } from './dropdown.state';
export declare class DropdownContainerComponent implements OnDestroy {
    private _state;
    isOpen: boolean;
    readonly direction: 'down' | 'up';
    private _subscription;
    constructor(_state: DropdownState);
    ngOnDestroy(): void;
}
