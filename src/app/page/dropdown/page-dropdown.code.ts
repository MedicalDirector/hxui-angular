import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageDropdownCode {
  usage: Code = {
    lang: ['ts'],
    text: `import {DropdownModule} from "@hxui/angular";

@NgModule({
  imports: [
    DropdownModule.forRoot(),
    // ...
  ]
})
export class AppModule {}
`,
  };

  usageLazy: Code = {
    lang: ['ts'],
    text: `import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  imports: [
    OverlayModule,
    ...
  ]
})
export class LazyFeatureModule {}
`,
  };

  egBasic: Code = {
    lang: ['xml'],
    text: `<div class="hx-dropdown" hxDropdown [autoClose]="true">
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
  };

  egMaxWidth: Code = {
    lang: ['xml'],
    text: `<div class="hx-dropdown" hxDropdown maxWidthRelativeTo="parentEl">
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
`,
  };

  egManualTemplate: Code = {
    lang: ['xml'],
    text: `<div
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

<button 
  class="hx-button is-info mr-1" 
  (click)="toggle($event)"
>
  Toggle
</button>
<button 
  class="hx-button is-info mr-1" 
  (click)="show($event)"
>
  Show
</button>
<button 
  class="hx-button is-info" 
  (click)="hide($event)"
>
  Hide
</button>
`,
  };

  egManualComponent: Code = {
    lang: ['ts'],
    text: `import { Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { DropdownDirective} from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent {

  @ViewChild('dropdown') dropdown: DropdownDirective;

  toggle($event) {
    $event.stopPropagation();
    this.dropdown.toggle();
  }

  show($event) {
    $event.stopPropagation();
    this.dropdown.show();
  }

  hide($event) {
    $event.stopPropagation();
    this.dropdown.hide();
  }
}
`,
  };

  egClip: Code = {
    lang: ['xml'],
    text: `<div
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
  };
}
