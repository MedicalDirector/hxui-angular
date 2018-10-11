import {Directive, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { DropdownState } from './dropdown.state';

@Directive({
  selector: '[hxDropdownMenu],[hxaDropdownMenu]',
  exportAs: 'hx-dropdown-menu'
})
export class DropdownMenuDirective {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor(_state: DropdownState,
              _viewContainer: ViewContainerRef,
              _templateRef: TemplateRef<any>) {
    _state.templateRef = this.templateRef;
  }
}
