import {Directive, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[hxDropdownMenu],[hxaDropdownMenu]',
  exportAs: 'hx-dropdown-menu'
})
export class DropdownMenuDirective {

  public templateRef: TemplateRef<any>;

  constructor(_templateRef: TemplateRef<any>) {
    this.templateRef = _templateRef;
  }
}
