import {
  Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnDestroy, Output, Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs';
import {DropdownDirective} from './dropdown.directive';


@Directive({
  selector: '[hxDropdownToggle],[hxaDropdownToggle]',
  exportAs: 'hx-dropdown-toggle'
})
export class DropdownToggleDirective implements OnDestroy {


  isOpenChange = new EventEmitter<boolean>();


  @HostBinding('attr.disabled')
  isDisabled: boolean;

  @HostBinding('class.is-active')
  isOpen: boolean;

  @HostListener('click', ['$event'])
  onClick(event): void {
    this.dropdown.show();
  }


  @HostListener('keyup.esc')
  onEsc(): void {
    this.dropdown.hide();
  }

  constructor(public elementRef: ElementRef,
              private dropdown: DropdownDirective) {
  }

  ngOnDestroy() {}
}
