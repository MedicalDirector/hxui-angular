import { AfterContentChecked, Directive, ElementRef, HostListener, AfterContentInit } from '@angular/core';

@Directive({
  selector: 'textarea[autogrow]'
})
export class AutoGrowDirective implements AfterContentInit, AfterContentChecked {

  constructor(public element: ElementRef) {}

  @HostListener('input', ['$event.target'])
  public onInput() {
    this.resize();
  }

  public ngAfterContentInit() {
    const style = this.element.nativeElement.style;
    style.overflow = 'hidden';
    style.height = 'auto';
  }

  public ngAfterContentChecked() {
    this.resize();
  }

  public resize() {
    const style = this.element.nativeElement.style;
    const height = this.element.nativeElement.scrollHeight;

    style.height = `${height}px`;
  }
}
