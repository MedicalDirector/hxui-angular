import { Component } from '@angular/core';

@Component({
  selector: 'eg-clippath-dropdown',
  template: `
    <div
      class="hx-dropdown"
      hxDropdown
      [autoClose]="true"
      [createClipPathMask]="true"
    >
      <div class="hx-input-control">
        <input
          hxTextInput
          hxDropdownToggle
          id="directions"
          type="text"
          class="hx-input"
          maxlength="320"
        />
        <label for="directions" class="hx-label">Directions</label>
        <div class="hx-help"></div>
      </div>

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
export class ExampleClippathDropdownComponent {}
