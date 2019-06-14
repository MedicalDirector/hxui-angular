import {
  Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, TemplateRef,
} from '@angular/core';


@Directive({
  selector: '[hxTooltipDynamicContent],[hxaTooltipDynamicContent]',
  exportAs: 'hx-tooltip-dynamic-content'
})
export class TooltipDynamicContentDirective implements OnInit {

  public templateRef: TemplateRef<any>;

  constructor(_templateRef: TemplateRef<any>) {
    this.templateRef = _templateRef;
  }

  ngOnInit() {

  }

}
