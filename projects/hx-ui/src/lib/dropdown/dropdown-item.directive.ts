import {Directive, ElementRef, EventEmitter, HostListener, TemplateRef} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({
  selector: '[hxDropdownItem],[hxaDropdownItem]'
})
export class DropdownItemDirective {

  @HostListener('click', ['$event'])
  onClick(event): void {
    if (this.dropdown.autoClose) {
      this.dropdown.hide();
    }
  }

  constructor(public elementRef: ElementRef,
              private dropdown: DropdownDirective) {
    console.log(this.dropdown.autoClose, this.dropdown._config.autoClose);
  }
}
