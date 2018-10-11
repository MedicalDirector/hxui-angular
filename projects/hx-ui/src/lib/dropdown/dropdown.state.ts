import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { HxComponentRef } from '../component-loader/hx-component-ref.class';

@Injectable()
export class DropdownState {


  templateRef: TemplateRef<any>;
  direction: 'down' | 'up' = 'down';
  autoClose: boolean;
  isOpen: boolean;
  isOpenChange = new EventEmitter<boolean>();
  isDisabledChange = new EventEmitter<boolean>();
  toggleClick = new EventEmitter<boolean>();


  constructor() {
  }
}
