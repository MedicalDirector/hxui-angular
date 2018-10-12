import {
  Directive, Input, OnInit, TemplateRef,
} from '@angular/core';


@Directive({
  selector: '[hxDropdownMenu],[hxaDropdownMenu]',
  exportAs: 'hx-dropdown-menu'
})
export class DropdownMenuDirective implements OnInit {

  public templateRef: TemplateRef<any>;

  @Input()
  resizeTo: string;

  constructor(_templateRef: TemplateRef<any>) {
    this.templateRef = _templateRef;

  }

  ngOnInit() {
    console.log("dd: "+this.resizeTo);
  }
}
