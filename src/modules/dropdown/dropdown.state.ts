import { EventEmitter, Injectable } from '@angular/core';
import { HxComponentRef } from '../component-loader/hx-component-ref.class';

@Injectable()
export class DropdownState {
  direction: 'down' | 'up' = 'down';
  autoClose: boolean;
  isOpen: boolean;
  isOpenChange = new EventEmitter<boolean>();
  isDisabledChange = new EventEmitter<boolean>();
  toggleClick = new EventEmitter<boolean>();

  /**
   * Content to be displayed as popover.
   */
  dropdownMenu: Promise<HxComponentRef<any>>;
  resolveDropdownMenu: (componentRef: HxComponentRef<any>) => void;

  constructor() {
    this.dropdownMenu = new Promise((resolve) => {
      this.resolveDropdownMenu = resolve;
    });

    this.isOpenChange.subscribe((value: boolean) => {
      this.isOpen = value;
    });
  }
}
