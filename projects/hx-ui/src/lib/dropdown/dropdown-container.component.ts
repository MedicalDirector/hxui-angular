import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import { DropdownState } from './dropdown.state';
import {Observable, Subject} from 'rxjs/index';
import {Visibility} from '../enums';

@Component({
  selector: 'hx-dropdown-container',
  host: {
    style: 'display:block;position: absolute;',
    class: 'hxui-reset'
  },
  template: `
    <div [class.is-dropup]="direction === 'up'"
         [class.is-dropdown]="direction === 'down'"
         [class.is-open]="isOpen"><ng-content></ng-content></div>
  `
})
export class DropdownContainerComponent {

  @Input()
  content;

  constructor(private _changeDetectionRef: ChangeDetectorRef) {}
  // constructor(private _state: DropdownState) {
  //   this._subscription = _state.isOpenChange.subscribe((value: boolean) => {
  //     this.isOpen = value;
  //   });
  // }


}
