import { Component } from '@angular/core';

@Component({
  selector: 'eg-basic-dropdown',
  template: `
    <div class="hx-dropdown" hxDropdown [autoClose]="true">
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
        <a class="hx-dropdown-item" hxDropdownItem>Action</a>
        <a class="hx-dropdown-item" hxDropdownItem>Another action</a>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicDropdownComponent {}
