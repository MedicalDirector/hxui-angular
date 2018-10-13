import {
  Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, TemplateRef,
} from '@angular/core';


@Directive({
  selector: '[hxDropdownMenu],[hxaDropdownMenu]',
  exportAs: 'hx-dropdown-menu'
})
export class DropdownMenuDirective implements OnInit {

  public templateRef: TemplateRef<any>;

  constructor(_templateRef: TemplateRef<any>) {
    this.templateRef = _templateRef;
  }

  ngOnInit() {

  }

}
