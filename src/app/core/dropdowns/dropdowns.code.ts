export class DropdownsCode {

  usage =
    `
    import {DropdownModule} from "@hxui/angular";

     @NgModule({
        imports: [DropdownModule.forRoot(),...]
     })
     export class AppModule(){

    `;

  example =
    `
    <div class="hx-dropdown" hxaDropdown>
    <button class="hx-button" hxDropdownToggle type="button">
      <span>Dropdown</span>
      <span class="hx-icon-control"><i class="icon icon-caret-down"></i></span>
    </button>
    <div class="hx-dropdown-menu" *hxaDropdownMenu>
      <div class="hx-dropdown-header">Dropdown header</div>
        <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
        <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
        <div class="hx-dropdown-divider"></div>
        <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
        <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
      </div>
    </div>
    `;

  exampleTemplate = `
  <div class="hx-columns">
      <div class="hx-column is-flex">
        <div class="hx-dropdown mr-1" hxaDropdown [autoClose]="false" placement="top">
         <button class="hx-button" hxDropdownToggle type="button">
            <span>Dropdown</span>
            <span class="hx-icon-control"><i class="icon icon-caret-down"></i></span>
          </button>
          <div class="hx-dropdown-menu" *hxaDropdownMenu>
            <div class="hx-dropdown-header">Dropdown header</div>
            <a class="hx-dropdown-item" hxaDropdownItem>>Action</a>
            <a class="hx-dropdown-item" hxaDropdownItem>>Another action</a>
            <div class="hx-dropdown-divider"></div>
            <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
            <a class="hx-dropdown-item" hxaDropdownItem>>Another action</a>
          </div>
        </div>
        <button class="hx-button is-info mr-1"  (click)="toggle($event)">Toggle</button>
        <button class="hx-button is-info mr-1"  (click)="show($event)">Show</button>
        <button class="hx-button is-info" (click)="hide($event)">Hide</button>
      </div>
    </div>
  `;

  exampleComponent = `
  import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
  import {DropdownDirective} from '../../../modules/dropdown/dropdown.directive';

  @Component({
    selector: 'app-dropdowns',
    templateUrl: './dropdowns.component.html'
  })
  export class DropdownsComponent {

    @ViewChild('dropdown') dropdown: DropdownDirective;

    constructor() {}

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
  `;

  maxWidthExample = `
    <div class="hx-card" id="parentEl">
      <div class="hx-card-content">
       <div class="hx-dropdown" hxaDropdown maxWidthRelativeTo="parentEl">
          <button class="hx-button" hxDropdownToggle type="button">
            <span>Dropdown</span>
            <span class="hx-icon-control"><i class="icon icon-caret-down"></i></span>
          </button>
          <div class="hx-dropdown-menu is-text-ellipsed" *hxaDropdownMenu>
            <a class="hx-dropdown-item" hxaDropdownItem>Drop down item</a>
            <a class="hx-dropdown-item" hxaDropdownItem>Drop down item</a>
            <a class="hx-dropdown-item" hxaDropdownItem>Drop down item</a>
            <a class="hx-dropdown-item" hxaDropdownItem>Drop down item that's really really really really really really really really really really really long.</a>
          </div>
      </div>
     </div>
    </div>
  `;
}
