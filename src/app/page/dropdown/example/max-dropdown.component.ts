import { Component } from '@angular/core';

@Component({
  selector: 'eg-max-dropdown',
  template: `
    <div class="hx-card" id="parentEl">
      <div class="hx-card-content">
        <div class="hx-dropdown" hxDropdown maxWidthRelativeTo="parentEl">
          <button
            class="hx-button hx-button-dropdown"
            hxDropdownToggle
            type="button"
          >
            <span>Dropdown</span>
            <span class="hx-icon-control"
              ><i class="icon icon-caret-down"></i
            ></span>
          </button>
          <div class="hx-dropdown-menu is-text-ellipsed" *hxDropdownMenu>
            <a class="hx-dropdown-item" hxDropdownItem>Drop down item</a>
            <a class="hx-dropdown-item" hxDropdownItem>Drop down item</a>
            <a class="hx-dropdown-item" hxDropdownItem>Drop down item</a>
            <a class="hx-dropdown-item" hxDropdownItem
              >Drop down item that's really really really really really really
              really really really really really long.</a
            >
          </div>
        </div>
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
export class ExampleMaxDropdownComponent {}
