import {Directive, HostListener, ElementRef, HostBinding} from '@angular/core';

@Directive({
  selector: '[hxaTextInput]'
})
export class TextInputDirective {

  @HostBinding('class.has-label-placeholder') isPlaceholder: boolean;
  @HostBinding('class.has-label-floating') isLabel: boolean;

  constructor(private el: ElementRef) {
    this.styleLabel();
  }

  @HostListener('focus')
  onFocus() {
    this.styleLabelAsFloating();
  }

  @HostListener('blur')
  onBlur() {
    this.styleLabel();
  }

  styleLabel(floatingLabel?: boolean) {
    // If the element is empty, style the label like a placeholder otherwise float the label above the input
    if (!floatingLabel && this.el.nativeElement.value.trim().length === 0 && this.el.nativeElement.placeholder.trim().length === 0 )  {
      this.styleLabelAsPlaceholder();
    } else {
      this.styleLabelAsFloating();
    }
  }

  styleLabelAsPlaceholder() {
    this.isPlaceholder = true;
    this.isLabel = false;
  }

  styleLabelAsFloating() {
    this.isPlaceholder = false;
    this.isLabel = true;
  }

}
