import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: 'textarea[autogrow]'
})
export class AutoGrowDirective
  implements AfterViewInit {

  @HostListener('input', ['$event.target'])
  public onInput() {
    this.resize();
  }

  constructor(public element: ElementRef) {}

  public ngAfterViewInit() {
    const style = this.element.nativeElement.style;
    style.overflow = 'hidden';
    style.height = 'auto';
  }

  public resize() {
    const el = this.element.nativeElement;

    if (el.style.height === el.scrollHeight + 'px') {
      return;
    }

    el.style.overflow = 'hidden';
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }
}
