import {
  Directive,
  ElementRef,
  NgModule,
} from '@angular/core';

@Directive({
  selector: '[hxaToastrContainer]',
  exportAs: 'hxaToastrContainer',
})
export class ToastrContainerDirective {
  constructor(private el: ElementRef) { }
  getContainerElement(): HTMLElement {
    return this.el.nativeElement;
  }
}

@NgModule({
  declarations: [ToastrContainerDirective],
  exports: [ToastrContainerDirective],
})
export class ToastrContainerModule {}
