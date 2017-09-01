import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { DropdownState } from './dropdown.state';

@Directive({
  selector: '[hxDropdownMenu],[dropdownMenu]',
  exportAs: 'hx-dropdown-menu'
})
export class DropdownMenuDirective {
  constructor(_state: DropdownState,
              _viewContainer: ViewContainerRef,
              _templateRef: TemplateRef<any>) {
    _state.resolveDropdownMenu({
      templateRef: _templateRef,
      viewContainer: _viewContainer
    });
  }
}
