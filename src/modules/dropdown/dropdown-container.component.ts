import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DropdownState } from './dropdown.state';

@Component({
  selector: 'hx-dropdown-container',
  host: {
    style: 'display:block;position: absolute;'
  },
  template: `
    <div [class.is-dropup]="direction === 'up'"
         [class.is-dropdown]="direction === 'down'"
         [class.is-open]="isOpen"><ng-content></ng-content></div>
  `
})
export class DropdownContainerComponent implements OnDestroy {
  isOpen = false;

  get direction(): 'down' | 'up' {
    return this._state.direction;
  }

  private _subscription: any;

  constructor(private _state: DropdownState) {
    this._subscription = _state.isOpenChange.subscribe((value: boolean) => {
      this.isOpen = value;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
