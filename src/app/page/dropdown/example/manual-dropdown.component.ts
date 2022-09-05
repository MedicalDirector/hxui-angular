import { Component, ViewChild } from '@angular/core';
import { DropdownDirective } from '@hxui/angular';

@Component({
  selector: 'eg-manual-dropdown',
  template: `
    <div
      class="hx-dropdown mr-1"
      hxDropdown
      #dropdown="hx-dropdown"
      [autoClose]="false"
      placement="top"
    >
      <button class="hx-button" hxDropdownToggle type="button">
        <span>Dropdown</span>
        <span class="hx-icon-control"
          ><i class="icon icon-caret-down"></i
        ></span>
      </button>
      <div class="hx-dropdown-menu" *hxDropdownMenu>
        <div class="hx-dropdown-header">Dropdown header</div>
        <a class="hx-dropdown-item" hxDropdownItem>Action</a>
        <a class="hx-dropdown-item" hxDropdownItem>Another action</a>
        <div class="hx-dropdown-divider"></div>
        <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
        <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
      </div>
    </div>
    <button class="hx-button is-info mr-1" (click)="toggle($event)">
      Toggle
    </button>
    <button class="hx-button is-info mr-1" (click)="show($event)">Show</button>
    <button class="hx-button is-info" (click)="hide($event)">Hide</button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleManualDropdownComponent {
  @ViewChild('dropdown', { static: true }) dropdown: DropdownDirective;

  toggle($event: Event) {
    $event.stopPropagation();
    this.dropdown.toggle();
  }

  show($event: Event) {
    $event.stopPropagation();
    this.dropdown.show();
  }

  hide($event: Event) {
    $event.stopPropagation();
    this.dropdown.hide();
  }
}
